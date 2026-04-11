const supabase = require('../config/supabase');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the Supabase JWT and get the user
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }

    // Attach user to request
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = { protect };
