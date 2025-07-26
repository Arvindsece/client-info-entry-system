import { NextResponse } from 'next/server';
import { getCollection } from '../../../API/db';
import { verifyToken } from '../../../API/auth';

export async function GET(request) {
  try {
    const authToken = request.cookies.get('auth-token')?.value;
    const userToken = request.cookies.get('user-token')?.value;
    
    const token = authToken || userToken;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne(
      { _id: decoded.userId },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 