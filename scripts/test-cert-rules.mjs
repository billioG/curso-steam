#!/usr/bin/env node
// Pruebas de la lógica antifraude de los certificados patrocinados
// (bloque PURE de supabase-functions/create-certificate-checkout/index.ts).
// No necesita red ni base de datos: extrae el bloque, le quita los tipos de
// TypeScript con Node (node:module → stripTypeScriptTypes) y lo ejecuta.
//
//   node scripts/test-cert-rules.mjs
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(path.join(ROOT, 'supabase-functions/create-certificate-checkout/index.ts'), 'utf8');
const cut = (a, b) => { const i = src.indexOf(a), j = src.indexOf(b); assert(i > -1 && j > i, `faltan marcadores ${a}`); return src.slice(i, j); };
const code = stripTypeScriptTypes(cut('// SYNC:START', '// SYNC:END') + cut('// PURE:START', '// PURE:END'))
    + '\nreturn { validateClaim, COURSE_CARD_IDS, DEFAULT_PATHS, resolvePath };';
const { validateClaim, COURSE_CARD_IDS, DEFAULT_PATHS, resolvePath } = new Function(code)();

const ids = (cid) => COURSE_CARD_IDS[cid].split(',');
const NOW = Date.parse('2026-10-29T12:00:00Z');
const OLD = '2026-01-01T00:00:00Z';
const ok = (n) => ({ kind: 'diploma', ref_id: 'abp', approved: true, score: n });
const base = (over = {}) => ({
    certType: 'diploma', refId: 'abp',
    progress: { completed_cards: ids('abp'), daily_missions: { examScores: { abp: 88 } } },
    reviews: [ok(8)], savedPaths: null, accountCreatedAt: OLD, recentSponsorClaims: 0, now: NOW, ...over,
});
let n = 0;
const t = (name, fn) => { fn(); n++; console.log('  ✓', name); };

console.log('Diploma');
t('caso feliz: pasa sin alertas', () => { const r = validateClaim(base()); assert.equal(r.ok, true); assert.deepEqual(r.flags, []); assert.equal(r.meta.examen, 88); });
t('curso desconocido', () => assert.equal(validateClaim(base({ refId: 'no-existe' })).code, 'unknown_course'));
t('sin examen aprobado', () => assert.equal(validateClaim(base({ progress: { completed_cards: ids('abp'), daily_missions: {} } })).code, 'exam_not_passed'));
t('examen en 69 no pasa; en 70 sí', () => {
    assert.equal(validateClaim(base({ progress: { completed_cards: ids('abp'), daily_missions: { examScores: { abp: 69 } } } })).code, 'exam_not_passed');
    assert.equal(validateClaim(base({ progress: { completed_cards: ids('abp'), daily_missions: { examScores: { abp: 70 } } } })).ok, true);
});
t('examScores con texto no cuenta', () => assert.equal(validateClaim(base({ progress: { completed_cards: ids('abp'), daily_missions: { examScores: { abp: '100' } } } })).code, 'exam_not_passed'));
t('steam acepta examScore legado', () => {
    const r = validateClaim({ ...base(), refId: 'steam', progress: { completed_cards: ids('steam'), daily_missions: { examScore: 80 } }, reviews: [{ ...ok(8), ref_id: 'steam' }] });
    assert.equal(r.ok, true);
});
t('menos del 80 % de tarjetas', () => {
    const all = ids('abp'); const need = Math.ceil(all.length * 0.8);
    assert.equal(validateClaim(base({ progress: { completed_cards: all.slice(0, need - 1), daily_missions: { examScores: { abp: 90 } } } })).code, 'cards_incomplete');
    assert.equal(validateClaim(base({ progress: { completed_cards: all.slice(0, need), daily_missions: { examScores: { abp: 90 } } } })).ok, true);
});
t('ids inventados con el prefijo del curso NO suman', () => {
    const fake = Array.from({ length: 500 }, (_, i) => `abp-inventado-${i}`);
    assert.equal(validateClaim(base({ progress: { completed_cards: fake, daily_missions: { examScores: { abp: 90 } } } })).code, 'cards_incomplete');
});
t('ids repetidos no suman dos veces', () => {
    const one = ids('abp')[0];
    assert.equal(validateClaim(base({ progress: { completed_cards: Array(1000).fill(one), daily_missions: { examScores: { abp: 90 } } } })).code, 'cards_incomplete');
});
t('tarjetas de OTRO curso no sirven', () => assert.equal(validateClaim(base({ progress: { completed_cards: ids('dt'.length ? 'design-thinking' : 'abp'), daily_missions: { examScores: { abp: 90 } } } })).code, 'cards_incomplete'));
t('sin relato registrado por el servidor', () => assert.equal(validateClaim(base({ reviews: [] })).code, 'needs_evidence'));
t('relato rechazado por la IA no sirve', () => assert.equal(validateClaim(base({ reviews: [{ ...ok(3), approved: false }] })).code, 'needs_evidence'));
t('relato aprobado de OTRO curso no sirve', () => assert.equal(validateClaim(base({ reviews: [{ ...ok(9), ref_id: 'steam' }] })).code, 'needs_evidence'));
t('relato de tipo portafolio no sirve como relato', () => assert.equal(validateClaim(base({ reviews: [{ ...ok(9), kind: 'portfolio' }] })).code, 'needs_evidence'));
t('sin fila de progreso', () => assert.equal(validateClaim(base({ progress: null })).code, 'exam_not_passed'));

