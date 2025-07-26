export default function handler(req, res) {
  return res.status(200).json({
    message: 'Environment test',
    mongodb_uri: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
    mongodb_db: process.env.MONGODB_DB ? 'SET' : 'NOT SET',
    jwt_secret: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
    timestamp: new Date().toISOString()
  });
} 