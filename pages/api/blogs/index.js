import { getCollection } from '../../../app/API/db';
import { generateBlogId } from '../../../app/API/auth';

export default async function handler(req, res) {
  try {
    const infoCollection = await getCollection('info');

    if (req.method === 'GET') {
      const { page = 1, limit = 10, category } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      let query = {};
      if (category) {
        query.category = category;
      }

      const [info, total] = await Promise.all([
        infoCollection
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .toArray(),
        infoCollection.countDocuments(query)
      ]);

      const totalPages = Math.ceil(total / parseInt(limit));

      return res.status(200).json({
        info,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      });
    }

    if (req.method === 'POST') {
      const { title, content, category, author } = req.body;

      if (!title || !content || !category || !author) {
        return res.status(400).json({
          error: 'Title, content, category, and author are required'
        });
      }

      const infoId = generateBlogId();
      const newInfo = {
        _id: infoId,
        title,
        content,
        category,
        author,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await infoCollection.insertOne(newInfo);

      return res.status(201).json({
        message: 'Info created successfully',
        info: newInfo
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Info API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
} 