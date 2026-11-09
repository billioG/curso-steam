#!/usr/bin/env node
// Prueba la Edge Function `recurrente-webhook` SIN Supabase ni Recurrente: ejecuta el handler real
// con eventos firmados al estilo Svix (como los manda Recurrente) contra una tabla en memoria.
// Verifica la firma, que solo `intent.succeeded` de tipo `payment` marque el pago, la
// idempotencia ante reintentos y que un fallo de la base devuelva 500 (para que Recurrente reintente).
// Uso: node scripts/test-recurrente-webhook.mjs
import { readFileSync } from 'node:fs';
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import assert from 'node:assert/strict';
import { stripTypeScriptTypes } from 'node:module';

let src = readFileSync('supabase-functions/recurrente-webhook/index.ts', 'utf8');
src = src.replace(/^import .*$/gm, '');
const code = stripTypeScriptTypes(src);

const secretBytes = randomBytes(24);
const SECRET = 'whsec_' + secretBytes.toString('base64');
const env = { SUPABASE_URL: 'http://x', SUPABASE_SERVICE_ROLE_KEY: 's', RECURRENTE_WEBHOOK_SECRET: SECRET };
const rows = [];
let dbError = null;

function fakeClient() {
  return { from: () => {
    const f = []; let patch = null;
    const b = {
      update(p) { patch = p; return b; },
      eq(k, v) { f.push((r) => r[k] === v); return b; },
      select() { return b; },
      then(res, rej) {
        if (dbError) return Promise.resolve({ data: null, error: { message: dbError } }).then(res, rej);
        const hit = rows.filter((r) => f.every((fn) => fn(r)));
        hit.forEach((r) => Object.assign(r, patch));
        return Promise.resolve({ data: hit.map((r) => ({ id: r.id })), error: null }).then(res, rej);
      },
    };
    return b;
  } };
}

let handler;
// El secret se lee al cargar el módulo (como en Deno): para probar otro valor se vuelve a cargar
const load = () => new Function('Deno', 'createClient', 'createHmac', 'timingSafeEqual', 'Response', 'atob', 'console', code)(
  { env: { get: (k) => env[k] }, serve: (h) => { handler = h; } }, fakeClient, createHmac, timingSafeEqual, Response, atob, { log() {} });
load();

const sign = (id, ts, body, key = secretBytes) => 'v1,' + createHmac('sha256', key).update(`${id}.${ts}.${body}`).digest('base64');
const post = async (body, { id = 'msg_1', ts = String(Math.floor(Date.now() / 1000)), sig, method = 'POST', headers } = {}) => {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  const h = headers ?? { 'svix-id': id, 'svix-timestamp': ts, 'svix-signature': sig ?? sign(id, ts, raw) };
  const r = await handler(new Request('http://x/hook', { method, headers: h, body: method === 'POST' ? raw : undefined }));
  return { status: r.status, text: await r.text() };
};
const ev = (over = {}) => ({ event_type: 'intent.succeeded', type: 'payment', checkout: { id: 'ch_123' }, ...over });
const reset = () => { rows.length = 0; rows.push({ id: 'p1', recurrente_checkout_id: 'ch_123', status: 'pending', paid_at: null }, { id: 'p2', recurrente_checkout_id: 'ch_999', status: 'pending', paid_at: null }); dbError = null; };
let n = 0; const ok = (m) => { n++; console.log('  ✓', m); };

reset();
assert.equal((await post(ev(), { method: 'GET' })).status, 405); ok('GET → 405');
assert.equal((await post(ev(), { headers: {} })).status, 400); ok('sin headers de firma → 400');
assert.equal((await post(ev(), { sig: 'v1,AAAA' })).status, 401); assert.equal(rows[0].status, 'pending'); ok('firma inválida → 401 y el pago sigue pendiente');
assert.equal((await post(ev(), { sig: sign('msg_1', '1', '{}') })).status, 401); ok('firma de otro cuerpo → 401');
assert.equal((await post(ev(), { sig: sign('msg_1', String(Math.floor(Date.now() / 1000)), JSON.stringify(ev()), randomBytes(24)) })).status, 401); ok('firmado con otro secret → 401');
const raw = JSON.stringify(ev());
assert.equal((await post(raw, { id: 'a', ts: '1700000000', sig: sign('a', '1700000000', raw + ' ') })).status, 401); ok('un solo byte distinto en el cuerpo invalida la firma');

let r = await post(ev());
assert.equal(r.status, 200); assert.equal(rows[0].status, 'paid'); assert.ok(rows[0].paid_at); assert.equal(rows[1].status, 'pending'); ok('evento firmado marca SOLO ese checkout como pagado');
const first = rows[0].paid_at;
r = await post(ev(), { id: 'msg_2' }); assert.equal(r.status, 200); assert.equal(rows[0].paid_at, first); ok('reintento del mismo evento: 200 y no cambia paid_at (idempotente)');
const sigMulti = `v1,AAAA ${sign('msg_3', '1700000001', JSON.stringify(ev({ checkout: { id: 'ch_999' } })))}`;
r = await post(ev({ checkout: { id: 'ch_999' } }), { id: 'msg_3', ts: '1700000001', sig: sigMulti }); assert.equal(rows[1].status, 'paid'); ok('header con varias firmas: basta con que una coincida');

reset();
for (const [name, e] of [['otro tipo de evento', ev({ event_type: 'intent.failed' })], ['tipo distinto de payment', ev({ type: 'subscription' })], ['sin checkout', { event_type: 'intent.succeeded', type: 'payment' }]]) {
  r = await post(e); assert.equal(r.status, 200); assert.ok(rows.every((x) => x.status === 'pending')); ok(`${name}: 200 y no marca nada`);
}
r = await post(ev({ checkout: { id: 'ch_de_otro_producto' } })); assert.equal(r.status, 200); assert.ok(rows.every((x) => x.status === 'pending')); ok('checkout desconocido (otro producto de la cuenta): 200 sin tocar nada');
r = await post('esto no es json'); assert.equal(r.status, 500); ok('cuerpo firmado pero no JSON → 500');

reset(); dbError = 'connection refused';
r = await post(ev()); assert.equal(r.status, 500); assert.match(r.text, /connection refused/); assert.equal(rows[0].status, 'pending'); ok('si la base falla → 500 (Recurrente reintenta) y no se pierde el pago');
dbError = null; r = await post(ev(), { id: 'msg_retry' }); assert.equal(r.status, 200); assert.equal(rows[0].status, 'paid'); ok('el reintento posterior sí queda registrado');

env.RECURRENTE_WEBHOOK_SECRET = ''; load();
r = await post(ev()); assert.equal(r.status, 500); assert.match(r.text, /no está configurado/); ok('sin RECURRENTE_WEBHOOK_SECRET → 500 explícito');
env.RECURRENTE_WEBHOOK_SECRET = 'whsec_!!!no-es-base64!!!'; load();
r = await post(ev()); assert.equal(r.status, 401); ok('secret malformado → 401 (no revienta)');
console.log(`${n} comprobaciones OK`);
