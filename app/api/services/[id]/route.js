import { supabase } from '../../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../../lib/authMiddleware';

// GET /api/services/all  — admin, returns all
// GET /api/services/:id  — public, single item
export async function GET(request, { params }) {
  try {
    if (params.id === 'all') {
      await requireAdmin(request);
      const { data, error } = await supabase
        .from('services').select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return ok(data);
    }
    const { data, error } = await supabase
      .from('services').select('*').eq('id', params.id).single();
    if (error) return err('Service not found', 404);
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 500);
  }
}

// PUT /api/services/:id  — admin
export async function PUT(request, { params }) {
  try {
    await requireAdmin(request);
    const { title, description, icon, features, isActive } = await request.json();
    const { data, error } = await supabase
      .from('services')
      .update({ title, description, icon: icon||'', features: features||[], is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', params.id).select().single();
    if (error) throw error;
    if (!data) return err('Service not found', 404);
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}

// DELETE /api/services/:id  — admin
export async function DELETE(request, { params }) {
  try {
    await requireAdmin(request);
    const { error } = await supabase.from('services').delete().eq('id', params.id);
    if (error) throw error;
    return ok({ message: 'Service deleted successfully' });
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
