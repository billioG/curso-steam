-- ============================================================
-- MIGRACIONES DE AUDITORÍA — Ejecutar en Supabase SQL Editor
-- ============================================================

-- ============================================================
-- FIX 1.1: Correo del admin en trigger (profebillio@gmail.com → billy@1bot.org)
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (
        new.id,
        CASE
            WHEN new.email IN ('billy@1bot.org', 'profebillio@gmail.com') THEN 'admin'
            ELSE 'student'
        END
    )
    ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar roles ya existentes en la tabla user_roles
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email IN ('billy@1bot.org', 'profebillio@gmail.com')
);


-- ============================================================
-- FIX 1.2: Agregar columna user_name a card_comments
-- (El código JS la usa para mostrar el nombre del docente sin
--  hacer una consulta extra a la tabla progress)
-- ============================================================

ALTER TABLE public.card_comments
    ADD COLUMN IF NOT EXISTS user_name text;


-- ============================================================
-- FIX 3.1a: RPC para estadísticas globales de resource_views
-- (evita descargar todas las filas al browser)
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_resource_views_stats()
RETURNS TABLE (total_seconds bigint, avg_seconds numeric, total_rows bigint)
LANGUAGE sql STABLE SECURITY DEFINER AS $$
    SELECT
        COALESCE(SUM(time_spent_seconds), 0)::bigint        AS total_seconds,
        COALESCE(ROUND(AVG(time_spent_seconds), 1), 0)      AS avg_seconds,
        COUNT(*)::bigint                                     AS total_rows
    FROM public.resource_views
    WHERE time_spent_seconds IS NOT NULL
      AND time_spent_seconds > 0;
$$;


-- ============================================================
-- FIX 3.1b: RPC para tiempo por tarjeta (Top más vistas)
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_card_time_aggregates()
RETURNS TABLE (card_id text, views_count bigint, avg_seconds numeric)
LANGUAGE sql STABLE SECURITY DEFINER AS $$
    SELECT
        resource_id::text                           AS card_id,
        COUNT(*)::bigint                            AS views_count,
        ROUND(AVG(time_spent_seconds), 1)           AS avg_seconds
    FROM public.resource_views
    WHERE resource_type = 'card'
      AND time_spent_seconds IS NOT NULL
      AND time_spent_seconds > 0
    GROUP BY resource_id
    ORDER BY views_count DESC, avg_seconds DESC
    LIMIT 50;
$$;

-- Dar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION public.get_resource_views_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_card_time_aggregates() TO authenticated;
