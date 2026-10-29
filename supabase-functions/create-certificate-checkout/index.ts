// Edge Function: create-certificate-checkout
// Crea un checkout de pago en Recurrente para un diploma de curso (Q10) o
// el Certificado Maestro de una ruta (Q50), y registra el intento como
// 'pending' en certificate_payments ANTES de redirigir — es lo que
// recurrente-webhook busca luego por recurrente_checkout_id para
// marcarlo 'paid'.
//
// Requiere JWT del usuario autenticado (candidato/docente real con
// sesión, no público) — a diferencia de submit-application etc.
//
// PATROCINIOS (migrations/patrocinios.sql): si una ONG, fundación o empresa
// cubre a este docente y le queda cupo, NO se abre Recurrente: se validan las
// condiciones de abajo en el servidor y, si pasan, se descuenta un cupo y el
// pago queda registrado como 'paid' con monto 0 (claim_sponsored_cert).
// Condiciones para un DIPLOMA patrocinado:
//   · examen del curso aprobado (70 % o más);
//   · al menos el 80 % de las tarjetas del curso (ids exactos de data.js);
//   · relato de aplicación en el aula aprobado por la IA, registrado POR EL
//     SERVIDOR en ai_reviews (no basta con lo que diga el navegador).
// Para un CERTIFICADO MAESTRO patrocinado:
//   · todos los cursos de la ruta aprobados y con el 80 % de las tarjetas;
//   · examen maestro + portafolio revisado por la IA (en ai_reviews) que sumen
//     85 de 100 (examen × 0.5 + portafolio sobre 50), igual que en la app.
// Además se registran señales de alerta (cuenta reciente, poco tiempo de uso
// registrado para las tarjetas estudiadas, varios certificados en un día…) en
// sponsor_claim_log, que solo ve el admin.
//
// Recibe: { cert_type: 'diploma'|'master', ref_id: string, course_id?: string, score?: number }
// Devuelve: { ok:true, checkout_url }                       — pago con Recurrente
//        |  { ok:true, sponsored:true, sponsor:{…} }         — cubierto por un patrocinador
//        |  { error, code?, ... }
//   code: needs_evidence | needs_portfolio | exam_not_passed | cards_incomplete |
//         unknown_course | unknown_path | rate_limited

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY     = Deno.env.get('SUPABASE_ANON_KEY')!;
const SUPABASE_SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RECURRENTE_SECRET_KEY = Deno.env.get('RECURRENTE_SECRET_KEY')!;
const APP_URL                = Deno.env.get('APP_URL') || 'https://yoaprendo.online';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

// Precios fijos en centavos (Recurrente usa amount_in_cents) — Q10 / Q50.
const PRICES: Record<string, number> = { diploma: 1000, master: 5000 };
const NAMES:  Record<string, string> = { diploma: 'Diploma de Participación', master: 'Certificado Maestro' };

