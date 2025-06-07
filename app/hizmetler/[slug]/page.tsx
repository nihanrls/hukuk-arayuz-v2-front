'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiUsers, 
  FiBriefcase, 
  FiTrendingUp, 
  FiFileText, 
  FiUmbrella,
  FiSettings,
  FiArrowLeft,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image?: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<any> } = {
  FiShield,
  FiUsers,
  FiBriefcase,
  FiTrendingUp,
  FiFileText,
  FiUmbrella,
  FiSettings
};

const ServiceDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setService(data.data);
        } else {
          setError(data.error || 'Hizmet bulunamadı');
        }
      } catch (error) {
        console.error('Hizmet alınırken hata oluştu:', error);
        setError('Hizmet yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6454a4]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hizmet Bulunamadı</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/hizmetler"
              className="inline-flex items-center px-6 py-3 bg-[#6454a4] text-white rounded-lg hover:bg-[#5a4a94] transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Hizmetlere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || FiSettings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#111C31] via-[#1a2332] to-[#6454a4] text-white py-20 mt-16">
        {service.cover_image && (
          <div className="absolute inset-0">
            <img
              src={service.cover_image}
              alt={service.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111C31]/90 to-[#6454a4]/90"></div>
          </div>
        )}
        
        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/hizmetler"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Hizmetlere Dön
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
                <IconComponent className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-700">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Contact Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Hemen İletişime Geçin
                  </h3>
                  
                  <div className="space-y-4">
                    <Link
                      href="/iletisim"
                      className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#6454a4] to-[#8b5cf6] text-white rounded-xl font-semibold hover:from-[#5a4a94] hover:to-[#7c3aed] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <FiMail className="mr-2" />
                      Danışmanlık Talep Et
                    </Link>
                    
                    <a
                      href="tel:+905551234567"
                      className="w-full inline-flex items-center justify-center px-6 py-4 border-2 border-[#6454a4] text-[#6454a4] rounded-xl font-semibold hover:bg-[#6454a4] hover:text-white transition-all duration-300"
                    >
                      <FiPhone className="mr-2" />
                      Hemen Arayın
                    </a>
                  </div>
                </div>

                {/* Features Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Neden Bizi Tercih Etmelisiniz?
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Uzman avukat kadrosu</span>
                    </div>
                    <div className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Yılların deneyimi</span>
                    </div>
                    <div className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Başarılı dava geçmişi</span>
                    </div>
                    <div className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">7/24 danışmanlık desteği</span>
                    </div>
                    <div className="flex items-start">
                      <FiClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Hızlı çözüm odaklı yaklaşım</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-gradient-to-r from-[#6454a4] to-[#8b5cf6] rounded-2xl shadow-lg p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">
                    Ücretsiz Ön Görüşme
                  </h3>
                  <p className="text-gray-100 mb-4">
                    İlk danışmanlık görüşmeniz ücretsizdir. Durumunuzu değerlendirip size en uygun çözümü sunarız.
                  </p>
                  <div className="text-sm text-gray-200">
                    ⏰ Randevu saatleri: Pazartesi - Cuma, 09:00 - 18:00
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage; 