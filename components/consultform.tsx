"use client";
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ConsultForm = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.fullName.trim()) {
      toast.error('Lütfen adınızı ve soyadınızı giriniz');
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('Lütfen geçerli bir e-posta adresi giriniz');
      return;
    }

    if (!formData.subject.trim()) {
      toast.error('Lütfen danışmanlık konusunu giriniz');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Lütfen içerik giriniz');
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

      toast.success('Form başarıyla gönderildi!');
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f5f5f0] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold font-[Crimson] text-gray-800 mb-4">
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
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                  placeholder="Adınız ve Soyadınız"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                  placeholder="ornek@email.com"
                />
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
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                placeholder="Danışmanlık almak istediğiniz konu"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                İçerik *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                placeholder="Lütfen danışmanlık almak istediğiniz konu hakkında detaylı bilgi veriniz"
              />
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
    </div>
  );
};

export default ConsultForm;
