"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FiArrowRight, 
  FiUsers, 
  FiBriefcase, 
  FiHome, 
  FiFileText, 
  FiDollarSign, 
  FiClock 
} from "react-icons/fi";
import { 
  HiCalculator,
  HiScale
} from "react-icons/hi";
import { MdGavel } from "react-icons/md";

const calculators = [
  {
    title: "Nafaka Hesaplama",
    description: "Boşanma davalarında nafaka miktarını hesaplayın",
    icon: FiUsers,
    href: "/hesaplamalar/nafaka-hesaplama",
    category: "Aile Hukuku",
    gradient: "from-slate-600 to-slate-700",
    features: ["Temel nafaka", "Çocuk nafakası", "Eş nafakası", "Yasal oranlar"],
  },
  {
    title: "Kıdem Tazminatı",
    description: "İş sözleşmesi sonunda kıdem tazminatı hesaplayın",
    icon: FiBriefcase,
    href: "/hesaplamalar/kidem-tazminati",
    category: "İş Hukuku",
    gradient: "from-blue-700 to-blue-800",
    features: ["Çalışma süresi", "Son maaş", "Yasal limitler", "Vergi hesabı"],
  },
  {
    title: "İhbar Tazminatı",
    description: "İş sözleşmesi feshi ihbar tazminatı hesaplayın",
    icon: FiClock,
    href: "/hesaplamalar/ihbar-tazminati",
    category: "İş Hukuku",
    gradient: "from-gray-600 to-gray-700",
    features: ["Hizmet süresi", "İhbar süreleri", "Tazminat oranları", "Yasal düzenlemeler"],
  },
  {
    title: "Fazla Mesai Ücreti",
    description: "Fazla mesai ve hafta tatili çalışma ücretlerini hesaplayın",
    icon: FiClock,
    href: "/hesaplamalar/fazla-mesai",
    category: "İş Hukuku",
    gradient: "from-indigo-700 to-indigo-800",
    features: ["Günlük çalışma", "Haftalık limit", "Tatil çalışması", "Ek ücret oranları"],
  },
  {
    title: "Tapu Harcı",
    description: "Gayrimenkul alım-satım tapu harçlarını hesaplayın",
    icon: FiHome,
    href: "/hesaplamalar/tapu-harci",
    category: "Gayrimenkul Hukuku",
    gradient: "from-stone-600 to-stone-700",
    features: ["Tapu harcı", "KDV hesabı", "Emlak vergisi", "Harç oranları"],
  },
  {
    title: "İcra Masrafları",
    description: "İcra takibi masraf ve harçlarını hesaplayın",
    icon: MdGavel,
    href: "/hesaplamalar/icra-masraflari",
    category: "İcra Hukuku",
    gradient: "from-zinc-600 to-zinc-700",
    features: ["İcra harcı", "Tebliğ masrafı", "Satış masrafı", "Vekalet ücreti"],
  },
  {
    title: "Vekalet Ücreti",
    description: "Avukatlık vekalet ücret tarifesini hesaplayın",
    icon: HiScale,
    href: "/hesaplamalar/vekalet-ucreti",
    category: "Genel",
    gradient: "from-slate-700 to-slate-800",
    features: ["Tarife ücreti", "Başarı ücreti", "Maktu ücret", "Asgari tarifeler"],
  },
  {
    title: "Dava Masrafları",
    description: "Dava açma harç ve masraflarını hesaplayın",
    icon: FiFileText,
    href: "/hesaplamalar/dava-masraflari",
    category: "Genel",
    gradient: "from-neutral-600 to-neutral-700",
    features: ["Dava harcı", "Vekalet ücreti", "Bilirkişi ücreti", "Toplam masraf"],
  },
];

export default function HesaplamalarClient() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#111C31] to-[#6454a4] py-20 pt-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <HiCalculator className="h-5 w-5 mr-2 text-white" />
              <span className="text-sm font-medium text-white">Hukuki Hesaplama Araçları</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-ubuntu">
              Hukuki{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Hesaplamalar
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Hukuki süreçlerde ihtiyaç duyacağınız hesaplamaları kolayca yapabileceğiniz ücretsiz araçlar. Nafaka,
              tazminat, harç ve masraf hesaplamalarınızı hızlıca gerçekleştirin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-slate-700 mb-2">8</div>
              <div className="text-gray-600">Hesaplama Aracı</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-700 mb-2">100%</div>
              <div className="text-gray-600">Ücretsiz</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-gray-700 mb-2">5</div>
              <div className="text-gray-600">Hukuk Dalı</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-indigo-700 mb-2">24/7</div>
              <div className="text-gray-600">Erişilebilir</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {calculators.map((calculator, index) => {
              const Icon = calculator.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-[420px]"
                >
                  {/* Gradient Border Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${calculator.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-2xl`}
                  >
                    <div className="w-full h-full bg-white rounded-2xl"></div>
                  </div>

                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${calculator.gradient} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {calculator.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-shrink-0">{calculator.description}</p>

                    <div className="space-y-2 mb-6 flex-grow">
                      {calculator.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={calculator.href}
                      className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${calculator.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group mt-auto`}
                    >
                      Hesapla
                      <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 lg:p-12 border border-gray-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Güvenilir Hesaplama Araçları</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tüm hesaplama araçlarımız güncel yasal düzenlemeler ve tarife oranları baz alınarak hazırlanmıştır.
                  Hesaplama sonuçları bilgilendirme amaçlıdır ve kesin hukuki sonuç doğurmaz.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                    Güncel yasal düzenlemeler
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                    Resmi tarife oranları
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                    Kolay kullanım
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                    Anında sonuç
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-slate-600 to-slate-700 rounded-3xl mb-6">
                  <HiCalculator className="h-16 w-16 text-white" />
                </div>
                <p className="text-gray-600">
                  Hesaplama sonuçlarınızı PDF olarak indirebilir ve hukuki danışmanlık için bizimle paylaşabilirsiniz.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Hesaplama Sonuçlarınız Hakkında Danışmanlık İster misiniz?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Hesaplama sonuçlarınızı değerlendirmek ve hukuki süreç hakkında detaylı bilgi almak için uzman avukatımızla
              görüşebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bizeulasin"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <FiDollarSign className="mr-2 h-5 w-5" />
                Ücretsiz Danışma
              </Link>
              <Link
                href="/hizmetler"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-slate-700 text-slate-700 rounded-xl font-semibold hover:bg-slate-700 hover:text-white transition-all duration-300"
              >
                Hizmetlerimiz
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}