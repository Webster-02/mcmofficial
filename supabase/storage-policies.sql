-- Create this bucket in Supabase Storage first, or run this statement in SQL Editor.
insert into storage.buckets (id, name, public) values ('mcm-notes', 'mcm-notes', true) on conflict (id) do update set public = true;

create policy "SVL and admin upload notes" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'mcm-notes' and exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('svl','admin')
  )
);

create policy "Authenticated users read notes" on storage.objects
for select to authenticated
using (bucket_id = 'mcm-notes');

create policy "Owner or admin delete notes" on storage.objects
for delete to authenticated
using (
  bucket_id = 'mcm-notes' and (
    owner_id = auth.uid()::text or exists (
      select 1 from public.profiles where id = auth.uid() and role = 'admin'
    )
  )
);