'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  author: string | null;
  created_at: string;
  slug: string | null;
}

const MostReadArticles = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomBlogs();
  }, []);

  const fetchRandomBlogs = async () => {
    try {
      const response = await fetch('/api/blogs/random?limit=3');
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      } else {
        console.error('Blog fetch error:', data.error);
      }
    } catch (error) {
      console.error('Random blogs fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBlogUrl = (blog: BlogPost) => {
    return blog.slug ? `/blog/${blog.slug}` : `/blog/${blog.id}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Blog yazıları yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Öne Çıkan Yazılar
            </h2>
            <p className="text-gray-600">Henüz yayınlanmış blog yazısı bulunmuyor.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-[Crimson] text-gray-800 mb-4">
            Öne Çıkan Yazılar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hukuk alanında güncel ve faydalı içeriklerimizi keşfedin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.image_url || "/media/default-blog.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(blog.created_at)}
                  </span>
                  {blog.author && (
                    <span className="text-sm text-blue-600 font-medium">
                      {blog.author}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {blog.title}
                </h3>
                
                {blog.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                )}
                
                <Link 
                  href={getBlogUrl(blog)}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  Devamını Oku
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tüm Blog Yazılarını Görüntüle Butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
            </svg>
            Tüm Blog Yazılarını Görüntüle
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MostReadArticles; 