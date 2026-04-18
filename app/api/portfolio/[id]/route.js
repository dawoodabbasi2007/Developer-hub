import { supabase } from '../../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../../lib/authMiddleware';

export async function GET(request, { params }) {
  try {
    if (params.id === 'all') {
      await requireAdmin(request);
      const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return ok(data);
    }
    const { data, error } = await supabase.from('portfolio').select('*').eq('id', params.id).single();
    if (error) return err('Portfolio item not found', 404);
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 500);
  }
}

export async function PUT(request, { params }) {
  try {
    await requireAdmin(request);
    const { title, description, image, category, technologies, liveUrl, githubUrl, isActive } = await request.json();
    const { data, error } = await supabase
      .from('portfolio')
      .update({ title, description, image: image||'', category: category||'Web Development',
        technologies: technologies||[], live_url: liveUrl||'', github_url: githubUrl||'',
        is_active: isActive, updated_at: new Date().toISOString() })
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
    const { error } = await supabase.from('portfolio').delete().eq('id', params.id);
    if (error) throw error;
    return ok({ message: 'Portfolio item deleted successfully' });
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
