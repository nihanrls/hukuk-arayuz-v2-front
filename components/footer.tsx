import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#111C31] text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Hakkında */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Hakkında</h2>
          <p className="text-18px mb-4 font-ubuntu">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex space-x-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        {/* Hizmetlerimiz */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Hizmetlerimiz</h2>
          <ul className="space-y-2">
            <li><Link href="/hizmetler/ceza-hukuku" className="hover:text-[#4352A5] text-18px font-ubuntu">Ceza Hukuku</Link></li>
            <li><Link href="/hizmetler/medeni-hukuk" className="hover:text-[#4352A5] text-18px font-ubuntu">Medeni Hukuk</Link></li>
            <li><Link href="/hizmetler/is-hukuku" className="hover:text-[#4352A5] text-18px font-ubuntu">İş Hukuku</Link></li>
            <li><Link href="/hizmetler/ticaret-hukuku" className="hover:text-[#4352A5] text-18px font-ubuntu">Ticaret Hukuku</Link></li>
            <li><Link href="/hizmetler/idare-hukuku" className="hover:text-[#4352A5] text-18px font-ubuntu">İdare Hukuku</Link></li>
            <li><Link href="/hizmetler/sigorta-hukuku" className="hover:text-[#4352A5] text-18px font-ubuntu">Sigorta Hukuku</Link></li>
          </ul>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Hızlı Linkler</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-[#4352A5] text-18px font-ubuntu">Ana Sayfa</Link></li>
            <li><Link href="/hakkinda" className="hover:text-[#4352A5] text-18px font-ubuntu">Hakkında</Link></li>
            <li><Link href="/sss" className="hover:text-[#4352A5] text-18px font-ubuntu">SSS</Link></li>
            <li><Link href="/bizeulasin" className="hover:text-[#4352A5] text-18px font-ubuntu">Bize Ulaşın</Link></li>
            <li><Link href="/blog" className="hover:text-[#4352A5] text-18px font-ubuntu">Blog</Link></li>
          </ul>
        </div>

        {/* Bize Ulaşın */}
        <div>
          <h2 className="text-28px font-bold mb-4 font-ubuntu">Bize Ulaşın</h2>
          <p className="text-18px font-ubuntu">📍 7935 Springs, NY</p>
          <p className="text-18px font-ubuntu">📧 infoattoyer@gmail.com</p>
        </div>
      </div>

      {/* Soluk Çizgi */}
      <div className="border-t border-gray-300 my-4 opacity-50"></div>

      {/* Copyright Kısmı */}
      <div className="text-center mt-2">
        <p className="text-16px font-ubuntu">© 2025 Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