// ── Reglas de certificados (se regeneran con scripts/sync-cert-rules.mjs) ──
// SYNC:START (generado por scripts/sync-cert-rules.mjs — no editar a mano)
const COURSE_CARD_IDS: Record<string, string> = {
  "steam": "1,2,3,4,5,6,7,8,9,10,11,12,13,74,120,75,115,76,121,100,101,102,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,77,78,116,79,103,104,105,30,31,32,33,34,35,36,37,38,89,90,91,39,40,41,42,43,44,45,80,122,81,117,82,123,106,107,108,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,83,124,84,118,85,125,109,110,111,61,62,63,64,65,66,67,68,69,92,93,94,95,70,71,72,96,97,98,99,73,86,126,87,119,88,127,112,113,114",
  "abp": "abp-m1-c1,abp-m1-c2,abp-m1-c3,abp-m1-c4,abp-m1-c5,abp-m1-c6,abp-m1-c7,abp-m1-c8,abp-m1-c9,abp-m1-c10,abp-m1-c11,abp-m1-c12,abp-m1-p1,abp-m1-p1-split,abp-m1-p2,abp-m1-p2-split,abp-m1-p3,abp-m1-p3-split,abp-m1-t1,abp-m1-t2,abp-m1-t3,abp-m2-c1,abp-m2-c2,abp-m2-c3,abp-m2-c4,abp-m2-c5,abp-m2-c6,abp-m2-c7,abp-m2-c8,abp-m2-c9,abp-m2-c10,abp-m2-c11,abp-m2-c12,abp-m2-p1,abp-m2-p1-split,abp-m2-p2,abp-m2-p2-split,abp-m2-p3,abp-m2-p3-split,abp-m2-t1,abp-m2-t2,abp-m2-t3,abp-m3-c1,abp-m3-c2,abp-m3-c3,abp-m3-c4,abp-m3-c5,abp-m3-c6,abp-m3-c7,abp-m3-c8,abp-m3-c9,abp-m3-c10,abp-m3-c11,abp-m3-c12,abp-m3-p1,abp-m3-p1-split,abp-m3-p2,abp-m3-p2-split,abp-m3-p3,abp-m3-p3-split,abp-m3-t1,abp-m3-t2,abp-m3-t3,abp-m4-c1,abp-m4-c2,abp-m4-c3,abp-m4-c4,abp-m4-c5,abp-m4-c6,abp-m4-c7,abp-m4-c8,abp-m4-c9,abp-m4-c10,abp-m4-c11,abp-m4-c12,abp-m4-p1,abp-m4-p1-split,abp-m4-p2,abp-m4-p2-split,abp-m4-p3,abp-m4-p3-split,abp-m4-t1,abp-m4-t2,abp-m4-t3,abp-m5-c1,abp-m5-c2,abp-m5-c3,abp-m5-c4,abp-m5-c5,abp-m5-c6,abp-m5-p1,abp-m5-c7,abp-m5-c8,abp-m5-c9,abp-m5-c10,abp-m5-c11,abp-m5-c12,abp-m5-p2,abp-m5-p2-split,abp-m5-p3,abp-m5-p3-split,abp-m5-p4,abp-m5-p4-split,abp-m5-t1,abp-m5-t2",
  "design-thinking": "dt-m1-c1,dt-m1-c2,dt-m1-c3,dt-m1-c4,dt-m1-c5,dt-m1-c6,dt-m1-c7,dt-m1-c8,dt-m1-c9,dt-m1-c10,dt-m1-c11,dt-m1-p1,dt-m1-p1-split,dt-m1-p2,dt-m1-p2-split,dt-m1-p3,dt-m1-p3-split,dt-m1-t1,dt-m1-t2,dt-m1-t3,dt-m2-c1,dt-m2-c2,dt-m2-c3,dt-m2-c4,dt-m2-c5,dt-m2-c6,dt-m2-c7,dt-m2-c8,dt-m2-c9,dt-m2-c10,dt-m2-c11,dt-m2-c12,dt-m2-p1,dt-m2-p1-split,dt-m2-p2,dt-m2-p2-split,dt-m2-p3,dt-m2-p3-split,dt-m2-t1,dt-m2-t2,dt-m2-t3,dt-m3-c1,dt-m3-c2,dt-m3-c3,dt-m3-c4,dt-m3-c5,dt-m3-c6,dt-m3-c7,dt-m3-c8,dt-m3-c9,dt-m3-c10,dt-m3-c11,dt-m3-p1,dt-m3-p1-split,dt-m3-p2,dt-m3-p2-split,dt-m3-p3,dt-m3-p3-split,dt-m3-t1,dt-m3-t2,dt-m3-t3,dt-m4-c1,dt-m4-c2,dt-m4-c3,dt-m4-c4,dt-m4-c5,dt-m4-c6,dt-m4-p1,dt-m4-c7,dt-m4-c8,dt-m4-c9,dt-m4-c10,dt-m4-p1b,dt-m4-p1b-split,dt-m4-p2b,dt-m4-p2b-split,dt-m4-p3b,dt-m4-p3b-split,dt-m4-t1,dt-m4-t2",
  "evaluacion": "ev-m1-c1,ev-m1-c2,ev-m1-c3,ev-m1-c4,ev-m1-c5,ev-m1-c6,ev-m1-c7,ev-m1-c8,ev-m1-c9,ev-m1-p1,ev-m1-p1-split,ev-m1-p2,ev-m1-p2-split,ev-m1-p3,ev-m1-p3-split,ev-m1-t1,ev-m1-t2,ev-m1-t3,ev-m2-c1,ev-m2-c2,ev-m2-c3,ev-m2-c4,ev-m2-c5,ev-m2-c6,ev-m2-c7,ev-m2-c8,ev-m2-c9,ev-m2-p1,ev-m2-p1-split,ev-m2-p2,ev-m2-p2-split,ev-m2-p3,ev-m2-p3-split,ev-m2-t1,ev-m2-t2,ev-m2-t3,ev-m3-c1,ev-m3-c2,ev-m3-c3,ev-m3-c4,ev-m3-c5,ev-m3-c6,ev-m3-c7,ev-m3-c8,ev-m3-c9,ev-m3-p1,ev-m3-p1-split,ev-m3-p2,ev-m3-p2-split,ev-m3-p3,ev-m3-p3-split,ev-m3-t1,ev-m3-t2,ev-m3-t3,ev-m4-c1,ev-m4-c2,ev-m4-c3,ev-m4-c4,ev-m4-c5,ev-m4-c6,ev-m4-p1,ev-m4-c7,ev-m4-c8,ev-m4-c9,ev-m4-c10,ev-m4-p1b,ev-m4-p1b-split,ev-m4-p2b,ev-m4-p2b-split,ev-m4-p3b,ev-m4-p3b-split,ev-m4-t1,ev-m4-t2",
  "tipos-estudiantes": "te-m1-c1,te-m1-c2,te-m1-c3,te-m1-c4,te-m1-c5,te-m1-c6,te-m1-c7,te-m1-c8,te-m1-c9,te-m1-c10,te-m1-c11,te-m1-c12,te-m1-t1,te-m2-c1,te-m2-c2,te-m2-c3,te-m2-c4,te-m2-c5,te-m2-c6,te-m2-c7,te-m2-c8,te-m2-c9,te-m2-c10,te-m2-c11,te-m2-c12,te-m2-t1,te-m3-c1,te-m3-c2,te-m3-c3,te-m3-c4,te-m3-c5,te-m3-c6,te-m3-c7,te-m3-c8,te-m3-c9,te-m3-c10,te-m3-c11,te-m3-c12,te-m3-t1,te-m4-c1,te-m4-c2,te-m4-c3,te-m4-c4,te-m4-c5,te-m4-c6,te-m4-c7,te-m4-c8,te-m4-c9,te-m4-c10,te-m4-c11,te-m4-c12,te-m4-t1,te-m5-c1,te-m5-c2,te-m5-c3,te-m5-c4,te-m5-c5,te-m5-c6,te-m5-c7,te-m5-c8,te-m5-c9,te-m5-c10,te-m5-c11,te-m5-c12,te-m5-t1",
  "storytelling": "st-m1-c1,st-m1-c2,st-m1-c3,st-m1-c4,st-m1-c5,st-m1-c6,st-m1-c7,st-m1-c8,st-m1-c9,st-m1-c10,st-m1-pr1,st-m1-sim1,st-m1-tk1,st-m2-c1,st-m2-c2,st-m2-c3,st-m2-c4,st-m2-c5,st-m2-c6,st-m2-c7,st-m2-c8,st-m2-c9,st-m2-c10,st-m2-pr1,st-m2-sim1,st-m2-tk1,st-m3-c1,st-m3-c2,st-m3-c3,st-m3-c4,st-m3-c5,st-m3-c6,st-m3-c7,st-m3-c8,st-m3-c9,st-m3-c10,st-m3-pr1,st-m3-sim1,st-m3-tk1,st-m4-c1,st-m4-c2,st-m4-c3,st-m4-c4,st-m4-c5,st-m4-c6,st-m4-c7,st-m4-c8,st-m4-c9,st-m4-c10,st-m4-pr1,st-m4-sim1,st-m4-tk1,st-m5-c1,st-m5-c2,st-m5-c3,st-m5-c4,st-m5-c5,st-m5-c6,st-m5-c7,st-m5-c8,st-m5-c9,st-m5-c10,st-m5-sim1,st-m5-tk1",
  "creatividad": "creatividad-1,creatividad-2,creatividad-3,creatividad-4,creatividad-5,creatividad-6,creatividad-7,creatividad-8,creatividad-9,creatividad-10,creatividad-51,creatividad-52,creatividad-53,creatividad-11,creatividad-12,creatividad-13,creatividad-14,creatividad-15,creatividad-16,creatividad-17,creatividad-18,creatividad-19,creatividad-20,creatividad-54,creatividad-55,creatividad-56,creatividad-21,creatividad-22,creatividad-23,creatividad-24,creatividad-25,creatividad-26,creatividad-27,creatividad-28,creatividad-29,creatividad-30,creatividad-57,creatividad-58,creatividad-59,creatividad-31,creatividad-32,creatividad-33,creatividad-34,creatividad-35,creatividad-36,creatividad-37,creatividad-38,creatividad-39,creatividad-40,creatividad-60,creatividad-61,creatividad-62,creatividad-41,creatividad-42,creatividad-43,creatividad-44,creatividad-45,creatividad-46,creatividad-47,creatividad-48,creatividad-49,creatividad-50,creatividad-63,creatividad-64,creatividad-65",
  "herramientas-tec": "herramientas-tec-1,herramientas-tec-2,herramientas-tec-3,herramientas-tec-4,herramientas-tec-5,herramientas-tec-6,herramientas-tec-7,herramientas-tec-8,herramientas-tec-9,herramientas-tec-10,herramientas-tec-11,herramientas-tec-12,herramientas-tec-46,herramientas-tec-47,herramientas-tec-48,herramientas-tec-13,herramientas-tec-14,herramientas-tec-15,herramientas-tec-16,herramientas-tec-17,herramientas-tec-18,herramientas-tec-19,herramientas-tec-20,herramientas-tec-21,herramientas-tec-22,herramientas-tec-23,herramientas-tec-49,herramientas-tec-50,herramientas-tec-51,herramientas-tec-24,herramientas-tec-25,herramientas-tec-26,herramientas-tec-27,herramientas-tec-28,herramientas-tec-29,herramientas-tec-30,herramientas-tec-31,herramientas-tec-32,herramientas-tec-33,herramientas-tec-34,herramientas-tec-52,herramientas-tec-53,herramientas-tec-54,herramientas-tec-35,herramientas-tec-36,herramientas-tec-37,herramientas-tec-38,herramientas-tec-39,herramientas-tec-40,herramientas-tec-41,herramientas-tec-42,herramientas-tec-43,herramientas-tec-44,herramientas-tec-45,herramientas-tec-55,herramientas-tec-56,herramientas-tec-57",
  "m-learning": "m-learning-1,m-learning-2,m-learning-3,m-learning-4,m-learning-5,m-learning-6,m-learning-7,m-learning-8,m-learning-9,m-learning-10,m-learning-41,m-learning-42,m-learning-43,m-learning-11,m-learning-12,m-learning-13,m-learning-14,m-learning-15,m-learning-16,m-learning-17,m-learning-18,m-learning-19,m-learning-20,m-learning-44,m-learning-45,m-learning-46,m-learning-21,m-learning-22,m-learning-23,m-learning-24,m-learning-25,m-learning-26,m-learning-27,m-learning-28,m-learning-29,m-learning-30,m-learning-47,m-learning-48,m-learning-49,m-learning-31,m-learning-32,m-learning-33,m-learning-34,m-learning-35,m-learning-36,m-learning-37,m-learning-38,m-learning-39,m-learning-40,m-learning-50,m-learning-51,m-learning-52",
  "flipped-classroom": "flipped-classroom-1,flipped-classroom-2,flipped-classroom-3,flipped-classroom-4,flipped-classroom-5,flipped-classroom-6,flipped-classroom-7,flipped-classroom-8,flipped-classroom-9,flipped-classroom-10,flipped-classroom-41,flipped-classroom-42,flipped-classroom-43,flipped-classroom-11,flipped-classroom-12,flipped-classroom-13,flipped-classroom-14,flipped-classroom-15,flipped-classroom-16,flipped-classroom-17,flipped-classroom-18,flipped-classroom-19,flipped-classroom-20,flipped-classroom-44,flipped-classroom-45,flipped-classroom-46,flipped-classroom-21,flipped-classroom-22,flipped-classroom-23,flipped-classroom-24,flipped-classroom-25,flipped-classroom-26,flipped-classroom-27,flipped-classroom-28,flipped-classroom-29,flipped-classroom-30,flipped-classroom-47,flipped-classroom-48,flipped-classroom-49,flipped-classroom-31,flipped-classroom-32,flipped-classroom-33,flipped-classroom-34,flipped-classroom-35,flipped-classroom-36,flipped-classroom-37,flipped-classroom-38,flipped-classroom-39,flipped-classroom-40,flipped-classroom-50,flipped-classroom-51,flipped-classroom-52",
  "abv": "abv-1,abv-2,abv-3,abv-4,abv-5,abv-6,abv-7,abv-8,abv-9,abv-36,abv-37,abv-38,abv-10,abv-11,abv-12,abv-13,abv-14,abv-15,abv-16,abv-17,abv-18,abv-39,abv-40,abv-41,abv-19,abv-20,abv-21,abv-22,abv-23,abv-24,abv-25,abv-26,abv-27,abv-42,abv-43,abv-44,abv-28,abv-29,abv-30,abv-31,abv-32,abv-33,abv-34,abv-35,abv-45,abv-46,abv-47",
  "micro-learning": "micro-learning-1,micro-learning-2,micro-learning-3,micro-learning-4,micro-learning-5,micro-learning-6,micro-learning-7,micro-learning-8,micro-learning-9,micro-learning-36,micro-learning-37,micro-learning-38,micro-learning-10,micro-learning-11,micro-learning-12,micro-learning-13,micro-learning-14,micro-learning-15,micro-learning-16,micro-learning-17,micro-learning-18,micro-learning-39,micro-learning-40,micro-learning-41,micro-learning-19,micro-learning-20,micro-learning-21,micro-learning-22,micro-learning-23,micro-learning-24,micro-learning-25,micro-learning-26,micro-learning-27,micro-learning-42,micro-learning-43,micro-learning-44,micro-learning-28,micro-learning-29,micro-learning-30,micro-learning-31,micro-learning-32,micro-learning-33,micro-learning-34,micro-learning-35,micro-learning-45,micro-learning-46,micro-learning-47",
  "ia-fundamentos": "ia-fundamentos-1,ia-fundamentos-2,ia-fundamentos-3,ia-fundamentos-4,ia-fundamentos-5,ia-fundamentos-6,ia-fundamentos-7,ia-fundamentos-8,ia-fundamentos-9,ia-fundamentos-36,ia-fundamentos-37,ia-fundamentos-38,ia-fundamentos-10,ia-fundamentos-11,ia-fundamentos-12,ia-fundamentos-13,ia-fundamentos-14,ia-fundamentos-15,ia-fundamentos-16,ia-fundamentos-17,ia-fundamentos-18,ia-fundamentos-39,ia-fundamentos-40,ia-fundamentos-41,ia-fundamentos-19,ia-fundamentos-20,ia-fundamentos-21,ia-fundamentos-22,ia-fundamentos-23,ia-fundamentos-24,ia-fundamentos-25,ia-fundamentos-26,ia-fundamentos-42,ia-fundamentos-43,ia-fundamentos-44,ia-fundamentos-27,ia-fundamentos-28,ia-fundamentos-29,ia-fundamentos-30,ia-fundamentos-31,ia-fundamentos-32,ia-fundamentos-33,ia-fundamentos-34,ia-fundamentos-35,ia-fundamentos-45,ia-fundamentos-46,ia-fundamentos-47",
  "ia-tiempo": "ia-tiempo-1,ia-tiempo-2,ia-tiempo-3,ia-tiempo-4,ia-tiempo-23,ia-tiempo-24,ia-tiempo-25,ia-tiempo-26,ia-tiempo-5,ia-tiempo-50,ia-tiempo-51,ia-tiempo-52,ia-tiempo-6,ia-tiempo-7,ia-tiempo-8,ia-tiempo-9,ia-tiempo-10,ia-tiempo-27,ia-tiempo-28,ia-tiempo-29,ia-tiempo-11,ia-tiempo-53,ia-tiempo-54,ia-tiempo-55,ia-tiempo-12,ia-tiempo-13,ia-tiempo-14,ia-tiempo-15,ia-tiempo-30,ia-tiempo-31,ia-tiempo-32,ia-tiempo-33,ia-tiempo-16,ia-tiempo-56,ia-tiempo-57,ia-tiempo-58,ia-tiempo-17,ia-tiempo-18,ia-tiempo-19,ia-tiempo-34,ia-tiempo-35,ia-tiempo-36,ia-tiempo-20,ia-tiempo-21,ia-tiempo-22,ia-tiempo-59,ia-tiempo-60,ia-tiempo-61",
  "ia-herramientas": "ia-herramientas-1,ia-herramientas-2,ia-herramientas-3,ia-herramientas-20,ia-herramientas-21,ia-herramientas-22,ia-herramientas-23,ia-herramientas-24,ia-herramientas-4,ia-herramientas-50,ia-herramientas-51,ia-herramientas-52,ia-herramientas-5,ia-herramientas-6,ia-herramientas-7,ia-herramientas-8,ia-herramientas-25,ia-herramientas-26,ia-herramientas-27,ia-herramientas-28,ia-herramientas-9,ia-herramientas-53,ia-herramientas-54,ia-herramientas-55,ia-herramientas-10,ia-herramientas-11,ia-herramientas-12,ia-herramientas-29,ia-herramientas-30,ia-herramientas-31,ia-herramientas-32,ia-herramientas-33,ia-herramientas-13,ia-herramientas-56,ia-herramientas-57,ia-herramientas-58,ia-herramientas-14,ia-herramientas-15,ia-herramientas-16,ia-herramientas-34,ia-herramientas-35,ia-herramientas-36,ia-herramientas-17,ia-herramientas-18,ia-herramientas-19,ia-herramientas-59,ia-herramientas-60,ia-herramientas-61",
  "ia-inclusion": "ia-inclusion-1,ia-inclusion-2,ia-inclusion-3,ia-inclusion-19,ia-inclusion-20,ia-inclusion-21,ia-inclusion-22,ia-inclusion-23,ia-inclusion-4,ia-inclusion-50,ia-inclusion-51,ia-inclusion-52,ia-inclusion-5,ia-inclusion-6,ia-inclusion-7,ia-inclusion-8,ia-inclusion-24,ia-inclusion-25,ia-inclusion-26,ia-inclusion-27,ia-inclusion-9,ia-inclusion-53,ia-inclusion-54,ia-inclusion-55,ia-inclusion-10,ia-inclusion-11,ia-inclusion-12,ia-inclusion-28,ia-inclusion-29,ia-inclusion-30,ia-inclusion-31,ia-inclusion-32,ia-inclusion-13,ia-inclusion-56,ia-inclusion-57,ia-inclusion-58,ia-inclusion-14,ia-inclusion-15,ia-inclusion-16,ia-inclusion-33,ia-inclusion-34,ia-inclusion-35,ia-inclusion-36,ia-inclusion-17,ia-inclusion-18,ia-inclusion-59,ia-inclusion-60,ia-inclusion-61",
  "ia-ciudadania": "ia-ciudadania-1,ia-ciudadania-2,ia-ciudadania-3,ia-ciudadania-18,ia-ciudadania-19,ia-ciudadania-20,ia-ciudadania-21,ia-ciudadania-22,ia-ciudadania-4,ia-ciudadania-50,ia-ciudadania-51,ia-ciudadania-52,ia-ciudadania-5,ia-ciudadania-6,ia-ciudadania-7,ia-ciudadania-23,ia-ciudadania-24,ia-ciudadania-25,ia-ciudadania-26,ia-ciudadania-27,ia-ciudadania-8,ia-ciudadania-53,ia-ciudadania-54,ia-ciudadania-55,ia-ciudadania-9,ia-ciudadania-10,ia-ciudadania-11,ia-ciudadania-28,ia-ciudadania-29,ia-ciudadania-30,ia-ciudadania-31,ia-ciudadania-32,ia-ciudadania-12,ia-ciudadania-56,ia-ciudadania-57,ia-ciudadania-58,ia-ciudadania-13,ia-ciudadania-14,ia-ciudadania-15,ia-ciudadania-33,ia-ciudadania-34,ia-ciudadania-35,ia-ciudadania-36,ia-ciudadania-16,ia-ciudadania-17,ia-ciudadania-59,ia-ciudadania-60,ia-ciudadania-61",
  "manejo-conductas": "manejo-conductas-1,manejo-conductas-2,manejo-conductas-3,manejo-conductas-4,manejo-conductas-5,manejo-conductas-6,manejo-conductas-32,manejo-conductas-7,manejo-conductas-8,manejo-conductas-50,manejo-conductas-51,manejo-conductas-52,manejo-conductas-9,manejo-conductas-10,manejo-conductas-11,manejo-conductas-12,manejo-conductas-13,manejo-conductas-33,manejo-conductas-34,manejo-conductas-14,manejo-conductas-15,manejo-conductas-53,manejo-conductas-54,manejo-conductas-55,manejo-conductas-16,manejo-conductas-17,manejo-conductas-18,manejo-conductas-19,manejo-conductas-20,manejo-conductas-21,manejo-conductas-35,manejo-conductas-22,manejo-conductas-23,manejo-conductas-56,manejo-conductas-57,manejo-conductas-58,manejo-conductas-24,manejo-conductas-25,manejo-conductas-26,manejo-conductas-27,manejo-conductas-28,manejo-conductas-29,manejo-conductas-36,manejo-conductas-30,manejo-conductas-31,manejo-conductas-59,manejo-conductas-60,manejo-conductas-61",
  "sel-docentes": "sel-docentes-1,sel-docentes-2,sel-docentes-3,sel-docentes-4,sel-docentes-5,sel-docentes-27,sel-docentes-28,sel-docentes-6,sel-docentes-7,sel-docentes-50,sel-docentes-51,sel-docentes-52,sel-docentes-8,sel-docentes-9,sel-docentes-10,sel-docentes-11,sel-docentes-12,sel-docentes-29,sel-docentes-30,sel-docentes-13,sel-docentes-14,sel-docentes-53,sel-docentes-54,sel-docentes-55,sel-docentes-15,sel-docentes-16,sel-docentes-17,sel-docentes-18,sel-docentes-31,sel-docentes-32,sel-docentes-33,sel-docentes-19,sel-docentes-20,sel-docentes-56,sel-docentes-57,sel-docentes-58,sel-docentes-21,sel-docentes-22,sel-docentes-23,sel-docentes-24,sel-docentes-34,sel-docentes-35,sel-docentes-36,sel-docentes-25,sel-docentes-26,sel-docentes-59,sel-docentes-60,sel-docentes-61",
  "comunicacion-asertiva": "comunicacion-asertiva-1,comunicacion-asertiva-2,comunicacion-asertiva-3,comunicacion-asertiva-4,comunicacion-asertiva-5,comunicacion-asertiva-27,comunicacion-asertiva-28,comunicacion-asertiva-6,comunicacion-asertiva-7,comunicacion-asertiva-50,comunicacion-asertiva-51,comunicacion-asertiva-52,comunicacion-asertiva-8,comunicacion-asertiva-9,comunicacion-asertiva-10,comunicacion-asertiva-11,comunicacion-asertiva-29,comunicacion-asertiva-30,comunicacion-asertiva-31,comunicacion-asertiva-12,comunicacion-asertiva-13,comunicacion-asertiva-53,comunicacion-asertiva-54,comunicacion-asertiva-55,comunicacion-asertiva-14,comunicacion-asertiva-15,comunicacion-asertiva-16,comunicacion-asertiva-17,comunicacion-asertiva-32,comunicacion-asertiva-33,comunicacion-asertiva-34,comunicacion-asertiva-18,comunicacion-asertiva-19,comunicacion-asertiva-56,comunicacion-asertiva-57,comunicacion-asertiva-58,comunicacion-asertiva-20,comunicacion-asertiva-21,comunicacion-asertiva-22,comunicacion-asertiva-23,comunicacion-asertiva-35,comunicacion-asertiva-36,comunicacion-asertiva-37,comunicacion-asertiva-24,comunicacion-asertiva-25,comunicacion-asertiva-59,comunicacion-asertiva-60,comunicacion-asertiva-61",
  "disciplina-positiva": "disciplina-positiva-1,disciplina-positiva-2,disciplina-positiva-3,disciplina-positiva-4,disciplina-positiva-25,disciplina-positiva-26,disciplina-positiva-27,disciplina-positiva-5,disciplina-positiva-6,disciplina-positiva-50,disciplina-positiva-51,disciplina-positiva-52,disciplina-positiva-7,disciplina-positiva-8,disciplina-positiva-9,disciplina-positiva-10,disciplina-positiva-28,disciplina-positiva-29,disciplina-positiva-30,disciplina-positiva-11,disciplina-positiva-12,disciplina-positiva-53,disciplina-positiva-54,disciplina-positiva-55,disciplina-positiva-13,disciplina-positiva-14,disciplina-positiva-15,disciplina-positiva-16,disciplina-positiva-31,disciplina-positiva-32,disciplina-positiva-33,disciplina-positiva-17,disciplina-positiva-18,disciplina-positiva-56,disciplina-positiva-57,disciplina-positiva-58,disciplina-positiva-19,disciplina-positiva-20,disciplina-positiva-21,disciplina-positiva-22,disciplina-positiva-34,disciplina-positiva-35,disciplina-positiva-36,disciplina-positiva-23,disciplina-positiva-24,disciplina-positiva-59,disciplina-positiva-60,disciplina-positiva-61",
  "bienestar-docente": "bienestar-docente-1,bienestar-docente-2,bienestar-docente-3,bienestar-docente-4,bienestar-docente-25,bienestar-docente-26,bienestar-docente-27,bienestar-docente-5,bienestar-docente-6,bienestar-docente-50,bienestar-docente-51,bienestar-docente-52,bienestar-docente-7,bienestar-docente-8,bienestar-docente-9,bienestar-docente-10,bienestar-docente-28,bienestar-docente-29,bienestar-docente-30,bienestar-docente-11,bienestar-docente-12,bienestar-docente-53,bienestar-docente-54,bienestar-docente-55,bienestar-docente-13,bienestar-docente-14,bienestar-docente-15,bienestar-docente-16,bienestar-docente-31,bienestar-docente-32,bienestar-docente-33,bienestar-docente-17,bienestar-docente-18,bienestar-docente-56,bienestar-docente-57,bienestar-docente-58,bienestar-docente-19,bienestar-docente-20,bienestar-docente-21,bienestar-docente-22,bienestar-docente-34,bienestar-docente-35,bienestar-docente-36,bienestar-docente-23,bienestar-docente-24,bienestar-docente-59,bienestar-docente-60,bienestar-docente-61",
  "educacion-inclusiva": "educacion-inclusiva-1,educacion-inclusiva-2,educacion-inclusiva-3,educacion-inclusiva-4,educacion-inclusiva-5,educacion-inclusiva-50,educacion-inclusiva-51,educacion-inclusiva-52,educacion-inclusiva-6,educacion-inclusiva-7,educacion-inclusiva-8,educacion-inclusiva-9,educacion-inclusiva-10,educacion-inclusiva-11,educacion-inclusiva-53,educacion-inclusiva-54,educacion-inclusiva-55,educacion-inclusiva-12,educacion-inclusiva-13,educacion-inclusiva-14,educacion-inclusiva-15,educacion-inclusiva-16,educacion-inclusiva-56,educacion-inclusiva-57,educacion-inclusiva-58,educacion-inclusiva-17,educacion-inclusiva-18,educacion-inclusiva-19,educacion-inclusiva-20,educacion-inclusiva-21,educacion-inclusiva-59,educacion-inclusiva-60,educacion-inclusiva-61,educacion-inclusiva-22,educacion-inclusiva-23,educacion-inclusiva-24,educacion-inclusiva-25,educacion-inclusiva-26,educacion-inclusiva-27,educacion-inclusiva-62,educacion-inclusiva-63,educacion-inclusiva-64",
  "tea-profundidad": "tea-profundidad-1,tea-profundidad-2,tea-profundidad-3,tea-profundidad-4,tea-profundidad-5,tea-profundidad-50,tea-profundidad-51,tea-profundidad-52,tea-profundidad-6,tea-profundidad-7,tea-profundidad-8,tea-profundidad-9,tea-profundidad-10,tea-profundidad-53,tea-profundidad-54,tea-profundidad-55,tea-profundidad-11,tea-profundidad-12,tea-profundidad-13,tea-profundidad-14,tea-profundidad-15,tea-profundidad-56,tea-profundidad-57,tea-profundidad-58,tea-profundidad-16,tea-profundidad-17,tea-profundidad-18,tea-profundidad-19,tea-profundidad-20,tea-profundidad-59,tea-profundidad-60,tea-profundidad-61",
  "discapacidad-down-tdah": "discapacidad-down-tdah-1,discapacidad-down-tdah-2,discapacidad-down-tdah-3,discapacidad-down-tdah-4,discapacidad-down-tdah-5,discapacidad-down-tdah-50,discapacidad-down-tdah-51,discapacidad-down-tdah-52,discapacidad-down-tdah-6,discapacidad-down-tdah-7,discapacidad-down-tdah-8,discapacidad-down-tdah-9,discapacidad-down-tdah-10,discapacidad-down-tdah-53,discapacidad-down-tdah-54,discapacidad-down-tdah-55,discapacidad-down-tdah-11,discapacidad-down-tdah-12,discapacidad-down-tdah-13,discapacidad-down-tdah-14,discapacidad-down-tdah-15,discapacidad-down-tdah-56,discapacidad-down-tdah-57,discapacidad-down-tdah-58,discapacidad-down-tdah-16,discapacidad-down-tdah-17,discapacidad-down-tdah-18,discapacidad-down-tdah-19,discapacidad-down-tdah-20,discapacidad-down-tdah-59,discapacidad-down-tdah-60,discapacidad-down-tdah-61",
  "lengua-senas-docentes": "lengua-senas-docentes-1,lengua-senas-docentes-2,lengua-senas-docentes-3,lengua-senas-docentes-4,lengua-senas-docentes-5,lengua-senas-docentes-50,lengua-senas-docentes-51,lengua-senas-docentes-52,lengua-senas-docentes-6,lengua-senas-docentes-7,lengua-senas-docentes-8,lengua-senas-docentes-9,lengua-senas-docentes-10,lengua-senas-docentes-53,lengua-senas-docentes-54,lengua-senas-docentes-55,lengua-senas-docentes-11,lengua-senas-docentes-12,lengua-senas-docentes-13,lengua-senas-docentes-14,lengua-senas-docentes-15,lengua-senas-docentes-56,lengua-senas-docentes-57,lengua-senas-docentes-58,lengua-senas-docentes-16,lengua-senas-docentes-17,lengua-senas-docentes-18,lengua-senas-docentes-19,lengua-senas-docentes-20,lengua-senas-docentes-59,lengua-senas-docentes-60,lengua-senas-docentes-61",
  "fundamentos-pisa": "fundamentos-pisa-1,fundamentos-pisa-2,fundamentos-pisa-3,fundamentos-pisa-4,fundamentos-pisa-5,fundamentos-pisa-6,fundamentos-pisa-7,fundamentos-pisa-8,fundamentos-pisa-9,fundamentos-pisa-10,fundamentos-pisa-11,fundamentos-pisa-12,fundamentos-pisa-13,fundamentos-pisa-14,fundamentos-pisa-15,fundamentos-pisa-16,fundamentos-pisa-17,fundamentos-pisa-18,fundamentos-pisa-19,fundamentos-pisa-20,fundamentos-pisa-21,fundamentos-pisa-22,fundamentos-pisa-23,fundamentos-pisa-24,fundamentos-pisa-25,fundamentos-pisa-26,fundamentos-pisa-27,fundamentos-pisa-28,fundamentos-pisa-29,fundamentos-pisa-30,fundamentos-pisa-31,fundamentos-pisa-32,fundamentos-pisa-33,fundamentos-pisa-34,fundamentos-pisa-35,fundamentos-pisa-36,fundamentos-pisa-37,fundamentos-pisa-38,fundamentos-pisa-39,fundamentos-pisa-40,fundamentos-pisa-41,fundamentos-pisa-42,fundamentos-pisa-43,fundamentos-pisa-44,fundamentos-pisa-45,fundamentos-pisa-46,fundamentos-pisa-47,fundamentos-pisa-48,fundamentos-pisa-49",
};
const DEFAULT_PATHS: { id: string; courses: string[] }[] = [
  { id: "steam20", courses: ["steam","abp","design-thinking","evaluacion","tipos-estudiantes"] },
  { id: "creativo", courses: ["creatividad","herramientas-tec","abp","storytelling"] },
  { id: "metodologias", courses: ["abp","m-learning","flipped-classroom","abv","micro-learning"] },
  { id: "ia", courses: ["ia-fundamentos","ia-tiempo","ia-herramientas","ia-inclusion","ia-ciudadania"] },
  { id: "convivencia", courses: ["manejo-conductas","sel-docentes","comunicacion-asertiva","disciplina-positiva","bienestar-docente"] },
  { id: "inclusion", courses: ["educacion-inclusiva","tea-profundidad","discapacidad-down-tdah","lengua-senas-docentes"] },
  { id: "fundamentos", courses: ["fundamentos-pisa"] },
];
// SYNC:END

