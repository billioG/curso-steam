#!/usr/bin/env node
// Genera el banco de preguntas del servidor (migrations/exam-bank/*.sql) a partir
// de data.js, con el mismo criterio que `getCourseExam` en app.js:
//   · si el curso define `finalExam`, esas preguntas (source = 'exam');
//   · si no, sus tarjetas quiz (source = 'lesson') + `examExtra` (source = 'exam').
// El servidor sortea primero las de source 'exam' (no están en las lecciones).
//
// Uso:
//   node scripts/sync-exam-bank.mjs           # reescribe los .sql si cambiaron
//   node scripts/sync-exam-bank.mjs --check   # falla (exit 1) si están desactualizados
//
// Después de correrlo, pega los archivos nuevos o modificados en el SQL Editor
// (son idempotentes: actualizan por curso y borran las preguntas que sobran).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'migrations/exam-bank');
const MAX_BYTES = 150_000;   // por archivo, para que el SQL Editor lo acepte cómodo
const checkOnly = process.argv.includes('--check');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${readFileSync(path.join(ROOT, 'data.js'), 'utf8')}\n;this.allCourses = allCourses;`, sandbox);

const q = (s) => `'${String(s ?? '').replace(/'/g, "''")}'`;

function bankFor(course) {
    const out = [];
    const push = (x, source) => {
        if (x && Array.isArray(x.options) && typeof x.correct === 'number') {
            out.push({ text: x.text ?? x.question ?? x.title ?? `Pregunta ${out.length + 1}`, options: x.options, correct: x.correct, explanation: x.explanation || '', source });
        }
    };
    if (course.finalExam && Array.isArray(course.finalExam.questions) && course.finalExam.questions.length) {
        course.finalExam.questions.forEach((x) => push(x, 'exam'));
    } else {
        (course.modules || []).forEach((m) => (m.cards || []).forEach((c) => { if (c.type === 'quiz') push({ ...c, text: c.question || c.title }, 'lesson'); }));
        (course.examExtra || []).forEach((x) => push(x, 'exam'));
    }
    return out;
}

function courseSql(course) {
    const bank = bankFor(course);
    if (!bank.length) return null;
    const rows = bank.map((b, i) => `(${q(course.id)}, ${i}, ${q(b.text)}, ${q(JSON.stringify(b.options))}::jsonb, ${b.correct}, ${q(b.explanation)}, ${q(b.source)})`);
    return `-- ${course.id}: ${bank.length} preguntas (${bank.filter((b) => b.source === 'exam').length} solo de examen)\n`
        + `INSERT INTO public.exam_questions (course_id, idx, text, options, correct, explanation, source) VALUES\n${rows.join(',\n')}\n`
        + `ON CONFLICT (course_id, idx) DO UPDATE SET text = EXCLUDED.text, options = EXCLUDED.options, correct = EXCLUDED.correct, explanation = EXCLUDED.explanation, source = EXCLUDED.source;\n`
        + `DELETE FROM public.exam_questions WHERE course_id = ${q(course.id)} AND idx >= ${bank.length};\n`;
}

// Preguntas de síntesis del examen maestro (MASTER_EXAM en data.js): la ruta STEAM 2.0 las
// usa además de las de sus cursos. Se guardan como `master:<ruta>`.
const MASTER_SYNTHESIS_PATH = 'steam20';
function masterSql() {
    vm.runInContext('this.MASTER_EXAM = typeof MASTER_EXAM !== "undefined" ? MASTER_EXAM : null;', sandbox);
    const me = sandbox.MASTER_EXAM;
    if (!me || !Array.isArray(me.questions)) return null;
    return courseSql({ id: `master:${MASTER_SYNTHESIS_PATH}`, finalExam: { questions: me.questions } });
}

const header = '-- GENERADO por scripts/sync-exam-bank.mjs desde data.js — no editar a mano.\n-- Requiere migrations/examen-servidor.sql. Seguro re-ejecutar.\n\n';
const parts = [];
let cur = '';
for (const c of sandbox.allCourses.filter((c) => c.status === 'available')) {
    const sql = courseSql(c);
    if (!sql) continue;
    if (cur && Buffer.byteLength(cur + sql) > MAX_BYTES) { parts.push(cur); cur = ''; }
    cur += sql + '\n';
}
const _m = masterSql();
if (_m) { if (cur && Buffer.byteLength(cur + _m) > MAX_BYTES) { parts.push(cur); cur = ''; } cur += _m + '\n'; }
if (cur) parts.push(cur);
const files = Object.fromEntries(parts.map((p, i) => [`exam-bank-${i + 1}.sql`, header + p]));

const existing = existsSync(OUT) ? readdirSync(OUT).filter((f) => f.endsWith('.sql')).sort() : [];
const same = existing.length === parts.length && existing.every((f) => files[f] !== undefined && readFileSync(path.join(OUT, f), 'utf8') === files[f]);
if (same) { console.log('migrations/exam-bank/ ya está sincronizado — nada que hacer.'); process.exit(0); }
if (checkOnly) {
    console.error('migrations/exam-bank/ está DESACTUALIZADO respecto a data.js. Corre `node scripts/sync-exam-bank.mjs` y vuelve a pegar el SQL.');
    process.exit(1);
}
mkdirSync(OUT, { recursive: true });
existing.forEach((f) => rmSync(path.join(OUT, f)));
Object.entries(files).forEach(([f, sql]) => writeFileSync(path.join(OUT, f), sql));
console.log(`migrations/exam-bank/: ${parts.length} archivo(s), ${sandbox.allCourses.filter((c) => c.status === 'available').length} cursos.`);
