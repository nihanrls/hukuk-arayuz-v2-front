import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark-blue text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Hakkında */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Hakkında</h2>
          <p className="text-18px mb-4 font-nunito">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex space-x-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        {/* Son Paylaşımlar */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Son Paylaşımlar</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/path/to/image1.jpg" alt="Post 1" className="w-16 h-16 mr-4" />
              <div>
                <h3 className="font-semibold text-18px font-nunito">Essential for the Construction</h3>
                <p className="text-18px font-nunito">12 Jan 2019</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src="/path/to/image2.jpg" alt="Post 2" className="w-16 h-16 mr-4" />
              <div>
                <h3 className="font-semibold text-18px font-nunito">Essential for the Construction</h3>
                <p className="text-18px font-nunito">28 Jan 2019</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src="/path/to/image3.jpg" alt="Post 3" className="w-16 h-16 mr-4" />
              <div>
                <h3 className="font-semibold text-18px font-nunito">Essential for the Construction</h3>
                <p className="text-18px font-nunito">15 Feb 2019</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Hızlı Linkler</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-18px font-nunito">Ana Sayfa</a></li>
            <li><a href="/about" className="hover:underline text-18px font-nunito">Hakkında</a></li>
            <li><a href="/faq" className="hover:underline text-18px font-nunito">SSS</a></li>
            <li><a href="/contact" className="hover:underline text-18px font-nunito">Bize Ulaşın</a></li>
          </ul>
        </div>

        {/* Bize Ulaşın */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Bize Ulaşın</h2>
          <p className="text-18px font-nunito">📍 7935 Springs, NY</p>
          <p className="text-18px font-nunito">📧 infoattoyer@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
