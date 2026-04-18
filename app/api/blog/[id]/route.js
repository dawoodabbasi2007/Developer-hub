import { supabase } from '../../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../../lib/authMiddleware';

const makeSlug = (t) => t.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/(^-|-$)/g,'');

export async function GET(request, { params }) {
  try {
    if (params.id === 'all') {
      await requireAdmin(request);
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return ok(data);
    }
    const { data, error } = await supabase.from('blogs').select('*').eq('id', params.id).single();
    if (error) return err('Blog post not found', 404);
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 500);
  }
}

export async function PUT(request, { params }) {
  try {
    await requireAdmin(request);
    const { title, content, summary, image, author, tags, isPublished } = await request.json();
    const updates = { content, summary: summary||'', image: image||'',
      author: author||'Admin', tags: tags||[], is_published: isPublished,
      updated_at: new Date().toISOString() };
    if (title) { updates.title = title; updates.slug = makeSlug(title); }
    const { data, error } = await supabase.from('blogs').update(updates).eq('id', params.id).select().single();
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
    const { error } = await supabase.from('blogs').delete().eq('id', params.id);
    if (error) throw error;
    return ok({ message: 'Blog post deleted successfully' });
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
