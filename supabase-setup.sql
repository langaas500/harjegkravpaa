-- Supabase tabell for saker (cases)
-- Kjør dette i Supabase SQL Editor

create table if not exists cases (
  id uuid default gen_random_uuid() primary key,
  case_type text not null check (case_type in ('BIL', 'HANDVERK', 'FLYREISER')),
  payload jsonb not null default '{}',
  outcome jsonb,
  status text not null default 'draft' check (status in ('draft', 'completed', 'paid')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for rask oppslag
create index if not exists idx_cases_case_type on cases(case_type);
create index if not exists idx_cases_status on cases(status);
create index if not exists idx_cases_created_at on cases(created_at desc);

-- RLS (Row Level Security) - tillater anonym tilgang
alter table cases enable row level security;

-- Policy: Alle kan lese og skrive (ingen auth)
create policy "Allow anonymous insert" on cases for insert with check (true);
create policy "Allow anonymous select" on cases for select using (true);
create policy "Allow anonymous update" on cases for update using (true);
