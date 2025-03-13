import { useState } from 'react';
import Link from 'next/link';

export default function SetAdmin() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSetAdmin() {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch('/api/set-admin');
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.message || 'Failed to set user as admin');
      }
    } catch (err) {
      setError('Error: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Set User as Admin</h1>
          <p className="mt-2 text-gray-600">
            This will set user with ID: <span className="font-mono text-sm bg-gray-100 p-1 rounded">f35e13de-b79d-4056-adf2-dfcb9c47ef6c</span> as an admin
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <button
              onClick={handleSetAdmin}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Set as Admin'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                <p className="font-medium">Success!</p>
                <p className="text-sm mt-1">{result.message}</p>
                {result.user && (
                  <div className="mt-2 text-xs bg-white p-2 rounded border border-green-100">
                    <pre>{JSON.stringify(result.user, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-primary-600 hover:text-primary-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 