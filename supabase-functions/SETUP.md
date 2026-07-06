# Configuración de Emails Automáticos

## Paso 1 — Agregar el API Key de Resend como Secret

> ⚠️ **SEGURIDAD:** Una versión anterior de este archivo contenía la API key de
> Resend en texto plano y quedó en el historial de git. Esa key debe considerarse
> comprometida: **revócala en https://resend.com/api-keys y genera una nueva.**
> Nunca escribas el valor de un secret en este repositorio.

1. Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/settings/functions
2. En "Secrets", agrega:
   - Nombre: `RESEND_API_KEY`
   - Valor: *(la key nueva generada en resend.com — no la escribas aquí)*
   - Nombre: `FROM_EMAIL`
   - Valor: `onboarding@resend.dev`  ← cambiar por tu dominio verificado después
   - Nombre: `APP_URL`
   - Valor: la URL pública de la app (GitHub Pages), ej. `https://billiog.github.io/curso-steam`

## Paso 2 — Crear las 3 Edge Functions

Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/functions

Para cada función:
1. Clic en "New Function"
2. Usa el nombre exacto indicado
3. Pega el código del archivo correspondiente
4. Clic en "Deploy"

| Nombre de la función | Archivo                              |
|----------------------|--------------------------------------|
| `weekly-stats`       | weekly-stats/index.ts                |
| `daily-reminders`    | daily-reminders/index.ts             |
| `new-user-alert`     | new-user-alert/index.ts              |

## Paso 3 — Activar extensiones pg_cron y pg_net

Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/database/extensions
- Activa **pg_cron**
- Activa **pg_net**

## Paso 4 — Programar los emails con pg_cron

Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/sql
Ejecuta este SQL:

```sql
-- Reemplaza TU_PROJECT_REF con: grkjhzkgcmackbafqudu

-- Email semanal: cada lunes a las 8am Guatemala (14:00 UTC)
SELECT cron.schedule(
  'weekly-stats-email',
  '0 14 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://grkjhzkgcmackbafqudu.supabase.co/functions/v1/weekly-stats',
    headers := '{"Authorization": "Bearer ' || current_setting('app.service_role_key') || '", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

-- Recordatorios diarios: cada día a las 9am Guatemala (15:00 UTC)
SELECT cron.schedule(
  'daily-reminders-email',
  '0 15 * * *',
  $$
  SELECT net.http_post(
    url := 'https://grkjhzkgcmackbafqudu.supabase.co/functions/v1/daily-reminders',
    headers := '{"Authorization": "Bearer ' || current_setting('app.service_role_key') || '", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
```

## Paso 5 — Webhook para nuevos usuarios

Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/database/webhooks
1. Clic en "Create a new hook"
2. Configura:
   - Name: `new-user-notification`
   - Table: `progress`
   - Events: ✅ INSERT
   - Type: **Supabase Edge Functions**
   - Function: `new-user-alert`
3. Guardar

## Verificar tu dominio en Resend (para enviar a todos los usuarios)

1. Ve a: https://resend.com/domains
2. Agrega tu dominio propio (no un dominio de terceros)
3. Copia los registros DNS que te da Resend
4. Agrégalos en donde administras tu dominio
5. Una vez verificado, cambia el Secret `FROM_EMAIL` a: `no-reply@tu-dominio.com`

Mientras tanto, los emails de prueba solo llegarán al correo de tu cuenta Resend.

---

# Configuración de Notificaciones Push (Web Push / VAPID)

Gratis, sin servicio de terceros — usa el estándar Web Push nativo del navegador.

## Paso 1 — Ejecutar la migración SQL

Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/sql
Ejecuta el contenido de `migrations/announcements-and-push.sql` (crea la tabla
`push_subscriptions` y siembra la clave `announcement` en `app_config`).

## Paso 2 — Agregar los secrets VAPID

Ve a: https://supabase.com/dashboard/project/grkjhzkgcmackbafqudu/settings/functions

> ⚠️ Las llaves ya fueron generadas para este proyecto. La llave **pública** ya
> está escrita en `app.js` (es segura de exponer). La llave **privada** debe
> guardarse SOLO como secret aquí — nunca en el código.

En "Secrets", agrega:
- Nombre: `VAPID_PUBLIC_KEY`
- Valor: `BBh5oCbg97EdQKAkW4O7ljYHK0l9oEGs3G7UHksP_xcFdOopyrDl3Gz5fQXUhnz2nvKGgjye-l7Hxq8kjH_kyAo`
- Nombre: `VAPID_PRIVATE_KEY`
- Valor: `gmM7oPSg9HY0PpO1R3gGvncA-f6EzN3Q-4w6o1aV_7Y`

Si en algún momento sospechas que la llave privada se filtró (por ejemplo si
quedó en un commit de git), genera un par nuevo con `npx web-push generate-vapid-keys`,
actualiza este secret con la privada nueva, y reemplaza `VAPID_PUBLIC_KEY` en
`app.js` con la pública nueva — los usuarios con suscripciones viejas tendrán
que volver a activar las notificaciones.

`SUPABASE_SERVICE_ROLE_KEY` normalmente ya existe como secret automático en
todo proyecto de Supabase — no necesitas agregarlo a mano.

## Paso 3 — Crear la Edge Function `send-push`

Igual que las funciones de email: "New Function" → nombre exacto `send-push` →
pega el código de `supabase-functions/send-push/index.ts` → Deploy.

## Paso 4 — Probar

1. En la app, como docente, entra a Perfil → Notificaciones → "Activar notificaciones"
   y acepta el permiso del navegador.
2. En el panel admin → Configuración → "Notificaciones push", escribe un título
   y mensaje de prueba → "Enviar a todos".
3. Deberías recibir la notificación en el dispositivo donde activaste el paso 1,
   incluso con la pestaña de la app cerrada (con el navegador abierto en segundo plano).

**Nota sobre iOS:** en iPhone, las notificaciones push solo funcionan si el
docente agregó la app a su pantalla de inicio ("Agregar a inicio" desde Safari)
Y tiene iOS 16.4 o superior. Es una limitación de Apple, no de esta app — en
Android y escritorio funciona sin ese requisito.

## Paso 5 — Recordatorio automático diario (3pm Guatemala)

Push automático a quienes tienen notificaciones activas y todavía no han
entrado a la plataforma ese día. Usa el mismo mecanismo que `weekly-stats`
y `daily-reminders` (pg_cron + service role key), sin botón manual.

1. Crea la Edge Function `daily-push-reminder` con el código de
   `supabase-functions/daily-push-reminder/index.ts` → Deploy.
2. En el SQL Editor, programa el cron (requiere pg_cron y pg_net activos,
   ver Paso 3 de la sección de emails más arriba):

```sql
SELECT cron.schedule(
  'daily-push-reminder',
  '0 21 * * *',  -- 21:00 UTC = 15:00 (3pm) Guatemala, sin horario de verano
  $$
  SELECT net.http_post(
    url := 'https://grkjhzkgcmackbafqudu.supabase.co/functions/v1/daily-push-reminder',
    headers := '{"Authorization": "Bearer ' || current_setting('app.service_role_key') || '", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
```

3. Para probarlo sin esperar al cron, invócalo una vez a mano desde el SQL
   Editor con el mismo `net.http_post` de arriba, o desde una pestaña de
   terminal con `curl` usando la service role key.

Solo les llega a docentes que ya activaron notificaciones (Perfil →
Notificaciones) y que no tienen actividad registrada hoy — no es spam
diario para quienes ya entraron.
