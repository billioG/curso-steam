-- Pruebas de migrations/patrocinios.sql sobre un Postgres de prueba (NO sobre Supabase).
-- Cubre: cobertura por centro/correo/código, canje, freno de intentos, RLS,
-- uso de cupos (atomicidad, idempotencia, vigencia, cursos permitidos, tope diario) y revocación.
--
-- Cómo correrlas (Postgres 14+ local, base vacía):
--   createdb patrocinios_test
--   psql -d patrocinios_test -f migrations/tests/supabase-stub.sql   # roles y esquemas mínimos de Supabase
--   psql -d patrocinios_test -f migrations/certificate-payments.sql
--   psql -d patrocinios_test -f migrations/patrocinios.sql
--   psql -d patrocinios_test -f migrations/tests/patrocinios.test.sql
-- Debe terminar con «=== TODAS LAS PRUEBAS PASARON ===».
\set ON_ERROR_STOP on
\set QUIET on
-- datos
insert into auth.users(id,email) values
 ('00000000-0000-0000-0000-00000000000a','super@x.org'),
 ('00000000-0000-0000-0000-00000000000b','schooladmin@x.org'),
 ('00000000-0000-0000-0000-000000000001','t1@x.org'),('00000000-0000-0000-0000-000000000002','t2@x.org'),
 ('00000000-0000-0000-0000-000000000003','T3@X.org'),('00000000-0000-0000-0000-000000000004','t4@x.org'),
 ('00000000-0000-0000-0000-000000000005','t5@x.org'),('00000000-0000-0000-0000-000000000006','t6@x.org');
insert into public.schools(id,name) values ('11111111-1111-1111-1111-111111111111','Escuela 1');
insert into public.user_schools values ('00000000-0000-0000-0000-000000000001','11111111-1111-1111-1111-111111111111'),('00000000-0000-0000-0000-000000000002','11111111-1111-1111-1111-111111111111');
insert into public.user_roles(user_id,role,tenant_id,school_id) values
 ('00000000-0000-0000-0000-00000000000a','admin',null,null),
 ('00000000-0000-0000-0000-00000000000b','admin',null,'11111111-1111-1111-1111-111111111111');
insert into public.sponsors(id,name,diploma_seats,master_seats,valid_until) values ('aaaaaaaa-0000-0000-0000-000000000001','Fundación A',2,1,current_date+30);
insert into public.sponsor_schools values ('aaaaaaaa-0000-0000-0000-000000000001','11111111-1111-1111-1111-111111111111');
insert into public.sponsor_emails values ('aaaaaaaa-0000-0000-0000-000000000001','t3@x.org');
insert into public.sponsor_codes(code,sponsor_id,max_uses) values ('ABCDEFGH23','aaaaaaaa-0000-0000-0000-000000000001',2);
grant select on all tables in schema public to authenticated; grant all on all tables in schema public to service_role; grant usage on all sequences in schema public to service_role, authenticated;

create or replace function pg_temp.as_user(u text) returns void language plpgsql as $$ begin perform set_config('request.jwt.claim.sub', u, false); end $$;

-- 1. cobertura por centro, correo (con mayúsculas) y sin cobertura
set role authenticated;
select pg_temp.as_user('00000000-0000-0000-0000-000000000001') \gset ignore_
do $$ begin assert (select count(*) from public.my_sponsors())=1, 'centro: t1 debe estar cubierto'; end $$;
select pg_temp.as_user('00000000-0000-0000-0000-000000000003') \gset ignore_
do $$ begin assert (select count(*) from public.my_sponsors())=1, 'correo: t3 (T3@X.org) debe estar cubierto'; end $$;
select pg_temp.as_user('00000000-0000-0000-0000-000000000004') \gset ignore_
do $$ begin assert (select count(*) from public.my_sponsors())=0, 't4 no debe estar cubierto'; end $$;
reset role;
\echo 1. cobertura por centro / correo OK

