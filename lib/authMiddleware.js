import { supabase } from './supabase';

// Call this at the top of any protected API route handler.
// Returns the user object or throws a 401 Response.
export async function requireAdmin(request) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    throw new Response(JSON.stringify({ message: 'No token provided' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Response(JSON.stringify({ message: 'Token invalid or expired' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  return user;
}

export function ok(data, status = 200) {
  return Response.json(data, { status });
}

export function err(message, status = 400) {
  return Response.json({ message }, { status });
}
