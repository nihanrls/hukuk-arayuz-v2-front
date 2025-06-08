"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiDownload, FiInfo } from "react-icons/fi";
import { HiCalculator } from "react-icons/hi";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import { formatCurrency } from "@/utils/pdfGenerator";

interface NafakaResult {
  cocukNafakasi: number;
  esNafakasi: number;
  toplamNafaka: number;
  aylikOdeme: number;
}

export default function NafakaCalculator() {
  const [formData, setFormData] = useState({
    aylikGelir: "",
    cocukSayisi: "1",
    esGeliri: "",
    barinmaGideri: "",
    nafakaTuru: "cocuk", // cocuk, es, karma
  });

  const [result, setResult] = useState<NafakaResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNafaka = () => {
    const aylikGelir = parseFloat(formData.aylikGelir) || 0;
    const cocukSayisi = parseInt(formData.cocukSayisi) || 1;
    const esGeliri = parseFloat(formData.esGeliri) || 0;
    const barinmaGideri = parseFloat(formData.barinmaGideri) || 0;

    // Basit nafaka hesaplama formülü (gerçek hesaplama daha karmaşıktır)
    let cocukNafakasi = 0;
    let esNafakasi = 0;

    if (formData.nafakaTuru === "cocuk" || formData.nafakaTuru === "karma") {
      // Çocuk nafakası: Gelirin %25-30'u çocuk sayısına göre
      const cocukOrani = Math.min(0.25 + (cocukSayisi - 1) * 0.05, 0.40);
      cocukNafakasi = aylikGelir * cocukOrani;
    }

    if (formData.nafakaTuru === "es" || formData.nafakaTuru === "karma") {
      // Eş nafakası: Gelir farkının %20-25'i
      const gelirFarki = Math.max(aylikGelir - esGeliri, 0);
      esNafakasi = gelirFarki * 0.20;
    }

    const toplamNafaka = cocukNafakasi + esNafakasi;
    const aylikOdeme = toplamNafaka;

    const calculatedResult: NafakaResult = {
      cocukNafakasi,
      esNafakasi,
      toplamNafaka,
      aylikOdeme,
    };

    setResult(calculatedResult);
    setShowResult(true);
  };

  const resetForm = () => {
    setFormData({
      aylikGelir: "",
      cocukSayisi: "1",
      esGeliri: "",
      barinmaGideri: "",
      nafakaTuru: "cocuk",
    });
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 border border-pink-200 mb-4">
          <FiUsers className="h-5 w-5 mr-2 text-pink-600" />
          <span className="text-sm font-medium text-pink-700">Aile Hukuku</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Nafaka Hesaplama
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Boşanma davalarında çocuk nafakası ve eş nafakası miktarını hesaplayın. 
          Hesaplama sonuçları bilgilendirme amaçlıdır.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <HiCalculator className="mr-2 h-5 w-5 text-blue-600" />
            Hesaplama Bilgileri
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nafaka Türü
              </label>
              <select
                name="nafakaTuru"
                value={formData.nafakaTuru}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cocuk">Çocuk Nafakası</option>
                <option value="es">Eş Nafakası</option>
                <option value="karma">Çocuk + Eş Nafakası</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aylık Net Gelir (TL)
              </label>
              <input
                type="number"
                name="aylikGelir"
                value={formData.aylikGelir}
                onChange={handleInputChange}
                placeholder="Örn: 15000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {(formData.nafakaTuru === "cocuk" || formData.nafakaTuru === "karma") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çocuk Sayısı
                </label>
                <select
                  name="cocukSayisi"
                  value={formData.cocukSayisi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">1 Çocuk</option>
                  <option value="2">2 Çocuk</option>
                  <option value="3">3 Çocuk</option>
                  <option value="4">4+ Çocuk</option>
                </select>
              </div>
            )}

            {(formData.nafakaTuru === "es" || formData.nafakaTuru === "karma") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eşin Aylık Geliri (TL)
                </label>
                <input
                  type="number"
                  name="esGeliri"
                  value={formData.esGeliri}
                  onChange={handleInputChange}
                  placeholder="Örn: 5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aylık Barınma Gideri (TL) - Opsiyonel
              </label>
              <input
                type="number"
                name="barinmaGideri"
                value={formData.barinmaGideri}
                onChange={handleInputChange}
                placeholder="Örn: 3000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateNafaka}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Hesapla
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Temizle
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {showResult && result ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Hesaplama Sonucu</h3>
              
              <div className="space-y-4">
                {result.cocukNafakasi > 0 && (
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <span className="font-medium text-gray-700">Çocuk Nafakası</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₺{result.cocukNafakasi.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}

                {result.esNafakasi > 0 && (
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <span className="font-medium text-gray-700">Eş Nafakası</span>
                    <span className="text-xl font-bold text-green-600">
                      ₺{result.esNafakasi.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
                  <span className="font-bold text-gray-900">Toplam Aylık Nafaka</span>
                  <span className="text-2xl font-bold text-pink-600">
                    ₺{result.toplamNafaka.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <PDFDownloadButton
                  title="Nafaka Hesaplama"
                  category="Aile Hukuku"
                  inputs={{
                    "Nafaka Türü": formData.nafakaTuru === "cocuk" ? "Çocuk Nafakası" : 
                                  formData.nafakaTuru === "es" ? "Eş Nafakası" : "Çocuk + Eş Nafakası",
                    "Aylık Net Gelir": formatCurrency(parseFloat(formData.aylikGelir) || 0),
                    ...(formData.nafakaTuru !== "es" && { "Çocuk Sayısı": `${formData.cocukSayisi} Çocuk` }),
                    ...(formData.nafakaTuru !== "cocuk" && formData.esGeliri && { 
                      "Eşin Aylık Geliri": formatCurrency(parseFloat(formData.esGeliri) || 0) 
                    }),
                    ...(formData.barinmaGideri && { 
                      "Aylık Barınma Gideri": formatCurrency(parseFloat(formData.barinmaGideri) || 0) 
                    })
                  }}
                  results={{
                    ...(result.cocukNafakasi > 0 && { "Çocuk Nafakası": formatCurrency(result.cocukNafakasi) }),
                    ...(result.esNafakasi > 0 && { "Eş Nafakası": formatCurrency(result.esNafakasi) }),
                    "Toplam Aylık Nafaka": formatCurrency(result.toplamNafaka)
                  }}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCalculator className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hesaplama Bekleniyor</h3>
              <p className="text-gray-600">
                Nafaka miktarını öğrenmek için formu doldurun ve hesapla butonuna tıklayın.
              </p>
            </div>
          )}

          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start">
              <FiInfo className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Önemli Bilgiler</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Bu hesaplama tahmini bir değerdir</li>
                  <li>• Mahkeme kararı farklı olabilir</li>
                  <li>• Yaşam koşulları dikkate alınır</li>
                  <li>• Uzman hukuki danışmanlık alın</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 