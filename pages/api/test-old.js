export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Old API format working!',
    timestamp: new Date().toISOString()
  });
} 