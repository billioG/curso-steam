-- ============================================================
-- ranking_view — documentación de una vista que ya existía en Supabase
-- sin estar versionada en el repo. Ejecutar en Supabase SQL Editor.
-- Seguro re-ejecutar (CREATE OR REPLACE).
-- ============================================================
--
-- Supabase Advisor marca esta vista como "SECURITY DEFINER property"
-- (no tiene `security_invoker = true`). A DIFERENCIA de
-- application_followup_rates (ver migrations/application-followups.sql),
-- acá eso es INTENCIONAL — no es un hallazgo a corregir:
--
-- ranking_view alimenta el ranking público que ve cualquier docente
-- logueado (app.js: showRanking(), ~línea 2950) con el XP/nivel de TODOS
-- los demás usuarios. La tabla `progress` tiene RLS por propietario
-- (progress_own: auth.uid() = user_id) — si esta vista tuviera
-- security_invoker=true, cada docente solo vería su propia fila a través
-- de ella (o ninguna), y el ranking dejaría de funcionar para todo el
-- mundo. La vista corre deliberadamente con el permiso de quien la creó
-- para poder agregar las filas de todos los usuarios.
--
-- Por qué es seguro pese a saltarse el RLS de `progress`: la vista NO
-- expone email, examScores, completed_cards ni nada sensible — solo
-- user_id, nombre (o el prefijo del email como fallback si no hay
-- fullName), foto de perfil, xp, level y streak, que son exactamente los
-- datos de gamificación pensados para ser públicos entre docentes.
--
-- Si en el futuro se le agregan columnas a esta vista, revisar que sigan
-- siendo datos aptos para mostrarse a cualquier usuario autenticado antes
-- de agregarlas — esa es la verificación real que reemplaza a la
-- advertencia del linter en este caso, no activar security_invoker.

CREATE OR REPLACE VIEW public.ranking_view AS
SELECT
    user_id,
    COALESCE(daily_missions ->> 'fullName', split_part(email, '@', 1)) AS nombre_usuario,
    daily_missions ->> 'fullName' AS full_name,
    daily_missions ->> 'profilePhoto' AS profile_photo,
    xp,
    level,
    streak
FROM public.progress p;
