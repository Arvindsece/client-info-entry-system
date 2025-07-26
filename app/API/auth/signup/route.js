import { NextResponse } from 'next/server';
import { getCollection } from '../../../API/db';
import { hashPassword, generateUserId } from '../../../API/auth';

export async function POST(request) {
  try {
    console.log('Signup route called');
    
    const body = await request.json();
    console.log('Received data:', body);
    
    const { name, email, password, role = 'user' } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    console.log('Connecting to database...');
    const usersCollection = await getCollection('users');
    console.log('Database connected successfully');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    console.log('Hashing password...');
    const hashedPassword = await hashPassword(password);
    const userId = generateUserId();

    const newUser = {
      _id: userId,
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Inserting user into database...');
    await usersCollection.insertOne(newUser);
    console.log('User inserted successfully');

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: 'User registered successfully',
      user: userWithoutPassword
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 