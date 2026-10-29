-- ============================================================
-- Patrocinios: una ONG, fundación o empresa paga los diplomas y los
-- certificados maestros de un grupo de docentes, y ellos los obtienen
-- sin pagar.
--
-- Ejecutar en Supabase SQL Editor. Seguro re-ejecutar.
--
-- Cómo se identifica a un docente cubierto (cualquiera de las tres):
--   · por centro educativo  → sponsor_schools   (todos sus docentes asignados)
--   · por correo            → sponsor_emails
--   · por código de canje   → sponsor_codes → sponsor_members (el docente lo
--                             escribe en su Perfil; el código se gasta)
--
-- Quién lo gestiona: SOLO el super admin (tenant_id NULL, sin school_id).
-- Los docentes nunca escriben en estas tablas: usan funciones
-- (my_sponsors, redeem_sponsor_code) o la Edge Function
-- create-certificate-checkout, que corre con service-role.
--
-- Antifraude (ver supabase-functions/create-certificate-checkout):
--   · el cupo se descuenta en claim_sponsored_cert, de forma atómica;
--   · ai_reviews guarda las revisiones de IA que hace el SERVIDOR
--     (relato de aplicación en el aula y portafolio), para no depender de
--     lo que el navegador diga que fue aprobado;
--   · sponsor_claim_log guarda, solo para el admin, con qué datos se
--     emitió cada certificado patrocinado y qué señales de alerta tuvo.
-- ============================================================

-- ── Ayudante: super admin ────────────────────────────────────
-- is_admin() también es verdadero para admins de un solo colegio; los
-- patrocinios (códigos, cupos, nombres de docentes) son de plataforma.
-- to_jsonb(r) evita fallar si user_roles no tuviera la columna school_id.
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles r
        WHERE r.user_id = auth.uid()
          AND r.role = 'admin'
          AND r.tenant_id IS NULL
          AND (to_jsonb(r) ->> 'school_id') IS NULL
    );
$$;

-- ── Patrocinadores ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.sponsors (
    id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name                 text NOT NULL,
    logo_url             text,                          -- bucket público sponsor-logos
    show_on_certificate  boolean NOT NULL DEFAULT true, -- «Con el apoyo de…» + logo
    report_with_names    boolean NOT NULL DEFAULT false,-- reportes con nombres de docentes
    diploma_seats        int NOT NULL DEFAULT 0 CHECK (diploma_seats >= 0),
    diploma_used         int NOT NULL DEFAULT 0 CHECK (diploma_used  >= 0),
    master_seats         int NOT NULL DEFAULT 0 CHECK (master_seats  >= 0),
    master_used          int NOT NULL DEFAULT 0 CHECK (master_used   >= 0),
    valid_from           date,
    valid_until          date,
    courses              text[],                        -- NULL = diplomas de cualquier curso
    active               boolean NOT NULL DEFAULT true,
    notes                text,
    created_at           timestamptz NOT NULL DEFAULT now()
);

-- Centros cubiertos
CREATE TABLE IF NOT EXISTS public.sponsor_schools (
    sponsor_id uuid NOT NULL REFERENCES public.sponsors(id) ON DELETE CASCADE,
    school_id  uuid NOT NULL REFERENCES public.schools(id)  ON DELETE CASCADE,
    PRIMARY KEY (sponsor_id, school_id)
);

-- Correos cubiertos (siempre en minúsculas)
CREATE TABLE IF NOT EXISTS public.sponsor_emails (
    sponsor_id uuid NOT NULL REFERENCES public.sponsors(id) ON DELETE CASCADE,
    email      text NOT NULL CHECK (email = lower(btrim(email))),
    PRIMARY KEY (sponsor_id, email)
);

