-- Profiles Table
create table if not exists "public"."profiles" (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  name text,
  title text,
  bio text,
  avatar text,
  company text,
  company_logo text,
  theme jsonb default '{"primary": "#4F46E5", "secondary": "#818CF8"}'::jsonb,
  social jsonb default '{}'::jsonb,
  contact jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Profiles Policies
create policy "allow_select_profiles"
  on profiles for select
  using (true);

create policy "allow_insert_profiles"
  on profiles for insert
  with check (user_id = auth.uid());

create policy "allow_update_profiles"
  on profiles for update
  using (user_id = auth.uid());

-- Create Index
create index if not exists profiles_user_id_idx on profiles(user_id);