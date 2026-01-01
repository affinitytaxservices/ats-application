function requireVerified(req, res, next) {
  if (!req.user || !req.user.verified) {
    return res.status(403).json({ error: 'Email verification required' });
  }
  next();
}

module.exports = requireVerified;

