import { NextResponse } from 'next/server';
import { getCollection } from '../db';

export async function GET() {
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
    
    return NextResponse.json({
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
    return NextResponse.json({
      status: 'ERROR',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 