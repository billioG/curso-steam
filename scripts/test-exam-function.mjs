#!/usr/bin/env node
// Prueba de integración de la Edge Function `exam` SIN Supabase: se ejecuta el handler
// real (con los tipos de TypeScript quitados) contra un cliente de base de datos en
// memoria. Verifica el flujo start → submit y las defensas: respuestas inválidas,
// reenvío, intento ajeno, caducidad, demasiado rápido, límite diario, reanudación.
// Uso: node scripts/test-exam-function.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { stripTypeScriptTypes } from 'node:module';

let src = readFileSync('supabase-functions/exam/index.ts', 'utf8');
src = src.replace(/^import .*createClient.*$/m, '');
const code = stripTypeScriptTypes(src);

// ── Base de datos en memoria con la forma mínima de PostgREST que usa la función ──
const db = { exam_questions: [], exam_attempts: [], exam_results: [], app_config: [] };
let idSeq = 0;
function table(name) {
  const rows = db[name];
  const q = { f: [], order: null, lim: null, cols: null, count: false, head: false, op: 'select', payload: null };
  const b = {
    select(cols, opt = {}) { q.cols = cols; if (q.op === 'select') q.op = 'select'; q.count = !!opt.count; q.head = !!opt.head; return b; },
    insert(p) { q.op = 'insert'; q.payload = p; return b; },
    update(p) { q.op = 'update'; q.payload = p; return b; },
    eq(k, v) { q.f.push((r) => r[k] === v); return b; },
    is(k, v) { q.f.push((r) => (v === null ? r[k] == null : r[k] === v)); return b; },
    gte(k, v) { q.f.push((r) => String(r[k]) >= String(v)); return b; },
    in(k, vs) { q.f.push((r) => vs.includes(r[k])); return b; },
    order(k, o = {}) { q.order = [k, o.ascending !== false]; return b; },
    limit(n) { q.lim = n; return b; },
    _run() {
      let out;
      if (q.op === 'insert') { const r = { id: `id${++idSeq}`, started_at: new Date().toISOString(), submitted_at: null, ...q.payload }; rows.push(r); out = [r]; }
      else if (q.op === 'update') { out = rows.filter((r) => q.f.every((fn) => fn(r))); out.forEach((r) => Object.assign(r, q.payload)); }
      else {
        out = rows.filter((r) => q.f.every((fn) => fn(r)));
        if (q.order) { const [k, asc] = q.order; out = out.slice().sort((a, c) => (String(a[k]) < String(c[k]) ? -1 : 1) * (asc ? 1 : -1)); }
        if (q.lim) out = out.slice(0, q.lim);
      }
      return out;
    },
    then(res, rej) {
      const out = b._run();
      Promise.resolve(q.head ? { data: null, count: out.length, error: null } : { data: out, count: out.length, error: null }).then(res, rej);
    },
    maybeSingle() { const o = b._run(); return Promise.resolve({ data: o[0] || null, error: null }); },
    single() { const o = b._run(); return Promise.resolve({ data: o[0] || null, error: o[0] ? null : { message: 'sin filas' } }); },
  };
  return b;
}
const USERS = { 'Bearer tok-ana': { id: 'u-ana' }, 'Bearer tok-luis': { id: 'u-luis' } };
const fakeClient = (url, key, opt) => ({
  auth: { getUser: async () => { const u = USERS[opt?.global?.headers?.Authorization]; return u ? { data: { user: u }, error: null } : { data: { user: null }, error: { message: 'no' } }; } },
  from: table,
  rpc: async (fn, a) => {
    if (fn !== 'record_exam_result') return { data: null, error: { message: 'rpc?' } };
    const cur = db.exam_results.find((r) => r.user_id === a.p_user && r.course_id === a.p_course);
    if (cur) { cur.best_score = Math.max(cur.best_score, a.p_score); return { data: cur.best_score, error: null }; }
    db.exam_results.push({ user_id: a.p_user, course_id: a.p_course, best_score: a.p_score }); return { data: a.p_score, error: null };
  },
});
let handler;
const env = { SUPABASE_URL: 'http://x', SUPABASE_ANON_KEY: 'a', SUPABASE_SERVICE_ROLE_KEY: 's' };
new Function('Deno', 'createClient', 'Response', 'Intl', code)({ env: { get: (k) => env[k] }, serve: (h) => { handler = h; } }, fakeClient, Response, Intl);

