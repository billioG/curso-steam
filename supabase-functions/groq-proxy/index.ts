// Edge Function: groq-proxy
// Proxy seguro para llamadas a Groq API — la clave nunca se expone al cliente
// El cliente envía: { messages: [...], model?: string }

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')!;
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  try {
    const { messages, max_tokens = 600, temperature = 0.7 } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'messages requerido' }),
        { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: GROQ_MODEL, messages, max_tokens, temperature }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
});
