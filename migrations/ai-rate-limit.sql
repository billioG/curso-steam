-- ============================================================
-- Límite de uso del asistente de IA (groq-proxy) por docente.
-- Cuenta las llamadas por usuario en ventanas de 10 minutos. La función solo la
-- puede llamar el service role (la edge function); el navegador no tiene acceso.
-- Seguro de re-ejecutar.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ai_rate (
    user_id uuid        NOT NULL,
    bucket  text        NOT NULL,
    window_start timestamptz NOT NULL,
    n       int         NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, bucket, window_start)
);
ALTER TABLE public.ai_rate ENABLE ROW LEVEL SECURITY;   -- sin políticas: solo service role
REVOKE ALL ON public.ai_rate FROM anon, authenticated;

-- true = permitido; false = pasó el máximo de la ventana actual.
CREATE OR REPLACE FUNCTION public.ai_rate_check(p_user uuid, p_bucket text, p_max int, p_window_min int DEFAULT 10)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    w timestamptz := to_timestamp(floor(extract(epoch FROM now()) / (p_window_min * 60)) * (p_window_min * 60));
    c int;
BEGIN
    INSERT INTO public.ai_rate (user_id, bucket, window_start, n) VALUES (p_user, p_bucket, w, 1)
    ON CONFLICT (user_id, bucket, window_start) DO UPDATE SET n = public.ai_rate.n + 1
    RETURNING n INTO c;
    -- limpieza ocasional de ventanas viejas
    IF random() < 0.02 THEN
        DELETE FROM public.ai_rate WHERE window_start < now() - interval '1 day';
    END IF;
    RETURN c <= p_max;
END $$;
REVOKE ALL ON FUNCTION public.ai_rate_check(uuid, text, int, int) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_rate_check(uuid, text, int, int) TO service_role;