// PURE:START — lógica sin red ni base de datos (se prueba en Node, ver
// scripts/test-cert-rules.mjs)
const PASS_SCORE = 70;          // nota mínima de un examen de curso
const MIN_CARDS_RATIO = 0.8;    // mismo 80 % que pide la app para rendir el examen
const MASTER_PASS = 85;         // examen × 0.5 + portafolio (sobre 50), como en app.js
const RECENT_ACCOUNT_HOURS = 72;
const MIN_SECONDS_PER_CARD = 20;       // tiempo registrado mínimo por tarjeta estudiada (alerta, no bloqueo)

type Fail = { ok: false; code: string; message: string; detail?: Record<string, unknown> };
type Pass = { ok: true; meta: Record<string, unknown>; flags: string[] };

function cardIdSet(courseId: string): Set<string> | null {
  const raw = COURSE_CARD_IDS[courseId];
  return raw === undefined ? null : new Set(raw.split(',').filter(Boolean));
}

function cardsDone(completed: unknown, courseId: string): { done: number; total: number } {
  const set = cardIdSet(courseId);
  if (!set) return { done: 0, total: 0 };
  const seen = new Set<string>();
  if (Array.isArray(completed)) for (const id of completed) { const s = String(id); if (set.has(s)) seen.add(s); }
  return { done: seen.size, total: set.size };
}

