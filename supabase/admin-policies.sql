-- Run this after supabase/schema.sql in Supabase SQL Editor.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "admins manage classes" on public.classes;
create policy "admins manage classes"
on public.classes for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins manage members" on public.class_members;
create policy "admins manage members"
on public.class_members for all to authenticated
using (public.is_admin() or user_id = auth.uid())
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "admins read profiles" on public.profiles;
create policy "admins read profiles"
on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles"
on public.profiles for all to authenticated
using (public.is_admin())
with check (public.is_admin());
