const supabase = require('../config/supabase');

// ── POST /api/auth/register ──────────────────────────────────────────────
// Run this ONCE to create your admin account, then do not use again.
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,          // skip email confirmation for admin setup
      user_metadata: { name, role: 'admin' },
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      id:    data.user.id,
      email: data.user.email,
      name:  data.user.user_metadata.name,
      message: 'Admin account created. You can now log in.',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/auth/login ─────────────────────────────────────────────────
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      id:    data.user.id,
      email: data.user.email,
      name:  data.user.user_metadata?.name || 'Admin',
      token: data.session.access_token,   // Supabase JWT — used as Bearer token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/auth/me ─────────────────────────────────────────────────────
exports.getMe = async (req, res) => {
  res.json({
    id:    req.user.id,
    email: req.user.email,
    name:  req.user.user_metadata?.name || 'Admin',
  });
};
