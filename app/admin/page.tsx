'use client';

import { useState } from 'react';
import { BlogManager } from '@/components/admin/BlogManager';
import { AboutManager } from '@/components/admin/AboutManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'about'>('blogs');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Paneli
            </h1>
            <a
              href="/admin/debug"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🔧 Debug & Test
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('blogs')}
                className={`${
                  activeTab === 'blogs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Blog Yazıları
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Hakkımda Bölümleri
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'blogs' && <BlogManager />}
            {activeTab === 'about' && <AboutManager />}
          </div>
        </div>
      </div>
    </div>
  );
} 