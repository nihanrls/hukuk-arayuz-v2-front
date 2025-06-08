"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiDownload, FiInfo } from "react-icons/fi";
import { HiCalculator } from "react-icons/hi";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import { formatCurrency } from "@/utils/pdfGenerator";

export default function IhbarTazminatiCalculator() {
  const [formData, setFormData] = useState({
    calismaYili: "",
    gunlukUcret: "",
    ihbarVerildiMi: "hayir",
  });

  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateIhbarTazminati = () => {
    const calismaYili = parseFloat(formData.calismaYili) || 0;
    const gunlukUcret = parseFloat(formData.gunlukUcret) || 0;

    let ihbarSuresi = 0;

    // İhbar süreleri (İş Kanunu md. 17)
    if (calismaYili < 0.5) {
      ihbarSuresi = 0;
    } else if (calismaYili < 1.5) {
      ihbarSuresi = 2; // 2 hafta
    } else if (calismaYili < 3) {
      ihbarSuresi = 4; // 4 hafta
    } else if (calismaYili < 6) {
      ihbarSuresi = 6; // 6 hafta
    } else {
      ihbarSuresi = 8; // 8 hafta
    }

    const ihbarTazminati = formData.ihbarVerildiMi === "hayir" ? gunlukUcret * ihbarSuresi * 7 : 0;

    setResult(ihbarTazminati);
    setShowResult(true);
  };

  const resetForm = () => {
    setFormData({
      calismaYili: "",
      gunlukUcret: "",
      ihbarVerildiMi: "hayir",
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
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4">
          <FiClock className="h-5 w-5 mr-2 text-green-600" />
          <span className="text-sm font-medium text-green-700">İş Hukuku</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          İhbar Tazminatı Hesaplama
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          İş sözleşmesi feshi durumunda ihbar tazminatı miktarını hesaplayın.
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
                Toplam Çalışma Süresi (Yıl)
              </label>
              <input
                type="number"
                step="0.1"
                name="calismaYili"
                value={formData.calismaYili}
                onChange={handleInputChange}
                placeholder="Örn: 2.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Günlük Brüt Ücret (TL)
              </label>
              <input
                type="number"
                name="gunlukUcret"
                value={formData.gunlukUcret}
                onChange={handleInputChange}
                placeholder="Örn: 500"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İhbar Süresi Verildi mi?
              </label>
              <select
                name="ihbarVerildiMi"
                value={formData.ihbarVerildiMi}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hayir">Hayır, İhbar Verilmedi</option>
                <option value="evet">Evet, İhbar Verildi</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateIhbarTazminati}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
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
          {showResult && result !== null ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Hesaplama Sonucu</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <span className="font-bold text-gray-900">İhbar Tazminatı</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₺{result.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <PDFDownloadButton
                  title="İhbar Tazminatı Hesaplama"
                  category="İş Hukuku"
                  inputs={{
                    "Toplam Çalışma Süresi": `${formData.calismaYili} Yıl`,
                    "Günlük Brüt Ücret": formatCurrency(parseFloat(formData.gunlukUcret) || 0),
                    "İhbar Süresi Verildi mi": formData.ihbarVerildiMi === "evet" ? "Evet" : "Hayır"
                  }}
                  results={{
                    "İhbar Tazminatı": formatCurrency(result)
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
                İhbar tazminatı miktarını öğrenmek için formu doldurun.
              </p>
            </div>
          )}

          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start">
              <FiInfo className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">İhbar Süreleri</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• 6 ay - 1.5 yıl: 2 hafta</li>
                  <li>• 1.5 - 3 yıl: 4 hafta</li>
                  <li>• 3 - 6 yıl: 6 hafta</li>
                  <li>• 6 yıl üzeri: 8 hafta</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 