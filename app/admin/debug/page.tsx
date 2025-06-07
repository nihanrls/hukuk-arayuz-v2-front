'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { clientStorage } from '@/utils/supabase/storage';

export default function DebugPage() {
  const [testing, setTesting] = useState(false);
  const [setupping, setSetuppping] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const testConnection = async () => {
    setTesting(true);
    setTestResults(null);
    
    try {
      console.log('🔍 Bağlantı testi başlatılıyor...');
      const result = await clientStorage.testConnection();
      
      setTestResults({
        success: result,
        message: result ? 'Bağlantı başarılı!' : 'Bağlantı başarısız!',
        timestamp: new Date().toLocaleString('tr-TR')
      });
      
      if (result) {
        toast.success('✅ Supabase bağlantısı başarılı!');
      } else {
        toast.error('❌ Supabase bağlantısı başarısız!');
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestResults({
        success: false,
        message: 'Test sırasında hata: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'),
        timestamp: new Date().toLocaleString('tr-TR')
      });
      toast.error('Test sırasında hata oluştu');
    } finally {
      setTesting(false);
    }
  };

  const setupStorage = async () => {
    setSetuppping(true);
    
    try {
      console.log('🚀 Storage kurulumu başlatılıyor...');
      const response = await fetch('/api/admin/setup-storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('✅ ' + data.message);
        console.log('✅ Setup başarılı:', data);
      } else {
        toast.error('❌ ' + data.error);
        console.error('❌ Setup başarısız:', data);
      }
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Setup sırasında hata oluştu');
    } finally {
      setSetuppping(false);
    }
  };

  const cleanupCloudinary = async () => {
    setCleaning(true);
    
    try {
      console.log('🧹 Cloudinary URL temizleme başlatılıyor...');
      const response = await fetch('/api/admin/cleanup-cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`✅ ${data.message}`);
        console.log('✅ Temizleme başarılı:', data);
      } else {
        toast.error('❌ ' + data.error);
        console.error('❌ Temizleme başarısız:', data);
      }
    } catch (error) {
      console.error('Cleanup error:', error);
      toast.error('Temizleme sırasında hata oluştu');
    } finally {
      setCleaning(false);
    }
  };

  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Mevcut' : '❌ Eksik'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            🔧 Storage Debug & Test
          </h1>

          {/* Environment Variables */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📋 Environment Variables
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_URL:</span>
                  <span className="text-sm">{envVars.NEXT_PUBLIC_SUPABASE_URL || '❌ Eksik'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                  <span className="text-sm">{envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🧪 Test İşlemleri
            </h2>
            <div className="flex gap-4">
              <button
                onClick={testConnection}
                disabled={testing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {testing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Test Ediliyor...
                  </>
                ) : (
                  '🔍 Bağlantıyı Test Et'
                )}
              </button>

              <button
                onClick={setupStorage}
                disabled={setupping}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {setupping ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Kuruluyor...
                  </>
                ) : (
                  '🚀 Storage Kurulumu'
                )}
              </button>

              <button
                onClick={cleanupCloudinary}
                disabled={cleaning}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {cleaning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Temizleniyor...
                  </>
                ) : (
                  '🧹 Cloudinary URL Temizle'
                )}
              </button>
            </div>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                📊 Test Sonuçları
              </h2>
              <div className={`rounded-lg p-4 ${testResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-lg ${testResults.success ? 'text-green-600' : 'text-red-600'}`}>
                    {testResults.success ? '✅' : '❌'}
                  </span>
                  <span className={`font-medium ${testResults.success ? 'text-green-800' : 'text-red-800'}`}>
                    {testResults.message}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Test zamanı: {testResults.timestamp}
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📖 Kurulum Talimatları
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Önce <strong>"Bağlantıyı Test Et"</strong> butonuna tıklayın</li>
                <li>Bağlantı başarılıysa <strong>"Storage Kurulumu"</strong> butonuna tıklayın</li>
                <li>Cloudinary URL hatası alıyorsanız <strong>"Cloudinary URL Temizle"</strong> butonuna tıklayın</li>
                <li>Kurulum tamamlandıktan sonra blog yönetim sayfasında görsel yüklemeyi deneyin</li>
                <li>Sorun devam ederse Supabase dashboard'dan manuel bucket oluşturun</li>
              </ol>
            </div>
          </div>

          {/* Manual Setup Guide */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🛠️ Manuel Kurulum (Gerekirse)
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                Otomatik kurulum çalışmazsa Supabase Dashboard'dan manuel olarak:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Supabase projenizin Dashboard'ına gidin</li>
                <li>Sol menüden "Storage" seçin</li>
                <li>"Create a new bucket" butonuna tıklayın</li>
                <li>Bucket adı: <code className="bg-gray-200 px-1 rounded">blog-images</code></li>
                <li>"Public bucket" seçeneğini işaretleyin</li>
                <li>"Save" butonuna tıklayın</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 