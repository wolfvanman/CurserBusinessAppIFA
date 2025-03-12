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
      name: 'Companies',
      value: stats.companies,
      icon: BuildingOfficeIcon,
      href: '/dashboard/companies',
      color: 'bg-blue-500',
    },
    {
      name: 'Users',
      value: stats.users,
      icon: UserGroupIcon,
      href: '/dashboard/users',
      color: 'bg-green-500',
    },
    {
      name: 'Videos',
      value: stats.videos,
      icon: FilmIcon,
      href: '/dashboard/videos',
      color: 'bg-purple-500',
    },
    {
      name: 'Blog Posts',
      value: stats.blogs,
      icon: DocumentTextIcon,
      href: '/dashboard/blog',
      color: 'bg-yellow-500',
    },
    {
      name: 'Emails',
      value: stats.emails,
      icon: EnvelopeIcon,
      href: '/dashboard/emails',
      color: 'bg-red-500',
    },
    {
      name: 'Contact Requests',
      value: stats.contacts,
      icon: ChatBubbleLeftRightIcon,
      href: '/dashboard/contacts',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to the Financial Advisor Portal admin dashboard. Manage companies, users, content, and communications.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${card.color} text-white`}>
                    <card.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{card.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="font-medium text-primary-600 hover:text-primary-700">
                    View all
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Company</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Create a new company profile and set up their portal.</p>
                </div>
                <div className="mt-5">
                  <Link href="/dashboard/companies/new" className="btn-primary inline-flex items-center">
                    Add Company
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upload New Video</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Add a new video to the library for companies and employees.</p>
                </div>
                <div className="mt-5">
                  <Link href="/dashboard/videos/new" className="btn-primary inline-flex items-center">
                    Upload Video
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Create Email Campaign</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Send targeted emails to companies or individual employees.</p>
                </div>
                <div className="mt-5">
                  <Link href="/dashboard/emails/new" className="btn-primary inline-flex items-center">
                    Create Email
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          <div className="mt-5">
            <p className="text-gray-500 text-sm">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 