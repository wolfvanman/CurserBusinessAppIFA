import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Video, User } from '@/models';
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

    // Get user details to check for retirement-related videos
    const userId = session?.user?.id as string;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }
    
    const user = await User.findById(userId);
    const isNearRetirement = user ? isUserNearRetirement(user) : false;
    const userCompanyId = user?.company;

    // Build query based on user's company and retirement status
    const query: any = {
      $or: [
        { isCompanySpecific: false }, // General videos for all users
      ],
    };

    // Add company-specific videos if user has a company
    if (userCompanyId) {
      query.$or.push({
        isCompanySpecific: true,
        companies: userCompanyId,
      });
    }

    // Fetch videos
    let videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // If user is near retirement, prioritize retirement-related videos
    if (isNearRetirement) {
      // Sort to put retirement videos first
      videos.sort((a, b) => {
        if (a.isRetirementRelated && !b.isRetirementRelated) return -1;
        if (!a.isRetirementRelated && b.isRetirementRelated) return 1;
        return 0;
      });
    }

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured videos' },
      { status: 500 }
    );
  }
}

// Helper function to determine if a user is near retirement
function isUserNearRetirement(user: any): boolean {
  if (!user.dateOfBirth) return false;
  
  const today = new Date();
  const birthDate = new Date(user.dateOfBirth);
  const retirementAge = user.retirementAge || 65;
  
  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  // Consider "near retirement" if within 5 years of retirement age
  return age >= retirementAge - 5;
} 