function examScore(dm: any, courseId: string): number | undefined {
  const sc = dm?.examScores?.[courseId];
  if (typeof sc === 'number') return sc;
  if (courseId === 'steam' && typeof dm?.examScore === 'number') return dm.examScore;   // legado
  return undefined;
}

function masterExamScore(dm: any, pathId: string): number | undefined {
  const sc = dm?.masterExamScores?.[pathId];
  if (typeof sc === 'number') return sc;
  if (pathId === 'steam20' && typeof dm?.masterExamScore === 'number') return dm.masterExamScore;   // legado
  return undefined;
}

// Las rutas guardadas por el admin ganan; las rutas nuevas del código se agregan
// si aún no están guardadas (igual que loadAppConfig en app.js).
function resolvePath(pathId: string, saved: unknown): { id: string; courses: string[] } | null {
  const savedList = Array.isArray(saved) ? saved as any[] : [];
  const merged = [
    ...savedList.filter((p) => p && typeof p.id === 'string'),
    ...DEFAULT_PATHS.filter((d) => !savedList.some((p) => p?.id === d.id)),
  ];
  const found = merged.find((p) => p.id === pathId);
  if (!found) return null;
  // Como _checkMasterCert: solo cuentan los cursos disponibles
  const courses = (Array.isArray(found.courses) ? found.courses : []).map(String).filter((c: string) => COURSE_CARD_IDS[c] !== undefined);
  return courses.length ? { id: pathId, courses } : null;
}

