const supabase = require('../config/supabase');

// GET /api/portfolio  (Public — active only)
exports.getPublicPortfolio = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/portfolio/all  (Admin)
exports.getAllPortfolio = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/portfolio/:id  (Public)
exports.getPortfolioById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/portfolio  (Admin)
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, image, category, technologies, liveUrl, githubUrl, isActive } = req.body;
    const { data, error } = await supabase
      .from('portfolio')
      .insert([{
        title, description,
        image:        image        || '',
        category:     category     || 'Web Development',
        technologies: technologies || [],
        live_url:     liveUrl      || '',
        github_url:   githubUrl    || '',
        is_active:    isActive !== false,
      }])
      .select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT /api/portfolio/:id  (Admin)
exports.updatePortfolio = async (req, res) => {
  try {
    const { title, description, image, category, technologies, liveUrl, githubUrl, isActive } = req.body;
    const { data, error } = await supabase
      .from('portfolio')
      .update({
        title, description,
        image:        image        || '',
        category:     category     || 'Web Development',
        technologies: technologies || [],
        live_url:     liveUrl      || '',
        github_url:   githubUrl    || '',
        is_active:    isActive,
        updated_at:   new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .select().single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE /api/portfolio/:id  (Admin)
exports.deletePortfolio = async (req, res) => {
  try {
    const { error } = await supabase.from('portfolio').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
