-- Analytics Events Table
create table if not exists "public"."analytics_events" (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  event_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table analytics_events enable row level security;

-- Drop existing policies if they exist
drop policy if exists "allow_select_analytics" on analytics_events;
drop policy if exists "allow_insert_analytics" on analytics_events;

-- Analytics Events Policies
create policy "allow_select_analytics"
  on analytics_events for select
  using (user_id = auth.uid());

create policy "allow_insert_analytics"
  on analytics_events for insert
  with check (user_id = auth.uid());

-- Create Index
create index if not exists analytics_events_user_id_idx on analytics_events(user_id);