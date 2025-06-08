'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2, FiArrowRight, FiCopy } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

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
  created_at: string;
  updated_at: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);

  const slug = params.slug as string;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setBlog(data.data);
          // İlgili blog yazılarını getir
          fetchRelatedBlogs(data.data.tags);
        } else {
          toast.error('Blog yazısı bulunamadı');
          router.push('/blog');
        }
      } catch (error) {
        console.error('Blog yazısı alınırken hata oluştu:', error);
        toast.error('Blog yazısı alınırken hata oluştu');
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedBlogs = async (tags?: string[]) => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        
        if (data.success) {
          // Aynı etiketlere sahip diğer blog yazılarını filtrele
          const related = data.data
            .filter((post: BlogPost) => 
              post.slug !== slug && 
              post.tags?.some(tag => tags?.includes(tag))
            )
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      } catch (error) {
        console.error('İlgili blog yazıları alınırken hata oluştu:', error);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} dk`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog?.title || '';

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link kopyalandı!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog yazısı bulunamadı</h1>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Blog sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={blog.cover_image || blog.image_url || "/media/default-blog.jpg"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Geri Dönüş Butonu */}
        <div className="absolute top-8 left-8 z-10">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl hover:bg-white transition-all duration-300 shadow-lg"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Blog'a Dön</span>
          </Link>
        </div>

        {/* Başlık ve Meta Bilgiler - Hero Üzerinde */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl"
            >
              {/* Etiketler */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-ubuntu leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <FiUser className="text-lg" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-lg" />
                  <span>{new Date(blog.created_at).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FiClock className="text-lg" />
                  <span>{calculateReadTime(blog.content)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-10">
          {/* Ana İçerik */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
            >
              {/* Özet */}
              {blog.excerpt && (
                <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    {blog.excerpt}
                  </p>
                </div>
              )}

              {/* İçerik */}
              <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={blog.content} />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-5">
              {/* Paylaşım Butonları */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-[#111C31] flex items-center gap-2 mb-5">
                  <FiShare2 className="text-xl" />
                  Paylaş
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center justify-center w-full h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors group"
                    title="Facebook'ta Paylaş"
                  >
                    <FaFacebook className="text-xl group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center justify-center w-full h-12 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors group"
                    title="Twitter'da Paylaş"
                  >
                    <FaTwitter className="text-xl group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center justify-center w-full h-12 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors group"
                    title="LinkedIn'de Paylaş"
                  >
                    <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center justify-center w-full h-12 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors group"
                    title="WhatsApp'ta Paylaş"
                  >
                    <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center w-full h-12 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors group col-span-2"
                    title="Link Kopyala"
                  >
                    <FiCopy className="text-lg group-hover:scale-110 transition-transform mr-2" />
                    <span className="font-medium text-sm">Link Kopyala</span>
                  </button>
                </div>
              </motion.div>

              {/* Blog Bilgileri */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-[#111C31] mb-5">Makale Bilgileri</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Yayın Tarihi:</span>
                    <span className="font-semibold text-gray-800 text-sm">{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Okuma Süresi:</span>
                    <span className="font-semibold text-blue-600 text-sm">{calculateReadTime(blog.content)}</span>
                  </div>
                  {blog.author && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Yazar:</span>
                      <span className="font-semibold text-gray-800 text-sm">{blog.author}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 text-sm">Kelime Sayısı:</span>
                    <span className="font-semibold text-purple-600 text-sm">{blog.content.split(' ').length}</span>
                  </div>
                </div>
              </motion.div>

              {/* Etiketler */}
              {blog.tags && blog.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-[#111C31] mb-4">Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 hover:shadow-md transition-all duration-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* İlgili Yazılar */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111C31] mb-4 font-ubuntu">
                İlgili Yazılar
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bu konuyla ilgili diğer makalelerimizi de inceleyebilirsiniz.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <motion.div
                  key={relatedBlog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <Link href={`/blog/${relatedBlog.slug || relatedBlog.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedBlog.cover_image || relatedBlog.image_url || "/media/default-blog.jpg"}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      {/* Etiketler */}
                      {relatedBlog.tags && relatedBlog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedBlog.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <h4 className="font-semibold text-[#111C31] group-hover:text-[#6454a4] transition-colors line-clamp-2 mb-2">
                        {relatedBlog.title}
                      </h4>
                      
                      {relatedBlog.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {relatedBlog.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{new Date(relatedBlog.created_at).toLocaleDateString('tr-TR')}</span>
                        <span>{calculateReadTime(relatedBlog.content)}</span>
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
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#111C31] to-[#6454a4]">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-ubuntu">
              Daha Fazla İçerik İçin
            </h2>
            <p className="text-xl text-gray-200 mt-4 mb-8">
              Hukuk alanındaki tüm güncel makalelerimizi keşfedin
            </p>
            <Link
              href="/blog"
              className="inline-block bg-[#6454a4] text-white px-8 py-3 rounded-lg text-lg font-semibold
                       hover:bg-[#5a4a94] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Tüm Makaleleri Görüntüle
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage; 