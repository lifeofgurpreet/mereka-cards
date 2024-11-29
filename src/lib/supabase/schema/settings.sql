-- Settings Table and Policies
drop policy if exists "allow_select_settings" on settings;
drop policy if exists "allow_insert_settings" on settings;
drop policy if exists "allow_update_settings" on settings;

create table if not exists "public"."settings" (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  theme jsonb default '{}'::jsonb,
  notifications jsonb default '{}'::jsonb,
  privacy jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table settings enable row level security;

-- Settings Policies
create policy "allow_select_settings"
  on settings for select
  using (user_id = auth.uid());

create policy "allow_insert_settings"
  on settings for insert
  with check (user_id = auth.uid());

create policy "allow_update_settings"
  on settings for update
  using (user_id = auth.uid());

-- Create Index
create index if not exists settings_user_id_idx on settings(user_id);