import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Blog } from '@/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await dbConnect();

    // Fetch published blog posts
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent blog posts' },
      { status: 500 }
    );
  }
} 