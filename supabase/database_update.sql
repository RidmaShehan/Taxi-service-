-- =============================================================================
-- LankaRide / Airport Taxi — DATABASE UPDATE
-- Run this in Supabase Dashboard → SQL Editor → New query → Run
--
-- Safe to run on a database that already has the initial schema.
-- Idempotent where possible (uses IF NOT EXISTS / DO blocks).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Extensions
-- -----------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 2. Enums (skip if already exist)
-- -----------------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('user', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.car_status as enum ('available', 'in_service', 'maintenance');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.booking_status as enum ('pending', 'confirmed', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.driver_status as enum ('available', 'pending', 'confirmed', 'off_duty');
exception when duplicate_object then null;
end $$;

-- -----------------------------------------------------------------------------
-- 3. Tables — create only if missing
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null default 'Sedan',
  price_per_ride numeric(10, 2) not null default 0,
  seats integer not null,
  luggage integer not null default 0,
  image_url text,
  status public.car_status not null default 'available',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  driver_code text not null unique,
  phone text not null,
  status public.driver_status not null default 'available',
  rating numeric(2, 1) not null default 5.0,
  car_id uuid references public.cars (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  pickup_location text not null,
  destination text not null,
  date_time timestamptz not null,
  passenger_count integer not null default 1,
  message text,
  vehicle_type text,
  car_id uuid references public.cars (id) on delete set null,
  driver_id uuid references public.drivers (id) on delete set null,
  status public.booking_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  review text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  review text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  country text,
  route text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  car_id uuid references public.cars (id) on delete set null,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 4. Add missing columns (upgrade from older schema)
-- -----------------------------------------------------------------------------
alter table public.cars add column if not exists category text not null default 'Sedan';
alter table public.cars add column if not exists price_per_ride numeric(10, 2) not null default 0;
alter table public.cars add column if not exists status public.car_status not null default 'available';
alter table public.cars add column if not exists featured boolean not null default false;

alter table public.bookings add column if not exists vehicle_type text;
alter table public.bookings add column if not exists car_id uuid references public.cars (id) on delete set null;
alter table public.bookings add column if not exists driver_id uuid references public.drivers (id) on delete set null;

alter table public.reviews add column if not exists country text;
alter table public.reviews add column if not exists route text;

-- -----------------------------------------------------------------------------
-- 5. Base64 image storage — text columns for data:image/...;base64,...
--    Max upload enforced in app: 2MB before encoding
-- -----------------------------------------------------------------------------
alter table public.cars alter column image_url type text;
alter table public.gallery_images alter column image_url type text;

comment on column public.cars.image_url is
  'Vehicle image as base64 data URL (data:image/...;base64,...). Max upload 2MB.';

comment on column public.gallery_images.image_url is
  'Gallery image as base64 data URL (data:image/...;base64,...). Max upload 2MB.';

-- -----------------------------------------------------------------------------
-- 6. Indexes
-- -----------------------------------------------------------------------------
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists reviews_approved_idx on public.reviews (approved);
create index if not exists cars_featured_idx on public.cars (featured) where featured = true;
create index if not exists gallery_visible_idx on public.gallery_images (is_visible, sort_order);

-- -----------------------------------------------------------------------------
-- 7. Functions & triggers
-- -----------------------------------------------------------------------------
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

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 8. Row Level Security
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.drivers enable row level security;
alter table public.bookings enable row level security;
alter table public.testimonials enable row level security;
alter table public.reviews enable row level security;
alter table public.gallery_images enable row level security;

-- Profiles
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
  on public.profiles for update
  using (public.is_admin());

-- Cars
drop policy if exists "Public can read cars" on public.cars;
create policy "Public can read cars"
  on public.cars for select
  using (true);

drop policy if exists "Admins manage cars" on public.cars;
create policy "Admins manage cars"
  on public.cars for all
  using (public.is_admin())
  with check (public.is_admin());

-- Drivers
drop policy if exists "Admins read drivers" on public.drivers;
create policy "Admins read drivers"
  on public.drivers for select
  using (public.is_admin());

drop policy if exists "Admins manage drivers" on public.drivers;
create policy "Admins manage drivers"
  on public.drivers for all
  using (public.is_admin())
  with check (public.is_admin());

-- Bookings
drop policy if exists "Anyone can create bookings" on public.bookings;
create policy "Anyone can create bookings"
  on public.bookings for insert
  with check (true);

drop policy if exists "Admins read bookings" on public.bookings;
create policy "Admins read bookings"
  on public.bookings for select
  using (public.is_admin());

drop policy if exists "Admins update bookings" on public.bookings;
create policy "Admins update bookings"
  on public.bookings for update
  using (public.is_admin());

drop policy if exists "Admins delete bookings" on public.bookings;
create policy "Admins delete bookings"
  on public.bookings for delete
  using (public.is_admin());

-- Testimonials
drop policy if exists "Public can read testimonials" on public.testimonials;
create policy "Public can read testimonials"
  on public.testimonials for select
  using (true);

drop policy if exists "Admins manage testimonials" on public.testimonials;
create policy "Admins manage testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- Reviews
drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
  on public.reviews for select
  using (approved = true or public.is_admin());

drop policy if exists "Anyone can submit reviews" on public.reviews;
create policy "Anyone can submit reviews"
  on public.reviews for insert
  with check (approved = false);

drop policy if exists "Admins manage reviews" on public.reviews;
create policy "Admins manage reviews"
  on public.reviews for update
  using (public.is_admin());

drop policy if exists "Admins delete reviews" on public.reviews;
create policy "Admins delete reviews"
  on public.reviews for delete
  using (public.is_admin());

-- Gallery
drop policy if exists "Public can read visible gallery" on public.gallery_images;
create policy "Public can read visible gallery"
  on public.gallery_images for select
  using (is_visible = true or public.is_admin());

drop policy if exists "Admins manage gallery" on public.gallery_images;
create policy "Admins manage gallery"
  on public.gallery_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 9. Site settings (single row — editable from /admin/settings)
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null default 'LankaRide',
  site_description text not null default 'Reliable airport transfers and island-wide tours with professional drivers.',
  meta_title text not null default 'Colombo Airport Taxi',
  phone text not null default '+94 77 123 4567',
  email text not null default 'hello@lankaride.com',
  whatsapp_phone text not null default '94771234567',
  address_street text default 'Colombo',
  address_locality text default 'Colombo',
  address_region text default 'Western Province',
  postal_code text default '00100',
  hero_badge text default '#1 Airport Taxi in Sri Lanka',
  hero_title text default 'Reliable Airport Taxi Service',
  hero_subtitle text default 'Experience comfort and punctuality. Premium private transport for tourists and professionals across Sri Lanka.',
  hero_image_url text,
  hero_travelers_label text default '2,500+ Happy Travelers',
  stat_1_value text default '4.98',
  stat_1_label text default 'Average Rating',
  stat_2_value text default '1,284',
  stat_2_label text default 'Happy Customers',
  stat_3_value text default '98%',
  stat_3_label text default 'On-time Rate',
  stat_4_value text default '12k+',
  stat_4_label text default 'Rides Completed',
  footer_description text default 'Premium private transport services across Sri Lanka. Reliable, safe, and professional drivers for all your travel needs.',
  cta_title text default 'Ready to Start Your Journey?',
  cta_subtitle text default 'Book your private airport transfer or customized tour today and travel with the most trusted taxi service in Sri Lanka.',
  facebook_url text,
  twitter_url text,
  instagram_url text,
  maintenance_mode boolean not null default false,
  maintenance_message text default 'We are performing scheduled maintenance. Please check back soon or contact us on WhatsApp.',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select
  using (true);

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

insert into public.site_settings (id) values (1)
on conflict (id) do nothing;

-- SEO, hero, contact fields (migration 20250525000003)
alter table public.site_settings add column if not exists meta_keywords text;
alter table public.site_settings add column if not exists meta_robots text default 'index, follow';
alter table public.site_settings add column if not exists canonical_url text;
alter table public.site_settings add column if not exists og_title text;
alter table public.site_settings add column if not exists og_description text;
alter table public.site_settings add column if not exists og_image_url text;
alter table public.site_settings add column if not exists contact_page_title text default 'Get in Touch';
alter table public.site_settings add column if not exists contact_page_subtitle text;
alter table public.site_settings add column if not exists address_country text default 'Sri Lanka';
alter table public.site_settings add column if not exists address_display text;
alter table public.site_settings add column if not exists contact_hub_title text default 'Main Service Hub';
alter table public.site_settings add column if not exists map_embed_url text;
alter table public.site_settings add column if not exists map_link_url text;
alter table public.site_settings add column if not exists hours_airport text default '24 / 7';
alter table public.site_settings add column if not exists hours_office text default '8:00 AM - 10:00 PM';
alter table public.site_settings add column if not exists hours_response text default '~5 Minutes';

-- Branding & visitor analytics (migration 20250525000004)
alter table public.site_settings add column if not exists logo_url text;
alter table public.site_settings add column if not exists favicon_url text;

create table if not exists public.visitor_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  page_path text not null,
  page_title text,
  referrer text,
  ip_address text,
  country text,
  country_code text,
  region text,
  city text,
  latitude double precision,
  longitude double precision,
  device_type text,
  device_os text,
  browser text,
  user_agent text,
  screen_width integer,
  screen_height integer,
  timezone text,
  language text,
  consent_given boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists visitor_events_created_at_idx on public.visitor_events (created_at desc);
create index if not exists visitor_events_session_id_idx on public.visitor_events (session_id);
create index if not exists visitor_events_country_code_idx on public.visitor_events (country_code);

alter table public.visitor_events enable row level security;

drop policy if exists "Admins read visitor events" on public.visitor_events;
create policy "Admins read visitor events"
  on public.visitor_events for select
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 10. Promote your admin user (EDIT EMAIL before running)
-- -----------------------------------------------------------------------------
-- update public.profiles set role = 'admin' where email = 'your-admin@email.com';

-- -----------------------------------------------------------------------------
-- Done
-- -----------------------------------------------------------------------------
select 'Database update completed successfully.' as status;
