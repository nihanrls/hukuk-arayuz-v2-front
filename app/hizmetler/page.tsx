'use client';

import React, { useState, useEffect } from 'react';
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
  FiArrowRight,
  FiPhone,
  FiMail
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

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error('Hizmetler alınırken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#111C31] via-[#1a2332] to-[#6454a4] text-white py-20 mt-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Hukuki Hizmetlerimiz
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Uzman kadromuzla, hukuk alanında kapsamlı ve güvenilir çözümler sunuyoruz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Uzmanlık Alanlarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Her hukuki konuda deneyimli ekibimizle yanınızdayız
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || FiSettings;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/hizmetler/${service.slug}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
                      {/* Cover Image */}
                      {service.cover_image && (
                        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                          <img
                            src={service.cover_image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}
                      
                      <div className="p-8">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-r from-[#6454a4] to-[#8b5cf6] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="text-white text-2xl" />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#6454a4] transition-colors">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {service.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center text-[#6454a4] font-semibold group-hover:text-[#8b5cf6] transition-colors">
                          <span>Detayları İncele</span>
                          <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#111C31] to-[#6454a4] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Hukuki Danışmanlığa İhtiyacınız mı Var?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Uzman avukat kadromuzla, hukuki sorunlarınıza en uygun çözümleri sunuyoruz
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center px-8 py-4 bg-white text-[#111C31] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiMail className="mr-2" />
                İletişime Geçin
              </Link>
              
              <a
                href="tel:+905551234567"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#111C31] transition-all duration-300"
              >
                <FiPhone className="mr-2" />
                Hemen Arayın
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 