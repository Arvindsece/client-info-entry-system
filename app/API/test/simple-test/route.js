import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Simple test route working!',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      message: 'POST test route working!',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'POST test failed',
      details: error.message
    }, { status: 500 });
  }
} 