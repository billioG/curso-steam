-- Pruebas de migrations/examen-servidor.sql (+ banco) sobre un Postgres de prueba (NO Supabase).
-- Cubre: el banco con respuestas no es legible con la anon key ni como docente, solo el
-- service role escribe resultados, `record_exam_result` conserva la mejor nota y cuenta
-- intentos, cada docente ve solo su resultado y el admin ve todo.
--
--   createdb examen_test
--   psql -d examen_test -f migrations/tests/supabase-stub.sql
--   psql -d examen_test -f migrations/certificate-payments.sql
--   psql -d examen_test -f migrations/examen-servidor.sql
--   psql -d examen_test -f migrations/exam-bank/exam-bank-1.sql   (y -2, -3)
--   psql -d examen_test -f migrations/tests/examen-servidor.test.sql
-- Debe terminar con «=== TODAS LAS PRUEBAS PASARON ===».
\set ON_ERROR_STOP on
\set QUIET on
insert into auth.users(id,email) values
 ('00000000-0000-0000-0000-000000000001','t1@x.org'),('00000000-0000-0000-0000-000000000002','t2@x.org'),
 ('00000000-0000-0000-0000-00000000000a','admin@x.org');
insert into public.user_roles(user_id,role) values ('00000000-0000-0000-0000-00000000000a','admin');
grant select on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

create or replace function pg_temp.expect(label text, ok boolean) returns void language plpgsql as $$
begin if not ok then raise exception 'FALLÓ: %', label; end if; raise notice 'OK  %', label; end $$;

-- 1) el banco existe y trae las 655 preguntas
select pg_temp.expect('banco cargado (655 preguntas, 27 cursos)',
  (select count(*) from public.exam_questions) = 655 and (select count(distinct course_id) from public.exam_questions) = 27);
select pg_temp.expect('todas con respuesta correcta dentro de sus opciones',
  not exists (select 1 from public.exam_questions where correct >= jsonb_array_length(options)));

-- 2) docente (authenticated): NO puede leer el banco ni los intentos; sí su propio resultado
set role authenticated; select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001', false);
select pg_temp.expect('docente no lee exam_questions (RLS sin políticas)', (select count(*) from public.exam_questions) = 0);
select pg_temp.expect('docente no lee exam_attempts', (select count(*) from public.exam_attempts) = 0);
do $$ begin
  begin insert into public.exam_results(user_id,course_id,best_score) values ('00000000-0000-0000-0000-000000000001','abp',100);
    raise exception 'FALLÓ: el docente pudo insertar su nota';
  exception when insufficient_privilege or others then
    if sqlerrm like 'FALLÓ%' then raise; end if; raise notice 'OK  docente no puede insertar exam_results (%)', left(sqlerrm, 60); end;
end $$;
do $$ begin
  begin perform public.record_exam_result('00000000-0000-0000-0000-000000000001','abp',100);
    raise exception 'FALLÓ: el docente pudo ejecutar record_exam_result';
  exception when insufficient_privilege then raise notice 'OK  docente no puede ejecutar record_exam_result'; end;
end $$;
reset role;

-- 3) service role: registra, conserva la mejor nota y cuenta intentos
set role service_role;
select pg_temp.expect('primera nota: 82', public.record_exam_result('00000000-0000-0000-0000-000000000001','abp',82) = 82);
select pg_temp.expect('nota menor no baja la mejor (sigue 82)', public.record_exam_result('00000000-0000-0000-0000-000000000001','abp',71) = 82);
select pg_temp.expect('nota mayor la sube (95)', public.record_exam_result('00000000-0000-0000-0000-000000000001','abp',95) = 95);
select pg_temp.expect('cuenta 3 intentos aprobados', (select attempts from public.exam_results where user_id='00000000-0000-0000-0000-000000000001' and course_id='abp') = 3);
select pg_temp.expect('el banco sí es legible para el service role', (select count(*) from public.exam_questions) = 655);
insert into public.exam_attempts(user_id,course_id,items) values ('00000000-0000-0000-0000-000000000001','abp','[{"q":0,"perm":[0,1,2,3]}]');
reset role;

-- 4) aislamiento: t2 no ve el resultado de t1; t1 sí el suyo; el admin ve todo
set role authenticated; select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002', false);
select pg_temp.expect('otro docente no ve resultados ajenos', (select count(*) from public.exam_results) = 0);
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001', false);
select pg_temp.expect('el docente ve su propio resultado', (select best_score from public.exam_results where course_id='abp') = 95);
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a', false);
select pg_temp.expect('el admin ve resultados e intentos', (select count(*) from public.exam_results) = 1 and (select count(*) from public.exam_attempts) = 1);
reset role;

-- 5) el SQL del banco es idempotente: re-ejecutarlo no duplica
\i migrations/exam-bank/exam-bank-1.sql
select pg_temp.expect('re-ejecutar el banco no duplica filas', (select count(*) from public.exam_questions) = 655);
\echo === TODAS LAS PRUEBAS PASARON ===
