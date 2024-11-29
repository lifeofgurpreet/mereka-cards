-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Organizations Table
create table if not exists "public"."organizations" (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  domain text,
  logo text,
  plan text default 'basic'::text,
  settings jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Users Table
create table if not exists "public"."users" (
  id uuid references auth.users primary key,
  email text not null unique,
  name text,
  role text default 'member'::text,
  organization_id uuid references organizations(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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

-- Settings Table
create table if not exists "public"."settings" (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  theme jsonb default '{}'::jsonb,
  notifications jsonb default '{}'::jsonb,
  privacy jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Analytics Events Table
create table if not exists "public"."analytics_events" (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  event_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Team Invites Table
create table if not exists "public"."team_invites" (
  id uuid default uuid_generate_v4() primary key,
  organization_id uuid references organizations(id),
  email text not null,
  role text default 'member'::text,
  status text default 'pending'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone default timezone('utc'::text, now() + interval '7 days') not null
);

-- Leads Table
create table if not exists "public"."leads" (
  id uuid default uuid_generate_v4() primary key,
  card_id uuid references profiles(id),
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
alter table organizations enable row level security;
alter table users enable row level security;
alter table profiles enable row level security;
alter table settings enable row level security;
alter table analytics_events enable row level security;
alter table team_invites enable row level security;
alter table leads enable row level security;

-- Organization Policies
create policy "allow_select_organization"
  on organizations for select
  using (
    exists (
      select 1 from users
      where users.organization_id = organizations.id
      and users.id = auth.uid()
    )
  );

create policy "allow_insert_organization"
  on organizations for insert
  with check (true);

create policy "allow_update_organization"
  on organizations for update
  using (
    exists (
      select 1 from users
      where users.organization_id = organizations.id
      and users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- Users Policies
create policy "allow_select_users"
  on users for select
  using (
    id = auth.uid()
    OR
    (
      organization_id in (
        select organization_id from users where id = auth.uid()
      )
    )
  );

create policy "allow_insert_users"
  on users for insert
  with check (
    id = auth.uid()
    OR
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
      and users.organization_id = organization_id
    )
  );

create policy "allow_update_users"
  on users for update
  using (
    id = auth.uid()
    OR
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
      and users.organization_id = organization_id
    )
  );

create policy "allow_delete_users"
  on users for delete
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
      and users.organization_id = organization_id
    )
  );

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

-- Analytics Events Policies
create policy "allow_select_analytics"
  on analytics_events for select
  using (user_id = auth.uid());

create policy "allow_insert_analytics"
  on analytics_events for insert
  with check (user_id = auth.uid());

-- Team Invites Policies
create policy "allow_select_invites"
  on team_invites for select
  using (
    exists (
      select 1 from users
      where users.organization_id = team_invites.organization_id
      and users.id = auth.uid()
    )
  );

create policy "allow_insert_invites"
  on team_invites for insert
  with check (
    exists (
      select 1 from users
      where users.organization_id = organization_id
      and users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- Leads Policies
create policy "allow_select_leads"
  on leads for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = leads.card_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "allow_insert_leads"
  on leads for insert
  with check (true);

-- Create Indexes
create index if not exists users_organization_id_idx on users(organization_id);
create index if not exists profiles_user_id_idx on profiles(user_id);
create index if not exists settings_user_id_idx on settings(user_id);
create index if not exists analytics_events_user_id_idx on analytics_events(user_id);
create index if not exists team_invites_organization_id_idx on team_invites(organization_id);
create index if not exists leads_card_id_idx on leads(card_id);

-- Enable Realtime
alter publication supabase_realtime add table organizations;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table settings;
alter publication supabase_realtime add table analytics_events;
alter publication supabase_realtime add table team_invites;
alter publication supabase_realtime add table leads;