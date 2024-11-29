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

-- Enable RLS
alter table team_invites enable row level security;

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

-- Create Index
create index if not exists team_invites_organization_id_idx on team_invites(organization_id);