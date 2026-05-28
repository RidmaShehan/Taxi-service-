-- Allow API route to insert visitor events (consent flag required)
drop policy if exists "Allow consent-based visitor insert" on public.visitor_events;
create policy "Allow consent-based visitor insert"
  on public.visitor_events for insert
  to anon, authenticated, service_role
  with check (consent_given = true);
