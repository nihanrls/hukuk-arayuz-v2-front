'use client';

import { useState } from 'react';
import { BlogManager } from '@/components/admin/BlogManager';
import { ProfileManager } from '@/components/admin/ProfileManager';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { ServiceManager } from '@/components/admin/ServiceManager';
import { FaqManager } from '@/components/admin/FaqManager';
import Link from 'next/link';
import { FiUser, FiFileText, FiSettings, FiTag, FiGrid, FiHelpCircle } from 'react-icons/fi';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'profile' | 'categories' | 'services' | 'faq'>('blogs');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FiSettings className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Paneli
                </h1>
                <p className="text-gray-600 text-sm">İçerik yönetim sistemi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('blogs')}
                className={`${
                  activeTab === 'blogs'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 flex items-center gap-2`}
              >
                <FiFileText className="text-lg" />
                Blog Yazıları
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`${
                  activeTab === 'categories'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 flex items-center gap-2`}
              >
                <FiTag className="text-lg" />
                Kategoriler
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`${
                  activeTab === 'services'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 flex items-center gap-2`}
              >
                <FiGrid className="text-lg" />
                Hizmetler
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`${
                  activeTab === 'faq'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 flex items-center gap-2`}
              >
                <FiHelpCircle className="text-lg" />
                SSS
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 flex items-center gap-2`}
              >
                <FiUser className="text-lg" />
                Profil Yönetimi
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-white">
            {activeTab === 'blogs' && <BlogManager />}
            {activeTab === 'categories' && <CategoryManager />}
            {activeTab === 'services' && <ServiceManager />}
            {activeTab === 'faq' && <FaqManager />}
            {activeTab === 'profile' && <ProfileManager />}
          </div>
        </div>
      </div>
    </div>
  );
} 