-- 2. canje de código
set role authenticated;
select pg_temp.as_user('00000000-0000-0000-0000-000000000004') \gset ignore_
do $$ declare r jsonb; begin
  r := public.redeem_sponsor_code('abcde-fgh23'); assert r->>'ok'='true', 'canje válido con guion y minúsculas: '||r;
  r := public.redeem_sponsor_code('ABCDEFGH23');  assert r->>'already'='true', 'segundo canje del mismo usuario no gasta: '||r;
  assert (select count(*) from public.my_sponsors())=1, 't4 ya cubierto';
end $$;
select pg_temp.as_user('00000000-0000-0000-0000-000000000005') \gset ignore_
do $$ declare r jsonb; begin
  r := public.redeem_sponsor_code('ABCDEFGH23'); assert r->>'ok'='true', 'segundo usuario canjea (max_uses=2)';
end $$;
select pg_temp.as_user('00000000-0000-0000-0000-000000000006') \gset ignore_
do $$ declare r jsonb; begin
  r := public.redeem_sponsor_code('ABCDEFGH23'); assert r->>'error'='used', 'código agotado: '||r;
end $$;
reset role;
\echo 2. canje de código OK
-- 3. freno a la adivinanza
set role authenticated;
select pg_temp.as_user('00000000-0000-0000-0000-000000000006') \gset ignore_
do $$ declare r jsonb; i int; begin
  for i in 1..12 loop r := public.redeem_sponsor_code('ZZZZZZZZ'||i); end loop;
  assert r->>'error'='too_many', 'debe frenar tras 10 fallos: '||r;
  assert (public.redeem_sponsor_code('ABCDEFGH23'))->>'error'='too_many', 'frenado también con código bueno';
end $$;
reset role;
\echo 3. freno de intentos OK

-- 4. permisos: el docente no puede ver ni escribir
set role authenticated;
select pg_temp.as_user('00000000-0000-0000-0000-000000000001') \gset ignore_
do $$ begin
  assert (select count(*) from public.sponsors)=0, 'RLS: docente no ve patrocinadores';
  assert (select count(*) from public.sponsor_codes)=0, 'RLS: docente no ve códigos';
  assert (select count(*) from public.sponsor_claim_log)=0, 'RLS: docente no ve bitácora';
  begin perform public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','steam','steam','{}'::jsonb,'{}'); assert false,'docente no debe ejecutar claim'; exception when insufficient_privilege then null; end;
  begin perform public.sponsor_candidates('00000000-0000-0000-0000-000000000002'); assert false,'docente no debe ejecutar sponsor_candidates'; exception when insufficient_privilege then null; end;
  begin insert into public.sponsors(name) values ('x'); raise exception 'docente_inserto'; exception when others then if sqlerrm = 'docente_inserto' then raise exception 'docente no debe insertar'; end if; end;
end $$;
-- admin de un solo colegio tampoco
select pg_temp.as_user('00000000-0000-0000-0000-00000000000b') \gset ignore_
do $$ begin assert (select count(*) from public.sponsors)=0, 'RLS: admin de colegio no ve patrocinadores'; assert not public.is_super_admin(),'admin de colegio no es super admin'; end $$;
select pg_temp.as_user('00000000-0000-0000-0000-00000000000a') \gset ignore_
do $$ begin assert (select count(*) from public.sponsors)=1, 'super admin ve patrocinadores'; assert public.is_super_admin(),'super admin'; end $$;
reset role;
\echo 4. permisos y RLS OK

