"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiDownload, FiInfo } from "react-icons/fi";
import { HiCalculator } from "react-icons/hi";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import { formatCurrency } from "@/utils/pdfGenerator";

interface KidemResult {
  brutKidemTazminati: number;
  vergiMatrahi: number;
  gelirVergisi: number;
  damgaVergisi: number;
  netKidemTazminati: number;
  yillikLimit: number;
}

export default function KidemTazminatiCalculator() {
  const [formData, setFormData] = useState({
    baslangicTarihi: "",
    bitisTarihi: "",
    sonMaas: "",
    istenCikarmaNedeni: "isverenFeshi", // isverenFeshi, istifa, emeklilik
  });

  const [result, setResult] = useState<KidemResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateKidemTazminati = () => {
    if (!formData.baslangicTarihi || !formData.bitisTarihi || !formData.sonMaas) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    const baslangic = new Date(formData.baslangicTarihi);
    const bitis = new Date(formData.bitisTarihi);
    const sonMaas = parseFloat(formData.sonMaas) || 0;

    // Çalışma süresini hesapla
    const farkMs = bitis.getTime() - baslangic.getTime();
    const farkGun = Math.floor(farkMs / (1000 * 60 * 60 * 24));
    const calismaYili = farkGun / 365.25;

    // 2024 kıdem tazminatı tavanı (örnek değer)
    const yillikLimit = 22000; // TL
    
    // Brüt kıdem tazminatı hesaplama
    let brutKidemTazminati = 0;
    
    if (formData.istenCikarmaNedeni === "isverenFeshi" || formData.istenCikarmaNedeni === "emeklilik") {
      brutKidemTazminati = Math.min(sonMaas * calismaYili, yillikLimit * calismaYili);
    }

    // Vergi hesaplamaları
    const vergiMatrahi = Math.max(brutKidemTazminati - (yillikLimit * calismaYili), 0);
    const gelirVergisi = vergiMatrahi * 0.20; // %20 gelir vergisi
    const damgaVergisi = brutKidemTazminati * 0.00759; // %0.759 damga vergisi
    
    const netKidemTazminati = brutKidemTazminati - gelirVergisi - damgaVergisi;

    const calculatedResult: KidemResult = {
      brutKidemTazminati,
      vergiMatrahi,
      gelirVergisi,
      damgaVergisi,
      netKidemTazminati,
      yillikLimit,
    };

    setResult(calculatedResult);
    setShowResult(true);
  };

  const resetForm = () => {
    setFormData({
      baslangicTarihi: "",
      bitisTarihi: "",
      sonMaas: "",
      istenCikarmaNedeni: "isverenFeshi",
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
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
          <FiBriefcase className="h-5 w-5 mr-2 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">İş Hukuku</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Kıdem Tazminatı Hesaplama
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          İş sözleşmesi sonunda alacağınız kıdem tazminatı miktarını hesaplayın. 
          Vergi kesintileri dahil net tutarı öğrenin.
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
            Çalışma Bilgileri
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İşe Başlama Tarihi
              </label>
              <input
                type="date"
                name="baslangicTarihi"
                value={formData.baslangicTarihi}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İşten Ayrılma Tarihi
              </label>
              <input
                type="date"
                name="bitisTarihi"
                value={formData.bitisTarihi}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Son Aylık Brüt Maaş (TL)
              </label>
              <input
                type="number"
                name="sonMaas"
                value={formData.sonMaas}
                onChange={handleInputChange}
                placeholder="Örn: 15000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İşten Çıkarma Nedeni
              </label>
              <select
                name="istenCikarmaNedeni"
                value={formData.istenCikarmaNedeni}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="isverenFeshi">İşveren Feshi</option>
                <option value="istifa">İstifa</option>
                <option value="emeklilik">Emeklilik</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateKidemTazminati}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
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
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <span className="font-medium text-gray-700">Brüt Kıdem Tazminatı</span>
                  <span className="text-xl font-bold text-blue-600">
                    ₺{result.brutKidemTazminati.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {result.gelirVergisi > 0 && (
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <span className="font-medium text-gray-700">Gelir Vergisi</span>
                    <span className="text-lg font-semibold text-red-600">
                      -₺{result.gelirVergisi.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                  <span className="font-medium text-gray-700">Damga Vergisi</span>
                  <span className="text-lg font-semibold text-red-600">
                    -₺{result.damgaVergisi.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <span className="font-bold text-gray-900">Net Kıdem Tazminatı</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₺{result.netKidemTazminati.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <PDFDownloadButton
                  title="Kıdem Tazminatı Hesaplama"
                  category="İş Hukuku"
                  inputs={{
                    "İşe Başlama Tarihi": formData.baslangicTarihi,
                    "İşten Ayrılma Tarihi": formData.bitisTarihi,
                    "Son Aylık Brüt Maaş": formatCurrency(parseFloat(formData.sonMaas) || 0),
                    "İşten Çıkarma Nedeni": formData.istenCikarmaNedeni === "isverenFeshi" ? "İşveren Feshi" :
                                           formData.istenCikarmaNedeni === "istifa" ? "İstifa" : "Emeklilik"
                  }}
                  results={{
                    "Brüt Kıdem Tazminatı": formatCurrency(result.brutKidemTazminati),
                    ...(result.gelirVergisi > 0 && { "Gelir Vergisi": `-${formatCurrency(result.gelirVergisi)}` }),
                    "Damga Vergisi": `-${formatCurrency(result.damgaVergisi)}`,
                    "Net Kıdem Tazminatı": formatCurrency(result.netKidemTazminati)
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
                Kıdem tazminatı miktarını öğrenmek için formu doldurun ve hesapla butonuna tıklayın.
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
                  <li>• İstifa durumunda kıdem tazminatı alınamaz</li>
                  <li>• 1 yıldan az çalışanlara ödenmez</li>
                  <li>• Yıllık tavan tutarı değişkenlik gösterir</li>
                  <li>• Hesaplama tahmini değerdir</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 