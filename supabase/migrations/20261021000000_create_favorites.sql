create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  dormitory_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, dormitory_id)
);

alter table public.favorites enable row level security;

revoke all on table public.favorites from anon, authenticated;
grant select, insert, delete on table public.favorites to authenticated;

create policy "Users can view their own favorites"
  on public.favorites for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own favorites"
  on public.favorites for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can remove their own favorites"
  on public.favorites for delete
  to authenticated
  using ((select auth.uid()) = user_id);
