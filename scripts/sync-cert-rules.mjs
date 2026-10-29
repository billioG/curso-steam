#!/usr/bin/env node
// Regenera, dentro de supabase-functions/create-certificate-checkout/index.ts,
// el bloque con las reglas que el SERVIDOR usa para decidir si un diploma o
// un certificado maestro patrocinado se puede emitir:
//
//   · COURSE_CARD_IDS — los ids de tarjeta de cada curso disponible, tal como
//     quedan en `completed_cards` (app.js normaliza los ids numéricos de los
//     cursos que no son 'steam' a `<curso>-<n>`);
//   · DEFAULT_PATHS   — las rutas por defecto de app.js (`LEARNING_PATHS`).
//
// La Edge Function corre en Deno, aislada: no puede cargar data.js ni app.js.
// Mismo problema y misma solución que scripts/sync-course-totals.mjs.
//
// Uso:
//   node scripts/sync-cert-rules.mjs           # reescribe el bloque si cambió
//   node scripts/sync-cert-rules.mjs --check   # no escribe; falla (exit 1) si está desactualizado
//
// Hay que correrlo después de agregar, quitar o renombrar tarjetas o cursos en
// data.js, o de cambiar las rutas por defecto en app.js, y volver a desplegar
// la función.

import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_JS = path.join(ROOT, 'data.js');
const APP_JS = path.join(ROOT, 'app.js');
const TARGET = path.join(ROOT, 'supabase-functions/create-certificate-checkout/index.ts');
const START = '// SYNC:START (generado por scripts/sync-cert-rules.mjs — no editar a mano)';
const END = '// SYNC:END';
const checkOnly = process.argv.includes('--check');

function loadAllCourses() {
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(`${readFileSync(DATA_JS, 'utf8')}\n;this.allCourses = allCourses;`, sandbox);
    return sandbox.allCourses;
}

// Igual que normaliza app.js y que computeTotalCards en sync-course-totals.mjs
function cardIds(course) {
    const ids = [];
    for (const mod of course.modules || []) {
        for (const card of mod.cards || []) {
            let id = String(card.id);
            if (course.id !== 'steam' && /^[0-9]+$/.test(id)) id = `${course.id}-${id}`;
            ids.push(id);
        }
    }
    return [...new Set(ids)];
}

function loadDefaultPaths() {
    const src = readFileSync(APP_JS, 'utf8');
    const m = src.match(/let LEARNING_PATHS = (\[[\s\S]*?\n\]);/);
    if (!m) throw new Error('No se encontró `let LEARNING_PATHS = [...]` en app.js.');
    // literal de objetos controlado por este mismo repo, no input externo
    // eslint-disable-next-line no-eval
    return eval(m[1]).map((p) => ({ id: p.id, courses: p.courses }));
}

function buildBlock() {
    // Solo los cursos disponibles: el cliente (_checkMasterCert) ignora el resto
    const courses = loadAllCourses().filter((c) => c.status === 'available');
    const lines = courses.map((c) => `  ${JSON.stringify(c.id)}: ${JSON.stringify(cardIds(c).join(','))},`);
    const paths = loadDefaultPaths().map((p) => `  { id: ${JSON.stringify(p.id)}, courses: ${JSON.stringify(p.courses)} },`);
    return [
        START,
        'const COURSE_CARD_IDS: Record<string, string> = {',
        ...lines,
        '};',
        'const DEFAULT_PATHS: { id: string; courses: string[] }[] = [',
        ...paths,
        '];',
        END,
    ].join('\n');
}

const file = readFileSync(TARGET, 'utf8');
const s = file.indexOf(START);
const e = file.indexOf(END);
if (s === -1 || e === -1 || e < s) {
    console.error(`No se encontraron los marcadores en ${TARGET}.`);
    process.exit(1);
}
const current = file.slice(s, e + END.length);
const next = buildBlock();

if (current === next) {
    console.log('create-certificate-checkout/index.ts ya está sincronizado — nada que hacer.');
    process.exit(0);
}
if (checkOnly) {
    console.error('create-certificate-checkout/index.ts está DESACTUALIZADO respecto a data.js / app.js.');
    console.error('Corre `node scripts/sync-cert-rules.mjs` (sin --check) y vuelve a desplegar la función.');
    process.exit(1);
}
writeFileSync(TARGET, file.slice(0, s) + next + file.slice(e + END.length));
console.log('create-certificate-checkout/index.ts actualizado desde data.js y app.js.');
