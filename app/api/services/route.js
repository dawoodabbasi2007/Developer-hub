import { supabase } from '../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../lib/authMiddleware';

// GET /api/services  — public, active only
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services').select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return ok(data);
  } catch (e) { return err(e.message, 500); }
}

// POST /api/services  — admin only
export async function POST(request) {
  try {
    await requireAdmin(request);
    const { title, description, icon, features, isActive } = await request.json();
    if (!title || !description) return err('Title and description are required');
    const { data, error } = await supabase
      .from('services')
      .insert([{ title, description, icon: icon||'', features: features||[], is_active: isActive!==false }])
      .select().single();
    if (error) throw error;
    return ok(data, 201);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
