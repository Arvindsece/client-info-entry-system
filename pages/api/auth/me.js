import { getCollection } from '../../../app/API/db';
import { verifyToken } from '../../../app/API/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for auth-token (admin) or user-token (user)
    const authToken = req.cookies['auth-token'];
    const userToken = req.cookies['user-token'];
    
    let token = authToken || userToken;
    
    if (!token) {
      return res.status(401).json({
        error: 'No authentication token found'
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        error: 'Invalid or expired token'
      });
    }

    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    const { password, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
} 