"use client";
import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Timeline } from '@/components/ui/Timeline';

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  title: string;
  about: string;
  specialties: string[];
  profile_image_url: string | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  } | null;
  career_history: {
    id: string;
    position: string;
    company: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
    is_current: boolean;
  }[] | null;
  education_history: {
    id: string;
    degree: string;
    school: string;
    field_of_study: string | null;
    start_date: string;
    end_date: string | null;
    description: string | null;
    is_current: boolean;
  }[] | null;
}

const AboutPage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      console.log('🔍 Profile fetch başlatılıyor...');
      const response = await fetch('/api/profile');
      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📋 Response data:', data);
      
      if (data.success && data.data) {
        console.log('✅ Profile set ediliyor:', data.data);
        setProfile(data.data);
      } else {
        console.log('❌ Profile data bulunamadı:', { success: data.success, hasData: !!data.data });
      }
    } catch (error) {
      console.error('💥 Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    router.push('/bizeulasin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long'
    });
  };

  // Timeline helper functions
  const formatPeriod = (startDate: string, endDate: string | null, isCurrent: boolean) => {
    const start = new Date(startDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
    if (isCurrent) return `${start} - Devam Ediyor`;
    if (!endDate) return start;
    const end = new Date(endDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  };

  const convertCareerToTimeline = () => {
    if (!profile?.career_history) return [];
    return profile.career_history
      .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
      .map((career) => ({
        id: career.id,
        title: career.position,
        subtitle: career.company,
        period: formatPeriod(career.start_date, career.end_date, career.is_current),
        description: career.description || undefined,
        isActive: career.is_current
      }));
  };

  const convertEducationToTimeline = () => {
    if (!profile?.education_history) return [];
    return profile.education_history
      .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
      .map((education) => ({
        id: education.id,
        title: education.degree,
        subtitle: education.school,
        period: formatPeriod(education.start_date, education.end_date, education.is_current),
        description: education.field_of_study ? `${education.field_of_study}${education.description ? ` - ${education.description}` : ''}` : education.description || undefined,
        isActive: education.is_current
      }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Eğer profil yoksa varsayılan içerik göster
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Profil Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Henüz profil bilgileri eklenmemiş.</p>
            <button
              onClick={handleContactClick}
              className="bg-[#111C30] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#4352A5] transition-colors"
            >
              İletişime Geçin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ana Profil Bölümü */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sol Taraf - Fotoğraf */}
          <div className="lg:w-1/3">
            <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={profile.profile_image_url || "/media/lawyer-profile.jpg"}
                alt={`${profile.title} ${profile.first_name} ${profile.last_name}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Sağ Taraf - Bilgiler */}
          <div className="lg:w-2/3 space-y-6 ml-4">
            <h1 className="text-4xl lg:text-5xl font-bold font-ubuntu text-gray-800">
              {profile.title} {profile.first_name} {profile.last_name}
            </h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MdEmail className="text-xl" />
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                  className="hover:text-[#4352A5] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.email}
                </a>
              </div>

              {profile.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MdPhone className="text-xl" />
                  <a 
                    href={`tel:${profile.phone}`}
                    className="hover:text-[#4352A5] transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}
              
              {profile.specialties && profile.specialties.length > 0 && (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    Uzmanlık Alanları
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.specialties.map((alan, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      {alan}
                      </motion.span>
                  ))}
                </div>
                </motion.div>
              )}

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-700">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {profile.about}
                </p>
              </motion.div>

              {/* Sosyal Medya Linkleri */}
              {profile.social_links && (
                <motion.div 
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
                    Sosyal Medya
                  </h3>
                  <div className="flex gap-4">
                    {profile.social_links.linkedin && (
                      <motion.a 
                        href={profile.social_links.linkedin} 
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLinkedinIn size={20} />
                      </motion.a>
                    )}
                    {profile.social_links.twitter && (
                      <motion.a 
                        href={profile.social_links.twitter} 
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTwitter size={20} />
                      </motion.a>
                    )}
                    {profile.social_links.instagram && (
                      <motion.a 
                        href={profile.social_links.instagram} 
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaInstagram size={20} />
                      </motion.a>
                    )}
                    {profile.social_links.facebook && (
                      <motion.a 
                        href={profile.social_links.facebook} 
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFacebookF size={20} />
                      </motion.a>
                    )}
              </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Eğitim ve Kariyer Geçmişi */}
      {((profile.education_history && profile.education_history.length > 0) || 
        (profile.career_history && profile.career_history.length > 0)) && (
        <div className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold font-ubuntu text-gray-800 mb-4">
                Profesyonel Geçmiş
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Eğitim ve kariyer yolculuğumda edindiğim deneyimler
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                {/* Eğitim Geçmişi */}
                {profile.education_history && profile.education_history.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Eğitim Geçmişi</h3>
                      <p className="text-gray-600">Akademik yolculuğum</p>
                    </div>
                    <Timeline 
                      items={convertEducationToTimeline()} 
                      className="mt-8"
                    />
                  </motion.div>
                )}

                {/* Kariyer Geçmişi */}
                {profile.career_history && profile.career_history.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Kariyer Geçmişi</h3>
                      <p className="text-gray-600">Profesyonel deneyimlerim</p>
                    </div>
                    <Timeline 
                      items={convertCareerToTimeline()} 
                      className="mt-8"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* İletişim Yönlendirme Bölümü */}
      <motion.div 
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold font-ubuntu text-white mb-4">
              Hukuki Desteğe mi İhtiyacınız Var?
            </h2>
              <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mx-auto">
                Deneyimli hukuk ekibimizle size en iyi hizmeti sunmaya hazırız. 
                Hukuki sorularınız için hemen iletişime geçin.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
              onClick={handleContactClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold 
                         hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 
                         transform hover:scale-105 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                İletişime Geçin
              </motion.button>
              
              {profile.phone && (
                <motion.a
                  href={`tel:${profile.phone}`}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold 
                           hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hemen Ara
                </motion.a>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-blue-200 text-sm"
            >
              📞 7/24 Hukuki Danışmanlık Hizmeti
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
