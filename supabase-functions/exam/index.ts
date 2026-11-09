// Edge Function: exam
// Examen final de un curso, CALIFICADO EN EL SERVIDOR.
//
// El navegador ya no decide la nota: pide el examen (`start`), responde y envía
// sus respuestas (`submit`); aquí se sortean las preguntas, se califica y se
// guarda el resultado en `exam_results`, que es lo que valida
// create-certificate-checkout. Las respuestas correctas viven en `exam_questions`
// (RLS sin políticas: solo service role) y nunca viajan al navegador.
//
// Requiere el JWT del docente. Tablas: migrations/examen-servidor.sql (+ el banco
// de migrations/exam-bank/*.sql, generado por scripts/sync-exam-bank.mjs).
//
// start:  { action:'start', courseId }            examen de un curso
//         { action:'start', kind:'master', pathId } examen maestro de una ruta (parte 1 del Certificado Maestro)
//   → { ok, attemptId, passingScore, questions:[{ text, options }], resumed }
// submit: { action:'submit', attemptId, answers:[índice elegido | null, ...] }
//   → { ok, pct, correct, total, passed, passingScore, bestScore, date, missed:[{ text, explanation }] }
//
// Límite honesto: el repositorio es público y data.js trae las respuestas de las
// preguntas de lección. El servidor prefiere las preguntas «solo de examen», pero
// quien busque las respuestas en el repositorio puede encontrarlas. Lo que se
// impide es fabricar la nota desde la consola: hay que aprobar un examen real,
// con tiempo mínimo, intentos limitados y rastro de auditoría.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY    = Deno.env.get('SUPABASE_ANON_KEY')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

// SYNC:START (generado por scripts/sync-cert-rules.mjs — no editar a mano)
const DEFAULT_PATHS: { id: string; courses: string[] }[] = [
  { id: "steam20", courses: ["steam","abp","design-thinking","evaluacion","tipos-estudiantes"] },
  { id: "creativo", courses: ["creatividad","herramientas-tec","abp","storytelling"] },
  { id: "metodologias", courses: ["abp","m-learning","flipped-classroom","abv","micro-learning"] },
  { id: "ia", courses: ["ia-fundamentos","ia-tiempo","ia-herramientas","ia-inclusion","ia-ciudadania"] },
  { id: "convivencia", courses: ["manejo-conductas","sel-docentes","comunicacion-asertiva","disciplina-positiva","bienestar-docente"] },
  { id: "inclusion", courses: ["educacion-inclusiva","tea-profundidad","discapacidad-down-tdah","lengua-senas-docentes"] },
  { id: "fundamentos", courses: ["fundamentos-pisa"] },
];
// SYNC:END

// PURE:START — lógica sin red ni base de datos (se prueba en Node, ver
// scripts/test-exam-grading.mjs)
const PASS_SCORE = 70;                 // examen de curso
const MASTER_PASS_SCORE = 75;          // examen maestro (MASTER_EXAM.passingScore en data.js)
const MASTER_MAX_QUESTIONS = 30;
const MAX_ATTEMPTS_PER_DAY = 6;        // intentos iniciados por docente y curso (o ruta) en 24 h
const MIN_SECONDS_PER_QUESTION = 3;    // por debajo, no es leer: no cuenta
const ATTEMPT_TTL_MIN = 180;           // un intento abierto se retoma o caduca a las 3 h

// `course` = course_id de la fila (para el examen maestro: el curso de donde viene la
// pregunta, o `master:<ruta>` si es una pregunta de síntesis de la ruta)
type BankQ = { idx: number; text: string; options: string[]; correct: number; explanation: string; source: 'exam' | 'lesson'; course?: string };
type Item = { q: number; perm: number[]; c?: string };   // `c` solo en el examen maestro

const isMasterKey = (courseKey: string) => courseKey.startsWith('master:');
const passFor = (courseKey: string) => (isMasterKey(courseKey) ? MASTER_PASS_SCORE : PASS_SCORE);
const qkey = (it: Item, defCourse: string) => `${it.c ?? defCourse}:${it.q}`;

// Mismo tamaño que usaba la app: 60 % del banco, entre 10 y 20 preguntas.
function examSize(bankLen: number): number {
  return Math.min(bankLen, Math.max(10, Math.min(20, Math.round(bankLen * 0.6))));
}
// Examen maestro: 30 preguntas, o ~60 % del banco si es chico.
function masterSize(poolLen: number): number {
  return Math.min(MASTER_MAX_QUESTIONS, poolLen, Math.max(10, Math.round(poolLen * 0.6)));
}

