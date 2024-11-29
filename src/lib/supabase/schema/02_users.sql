-- Drop existing objects
drop trigger if exists update_users_updated_at on users;
drop function if exists update_updated_at_column cascade;
drop policy if exists "allow_select_users" on users;
drop policy if exists "allow_insert_users" on users;
drop policy if exists "allow_update_users" on users;
drop policy if exists "allow_delete_users" on users;

-- Create timestamp update function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Users Table
create table if not exists "public"."users" (
    id uuid references auth.users primary key,
    email text not null unique,
    name text,
    role text default 'member'::text,
    organization_id uuid references organizations(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint valid_role check (role in ('admin', 'member'))
);

-- Enable RLS
alter table users enable row level security;

-- Create the timestamp update trigger
create trigger update_users_updated_at
    before update on users
    for each row
    execute function update_updated_at_column();

-- Create function to get user's organization_id
create or replace function get_user_organization_id()
returns uuid as $$
begin
  return (
    select organization_id
    from users
    where id = auth.uid()
    limit 1
  );
end;
$$ language plpgsql security definer;

-- Create function to get user's role
create or replace function get_user_role()
returns text as $$
begin
  return (
    select role
    from users
    where id = auth.uid()
    limit 1
  );
end;
$$ language plpgsql security definer;

-- Users Policies
create policy "allow_select_users" on users
    for select using (
        -- Users can see themselves
        id = auth.uid()
        or
        -- Users can see others in their organization
        organization_id = get_user_organization_id()
    );

create policy "allow_insert_users" on users
    for insert with check (
        -- Users can insert their own record
        id = auth.uid()
        or
        -- Admins can add users to their organization
        (
            get_user_role() = 'admin'
            and
            organization_id = get_user_organization_id()
        )
    );

create policy "allow_update_users" on users
    for update using (
        -- Users can update their own record
        id = auth.uid()
        or
        -- Admins can update users in their organization
        (
            get_user_role() = 'admin'
            and
            organization_id = get_user_organization_id()
        )
    );

create policy "allow_delete_users" on users
    for delete using (
        -- Only admins can delete users from their organization
        get_user_role() = 'admin'
        and
        organization_id = get_user_organization_id()
    );

-- Create Indexes
create index if not exists users_organization_id_idx on users(organization_id);
create index if not exists users_email_idx on users(email);
create index if not exists users_role_idx on users(role);