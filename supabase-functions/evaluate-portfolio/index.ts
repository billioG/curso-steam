// Edge Function: evaluate-portfolio
// Evalúa el portafolio de práctica docente usando Groq (Llama 3.3)
// Recibe: { entregables: { steam, abp, dt, eval, tipos }, examScore50: number }
// Devuelve: { scores: number[], feedback: string[], total: number, summary: string, combined: number }

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')!;
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const LABELS = ['STEAM', 'ABP', 'Design Thinking', 'Evaluación Formativa', 'Conoce a tus Estudiantes'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

  try {
    const { entregables, examScore50 } = await req.json();

    if (!entregables) {
      return new Response(JSON.stringify({ error: 'entregables requeridos' }),
        { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    const items = [
      entregables.steam || '',
      entregables.abp   || '',
      entregables.dt    || '',
      entregables.eval  || '',
      entregables.tipos || '',
    ];

    const entregablesText = items.map((text, i) =>
      `${i + 1}. ${LABELS[i]}:\n"${text.substring(0, 800)}"`
    ).join('\n\n');

    const systemPrompt = `Eres un evaluador pedagógico experto en formación docente en Guatemala. Evalúas portafolios de práctica de docentes que completaron un programa de formación en pedagogía innovadora. Siempre respondes ÚNICAMENTE con JSON válido, sin texto adicional, sin bloques de código markdown.`;

    const userPrompt = `Evalúa el portafolio de práctica de este/a docente usando la siguiente rúbrica (10 puntos por entregable = 50 puntos total):

RÚBRICA:
- Pertinencia (0-3 pts): ¿La evidencia corresponde claramente al enfoque del curso?
- Profundidad (0-4 pts): ¿Demuestra comprensión genuina de los conceptos centrales?
- Aplicación real (0-3 pts): ¿Hay evidencia de implementación con estudiantes reales o planificación concreta y detallada?

CRITERIOS ADICIONALES:
- Si el texto tiene menos de 80 palabras, máximo 5 puntos (evidencia insuficiente).
- Si el texto no tiene relación con el curso indicado, 0-2 puntos.
- Sé justo pero riguroso. El objetivo es certificar docentes que realmente aprendieron.

ENTREGABLES:

${entregablesText}

Responde ÚNICAMENTE con este JSON (sin texto antes ni después):
{
  "scores": [8, 7, 9, 6, 8],
  "feedback": [
    "Retroalimentación específica para STEAM (2-3 oraciones).",
    "Retroalimentación específica para ABP (2-3 oraciones).",
    "Retroalimentación específica para Design Thinking (2-3 oraciones).",
    "Retroalimentación específica para Evaluación Formativa (2-3 oraciones).",
    "Retroalimentación específica para Conoce a tus Estudiantes (2-3 oraciones)."
  ],
  "total": 38,
  "summary": "Retroalimentación global de 2-3 oraciones sobre el portafolio completo y el potencial del docente."
}`;

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
        max_tokens: 900,
        temperature: 0.3,
      }),
    });

    const groqData = await groqRes.json();
    const raw = groqData.choices?.[0]?.message?.content || '';

    // Parse JSON — strip markdown fences if present
    const jsonStr = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    let evaluation;
    try {
      evaluation = JSON.parse(jsonStr);
    } catch {
      return new Response(JSON.stringify({ error: 'Error al parsear respuesta de IA', raw }),
        { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    // Validate and clamp scores
    const scores = (evaluation.scores || [0,0,0,0,0]).map((s: number) => Math.min(10, Math.max(0, Math.round(s))));
    const total  = scores.reduce((a: number, b: number) => a + b, 0);
    const combined = Math.min(100, (examScore50 || 0) + total);

    return new Response(JSON.stringify({
      scores,
      feedback: evaluation.feedback || [],
      total,
      summary:  evaluation.summary || '',
      combined,
      passed:   combined >= 75,
    }), {
      status: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
});
