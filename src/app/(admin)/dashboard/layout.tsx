'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  FilmIcon, 
  DocumentTextIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Loading } from '@/components/ui';

interface ExtendedSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const extendedSession = session as ExtendedSession | null;

  // Redirect if not authenticated or not an admin
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" />
      </div>
    );
  }

  if (status === 'unauthenticated' || extendedSession?.user?.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <HomeIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
    { 
      name: 'Companies', 
      href: '/dashboard/companies', 
      icon: <BuildingOfficeIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
    { 
      name: 'Users', 
      href: '/dashboard/users', 
      icon: <UserGroupIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
    { 
      name: 'Videos', 
      href: '/dashboard/videos', 
      icon: <FilmIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
    { 
      name: 'Blog', 
      href: '/dashboard/blog', 
      icon: <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
    { 
      name: 'Emails', 
      href: '/dashboard/emails', 
      icon: <EnvelopeIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
    { 
      name: 'Contact Requests', 
      href: '/dashboard/contacts', 
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5 mr-3 text-gray-500" /> 
    },
  ];

  return (
    <DashboardLayout
      title="CurserBusinessAppIFA Admin"
      sidebarItems={sidebarItems}
    >
      {children}
    </DashboardLayout>
  );
} 