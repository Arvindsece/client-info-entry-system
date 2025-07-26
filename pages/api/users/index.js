import { getCollection } from '../../../app/API/db';

export default async function handler(req, res) {
  try {
    const usersCollection = await getCollection('users');

    if (req.method === 'GET') {
      const { page = 1, limit = 10, role } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      let query = {};
      if (role) {
        query.role = role;
      }

      const [users, total] = await Promise.all([
        usersCollection
          .find(query, { projection: { password: 0 } }) // Exclude password
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .toArray(),
        usersCollection.countDocuments(query)
      ]);

      const totalPages = Math.ceil(total / parseInt(limit));

      return res.status(200).json({
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Users API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
} 