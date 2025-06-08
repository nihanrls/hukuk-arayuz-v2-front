'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiUser, FiClock, FiArrowRight } from 'react-icons/fi';
import { HiNewspaper } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  cover_image?: string;
  author?: string;
  slug?: string;
  is_published: boolean;
  tags?: string[];
  category_id?: string;
  created_at: string;
  updated_at: string;
}

const POSTS_PER_PAGE = 9;

// Okuma süresi hesaplama fonksiyonu
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} dk`;
};

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Blog yazılarını ve kategorileri fetch et
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Blog yazılarını al
        const blogsResponse = await fetch('/api/blogs');
        const blogsData = await blogsResponse.json();
        
        // Kategorileri al
        const categoriesResponse = await fetch('/api/admin/categories');
        const categoriesData = await categoriesResponse.json();
        
        if (blogsData.success) {
          setBlogPosts(blogsData.data);
          
          // Tüm etiketleri topla
          const tags = new Set<string>();
          blogsData.data.forEach((post: BlogPost) => {
            if (post.tags) {
              post.tags.forEach(tag => tags.add(tag));
            }
          });
          setAllTags(Array.from(tags));
        }

        if (categoriesData.success) {
          setCategories(categoriesData.data.filter((cat: any) => cat.is_active));
        }
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrelenmiş blogları al
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || post.content).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       (post.tags && post.tags.some(tag => selectedTags.includes(tag)));
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory;
    return matchesSearch && matchesTags && matchesCategory;
  });

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Mevcut sayfadaki blogları al
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#111C31] to-[#6454a4] py-20 pt-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-ubuntu">
              Hukuki{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Makaleler
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Hukuk alanındaki güncel gelişmeler, analiz yazıları ve uzman görüşleri ile bilginizi artırın.
            </p>
            
            {/* Arama Çubuğu */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                className="w-full px-6 py-4 border border-white/20 rounded-xl pl-12 focus:outline-none focus:border-white/40 text-black bg-white/90 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sol Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Kategori Filtreleme */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-ubuntu">Kategoriler</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        !selectedCategory 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Tüm Kategoriler
                    </button>
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color || '#6454a4' }}
                        />
                        {category.name}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Etiket Filtreleme */}
                {allTags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-ubuntu">Etiketler</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedTags.includes(tag)
                              ? 'bg-purple-600 text-white shadow-lg' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* İstatistikler */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-ubuntu">İstatistikler</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Toplam Makale</span>
                      <span className="font-bold text-blue-600">{blogPosts.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kategori</span>
                      <span className="font-bold text-purple-600">{categories.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Etiket</span>
                      <span className="font-bold text-green-600">{allTags.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Filtrelenen</span>
                      <span className="font-bold text-orange-600">{filteredPosts.length}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Ana İçerik Alanı */}
            <div className="lg:col-span-3">
              {/* Sonuç Başlığı */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2 font-ubuntu">
                  {searchTerm || selectedCategory || selectedTags.length > 0 
                    ? `Arama Sonuçları (${filteredPosts.length})` 
                    : `Tüm Makaleler (${blogPosts.length})`}
                </h2>
                {(searchTerm || selectedCategory || selectedTags.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {searchTerm && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Arama: "{searchTerm}"
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Kategori: {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                    {selectedTags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Blog Kartları */}
              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Henüz blog yazısı yok</h3>
                  <p className="text-gray-600">Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
                  {(searchTerm || selectedCategory || selectedTags.length > 0) && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setSelectedTags([]);
                        setCurrentPage(1);
                      }}
                      className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Filtreleri Temizle
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <Link href={`/blog/${post.slug || post.id}`}>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.cover_image || post.image_url || "/media/default-blog.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-6">
                          {/* Etiketler */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 font-ubuntu">
                            {post.title}
                          </h3>
                          
                          {post.excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                              {post.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-3">
                              {post.author && (
                                <div className="flex items-center gap-1">
                                  <FiUser className="text-xs" />
                                  <span>{post.author}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <FiCalendar className="text-xs" />
                                <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiClock className="text-xs" />
                              <span>{calculateReadTime(post.content)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-3 transition-all duration-300">
                            <span className="text-sm">Devamını Oku</span>
                            <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Önceki
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
