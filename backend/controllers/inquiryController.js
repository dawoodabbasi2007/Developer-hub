const supabase = require('../config/supabase');

// POST /api/inquiries  (Public)
exports.submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ name, email, phone: phone || '', subject: subject || '', message, status: 'new' }])
      .select().single();
    if (error) throw error;
    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry: data });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// GET /api/inquiries  (Admin)
exports.getInquiries = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/inquiries/:id  (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status: req.body.status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select().single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE /api/inquiries/:id  (Admin)
exports.deleteInquiry = async (req, res) => {
  try {
    const { error } = await supabase.from('inquiries').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
