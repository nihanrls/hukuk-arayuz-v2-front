"use client"
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // İstemci tarafında mount kontrolü

  const slides = [
    {
      id: 1,
      title: "Kaliteli Hizmet",
      description: "Hukuki çözümleriniz için yanınızdayım.",
      image: "/media/herosec/background1.jpg",
      buttonText: "Detaylı Bilgi",
      buttonLink: "/hakkinda"
    },
    {
      id: 2,
      title: "Güvenilir Çözümler",
      description: "20 yıllık tecrübemizle yanınızdayım.",
      image: "/media/herosec/background2.jpg",
      buttonText: "Bize Ulaşın",
      buttonLink: "/bizeulasin"
    },
    {
      id: 3,
      title: "Sıkça Sorulan Sorular",
      description: "Sizin için derlediğimiz sıkça sorulan sorular.",
      image: "/media/herosec/background3.jpg",
      buttonText: "SSS",
      buttonLink: "/sss"
    }
  ];

  // Önceki slide'a geçiş
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Sonraki slide'a geçiş
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Otomatik slider için
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Her 5 saniyede bir değişir

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true); // Bileşen mount olduğunda true yap
  }, []);

  if (!isMounted) return null; // İstemci tarafında render etmeden önce kontrol et

  const buttonClasses = "bg-[#111C31] hover:bg-[#4352A5] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform";

  return (
    <div className="relative h-[800px] lg:h-[900px] w-full overflow-hidden -mt-20 group">
      {/* Slider görselleri */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Arka plan görseli */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* İçerik - Ortalanmış */}
          <div className="relative h-full max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.5 }} // Animasyon süresi
              className="text-center text-white"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 text-gray-100 font-crimson">
                {slide.title}
              </h1>
              <p className="text-3xl mb-8 font-crimson">
                {slide.description}
              </p>
              <Link href={slide.buttonLink}>
                <button className={buttonClasses}>
                  {slide.buttonText}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Sol bölge ve ok */}
      <div className="absolute left-0 top-0 w-[15%] h-full z-20 group/left">
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover/left:opacity-100 transition-opacity duration-300"
          aria-label="Önceki slayt"
        >
          <FaChevronLeft className="text-2xl sm:text-3xl md:text-4xl" />
        </button>
      </div>

      {/* Sağ bölge ve ok */}
      <div className="absolute right-0 top-0 w-[15%] h-full z-20 group/right">
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover/right:opacity-100 transition-opacity duration-300"
          aria-label="Sonraki slayt"
        >
          <FaChevronRight className="text-2xl sm:text-3xl md:text-4xl" />
        </button>
      </div>

      {/* Slider noktaları */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Slayt ${index + 1}'e git`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
