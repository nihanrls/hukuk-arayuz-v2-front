"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const services = [
  { name: "Ceza Hukuku", slug: "ceza-hukuku" },
  { name: "Medeni Hukuk", slug: "medeni-hukuk" },
  { name: "İş Hukuku", slug: "is-hukuku" },
  { name: "Ticaret Hukuku", slug: "ticaret-hukuku" },
  { name: "İdare Hukuku", slug: "idare-hukuku" },
  { name: "Sigorta Hukuku", slug: "sigorta-hukuku" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${isHomePage ? (isScrolled ? 'bg-[#111C31]' : 'bg-transparent') : 'bg-[#111C31]'}`}>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/media/logo.png" alt="Logo" className="w-10 h-10" />
          <div className="text-lg font-medium">Av. İsim Soyisim</div>
        </Link>
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <Link href="/" className="hover:text-gray-300 hover:underline">Ana Sayfa</Link>
          <Link href="/hakkinda" className="hover:text-gray-300 hover:underline">Hakkında</Link>
          <div className="relative">
            <button 
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center gap-1 hover:text-gray-300"
            >
              Hizmetler
              <ChevronDown size={18} />
            </button>
            {servicesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-[#111C31] shadow-md rounded-md overflow-hidden">
                {services.map((service) => (
                  <Link 
                    key={service.slug}
                    href={`/hizmetler/${service.slug}`}
                    className="block px-4 py-2 hover:bg-[#4352a5]"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/bizeulasin" className="hover:text-gray-300 hover:underline">Bize Ulaşın</Link>
          <Link href="/blog" className="hover:text-gray-300 hover:underline">Blog</Link>
          <Link href="/sss" className="hover:text-gray-300 hover:underline">SSS</Link>
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-gray-300"
            >
              Hesaplamalar
              <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-[#111C31] shadow-md rounded-md overflow-hidden">
                <Link href="/hesaplama1" className="block px-4 py-2 hover:bg-[#4352a5]">Hesaplama 1</Link>
                <Link href="/hesaplama2" className="block px-4 py-2 hover:bg-[#4352a5]">Hesaplama 2</Link>
                <Link href="/hesaplama3" className="block px-4 py-2 hover:bg-[#4352a5]">Hesaplama 3</Link>
              </div>
            )}
          </div>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {menuOpen && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-[#26369b] shadow-lg p-6 flex flex-col gap-4 z-50"
          >
            <button onClick={() => setMenuOpen(false)} className="self-end">
              <X size={24} />
            </button>
            <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link>
            <Link href="/hakkinda" className="hover:text-blue-600">Hakkında</Link>
            <button onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} className="flex items-center gap-1 hover:text-blue-600">
              Hizmetler
              <ChevronDown size={18} />
            </button>
            {servicesDropdownOpen && (
              <div className="flex flex-col gap-2 pl-4">
                {services.map((service) => (
                  <Link 
                    key={service.slug}
                    href={`/hizmetler/${service.slug}`}
                    className="hover:text-blue-600"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/bizeulasin" className="hover:text-blue-600">Bize Ulaşın</Link>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <Link href="/sss" className="hover:text-blue-600">SSS</Link>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 hover:text-blue-600">
              Hesaplamalar
              <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className="flex flex-col gap-2 pl-4">
                <Link href="/hesaplama1" className="hover:text-blue-600">Hesaplama 1</Link>
                <Link href="/hesaplama2" className="hover:text-blue-600">Hesaplama 2</Link>
                <Link href="/hesaplama3" className="hover:text-blue-600">Hesaplama 3</Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
