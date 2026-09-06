alter table public.class_members add column if not exists member_type text;
alter table public.class_members add column if not exists svl_id uuid references public.profiles(id) on delete set null;

update public.class_members cm
set member_type = case when p.role = 'svl' then 'svl' else 'student' end
from public.profiles p
where p.id = cm.user_id and cm.member_type is null;

alter table public.class_members drop constraint if exists class_members_member_type_check;
alter table public.class_members add constraint class_members_member_type_check check (member_type in ('svl','student'));

create policy "admins manage profiles" on public.profiles
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admins manage member assignments" on public.class_members
for all to authenticated using (public.is_admin()) with check (public.is_admin());
