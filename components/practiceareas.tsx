"use client"
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const practiceAreas = [
  { title: "İş Hukuku", description: "Şirketler hukuku ile ilgili danışmanlık hizmetleri.", image: "/media/workarea/business-law.jpg"},
  { title: "Gayrimenkul Hukuku", description: "Gayrimenkul hukuku konularında uzman rehberlik.", image: "/media/workarea/real-estate-law.jpg" },
  { title: "Medeni Hukuk", description: "Boşanma, velayet ve aile içi anlaşmazlıklar.", image: "/media/workarea/family-law.jpg" },
  { title: "Ceza Hukuku", description: "Ceza hukuku konularında savunma hizmetleri.", image: "/media/workarea/criminal-law.jpg" },
  { title: "Fikri Mülkiyet Hukuku", description: "Fikri mülkiyet hakları koruma danışmanlığı.", image: "/media/workarea/intellectual-property.jpg" },
  { title: "Vergi Hukuku", description: "Vergi hukuku konularında uzman danışmanlık.", image: "/media/workarea/tax-law.jpg" }
];

const PracticeAreas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % practiceAreas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % practiceAreas.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + practiceAreas.length) % practiceAreas.length);
  };

  return (
    <div className="relative w-full py-10 bg-[#f5f5f0] overflow-hidden">
      <div className="text-left mb-8 ml-7">
        <h2 className="text-3xl font-bold font-[Crimson] text-gray-800">Çalışılan Alanlar</h2>
      </div>
      <div className="flex justify-between items-center mb-4 px-4">
        <button onClick={prevSlide} className="p-2 bg-gray-700 text-white rounded-full"><FaArrowLeft /></button>
        <button onClick={nextSlide} className="p-2 bg-gray-700 text-white rounded-full"><FaArrowRight /></button>
      </div>
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {[...practiceAreas, ...practiceAreas.slice(0, visibleItems)].map((area, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4 transition-transform duration-500`}
            >
              <div className="relative bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden group">
                <div className="relative h-64">
                  <img 
                    src={area.image} 
                    alt={area.title} 
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      area.title === "İş Hukuku" ? "object-[center_30%]" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="p-6 transform translate-y-[calc(100%-4rem)] transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                    <p className="text-lg opacity-90">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeAreas;
