-- Run this once in Supabase SQL Editor.
alter table public.class_members add column if not exists member_type text not null default 'student';
alter table public.class_members add column if not exists svl_id uuid references public.profiles(id) on delete set null;

update public.class_members cm
set member_type = case when p.role = 'svl' then 'svl' else 'student' end
from public.profiles p
where p.id = cm.user_id;

alter table public.class_members drop constraint if exists class_members_member_type_check;
alter table public.class_members add constraint class_members_member_type_check check (member_type in ('svl','student'));

create index if not exists class_members_class_id_idx on public.class_members(class_id);
create index if not exists class_members_user_id_idx on public.class_members(user_id);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage member assignments" on public.class_members;
create policy "admins manage member assignments" on public.class_members for all to authenticated using (public.is_admin()) with check (public.is_admin());
