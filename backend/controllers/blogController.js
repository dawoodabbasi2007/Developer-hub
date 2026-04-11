const supabase = require('../config/supabase');

// GET /api/blog  (Public — published only)
exports.getPublishedBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, summary, image, author, tags, is_published, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blog/all  (Admin)
exports.getAllBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/blog/:id  (Public)
exports.getBlogById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) return res.status(404).json({ message: 'Blog post not found' });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Helper: generate slug from title
const makeSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '');

// POST /api/blog  (Admin)
exports.createBlog = async (req, res) => {
  try {
    const { title, content, summary, image, author, tags, isPublished } = req.body;
    const { data, error } = await supabase
      .from('blogs')
      .insert([{
        title,
        slug:         makeSlug(title),
        content,
        summary:      summary      || '',
        image:        image        || '',
        author:       author       || 'Admin',
        tags:         tags         || [],
        is_published: isPublished  || false,
      }])
      .select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT /api/blog/:id  (Admin)
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, summary, image, author, tags, isPublished } = req.body;
    const updates = {
      content,
      summary:      summary     || '',
      image:        image       || '',
      author:       author      || 'Admin',
      tags:         tags        || [],
      is_published: isPublished,
      updated_at:   new Date().toISOString(),
    };
    if (title) { updates.title = title; updates.slug = makeSlug(title); }

    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', req.params.id)
      .select().single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Blog post not found' });
    res.json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE /api/blog/:id  (Admin)
exports.deleteBlog = async (req, res) => {
  try {
    const { error } = await supabase.from('blogs').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
