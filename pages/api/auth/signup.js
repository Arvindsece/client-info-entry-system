import { getCollection } from '../../../app/API/db';
import { hashPassword, generateUserId } from '../../../app/API/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Signup route called');
    
    const { name, email, password, role = 'user' } = req.body;
    console.log('Received data:', { name, email, role });

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }

    console.log('Connecting to database...');
    const usersCollection = await getCollection('users');
    console.log('Database connected successfully');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email already exists'
      });
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

    return res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
} 