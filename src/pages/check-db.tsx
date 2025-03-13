import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CheckDatabase() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkDatabase() {
      try {
        const response = await fetch('/api/check-supabase');
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError('Failed to check database: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    checkDatabase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Database Connection Check</h1>
          <p className="mt-2 text-gray-600">Checking connection to Supabase and verifying tables</p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <div className="flex justify-center">
                <p>Checking database connection...</p>
              </div>
            ) : error ? (
              <div className="text-red-600">
                <p>{error}</p>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        {result?.success ? 'Successfully connected to Supabase' : 'Failed to connect to Supabase'}
                      </h3>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2">Table Status:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Table
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Row Count
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Error
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result?.tables && Object.entries(result.tables).map(([tableName, tableInfo]: [string, any]) => (
                        <tr key={tableName}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {tableName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tableInfo.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {tableInfo.exists ? 'Exists' : 'Missing'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tableInfo.count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                            {tableInfo.error || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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