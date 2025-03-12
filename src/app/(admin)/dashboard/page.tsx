'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  FilmIcon, 
  DocumentTextIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle, Loading, PageHeader } from '@/components/ui';

interface DashboardStats {
  companies: number;
  users: number;
  videos: number;
  blogs: number;
  emails: number;
  contacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    companies: 0,
    users: 0,
    videos: 0,
    blogs: 0,
    emails: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Companies',
      value: stats.companies,
      icon: <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />,
      href: '/dashboard/companies',
    },
    {
      title: 'Users',
      value: stats.users,
      icon: <UserGroupIcon className="h-8 w-8 text-primary-600" />,
      href: '/dashboard/users',
    },
    {
      title: 'Videos',
      value: stats.videos,
      icon: <FilmIcon className="h-8 w-8 text-primary-600" />,
      href: '/dashboard/videos',
    },
    {
      title: 'Blog Posts',
      value: stats.blogs,
      icon: <DocumentTextIcon className="h-8 w-8 text-primary-600" />,
      href: '/dashboard/blog',
    },
    {
      title: 'Scheduled Emails',
      value: stats.emails,
      icon: <EnvelopeIcon className="h-8 w-8 text-primary-600" />,
      href: '/dashboard/emails',
    },
    {
      title: 'Contact Requests',
      value: stats.contacts,
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600" />,
      href: '/dashboard/contacts',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your financial advisor portal"
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {statCards.map((card) => (
            <Link key={card.title} href={card.href} className="block">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New user registered</p>
                  <p className="text-sm text-gray-500">John Doe from Acme Inc.</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <FilmIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New video uploaded</p>
                  <p className="text-sm text-gray-500">Introduction to Pension Schemes</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New contact request</p>
                  <p className="text-sm text-gray-500">Jane Smith from XYZ Corp</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 