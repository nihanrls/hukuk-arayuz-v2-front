'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import BlogCard from '../../components/blog/blogcard';
import TagFilter from '../../components/blog/tagfilter';
import RecentPosts from '../../components/blog/recentposts';
import Pagination from '../../components/blog/pagination';
import SocialShare from '../../components/blog/socialshare';

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
  created_at: string;
  updated_at: string;
}

// BlogCard için uyumlu format
interface BlogCardPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug?: string;
}

// RecentPosts için uyumlu format
interface RecentPost {
  id: number;
  title: string;
  date: string;
  image: string;
  slug?: string;
}

const POSTS_PER_PAGE = 6;

// Okuma süresi hesaplama fonksiyonu
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} dk`;
};

// BlogPost'u BlogCardPost formatına çevirme
const convertToBlogCardPost = (post: BlogPost): BlogCardPost => ({
  id: parseInt(post.id.replace(/-/g, '').substring(0, 8), 16), // UUID'yi number'a çevir
  title: post.title,
  excerpt: post.excerpt || post.content.substring(0, 150) + '...',
  author: post.author || 'Anonim',
  date: new Date(post.created_at).toLocaleDateString('tr-TR'),
  readTime: calculateReadTime(post.content),
  tags: post.tags || [],
  image: post.cover_image || post.image_url || '/blog-images/default.jpg',
  slug: post.slug
});

// BlogPost'u RecentPost formatına çevirme
const convertToRecentPost = (post: BlogPost): RecentPost => ({
  id: parseInt(post.id.replace(/-/g, '').substring(0, 8), 16), // UUID'yi number'a çevir
  title: post.title,
  date: new Date(post.created_at).toLocaleDateString('tr-TR'),
  image: post.cover_image || post.image_url || '/blog-images/default.jpg',
  slug: post.slug
});

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Blog yazılarını fetch et
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        
        if (data.success) {
          setBlogPosts(data.data);
          
          // Tüm etiketleri topla
          const tags = new Set<string>();
          data.data.forEach((post: BlogPost) => {
            if (post.tags) {
              post.tags.forEach(tag => tags.add(tag));
            }
          });
          setAllTags(Array.from(tags));
        }
      } catch (error) {
        console.error('Blog yazıları alınırken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filtrelenmiş blogları al
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || post.content).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       (post.tags && post.tags.some(tag => selectedTags.includes(tag)));
    return matchesSearch && matchesTags;
  });

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Mevcut sayfadaki blogları al
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // BlogCard formatına çevir
  const currentPostsForCard = currentPosts.map(convertToBlogCardPost);
  const recentPostsForCard = blogPosts.slice(-3).map(convertToRecentPost);

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Başlık ve Arama Çubuğu */}
        <div className="text-center mb-12 mt-16">
          <h1 className="text-4xl font-bold text-[#111C31] mb-8 font-ubuntu">
            Hukuk Blogu
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Blog yazılarında ara..."
              className="w-full px-6 py-4 border border-gray-200 rounded-lg pl-12 focus:outline-none focus:border-[#6454a4] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sol Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-8">
              {/* Etiket Filtreleme */}
              <TagFilter 
                tags={allTags}
                selectedTags={selectedTags}
                onTagSelect={(tag: string) => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                  setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
                }}
              />
              
              {/* Son Yazılar */}
              <RecentPosts posts={recentPostsForCard} />
              
              <SocialShare 
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title="Hukuk Blogu - Güncel Hukuki Makaleler"
              />
            </div>
          </div>

          {/* Ana Blog İçeriği */}
          <div className="lg:col-span-3 space-y-8">
            {currentPostsForCard.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm || selectedTags.length > 0 
                    ? 'Arama kriterlerinize uygun blog yazısı bulunamadı.' 
                    : 'Henüz blog yazısı bulunmuyor.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPostsForCard.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {/* Sayfalama */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
