export default function handler(req, res) {
  return res.status(200).json({
    message: 'API is working correctly',
    method: req.method,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: ['/api/auth/signup', '/api/auth/login', '/api/auth/userLogin', '/api/auth/me', '/api/auth/logout'],
      info: ['/api/blogs', '/api/blogs/[id]'],
      users: ['/api/users'],
      health: ['/api/health', '/api/test-db', '/api/test-env']
    }
  });
} 