// Edge Function: submit-application
// Recibe la postulación de un candidato al programa STEEAM y aplica
// el filtro duro de elegibilidad. Pública — el candidato aún no tiene
// cuenta, no requiere JWT.
// Recibe: { full_name, email, phone, jornada_disponible, acepta_salario, acepta_jornada, compromiso_no_mineduc }
// Devuelve: { ok: true, passed_filter: boolean, access_token: string | null }
//
// El cliente NUNCA decide el resultado del filtro ni el status — los
// tres booleans que envía son solo la intención declarada; el server
// los revalida y es la única fuente de verdad para `status`.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JORNADAS_VALIDAS = ['matutina', 'vespertina', 'ambas'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  try {
    const body = await req.json();

    const full_name = String(body.full_name || '').trim().slice(0, 200);
    const email      = String(body.email || '').trim().toLowerCase().slice(0, 200);
    const phone      = String(body.phone || '').trim().slice(0, 40);
    const jornada_disponible = JORNADAS_VALIDAS.includes(body.jornada_disponible) ? body.jornada_disponible : null;

    if (!full_name) return json({ error: 'full_name es requerido' }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: 'email inválido' }, 400);
    if (!jornada_disponible) return json({ error: 'jornada_disponible inválida' }, 400);

    // Filtro duro — revalidado server-side, el cliente solo declara intención.
    const acepta_salario        = body.acepta_salario === true;
    const acepta_jornada        = body.acepta_jornada === true;
    const compromiso_no_mineduc = body.compromiso_no_mineduc === true;
    const passedFilter = acepta_salario && acepta_jornada && compromiso_no_mineduc;

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: inserted, error } = await admin
      .from('candidates')
      .insert({
        full_name,
        email,
        phone,
        jornada_disponible,
        acepta_salario,
        acepta_jornada,
        compromiso_no_mineduc,
        status: passedFilter ? 'evaluacion_pendiente' : 'rechazado_filtro',
      })
      .select('access_token')
      .single();

    if (error) return json({ error: error.message }, 500);

    return json({
      ok: true,
      passed_filter: passedFilter,
      access_token: passedFilter ? inserted.access_token : null,
    });

  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
