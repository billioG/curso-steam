// Edge Function: application-followup-check
// Fase 1 del roadmap de impacto (panel de coordinador). Escanea
// progress.daily_missions.pinnedCards (se llenan cuando un docente cierra
// una tarjeta 'takeaway' = compromiso de aplicación) y crea una fila
// pendiente en application_followups cuando ese compromiso cumple 7 o 30
// días — sin duplicar si ya existe (UNIQUE user_id+card_id+days_after).
//
// Envía también un correo de seguimiento vía Resend, reusando el patrón
// de daily-reminders. Programar: 1 vez al día (cualquier hora estable).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const FROM_EMAIL     = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev';
const APP_URL        = Deno.env.get('APP_URL') || 'https://billiog.github.io/curso-steam';
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!;
const PAGE_SIZE      = 1000;

function escHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

const WINDOWS = [7, 30] as const;
// Ventana de +/-1 día: el cron corre una vez al día, así que un compromiso
// de "hace 7 días" puede caer en 6-8 días de antigüedad según a qué hora
// del día se hizo vs. a qué hora corre el cron.
const WINDOW_TOLERANCE_DAYS = 1;

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function buildFollowupEmail(rawName: string, rawCardTitle: string, daysAfter: number, followupId: string, unsubUrl: string): string {
  const name = escHtml(rawName);
  const cardTitle = escHtml(rawCardTitle);
  const question = daysAfter === 7
    ? '¿Ya aplicaste lo que te propusiste hace una semana?'
    : '¿Aplicaste lo que te propusiste hace un mes? ¿Cómo te fue?';
  const link = `${APP_URL}?followup=${followupId}`;
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%">
        <tr><td style="background:linear-gradient(135deg,#0f4c5c,#147a8f);border-radius:20px 20px 0 0;padding:32px;text-align:center">
          <div style="font-size:48px;margin-bottom:8px">🎯</div>
          <h1 style="color:white;margin:0;font-size:20px;font-weight:900">${question}</h1>
        </td></tr>
        <tr><td style="background:white;padding:28px 32px">
          <p style="margin:0 0 8px;font-size:14px;color:#374151">Hola <strong>${name}</strong>, hace ${daysAfter} días te comprometiste a esto:</p>
          <div style="background:#f0fdfa;border-left:4px solid #0f4c5c;border-radius:8px;padding:14px 16px;margin:12px 0">
            <p style="margin:0;font-size:14px;color:#0f4c5c;font-weight:600">${cardTitle}</p>
          </div>
          <p style="margin:0;font-size:13px;color:#6b7280">Contarnos si lo aplicaste toma 10 segundos y nos ayuda a mejorar los cursos para todos los docentes.</p>
        </td></tr>
        <tr><td style="background:white;padding:0 32px 32px;text-align:center">
          <a href="${link}" style="display:inline-block;background:#0f4c5c;color:white;font-size:15px;font-weight:700;padding:14px 40px;border-radius:100px;text-decoration:none">
            Responder ahora
          </a>
        </td></tr>
        <tr><td style="background:#f9fafb;border-radius:0 0 20px 20px;padding:20px 32px;text-align:center">
          <p style="margin:0;font-size:11px;color:#9ca3af">Formación Docente en Pedagogía Innovadora · Guatemala</p>
          <p style="margin:8px 0 0;font-size:11px;color:#9ca3af"><a href="${unsubUrl}" style="color:#9ca3af;text-decoration:underline">Dejar de recibir estos correos</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (_req) => {
  try {
    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // PostgREST corta en 1000 filas por consulta: paginar para no ignorar docentes.
    const users: any[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await sb
        .from('progress')
        .select('user_id, email, daily_missions, unsubscribed_at')
        .not('email', 'is', null)
        .order('user_id')
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;
      users.push(...(data || []));
      if (!data || data.length < PAGE_SIZE) break;
    }

    const now = new Date();
    let created = 0, emailed = 0, failed = 0;

    for (const user of users) {
      const pinned: Array<{ cardId: string; courseId: string; date: string; commitment?: string }> =
        user.daily_missions?.pinnedCards || [];
      // Solo compromisos de tarjetas 'takeaway'; los pins manuales de apuntes no se siguen.
      const takeawayChoices = user.daily_missions?.takeawayChoices || {};
      if (!pinned.length) continue;

      const name = user.daily_missions?.fullName || user.email?.split('@')[0] || 'Docente';

      for (const pin of pinned) {
        if (!pin.date || !pin.cardId || !pin.courseId) continue;
        if (!(String(pin.cardId) in takeawayChoices)) continue;
        const committedAt = new Date(pin.date);
        if (isNaN(committedAt.getTime())) continue;
        const age = daysBetween(committedAt, now);

        for (const daysAfter of WINDOWS) {
          if (Math.abs(age - daysAfter) > WINDOW_TOLERANCE_DAYS) continue;

          // Evita duplicados: UNIQUE(user_id, card_id, days_after) en la tabla.
          const { data: inserted, error: insErr } = await sb
            .from('application_followups')
            .insert({
              user_id: user.user_id,
              card_id: String(pin.cardId),
              course_id: pin.courseId,
              committed_at: committedAt.toISOString(),
              days_after: daysAfter,
            })
            .select('id')
            .maybeSingle();

          // Conflicto de UNIQUE = ya existía esta fila, no es un error real.
          if (insErr) {
            if (!String(insErr.message || '').includes('duplicate')) failed++;
            continue;
          }
          if (!inserted) continue;
          created++;

          // La fila se crea igual (se responde dentro de la app); el correo respeta la baja.
          if (RESEND_API_KEY && user.email && !user.unsubscribed_at) {
            const cardTitle = pin.commitment || `Tu compromiso del curso ${pin.courseId}`;
            const unsubUrl = `${SUPABASE_URL}/functions/v1/unsubscribe-email?user_id=${encodeURIComponent(user.user_id)}&email=${encodeURIComponent(user.email)}`;
            const html = buildFollowupEmail(name, cardTitle, daysAfter, inserted.id, unsubUrl);
            const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: `Formación Docente <${FROM_EMAIL}>`,
                to: [user.email],
                subject: daysAfter === 7 ? '¿Ya lo aplicaste?' : '¿Cómo te fue aplicándolo?',
                html,
                headers: {
                  'List-Unsubscribe': `<${unsubUrl}>`,
                  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                },
              }),
            });
            if (res.ok) emailed++; else failed++;
            await new Promise(r => setTimeout(r, 100));
          }
        }
      }
    }

    return new Response(JSON.stringify({ created, emailed, failed }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
});
