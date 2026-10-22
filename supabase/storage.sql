-- Run once in the Supabase SQL Editor, after seed.sql. Creates a public
-- "images" bucket for dashboard image uploads (project covers/galleries,
-- profile photos, certification images), with the same public-read /
-- authenticated-write split used for the content tables.

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "images_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'images');

create policy "images_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'images');

create policy "images_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'images');

create policy "images_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'images');
