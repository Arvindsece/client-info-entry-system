import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('Signup debug route called');
    
    const body = await request.json();
    console.log('Received data:', body);
    
    return NextResponse.json({ 
      message: 'Debug signup route working!',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug signup error:', error);
    return NextResponse.json({ 
      error: 'Debug signup route error',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Debug signup route GET working!',
    timestamp: new Date().toISOString()
  });
} 