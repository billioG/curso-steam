#!/usr/bin/env node
// Prueba la lógica pura de la Edge Function `exam` (sorteo, permutación de
// opciones, calificación, validación de respuestas, tiempo mínimo).
// Uso: node scripts/test-exam-grading.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { stripTypeScriptTypes } from 'node:module';

const src = readFileSync('supabase-functions/exam/index.ts', 'utf8');
const block = src.match(/\/\/ PURE:START[\s\S]*?\/\/ PURE:END/)[0];
const code = stripTypeScriptTypes(block);
const L = new Function(`${code}\nreturn { PASS_SCORE, MAX_ATTEMPTS_PER_DAY, examSize, shuffle, drawExam, publicQuestions, gradeAttempt, validAnswers, tooFast };`)();
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
bank = mkBank(10, 0); const by = new Map(bank.map((b) => [b.idx, b]));
items = [{ q: 0, perm: [2, 0, 1, 3] }, { q: 1, perm: [3, 2, 1, 0] }, { q: 2, perm: [0, 1, 2, 3] }];
// q0 correct=0 → está en la posición mostrada 1 (perm[1]=0); q1 correct=1 → posición 2; q2 correct=2 → posición 2
let g = L.gradeAttempt(items, by, [1, 2, 2]);
assert.equal(g.correct, 3); assert.equal(g.pct, 100); assert.equal(g.missed.length, 0); ok('traduce la opción mostrada a la original con la permutación');
g = L.gradeAttempt(items, by, [0, 2, null]);
assert.equal(g.correct, 1); assert.equal(g.pct, 33); assert.equal(g.missed.length, 2); assert.equal(g.missed[0].explanation, 'exp E0'); ok('respuestas malas o en blanco cuentan como falladas y devuelven su explicación');
// la respuesta ORIGINAL (sin traducir) no engaña
g = L.gradeAttempt([{ q: 0, perm: [2, 0, 1, 3] }], by, [0]);
assert.equal(g.correct, 0); ok('elegir la posición «0» no equivale a la opción original 0');

// publicQuestions no filtra la correcta
const pub = L.publicQuestions(items, by);
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
console.log(`${n} comprobaciones OK`);
