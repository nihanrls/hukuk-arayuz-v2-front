"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
          <div className="text-lg font-medium">Av. Serhat Maverdeler</div>
        </Link>
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <Link href="/" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Ana Sayfa</Link>
          <Link href="/hakkinda" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Hakkında</Link>
          <div 
            className="relative group"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button 
              className="flex items-center gap-1 text-gray-300 hover:text-[#4352A5] transition-colors duration-200"
            >
              Hizmetler
              <ChevronDown size={18} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 bg-[#111C31] shadow-md rounded-md overflow-hidden"
                >
                  {services.map((service) => (
                    <Link 
                      key={service.slug}
                      href={`/hizmetler/${service.slug}`}
                      className="block px-4 py-2 text-gray-300 hover:text-[#4352A5] hover:bg-[#1a2438] transition-colors duration-200"
                    >
                      {service.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/bizeulasin" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Bize Ulaşın</Link>
          <Link href="/blog" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Blog</Link>
          <Link href="/sss" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">SSS</Link>
          <div 
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className="flex items-center gap-1 text-gray-300 hover:text-[#4352A5] transition-colors duration-200"
            >
              Hesaplamalar
              <ChevronDown size={18} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 bg-[#111C31] shadow-md rounded-md overflow-hidden"
                >
                  <Link href="/hesaplama1" className="block px-4 py-2 text-gray-300 hover:text-[#4352A5] hover:bg-[#1a2438] transition-colors duration-200">Hesaplama 1</Link>
                  <Link href="/hesaplama2" className="block px-4 py-2 text-gray-300 hover:text-[#4352A5] hover:bg-[#1a2438] transition-colors duration-200">Hesaplama 2</Link>
                  <Link href="/hesaplama3" className="block px-4 py-2 text-gray-300 hover:text-[#4352A5] hover:bg-[#1a2438] transition-colors duration-200">Hesaplama 3</Link>
                </motion.div>
              )}
            </AnimatePresence>
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
            <Link href="/" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Ana Sayfa</Link>
            <Link href="/hakkinda" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Hakkında</Link>
            <div className="relative">
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} 
                className="flex items-center gap-1 text-gray-300 hover:text-[#4352A5] transition-colors duration-200"
              >
                Hizmetler
                <ChevronDown size={18} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2 pl-4 overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link 
                        key={service.slug}
                        href={`/hizmetler/${service.slug}`}
                        className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/bizeulasin" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Bize Ulaşın</Link>
            <Link href="/blog" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Blog</Link>
            <Link href="/sss" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">SSS</Link>
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-1 text-gray-300 hover:text-[#4352A5] transition-colors duration-200"
              >
                Hesaplamalar
                <ChevronDown size={18} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2 pl-4 overflow-hidden"
                  >
                    <Link href="/hesaplama1" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Hesaplama 1</Link>
                    <Link href="/hesaplama2" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Hesaplama 2</Link>
                    <Link href="/hesaplama3" className="text-gray-300 hover:text-[#4352A5] transition-colors duration-200">Hesaplama 3</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
