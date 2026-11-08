-- ============================================================
-- Exámenes finales de curso calificados en el servidor
-- Ejecutar en Supabase SQL Editor. Seguro re-ejecutar.
-- Después: migrations/exam-bank/*.sql (el banco de preguntas) y desplegar la
-- Edge Function `exam`.
-- ============================================================
--
-- Antes, la nota (`examScores`) la calculaba y guardaba el navegador: bastaba
-- editarla para «aprobar». Ahora:
--   · `exam_questions`  banco de preguntas CON la respuesta correcta; nadie con
--     la anon key puede leerlo (RLS activa y sin políticas: solo service role).
--   · `exam_attempts`   cada intento: qué preguntas se sortearon y en qué orden
--     de opciones, cuándo empezó y terminó, la nota y las alertas.
--   · `exam_results`    mejor nota APROBADA por docente y curso. Solo la escribe
--     la función `exam` (service role); es lo que valida create-certificate-checkout.

CREATE TABLE IF NOT EXISTS public.exam_questions (
    course_id   text NOT NULL,
    idx         int  NOT NULL,
    text        text NOT NULL,
    options     jsonb NOT NULL,
    correct     int  NOT NULL CHECK (correct >= 0),
    explanation text NOT NULL DEFAULT '',
    source      text NOT NULL DEFAULT 'exam' CHECK (source IN ('exam', 'lesson')),
    PRIMARY KEY (course_id, idx)
);

CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id     text NOT NULL,
    items         jsonb NOT NULL,                 -- [{ "q": idx, "perm": [orden de opciones] }]
    answers       jsonb,
    started_at    timestamptz NOT NULL DEFAULT now(),
    submitted_at  timestamptz,
    correct_count int,
    total         int,
    score         int,
    passed        boolean,
    flags         text[] NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user ON public.exam_attempts(user_id, course_id, started_at DESC);

CREATE TABLE IF NOT EXISTS public.exam_results (
    user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id  text NOT NULL,
    best_score int  NOT NULL,
    passed_at  timestamptz NOT NULL DEFAULT now(),   -- primera vez que aprobó
    updated_at timestamptz NOT NULL DEFAULT now(),
    attempts   int  NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id, course_id)
);

ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;   -- sin políticas: solo service role
ALTER TABLE public.exam_attempts  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS exam_attempts_admin_read ON public.exam_attempts;
CREATE POLICY exam_attempts_admin_read ON public.exam_attempts
    FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS exam_results_read_own ON public.exam_results;
CREATE POLICY exam_results_read_own ON public.exam_results
    FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS exam_results_admin_read ON public.exam_results;
CREATE POLICY exam_results_admin_read ON public.exam_results
    FOR SELECT USING (public.is_admin());

-- Registra una nota aprobada conservando la mejor. Solo la llama la función `exam`.
CREATE OR REPLACE FUNCTION public.record_exam_result(p_user uuid, p_course text, p_score int)
RETURNS int
LANGUAGE sql SECURITY DEFINER
SET search_path = public
AS $$
    INSERT INTO public.exam_results (user_id, course_id, best_score)
    VALUES (p_user, p_course, p_score)
    ON CONFLICT (user_id, course_id) DO UPDATE
        SET best_score = GREATEST(public.exam_results.best_score, EXCLUDED.best_score),
            updated_at = now(),
            attempts   = public.exam_results.attempts + 1
    RETURNING best_score;
$$;
REVOKE ALL ON FUNCTION public.record_exam_result(uuid, text, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_exam_result(uuid, text, int) TO service_role;
