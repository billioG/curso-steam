// Edge Function: submit-application
// Recibe la postulación de un candidato al programa STEEAM y aplica
// el filtro duro de elegibilidad. Pública — el candidato aún no tiene
// cuenta, no requiere JWT.
// Recibe: { full_name, email, phone, jornada_disponible, pretension_salarial,
//           acepta_jornada, interes_mineduc, compromiso_finalizar_programa, tenant_id }
// `tenant_id` (uuid|null) viene de window.TENANT.id en el HTML — null para
// candidatos del 1bot original. Se valida por la propia FK a `tenants`:
// un tenant_id inexistente hace fallar el insert, no hay que revalidarlo aquí.
// Devuelve: { ok: true, passed_filter: boolean, rejection_reason: 'salario'|'jornada_compromiso'|null, access_token: string | null }
//
// El cliente NUNCA decide el resultado del filtro ni el status — los
// valores que envía son solo la intención declarada; el server los
// revalida y es la única fuente de verdad para `status`.
//
// Presupuesto default: Q3,100/mes, tope default Q3,200 — usado cuando el
// tenant no configuró su propio `salario_maximo` en la tabla `tenants`
// (o para el 1bot original, tenant_id null). Si lo configuró, ESE valor
// (leído server-side, nunca del body) es el que manda. Por encima del
// tope se rechaza con un mensaje específico de desajuste salarial.
//
// `interes_mineduc` es SOLO informativo — estar en proceso de optar una
// plaza MINEDUC no descalifica al candidato, se guarda para que el admin
// lo vea en el panel. El filtro real es `compromiso_finalizar_programa`
// (finalizar el programa aunque surja otra oportunidad).

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
const SALARIO_MAXIMO_DEFAULT = 3200;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  try {
    const body = await req.json();

    const full_name = String(body.full_name || '').trim().slice(0, 200);
    const email      = String(body.email || '').trim().toLowerCase().slice(0, 200);
    const phone      = String(body.phone || '').trim().slice(0, 40);
    const jornada_disponible = JORNADAS_VALIDAS.includes(body.jornada_disponible) ? body.jornada_disponible : null;

    const pretension_salarial = Number(body.pretension_salarial);

    if (!full_name) return json({ error: 'full_name es requerido' }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: 'email inválido' }, 400);
    if (!jornada_disponible) return json({ error: 'jornada_disponible inválida' }, 400);
    if (!Number.isFinite(pretension_salarial) || pretension_salarial <= 0 || pretension_salarial > 100000) {
      return json({ error: 'pretension_salarial inválida' }, 400);
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const tenant_id = body.tenant_id || null;

    // El tope de salario SIEMPRE se lee de la tabla `tenants` (nunca del
    // body) — si el cliente mandara su propio salario_maximo podría
    // inflarlo para colarse por encima del presupuesto real del colegio.
    let salarioMaximo = SALARIO_MAXIMO_DEFAULT;
    if (tenant_id) {
      const { data: tenantRow } = await admin
        .from('tenants')
        .select('salario_maximo')
        .eq('id', tenant_id)
        .maybeSingle();
      // Solo un tope explícito y positivo reemplaza el default; 0/null/negativo
      // (config no puesta o inválida) cae al default, nunca rechaza a todos.
      if (tenantRow && Number(tenantRow.salario_maximo) > 0) salarioMaximo = Number(tenantRow.salario_maximo);
    }

    // Filtro duro — revalidado server-side, el cliente solo declara intención.
    // interes_mineduc NO participa del filtro (ver nota arriba).
    const acepta_jornada                 = body.acepta_jornada === true;
    const interes_mineduc                = body.interes_mineduc === true;
    const compromiso_finalizar_programa  = body.compromiso_finalizar_programa === true;
    const salarioOk = pretension_salarial <= salarioMaximo;
    const passedFilter = salarioOk && acepta_jornada && compromiso_finalizar_programa;

    let rejection_reason: string | null = null;
    if (!passedFilter) rejection_reason = !salarioOk ? 'salario' : 'jornada_compromiso';

    // Anti re-intento: una persona (mismo correo + mismo colegio) no puede
    // volver a hacer la evaluación para "farmear" un mejor puntaje. Se busca
    // su postulación previa y se decide según en qué punto quedó:
    //   - evaluado/contratado/desertado  → ya completó o cerró su proceso:
    //     se bloquea, NO se crea fila nueva ni token nuevo (already_applied).
    //   - evaluacion_pendiente           → pasó el filtro pero no terminó la
    //     evaluación (ej. cerró la pestaña): se REANUDA con el MISMO token,
    //     así ve los mismos casos cacheados, no un intento fresco.
    //   - rechazado_filtro/rechazado     → nunca llegó a la evaluación: se le
    //     deja corregir sus datos y re-enviar SOBRE la misma fila (sin
    //     duplicar), re-evaluando el filtro server-side.
    let existingQuery = admin
      .from('candidates')
      .select('id, status, access_token')
      .eq('email', email);
    existingQuery = tenant_id ? existingQuery.eq('tenant_id', tenant_id) : existingQuery.is('tenant_id', null);
    const { data: existingRows, error: existErr } = await existingQuery
      .order('applied_at', { ascending: false })
      .limit(1);
    if (existErr) return json({ error: existErr.message }, 500);
    const existing = existingRows?.[0] || null;

    if (existing) {
      if (existing.status === 'evaluado' || existing.status === 'contratado' || existing.status === 'desertado') {
        return json({ ok: true, already_applied: true });
      }
      if (existing.status === 'evaluacion_pendiente') {
        // Reanuda la evaluación en curso — mismo token, mismos casos.
        return json({ ok: true, passed_filter: true, resumed: true, access_token: existing.access_token });
      }
      // Estaba rechazado por filtro: actualiza la misma fila con los datos nuevos.
      const { data: updated, error: updErr } = await admin
        .from('candidates')
        .update({
          full_name,
          phone,
          jornada_disponible,
          pretension_salarial,
          acepta_jornada,
          interes_mineduc,
          compromiso_finalizar_programa,
          status: passedFilter ? 'evaluacion_pendiente' : 'rechazado_filtro',
          rejection_reason,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('access_token')
        .single();
      if (updErr) return json({ error: updErr.message }, 500);
      return json({
        ok: true,
        passed_filter: passedFilter,
        rejection_reason,
        access_token: passedFilter ? updated.access_token : null,
      });
    }

    const { data: inserted, error } = await admin
      .from('candidates')
      .insert({
        full_name,
        email,
        phone,
        jornada_disponible,
        pretension_salarial,
        acepta_jornada,
        interes_mineduc,
        compromiso_finalizar_programa,
        status: passedFilter ? 'evaluacion_pendiente' : 'rechazado_filtro',
        rejection_reason,
        tenant_id,
      })
      .select('access_token')
      .single();

    if (error) return json({ error: error.message }, 500);

    return json({
      ok: true,
      passed_filter: passedFilter,
      rejection_reason,
      access_token: passedFilter ? inserted.access_token : null,
    });

  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
