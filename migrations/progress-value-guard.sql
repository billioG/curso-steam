-- ============================================================
-- Validación de rango server-side en `progress`
-- Ejecutar en Supabase SQL Editor. Seguro re-ejecutar.
-- ============================================================
--
-- Hallazgo "Alto" del code review: la RLS de `progress` (progress_own) solo
-- valida PROPIEDAD (auth.uid() = user_id), no VALORES — cualquier usuario
-- autenticado podía escribir `xp: 999999` o `examScores: {steam: 150}`
-- desde la consola del navegador y ver eso reflejado en el ranking y el
-- dashboard del admin.
--
-- Este trigger bloquea esa manipulación burda. NO prueba que un examen se
-- haya rendido de verdad — eso requeriría calificar en el servidor en vez
-- de en el cliente (ver tasks/plan.md, "Preguntas abiertas" — decidido NO
-- perseguir por ahora, riesgo aceptado dado el valor de Q10-Q50 por
-- certificado; documentado también en CLAUDE.md).
--
-- Límites elegidos:
-- - xp: nunca negativo; un solo guardado no puede subir más de 1000 XP.
--   saveProgress() debounca 1s (app.js:1105-1120), así que varias acciones
--   seguidas (completar módulo + logro + racha + quiz) se agrupan en un
--   solo upsert — el combo legítimo más alto hoy ronda 200-500 XP
--   (Certificado Maestro = 200, portafolio aprobado = 200, etc., ver
--   app.js addXP()). 1000 deja margen generoso sin permitir saltos
--   absurdos tipo "xp: 999999".
-- - examScores: cada valor debe ser un número entre 0 y 100.
-- - completed_cards: cada elemento debe ser un string con formato de ID de
--   tarjeta razonable (letras/números/guiones). NO se valida contra el
--   conjunto real de IDs de data.js a propósito — eso reintroduciría el
--   problema de sincronización que la Fase 1 de este plan eliminó (ver
--   tasks/plan.md, Tarea 5).

CREATE OR REPLACE FUNCTION public.guard_progress_values()
RETURNS trigger AS $$
DECLARE
  existing_xp int;
  xp_delta    int;
  score_key   text;
  score_val   jsonb;
  card_elem   jsonb;
BEGIN
  IF NEW.xp < 0 THEN
    RAISE EXCEPTION 'progress.xp no puede ser negativo (valor: %)', NEW.xp;
  END IF;

  -- No usamos OLD directamente: app.js siempre escribe con
  -- .upsert(..., {onConflict:'user_id'}) (app.js:263-293), y Postgres
  -- dispara el trigger BEFORE INSERT (con OLD nulo) ANTES de resolver el
  -- conflicto y disparar el BEFORE UPDATE real — comprobado empíricamente.
  -- Si usáramos COALESCE(OLD.xp,0), esa fase fantasma de INSERT vería
  -- old_xp=0 y rechazaría cualquier upsert de un usuario con más de 1000 XP
  -- acumulado (o sea, todos después de un par de semanas). Por eso
  -- buscamos la fila existente nosotros mismos, que es la misma sea cual
  -- sea la fase del trigger en la que estemos.
  SELECT xp INTO existing_xp FROM public.progress WHERE user_id = NEW.user_id;

  IF existing_xp IS NULL THEN
    -- Usuario realmente nuevo (no hay fila previa) — no puede empezar con
    -- más de 1000 XP, ya que todo XP se gana con acciones dentro de la app
    -- después de crear la cuenta.
    IF NEW.xp > 1000 THEN
      RAISE EXCEPTION 'Un usuario nuevo no puede empezar con más de 1000 XP (valor: %)', NEW.xp;
    END IF;
  ELSE
    xp_delta := NEW.xp - existing_xp;
    IF xp_delta > 1000 THEN
      RAISE EXCEPTION 'progress.xp aumentó % en una sola escritura (máximo permitido por escritura: 1000)', xp_delta;
    END IF;
  END IF;

  IF NEW.daily_missions ? 'examScores' AND jsonb_typeof(NEW.daily_missions->'examScores') = 'object' THEN
    FOR score_key, score_val IN SELECT * FROM jsonb_each(NEW.daily_missions->'examScores')
    LOOP
      IF jsonb_typeof(score_val) != 'number'
         OR (score_val #>> '{}')::numeric < 0
         OR (score_val #>> '{}')::numeric > 100
      THEN
        RAISE EXCEPTION 'daily_missions.examScores.% fuera de rango 0-100: %', score_key, score_val;
      END IF;
    END LOOP;
  END IF;

  IF jsonb_typeof(NEW.completed_cards) = 'array' THEN
    FOR card_elem IN SELECT * FROM jsonb_array_elements(NEW.completed_cards)
    LOOP
      IF jsonb_typeof(card_elem) != 'string'
         OR NOT (card_elem #>> '{}') ~ '^[a-zA-Z0-9_-]{1,60}$'
      THEN
        RAISE EXCEPTION 'completed_cards contiene un id con formato inválido: %', card_elem;
      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS progress_guard_values ON public.progress;
CREATE TRIGGER progress_guard_values
  BEFORE INSERT OR UPDATE ON public.progress
  FOR EACH ROW
  EXECUTE FUNCTION public.guard_progress_values();
