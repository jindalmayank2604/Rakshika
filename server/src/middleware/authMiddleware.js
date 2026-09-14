import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rakshika_secure_jwt_secret_token_2026';

export const authenticateToken = (req, res, next) => {
  let token = null;

  // Check HTTP-only cookie first
  if (req.cookies && req.cookies.wesafe_token) {
    token = req.cookies.wesafe_token;
  }
  // Check Authorization Bearer header
  else if (req.headers['authorization']) {
    const authHeader = req.headers['authorization'];
    token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in to continue.'
    });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.'
    });
  }
};

export const requireAuth = authenticateToken;

export const optionalAuth = (req, res, next) => {
  let token = null;

  if (req.cookies && req.cookies.wesafe_token) {
    token = req.cookies.wesafe_token;
  } else if (req.headers['authorization']) {
    const authHeader = req.headers['authorization'];
    token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  }

  if (token) {
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified;
    } catch {
      // Ignore invalid token for optional auth
    }
  }
  next();
};

