-- Site logo & favicon (base64 data URLs, max 2MB in app)
alter table public.site_settings add column if not exists logo_url text;
alter table public.site_settings add column if not exists favicon_url text;

comment on column public.site_settings.logo_url is 'Header logo — base64 data URL or https URL';
comment on column public.site_settings.favicon_url is 'Browser tab icon — base64 data URL or https URL';

-- Visitor analytics (consent-based)
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

-- Inserts only via service role (API route)
