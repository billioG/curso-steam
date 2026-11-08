#!/usr/bin/env node
// Verifica el candado de las Edge Functions que solo debe llamar pg_cron:
//  1) las 4 funciones llevan el MISMO bloque GUARD y lo usan al inicio del handler;
//  2) la lógica del bloque: acepta service role key (Bearer) o CRON_SECRET, rechaza
//     la anon key, headers vacíos y secretos de otra longitud.
// Uso: node scripts/test-cron-guard.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { stripTypeScriptTypes } from 'node:module';

const FUNCS = ['daily-push-reminder', 'daily-reminders', 'weekly-stats', 'application-followup-check'];
const blocks = FUNCS.map((f) => {
  const src = readFileSync(`supabase-functions/${f}/index.ts`, 'utf8');
  const m = src.match(/\/\/ GUARD:START[\s\S]*?\/\/ GUARD:END/);
  assert.ok(m, `${f}: falta el bloque GUARD`);
  assert.match(src, /Deno\.serve\(async \(req\) => \{\s*\n\s*if \(!isCronCall\(req\)\) return unauthorized\(\);/, `${f}: el handler no empieza con el candado`);
  return m[0];
});
assert.ok(blocks.every((b) => b === blocks[0]), 'el bloque GUARD no es idéntico en las 4 funciones');
console.log('  ✓ las 4 funciones usan el mismo candado al inicio del handler');

const env = {};
const Deno = { env: { get: (k) => env[k] } };
const body = stripTypeScriptTypes(blocks[0]);
const { isCronCall } = new Function('Deno', 'Response', `${body}\nreturn { isCronCall };`)(Deno, Response);
const req = (h) => ({ headers: { get: (k) => h[k] ?? h[k.toLowerCase()] ?? null } });
env.SUPABASE_SERVICE_ROLE_KEY = 'service-key-123456';
env.CRON_SECRET = 'cron-secret-abc';
assert.equal(isCronCall(req({ Authorization: 'Bearer service-key-123456' })), true); console.log('  ✓ service role key como Bearer → permitido');
assert.equal(isCronCall(req({ 'x-cron-secret': 'cron-secret-abc' })), true); console.log('  ✓ CRON_SECRET en x-cron-secret → permitido');
assert.equal(isCronCall(req({ Authorization: 'Bearer anon-key-public-xyz' })), false); console.log('  ✓ anon key → rechazado');
assert.equal(isCronCall(req({})), false); console.log('  ✓ sin credenciales → rechazado');
assert.equal(isCronCall(req({ Authorization: 'Bearer service-key-12345' })), false); console.log('  ✓ llave de otra longitud → rechazada');
assert.equal(isCronCall(req({ 'x-cron-secret': '' })), false); console.log('  ✓ secreto vacío → rechazado');
delete env.CRON_SECRET;
assert.equal(isCronCall(req({ 'x-cron-secret': '' })), false); console.log('  ✓ sin CRON_SECRET configurado, un header vacío no entra');
delete env.SUPABASE_SERVICE_ROLE_KEY;
assert.equal(isCronCall(req({ Authorization: 'Bearer ' })), false); console.log('  ✓ sin service role key en el entorno, Bearer vacío no entra');
console.log('Candado de cron OK');
