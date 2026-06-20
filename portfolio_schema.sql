-- =============================================
-- Tabla: portfolios
-- Portafolio de práctica docente (evaluado por IA)
-- =============================================

CREATE TABLE IF NOT EXISTS portfolios (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users NOT NULL,

  -- Entregables (texto libre del docente)
  entregable_steam  text,
  entregable_abp    text,
  entregable_dt     text,
  entregable_eval   text,
  entregable_tipos  text,

  -- Resultado de evaluación IA
  ai_scores     jsonb,   -- [8, 7, 9, 6, 8]
  ai_feedback   jsonb,   -- ["...", "...", "...", "...", "..."]
  ai_total      int,     -- 0-50
  ai_summary    text,

  -- Puntaje examen al momento de envío
  exam_score_50 int,     -- masterExamScore * 0.5

  -- Puntaje combinado final
  combined_score int,    -- ai_total + exam_score_50

  -- Estado
  status        text DEFAULT 'pending',  -- pending | evaluated | passed | failed
  submitted_at  timestamptz DEFAULT now(),
  evaluated_at  timestamptz
);

-- RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Docente ve su propio portafolio"
  ON portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Docente inserta su portafolio"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Docente actualiza su portafolio"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id);

-- Admin puede ver todos (para panel admin)
CREATE POLICY "Admin ve todos los portafolios"
  ON portfolios FOR SELECT
  USING (public.is_admin());
