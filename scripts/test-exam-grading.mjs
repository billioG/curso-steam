#!/usr/bin/env node
// Prueba la lógica pura de la Edge Function `exam` (sorteo, permutación de
// opciones, calificación, validación de respuestas, tiempo mínimo).
// Uso: node scripts/test-exam-grading.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { stripTypeScriptTypes } from 'node:module';

const src = readFileSync('supabase-functions/exam/index.ts', 'utf8');
const block = src.match(/\/\/ SYNC:START[\s\S]*?\/\/ SYNC:END/)[0] + '\n' + src.match(/\/\/ PURE:START[\s\S]*?\/\/ PURE:END/)[0];
const code = stripTypeScriptTypes(block);
const L = new Function(`${code}\nreturn { PASS_SCORE, MASTER_PASS_SCORE, MAX_ATTEMPTS_PER_DAY, examSize, masterSize, shuffle, drawExam, drawMasterExam, publicQuestions, gradeAttempt, validAnswers, tooFast, resolveMasterPath, qkey, passFor };`)();
let n = 0; const ok = (m) => { n++; console.log('  ✓', m); };

// RNG determinista para pruebas repetibles
let s = 12345; const rnd = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
const mkBank = (nExam, nLesson) => [
  ...Array.from({ length: nExam }, (_, i) => ({ idx: i, text: `E${i}`, options: ['a', 'b', 'c', 'd'], correct: i % 4, explanation: `exp E${i}`, source: 'exam' })),
  ...Array.from({ length: nLesson }, (_, i) => ({ idx: nExam + i, text: `L${i}`, options: ['a', 'b', 'c', 'd'], correct: (i + 1) % 4, explanation: `exp L${i}`, source: 'lesson' })),
];

// tamaños
assert.equal(L.examSize(30), 18); assert.equal(L.examSize(24), 14); assert.equal(L.examSize(12), 10); assert.equal(L.examSize(8), 8); assert.equal(L.examSize(40), 20);
ok('tamaño del examen: 60 % del banco, entre 10 y 20 (o el banco entero si es menor)');

// preferencia por «solo de examen»
let bank = mkBank(16, 8), items = L.drawExam(bank, [], rnd);
assert.equal(items.length, 14);
assert.ok(items.every((it) => it.q < 16)); ok('con suficientes preguntas solo de examen, no se usan las de lección');
bank = mkBank(8, 16); items = L.drawExam(bank, [], rnd);
const nExam = items.filter((it) => it.q < 8).length;
assert.equal(items.length, 14); assert.equal(nExam, 8); ok('con pocas de examen (8), entran todas y se completa con las de lección');

// no repetir lo visto mientras haya nuevas
bank = mkBank(30, 0); const seen = Array.from({ length: 12 }, (_, i) => i);
items = L.drawExam(bank, seen, rnd);
assert.ok(items.every((it) => !seen.includes(it.q))); ok('prioriza preguntas que el docente no vio en sus intentos anteriores');
items = L.drawExam(mkBank(18, 0), Array.from({ length: 16 }, (_, i) => i), rnd);
assert.equal(items.length, 11); ok('si ya vio casi todo, repite las vistas para completar');

// sin duplicados y permutaciones válidas
items = L.drawExam(mkBank(30, 0), [], rnd);
assert.equal(new Set(items.map((i) => i.q)).size, items.length); ok('sin preguntas repetidas en un examen');
assert.ok(items.every((it) => [...it.perm].sort().join() === '0,1,2,3')); ok('cada pregunta lleva una permutación válida de sus opciones');

