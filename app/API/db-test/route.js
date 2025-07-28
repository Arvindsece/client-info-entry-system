import { NextResponse } from 'next/server';
import { connectToDatabase } from '../db';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    return NextResponse.json({ 
      message: 'Database connection successful!',
      database: db.databaseName,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error.message
    }, { status: 500 });
  }
} 