const supabase = require('../config/supabase');

// POST /api/meetings  (Public)
exports.bookMeeting = async (req, res) => {
  try {
    const { name, email, phone, date, time, topic } = req.body;
    if (!name || !email || !date || !time) {
      return res.status(400).json({ message: 'Name, email, date, and time are required' });
    }
    const { data, error } = await supabase
      .from('meetings')
      .insert([{ name, email, phone: phone || '', date, time, topic: topic || '', status: 'pending' }])
      .select().single();
    if (error) throw error;
    res.status(201).json({ message: 'Meeting booked successfully!', meeting: data });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// GET /api/meetings  (Admin)
exports.getMeetings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/meetings/:id  (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('meetings')
      .update({ status: req.body.status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select().single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Meeting not found' });
    res.json(data);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// DELETE /api/meetings/:id  (Admin)
exports.deleteMeeting = async (req, res) => {
  try {
    const { error } = await supabase.from('meetings').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Meeting deleted successfully' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
