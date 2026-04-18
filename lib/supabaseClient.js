import { createClient } from '@supabase/supabase-js';

// Browser-safe client — only used for auth (login/logout/getSession).
// Uses the anon key which is safe to expose.
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
