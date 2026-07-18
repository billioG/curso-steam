// Edge Function: generate-cases
// Genera (vía Groq) los casos de estudio que un candidato va a responder
// en evaluacion.html, según las áreas que el colegio configuró en
// `tenants.evaluation_areas` (didáctica / pedagogía / manejo de grupo /
// tecnología — vacío/null = mezcla de las 4). Pública — se identifica
// con el `access_token` del candidato, igual que evaluate-candidate.
//
// Recibe: { access_token }
// Devuelve: { ok:true, cases:[{id,title,prompt}, ...] }
//
// Se generan UNA sola vez por candidato: el resultado se guarda en
// `candidates.generated_cases` y las llamadas siguientes devuelven ese
// mismo cache — evita llamadas repetidas a Groq (costo) y evita que un
// refresh de la página le cambie las preguntas a mitad de la evaluación.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GROQ_API_KEY         = Deno.env.get('GROQ_API_KEY')!;
const GROQ_MODEL           = 'llama-3.3-70b-versatile';
const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const AREA_LABELS: Record<string, string> = {
  didactica:     'Didáctica (estrategias de enseñanza, planificación de clase, materiales)',
  pedagogia:     'Pedagogía (enfoque educativo, evaluación formativa, atención a la diversidad)',
  manejo_grupo:  'Manejo de grupo (disciplina, conflictos entre estudiantes, motivación)',
  tecnologia:    'Tecnología en el aula (herramientas digitales, IA educativa, recursos con o sin conexión)',
};
const ALL_AREAS = Object.keys(AREA_LABELS);
const CASES_TO_GENERATE = 5;

// Fallback si Groq falla o responde algo no parseable — genérico, no
// ligado a robótica ni a un área específica, cubre docencia en general.
const FALLBACK_CASES = [
  { id: 'fallback-1', title: 'Planificación con recursos limitados', prompt: 'Tienes 40 minutos de clase y materiales limitados para todo el grupo. ¿Cómo organizas la actividad para que todos los estudiantes participen activamente, no solo unos pocos?' },
  { id: 'fallback-2', title: 'Manejo de un conflicto en el aula', prompt: 'Dos estudiantes discuten fuerte durante una actividad grupal y la tensión sube frente al resto de la clase. ¿Qué haces, en qué orden, y qué le dices a cada uno?' },
  { id: 'fallback-3', title: 'Estudiante que se frustra y se rinde', prompt: 'Un estudiante intenta resolver un ejercicio, falla varias veces y decide dejar de intentarlo. ¿Cómo lo acompañas para que retome el trabajo sin darle la respuesta directa?' },
  { id: 'fallback-4', title: 'Adaptar la clase a un imprevisto', prompt: 'El material que planeaste usar no está disponible el día de la clase. ¿Cómo adaptas la actividad con lo que sí tienes, sin que el grupo pierda el objetivo de aprendizaje?' },
  { id: 'fallback-5', title: 'Comunicación con la familia', prompt: 'Un padre de familia te dice, molesto, que no entiende para qué sirve lo que enseñas en clase. Tienes pocos minutos para responder. ¿Qué le dices?' },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  try {
    const body = await req.json();
    const access_token = String(body.access_token || '').trim();
    if (!access_token) return json({ error: 'access_token es requerido' }, 400);

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: candidate, error: findErr } = await admin
      .from('candidates')
      .select('id, tenant_id, generated_cases')
      .eq('access_token', access_token)
      .maybeSingle();

    if (findErr) return json({ error: findErr.message }, 500);
    if (!candidate) return json({ error: 'Token inválido' }, 404);

    if (Array.isArray(candidate.generated_cases) && candidate.generated_cases.length > 0) {
      return json({ ok: true, cases: candidate.generated_cases });
    }

    let areas: string[] = ALL_AREAS;
    if (candidate.tenant_id) {
      const { data: tenantRow } = await admin
        .from('tenants')
        .select('evaluation_areas')
        .eq('id', candidate.tenant_id)
        .maybeSingle();
      if (Array.isArray(tenantRow?.evaluation_areas) && tenantRow.evaluation_areas.length > 0) {
        areas = tenantRow.evaluation_areas.filter((a: string) => ALL_AREAS.includes(a));
      }
    }
    if (areas.length === 0) areas = ALL_AREAS;

    const areasText = areas.map((a) => `- ${AREA_LABELS[a]}`).join('\n');

    const systemPrompt = `Eres un especialista en selección de personal docente. Diseñas casos de estudio realistas de aula para evaluar candidatos a un puesto de facilitador/docente. Los casos deben ser generales de la práctica docente (didáctica, pedagogía, manejo de grupo, tecnología educativa) — NUNCA específicos de una materia, kit, marca o tecnología concreta (nada de robots ni marcas comerciales), para que apliquen a cualquier aula. Siempre respondes ÚNICAMENTE con JSON válido, sin texto adicional, sin bloques de código markdown.`;

    const userPrompt = `Genera ${CASES_TO_GENERATE} casos de estudio cortos (una situación de aula realista + una pregunta abierta) para evaluar a un candidato a facilitador docente. Reparte los casos entre estas áreas (puede repetirse un área si hacen falta más casos que áreas):

${areasText}

Cada caso debe tener:
- Una situación concreta y realista de aula (3-5 oraciones)
- Una pregunta abierta que invite a explicar CÓMO actuaría el candidato
- Nada de tecnicismos de una materia específica, ni menciones a marcas, kits o robots — general para cualquier docente

Responde ÚNICAMENTE con este JSON (array de exactamente ${CASES_TO_GENERATE} objetos, sin texto antes ni después):
[
  { "id": "caso-1", "title": "Título corto del caso", "prompt": "Situación + pregunta abierta" }
]`;

    let cases = FALLBACK_CASES.slice(0, CASES_TO_GENERATE);

    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user',   content: userPrompt   },
          ],
          max_tokens: 1200,
          temperature: 0.7,
        }),
      });
      const groqData = await groqRes.json();
      const raw = groqData.choices?.[0]?.message?.content || '';
      const jsonStr = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(jsonStr);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid = parsed
          .filter((c: any) => c && typeof c.title === 'string' && typeof c.prompt === 'string')
          .map((c: any, i: number) => ({ id: String(c.id || `caso-${i + 1}`), title: c.title, prompt: c.prompt }));
        if (valid.length > 0) cases = valid.slice(0, CASES_TO_GENERATE);
      }
    } catch (e) {
      // Groq falló o la respuesta no era JSON válido — se queda el FALLBACK_CASES ya asignado arriba.
    }

    await admin.from('candidates').update({ generated_cases: cases }).eq('id', candidate.id);

    return json({ ok: true, cases });

  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
