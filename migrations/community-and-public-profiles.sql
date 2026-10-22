-- ============================================================
-- Comunidad de colegas + perfil público opcional
--
-- 1) shared_applications: relatos de "Lo apliqué en clase" que el docente
--    decide compartir de forma anónima. Los lectores solo ven la vista
--    shared_applications_public (sin user_id).
-- 2) shared_application_reports: reportes; con 2 reportes distintos el relato
--    se oculta solo.
-- 3) public_profiles: perfil público que el docente activa a propósito.
--    Se lee solo por la vista public_profiles_public, que además agrega los
--    diplomas pagados (verificados) desde certificate_payments.
--
-- Depende de: public.is_admin() (announcements-and-push.sql) y de
-- certificate_payments (certificate-payments.sql). Seguro de re-ejecutar.
-- ============================================================

-- ── 1. Relatos compartidos ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.shared_applications (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id   text NOT NULL,
    card_id     text NOT NULL,
    text        text NOT NULL CHECK (char_length(text) BETWEEN 40 AND 1000),
    grade       text CHECK (grade IS NULL OR char_length(grade) <= 20),
    hidden      boolean NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, course_id, card_id)
);
CREATE INDEX IF NOT EXISTS shared_applications_course_idx
    ON public.shared_applications (course_id, created_at DESC);

ALTER TABLE public.shared_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS shared_applications_select_own ON public.shared_applications;
CREATE POLICY shared_applications_select_own ON public.shared_applications
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS shared_applications_insert_own ON public.shared_applications;
CREATE POLICY shared_applications_insert_own ON public.shared_applications
    FOR INSERT WITH CHECK (auth.uid() = user_id AND hidden = false);

-- El autor puede cambiar el texto pero no des-ocultar un relato ocultado.
DROP POLICY IF EXISTS shared_applications_update_own ON public.shared_applications;
CREATE POLICY shared_applications_update_own ON public.shared_applications
    FOR UPDATE USING (auth.uid() = user_id AND hidden = false)
    WITH CHECK (auth.uid() = user_id AND hidden = false);

DROP POLICY IF EXISTS shared_applications_delete_own ON public.shared_applications;
CREATE POLICY shared_applications_delete_own ON public.shared_applications
    FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Los admins pueden ocultar/mostrar (moderación).
DROP POLICY IF EXISTS shared_applications_update_admin ON public.shared_applications;
CREATE POLICY shared_applications_update_admin ON public.shared_applications
    FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Vista pública para docentes con sesión: sin user_id y sin relatos ocultos.
-- (Las vistas corren con los permisos de su dueño, por eso leen la tabla
-- aunque RLS solo deje al autor ver la suya.)
DROP VIEW IF EXISTS public.shared_applications_public;
CREATE VIEW public.shared_applications_public WITH (security_invoker = false) AS
    SELECT id, course_id, card_id, text, grade, created_at
    FROM public.shared_applications
    WHERE hidden = false;
REVOKE ALL ON public.shared_applications_public FROM anon;
GRANT SELECT ON public.shared_applications_public TO authenticated;

-- ── 2. Reportes ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.shared_application_reports (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id  uuid NOT NULL REFERENCES public.shared_applications(id) ON DELETE CASCADE,
    reporter_id     uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (application_id, reporter_id)
);
ALTER TABLE public.shared_application_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS shared_application_reports_insert ON public.shared_application_reports;
CREATE POLICY shared_application_reports_insert ON public.shared_application_reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

DROP POLICY IF EXISTS shared_application_reports_admin_read ON public.shared_application_reports;
CREATE POLICY shared_application_reports_admin_read ON public.shared_application_reports
    FOR SELECT USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.hide_reported_application() RETURNS trigger AS $$
BEGIN
    IF (SELECT count(*) FROM public.shared_application_reports WHERE application_id = NEW.application_id) >= 2 THEN
        UPDATE public.shared_applications SET hidden = true WHERE id = NEW.application_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_hide_reported_application ON public.shared_application_reports;
CREATE TRIGGER trg_hide_reported_application
    AFTER INSERT ON public.shared_application_reports
    FOR EACH ROW EXECUTE FUNCTION public.hide_reported_application();

-- ── 3. Perfil público opcional ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.public_profiles (
    user_id       uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    slug          text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]{8,16}$'),
    display_name  text NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 80),
    grade         text CHECK (grade IS NULL OR char_length(grade) <= 20),
    stats         jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (pg_column_size(stats) < 8000),
    enabled       boolean NOT NULL DEFAULT true,
    updated_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.public_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS public_profiles_own ON public.public_profiles;
CREATE POLICY public_profiles_own ON public.public_profiles
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Vista de lectura pública (anon incluido). Los diplomas "verificados" salen de
-- los pagos confirmados por el servidor, no de lo que declara el docente.
DROP VIEW IF EXISTS public.public_profiles_public;
CREATE VIEW public.public_profiles_public WITH (security_invoker = false) AS
    SELECT
        pp.slug,
        pp.display_name,
        pp.grade,
        pp.stats,
        pp.updated_at,
        COALESCE((
            SELECT jsonb_agg(DISTINCT cp.ref_id)
            FROM public.certificate_payments cp
            WHERE cp.user_id = pp.user_id AND cp.cert_type = 'diploma' AND cp.status = 'paid'
        ), '[]'::jsonb) AS verified_diplomas,
        COALESCE((
            SELECT jsonb_agg(DISTINCT cp.ref_id)
            FROM public.certificate_payments cp
            WHERE cp.user_id = pp.user_id AND cp.cert_type = 'master' AND cp.status = 'paid'
        ), '[]'::jsonb) AS verified_masters
    FROM public.public_profiles pp
    WHERE pp.enabled = true;
GRANT SELECT ON public.public_profiles_public TO anon, authenticated;
