import Link from 'next/link';
import Image from 'next/image';

interface RecentPostsProps {
  posts: {
    id: number;
    title: string;
    date: string;
    image: string;
    slug?: string;
  }[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-[#111C31] mb-4 font-ubuntu">
        Son Yazılar
      </h3>
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
            <div className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111C31] group-hover:text-[#6454a4] transition-colors duration-200 font-nunito">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 font-nunito">
                  {new Date(post.date).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;