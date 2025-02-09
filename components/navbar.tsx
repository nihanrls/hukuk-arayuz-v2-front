"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 shadow-lg bg-[#26369b] fixed w-full z-50">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <div className="text-lg font-medium">Av. İsim Soyisim</div>
      </div>
      <div className="hidden md:flex gap-6">
        <Link href="/" className="hover:text-gray-300">Anasayfa</Link>
        <Link href="/hakkinda" className="hover:text-gray-300">Hakkında</Link>
        <Link href="/iletisim" className="hover:text-gray-300">Bize Ulaşın</Link>
        <Link href="/blog" className="hover:text-gray-300">Blog</Link>
        <Link href="/sss" className="hover:text-gray-300">SSS</Link>
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 hover:text-gray-300"
          >
            Hesaplamalar
            <ChevronDown size={18} />
          </button>
          {dropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 mt-2 w-48 bg-[#26369b] shadow-md rounded-md overflow-hidden"
            >
              <Link href="/hesaplama1" className="block px-4 py-2 hover:bg-[#4352a5] ">Hesaplama 1</Link>
              <Link href="/hesaplama2" className="block px-4 py-2 hover:bg-[#4352a5] ">Hesaplama 2</Link>
              <Link href="/hesaplama3" className="block px-4 py-2 hover:bg-[#4352a5] ">Hesaplama 3</Link>
            </motion.div>
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
          className="fixed top-0 right-0 w-3/4 h-full bg-[#26369b] shadow-lg p-6 flex flex-col gap-4 z-50"
        >
          <button onClick={() => setMenuOpen(false)} className="self-end">
            <X size={24} />
          </button>
          <Link href="/" className="hover:text-blue-600">Anasayfa</Link>
          <Link href="/hakkinda" className="hover:text-blue-600">Hakkında</Link>
          <Link href="/iletisim" className="hover:text-blue-600">Bize Ulaşın</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <Link href="/sss" className="hover:text-blue-600">SSS</Link>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 hover:text-blue-600">
            Hesaplamalar
            <ChevronDown size={18} />
          </button>
          {dropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2 pl-4"
            >
              <Link href="/hesaplama1" className="hover:text-blue-600">Hesaplama 1</Link>
              <Link href="/hesaplama2" className="hover:text-blue-600">Hesaplama 2</Link>
              <Link href="/hesaplama3" className="hover:text-blue-600">Hesaplama 3</Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
