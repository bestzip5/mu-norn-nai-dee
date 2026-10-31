-- The automatic RLS event trigger runs internally; API clients do not need
-- to invoke its SECURITY DEFINER function.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
