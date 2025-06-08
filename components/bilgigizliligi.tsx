"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const PrivacyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Görünür olduğunda gözlemciyi kapat
        }
      },
      { threshold: 0.1 } // %10 görünürlükte tetiklenir
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
    <div ref={ref} className="w-full flex justify-between items-center p-8 bg-[#f5f5f0] shadow-md">
      {/* Başlık */}
      <motion.div
        className="w-1/2 pr-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold font-ubuntu text-gray-800">
          Bilgi Gizliliği
        </h2>
      </motion.div>

      {/* Soluk Dikey Çizgi */}
      <div className="h-24 w-[1px] bg-gray-300 opacity-50"></div>

      {/* Açıklama Metni */}
      <motion.div
        className="w-1/2 pl-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <p className="text-lg font-ubuntu text-gray-600">
          Müvekkillerimizin bilgilerinin gizliliği bizim için önceliklidir. Her türlü hukuki bilgi ve belge gizlilik prensiplerine uygun olarak korunur ve asla izinsiz üçüncü kişilerle paylaşılmaz.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyComponent;
