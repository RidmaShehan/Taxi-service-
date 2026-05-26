-- SEO, hero, and contact fields for admin dashboard sections

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

comment on column public.site_settings.meta_keywords is 'Comma-separated SEO keywords';
comment on column public.site_settings.map_embed_url is 'Google Maps embed iframe src URL';

