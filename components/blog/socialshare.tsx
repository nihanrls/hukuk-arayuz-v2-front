import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-bold text-[#111C31] mb-4 font-ubuntu">
        Paylaş
      </h3>
      <div className="flex space-x-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] text-white p-3 rounded-full hover:opacity-90"
        >
          <FaFacebookF size={18} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white p-3 rounded-full hover:opacity-90"
        >
          <FaTwitter size={18} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0A66C2] text-white p-3 rounded-full hover:opacity-90"
        >
          <FaLinkedinIn size={18} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full hover:opacity-90"
        >
          <FaWhatsapp size={18} />
        </a>
      </div>
    </motion.div>
  );
};

export default SocialShare;
