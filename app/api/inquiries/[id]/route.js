import { supabase } from '../../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../../lib/authMiddleware';

export async function PUT(request, { params }) {
  try {
    await requireAdmin(request);
    const { status } = await request.json();
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', params.id).select().single();
    if (error) throw error;
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin(request);
    const { error } = await supabase.from('inquiries').delete().eq('id', params.id);
    if (error) throw error;
    return ok({ message: 'Inquiry deleted successfully' });
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
