import jwt from 'jsonwebtoken';

export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: true, message: 'Access token required' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: true, message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};
