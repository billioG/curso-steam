-- ============================================================
-- Fase 1 del roadmap de impacto: seguimiento de aplicación real
-- en el aula, no solo finalización de tarjetas.
--
-- Cada vez que un docente cierra una tarjeta 'takeaway' (compromiso
-- de aplicación), queda registrada en progress.daily_missions.pinnedCards.
-- Esta tabla guarda el seguimiento a 7 y 30 días: ¿lo aplicó de verdad?
-- ============================================================

create table if not exists application_followups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  course_id text not null,
  committed_at timestamptz not null,
  days_after integer not null check (days_after in (7, 30)),
  applied boolean,
  outcome_note text,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, card_id, days_after)
);

create index if not exists idx_application_followups_pending
  on application_followups (user_id) where applied is null;

create index if not exists idx_application_followups_course
  on application_followups (course_id);

alter table application_followups enable row level security;

-- El docente ve y responde solo sus propios seguimientos pendientes.
drop policy if exists "followups_select_own" on application_followups;
create policy "followups_select_own" on application_followups
  for select using (auth.uid() = user_id);

drop policy if exists "followups_update_own" on application_followups;
create policy "followups_update_own" on application_followups
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Solo el service role (edge function programada) puede crear filas.
-- No hay policy de insert para usuarios autenticados a propósito.

-- Super admin ve todos los agregados.
drop policy if exists "followups_select_admin" on application_followups;
create policy "followups_select_admin" on application_followups
  for select using (public.is_admin());

-- Coordinador de colegio ve los seguimientos de los docentes asignados a
-- SU colegio (mismo criterio de alcance que ya usa coordinator.html para
-- leer la tabla progress: coordinators.school_id -> user_schools.user_id).
drop policy if exists "followups_select_coordinator" on application_followups;
create policy "followups_select_coordinator" on application_followups
  for select using (
    exists (
      select 1 from coordinators co
      join user_schools us on us.school_id = co.school_id
      where co.user_id = auth.uid()
        and us.user_id = application_followups.user_id
    )
  );

-- Vista de agregado por curso, lista para el panel de coordinador.
-- % aplicado = respondidos con applied=true / total respondidos (no
-- cuenta los que aún no contestaron, para no diluir la tasa real).
create or replace view application_followup_rates as
select
  course_id,
  days_after,
  count(*) filter (where responded_at is not null) as respondidos,
  count(*) filter (where applied = true) as aplicaron,
  count(*) as total_seguimientos,
  round(
    100.0 * count(*) filter (where applied = true)
    / nullif(count(*) filter (where responded_at is not null), 0)
  , 1) as porcentaje_aplicacion
from application_followups
group by course_id, days_after;
