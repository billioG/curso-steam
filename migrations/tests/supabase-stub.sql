-- Lo mínimo de Supabase (roles, auth.users, auth.uid(), storage, user_roles, schools, user_schools)
-- para probar migraciones fuera de Supabase. Ver patrocinios.test.sql.
do $$ begin if not exists (select 1 from pg_roles where rolname='anon') then create role anon nologin; end if; if not exists (select 1 from pg_roles where rolname='authenticated') then create role authenticated nologin; end if; if not exists (select 1 from pg_roles where rolname='service_role') then create role service_role nologin bypassrls; end if; end $$;
create schema auth;
create table auth.users(id uuid primary key default gen_random_uuid(), email text, created_at timestamptz default now());
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true),'')::uuid $$;
create schema storage;
create table storage.buckets(id text primary key, name text, public boolean);
create table storage.objects(id uuid default gen_random_uuid(), bucket_id text, name text);
alter table storage.objects enable row level security;
create table public.user_roles(user_id uuid, role text, tenant_id uuid, school_id uuid);
create table public.schools(id uuid default gen_random_uuid() primary key, name text);
create table public.user_schools(user_id uuid references auth.users(id), school_id uuid references public.schools(id), primary key(user_id,school_id));
grant usage on schema public, auth to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
