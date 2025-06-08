"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiHelpCircle, FiSearch } from 'react-icons/fi';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const FAQ_CATEGORIES = [
  { key: 'all', name: 'Tümü' },
  { key: 'Genel', name: 'Genel' },
  { key: 'Hizmetler', name: 'Hizmetler' },
  { key: 'Ücretler', name: 'Ücretler' },
  { key: 'Süreçler', name: 'Süreçler' },
  { key: 'Acil Durumlar', name: 'Acil Durumlar' }
];

const SSSPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/faq');
      const data = await response.json();
      
      if (data.success) {
        setFaqs(data.data);
      } else {
        console.error('SSS verileri alınırken hata oluştu:', data.error);
      }
    } catch (error) {
      console.error('SSS verileri alınırken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrelenmiş SSS'ler
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Kategoriye göre grupla
  const groupedFaqs = FAQ_CATEGORIES.slice(1).reduce((acc, category) => {
    acc[category.key] = filteredFaqs.filter(faq => faq.category === category.key);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6454a4]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#111C31] to-[#6454a4] py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FiHelpCircle className="mx-auto text-6xl text-white mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-ubuntu">
              Sıkça Sorulan Sorular
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Hukuki süreçler hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-8"
            >
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Sorularda ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6454a4] focus:border-transparent transition-all duration-200 text-lg text-black"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12 justify-center"
            >
              {FAQ_CATEGORIES.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-[#6454a4] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {selectedCategory === 'all' ? (
              // Tüm kategoriler görünümü
              <div className="space-y-12">
                {FAQ_CATEGORIES.slice(1).map(category => {
                  const categoryFaqs = groupedFaqs[category.key];
                  if (categoryFaqs.length === 0) return null;

                  return (
                    <motion.div
                      key={category.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-[#6454a4] to-[#111C31] px-6 py-4">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                          <FiHelpCircle className="mr-3" />
                          {category.name}
                        </h2>
                      </div>
                      
                      <div className="divide-y divide-gray-200">
                        {categoryFaqs.map((faq, index) => (
                          <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6"
                          >
                            <button
                              onClick={() => toggleFaq(faq.id)}
                              className="w-full text-left flex justify-between items-center group"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#6454a4] transition-colors pr-4">
                                {faq.question}
                              </h3>
                              <div className="flex-shrink-0">
                                {expandedFaq === faq.id ? (
                                  <FiChevronUp className="text-[#6454a4] text-xl" />
                                ) : (
                                  <FiChevronDown className="text-gray-400 group-hover:text-[#6454a4] text-xl transition-colors" />
                                )}
                              </div>
                            </button>
                            
                            <AnimatePresence>
                              {expandedFaq === faq.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 overflow-hidden"
                                >
                                  <div className="pt-4 border-t border-gray-100">
                                    <MarkdownRenderer content={faq.answer} />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              // Tek kategori görünümü
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="divide-y divide-gray-200">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left flex justify-between items-center group"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#6454a4] transition-colors pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {expandedFaq === faq.id ? (
                            <FiChevronUp className="text-[#6454a4] text-xl" />
                          ) : (
                            <FiChevronDown className="text-gray-400 group-hover:text-[#6454a4] text-xl transition-colors" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden"
                          >
                            <div className="pt-4 border-t border-gray-100">
                              <MarkdownRenderer content={faq.answer} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <FiHelpCircle className="mx-auto text-6xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'Arama sonucu bulunamadı' : 'Bu kategoride soru bulunmuyor'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Farklı anahtar kelimeler deneyebilir veya kategori filtresini değiştirebilirsiniz.'
                    : 'Diğer kategorilere göz atabilir veya bizimle iletişime geçebilirsiniz.'
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <motion.section 
        className="bg-[#111C31] py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-ubuntu">
              Sorunuzun Cevabını Bulamadınız mı?
            </h2>
            <p className="text-gray-300 text-lg">
              Uzman avukatlarımızla iletişime geçin, size özel çözümler sunalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/bizeulasin"
                className="inline-block bg-[#6454a4] text-white px-8 py-3 rounded-lg text-lg font-semibold 
                         hover:bg-[#5a4a94] transition-colors shadow-lg"
              >
                İletişime Geçin
              </a>
              <a
                href="tel:+90XXXXXXXXXX"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold 
                         hover:bg-white hover:text-[#111C31] transition-colors"
              >
                Hemen Arayın
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SSSPage;