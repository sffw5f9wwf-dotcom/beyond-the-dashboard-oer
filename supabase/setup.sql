
-- Beyond the Dashboard: anonymous response wall
-- Run in Supabase SQL Editor.
-- Public responses; no user accounts required.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.lab_responses (
  id uuid primary key default gen_random_uuid(),
  response_type text not null
    check (response_type in ('reflection', 'design_brief')),
  reflection text,
  problem text,
  data text,
  limitation text,
  safeguard text,
  deletion_token_hash text,
  created_at timestamptz not null default now(),

  constraint response_content_length check (
    (reflection is null or char_length(reflection) <= 3000) and
    (problem is null or char_length(problem) <= 1500) and
    (data is null or char_length(data) <= 1500) and
    (limitation is null or char_length(limitation) <= 1500) and
    (safeguard is null or char_length(safeguard) <= 1500)
  ),

  constraint reflection_shape check (
    response_type <> 'reflection' or
    (reflection is not null and char_length(trim(reflection)) > 0)
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

alter table public.lab_responses
  add column if not exists deletion_token_hash text;

alter table public.lab_responses enable row level security;

drop policy if exists "Anyone can read lab responses"
  on public.lab_responses;

drop policy if exists "Anyone can submit lab responses"
  on public.lab_responses;

create policy "Anyone can read lab responses"
on public.lab_responses for select
to anon, authenticated
using (true);

create policy "Anyone can submit lab responses"
on public.lab_responses for insert
to anon, authenticated
with check (
  deletion_token_hash is not null
  and deletion_token_hash ~ '^[0-9a-f]{64}$'
);

-- Restrict public access to the deletion-token hash.
revoke all on public.lab_responses from anon, authenticated;

grant select (
  id, response_type, reflection, problem, data,
  limitation, safeguard, created_at
) on public.lab_responses to anon, authenticated;

grant insert (
  response_type, reflection, problem, data,
  limitation, safeguard, deletion_token_hash
) on public.lab_responses to anon, authenticated;

-- Only the holder of the original token can delete a response.
create or replace function public.delete_own_lab_response(
  response_id uuid,
  deletion_token text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  removed_id uuid;
begin
  if deletion_token is null
     or length(deletion_token) > 200 then
    return false;
  end if;

  delete from public.lab_responses
  where id = response_id
    and deletion_token_hash = encode(
      extensions.digest(
        convert_to(deletion_token, 'UTF8'),
        'sha256'
      ),
      'hex'
    )
  returning id into removed_id;

  return removed_id is not null;
end;
$$;

revoke all on function public.delete_own_lab_response(
  uuid, text
) from public;

grant execute on function public.delete_own_lab_response(
  uuid, text
) to anon, authenticated;
