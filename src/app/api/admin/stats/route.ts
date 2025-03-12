import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { User, Company, Video, Blog, Email, Contact } from '@/models';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || !isAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await dbConnect();

    // Fetch counts for each model
    const [
      companiesCount,
      usersCount,
      videosCount,
      blogsCount,
      emailsCount,
      contactsCount,
    ] = await Promise.all([
      Company.countDocuments(),
      User.countDocuments(),
      Video.countDocuments(),
      Blog.countDocuments(),
      Email.countDocuments(),
      Contact.countDocuments(),
    ]);

    // Return the stats
    return NextResponse.json({
      companies: companiesCount,
      users: usersCount,
      videos: videosCount,
      blogs: blogsCount,
      emails: emailsCount,
      contacts: contactsCount,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
} 