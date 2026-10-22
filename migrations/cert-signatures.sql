-- ============================================================
-- Firmantes de certificados (cert_signatures)
--
-- El panel de admin (Firmas) y la app (al generar diplomas) usan esta tabla,
-- pero no había ninguna migración que la creara. Este archivo la documenta y la
-- crea solo si no existe; si ya existe en el proyecto, no cambia nada (tampoco
-- toca sus políticas si ya tiene alguna).
--
-- slot 1 = coordinador del programa (activo por defecto)
-- slot 2 = director / coordinador del centro
-- slot 3 = delegado del ministerio
-- Las imágenes se suben al bucket de Storage `signatures`.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.cert_signatures (
    slot           int PRIMARY KEY CHECK (slot BETWEEN 1 AND 3),
    signer_name    text NOT NULL DEFAULT '',
    signer_role    text NOT NULL DEFAULT '',
    signature_url  text,
    active         boolean NOT NULL DEFAULT false,
    updated_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cert_signatures ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'cert_signatures') THEN
        -- Cualquiera con sesión las lee (los diplomas las muestran); solo admins escriben.
        CREATE POLICY cert_signatures_read ON public.cert_signatures
            FOR SELECT USING (true);
        CREATE POLICY cert_signatures_admin_write ON public.cert_signatures
            FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
    END IF;
END $$;

-- Los 3 lugares, vacíos, para que el panel tenga dónde guardar.
INSERT INTO public.cert_signatures (slot, active) VALUES (1, true), (2, false), (3, false)
ON CONFLICT (slot) DO NOTHING;