-- Códigos de canje: 10 caracteres sin letras ambiguas, guardados sin guion.
CREATE TABLE IF NOT EXISTS public.sponsor_codes (
    code        text PRIMARY KEY CHECK (code ~ '^[A-Z0-9]{8,16}$'),
    sponsor_id  uuid NOT NULL REFERENCES public.sponsors(id) ON DELETE CASCADE,
    label       text,                                   -- p. ej. «Grupo Quetzaltenango»
    max_uses    int NOT NULL DEFAULT 1 CHECK (max_uses >= 1),
    uses        int NOT NULL DEFAULT 0 CHECK (uses >= 0),
    expires_at  timestamptz,
    active      boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_sponsor_codes_sponsor ON public.sponsor_codes(sponsor_id);

-- Docentes que canjearon un código
CREATE TABLE IF NOT EXISTS public.sponsor_members (
    sponsor_id uuid NOT NULL REFERENCES public.sponsors(id) ON DELETE CASCADE,
    user_id    uuid NOT NULL REFERENCES auth.users(id)      ON DELETE CASCADE,
    code       text,
    joined_at  timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (sponsor_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_sponsor_members_user ON public.sponsor_members(user_id);

-- Intentos de canje (para frenar adivinanzas de códigos)
CREATE TABLE IF NOT EXISTS public.sponsor_code_attempts (
    id      bigserial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ok      boolean NOT NULL,
    at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_sponsor_attempts_user ON public.sponsor_code_attempts(user_id, at DESC);

-- ── Revisiones de IA hechas por el servidor ──────────────────
-- Las escriben evaluate-evidence (kind='diploma', ref_id = curso) y
-- evaluate-portfolio (kind='portfolio', ref_id = ruta) con service-role.
-- score: relato 0-10; portafolio 0-50.
CREATE TABLE IF NOT EXISTS public.ai_reviews (
    id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    kind       text NOT NULL CHECK (kind IN ('diploma', 'portfolio')),
    ref_id     text NOT NULL,
    approved   boolean NOT NULL,
    score      numeric NOT NULL,
    chars      int,
    created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_reviews_lookup ON public.ai_reviews(user_id, kind, ref_id, created_at DESC);

-- ── Pagos: de dónde vino el diploma ──────────────────────────
ALTER TABLE public.certificate_payments
    ADD COLUMN IF NOT EXISTS sponsor_id     uuid REFERENCES public.sponsors(id),
    ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'recurrente';

ALTER TABLE public.certificate_payments DROP CONSTRAINT IF EXISTS certificate_payments_method_check;
ALTER TABLE public.certificate_payments
    ADD CONSTRAINT certificate_payments_method_check CHECK (payment_method IN ('recurrente', 'sponsor'));

CREATE INDEX IF NOT EXISTS idx_cert_payments_sponsor ON public.certificate_payments(sponsor_id) WHERE sponsor_id IS NOT NULL;

-- Bitácora solo para el admin: con qué datos se emitió cada certificado
-- patrocinado y qué señales de alerta tuvo (no la ve el docente).
CREATE TABLE IF NOT EXISTS public.sponsor_claim_log (
    payment_id  uuid PRIMARY KEY REFERENCES public.certificate_payments(id) ON DELETE CASCADE,
    sponsor_id  uuid NOT NULL REFERENCES public.sponsors(id),
    user_id     uuid NOT NULL REFERENCES auth.users(id),
    meta        jsonb NOT NULL DEFAULT '{}'::jsonb,
    flags       text[] NOT NULL DEFAULT '{}',
    created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_claim_log_sponsor ON public.sponsor_claim_log(sponsor_id, created_at DESC);

-- ── RLS: solo el super admin gestiona; nadie más escribe ─────
DO $$
DECLARE t text;
BEGIN
    FOREACH t IN ARRAY ARRAY['sponsors', 'sponsor_schools', 'sponsor_emails', 'sponsor_codes',
                             'sponsor_members', 'sponsor_code_attempts', 'ai_reviews', 'sponsor_claim_log']
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_super_admin', t);
        EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL USING (public.is_super_admin()) WITH CHECK (public.is_super_admin())',
                       t || '_super_admin', t);
    END LOOP;
END $$;

-- El super admin lee todos los pagos (reportes de patrocinio). El docente
-- sigue viendo solo los suyos (certificate_payments_read_own).
DROP POLICY IF EXISTS certificate_payments_super_admin_read ON public.certificate_payments;
CREATE POLICY certificate_payments_super_admin_read ON public.certificate_payments
    FOR SELECT USING (public.is_super_admin());

-- ── ¿Qué patrocinadores cubren a este docente? ───────────────
-- Solo service-role y las funciones de abajo (SECURITY DEFINER).
CREATE OR REPLACE FUNCTION public.sponsor_candidates(p_user uuid)
RETURNS TABLE (
    sponsor_id          uuid,
    name                text,
    logo_url            text,
    show_on_certificate boolean,
    diploma_left        int,
    master_left         int,
    valid_until         date,
    courses             text[],
    via                 text
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, auth
AS $$
    WITH me AS (
        SELECT lower(btrim(email)) AS email FROM auth.users WHERE id = p_user
    ),
    cov AS (
        SELECT sm.sponsor_id, 'código'::text AS via
          FROM public.sponsor_members sm WHERE sm.user_id = p_user
        UNION ALL
        SELECT se.sponsor_id, 'correo'
          FROM public.sponsor_emails se, me WHERE se.email = me.email
        UNION ALL
        SELECT ss.sponsor_id, 'centro'
          FROM public.sponsor_schools ss
          JOIN public.user_schools us ON us.school_id = ss.school_id
         WHERE us.user_id = p_user
    )
    SELECT s.id, s.name, s.logo_url, s.show_on_certificate,
           GREATEST(s.diploma_seats - s.diploma_used, 0),
           GREATEST(s.master_seats  - s.master_used,  0),
           s.valid_until, s.courses,
           (array_agg(cov.via ORDER BY cov.via))[1]
      FROM cov
      JOIN public.sponsors s ON s.id = cov.sponsor_id
     WHERE s.active
       AND (s.valid_from  IS NULL OR s.valid_from  <= current_date)
       AND (s.valid_until IS NULL OR s.valid_until >= current_date)
     GROUP BY s.id;
$$;
REVOKE ALL ON FUNCTION public.sponsor_candidates(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sponsor_candidates(uuid) TO service_role;

-- Lo que ve el docente: ¿me cubre alguien y cuánto queda?
CREATE OR REPLACE FUNCTION public.my_sponsors()
RETURNS TABLE (
    sponsor_id          uuid,
    name                text,
    logo_url            text,
    show_on_certificate boolean,
    diploma_left        int,
    master_left         int,
    valid_until         date,
    courses             text[]
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT c.sponsor_id, c.name, c.logo_url, c.show_on_certificate,
           c.diploma_left, c.master_left, c.valid_until, c.courses
      FROM public.sponsor_candidates(auth.uid()) c
     WHERE auth.uid() IS NOT NULL;
$$;
REVOKE ALL ON FUNCTION public.my_sponsors() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_sponsors() TO authenticated;

-- Para rotular el diploma: qué certificados del docente fueron patrocinados
CREATE OR REPLACE FUNCTION public.my_sponsored_certs()
RETURNS TABLE (
    cert_type           text,
    ref_id              text,
    sponsor_name        text,
    logo_url            text,
    show_on_certificate boolean
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT DISTINCT ON (cp.cert_type, cp.ref_id)
           cp.cert_type, cp.ref_id, s.name, s.logo_url, s.show_on_certificate
      FROM public.certificate_payments cp
      JOIN public.sponsors s ON s.id = cp.sponsor_id
     WHERE cp.user_id = auth.uid()
       AND cp.status = 'paid'
       AND cp.payment_method = 'sponsor'
     ORDER BY cp.cert_type, cp.ref_id, cp.paid_at DESC NULLS LAST;
$$;
REVOKE ALL ON FUNCTION public.my_sponsored_certs() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_sponsored_certs() TO authenticated;

-- ── Canjear un código ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.redeem_sponsor_code(p_code text)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_uid   uuid := auth.uid();
    v_code  text := upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
    c       public.sponsor_codes%ROWTYPE;
    s       public.sponsors%ROWTYPE;
BEGIN
    IF v_uid IS NULL THEN
        RETURN jsonb_build_object('ok', false, 'error', 'auth');
    END IF;

    -- Frenar la adivinanza de códigos: 10 intentos fallidos por hora
    IF (SELECT count(*) FROM public.sponsor_code_attempts
         WHERE user_id = v_uid AND NOT ok AND at > now() - interval '1 hour') >= 10 THEN
        RETURN jsonb_build_object('ok', false, 'error', 'too_many');
    END IF;

    SELECT * INTO c FROM public.sponsor_codes WHERE code = v_code FOR UPDATE;
    IF NOT FOUND OR NOT c.active THEN
        INSERT INTO public.sponsor_code_attempts(user_id, ok) VALUES (v_uid, false);
        RETURN jsonb_build_object('ok', false, 'error', 'invalid');
    END IF;

    SELECT * INTO s FROM public.sponsors WHERE id = c.sponsor_id;
    IF NOT s.active
       OR (s.valid_from  IS NOT NULL AND s.valid_from  > current_date)
       OR (s.valid_until IS NOT NULL AND s.valid_until < current_date)
       OR (c.expires_at  IS NOT NULL AND c.expires_at < now()) THEN
        INSERT INTO public.sponsor_code_attempts(user_id, ok) VALUES (v_uid, false);
        RETURN jsonb_build_object('ok', false, 'error', 'expired');
    END IF;

    -- Ya es miembro: no gasta el código otra vez
    IF EXISTS (SELECT 1 FROM public.sponsor_members WHERE sponsor_id = s.id AND user_id = v_uid) THEN
        RETURN jsonb_build_object('ok', true, 'already', true,
                                  'sponsor', jsonb_build_object('name', s.name, 'logo_url', s.logo_url));
    END IF;

    IF c.uses >= c.max_uses THEN
        INSERT INTO public.sponsor_code_attempts(user_id, ok) VALUES (v_uid, false);
        RETURN jsonb_build_object('ok', false, 'error', 'used');
    END IF;

    UPDATE public.sponsor_codes SET uses = uses + 1 WHERE code = c.code;
    INSERT INTO public.sponsor_members(sponsor_id, user_id, code) VALUES (s.id, v_uid, c.code);
    INSERT INTO public.sponsor_code_attempts(user_id, ok) VALUES (v_uid, true);

    RETURN jsonb_build_object('ok', true,
                              'sponsor', jsonb_build_object('name', s.name, 'logo_url', s.logo_url));
END;
$$;
REVOKE ALL ON FUNCTION public.redeem_sponsor_code(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.redeem_sponsor_code(text) TO authenticated;

-- ── Usar un cupo (solo service-role, tras validar en la Edge Function) ──
-- Atómica: bloquea la fila del patrocinador, vuelve a comprobar el cupo,
-- registra el pago como 'paid' con monto 0 y deja la bitácora. Es
-- idempotente: si el certificado ya estaba pagado, no gasta otro cupo.
CREATE OR REPLACE FUNCTION public.claim_sponsored_cert(
    p_user      uuid,
    p_cert_type text,
    p_ref_id    text,
    p_course_id text,
    p_meta      jsonb,
    p_flags     text[]
)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_existing  public.certificate_payments%ROWTYPE;
    v_sid       uuid;
    s           public.sponsors%ROWTYPE;
    v_payment   uuid;
BEGIN
    IF p_cert_type NOT IN ('diploma', 'master') THEN
        RETURN jsonb_build_object('ok', false, 'error', 'cert_type');
    END IF;

    SELECT * INTO v_existing FROM public.certificate_payments
     WHERE user_id = p_user AND cert_type = p_cert_type AND ref_id = p_ref_id AND status = 'paid'
     LIMIT 1;
    IF FOUND THEN
        RETURN jsonb_build_object('ok', true, 'already', true, 'sponsor_id', v_existing.sponsor_id);
    END IF;

    -- Tope diario: frena un uso masivo de cupos desde una sola cuenta
    IF (SELECT count(*) FROM public.certificate_payments
         WHERE user_id = p_user AND payment_method = 'sponsor'
           AND paid_at > now() - interval '24 hours') >= 5 THEN
        RETURN jsonb_build_object('ok', false, 'error', 'rate_limited');
    END IF;

    -- El patrocinador que vence primero y todavía tiene cupo de este tipo
    SELECT c.sponsor_id INTO v_sid
      FROM public.sponsor_candidates(p_user) c
     WHERE ( p_cert_type = 'diploma' AND c.diploma_left > 0
             AND (c.courses IS NULL OR p_ref_id = ANY (c.courses)) )
        OR ( p_cert_type = 'master'  AND c.master_left  > 0 )
     ORDER BY c.valid_until NULLS LAST, c.sponsor_id
     LIMIT 1;
    IF v_sid IS NULL THEN
        RETURN jsonb_build_object('ok', false, 'error', 'no_seats');
    END IF;

    SELECT * INTO s FROM public.sponsors WHERE id = v_sid FOR UPDATE;
    IF p_cert_type = 'diploma' THEN
        IF s.diploma_used >= s.diploma_seats THEN RETURN jsonb_build_object('ok', false, 'error', 'no_seats'); END IF;
        UPDATE public.sponsors SET diploma_used = diploma_used + 1 WHERE id = s.id;
    ELSE
        IF s.master_used >= s.master_seats THEN RETURN jsonb_build_object('ok', false, 'error', 'no_seats'); END IF;
        UPDATE public.sponsors SET master_used = master_used + 1 WHERE id = s.id;
    END IF;

    INSERT INTO public.certificate_payments
        (user_id, cert_type, ref_id, course_id, amount_in_cents, currency, status, paid_at, sponsor_id, payment_method)
    VALUES
        (p_user, p_cert_type, p_ref_id, p_course_id, 0, 'GTQ', 'paid', now(), s.id, 'sponsor')
    RETURNING id INTO v_payment;

    INSERT INTO public.sponsor_claim_log(payment_id, sponsor_id, user_id, meta, flags)
    VALUES (v_payment, s.id, p_user, coalesce(p_meta, '{}'::jsonb), coalesce(p_flags, '{}'));

    RETURN jsonb_build_object('ok', true, 'sponsor_id', s.id, 'name', s.name,
                              'logo_url', s.logo_url, 'show_on_certificate', s.show_on_certificate);
END;
$$;
REVOKE ALL ON FUNCTION public.claim_sponsored_cert(uuid, text, text, text, jsonb, text[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_sponsored_cert(uuid, text, text, text, jsonb, text[]) TO service_role;

-- ── Revocar un certificado patrocinado (fraude comprobado) ───
-- Solo super admin. Devuelve el cupo y vuelve a bloquear el certificado.
-- OJO: no borra la fila de `certificates`; si el código ya circula y
-- quieres que deje de verificarse, bórrala a mano.
CREATE OR REPLACE FUNCTION public.revoke_sponsored_cert(p_payment_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    p public.certificate_payments%ROWTYPE;
BEGIN
    IF NOT public.is_super_admin() THEN
        RETURN jsonb_build_object('ok', false, 'error', 'forbidden');
    END IF;
    SELECT * INTO p FROM public.certificate_payments
     WHERE id = p_payment_id AND payment_method = 'sponsor' AND status = 'paid' FOR UPDATE;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('ok', false, 'error', 'not_found');
    END IF;
    UPDATE public.certificate_payments SET status = 'failed' WHERE id = p.id;
    IF p.cert_type = 'diploma' THEN
        UPDATE public.sponsors SET diploma_used = GREATEST(diploma_used - 1, 0) WHERE id = p.sponsor_id;
    ELSE
        UPDATE public.sponsors SET master_used = GREATEST(master_used - 1, 0) WHERE id = p.sponsor_id;
    END IF;
    RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.revoke_sponsored_cert(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_sponsored_cert(uuid) TO authenticated;

-- ── Logos de patrocinadores (bucket público) ─────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('sponsor-logos', 'sponsor-logos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS sponsor_logos_read ON storage.objects;
CREATE POLICY sponsor_logos_read ON storage.objects
    FOR SELECT USING (bucket_id = 'sponsor-logos');

DROP POLICY IF EXISTS sponsor_logos_write ON storage.objects;
CREATE POLICY sponsor_logos_write ON storage.objects
    FOR ALL USING (bucket_id = 'sponsor-logos' AND public.is_super_admin())
    WITH CHECK (bucket_id = 'sponsor-logos' AND public.is_super_admin());
