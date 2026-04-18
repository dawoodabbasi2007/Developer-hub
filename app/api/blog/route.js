import { supabase } from '../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../lib/authMiddleware';

const makeSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/(^-|-$)/g,'');

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id,title,slug,summary,image,author,tags,is_published,created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return ok(data);
  } catch (e) { return err(e.message, 500); }
}

export async function POST(request) {
  try {
    await requireAdmin(request);
    const { title, content, summary, image, author, tags, isPublished } = await request.json();
    if (!title || !content) return err('Title and content are required');
    const { data, error } = await supabase
      .from('blogs')
      .insert([{ title, slug: makeSlug(title), content, summary: summary||'',
        image: image||'', author: author||'Admin', tags: tags||[], is_published: isPublished||false }])
      .select().single();
    if (error) throw error;
    return ok(data, 201);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
