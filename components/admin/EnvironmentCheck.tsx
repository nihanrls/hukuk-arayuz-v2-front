'use client';

import { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCheck } from 'react-icons/fi';

export function EnvironmentCheck() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: boolean;
    supabaseKey: boolean;
  } | null>(null);

  useEffect(() => {
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });
  }, []);

  if (!envStatus) return null;

  const allGood = envStatus.supabaseUrl && envStatus.supabaseKey;

  if (allGood) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <FiAlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            Environment Variables Eksik
          </h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              {envStatus.supabaseUrl ? (
                <FiCheck className="w-4 h-4 text-green-500" />
              ) : (
                <FiAlertTriangle className="w-4 h-4 text-red-500" />
              )}
              <span className={envStatus.supabaseUrl ? 'text-green-700' : 'text-red-700'}>
                NEXT_PUBLIC_SUPABASE_URL
              </span>
            </div>
            <div className="flex items-center gap-2">
              {envStatus.supabaseKey ? (
                <FiCheck className="w-4 h-4 text-green-500" />
              ) : (
                <FiAlertTriangle className="w-4 h-4 text-red-500" />
              )}
              <span className={envStatus.supabaseKey ? 'text-green-700' : 'text-red-700'}>
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </span>
            </div>
          </div>
          <div className="mt-3 text-sm text-red-700">
            <p className="mb-2">Proje kök dizininde <code className="bg-red-100 px-1 rounded">.env.local</code> dosyası oluşturun:</p>
            <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://vapentztyyyfdfffirjr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 