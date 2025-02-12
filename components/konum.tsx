"use client";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Konum = () => {
  return (
    <div className="w-full bg-[#f5f5f0] py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sol taraf - Google Maps */}
            <div className="lg:w-2/3 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.4272935313256!2d32.8491313622043!3d39.93183090711221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34ef9ebf171b5%3A0x7f8d115ee1dbf9ac!2sCermodern!5e0!3m2!1sen!2str!4v1739375220433!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Sağ taraf - İletişim Bilgileri */}
            <div className="lg:w-1/3 p-8 bg-white">
              <h2 className="text-3xl font-bold font-[Crimson] text-gray-800 mb-6">
                İletişim Bilgileri
              </h2>
              
              {/* Adres */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="mt-1">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Adres</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Örnek Mahallesi, <br />
                    Örnek Sokak No:123 <br />
                    Kat:4 Daire:8 <br />
                    Ankara
                  </p>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="mt-1">
                  <FaPhone className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                  <a 
                    href="tel:+901234567890" 
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    +90 (123) 456 78 90
                  </a>
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <FaEnvelope className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">E-posta</h3>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=avukat@email.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    avukat@email.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Konum;
