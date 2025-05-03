import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    try {
      const date = new Date(post.date);
      setFormattedDate(date.toLocaleDateString('tr-TR'));
    } catch (error) {
      console.error('Date formatting error:', error);
      setFormattedDate(post.date);
    }
  }, [post.date]);

  console.log('BlogCard rendering with post:', {
    id: post.id,
    title: post.title,
    image: post.image
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border-2 border-red-500"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48 bg-gray-200">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                console.error('Image load error:', e);
                const target = e.target as HTMLImageElement;
                target.src = '/default-blog-image.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm text-[#6454a4] bg-[#6454a4]/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold text-[#111C31] mb-2 font-ubuntu">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2 font-nunito">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 font-nunito">
            <span>{post.author}</span>
            <div className="flex items-center gap-4">
              <span>{formattedDate}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;