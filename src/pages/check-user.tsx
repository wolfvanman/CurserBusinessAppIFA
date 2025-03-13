import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CheckUser() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch('/api/check-user');
        const data = await response.json();
        
        if (data.success) {
          setResult(data);
        } else {
          setError(data.message || 'Failed to find user');
        }
      } catch (err) {
        setError('Error: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Check User</h1>
          <p className="mt-2 text-gray-600">Checking user with email: philhandley@hotmail.com</p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <div className="flex justify-center">
                <p>Checking user information...</p>
              </div>
            ) : error ? (
              <div className="text-red-600 p-4 bg-red-50 rounded-md">
                <p className="font-medium">Error</p>
                <p>{error}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">What to do next:</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>The user with email philhandley@hotmail.com doesn't exist in the database</li>
                    <li>You need to create this user in the database</li>
                    <li>Use the form below to create the user</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      User found
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>User details:</p>
                    </div>
                    <div className="mt-2 text-xs bg-white p-2 rounded border border-green-100 overflow-auto">
                      <pre>{JSON.stringify(result?.user, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Create User</h2>
              <Link 
                href="/create-user" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create User Form
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-primary-600 hover:text-primary-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 