// calificación con permutación
bank = mkBank(10, 0); const by = new Map(bank.map((b) => [`abp:${b.idx}`, b]));
items = [{ q: 0, perm: [2, 0, 1, 3] }, { q: 1, perm: [3, 2, 1, 0] }, { q: 2, perm: [0, 1, 2, 3] }];
// q0 correct=0 → está en la posición mostrada 1 (perm[1]=0); q1 correct=1 → posición 2; q2 correct=2 → posición 2
let g = L.gradeAttempt(items, by, [1, 2, 2], 'abp');
assert.equal(g.correct, 3); assert.equal(g.pct, 100); assert.equal(g.missed.length, 0); ok('traduce la opción mostrada a la original con la permutación');
g = L.gradeAttempt(items, by, [0, 2, null], 'abp');
assert.equal(g.correct, 1); assert.equal(g.pct, 33); assert.equal(g.missed.length, 2); assert.equal(g.missed[0].explanation, 'exp E0'); ok('respuestas malas o en blanco cuentan como falladas y devuelven su explicación');
// la respuesta ORIGINAL (sin traducir) no engaña
g = L.gradeAttempt([{ q: 0, perm: [2, 0, 1, 3] }], by, [0], 'abp');
assert.equal(g.correct, 0); ok('elegir la posición «0» no equivale a la opción original 0');

// publicQuestions no filtra la correcta
const pub = L.publicQuestions(items, by, 'abp');
assert.deepEqual(Object.keys(pub[0]).sort(), ['options', 'text']); ok('lo que recibe el navegador solo tiene texto y opciones');
assert.deepEqual(pub[0].options, [bank[0].options[2], bank[0].options[0], bank[0].options[1], bank[0].options[3]]); ok('las opciones salen en el orden permutado');

// validación de respuestas
const it3 = [{ q: 0, perm: [0, 1, 2, 3] }, { q: 1, perm: [0, 1, 2, 3] }];
assert.ok(L.validAnswers([0, null], it3)); assert.ok(L.validAnswers([3, 2], it3)); ok('respuestas válidas aceptadas');
for (const bad of [[0], [0, 1, 2], [4, 0], [-1, 0], [1.5, 0], ['1', 0], 'x', null, undefined]) assert.ok(!L.validAnswers(bad, it3), JSON.stringify(bad));
ok('longitud distinta, fuera de rango, decimales, textos y no-arreglos se rechazan');

// tiempo mínimo
assert.ok(L.tooFast(30, 18)); assert.ok(L.tooFast(53, 18)); assert.ok(!L.tooFast(54, 18)); assert.ok(!L.tooFast(300, 18));
ok('menos de 3 s por pregunta se considera demasiado rápido (54 s para 18)');
assert.equal(L.PASS_SCORE, 70); assert.equal(L.MAX_ATTEMPTS_PER_DAY, 6); ok('aprobación 70, máximo 6 intentos al día');

// distribución de la correcta tras permutar (no sesgada a una posición)
const counts = [0, 0, 0, 0]; const bk = mkBank(30, 0); const byk = new Map(bk.map((b) => [b.idx, b]));
for (let r = 0; r < 300; r++) for (const it of L.drawExam(bk, [], rnd)) counts[it.perm.indexOf(byk.get(it.q).correct)]++;
const tot = counts.reduce((a, b) => a + b, 0);
assert.ok(counts.every((c) => c / tot > 0.2 && c / tot < 0.3), counts.join()); ok('la respuesta correcta queda repartida entre A-D (' + counts.map((c) => Math.round(c / tot * 100) + '%').join(' / ') + ')');

