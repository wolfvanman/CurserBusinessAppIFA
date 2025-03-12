'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { FilmIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  isRetirementRelated: boolean;
}

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
}

export default function EmployeePortal() {
  const { data: session } = useSession();
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [videosResponse, blogsResponse] = await Promise.all([
          fetch('/api/videos/featured'),
          fetch('/api/blog/recent'),
        ]);

        if (videosResponse.ok && blogsResponse.ok) {
          const [videosData, blogsData] = await Promise.all([
            videosResponse.json(),
            blogsResponse.json(),
          ]);

          setFeaturedVideos(videosData);
          setRecentBlogs(blogsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Financial Portal</h1>
        <p className="mt-1 text-sm text-gray-600">
          Access financial education resources and videos tailored for you.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {/* Featured Videos Section */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Featured Videos</h2>
              <Link href="/portal/videos" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all videos
              </Link>
            </div>
            
            {featuredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredVideos.map((video) => (
                  <Link key={video._id} href={`/portal/videos/${video._id}`} className="group">
                    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40 bg-gray-200">
                        {video.thumbnail ? (
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FilmIcon className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                          {video.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {video.category}
                          </span>
                          {video.isRetirementRelated && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Retirement
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <FilmIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No videos available</h3>
                <p className="text-gray-500">Check back later for new financial education videos.</p>
              </div>
            )}
          </section>

          {/* Recent Blog Posts Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Blog Posts</h2>
              <Link href="/portal/blog" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all posts
              </Link>
            </div>
            
            {recentBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentBlogs.map((post) => (
                  <Link key={post._id} href={`/portal/blog/${post._id}`} className="group">
                    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-40 md:h-auto md:w-1/3 bg-gray-200">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 md:w-2/3">
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                            {post.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <p className="mt-2 text-xs text-gray-400">
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No blog posts available</h3>
                <p className="text-gray-500">Check back later for new financial insights and articles.</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* Contact Information */}
      <div className="mt-10 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Need Assistance?</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about your financial education resources or need personalized advice, please don't hesitate to contact Phil Handley.
        </p>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Email</p>
            <a href="mailto:phil@arthurbrowns.co.uk" className="text-sm text-primary-600 hover:text-primary-500">
              phil@arthurbrowns.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 