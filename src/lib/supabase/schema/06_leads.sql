-- Drop existing table if it exists
drop table if exists "public"."leads";

-- Leads Table
create table "public"."leads" (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id), -- Changed from card_id to profile_id
  name text not null,
  email text not null,
  phone text,
  company text,
  notes text,
  status text default 'new'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table leads enable row level security;

-- Drop existing policies if they exist
drop policy if exists "allow_select_leads" on leads;
drop policy if exists "allow_insert_leads" on leads;

-- Leads Policies
create policy "allow_select_leads"
  on leads for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = leads.profile_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "allow_insert_leads"
  on leads for insert
  with check (true);

-- Create Index
create index if not exists leads_profile_id_idx on leads(profile_id);