-- Enable realtime for tables
begin;
  -- Create publication if it doesn't exist
  do $$
  begin
    if not exists (
      select 1 from pg_publication where pubname = 'supabase_realtime'
    ) then
      create publication supabase_realtime;
    end if;
  end;
  $$;

  -- Add tables to publication if they don't exist in it
  do $$
  declare
    table_names text[] := array['organizations', 'users', 'profiles', 'settings', 'analytics_events', 'team_invites', 'leads'];
    table_name text;
  begin
    foreach table_name in array table_names
    loop
      begin
        -- Check if table is already in publication
        if not exists (
          select 1
          from pg_publication_tables
          where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = table_name
        ) then
          -- Add table to publication if it's not already there
          execute format('alter publication supabase_realtime add table %I', table_name);
        end if;
      exception
        when others then
          -- Log error and continue with next table
          raise notice 'Error adding table % to publication: %', table_name, sqlerrm;
      end;
    end loop;
  end;
  $$;
commit;