import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  readCount: number;
  imageUrl: string;
  date: string;
}

const MostReadArticles = () => {
  // Örnek veri - gerçek uygulamada bu veri API'den gelecek
  const articles: Article[] = [
    {
      id: 1,
      title: "Türkiye'de İş Hukuku Rehberi",
      excerpt: "İş hukuku alanında bilmeniz gereken temel haklar ve yükümlülükler...",
      readCount: 1250,
      imageUrl: "/images/blog1.jpg",
      date: "15 Mart 2024"
    },
    {
      id: 2,
      title: "Boşanma Sürecinde Dikkat Edilmesi Gerekenler",
      excerpt: "Boşanma sürecinde haklarınızı korumak için bilmeniz gerekenler...",
      readCount: 980,
      imageUrl: "/images/blog2.jpg",
      date: "10 Mart 2024"
    },
    {
      id: 3,
      title: "Tüketici Hakları ve Koruma Yolları",
      excerpt: "Tüketici olarak haklarınızı nasıl koruyabilirsiniz?",
      readCount: 850,
      imageUrl: "/images/blog3.jpg",
      date: "5 Mart 2024"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          En Çok Okunan Makaleler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <span className="text-sm text-blue-600">
                    {article.readCount} okunma
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <Link 
                  href={`/blog/${article.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostReadArticles; 