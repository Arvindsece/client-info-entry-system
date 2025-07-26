import { getCollection } from '../app/API/db';

export default async function handler(req, res) {
  try {
    console.log('Testing database connection with new credentials...');
    
    // Test database connection
    const testCollection = await getCollection('test');
    
    // Test write operation
    const testDoc = {
      message: 'Database connection test with new credentials',
      timestamp: new Date(),
      testId: Date.now(),
      credentials: 'arvindb2023cce:1234'
    };
    
    const result = await testCollection.insertOne(testDoc);
    console.log('Write test successful:', result.insertedId);
    
    // Test read operation
    const readResult = await testCollection.findOne({ testId: testDoc.testId });
    console.log('Read test successful:', readResult);
    
    // Clean up test document
    await testCollection.deleteOne({ testId: testDoc.testId });
    console.log('Cleanup successful');
    
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Database connection working with new credentials!',
      database: 'client',
      collection: 'test',
      timestamp: new Date().toISOString(),
      operations: {
        write: 'SUCCESS',
        read: 'SUCCESS',
        cleanup: 'SUCCESS'
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 