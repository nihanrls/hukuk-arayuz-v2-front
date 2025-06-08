import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiClock, FiArrowRight } from 'react-icons/fi';

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
    slug?: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <Link href={`/blog/${post.slug || post.id}`}>
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.image}
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
          
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 font-ubuntu">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FiUser className="text-xs" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiCalendar className="text-xs" />
                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="text-xs" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-3 transition-all duration-300">
            Devamını Oku
            <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;