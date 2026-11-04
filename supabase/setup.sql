-- Beyond the Dashboard: public, anonymous response wall
-- Run this script in Supabase Dashboard -> SQL Editor -> New query.
-- Anyone can read submitted responses and insert new ones. No names or accounts are required.

create table if not exists public.lab_responses (
  id uuid primary key default gen_random_uuid(),
  response_type text not null check (response_type in ('reflection', 'design_brief')),
  reflection text,
  problem text,
  data text,
  limitation text,
  safeguard text,
  created_at timestamptz not null default now(),
  constraint response_content_length check (
    (reflection is null or char_length(reflection) <= 3000) and
    (problem is null or char_length(problem) <= 1500) and
    (data is null or char_length(data) <= 1500) and
    (limitation is null or char_length(limitation) <= 1500) and
    (safeguard is null or char_length(safeguard) <= 1500)
  ),
  constraint reflection_shape check (
    response_type <> 'reflection' or (reflection is not null and char_length(trim(reflection)) > 0)
  ),
  constraint design_brief_shape check (
    response_type <> 'design_brief' or (
      problem is not null and char_length(trim(problem)) > 0 and
      data is not null and char_length(trim(data)) > 0 and
      limitation is not null and char_length(trim(limitation)) > 0 and
      safeguard is not null and char_length(trim(safeguard)) > 0
    )
  )
);

alter table public.lab_responses enable row level security;

-- Remove these policies if you are rerunning this script after changing permissions.
drop policy if exists "Anyone can read lab responses" on public.lab_responses;
drop policy if exists "Anyone can submit lab responses" on public.lab_responses;

create policy "Anyone can read lab responses"
on public.lab_responses for select
to anon, authenticated
using (true);

create policy "Anyone can submit lab responses"
on public.lab_responses for insert
to anon, authenticated
with check (true);

grant select, insert on public.lab_responses to anon, authenticated;
