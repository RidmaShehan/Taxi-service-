-- Extensions
create extension if not exists "pgcrypto";

-- Enums
create type public.user_role as enum ('user', 'admin');
create type public.car_status as enum ('available', 'in_service', 'maintenance');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled');
create type public.driver_status as enum ('available', 'pending', 'confirmed', 'off_duty');

-- Profiles (linked to auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

-- Cars / Fleet
create table public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null default 'Sedan',
  price_per_ride numeric(10, 2) not null default 0,
  seats integer not null,
  luggage integer not null default 0,
  image_url text,
  -- Base64 data URL: data:image/jpeg;base64,... (max 2MB upload)
  status public.car_status not null default 'available',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Drivers
create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  driver_code text not null unique,
  phone text not null,
  status public.driver_status not null default 'available',
  rating numeric(2, 1) not null default 5.0,
  car_id uuid references public.cars (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Bookings
create table public.bookings (
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

-- Testimonials (homepage)
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  review text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now()
);

-- Reviews (moderated)
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  review text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  country text,
  route text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Gallery images
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  -- Base64 data URL: data:image/jpeg;base64,... (max 2MB upload)
  caption text,
  car_id uuid references public.cars (id) on delete set null,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index bookings_created_at_idx on public.bookings (created_at desc);
create index reviews_approved_idx on public.reviews (approved);
create index cars_featured_idx on public.cars (featured) where featured = true;
create index gallery_visible_idx on public.gallery_images (is_visible, sort_order);

-- Admin helper function
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

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.drivers enable row level security;
alter table public.bookings enable row level security;
alter table public.testimonials enable row level security;
alter table public.reviews enable row level security;
alter table public.gallery_images enable row level security;

-- Profiles policies
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Admins can update profiles"
  on public.profiles for update
  using (public.is_admin());

-- Cars policies
create policy "Public can read cars"
  on public.cars for select
  using (true);

create policy "Admins manage cars"
  on public.cars for all
  using (public.is_admin())
  with check (public.is_admin());

-- Drivers policies
create policy "Admins read drivers"
  on public.drivers for select
  using (public.is_admin());

create policy "Admins manage drivers"
  on public.drivers for all
  using (public.is_admin())
  with check (public.is_admin());

-- Bookings policies
create policy "Anyone can create bookings"
  on public.bookings for insert
  with check (true);

create policy "Admins read bookings"
  on public.bookings for select
  using (public.is_admin());

create policy "Admins update bookings"
  on public.bookings for update
  using (public.is_admin());

create policy "Admins delete bookings"
  on public.bookings for delete
  using (public.is_admin());

-- Testimonials policies
create policy "Public can read testimonials"
  on public.testimonials for select
  using (true);

create policy "Admins manage testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- Reviews policies
create policy "Public can read approved reviews"
  on public.reviews for select
  using (approved = true or public.is_admin());

create policy "Anyone can submit reviews"
  on public.reviews for insert
  with check (approved = false);

create policy "Admins manage reviews"
  on public.reviews for update
  using (public.is_admin());

create policy "Admins delete reviews"
  on public.reviews for delete
  using (public.is_admin());

-- Gallery policies
create policy "Public can read visible gallery"
  on public.gallery_images for select
  using (is_visible = true or public.is_admin());

create policy "Admins manage gallery"
  on public.gallery_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do nothing;

create policy "Public read vehicle images"
  on storage.objects for select
  using (bucket_id = 'vehicle-images');

create policy "Admins upload vehicle images"
  on storage.objects for insert
  with check (bucket_id = 'vehicle-images' and public.is_admin());

create policy "Admins update vehicle images"
  on storage.objects for update
  using (bucket_id = 'vehicle-images' and public.is_admin());

create policy "Admins delete vehicle images"
  on storage.objects for delete
  using (bucket_id = 'vehicle-images' and public.is_admin());

-- Seed data
insert into public.cars (name, description, category, price_per_ride, seats, luggage, image_url, status, featured) values
  ('Toyota Prius Hybrid', 'Perfect for solo travelers or couples. Fuel efficient and smooth for city rides.', 'Sedan', 35, 4, 2, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800', 'available', true),
  ('Mercedes-Benz E-Class', 'Arrival in style. Premium leather interiors and climate control.', 'Premium', 75, 3, 2, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800', 'available', true),
  ('Toyota KDH Hiace', 'Best choice for large families or tour groups.', 'Van', 90, 12, 10, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800', 'available', true),
  ('Nissan X-Trail SUV', 'Handle the hill country with ease. High ground clearance.', 'SUV', 55, 5, 4, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800', 'available', false);

insert into public.testimonials (name, country, review, rating) values
  ('Sarah Jenkins', 'United Kingdom', 'Fantastic service! The driver was waiting for us at the airport with a clear sign. Highly recommend for any traveler in Sri Lanka.', 5),
  ('Michael Chen', 'Singapore', 'Comfortable car and very professional. The driver kept us informed throughout the journey. Overall great experience.', 5),
  ('Elena Rodriguez', 'Spain', 'Smooth ride from Colombo to Galle. Punctual, clean vehicle, and friendly driver. Will book again!', 5);

insert into public.reviews (name, review, rating, country, route, approved) values
  ('Alex Thompson', 'Fantastic service! The driver was waiting for us at the airport with a clear sign.', 5, 'Australia', 'CMB Airport → Galle', true),
  ('Maria Garcia', 'Comfortable car and very professional. A bit late due to traffic but the driver kept us informed.', 4, 'Spain', 'Negombo → Sigiriya', true),
  ('David Wilson', 'Great value for money. Clean vehicle and courteous driver.', 5, 'UK', 'CMB Airport → Colombo', false);

insert into public.drivers (name, driver_code, phone, status, rating) values
  ('Nuwan Perera', 'DRV-201', '+94 77 111 2233', 'available', 4.9),
  ('Kamal Silva', 'DRV-202', '+94 77 222 3344', 'available', 4.8),
  ('Sophie Chen', 'DRV-203', '+94 77 333 4455', 'pending', 4.7);