const call = async (body, token = 'tok-ana') => {
  const r = await handler(new Request('http://x/exam', { method: 'POST', headers: token ? { Authorization: `Bearer ${token}` } : {}, body: JSON.stringify(body) }));
  return { status: r.status, body: await r.json() };
};
let n = 0; const ok = (m) => { n++; console.log('  ✓', m); };

// banco: 24 preguntas, correcta = idx % 4
for (let i = 0; i < 24; i++) db.exam_questions.push({ course_id: 'abp', idx: i, text: `P${i}`, options: ['a', 'b', 'c', 'd'], correct: i % 4, explanation: `exp ${i}`, source: i < 16 ? 'exam' : 'lesson' });
// Respuestas correctas del intento, calculadas con la permutación guardada (como haría un docente que SÍ sabe)
const correctAnswers = (att) => att.items.map((it) => it.perm.indexOf(db.exam_questions.find((q) => q.course_id === 'abp' && q.idx === it.q).correct));
const backdate = (att, sec) => { att.started_at = new Date(Date.now() - sec * 1000).toISOString(); };

let r = await call({ action: 'start', courseId: 'abp' }, null); assert.equal(r.status, 401); ok('sin sesión → 401');
r = await call({ action: 'start', courseId: 'abp' }, 'tok-fake'); assert.equal(r.status, 401); ok('token inválido → 401');
r = await call({ action: 'start' }); assert.equal(r.status, 400); ok('sin courseId → 400');
r = await call({ action: 'start', courseId: 'no-existe' }); assert.equal(r.status, 404); assert.equal(r.body.code, 'no_bank'); ok('curso sin banco → 404 no_bank (la app cae al examen de práctica)');
r = await call({ action: 'otra' }); assert.equal(r.status, 400); ok('acción inválida → 400');

r = await call({ action: 'start', courseId: 'abp' });
assert.equal(r.status, 200); assert.equal(r.body.questions.length, 14); assert.equal(r.body.passingScore, 70);
assert.ok(r.body.questions.every((q) => Object.keys(q).sort().join() === 'options,text')); ok('start: 14 preguntas, solo texto y opciones (nada de la correcta)');
assert.ok(!JSON.stringify(r.body).includes('"correct"') && !JSON.stringify(r.body).includes('exp ')); ok('la respuesta no incluye `correct` ni explicaciones');
const att1 = db.exam_attempts[0]; const id1 = r.body.attemptId;
assert.ok(att1.items.every((it) => it.q < 16 || true) && att1.items.filter((it) => it.q < 16).length === 14); ok('prefiere las preguntas solo de examen (14 de 14)');

r = await call({ action: 'start', courseId: 'abp' }); assert.equal(r.body.resumed, true); assert.equal(r.body.attemptId, id1); assert.equal(db.exam_attempts.length, 1); ok('pedir otro examen con uno abierto lo reanuda (no se puede "mirar" el banco)');

// submit inválido
r = await call({ action: 'submit', attemptId: id1, answers: [0, 1] }); assert.equal(r.status, 400); ok('respuestas de longitud incorrecta → 400');
r = await call({ action: 'submit', attemptId: id1, answers: Array(14).fill(9) }); assert.equal(r.status, 400); ok('opción fuera de rango → 400');
r = await call({ action: 'submit', attemptId: 'nada', answers: [] }); assert.equal(r.status, 404); ok('intento inexistente → 404');
r = await call({ action: 'submit', attemptId: id1, answers: correctAnswers(att1) }, 'tok-luis'); assert.equal(r.status, 404); ok('intento de otro docente → 404');

// demasiado rápido
r = await call({ action: 'submit', attemptId: id1, answers: correctAnswers(att1) });
assert.equal(r.body.passed, false); assert.equal(r.body.tooFast, true); assert.equal(r.body.pct, 100);
assert.deepEqual(att1.flags, ['demasiado_rapido']); assert.equal(db.exam_results.length, 0); ok('100 % en menos de 3 s/pregunta → NO aprueba, queda alerta y no se guarda resultado');
r = await call({ action: 'submit', attemptId: id1, answers: correctAnswers(att1) }); assert.equal(r.status, 409); ok('reenviar el mismo intento → 409');