console.log('Señales de alerta (no bloquean)');
t('cuenta reciente', () => { const r = validateClaim(base({ accountCreatedAt: new Date(NOW - 5 * 36e5).toISOString() })); assert.equal(r.ok, true); assert(r.flags.includes('cuenta_reciente')); });
t('poco tiempo registrado para las tarjetas estudiadas', () => {
    const r = validateClaim(base({ sessionSeconds: 300 }));
    assert.equal(r.ok, true, 'es una alerta, no bloquea');
    assert(r.flags.includes('poco_tiempo_registrado'), JSON.stringify(r.flags));
    assert.equal(r.meta.minutos_registrados, 5);
});
t('tiempo suficiente: sin alerta', () => assert(!validateClaim(base({ sessionSeconds: ids('abp').length * 20 })).flags.includes('poco_tiempo_registrado')));
t('sin datos de sesiones: no se alerta ni se rompe', () => { const r = validateClaim(base({ sessionSeconds: null })); assert.equal(r.ok, true); assert.deepEqual(r.flags, []); });
t('cuenta antigua con tiempo normal: sin alertas', () => assert.deepEqual(validateClaim(base({ accountCreatedAt: '2026-06-01T00:00:00Z' })).flags, []));
t('varios certificados en 24 h', () => assert(validateClaim(base({ recentSponsorClaims: 2 })).flags.includes('varios_certificados_en_24h')));

console.log('Certificado maestro');
const path4 = DEFAULT_PATHS.find((p) => p.id === 'steam20');
const mProgress = (over = {}) => {
    const cards = path4.courses.flatMap((c) => ids(c));
    const scores = Object.fromEntries(path4.courses.map((c) => [c, 85]));
    return { completed_cards: cards, daily_missions: { examScores: scores, masterExamScores: { steam20: 90 }, ...over } };
};
const mBase = (over = {}) => ({ certType: 'master', refId: 'steam20', progress: mProgress(), reviews: [{ kind: 'portfolio', ref_id: 'steam20', approved: true, score: 42 }], savedPaths: null, accountCreatedAt: OLD, recentSponsorClaims: 0, sessionSeconds: 99999, now: NOW, ...over });
t('caso feliz: 45 + 42 = 87', () => { const r = validateClaim(mBase()); assert.equal(r.ok, true); assert.equal(r.meta.total, 87); });
t('ruta desconocida', () => assert.equal(validateClaim(mBase({ refId: 'xx' })).code, 'unknown_path'));
t('falta aprobar un curso de la ruta', () => { const p = mProgress(); delete p.daily_missions.examScores.abp; assert.equal(validateClaim(mBase({ progress: p })).code, 'exam_not_passed'); });
t('falta el 80 % de un curso de la ruta', () => { const p = mProgress(); p.completed_cards = p.completed_cards.filter((c) => !c.startsWith('dt-')); assert.equal(validateClaim(mBase({ progress: p })).code, 'cards_incomplete'); });
t('sin examen maestro', () => { const p = mProgress({ masterExamScores: {} }); assert.equal(validateClaim(mBase({ progress: p })).code, 'needs_portfolio'); });
t('examen maestro legado de steam20', () => { const p = mProgress({ masterExamScores: undefined, masterExamScore: 90 }); assert.equal(validateClaim(mBase({ progress: p })).ok, true); });
t('sin portafolio revisado por el servidor', () => assert.equal(validateClaim(mBase({ reviews: [] })).code, 'needs_portfolio'));
t('portafolio de otra ruta no sirve', () => assert.equal(validateClaim(mBase({ reviews: [{ kind: 'portfolio', ref_id: 'ia', approved: true, score: 50 }] })).code, 'needs_portfolio'));
t('examen 100 + portafolio 34 = 84 no pasa; 35 → 85 sí', () => {
    const p = mProgress({ masterExamScores: { steam20: 100 } });
    assert.equal(validateClaim(mBase({ progress: p, reviews: [{ kind: 'portfolio', ref_id: 'steam20', approved: false, score: 34 }] })).code, 'needs_portfolio');
    assert.equal(validateClaim(mBase({ progress: p, reviews: [{ kind: 'portfolio', ref_id: 'steam20', approved: false, score: 35 }] })).ok, true);
});
t('se usa el mejor portafolio entre varios intentos', () => assert.equal(validateClaim(mBase({ reviews: [{ kind: 'portfolio', ref_id: 'steam20', approved: false, score: 10 }, { kind: 'portfolio', ref_id: 'steam20', approved: true, score: 44 }] })).ok, true));

console.log('Rutas');
t('una ruta guardada por el admin gana sobre la de código', () => {
    const r = resolvePath('steam20', [{ id: 'steam20', courses: ['abp', 'steam'] }]);
    assert.deepEqual(r.courses, ['abp', 'steam']);
});
t('una ruta nueva del código se agrega si no está guardada', () => assert.deepEqual(resolvePath('fundamentos', [{ id: 'steam20', courses: ['abp'] }]).courses, ['fundamentos-pisa']));
t('cursos no disponibles se ignoran (como el cliente)', () => assert.deepEqual(resolvePath('x', [{ id: 'x', courses: ['abp', 'curso-fantasma'] }]).courses, ['abp']));
t('ruta sin cursos disponibles no existe', () => assert.equal(resolvePath('x', [{ id: 'x', courses: ['curso-fantasma'] }]), null));

console.log(`\n${n} pruebas OK`);
