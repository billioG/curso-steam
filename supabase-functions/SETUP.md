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

## Verificar dominio 1bot.org en Resend (para enviar a todos los usuarios)

1. Ve a: https://resend.com/domains
2. Agrega `1bot.org`
3. Copia los registros DNS que te da Resend
4. Agrégalos en donde administras tu dominio
5. Una vez verificado, cambia el Secret `FROM_EMAIL` a: `no-reply@1bot.org`

Mientras tanto, los emails de prueba solo llegarán al correo de tu cuenta Resend.
