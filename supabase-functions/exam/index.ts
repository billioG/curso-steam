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
// start:  { action:'start', courseId }
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

// PURE:START — lógica sin red ni base de datos (se prueba en Node, ver
// scripts/test-exam-grading.mjs)
const PASS_SCORE = 70;
const MAX_ATTEMPTS_PER_DAY = 6;        // intentos iniciados por docente y curso en 24 h
const MIN_SECONDS_PER_QUESTION = 3;    // por debajo, no es leer: no cuenta
const ATTEMPT_TTL_MIN = 180;           // un intento abierto se retoma o caduca a las 3 h

type BankQ = { idx: number; text: string; options: string[]; correct: number; explanation: string; source: 'exam' | 'lesson' };
type Item = { q: number; perm: number[] };

// Mismo tamaño que usaba la app: 60 % del banco, entre 10 y 20 preguntas.
function examSize(bankLen: number): number {
  return Math.min(bankLen, Math.max(10, Math.min(20, Math.round(bankLen * 0.6))));
}

function shuffle<T>(a: T[], rnd: () => number): T[] {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Sortea el examen: primero preguntas «solo de examen» que el docente no vio en
// sus intentos anteriores, luego las ya vistas, luego las de lección (cuyas
// respuestas están en las lecciones). Dentro de cada grupo, al azar; el orden
// final también se mezcla y cada pregunta lleva su propia permutación de opciones.
function drawExam(bank: BankQ[], seen: number[], rnd: () => number): Item[] {
  const seenSet = new Set(seen);
  const tiers = [
    bank.filter((b) => b.source === 'exam' && !seenSet.has(b.idx)),
    bank.filter((b) => b.source === 'exam' && seenSet.has(b.idx)),
    bank.filter((b) => b.source === 'lesson' && !seenSet.has(b.idx)),
    bank.filter((b) => b.source === 'lesson' && seenSet.has(b.idx)),
  ];
  const size = examSize(bank.length);
  const picked: BankQ[] = [];
  for (const t of tiers) {
    for (const b of shuffle(t, rnd)) { if (picked.length < size) picked.push(b); }
  }
  return shuffle(picked, rnd).map((b) => ({
    q: b.idx,
    perm: shuffle(b.options.map((_, i) => i), rnd),
  }));
}

// Lo que ve el docente: texto y opciones ya en el orden permutado, sin la correcta.
function publicQuestions(items: Item[], byIdx: Map<number, BankQ>): { text: string; options: string[] }[] {
  return items.map((it) => {
    const b = byIdx.get(it.q)!;
    return { text: b.text, options: it.perm.map((p) => b.options[p]) };
  });
}

type Graded = { correct: number; total: number; pct: number; missed: { text: string; explanation: string }[] };

// `answers[i]` es la posición elegida entre las opciones MOSTRADAS; se traduce al
// índice original con la permutación del intento.
function gradeAttempt(items: Item[], byIdx: Map<number, BankQ>, answers: (number | null)[]): Graded {
  let correct = 0;
  const missed: Graded['missed'] = [];
  items.forEach((it, i) => {
    const b = byIdx.get(it.q)!;
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

    // ── start ──────────────────────────────────────────────────────────
    if (action === 'start') {
      const courseId = String(body.courseId || '').trim();
      if (!courseId) return json({ error: 'courseId es requerido' }, 400);

      const { data: rows, error: bankErr } = await admin.from('exam_questions')
        .select('idx, text, options, correct, explanation, source').eq('course_id', courseId).order('idx');
      if (bankErr) return json({ error: 'No se pudo leer el examen: ' + bankErr.message }, 500);
      if (!rows || !rows.length) return json({ error: 'Este curso aún no tiene examen en el servidor.', code: 'no_bank' }, 404);
      const bank: BankQ[] = rows as BankQ[];
      const byIdx = new Map(bank.map((b) => [b.idx, b]));

      // Un intento abierto y reciente se retoma (no se pueden pedir exámenes sin
      // límite para ver todo el banco).
      const since = new Date(Date.now() - ATTEMPT_TTL_MIN * 60_000).toISOString();
      const { data: open } = await admin.from('exam_attempts').select('id, items')
        .eq('user_id', user.id).eq('course_id', courseId).is('submitted_at', null)
        .gte('started_at', since).order('started_at', { ascending: false }).limit(1);
      if (open && open.length) {
        const items = open[0].items as Item[];
        if (items.every((it) => byIdx.has(it.q))) {
          return json({ ok: true, resumed: true, attemptId: open[0].id, passingScore: PASS_SCORE, questions: publicQuestions(items, byIdx) });
        }
      }

      const { count } = await admin.from('exam_attempts').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).eq('course_id', courseId)
        .gte('started_at', new Date(Date.now() - 864e5).toISOString());
      if ((count || 0) >= MAX_ATTEMPTS_PER_DAY) {
        return json({ error: 'Ya hiciste varios intentos hoy. Repasa el curso e inténtalo de nuevo mañana.', code: 'too_many_attempts' }, 429);
      }

      const { data: prev } = await admin.from('exam_attempts').select('items')
        .eq('user_id', user.id).eq('course_id', courseId).order('started_at', { ascending: false }).limit(2);
      const seen = (prev || []).flatMap((p: any) => (p.items as Item[]).map((it) => it.q));

      const items = drawExam(bank, seen, Math.random);
      const { data: ins, error: insErr } = await admin.from('exam_attempts')
        .insert({ user_id: user.id, course_id: courseId, items }).select('id').single();
      if (insErr || !ins) return json({ error: 'No se pudo iniciar el examen: ' + (insErr?.message || '') }, 500);
      return json({ ok: true, resumed: false, attemptId: ins.id, passingScore: PASS_SCORE, questions: publicQuestions(items, byIdx) });
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

      const { data: rows } = await admin.from('exam_questions')
        .select('idx, text, options, correct, explanation, source').eq('course_id', att.course_id).in('idx', items.map((i) => i.q));
      const byIdx = new Map((rows || []).map((r: any) => [r.idx as number, r as BankQ]));
      if (items.some((it) => !byIdx.has(it.q))) return json({ error: 'El examen cambió; empieza uno nuevo.', code: 'bank_changed' }, 409);

      const g = gradeAttempt(items, byIdx, body.answers);
      const fast = tooFast((Date.now() - startedMs) / 1000, g.total);
      const passed = !fast && g.pct >= PASS_SCORE;
      const flags = fast ? ['demasiado_rapido'] : [];

      await admin.from('exam_attempts').update({
        answers: body.answers, submitted_at: new Date().toISOString(),
        correct_count: g.correct, total: g.total, score: g.pct, passed, flags,
      }).eq('id', attemptId);

      let bestScore: number | null = null;
      if (passed) {
        const { data: best } = await admin.rpc('record_exam_result', { p_user: user.id, p_course: att.course_id, p_score: g.pct });
        bestScore = typeof best === 'number' ? best : g.pct;
      }
      return json({
        ok: true, pct: g.pct, correct: g.correct, total: g.total, passed, tooFast: fast,
        passingScore: PASS_SCORE, bestScore, date: todayGT(), missed: g.missed,
        message: fast ? 'Respondiste demasiado rápido para leer las preguntas. Inténtalo con calma.' : undefined,
      });
    }

    return json({ error: 'action inválida' }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
