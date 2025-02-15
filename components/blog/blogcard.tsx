import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
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
              <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;