"use client";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ConsultForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    content: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    subject: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // E-posta doğrulama fonksiyonu
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      subject: '',
      content: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad Soyad alanı zorunludur';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Danışmanlık konusu zorunludur';
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'İçerik alanı zorunludur';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Gmail kompozisyon URL'si oluşturma
      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=avukat@email.com&su=${encodeURIComponent(
        'Hukuki Danışmanlık Talebi: ' + formData.subject
      )}&body=${encodeURIComponent(
        `Ad Soyad: ${formData.fullName}\n` +
        `E-posta: ${formData.email}\n` +
        `Konu: ${formData.subject}\n\n` +
        `İçerik:\n${formData.content}`
      )}`;

      // Yeni pencerede Gmail'i aç
      window.open(mailtoLink, '_blank');
      
      // Formu sıfırla
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        content: ''
      });

      // Hata mesajlarını sıfırla
      setErrors({
        fullName: '',
        email: '',
        subject: '',
        content: ''
      });

      toast.success('Form başarıyla gönderildi!');
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="w-full bg-[#f5f5f0] py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold font-ubuntu text-gray-800 mb-4">
              Hukuki Danışmanlık Formu
            </h2>
            <p className="text-gray-600">
              Bu form, randevunuzun daha verimli geçmesi için ön bilgi toplama amaçlıdır.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) {
                      setErrors({ ...errors, fullName: '' });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-md text-black ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Adınız ve Soyadınız"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-md text-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ornek@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Danışmanlık Konusu *
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) {
                    setErrors({ ...errors, subject: '' });
                  }
                }}
                className={`w-full px-4 py-2 border rounded-md text-black ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Danışmanlık almak istediğiniz konu"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                İçerik *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => {
                  setFormData({ ...formData, content: e.target.value });
                  if (errors.content) {
                    setErrors({ ...errors, content: '' });
                  }
                }}
                rows={5}
                className={`w-full px-4 py-2 border rounded-md text-black ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Lütfen danışmanlık almak istediğiniz konu hakkında detaylı bilgi veriniz"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/4 mx-auto py-3 px-4 bg-[#111C31] text-white rounded-md font-medium hover:bg-[#4352a5]
                        transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Formu Gönder'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ConsultForm;
