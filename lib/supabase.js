import { createClient } from '@supabase/supabase-js';

// Server-side admin client — uses SERVICE_ROLE key, bypasses RLS.
// Only import this in /app/api/** files, never in client components.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
