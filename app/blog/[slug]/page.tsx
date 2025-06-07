'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2 } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6454a4]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog yazısı bulunamadı</h1>
            <Link href="/blog" className="text-[#6454a4] hover:underline">
              Blog sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Geri Dönüş Butonu */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-[#6454a4] hover:text-[#111C31] transition-colors mb-8"
        >
          <FiArrowLeft className="text-lg" />
          <span>Blog'a Geri Dön</span>
        </Link>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Başlık ve Meta Bilgiler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-[#111C31] mb-6 font-ubuntu">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 mb-6">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <FiUser className="text-lg" />
                  <span>{blog.author}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <FiCalendar className="text-lg" />
                <span>{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiClock className="text-lg" />
                <span>{calculateReadTime(blog.content)}</span>
              </div>
            </div>

            {/* Etiketler */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {blog.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-[#6454a4]/10 text-[#6454a4] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Ana Resim */}
          {blog.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg mb-8"
            >
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* İçerik */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-8 mb-8"
          >
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-nunito"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </motion.div>

          {/* Paylaşım Butonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#111C31] flex items-center gap-2">
                <FiShare2 />
                Bu yazıyı paylaş
              </h3>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <FaFacebook />
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                >
                  <FaTwitter />
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
                >
                  <FaLinkedin />
                </button>
                
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp />
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors text-sm"
                >
                  Linki Kopyala
                </button>
              </div>
            </div>
          </motion.div>

          {/* İlgili Blog Yazıları */}
          {relatedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-[#111C31] mb-6 font-ubuntu">
                İlgili Yazılar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map(relatedBlog => (
                  <Link 
                    key={relatedBlog.id} 
                    href={`/blog/${relatedBlog.slug || relatedBlog.id}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {relatedBlog.image_url && (
                        <div className="relative h-32">
                          <Image
                            src={relatedBlog.image_url}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-[#111C31] group-hover:text-[#6454a4] transition-colors line-clamp-2 mb-2">
                          {relatedBlog.title}
                        </h4>
                        
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedBlog.excerpt || relatedBlog.content.substring(0, 100) + '...'}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span>{relatedBlog.author}</span>
                          <span>{new Date(relatedBlog.created_at).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* İletişim Yönlendirme Bölümü */}
      <motion.div 
        className="bg-[#111C31] py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-ubuntu">
              Hukuki Desteğe mi İhtiyacınız Var?
            </h2>
            <p className="text-gray-300 text-lg">
              Size nasıl yardımcı olabileceğimizi öğrenmek için hemen iletişime geçin.
            </p>
            <Link
              href="/bizeulasin"
              className="inline-block bg-[#6454a4] text-white px-8 py-3 rounded-lg text-lg font-semibold 
                       hover:bg-[#5a4a94] transition-colors shadow-lg"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetailPage; 