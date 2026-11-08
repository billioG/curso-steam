#!/usr/bin/env node
// Exporta el contenido de todos los cursos de data.js a Markdown, como insumo
// para producir videos (guiones, narración, subtítulos). No incluye los
// exámenes finales ni las respuestas de evaluación del examen.
//
// Uso: node scripts/export-course-content.mjs [carpeta-salida]   (por defecto contenido-video/)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'contenido-video'));
mkdirSync(OUT, { recursive: true });

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${readFileSync(path.join(ROOT, 'data.js'), 'utf8')}\n;this.allCourses = allCourses;`, sandbox);
const courses = sandbox.allCourses.filter((c) => c.status === 'available');

const L = 'ABCDEFGH';
const para = (t) => String(t ?? '').trim();
const quote = (t) => para(t).split('\n').map((l) => `> ${l}`).join('\n');

function card(k, n) {
    const out = [];
    const title = para(k.title) || `Tarjeta ${n}`;
    switch (k.type) {
        case 'content':
            out.push(`#### ${n}. ${title}`, '', '*Contenido*', '', para(k.content));
            if (k.extra) out.push('', `**Dato extra:** ${para(k.extra)}`);
            break;
        case 'quiz':
            out.push(`#### ${n}. ${title}`, '', '*Pregunta de comprobación*', '', `**${para(k.question)}**`, '');
            k.options.forEach((o, i) => out.push(`- ${L[i]}) ${o}${i === k.correct ? ' ✔ (correcta)' : ''}`));
            out.push('', `**Explicación:** ${para(k.explanation)}`);
            break;
        case 'simulation':
            out.push(`#### ${n}. ${title}`, '', '*Simulación (deslizar: de acuerdo / en desacuerdo)*', '',
                `**Situación:** ${para(k.scenario)}`, '', `**Afirmación:** ${para(k.statement)}`, '',
                `**Respuesta correcta:** ${k.correctSwipe === 'right' ? 'de acuerdo' : 'en desacuerdo'}`, '',
                `**Si respondes «de acuerdo»:** ${para(k.rightOutcome)}`, '',
                `**Si respondes «en desacuerdo»:** ${para(k.leftOutcome)}`);
            if (k.extra) out.push('', `**Dato extra:** ${para(k.extra)}`);
            break;
        case 'project':
            out.push(`#### ${n}. ${title}`, '', '*Proyecto práctico*', '', para(k.description), '',
                `**Objetivo:** ${para(k.objective)}`);
            if (k.materials?.length) out.push('', '**Materiales:**', ...k.materials.map((m) => `- ${m}`));
            if (k.steps?.length) out.push('', '**Pasos:**', ...k.steps.map((s, i) => `${i + 1}. ${s}`));
            for (const [key, label] of [['think', 'Pensar'], ['make', 'Hacer'], ['improve', 'Mejorar']]) {
                if (k[key]) out.push('', `**${label}:** ${Array.isArray(k[key]) ? k[key].join(' · ') : para(k[key])}`);
            }
            break;
        case 'takeaway':
            out.push(`#### ${n}. ${title}`, '', '*Compromiso / cierre*', '', para(k.prompt), '',
                ...(k.options || []).map((o) => `- ${o}`));
            break;
        default:
            out.push(`#### ${n}. ${title}`, '', '```json', JSON.stringify(k, null, 2), '```');
    }
    if (k.project && typeof k.project === 'object') {
        out.push('', '**Mini-proyecto asociado:**', '', '```json', JSON.stringify(k.project, null, 2), '```');
    }
    return out.join('\n');
}

function courseMd(c) {
    const cards = c.modules.reduce((n, m) => n + m.cards.length, 0);
    const out = [`# ${c.title}`, '', `*${para(c.subtitle)}*`, '',
        `- **Id del curso:** \`${c.id}\``,
        `- **Duración estimada:** ${c.durationHours} h`,
        `- **Módulos:** ${c.modules.length} · **Tarjetas:** ${cards}`];
    if (c.prerequisite) out.push(`- **Prerrequisito:** ${c.prerequisite}`);
    if (c.recommendedLevels) out.push(`- **Niveles recomendados:** ${[].concat(c.recommendedLevels).join(', ')}`);
    out.push('', '## Estructura', '',
        ...c.modules.map((m, i) => `${i + 1}. ${para(m.title)} (${m.cards.length} tarjetas)`));
    c.modules.forEach((m, i) => {
        out.push('', '---', '', `## Módulo ${i + 1}. ${para(m.title)}`, '');
        m.cards.forEach((k, j) => out.push(card(k, j + 1), ''));
    });
    return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

const index = ['# Contenido de los cursos para producción de video', '',
    'Generado por `scripts/export-course-content.mjs` desde `data.js`. Cada archivo reúne los módulos y tarjetas de un curso en el orden en que los ve el docente. No incluye los exámenes finales.', '',
    '**Tipos de tarjeta:** *Contenido* (idea + dato extra), *Pregunta de comprobación*, *Simulación*, *Proyecto práctico* y *Compromiso / cierre*.', '',
    '| # | Curso | Módulos | Tarjetas | Horas | Archivo |', '|---|---|---|---|---|---|'];
const all = [];
courses.forEach((c, i) => {
    const file = `${String(i + 1).padStart(2, '0')}-${c.id}.md`;
    const md = courseMd(c);
    writeFileSync(path.join(OUT, file), md);
    all.push(md);
    index.push(`| ${i + 1} | ${para(c.title)} | ${c.modules.length} | ${c.modules.reduce((n, m) => n + m.cards.length, 0)} | ${c.durationHours} | [${file}](${file}) |`);
});
writeFileSync(path.join(OUT, '00-indice.md'), index.join('\n') + '\n');
writeFileSync(path.join(OUT, 'todos-los-cursos.md'), all.join('\n\n<div style="page-break-after:always"></div>\n\n'));
console.log(`${courses.length} cursos exportados a ${OUT}`);
