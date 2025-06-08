"use client";

import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

export default function DavaMasraflariCalculator() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
          <FiFileText className="h-5 w-5 mr-2 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">Genel</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Dava Masrafları Hesaplama
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Dava açma harç ve masraflarını hesaplayın.
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Yakında Kullanıma Açılacak</h3>
        <p className="text-gray-600">
          Bu hesaplama aracı şu anda geliştirilme aşamasındadır.
        </p>
      </div>
    </div>
  );
} 