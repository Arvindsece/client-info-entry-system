import { getCollection } from '../../../app/API/db';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const infoCollection = await getCollection('info');

    if (req.method === 'GET') {
      const info = await infoCollection.findOne({ _id: id });
      
      if (!info) {
        return res.status(404).json({
          error: 'Info not found'
        });
      }

      return res.status(200).json({
        info
      });
    }

    if (req.method === 'PUT') {
      const { title, content, category, author } = req.body;

      if (!title || !content || !category || !author) {
        return res.status(400).json({
          error: 'Title, content, category, and author are required'
        });
      }

      const result = await infoCollection.updateOne(
        { _id: id },
        {
          $set: {
            title,
            content,
            category,
            author,
            updatedAt: new Date()
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({
          error: 'Info not found'
        });
      }

      return res.status(200).json({
        message: 'Info updated successfully'
      });
    }

    if (req.method === 'DELETE') {
      const result = await infoCollection.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          error: 'Info not found'
        });
      }

      return res.status(200).json({
        message: 'Info deleted successfully'
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