"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const ClientSupport = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const handleContactClick = () => {
    router.push('/bizeulasin');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-center justify-center w-full p-8 relative"
      style={{
        height: '400px',
        backgroundImage: 'url(/media/clientsupport.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
                    <h2 className="text-4xl font-bold font-ubuntu mb-4 text-white">Her bir danışanımıza yardımcı olmayı amaçlıyoruz. </h2>
            <p className="text-lg text-left font-ubuntu text-gray-200 mb-6">
          Danışanlarımızın ihtiyaçlarını anlamak ve onlara en iyi hizmeti sunmak için buradayız. 
          Her türlü hukuki süreçte yanınızdayız.                                                                 
        </p>
        <button 
          onClick={handleContactClick} 
          className="text-left bg-[#111C30] text-white py-2 px-4 rounded transition duration-300 hover:bg-[#4352A5]"
        >
          Bize Ulaşın
        </button>
      </motion.div>
    </div>
  );
};

export default ClientSupport;
