const supabase = require('../config/supabase');

// GET /api/services  (Public — active only)
exports.getPublicServices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/services/all  (Admin)
exports.getAllServices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/services  (Admin)
exports.createService = async (req, res) => {
  try {
    const { title, description, icon, features, isActive } = req.body;
    const { data, error } = await supabase
      .from('services')
      .insert([{ title, description, icon: icon || '', features: features || [], is_active: isActive !== false }])
      .select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// PUT /api/services/:id  (Admin)
exports.updateService = async (req, res) => {
  try {
    const { title, description, icon, features, isActive } = req.body;
    const { data, error } = await supabase
      .from('services')
      .update({ title, description, icon: icon || '', features: features || [], is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select().single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Service not found' });
    res.json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE /api/services/:id  (Admin)
exports.deleteService = async (req, res) => {
  try {
    const { error } = await supabase.from('services').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Service deleted successfully' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
