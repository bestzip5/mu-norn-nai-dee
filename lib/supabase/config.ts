export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);
export const isRegistrationEnabled = process.env.NEXT_PUBLIC_ENABLE_REGISTRATION === "true";
