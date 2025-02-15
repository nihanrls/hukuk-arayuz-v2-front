'use client';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import BlogCard from '../../components/blog/blogcard';
import TagFilter from '../../components/blog/tagfilter';
import RecentPosts from '../../components/blog/recentposts';
import Pagination from '../../components/blog/pagination';
import Newsletter from '../../components/blog/newsletter';
import SocialShare from '../../components/blog/socialshare';

// Örnek veri
const tags = [
  "Ceza Hukuku", "Aile Hukuku", "İş Hukuku", "Miras Hukuku", 
  "Borçlar Hukuku", "Ticaret Hukuku", "İdare Hukuku"
];

const blogPosts = [
  {
    id: 1,
    title: "İş Sözleşmesinin Feshi ve Haklar",
    excerpt: "İş sözleşmesinin feshi durumunda işçi ve işveren hakları nelerdir? Detaylı hukuki analiz...",
    author: "Av. Mehmet Yılmaz",
    date: "2024-03-15",
    readTime: "8 dk",
    tags: ["İş Hukuku", "Sözleşmeler"],
    image: "/blog-images/is-hukuku.jpg"
  },
  {
    id: 2,
    title: "Ceza Davalarında Zamanaşımı Süreleri",
    excerpt: "Ceza davalarında zamanaşımı süreleri nelerdir? Hangi durumlarda zamanaşımı uygulanır?",
    author: "Av. Ahmet Demir",
    date: "2024-03-10",
    readTime: "6 dk",
    tags: ["Ceza Hukuku"],
    image: "/blog-images/ceza-hukuku.jpg"
  },
  {
    id: 3,
    title: "Aile Hukuku ve Boşanma Süreci",
    excerpt: "Boşanma süreci nasıl işler? Aile hukuku kapsamında haklarınız nelerdir?",
    author: "Av. Elif Kaya",
    date: "2024-03-05",
    readTime: "7 dk",
    tags: ["Aile Hukuku"],
    image: "/blog-images/aile-hukuku.jpg"
  },
  {
    id: 4,
    title: "Miras Hukuku: Mirasın Paylaşımı",
    excerpt: "Miras paylaşımı nasıl yapılır? Miras hukuku kapsamında dikkat edilmesi gerekenler.",
    author: "Av. Selin Yıldız",
    date: "2024-02-28",
    readTime: "5 dk",
    tags: ["Miras Hukuku"],
    image: "/blog-images/miras-hukuku.jpg"
  },
  {
    id: 5,
    title: "Ticaret Hukuku ve Sözleşmeler",
    excerpt: "Ticaret hukuku kapsamında sözleşmelerin önemi ve geçerlilik şartları.",
    author: "Av. Canan Çelik",
    date: "2024-02-20",
    readTime: "9 dk",
    tags: ["Ticaret Hukuku"],
    image: "/blog-images/ticaret-hukuku.jpg"
  },
  {
    id: 6,
    title: "İdare Hukuku: İdari İşlemler",
    excerpt: "İdari işlemler nelerdir? İdare hukuku kapsamında haklarınız.",
    author: "Av. Oğuzhan Arslan",
    date: "2024-02-15",
    readTime: "6 dk",
    tags: ["İdare Hukuku"],
    image: "/blog-images/idare-hukuku.jpg"
  },
  {
    id: 7,
    title: "Miras Hukuku: Mirasın Paylaşımı",
    excerpt: "Miras paylaşımı nasıl yapılır? Miras hukuku kapsamında dikkat edilmesi gerekenler.",
    author: "Av. Selin Yıldız",
    date: "2024-02-28",
    readTime: "5 dk",
    tags: ["Miras Hukuku"],
    image: "/blog-images/miras-hukuku.jpg"
  },
];

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrelenmiş blogları al
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       post.tags.some(tag => selectedTags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Mevcut sayfadaki blogları al
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
                tags={tags}
                selectedTags={selectedTags}
                onTagSelect={(tag) => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                  setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
                }}
              />
              
              {/* Son Yazılar */}
              <RecentPosts posts={blogPosts.slice(-3)} />
              
              <Newsletter />
              
              <SocialShare 
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title="Hukuk Blogu - Güncel Hukuki Makaleler"
              />
            </div>
          </div>

          {/* Ana Blog İçeriği */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPosts.map(post => (
                <BlogCard key={post.id} post={post} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
