-- Images are stored as base64 data URLs in text columns (max 2MB file before encoding).
-- For a full idempotent update on an existing project, run: supabase/database_update.sql

comment on column public.cars.image_url is
  'Vehicle image as base64 data URL (data:image/...;base64,...). Max upload 2MB.';

comment on column public.gallery_images.image_url is
  'Gallery image as base64 data URL (data:image/...;base64,...). Max upload 2MB.';

alter table public.cars alter column image_url type text;
alter table public.gallery_images alter column image_url type text;
