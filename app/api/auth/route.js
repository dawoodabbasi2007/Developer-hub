import { supabase } from '../../../lib/supabase';
import { ok, err } from '../../../lib/authMiddleware';

// POST /api/auth  →  body: { action: 'login'|'register', name?, email, password }
export async function POST(request) {
  try {
    const { action, name, email, password } = await request.json();

    if (action === 'register') {
      if (!name || !email || !password)
        return err('Name, email and password are required');

      const { data, error } = await supabase.auth.admin.createUser({
        email, password,
        email_confirm: true,
        user_metadata: { name, role: 'admin' },
      });
      if (error) return err(error.message);
      return ok({ id: data.user.id, email: data.user.email,
        name: data.user.user_metadata.name,
        message: 'Admin account created. You can now log in.' }, 201);
    }

    if (action === 'login') {
      if (!email || !password) return err('Email and password are required');

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return err('Invalid email or password', 401);
      return ok({
        id:    data.user.id,
        email: data.user.email,
        name:  data.user.user_metadata?.name || 'Admin',
        token: data.session.access_token,
      });
    }

    return err('Invalid action', 400);
  } catch (e) {
    return err(e.message, 500);
  }
}

// GET /api/auth  →  returns current user from token
export async function GET(request) {
  try {
    const { requireAdmin } = await import('../../../lib/authMiddleware');
    const user = await requireAdmin(request);
    return ok({ id: user.id, email: user.email, name: user.user_metadata?.name || 'Admin' });
  } catch (res) { return res; }
}
