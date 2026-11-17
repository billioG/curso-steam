-- ============================================================
-- FIX: RLS de schools/coordinators bloqueaba al admin (INSERT/UPDATE/DELETE)
-- "new row violates row-level security policy for table schools/coordinators"
-- Causa: la politica "Admin gestiona ..." de supabase_schema.sql nunca se
-- creo en este proyecto (o se creo antes de que is_admin() existiera).
-- Ejecutar en Supabase SQL Editor. Seguro de re-ejecutar.
-- ============================================================

-- schools
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Autenticados leen escuelas" ON public.schools;
DROP POLICY IF EXISTS "Admin gestiona escuelas"     ON public.schools;
-- (la lectura ya no es abierta: ver migrations/rls-escuelas-por-tenant.sql, ejecutarlo después)
CREATE POLICY "Admin gestiona escuelas"
    ON public.schools FOR ALL
    USING (public.is_admin()) WITH CHECK (public.is_admin());

-- coordinators
ALTER TABLE public.coordinators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Autenticados leen coordinadores" ON public.coordinators;
DROP POLICY IF EXISTS "Admin gestiona coordinadores"    ON public.coordinators;
CREATE POLICY "Admin gestiona coordinadores"
    ON public.coordinators FOR ALL
    USING (public.is_admin()) WITH CHECK (public.is_admin());

-- user_schools (misma familia, mismo riesgo -- se corrige de paso)
ALTER TABLE public.user_schools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Usuario ve sus asignaciones" ON public.user_schools;
DROP POLICY IF EXISTS "Admin gestiona asignaciones" ON public.user_schools;
CREATE POLICY "Usuario ve sus asignaciones"
    ON public.user_schools FOR SELECT TO authenticated
    USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admin gestiona asignaciones"
    ON public.user_schools FOR ALL
    USING (public.is_admin()) WITH CHECK (public.is_admin());
