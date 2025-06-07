'use client';

import { useState } from 'react';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export function StorageSetupGuide() {
  const [showGuide, setShowGuide] = useState(false);

  const sqlCommand = `-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policies for blog images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCommand);
    toast.success('SQL komutu kopyalandı!');
  };

  if (!showGuide) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Storage Kurulumu Gerekli
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Görsel yükleme için Supabase Storage bucket'ı oluşturulmalı.
            </p>
          </div>
          <button
            onClick={() => setShowGuide(true)}
            className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
          >
            Kurulum Rehberi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          Supabase Storage Kurulum Rehberi
        </h3>
        <button
          onClick={() => setShowGuide(false)}
          className="text-blue-600 hover:text-blue-800"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-2">
            Adım 1: Supabase Dashboard'a Git
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            Supabase projenizin dashboard'ına gidin:
          </p>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <FiExternalLink className="w-4 h-4" />
            Supabase Dashboard
          </a>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-2">
            Adım 2: SQL Editor'a Git
          </h4>
          <p className="text-sm text-gray-600">
            Sol menüden "SQL Editor" sekmesine tıklayın.
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-2">
            Adım 3: SQL Komutunu Çalıştır
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Aşağıdaki SQL komutunu kopyalayıp SQL Editor'da çalıştırın:
          </p>
          
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
              {sqlCommand}
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
              title="Kopyala"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-2">
            Adım 4: Kurulumu Doğrula
          </h4>
          <p className="text-sm text-gray-600">
            SQL komutunu çalıştırdıktan sonra bu sayfayı yenileyin ve görsel yüklemeyi deneyin.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">
            💡 İpucu
          </h4>
          <p className="text-sm text-green-700">
            Alternatif olarak, yukarıdaki "Setup Storage" butonunu da deneyebilirsiniz. 
            Bu otomatik kurulum yapmaya çalışır.
          </p>
        </div>
      </div>
    </div>
  );
} 