function shuffle<T>(a: T[], rnd: () => number): T[] {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Orden de preferencia: preguntas «solo de examen» que el docente no vio, luego las
// ya vistas, luego las de lección (cuyas respuestas están en las lecciones). Dentro de
// cada grupo, al azar.
function orderBank(bank: BankQ[], seen: Set<number>, rnd: () => number): BankQ[] {
  const tiers = [
    bank.filter((b) => b.source === 'exam' && !seen.has(b.idx)),
    bank.filter((b) => b.source === 'exam' && seen.has(b.idx)),
    bank.filter((b) => b.source === 'lesson' && !seen.has(b.idx)),
    bank.filter((b) => b.source === 'lesson' && seen.has(b.idx)),
  ];
  return tiers.flatMap((t) => shuffle(t, rnd));
}

const toItem = (b: BankQ, rnd: () => number, withCourse: boolean): Item => ({
  q: b.idx,
  perm: shuffle(b.options.map((_, i) => i), rnd),
  ...(withCourse ? { c: b.course } : {}),
});

// Examen de un curso: el orden final también se mezcla y cada pregunta lleva su propia
// permutación de opciones.
function drawExam(bank: BankQ[], seen: number[], rnd: () => number): Item[] {
  const picked = orderBank(bank, new Set(seen), rnd).slice(0, examSize(bank.length));
  return shuffle(picked, rnd).map((b) => toItem(b, rnd, false));
}

// Examen maestro de una ruta: se reparte entre los cursos de la ruta (uno a uno, para
// que todos queden representados) y, si la ruta tiene preguntas de síntesis, la mitad
// inicial sale de ahí — igual que lo armaba la app. `seen` son claves `curso:idx`.
function drawMasterExam(
  perCourse: { course: string; rows: BankQ[] }[], synthesis: BankQ[], seen: string[], rnd: () => number,
): Item[] {
  const seenSet = new Set(seen);
  const lists = perCourse.map(({ course, rows }) => {
    const tagged = rows.map((r) => ({ ...r, course }));
    const seenIdx = new Set(tagged.filter((r) => seenSet.has(`${course}:${r.idx}`)).map((r) => r.idx));
    return orderBank(tagged, seenIdx, rnd);
  }).filter((l) => l.length);
  const rr: BankQ[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) lists.forEach((l) => { if (i < l.length) rr.push(l[i]); });
  const synthTagged = synthesis.map((r) => ({ ...r, course: r.course as string }));
  const synthOrdered = orderBank(synthTagged, new Set(synthTagged.filter((r) => seenSet.has(`${r.course}:${r.idx}`)).map((r) => r.idx)), rnd);
  const pool = synthOrdered.length
    ? [...synthOrdered.slice(0, 15), ...rr.slice(0, 15), ...synthOrdered.slice(15), ...rr.slice(15)]
    : rr;
  return shuffle(pool.slice(0, masterSize(pool.length)), rnd).map((b) => toItem(b, rnd, true));
}

// Lo que ve el docente: texto y opciones ya en el orden permutado, sin la correcta.
function publicQuestions(items: Item[], byKey: Map<string, BankQ>, defCourse: string): { text: string; options: string[] }[] {
  return items.map((it) => {
    const b = byKey.get(qkey(it, defCourse))!;
    return { text: b.text, options: it.perm.map((p) => b.options[p]) };
  });
}

type Graded = { correct: number; total: number; pct: number; missed: { text: string; explanation: string }[] };

// `answers[i]` es la posición elegida entre las opciones MOSTRADAS; se traduce al
// índice original con la permutación del intento.
function gradeAttempt(items: Item[], byKey: Map<string, BankQ>, answers: (number | null)[], defCourse: string): Graded {
  let correct = 0;
  const missed: Graded['missed'] = [];
  items.forEach((it, i) => {
    const b = byKey.get(qkey(it, defCourse))!;
    const a = answers[i];
    const orig = typeof a === 'number' ? it.perm[a] : undefined;
    if (orig === b.correct) correct++;
    else missed.push({ text: b.text, explanation: b.explanation });
  });
  const total = items.length;
  return { correct, total, pct: total ? Math.round((correct / total) * 100) : 0, missed };
}

function validAnswers(answers: unknown, items: Item[]): answers is (number | null)[] {
  return Array.isArray(answers) && answers.length === items.length
    && answers.every((a, i) => a === null || (Number.isInteger(a) && a >= 0 && a < items[i].perm.length));
}

function tooFast(elapsedSec: number, total: number): boolean {
  return elapsedSec < total * MIN_SECONDS_PER_QUESTION;
}

// Como resolvePath de create-certificate-checkout: las rutas guardadas por el admin ganan;
// las del código se agregan si no están guardadas. Solo cuentan los cursos con banco.
function resolveMasterPath(pathId: string, saved: unknown, haveBank: (c: string) => boolean): string[] | null {
  const savedList = Array.isArray(saved) ? saved as any[] : [];
  const merged = [
    ...savedList.filter((p) => p && typeof p.id === 'string'),
    ...DEFAULT_PATHS.filter((d) => !savedList.some((p) => p?.id === d.id)),
  ];
  const found = merged.find((p) => p.id === pathId);
  if (!found) return null;
  const courses = (Array.isArray(found.courses) ? found.courses : []).map(String).filter(haveBank);
  return courses.length ? courses : null;
}
// PURE:END

// Fecha de hoy en Guatemala (UTC-6, sin horario de verano), AAAA-MM-DD
function todayGT(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No autorizado' }, 401);
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: authErr } = await userClient.auth.getUser();
    if (authErr || !user) return json({ error: 'No autorizado' }, 401);

    const body = await req.json();
    const action = String(body.action || '');
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const COLS = 'idx, text, options, correct, explanation, source';

    // ── start ──────────────────────────────────────────────────────────
    if (action === 'start') {
      const master = body.kind === 'master';
      const pathId = String(body.pathId || '').trim();
      const courseId = String(body.courseId || '').trim();
      if (master ? !pathId : !courseId) return json({ error: master ? 'pathId es requerido' : 'courseId es requerido' }, 400);
      const attemptKey = master ? `master:${pathId}` : courseId;   // se guarda como course_id del intento

      // Banco: de un curso, o (maestro) el de cada curso de la ruta + las preguntas de síntesis
      let bank: BankQ[] = [];
      let perCourse: { course: string; rows: BankQ[] }[] = [];
      let synthesis: BankQ[] = [];
      if (master) {
        const { data: cfg } = await admin.from('app_config').select('value').eq('key', 'learning_paths').maybeSingle();
        const { data: avail } = await admin.from('exam_questions').select('course_id');
        const haveBank = new Set((avail || []).map((r: any) => r.course_id as string));
        const courses = resolveMasterPath(pathId, cfg?.value, (c) => haveBank.has(c));
        if (!courses) return json({ error: 'Esa ruta aún no tiene examen maestro en el servidor.', code: 'no_bank' }, 404);
        const { data: rows, error: bankErr } = await admin.from('exam_questions')
          .select('course_id, ' + COLS).in('course_id', [...courses, attemptKey]).order('idx');
        if (bankErr) return json({ error: 'No se pudo leer el examen: ' + bankErr.message }, 500);
        perCourse = courses.map((c) => ({ course: c, rows: (rows || []).filter((r: any) => r.course_id === c) as BankQ[] }));
        synthesis = (rows || []).filter((r: any) => r.course_id === attemptKey).map((r: any) => ({ ...r, course: attemptKey })) as BankQ[];
        bank = [...perCourse.flatMap((p) => p.rows.map((r) => ({ ...r, course: p.course }))), ...synthesis];
      } else {
        const { data: rows, error: bankErr } = await admin.from('exam_questions').select(COLS).eq('course_id', courseId).order('idx');
        if (bankErr) return json({ error: 'No se pudo leer el examen: ' + bankErr.message }, 500);
        if (!rows || !rows.length) return json({ error: 'Este curso aún no tiene examen en el servidor.', code: 'no_bank' }, 404);
        bank = rows as BankQ[];
      }
      const byKey = new Map(bank.map((b) => [`${b.course ?? attemptKey}:${b.idx}`, b]));

      // Un intento abierto y reciente se retoma (no se pueden pedir exámenes sin
      // límite para ver todo el banco).
      const since = new Date(Date.now() - ATTEMPT_TTL_MIN * 60_000).toISOString();
      const { data: open } = await admin.from('exam_attempts').select('id, items')
        .eq('user_id', user.id).eq('course_id', attemptKey).is('submitted_at', null)
        .gte('started_at', since).order('started_at', { ascending: false }).limit(1);
      if (open && open.length) {
        const items = open[0].items as Item[];
        if (items.every((it) => byKey.has(qkey(it, attemptKey)))) {
          return json({ ok: true, resumed: true, attemptId: open[0].id, passingScore: passFor(attemptKey), questions: publicQuestions(items, byKey, attemptKey) });
        }
      }

      const { count } = await admin.from('exam_attempts').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).eq('course_id', attemptKey)
        .gte('started_at', new Date(Date.now() - 864e5).toISOString());
      if ((count || 0) >= MAX_ATTEMPTS_PER_DAY) {
        return json({ error: 'Ya hiciste varios intentos hoy. Repasa el curso e inténtalo de nuevo mañana.', code: 'too_many_attempts' }, 429);
      }

      const { data: prev } = await admin.from('exam_attempts').select('items')
        .eq('user_id', user.id).eq('course_id', attemptKey).order('started_at', { ascending: false }).limit(2);
      const prevItems = (prev || []).flatMap((p: any) => p.items as Item[]);

      const items = master
        ? drawMasterExam(perCourse, synthesis, prevItems.map((it) => qkey(it, attemptKey)), Math.random)
        : drawExam(bank, prevItems.map((it) => it.q), Math.random);
      if (!items.length) return json({ error: 'No hay preguntas disponibles.', code: 'no_bank' }, 404);
      const { data: ins, error: insErr } = await admin.from('exam_attempts')
        .insert({ user_id: user.id, course_id: attemptKey, items }).select('id').single();
      if (insErr || !ins) return json({ error: 'No se pudo iniciar el examen: ' + (insErr?.message || '') }, 500);
      return json({ ok: true, resumed: false, attemptId: ins.id, passingScore: passFor(attemptKey), questions: publicQuestions(items, byKey, attemptKey) });
    }

    // ── submit ─────────────────────────────────────────────────────────
    if (action === 'submit') {
      const attemptId = String(body.attemptId || '');
      const { data: att } = await admin.from('exam_attempts').select('id, course_id, items, started_at, submitted_at')
        .eq('id', attemptId).eq('user_id', user.id).maybeSingle();
      if (!att) return json({ error: 'No encontramos ese intento.', code: 'unknown_attempt' }, 404);
      if (att.submitted_at) return json({ error: 'Ese intento ya se envió.', code: 'already_submitted' }, 409);
      const startedMs = new Date(att.started_at).getTime();
      if (Date.now() - startedMs > ATTEMPT_TTL_MIN * 60_000) {
        return json({ error: 'El intento caducó. Empieza un examen nuevo.', code: 'expired' }, 410);
      }
      const items = att.items as Item[];
      if (!validAnswers(body.answers, items)) return json({ error: 'Respuestas inválidas.' }, 400);

      const attemptKey = att.course_id as string;
      const courses = [...new Set(items.map((i) => i.c ?? attemptKey))];
      const { data: rows } = await admin.from('exam_questions')
        .select('course_id, ' + COLS).in('course_id', courses).in('idx', items.map((i) => i.q));
      const byKey = new Map((rows || []).map((r: any) => [`${r.course_id}:${r.idx}`, r as BankQ]));
      if (items.some((it) => !byKey.has(qkey(it, attemptKey)))) return json({ error: 'El examen cambió; empieza uno nuevo.', code: 'bank_changed' }, 409);

      const passing = passFor(attemptKey);
      const g = gradeAttempt(items, byKey, body.answers, attemptKey);
      const fast = tooFast((Date.now() - startedMs) / 1000, g.total);
      const passed = !fast && g.pct >= passing;
      const flags = fast ? ['demasiado_rapido'] : [];

      await admin.from('exam_attempts').update({
        answers: body.answers, submitted_at: new Date().toISOString(),
        correct_count: g.correct, total: g.total, score: g.pct, passed, flags,
      }).eq('id', attemptId);

      let bestScore: number | null = null;
      if (passed) {
        const { data: best } = await admin.rpc('record_exam_result', { p_user: user.id, p_course: attemptKey, p_score: g.pct });
        bestScore = typeof best === 'number' ? best : g.pct;
      }
      return json({
        ok: true, pct: g.pct, correct: g.correct, total: g.total, passed, tooFast: fast,
        passingScore: passing, bestScore, date: todayGT(), missed: g.missed,
        message: fast ? 'Respondiste demasiado rápido para leer las preguntas. Inténtalo con calma.' : undefined,
      });
    }

    return json({ error: 'action inválida' }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