// ── Examen maestro ──
const rows = (course, nExam, nLesson = 0) => [
  ...Array.from({ length: nExam }, (_, i) => ({ idx: i, text: `${course} E${i}`, options: ['a', 'b', 'c', 'd'], correct: i % 4, explanation: `exp ${course} E${i}`, source: 'exam' })),
  ...Array.from({ length: nLesson }, (_, i) => ({ idx: nExam + i, text: `${course} L${i}`, options: ['a', 'b', 'c', 'd'], correct: 0, explanation: '', source: 'lesson' })),
];
const per = [{ course: 'abp', rows: rows('abp', 10, 4) }, { course: 'dt', rows: rows('dt', 10) }, { course: 'ev', rows: rows('ev', 12, 2) }];
assert.equal(L.masterSize(90), 30); assert.equal(L.masterSize(30), 18); assert.equal(L.masterSize(14), 10); assert.equal(L.masterSize(6), 6); ok('tamaño del maestro: máx. 30, ~60 % si el banco es chico, mín. 10');
assert.equal(L.MASTER_PASS_SCORE, 75); assert.equal(L.passFor('master:steam20'), 75); assert.equal(L.passFor('abp'), 70); ok('el maestro se aprueba con 75; los cursos con 70');
let mi = L.drawMasterExam(per, [], [], rnd);
const pool = 10 + 4 + 10 + 12 + 2;
assert.equal(mi.length, L.masterSize(pool)); assert.ok(mi.every((it) => typeof it.c === 'string')); ok('cada pregunta del maestro lleva el curso de donde viene');
const byCourse = (items) => items.reduce((m, it) => ((m[it.c] = (m[it.c] || 0) + 1), m), {});
let bc = byCourse(mi); assert.ok(['abp', 'dt', 'ev'].every((c) => bc[c] >= 4), JSON.stringify(bc)); ok('todos los cursos de la ruta quedan representados: ' + JSON.stringify(bc));
assert.equal(new Set(mi.map((it) => L.qkey(it, 'x'))).size, mi.length); ok('sin preguntas repetidas');
// síntesis: la mitad inicial
const synth = Array.from({ length: 20 }, (_, i) => ({ idx: i, text: `S${i}`, options: ['a', 'b', 'c', 'd'], correct: 1, explanation: '', source: 'exam', course: 'master:steam20' }));
mi = L.drawMasterExam(per, synth, [], rnd);
assert.equal(mi.length, 30); const ns = mi.filter((it) => it.c === 'master:steam20').length;
assert.ok(ns >= 10 && ns <= 20, String(ns)); ok('con preguntas de síntesis (STEAM 2.0): mezcla síntesis y cursos (' + ns + ' de síntesis)');
// no repetir lo visto
const seenKeys = mi.map((it) => L.qkey(it, 'master:steam20'));
const mi2 = L.drawMasterExam(per, synth, seenKeys, rnd);
const overlap = mi2.filter((it) => seenKeys.includes(L.qkey(it, 'master:steam20'))).length;
assert.ok(overlap < mi2.length, 'repitió todo'); ok('el siguiente maestro prioriza preguntas no vistas (' + overlap + ' repetidas de ' + mi2.length + ')');
// calificación y public con claves curso:idx
const mbank = new Map(); for (const p of per) for (const r of p.rows) mbank.set(`${p.course}:${r.idx}`, { ...r, course: p.course });
const mitems = L.drawMasterExam(per, [], [], rnd);
const mans = mitems.map((it) => it.perm.indexOf(mbank.get(L.qkey(it, 'master:x')).correct));
assert.equal(L.gradeAttempt(mitems, mbank, mans, 'master:x').pct, 100); ok('el maestro califica con claves curso:idx y permutaciones');
assert.ok(L.publicQuestions(mitems, mbank, 'master:x').every((q) => Object.keys(q).sort().join() === 'options,text')); ok('el maestro tampoco envía la respuesta correcta');
// resolver ruta
const have = (c) => ['abp', 'dt', 'ev'].includes(c);
assert.deepEqual(L.resolveMasterPath('x', [{ id: 'x', courses: ['abp', 'dt', 'fantasma'] }], have), ['abp', 'dt']); ok('ruta guardada por el admin: solo cursos con banco');
assert.equal(L.resolveMasterPath('x', [{ id: 'x', courses: ['fantasma'] }], have), null); assert.equal(L.resolveMasterPath('nada', [], have), null); ok('ruta sin banco o desconocida → null');
console.log(`${n} comprobaciones OK`);
