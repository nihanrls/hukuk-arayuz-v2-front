"use client";
import React from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AboutPage = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/bizeulasin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ana Profil Bölümü */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-12">
          {/* Sol Taraf - Fotoğraf */}
          <div className="lg:w-1/3">
            <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/media/lawyer-profile.jpg"
                alt="Av. İsim Soyisim"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Sağ Taraf - Bilgiler */}
          <div className="lg:w-2/3 space-y-6 ml-4">
            <h1 className="text-4xl lg:text-5xl font-bold font-[Crimson] text-gray-800">
              Av. İsim Soyisim
            </h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MdEmail className="text-xl" />
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=avukat@email.com" 
                  className="hover:text-[#4352A5] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  avukat@email.com
                </a>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-700">Uzmanlık Alanları</h2>
                <div className="flex flex-wrap gap-2">
                  {['Ceza Hukuku', 'Ticaret Hukuku', 'İş Hukuku'].map((alan) => (
                    <span
                      key={alan}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {alan}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-700">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed">
                  Müvekkillerime en iyi hukuki danışmanlığı sunmayı hedefliyorum. 
                  Hukuk alanındaki eğitimim ve deneyimlerimle, karmaşık davaları başarıyla yönetme konusunda kararlıyım. 
                  İş hayatım, [Üniversite Adı] Hukuk Fakültesi'nden mezun olmamla başladı ve burada edindiğim bilgi ve becerilerle 
                  müvekkillerime en iyi hizmeti sunmayı, etik değerlere olan bağlılığım ve müvekkil memnuniyetine verdiğim önemle tanınmayı amaçlıyorum.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gray-600 hover:text-[#4352A5] transition-colors">
                  <FaLinkedinIn size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#4352A5] transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#4352A5] transition-colors">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İletişim Yönlendirme Bölümü */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold font-[Crimson] text-gray-800">
              Hukuki Desteğe mi İhtiyacınız Var?
            </h2>
            <p className="text-gray-600 text-lg">
              Size nasıl yardımcı olabileceğimizi öğrenmek için hemen iletişime geçin.
            </p>
            <button
              onClick={handleContactClick}
              className="bg-[#111C30] text-white px-8 py-3 rounded-lg text-lg font-semibold 
                       hover:bg-[#4352A5] transition-colors shadow-lg"
            >
              İletişime Geçin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
