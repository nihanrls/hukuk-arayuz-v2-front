'use client';

import { useState } from 'react';
import { testSupabaseConnection } from '@/utils/supabase/storage';
import { createClient } from '@/utils/supabase/client';

export default function DebugPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results: any = {};

    // Environment variables kontrolü
    results.envVars = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyValue: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
    };

    // Supabase bağlantı testi
    try {
      results.connectionTest = await testSupabaseConnection();
    } catch (error) {
      results.connectionTest = false;
      results.connectionError = error;
    }

    // Bucket listesi
    try {
      const supabase = createClient();
      console.log('Attempting to list buckets...');
      const { data: buckets, error } = await supabase.storage.listBuckets();
      console.log('Buckets result:', { data: buckets, error });
      results.buckets = { data: buckets, error };
      
      // Direct API call ile de deneyelim
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log('API URL:', supabaseUrl);
      console.log('API Key (first 20 chars):', supabaseKey?.substring(0, 20));
      
      const directResponse = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey!,
          'Content-Type': 'application/json'
        }
      });
      
      if (directResponse.ok) {
        const directBuckets = await directResponse.json();
        results.directBuckets = directBuckets;
        console.log('Direct API buckets:', directBuckets);
      } else {
        const errorText = await directResponse.text();
        results.directError = { status: directResponse.status, error: errorText };
        console.log('Direct API error:', errorText);
      }
    } catch (error) {
      console.error('Bucket listing error:', error);
      results.bucketsError = error;
    }

    setTestResults(results);
    setLoading(false);
  };

  const setupStorage = async () => {
    setSetupLoading(true);
    try {
      const response = await fetch('/api/admin/setup-storage', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Storage kurulumu başarılı: ' + data.message);
        // Testleri tekrar çalıştır
        runTests();
      } else {
        alert('Storage kurulumu başarısız: ' + data.error);
      }
    } catch (error) {
      alert('Storage kurulumu sırasında hata oluştu');
      console.error('Setup error:', error);
    } finally {
      setSetupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Supabase Debug Panel
          </h1>

          <div className="flex gap-4 mb-6">
            <button
              onClick={runTests}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Run Tests'}
            </button>
            
            <button
              onClick={setupStorage}
              disabled={setupLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {setupLoading ? 'Setting up...' : 'Setup Storage'}
            </button>
          </div>

          {Object.keys(testResults).length > 0 && (
            <div className="space-y-6">
              {/* Environment Variables */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                    <span className={testResults.envVars?.supabaseUrl === 'Set' ? 'text-green-600' : 'text-red-600'}>
                      {testResults.envVars?.supabaseUrl}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                    <span className={testResults.envVars?.supabaseAnonKey === 'Set' ? 'text-green-600' : 'text-red-600'}>
                      {testResults.envVars?.supabaseAnonKey}
                    </span>
                  </div>
                  {testResults.envVars?.urlValue && (
                    <div className="text-sm text-gray-600">
                      URL: {testResults.envVars.urlValue}
                    </div>
                  )}
                  {testResults.envVars?.keyValue && (
                    <div className="text-sm text-gray-600">
                      Key: {testResults.envVars.keyValue}
                    </div>
                  )}
                </div>
              </div>

              {/* Connection Test */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
                <div className={`text-lg ${testResults.connectionTest ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults.connectionTest ? 'Success' : 'Failed'}
                </div>
                {testResults.connectionError && (
                  <pre className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    {JSON.stringify(testResults.connectionError, null, 2)}
                  </pre>
                )}
              </div>

              {/* Buckets */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Storage Buckets</h2>
                
                {/* Supabase Client Results */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Supabase Client:</h3>
                  {testResults.buckets?.error ? (
                    <div className="text-red-600">
                      Error: {testResults.buckets.error.message}
                    </div>
                  ) : (
                    <div>
                      <div className="text-green-600 mb-2">
                        Found {testResults.buckets?.data?.length || 0} buckets
                      </div>
                      {testResults.buckets?.data?.map((bucket: any) => (
                        <div key={bucket.id} className="text-sm text-gray-600">
                          - {bucket.name} (ID: {bucket.id})
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct API Results */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Direct API:</h3>
                  {testResults.directError ? (
                    <div className="text-red-600">
                      Error ({testResults.directError.status}): {testResults.directError.error}
                    </div>
                  ) : testResults.directBuckets ? (
                    <div>
                      <div className="text-green-600 mb-2">
                        Found {testResults.directBuckets?.length || 0} buckets
                      </div>
                      {testResults.directBuckets?.map((bucket: any) => (
                        <div key={bucket.id || bucket.name} className="text-sm text-gray-600">
                          - {bucket.name || bucket.id} (ID: {bucket.id})
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500">No direct API results</div>
                  )}
                </div>

                {testResults.bucketsError && (
                  <pre className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    {JSON.stringify(testResults.bucketsError, null, 2)}
                  </pre>
                )}
              </div>

              {/* Raw Results */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Raw Results</h2>
                <pre className="text-sm bg-gray-50 p-4 rounded overflow-auto">
                  {JSON.stringify(testResults, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 