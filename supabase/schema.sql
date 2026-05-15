create table if not exists public.workspace_snapshots (
  workspace_key text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.workspace_snapshots enable row level security;

drop policy if exists "workspace_snapshots_select_all_dev" on public.workspace_snapshots;
drop policy if exists "workspace_snapshots_insert_all_dev" on public.workspace_snapshots;
drop policy if exists "workspace_snapshots_update_all_dev" on public.workspace_snapshots;

revoke all on public.workspace_snapshots from anon, authenticated;

create table if not exists public.workspace_events (
  id text primary key,
  workspace_key text not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists workspace_events_workspace_key_created_at_idx
on public.workspace_events (workspace_key, created_at desc);

alter table public.workspace_events enable row level security;

drop policy if exists "workspace_events_select_all_dev" on public.workspace_events;
drop policy if exists "workspace_events_insert_all_dev" on public.workspace_events;

revoke all on public.workspace_events from anon, authenticated;

create table if not exists public.workspace_jobs (
  id text primary key,
  workspace_key text not null,
  job_type text not null,
  status text not null default 'completed',
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workspace_jobs_workspace_key_created_at_idx
on public.workspace_jobs (workspace_key, created_at desc);

alter table public.workspace_jobs enable row level security;

drop policy if exists "workspace_jobs_select_all_dev" on public.workspace_jobs;
drop policy if exists "workspace_jobs_insert_all_dev" on public.workspace_jobs;

revoke all on public.workspace_jobs from anon, authenticated;
