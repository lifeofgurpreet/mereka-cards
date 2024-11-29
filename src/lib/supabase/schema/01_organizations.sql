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

-- Enable RLS
alter table organizations enable row level security;

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