// intento normal aprobado
r = await call({ action: 'start', courseId: 'abp' }); const att2 = db.exam_attempts[1];
assert.equal(r.body.resumed, false); const seen1 = new Set(att1.items.map((i) => i.q)); ok('tras enviar, start abre un intento nuevo');
backdate(att2, 120);
r = await call({ action: 'submit', attemptId: r.body.attemptId, answers: correctAnswers(att2) });
assert.equal(r.status, 200); assert.equal(r.body.passed, true); assert.equal(r.body.pct, 100); assert.equal(r.body.bestScore, 100); assert.equal(r.body.missed.length, 0);
assert.match(r.body.date, /^\d{4}-\d{2}-\d{2}$/); assert.equal(db.exam_results[0].best_score, 100); ok('100 % con tiempo normal → aprobado, resultado guardado por el servidor');

// aprobado justo en 70 y fallado con revisión
r = await call({ action: 'start', courseId: 'abp' }); const att3 = db.exam_attempts[2]; backdate(att3, 120);
const wrongFor = (att, k) => correctAnswers(att).map((a, i) => (i < k ? (a + 1) % 4 : a));
r = await call({ action: 'submit', attemptId: att3.id, answers: wrongFor(att3, 4) }); // 10/14 = 71 %
assert.equal(r.body.pct, 71); assert.equal(r.body.passed, true); assert.equal(r.body.bestScore, 100); assert.equal(r.body.missed.length, 4); ok('71 % aprueba y conserva la mejor nota (100)');
r = await call({ action: 'start', courseId: 'abp' }); const att4 = db.exam_attempts[3]; backdate(att4, 120);
r = await call({ action: 'submit', attemptId: att4.id, answers: wrongFor(att4, 5) }); // 9/14 = 64 %
assert.equal(r.body.passed, false); assert.equal(r.body.pct, 64); assert.equal(r.body.missed.length, 5);
assert.ok(r.body.missed.every((m) => m.text && m.explanation && !('correct' in m))); ok('64 % no aprueba y devuelve las falladas con su explicación, sin la letra correcta');
r = await call({ action: 'start', courseId: 'abp' }); const att5 = db.exam_attempts[4]; backdate(att5, 120);
r = await call({ action: 'submit', attemptId: att5.id, answers: Array(14).fill(null) }); assert.equal(r.body.pct, 0); assert.equal(db.exam_results.length, 1); ok('todo en blanco → 0 % y no toca el resultado');

// preguntas nuevas entre intentos
const idsA = new Set(att4.items.map((i) => i.q)), idsB = new Set(att5.items.map((i) => i.q));
assert.ok([...idsB].some((q) => !idsA.has(q)) || idsA.size === 16); ok('el siguiente intento prioriza preguntas no vistas');

// límite diario (ya van 5 intentos iniciados)
r = await call({ action: 'start', courseId: 'abp' }); const att6 = db.exam_attempts[5]; backdate(att6, 120);
await call({ action: 'submit', attemptId: att6.id, answers: Array(14).fill(null) });
r = await call({ action: 'start', courseId: 'abp' });
assert.equal(r.status, 429); assert.equal(r.body.code, 'too_many_attempts'); ok('el séptimo intento del día → 429');
r = await call({ action: 'start', courseId: 'abp' }, 'tok-luis'); assert.equal(r.status, 200); ok('el límite es por docente: otro docente puede presentar');

// caducidad
const old = db.exam_attempts.find((a) => a.user_id === 'u-luis'); backdate(old, 200 * 60);
r = await call({ action: 'submit', attemptId: old.id, answers: Array(14).fill(0) }, 'tok-luis'); assert.equal(r.status, 410); ok('intento de más de 3 h → 410 caducado');

// el banco cambió
const att7 = (await call({ action: 'start', courseId: 'abp' }, 'tok-luis')); const a7 = db.exam_attempts.find((a) => a.id === att7.body.attemptId); backdate(a7, 120);
db.exam_questions = db.exam_questions.filter((q) => q.idx !== a7.items[0].q);
r = await call({ action: 'submit', attemptId: a7.id, answers: Array(a7.items.length).fill(0) }, 'tok-luis'); assert.equal(r.status, 409); assert.equal(r.body.code, 'bank_changed'); ok('si el banco cambió a mitad del intento → 409 bank_changed');