-- 5. uso de cupos (service_role): atomicidad, idempotencia, topes
set role service_role;
do $$ declare r jsonb; begin
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','steam','steam','{"nota":90}','{}');
  assert r->>'ok'='true' and r->>'name'='Fundación A', 'claim 1: '||r;
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','steam','steam','{}','{}');
  assert r->>'already'='true', 'idempotente: '||r;
  assert (select diploma_used from public.sponsors)=1, 'solo 1 cupo gastado tras repetir';
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000002','diploma','abp','abp','{}','{cuenta_reciente}');
  assert r->>'ok'='true', 'claim 2';
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000003','diploma','abp','abp','{}','{}');
  assert r->>'error'='no_seats', 'sin cupos de diploma: '||r;
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000003','master','steam20',null,'{}','{}');
  assert r->>'ok'='true', 'master con cupo: '||r;
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000002','master','ia',null,'{}','{}');
  assert r->>'error'='no_seats', 'master agotado: '||r;
  assert (select count(*) from public.sponsor_claim_log)=3, 'bitácora';
  assert (select count(*) from public.sponsor_claim_log where 'cuenta_reciente'=any(flags))=1, 'flags guardados';
  assert (select amount_in_cents from public.certificate_payments where user_id='00000000-0000-0000-0000-000000000001')=0, 'monto 0';
end $$;
reset role;
\echo 5. claim: cupos, idempotencia, bitácora OK

-- 6. el docente ve su certificado patrocinado; no ve la bitácora
set role authenticated;
select pg_temp.as_user('00000000-0000-0000-0000-000000000001') \gset ignore_
do $$ begin
  assert (select count(*) from public.my_sponsored_certs())=1, 'my_sponsored_certs';
  assert (select count(*) from public.certificate_payments where status='paid')=1, 've su pago paid';
  assert (select count(*) from public.my_sponsors() where diploma_left=0)=1, 'sin cupos restantes';
end $$;
reset role;
\echo 6. vista del docente OK

-- 7. vigencia, patrocinador inactivo, restricción de cursos
update public.sponsors set diploma_seats=10, diploma_used=0, master_seats=10, master_used=0;
delete from public.certificate_payments;
update public.sponsors set valid_until=current_date-1;
set role service_role;
do $$ declare r jsonb; begin r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','steam','steam','{}','{}'); assert r->>'error'='no_seats','vencido no cubre: '||r; end $$;
reset role;
update public.sponsors set valid_until=current_date+5, active=false;
set role service_role;
do $$ declare r jsonb; begin r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','steam','steam','{}','{}'); assert r->>'error'='no_seats','inactivo no cubre: '||r; end $$;
reset role;
update public.sponsors set active=true, courses=array['abp'];
set role service_role;
do $$ declare r jsonb; begin
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','steam','steam','{}','{}'); assert r->>'error'='no_seats','curso fuera de la lista: '||r;
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','abp','abp','{}','{}'); assert r->>'ok'='true','curso permitido: '||r;
end $$;
reset role;
\echo 7. vigencia / inactivo / cursos permitidos OK

-- 8. tope de 5 por día y revocación
update public.sponsors set courses=null;
delete from public.certificate_payments; update public.sponsors set diploma_used=0;
set role service_role;
do $$ declare r jsonb; i int; begin
  for i in 1..5 loop r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','c'||i,'c'||i,'{}','{}'); assert r->>'ok'='true','claim '||i; end loop;
  r := public.claim_sponsored_cert('00000000-0000-0000-0000-000000000001','diploma','c6','c6','{}','{}');
  assert r->>'error'='rate_limited','tope diario: '||r;
end $$;
reset role;
set role authenticated;
select pg_temp.as_user('00000000-0000-0000-0000-00000000000a') \gset ignore_
do $$ declare r jsonb; pid uuid; begin
  select id into pid from public.certificate_payments where ref_id='c1';
  assert (select diploma_used from public.sponsors)=5,'5 usados';
  r := public.revoke_sponsored_cert(pid); assert r->>'ok'='true','revocar: '||r;
  assert (select diploma_used from public.sponsors)=4,'cupo devuelto';
  assert (select status from public.certificate_payments where id=pid)='failed','pago revocado';
end $$;
select pg_temp.as_user('00000000-0000-0000-0000-000000000001') \gset ignore_
do $$ declare r jsonb; begin r := public.revoke_sponsored_cert('00000000-0000-0000-0000-000000000000'); assert r->>'error'='forbidden','docente no revoca: '||r; end $$;
reset role;
\echo 8. tope diario y revocación OK
\echo === TODAS LAS PRUEBAS PASARON ===
