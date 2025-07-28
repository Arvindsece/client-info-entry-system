import { NextResponse } from 'next/server';
import { getCollection } from '../db';
import { generateBlogId } from '../auth';

export async function POST(request) {
  try {
    const { title, content, category, author } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const blogsCollection = await getCollection('blogs');
    const blogId = generateBlogId();

    const newBlog = {
      _id: blogId,
      title,
      content,
      category: category || 'General',
      author: author || 'Anonymous',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await blogsCollection.insertOne(newBlog);

    return NextResponse.json({
      message: 'Blog created successfully',
      blog: newBlog
    }, { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const category = searchParams.get('category');

    const blogsCollection = await getCollection('blogs');
    
    let query = {};
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    
    const blogs = await blogsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await blogsCollection.countDocuments(query);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 