// ── Examen maestro ──
// rutas de código: sin DEFAULT_PATHS (el bloque SYNC va vacío en la prueba): el admin guarda una
db.app_config.push({ key: 'learning_paths', value: [{ id: 'rutaX', courses: ['abp', 'otro', 'fantasma'] }] });
for (let i = 0; i < 20; i++) db.exam_questions.push({ course_id: 'otro', idx: i, text: `O${i}`, options: ['a', 'b', 'c', 'd'], correct: (i + 1) % 4, explanation: `exp O${i}`, source: 'exam' });
for (let i = 0; i < 8; i++) db.exam_questions.push({ course_id: 'master:rutaX', idx: i, text: `S${i}`, options: ['a', 'b', 'c', 'd'], correct: 2, explanation: `exp S${i}`, source: 'exam' });
db.exam_questions.push(...Array.from({ length: 24 }, (_, i) => ({ course_id: 'abp', idx: 100 + i, text: `P${100 + i}`, options: ['a', 'b', 'c', 'd'], correct: i % 4, explanation: '', source: 'exam' })).filter(() => false));
const keyOf = (c, q) => db.exam_questions.find((x) => x.course_id === c && x.idx === q);
const mCorrect = (att) => att.items.map((it) => it.perm.indexOf(keyOf(it.c, it.q).correct));
db.exam_attempts.length = 0; db.exam_results.length = 0;

r = await call({ action: 'start', kind: 'master' }); assert.equal(r.status, 400); ok('maestro sin pathId → 400');
r = await call({ action: 'start', kind: 'master', pathId: 'noexiste' }); assert.equal(r.status, 404); assert.equal(r.body.code, 'no_bank'); ok('ruta desconocida → 404 no_bank (la app cae a práctica)');
r = await call({ action: 'start', kind: 'master', pathId: 'rutaX' });
assert.equal(r.status, 200); assert.equal(r.body.passingScore, 75); assert.ok(r.body.questions.length >= 10 && r.body.questions.length <= 30);
assert.ok(r.body.questions.every((q) => Object.keys(q).sort().join() === 'options,text')); ok('maestro: preguntas de la ruta (admin), aprobación 75, sin respuestas');
const m1 = db.exam_attempts[0]; assert.equal(m1.course_id, 'master:rutaX');
const cs = new Set(m1.items.map((i) => i.c)); assert.ok(cs.has('abp') && cs.has('otro') && cs.has('master:rutaX')); ok('mezcla cursos de la ruta y preguntas de síntesis: ' + [...cs].join(', '));
assert.ok(!cs.has('fantasma')); ok('ignora cursos sin banco');
r = await call({ action: 'start', kind: 'master', pathId: 'rutaX' }); assert.equal(r.body.resumed, true); ok('maestro: reanuda el intento abierto');
backdate(m1, 300);
r = await call({ action: 'submit', attemptId: m1.id, answers: mCorrect(m1) });
assert.equal(r.status, 200); assert.equal(r.body.passed, true); assert.equal(r.body.pct, 100);
assert.equal(db.exam_results.find((x) => x.course_id === 'master:rutaX').best_score, 100); ok('maestro: 100 % → aprobado y guardado como master:rutaX');
r = await call({ action: 'start', kind: 'master', pathId: 'rutaX' }); const m2 = db.exam_attempts[1]; backdate(m2, 300);
const ans2 = mCorrect(m2); const k = Math.ceil(ans2.length * 0.3);
r = await call({ action: 'submit', attemptId: m2.id, answers: ans2.map((a, i) => (i < k ? (a + 1) % 4 : a)) });
assert.ok(r.body.pct < 75 && r.body.pct >= 60, String(r.body.pct)); assert.equal(r.body.passed, false); assert.equal(r.body.bestScore, null); ok('maestro: ' + r.body.pct + ' % no aprueba (necesita 75) y no toca la mejor nota');
r = await call({ action: 'start', kind: 'master', pathId: 'rutaX' }); const m3 = db.exam_attempts[2]; backdate(m3, 300);
const ans3 = mCorrect(m3); const k3 = Math.floor(ans3.length * 0.2);
r = await call({ action: 'submit', attemptId: m3.id, answers: ans3.map((a, i) => (i < k3 ? (a + 1) % 4 : a)) });
assert.ok(r.body.pct >= 75 && r.body.pct < 100); assert.equal(r.body.passed, true); assert.equal(r.body.bestScore, 100); ok('maestro: ' + r.body.pct + ' % aprueba y se conserva la mejor (100)');
r = await call({ action: 'start', kind: 'master', pathId: 'rutaX' }, 'tok-luis'); const ml = db.exam_attempts.find((a) => a.user_id === 'u-luis' && a.course_id === 'master:rutaX');
r = await call({ action: 'submit', attemptId: ml.id, answers: mCorrect(ml) }, 'tok-luis'); assert.equal(r.body.tooFast, true); assert.equal(r.body.passed, false); ok('maestro: demasiado rápido tampoco aprueba');
console.log(`${n} comprobaciones OK`);
