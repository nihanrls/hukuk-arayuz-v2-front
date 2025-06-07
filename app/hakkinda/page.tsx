"use client";
import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
            <h1 className="text-4xl lg:text-5xl font-bold font-[Crimson] text-gray-800">
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
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-700">Uzmanlık Alanları</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((alan, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                      >
                        {alan}
                      </span>
                    ))}
                  </div>
                </div>
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
                <div className="flex gap-4 pt-4">
                  {profile.social_links.linkedin && (
                    <a 
                      href={profile.social_links.linkedin} 
                      className="text-gray-600 hover:text-[#4352A5] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn size={24} />
                    </a>
                  )}
                  {profile.social_links.twitter && (
                    <a 
                      href={profile.social_links.twitter} 
                      className="text-gray-600 hover:text-[#4352A5] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter size={24} />
                    </a>
                  )}
                  {profile.social_links.instagram && (
                    <a 
                      href={profile.social_links.instagram} 
                      className="text-gray-600 hover:text-[#4352A5] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={24} />
                    </a>
                  )}
                  {profile.social_links.facebook && (
                    <a 
                      href={profile.social_links.facebook} 
                      className="text-gray-600 hover:text-[#4352A5] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF size={24} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Eğitim ve Kariyer Geçmişi */}
      {((profile.education_history && profile.education_history.length > 0) || 
        (profile.career_history && profile.career_history.length > 0)) && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Eğitim Geçmişi */}
                {profile.education_history && profile.education_history.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Eğitim Geçmişi</h2>
                    <div className="space-y-6">
                      {profile.education_history
                        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                        .map((education) => (
                        <div key={education.id} className="border-l-4 border-blue-500 pl-4">
                          <h3 className="font-semibold text-gray-800">{education.degree}</h3>
                          <p className="text-blue-600 font-medium">{education.school}</p>
                          {education.field_of_study && (
                            <p className="text-gray-600">{education.field_of_study}</p>
                          )}
                          <p className="text-sm text-gray-500">
                            {formatDate(education.start_date)} - {
                              education.is_current ? 'Devam ediyor' : 
                              education.end_date ? formatDate(education.end_date) : 'Bilinmiyor'
                            }
                          </p>
                          {education.description && (
                            <p className="text-gray-600 text-sm mt-2">{education.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Kariyer Geçmişi */}
                {profile.career_history && profile.career_history.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Kariyer Geçmişi</h2>
                    <div className="space-y-6">
                      {profile.career_history
                        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                        .map((career) => (
                        <div key={career.id} className="border-l-4 border-green-500 pl-4">
                          <h3 className="font-semibold text-gray-800">{career.position}</h3>
                          <p className="text-green-600 font-medium">{career.company}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(career.start_date)} - {
                              career.is_current ? 'Devam ediyor' : 
                              career.end_date ? formatDate(career.end_date) : 'Bilinmiyor'
                            }
                          </p>
                          {career.description && (
                            <p className="text-gray-600 text-sm mt-2">{career.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* İletişim Yönlendirme Bölümü */}
      <motion.div 
        className="bg-gray-100 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold font-[Crimson] text-gray-800">
              Hukuki Desteğe mi İhtiyacınız Var?
            </h2>
            <p className="text-gray-600 text-lg">
              Size nasıl yardımcı olabileceğimizi öğrenmek için hemen iletişime geçin.
            </p>
            <button
              onClick={handleContactClick}
              className="bg-[#111C30] text-white px-8 py-3 rounded-lg text-lg font-semibold 
                       hover:bg-[#4352A5] transition-colors shadow-lg"
            >
              İletişime Geçin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
