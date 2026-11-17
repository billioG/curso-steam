-- ============================================================
-- RLS por centro educativo: schools / coordinators
-- Antes: cualquier usuario autenticado podía LISTAR todos los centros y todos
-- los coordinadores (nombres y correos). Ahora cada quien ve solo lo suyo.
--
--   schools       → admin · docentes asignados al centro (user_schools) · sus coordinadores
--   coordinators  → admin · la propia fila del coordinador
--
-- La firma del director de un centro (certificados) la lee el docente con la
-- función school_signature_by_name(), que devuelve SOLO esos 4 campos.
--
-- Orden: 1) ejecutar este archivo  2) publicar el app.js nuevo.
-- (El app.js nuevo usa la función y, si aún no existe, cae al método anterior.)
-- Seguro de re-ejecutar.
-- ============================================================

-- Firma del director de UN centro, por nombre (para los certificados del docente)
CREATE OR REPLACE FUNCTION public.school_signature_by_name(p_name text)
RETURNS TABLE (plan text, director_name text, director_role text, director_signature_url text)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT s.plan, s.director_name, s.director_role, s.director_signature_url
    FROM public.schools s
    WHERE s.name = p_name
    LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.school_signature_by_name(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.school_signature_by_name(text) TO authenticated;

-- schools
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Autenticados leen escuelas" ON public.schools;
DROP POLICY IF EXISTS "Lee su escuela"             ON public.schools;
CREATE POLICY "Lee su escuela"
    ON public.schools FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (SELECT 1 FROM public.user_schools us
                   WHERE us.school_id = schools.id AND us.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.coordinators c
                   WHERE c.school_id = schools.id AND c.user_id = auth.uid())
    );

-- coordinators
ALTER TABLE public.coordinators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Autenticados leen coordinadores" ON public.coordinators;
DROP POLICY IF EXISTS "Lee su fila de coordinador"      ON public.coordinators;
CREATE POLICY "Lee su fila de coordinador"
    ON public.coordinators FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR public.is_admin());

-- (las políticas "Admin gestiona …" de INSERT/UPDATE/DELETE no se tocan)

-- COMPROBACIÓN: políticas que quedaron. En schools y coordinators NO debe aparecer
-- ninguna de lectura (SELECT) con condicion = true; si aparece una con otro nombre,
-- esa sigue dejando la tabla abierta y hay que borrarla.
SELECT tablename AS tabla, policyname AS politica, cmd AS accion, qual AS condicion
FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('schools', 'coordinators', 'user_schools')
ORDER BY tablename, policyname;
