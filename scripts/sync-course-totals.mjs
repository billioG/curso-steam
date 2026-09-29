#!/usr/bin/env node
// Regenera los `totalCards` hardcodeados en supabase-functions/weekly-stats/index.ts
// a partir de data.js (allCourses) — esa Edge Function corre en Deno, aislada,
// y no puede cargar data.js directamente (no es un módulo ESM), así que este
// script hace la sincronización que en el navegador hace admin.js:68-86.
//
// Uso:
//   node scripts/sync-course-totals.mjs           # reescribe el bloque si cambió
//   node scripts/sync-course-totals.mjs --check   # no escribe; falla (exit 1) si está desactualizado
//
// id/title/prefix del array COURSES en weekly-stats/index.ts NO se tocan —
// son curados a mano ahí mismo. Este script solo recalcula `totalCards`.

import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_JS_PATH = path.join(ROOT, 'data.js');
const TARGET_PATH  = path.join(ROOT, 'supabase-functions/weekly-stats/index.ts');
const START_MARKER = '// SYNC:START (generado por scripts/sync-course-totals.mjs — no editar totalCards a mano)';
const END_MARKER   = '// SYNC:END';

const checkOnly = process.argv.includes('--check');

function loadAllCourses() {
    const src = readFileSync(DATA_JS_PATH, 'utf8');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(`${src}\n;this.allCourses = allCourses;`, sandbox);
    return sandbox.allCourses;
}

function computeTotalCards(allCourses, courseId) {
    const course = allCourses.find((c) => c.id === courseId);
    if (!course) return null;
    if (courseId !== 'steam') {
        (course.modules || []).forEach((mod) =>
            (mod.cards || []).forEach((card) => {
                if (card.id != null && /^[0-9]+$/.test(String(card.id))) {
                    card.id = `${courseId}-${card.id}`;
                }
            })
        );
    }
    const ids = new Set();
    (course.modules || []).forEach((mod) => (mod.cards || []).forEach((card) => ids.add(String(card.id))));
    return ids.size;
}

function extractBlock(fileText) {
    const startIdx = fileText.indexOf(START_MARKER);
    const endIdx = fileText.indexOf(END_MARKER);
    if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
        throw new Error(
            `No se encontraron los marcadores ${JSON.stringify(START_MARKER)} / ${JSON.stringify(END_MARKER)} en ${TARGET_PATH}.`
        );
    }
    return { startIdx, endIdx: endIdx + END_MARKER.length };
}

function parseCourseEntries(blockText) {
    const arrayMatch = blockText.match(/const COURSES = (\[[\s\S]*?\n\]);/);
    if (!arrayMatch) throw new Error('No se pudo encontrar "const COURSES = [...]" dentro del bloque marcado.');
    // eslint-disable-next-line no-eval -- literal de objetos controlado por este mismo repo, no input externo
    return eval(arrayMatch[1]);
}

function formatCourseLine(course) {
    const prefix = course.prefix === null ? 'null' : `'${course.prefix}'`;
    const title = course.title.replace(/'/g, "\\'");
    return `  { id: '${course.id}', title: '${title}', prefix: ${prefix}, totalCards: ${course.totalCards} },`;
}

function buildBlock(courses) {
    const lines = courses.map(formatCourseLine).join('\n');
    return [
        START_MARKER,
        "const COURSES = [",
        lines,
        '];',
        END_MARKER,
    ].join('\n');
}

function main() {
    const allCourses = loadAllCourses();
    const fileText = readFileSync(TARGET_PATH, 'utf8');
    const { startIdx, endIdx } = extractBlock(fileText);
    const currentBlock = fileText.slice(startIdx, endIdx);
    const currentCourses = parseCourseEntries(currentBlock);

    const missing = [];
    const updatedCourses = currentCourses.map((course) => {
        const totalCards = computeTotalCards(allCourses, course.id);
        if (totalCards == null) {
            missing.push(course.id);
            return course;
        }
        return { ...course, totalCards };
    });

    if (missing.length) {
        console.error(`Cursos en weekly-stats/index.ts que ya no existen en data.js: ${missing.join(', ')}`);
        process.exit(1);
    }

    const newBlock = buildBlock(updatedCourses);

    if (newBlock === currentBlock) {
        console.log('weekly-stats/index.ts ya está sincronizado con data.js — nada que hacer.');
        return;
    }

    if (checkOnly) {
        console.error('weekly-stats/index.ts está DESACTUALIZADO respecto a data.js.');
        console.error('Corré `node scripts/sync-course-totals.mjs` (sin --check) para regenerarlo.');
        const oldTotals = Object.fromEntries(currentCourses.map((c) => [c.id, c.totalCards]));
        updatedCourses.forEach((c) => {
            if (oldTotals[c.id] !== c.totalCards) {
                console.error(`  ${c.id}: ${oldTotals[c.id]} -> ${c.totalCards}`);
            }
        });
        process.exit(1);
    }

    const newFileText = fileText.slice(0, startIdx) + newBlock + fileText.slice(endIdx);
    writeFileSync(TARGET_PATH, newFileText);
    console.log('weekly-stats/index.ts actualizado desde data.js.');
}

main();
