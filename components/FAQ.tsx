"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "İlk hukuki danışmanlık görüşmesi ücretli midir?",
    answer: "İlk görüşmemizde, hukuki durumunuzu değerlendirmek ve size en uygun çözüm yollarını sunmak için detaylı bir analiz yapıyoruz. Bu görüşme ücreti, davanın türüne ve karmaşıklığına göre değişiklik gösterebilmektedir. Detaylı bilgi için bizimle iletişime geçebilirsiniz."
  },
  {
    question: "Hangi hukuk alanlarında hizmet veriyorsunuz?",
    answer: "Hukuk büromuz; İş Hukuku, Ticaret Hukuku, Aile Hukuku, Miras Hukuku, Gayrimenkul Hukuku, Ceza Hukuku, İdare Hukuku ve Borçlar Hukuku gibi temel hukuk alanlarında uzman kadromuzla hizmet vermektedir. Her alanda güncel mevzuat ve içtihatları takip ederek müvekkillerimize en doğru hukuki çözümleri sunuyoruz."
  },
  {
    question: "Dava süreçleri ortalama ne kadar sürer?",
    answer: "Dava süreleri, davanın türüne, karmaşıklığına ve yargı sisteminin iş yüküne göre değişkenlik gösterir. Örneğin, basit bir iş davası 6-12 ay içinde sonuçlanabilirken, karmaşık ticari davalar 2-3 yıl sürebilmektedir. Her dava için size özel bir süreç planı oluşturuyor ve düzenli bilgilendirme yapıyoruz."
  },
  {
    question: "Online hukuki danışmanlık hizmeti veriyor musunuz?",
    answer: "Evet, teknolojinin sunduğu imkanlardan yararlanarak online hukuki danışmanlık hizmeti veriyoruz. Video konferans görüşmeleri, e-posta danışmanlığı ve dijital belge paylaşımı ile uzaktan da hukuki süreçlerinizi yönetebiliyoruz. Bu sayede yurt içi ve yurt dışındaki tüm müvekkillerimize kesintisiz hizmet sunabiliyoruz."
  },
  {
    question: "Ücretlendirme politikanız nasıl işliyor?",
    answer: "Ücretlendirme politikamız şeffaf ve avukatlık asgari ücret tarifesine uygun şekilde belirlenmektedir. Dava türüne göre sabit ücret, saatlik ücretlendirme veya başarı primi gibi farklı ödeme seçenekleri sunuyoruz. Her müvekkilimiz için davanın özelliklerine göre özel bir ücretlendirme planı oluşturuyoruz."
  },
  {
    question: "Acil durumlarda size nasıl ulaşabiliriz?",
    answer: "7/24 ulaşılabilir durumdayız. Acil hukuki durumlar için özel iletişim hattımız bulunmaktadır. Ayrıca mobil uygulamamız üzerinden anlık mesajlaşma ve görüntülü görüşme imkanı sunuyoruz. Müvekkillerimizin hukuki süreçlerinde yaşayabilecekleri acil durumlar için her zaman hazır durumdayız."
  }
];

const FAQItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={false}
      animate={{
        backgroundColor: isOpen ? 'rgba(100, 84, 164, 0.03)' : 'white'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">{item.question}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.answer}</p>
        <button
          onClick={onClick}
          className="flex items-center text-[#6454a4] hover:text-[#7c6bb8] transition-colors duration-300 text-sm font-medium"
        >
          {isOpen ? (
            <>
              Daha Az Göster
              <IoRemove size={20} className="ml-2" />
            </>
          ) : (
            <>
              Daha Fazla Göster
              <IoAdd size={20} className="ml-2" />
            </>
          )}
        </button>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-6 text-gray-600 border-t border-gray-100">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = useMemo(() => {
    if (!searchQuery) return faqData;
    
    const query = searchQuery.toLowerCase();
    return faqData.filter(item => 
      item.question.toLowerCase().includes(query) || 
      item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section className="py-16 bg-gray-50 mb-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h4 className="text-[#6454a4] text-sm font-medium uppercase tracking-wider mb-4">
            SIKÇA SORULAN SORULAR
          </h4>
          <h2 className="text-4xl font-bold mb-8 text-[#111C30]">
            Siz sorun? Biz <span className="italic">cevaplayalım.</span>
          </h2>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Sorularınızı arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6454a4] focus:ring-1 focus:ring-[#6454a4] transition-all duration-300 text-gray-800 placeholder-gray-400"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          <div className="w-24 h-1 bg-[#6454a4] mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Aradığınız soru bulunamadı.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <FAQItem
                  key={index}
                  item={item}
                  isOpen={index === openIndex}
                  onClick={() => setOpenIndex(index === openIndex ? null : index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 