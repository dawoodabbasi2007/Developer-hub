import { supabase } from '../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../lib/authMiddleware';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('portfolio').select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return ok(data);
  } catch (e) { return err(e.message, 500); }
}

export async function POST(request) {
  try {
    await requireAdmin(request);
    const { title, description, image, category, technologies, liveUrl, githubUrl, isActive } = await request.json();
    if (!title || !description) return err('Title and description are required');
    const { data, error } = await supabase
      .from('portfolio')
      .insert([{ title, description, image: image||'', category: category||'Web Development',
        technologies: technologies||[], live_url: liveUrl||'', github_url: githubUrl||'', is_active: isActive!==false }])
      .select().single();
    if (error) throw error;
    return ok(data, 201);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 400);
  }
}
