const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) {
    const isDev = process.env.NODE_ENV !== 'production';
    const allowDevAnon = (process.env.ALLOW_DEV_ANON || '0') === '1';
    if (isDev && allowDevAnon) {
      req.user = { id: 0, email: 'dev@local', role: 'admin' };
      return next();
    }
    return res.status(401).json({ error: 'Missing auth header' });
  }

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid auth header format' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = payload; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
