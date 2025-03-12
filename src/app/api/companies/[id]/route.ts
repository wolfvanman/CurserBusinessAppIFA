import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Company } from '@/models';
import { isAuthenticated, isAdmin, isCompanyMember } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;

    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await dbConnect();

    // Check if user is admin or belongs to the company
    const isUserAdmin = isAdmin(session);
    const isUserCompanyMember = isCompanyMember(session, companyId);

    if (!isUserAdmin && !isUserCompanyMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch company
    const company = await Company.findById(companyId).lean();

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
} 