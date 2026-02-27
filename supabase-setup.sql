-- Supabase tabell for saker (cases)
-- Kjør dette i Supabase SQL Editor

create table if not exists cases (
  id uuid default gen_random_uuid() primary key,
  case_type text not null check (case_type in ('BIL', 'HANDVERK', 'FLYREISER')),
  payload jsonb not null default '{}',
  outcome jsonb,
  status text not null default 'draft' check (status in ('draft', 'completed', 'paid')),
  access_token text unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Legg til access_token hvis tabellen allerede eksisterer
alter table cases add column if not exists access_token text unique;

-- Index for rask oppslag
create index if not exists idx_cases_case_type on cases(case_type);
create index if not exists idx_cases_status on cases(status);
create index if not exists idx_cases_created_at on cases(created_at desc);
create index if not exists idx_cases_access_token on cases(access_token);

-- RLS (Row Level Security) - tillater anonym tilgang
alter table cases enable row level security;

-- Policy: Alle kan lese og skrive (ingen auth)
create policy "Allow anonymous insert" on cases for insert with check (true);
create policy "Allow anonymous select" on cases for select using (true);
create policy "Allow anonymous update" on cases for update using (true);

-- Oppdater status-sjekk til å inkludere betalingsstatuser
alter table cases drop constraint if exists cases_status_check;
alter table cases add constraint cases_status_check
  check (status in ('draft', 'completed', 'paid', 'paid_kravbrev'));

-- Session-cookie tabell for sikker autentisering
create table if not exists case_sessions (
  session_hash text primary key,
  access_token text not null references cases(access_token),
  case_type text not null check (case_type in ('BIL', 'HANDVERK', 'FLYREISER')),
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

create index if not exists idx_case_sessions_access_token on case_sessions(access_token);
create index if not exists idx_case_sessions_expires_at on case_sessions(expires_at);

-- RLS for case_sessions - kun service role skal ha tilgang
alter table case_sessions enable row level security;
-- Ingen anon-policies — kun service_role key har tilgang
