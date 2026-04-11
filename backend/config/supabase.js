const { createClient } = require('@supabase/supabase-js');

// Admin client — uses SERVICE_ROLE_KEY, bypasses Row Level Security
// Use this on the server only. Never expose to frontend.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;
