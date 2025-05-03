'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import BlogCard from '../../components/blog/blogcard';
import TagFilter from '../../components/blog/tagfilter';
import RecentPosts from '../../components/blog/recentposts';
import Pagination from '../../components/blog/pagination';
import SocialShare from '../../components/blog/socialshare';
import { getBlogPosts, BlogPost } from '../../lib/api';
import axios from 'axios';

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getBlogPosts(currentPage, POSTS_PER_PAGE);
        
        if (!response || !response.data) {
          throw new Error('No data received from server');
        }

        console.log('Blog posts received:', response.data);
        setBlogPosts(response.data);
        setTotalPages(response.meta?.pagination?.pageCount || 1);
      } catch (error) {
        console.error('Error in blog page:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 500) {
            setError('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
          } else if (error.response?.status === 404) {
            setError('Blog yazıları bulunamadı.');
          } else {
            setError('Blog yazıları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
          }
        } else {
          setError('Blog yazıları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Filtrelenmiş blogları al
  const filteredPosts = blogPosts.filter(post => {
    if (!post || !post.attributes) return false;
    
    const matchesSearch = post.attributes.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.attributes.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       (post.attributes.tags?.some(tag => selectedTags.includes(tag)) ?? false);
    return matchesSearch && matchesTags;
  });

  // Mevcut sayfadaki blogları al
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Tüm etiketleri topla
  const allTags = Array.from(new Set(
    blogPosts
      .filter(post => post?.attributes?.tags)
      .flatMap(post => post.attributes.tags)
  ));

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

        {error ? (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        ) : loading ? (
          <div className="text-center py-12">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sol Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-8">
                {/* Etiket Filtreleme */}
                <TagFilter 
                  tags={allTags}
                  selectedTags={selectedTags}
                  onTagSelect={(tag) => {
                    setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                    setCurrentPage(1);
                  }}
                />
                
                {/* Son Yazılar */}
                <RecentPosts posts={blogPosts
                  .filter(post => post?.attributes)
                  .slice(-3)
                  .map(post => ({
                    id: post.id,
                    title: post.attributes.title,
                    date: post.attributes.date,
                    image: post.attributes.image?.data?.attributes?.url || ''
                  }))} />
                
                <SocialShare 
                  url={shareUrl}
                  title="Hukuk Blogu - Güncel Hukuki Makaleler"
                />
              </div>
            </div>

            {/* Ana Blog İçeriği */}
            <div className="lg:col-span-3 space-y-8">
              {blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  Henüz blog yazısı bulunmamaktadır.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPosts.map(post => (
                      <BlogCard 
                        key={post.id} 
                        post={{
                          id: post.id,
                          title: post.attributes.title,
                          excerpt: post.attributes.excerpt,
                          author: post.attributes.author,
                          date: post.attributes.date,
                          readTime: post.attributes.readTime,
                          tags: post.attributes.tags || [],
                          image: post.attributes.image?.data?.attributes?.url || ''
                        }} 
                      />
                    ))}
                  </div>
                  
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
