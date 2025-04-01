"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd, IoRemove } from 'react-icons/io5';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Hukuki danışmanlık hizmetleriniz hangi alanları kapsıyor?",
    answer: "Hukuk büromuz, ceza hukuku, medeni hukuk, iş hukuku, ticaret hukuku, idare hukuku ve daha birçok alanda profesyonel hukuki danışmanlık hizmeti sunmaktadır. Uzman kadromuzla müvekkillerimize en iyi hukuki çözümleri sunmayı hedefliyoruz."
  },
  {
    question: "İlk görüşme ücretli mi?",
    answer: "İlk görüşmemizde, hukuki durumunuzu değerlendirmek ve size en uygun çözümü sunmak için detaylı bir analiz yapıyoruz. Bu görüşme ücreti, davanın türüne ve karmaşıklığına göre değişiklik gösterebilir. Detaylı bilgi için bizimle iletişime geçebilirsiniz."
  },
  {
    question: "Dava süreçleri ne kadar sürüyor?",
    answer: "Dava süreçleri, davanın türüne, karmaşıklığına ve mahkemelerin iş yüküne göre değişiklik gösterebilir. Basit davalar birkaç ay içinde sonuçlanırken, karmaşık davalar yıllar sürebilir. Her dava için size özel bir süreç planı sunuyoruz."
  },
  {
    question: "Online hukuki danışmanlık hizmeti veriyor musunuz?",
    answer: "Evet, teknolojinin avantajlarından yararlanarak online hukuki danışmanlık hizmeti de sunuyoruz. Video görüşmeler, e-posta danışmanlığı ve dijital belge paylaşımı ile size en uygun şekilde hizmet vermeye devam ediyoruz."
  },
  {
    question: "Ücretlendirme politikası nasıl?",
    answer: "Ücretlendirme politikamız, sunduğumuz hizmetin türüne, karmaşıklığına ve süresine göre belirlenmektedir. Sabit ücret, saatlik ücret veya başarı primi gibi farklı ödeme seçenekleri sunuyoruz. Her müvekkilimiz için özel bir ücretlendirme planı oluşturuyoruz."
  },
  {
    question: "Yurtdışında yaşayan müvekkiller için hizmet veriyor musunuz?",
    answer: "Evet, yurtdışında yaşayan müvekkillerimize de hizmet veriyoruz. Dijital iletişim kanallarını kullanarak, farklı zaman dilimlerinde bile size ulaşılabilir oluyoruz. Uluslararası hukuk alanında da deneyimli kadromuzla size yardımcı olmaktan memnuniyet duyuyoruz."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left"
      >
        <span className="flex-grow text-center text-lg font-semibold text-[#111C31] font-ubuntu">
          {question}
        </span>
        <span className="-ml-8">
          {isOpen ? (
            <IoRemove className="text-2xl text-[#6454a4]" />
          ) : (
            <IoAdd className="text-2xl text-[#6454a4]" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-16 pb-8 text-gray-600 font-nunito">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#111C31] mb-12 font-ubuntu">
          Sıkça Sorulan Sorular
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 