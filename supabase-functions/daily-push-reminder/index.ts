// Edge Function: daily-push-reminder
// Push a los docentes que tienen notificaciones activas y NO han entrado
// hoy a la plataforma. Pensada para dispararse una vez al día a las 3pm
// hora Guatemala (21:00 UTC, sin horario de verano) vía pg_cron.
//
// No valida un JWT de admin — se invoca con la service role key desde
// pg_cron, igual que weekly-stats y daily-reminders (el gateway de
// Supabase ya exige un JWT válido; la service role key lo es).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY  = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;

webpush.setVapidDetails('mailto:billy@1bot.org', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Guatemala no usa horario de verano — offset fijo UTC-6, pero se calcula
// con Intl por si el runtime cambia, en vez de restar 6 horas a mano.
function todayGuatemala(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Guatemala' });
}

// Último compromiso de aplicación (tarjeta «Próximos pasos») de los últimos 21
// días sin evidencia posterior de «Lo apliqué» en ese curso (igual que en
// daily-reminders): el aviso habla de algo que el docente ya eligió.
function openCommitment(pins: any, evidence: any): string | null {
  const list = (Array.isArray(pins) ? pins : []).filter((x: any) => x?.commitment && x?.date);
  if (!list.length) return null;
  list.sort((a: any, b: any) => String(b.date).localeCompare(String(a.date)));
  const pin = list[0];
  const day = String(pin.date).slice(0, 10);
  if ((Date.now() - new Date(day).getTime()) / 86400000 > 21) return null;
  const evidenced = Object.values(evidence || {}).some((e: any) => e?.courseId === pin.courseId && String(e?.date || '') >= day);
  return evidenced ? null : String(pin.commitment).slice(0, 90);
}

Deno.serve(async (_req) => {
  try {
    const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const today = todayGuatemala();

    // PostgREST corta en 1000 filas por consulta — paginar para no ignorar
    // suscripciones en silencio si la base crece más allá de eso.
    const PAGE_SIZE = 1000;
    const subs: any[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error: subsErr } = await sb
        .from('push_subscriptions')
        .select('id, user_id, endpoint, p256dh, auth')
        .order('id')
        .range(from, from + PAGE_SIZE - 1);
      if (subsErr) throw subsErr;
      subs.push(...(data || []));
      if (!data || data.length < PAGE_SIZE) break;
    }
    if (subs.length === 0) {
      return json({ sent: 0, total: 0, skipped: 0, expired: 0, reason: 'sin suscripciones activas' });
    }

    // .in() también corta en 1000 filas de respuesta, y una lista de miles de
    // ids en la URL puede pasar el límite del gateway — se consulta en lotes.
    const userIds = [...new Set(subs.map((s) => s.user_id))];
    const progressRows: any[] = [];
    for (let i = 0; i < userIds.length; i += PAGE_SIZE) {
      const batch = userIds.slice(i, i + PAGE_SIZE);
      const { data, error: progErr } = await sb
        .from('progress')
        .select('user_id, last_activity_date, pins:daily_missions->pinnedCards, evidence:daily_missions->appliedEvidence')
        .in('user_id', batch);
      if (progErr) throw progErr;
      progressRows.push(...(data || []));
    }

    const lastActivityByUser = new Map(progressRows.map((p) => [p.user_id, p.last_activity_date]));
    const commitmentByUser = new Map(progressRows.map((p) => [p.user_id, openCommitment(p.pins, p.evidence)]));
    const inactiveToday = subs.filter((s) => lastActivityByUser.get(s.user_id) !== today);

    const payloadFor = (userId: string) => {
      const c = commitmentByUser.get(userId);
      return JSON.stringify(c
        ? { title: 'Tu compromiso para la clase', body: `Te propusiste: «${c}». ¿Pudiste probarlo? Cuéntalo en dos minutos.`, url: './index.html' }
        : { title: 'Tu sesión de 10 minutos', body: 'Tu sesión de hoy está lista: unas pocas tarjetas, sin prisa.', url: './index.html' });
    };

    let sent = 0;
    const expiredIds: string[] = [];
    await Promise.allSettled(
      inactiveToday.map(async (s) => {
        try {
          await webpush.sendNotification(
            { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
            payloadFor(s.user_id)
          );
          sent++;
        } catch (e: any) {
          const status = e?.statusCode || e?.status;
          if (status === 404 || status === 410) expiredIds.push(s.id);
        }
      })
    );

    if (expiredIds.length > 0) {
      await sb.from('push_subscriptions').delete().in('id', expiredIds);
    }

    return json({
      sent,
      total: inactiveToday.length,
      skipped: subs.length - inactiveToday.length,
      expired: expiredIds.length,
    });
  } catch (e: any) {
    const detail = e?.message || (() => { try { return JSON.stringify(e); } catch { return String(e); } })();
    return json({ error: detail }, 500);
  }
});
