-- Site-wide settings (single row) — editable from admin /admin/settings

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
