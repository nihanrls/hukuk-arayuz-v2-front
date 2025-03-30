"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Her 10 saniyede bir mesajı göster/gizle
    const interval = setInterval(() => {
      setShowMessage(prev => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    // WhatsApp numarasını buraya ekleyin
    const phoneNumber = "905555555555"; // Örnek numara
    const message = "Merhaba, hukuki danışmanlık almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
            >
              <div className="relative">
                <p className="text-sm text-black">
                  Danışmak istediğiniz bir şey var mı?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ 
              scale: showMessage ? [1, 1.2, 1] : 1,
              rotate: showMessage ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 4
            }}
          >
            <FaWhatsapp size={24} />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppButton; 