type ClaimInput = {
  certType: 'diploma' | 'master';
  refId: string;
  progress: { completed_cards?: unknown; daily_missions?: any } | null;
  reviews: { kind: string; ref_id: string; approved: boolean; score: number }[];
  savedPaths: unknown;
  accountCreatedAt: string | null;
  recentSponsorClaims: number;   // certificados patrocinados de este docente en las últimas 24 h
  sessionSeconds: number | null; // suma de user_sessions.duration_seconds (null = no se pudo leer)
  now: number;
};

function validateClaim(i: ClaimInput): Pass | Fail {
  const dm = i.progress?.daily_missions || {};
  const cards = i.progress?.completed_cards;
  const hours = i.accountCreatedAt ? Math.max(0, (i.now - new Date(i.accountCreatedAt).getTime()) / 36e5) : null;
  const flags: string[] = [];
  const meta: Record<string, unknown> = { tipo: i.certType, ref: i.refId };
  let studiedCards = 0;

  if (i.certType === 'diploma') {
    if (!cardIdSet(i.refId)) return { ok: false, code: 'unknown_course', message: 'No reconocemos ese curso.' };
    const score = examScore(dm, i.refId);
    if (score === undefined || score < PASS_SCORE) {
      return { ok: false, code: 'exam_not_passed', message: 'Primero aprueba el examen final del curso (70 % o más).' };
    }
    const c = cardsDone(cards, i.refId);
    if (c.done < Math.ceil(c.total * MIN_CARDS_RATIO)) {
      return { ok: false, code: 'cards_incomplete', message: `Para el diploma patrocinado necesitas completar al menos el 80 % de las tarjetas del curso (llevas ${c.done} de ${c.total}).`, detail: c };
    }
    const review = i.reviews.filter((r) => r.kind === 'diploma' && r.ref_id === i.refId && r.approved)
      .sort((a, b) => b.score - a.score)[0];
    if (!review) {
      return { ok: false, code: 'needs_evidence', message: 'Antes del diploma patrocinado cuéntanos cómo aplicaste el curso en tu aula; una IA revisa tu relato.' };
    }
    studiedCards = c.done;
    Object.assign(meta, { examen: score, tarjetas: `${c.done}/${c.total}`, relato_ia: review.score });
  } else {
    const path = resolvePath(i.refId, i.savedPaths);
    if (!path) return { ok: false, code: 'unknown_path', message: 'No reconocemos esa ruta.' };
    for (const cid of path.courses) {
      const s = examScore(dm, cid);
      if (s === undefined || s < PASS_SCORE) {
        return { ok: false, code: 'exam_not_passed', message: 'Primero aprueba los exámenes de todos los cursos de la ruta.', detail: { curso: cid } };
      }
      const c = cardsDone(cards, cid);
      if (c.done < Math.ceil(c.total * MIN_CARDS_RATIO)) {
        return { ok: false, code: 'cards_incomplete', message: `Necesitas completar al menos el 80 % de las tarjetas de cada curso de la ruta (en «${cid}» llevas ${c.done} de ${c.total}).`, detail: { curso: cid, ...c } };
      }
      studiedCards += c.done;
    }
    const exam = masterExamScore(dm, i.refId);
    if (exam === undefined) {
      return { ok: false, code: 'needs_portfolio', message: 'Falta rendir el examen maestro de la ruta.' };
    }
    const portfolio = i.reviews.filter((r) => r.kind === 'portfolio' && r.ref_id === i.refId)
      .sort((a, b) => b.score - a.score)[0];
    if (!portfolio) {
      return { ok: false, code: 'needs_portfolio', message: 'Falta enviar tu portafolio para que la IA lo revise.' };
    }
    const combined = Math.round(exam * 0.5) + Math.round(portfolio.score);
    if (combined < MASTER_PASS) {
      return { ok: false, code: 'needs_portfolio', message: `Tu total del certificado maestro es ${combined} de 100; se necesitan ${MASTER_PASS}.`, detail: { combined } };
    }
    Object.assign(meta, { examen_maestro: exam, portafolio_ia: portfolio.score, total: combined, cursos: path.courses.length });
  }

  // Señales de alerta: no bloquean, quedan para el admin
  if (hours !== null) {
    meta.horas_desde_registro = Math.round(hours);
    if (hours < RECENT_ACCOUNT_HOURS) flags.push('cuenta_reciente');
  }
  // Tiempo de uso registrado vs. tarjetas estudiadas: quien edita su avance a mano
  // suele tener muy poco tiempo de sesión. No bloquea (las sesiones pueden no
  // registrarse sin conexión); queda como alerta para el admin.
  if (i.sessionSeconds !== null) {
    meta.minutos_registrados = Math.round(i.sessionSeconds / 60);
    if (i.sessionSeconds < studiedCards * MIN_SECONDS_PER_CARD) flags.push('poco_tiempo_registrado');
  }
  if (i.recentSponsorClaims >= 2) flags.push('varios_certificados_en_24h');
  return { ok: true, meta, flags };
}
// PURE:END

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No autorizado' }, 401);

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authErr } = await userClient.auth.getUser();
    if (authErr || !user) return json({ error: 'No autenticado' }, 401);

    const body = await req.json();
    const cert_type = String(body.cert_type || '');
    const ref_id = String(body.ref_id || '').trim();
    const course_id = body.course_id ? String(body.course_id).trim() : null;

    if (!['diploma', 'master'].includes(cert_type)) return json({ error: 'cert_type inválido' }, 400);
    if (!ref_id) return json({ error: 'ref_id es requerido' }, 400);

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Si ya pagó este certificado antes, no generar un checkout nuevo —
    // evita cobrar dos veces por lo mismo si reintenta el flujo. .limit(1)
    // en vez de maybeSingle() a secas: si hubo más de un intento pagado
    // (o pending+paid mezclados), maybeSingle() lanzaría error por
    // "multiple rows returned".
    const { data: existingPaidRows } = await admin
      .from('certificate_payments')
      .select('id')
      .eq('user_id', user.id)
      .eq('cert_type', cert_type)
      .eq('ref_id', ref_id)
      .eq('status', 'paid')
      .limit(1);
    if (existingPaidRows && existingPaidRows.length > 0) {
      return json({ error: 'Ya pagaste este certificado.', already_paid: true }, 409);
    }

    // ── Patrocinio: si un patrocinador cubre a este docente y le queda cupo, ──
    // no se cobra. `use_sponsor: false` deja que el docente pague él mismo.
    if (body.use_sponsor !== false) {
      const { data: cands } = await admin.rpc('sponsor_candidates', { p_user: user.id });
      const covered = (cands || []).filter((c: any) => cert_type === 'diploma'
        ? c.diploma_left > 0 && (!c.courses || c.courses.includes(ref_id))
        : c.master_left > 0);

      if (covered.length) {
        const [{ data: prog }, { data: reviews }, { data: cfg }, { count: recent }, { data: sessions }] = await Promise.all([
          admin.from('progress').select('completed_cards, daily_missions').eq('user_id', user.id).maybeSingle(),
          admin.from('ai_reviews').select('kind, ref_id, approved, score').eq('user_id', user.id).eq('ref_id', ref_id),
          admin.from('app_config').select('value').eq('key', 'learning_paths').maybeSingle(),
          admin.from('certificate_payments').select('id', { count: 'exact', head: true })
            .eq('user_id', user.id).eq('payment_method', 'sponsor').eq('status', 'paid')
            .gte('paid_at', new Date(Date.now() - 864e5).toISOString()),
          admin.from('user_sessions').select('duration_seconds').eq('user_id', user.id).limit(10000),
        ]);

        const verdict = validateClaim({
          certType: cert_type as 'diploma' | 'master',
          refId: ref_id,
          progress: prog,
          reviews: reviews || [],
          savedPaths: cfg?.value,
          accountCreatedAt: user.created_at || null,
          recentSponsorClaims: recent || 0,
          sessionSeconds: sessions ? sessions.reduce((a: number, r: any) => a + (Number(r.duration_seconds) || 0), 0) : null,
          now: Date.now(),
        });
        if (!verdict.ok) {
          // Cubierto por un patrocinador pero todavía no cumple: se le dice qué falta
          // (no se le cobra en silencio un certificado que debería ser gratis).
          return json({ error: verdict.message, code: verdict.code, sponsored: true, detail: verdict.detail || null }, 422);
        }

        const { data: claim, error: claimErr } = await admin.rpc('claim_sponsored_cert', {
          p_user: user.id, p_cert_type: cert_type, p_ref_id: ref_id, p_course_id: course_id,
          p_meta: verdict.meta, p_flags: verdict.flags,
        });
        if (claimErr) return json({ error: 'No se pudo usar el cupo del patrocinador: ' + claimErr.message }, 500);
        if (claim?.ok) {
          return json({
            ok: true, sponsored: true,
            sponsor: { name: claim.name ?? null, logo_url: claim.logo_url ?? null, show_on_certificate: claim.show_on_certificate ?? true },
          });
        }
        if (claim?.error === 'rate_limited') {
          return json({ error: 'Ya obtuviste varios certificados hoy. Inténtalo de nuevo mañana.', code: 'rate_limited', sponsored: true }, 429);
        }
        // 'no_seats' (alguien usó el último cupo entre la consulta y ahora): se cae al pago normal
      }
    }

    const amount_in_cents = PRICES[cert_type];
    const successUrl = `${APP_URL}/index.html?paid_cert=${encodeURIComponent(cert_type)}&ref=${encodeURIComponent(ref_id)}${course_id ? `&course=${encodeURIComponent(course_id)}` : ''}`;
    const cancelUrl = `${APP_URL}/index.html`;

    const recRes = await fetch('https://app.recurrente.com/api/checkouts', {
      method: 'POST',
      headers: { 'X-SECRET-KEY': RECURRENTE_SECRET_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ name: NAMES[cert_type], amount_in_cents, currency: 'GTQ', quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    });
    const recData = await recRes.json();
    if (!recRes.ok || !recData?.checkout_url || !recData?.id) {
      return json({ error: 'No se pudo iniciar el pago con Recurrente.', detail: recData }, 502);
    }

    const { error: insErr } = await admin.from('certificate_payments').insert({
      user_id: user.id,
      cert_type,
      ref_id,
      course_id,
      amount_in_cents,
      currency: 'GTQ',
      recurrente_checkout_id: recData.id,
      status: 'pending',
    });
    if (insErr) return json({ error: 'Error al registrar el pago: ' + insErr.message }, 500);

    return json({ ok: true, checkout_url: recData.checkout_url });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
