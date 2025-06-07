'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiSettings, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ImageUpload } from './ImageUpload';
import { MarkdownEditor } from './MarkdownEditor';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image?: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

const iconOptions = [
  { value: 'FiShield', label: 'Kalkan (Ceza Hukuku)' },
  { value: 'FiUsers', label: 'Kullanıcılar (Medeni Hukuk)' },
  { value: 'FiBriefcase', label: 'Çanta (İş Hukuku)' },
  { value: 'FiTrendingUp', label: 'Grafik (Ticaret Hukuku)' },
  { value: 'FiFileText', label: 'Dosya (İdare Hukuku)' },
  { value: 'FiUmbrella', label: 'Şemsiye (Sigorta Hukuku)' },
  { value: 'FiSettings', label: 'Ayarlar (Genel)' }
];

export function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    cover_image: '',
    icon: 'FiSettings',
    order_index: 0,
    is_active: true,
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      } else {
        toast.error(data.error || 'Hizmetler alınırken hata oluştu');
      }
    } catch (error) {
      toast.error('Hizmetler alınırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingService 
        ? `/api/admin/services/${editingService.id}`
        : '/api/admin/services';
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(
          editingService 
            ? 'Hizmet güncellendi! 🎉' 
            : 'Hizmet oluşturuldu! 🎉'
        );
        fetchServices();
        resetForm();
      } else {
        toast.error(data.error || 'İşlem sırasında hata oluştu');
      }
    } catch (error) {
      toast.error('İşlem sırasında hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Hizmet silindi');
        fetchServices();
      } else {
        toast.error(data.error || 'Silme işlemi sırasında hata oluştu');
      }
    } catch (error) {
      toast.error('Silme işlemi sırasında hata oluştu');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      content: service.content,
      cover_image: service.cover_image || '',
      icon: service.icon,
      order_index: service.order_index,
      is_active: service.is_active,
      meta_title: service.meta_title || '',
      meta_description: service.meta_description || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      cover_image: '',
      icon: 'FiSettings',
      order_index: 0,
      is_active: true,
      meta_title: '',
      meta_description: ''
    });
    setEditingService(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h2>
          <p className="text-gray-600 mt-1">
            {services.length} hizmet mevcut
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
        >
          <FiPlus className="mr-2" />
          Yeni Hizmet
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Başlık ve Sıra */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmet Başlığı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                    placeholder="Hizmet başlığı..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sıra
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kısa Açıklama <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                  placeholder="Hizmetin kısa açıklaması..."
                  required
                />
              </div>

              {/* İçerik */}
              <div>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  label="Detaylı İçerik"
                  placeholder="Markdown formatında hizmet içeriğini yazın..."
                  required
                  rows={15}
                />
              </div>

              {/* Icon Seçimi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İkon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cover Image */}
              <div>
                <ImageUpload
                  value={formData.cover_image}
                  onChange={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
                  label="Cover Görseli"
                />
              </div>

              {/* SEO Alanları */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">SEO Ayarları</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Başlık
                    </label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                      placeholder="SEO için meta başlık..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Açıklama
                    </label>
                    <textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                      placeholder="SEO için meta açıklama..."
                    />
                  </div>
                </div>
              </div>

              {/* Aktif/Pasif */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Aktif
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
                >
                  <FiSave className="mr-2" />
                  {editingService ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Services List */}
      <div className="grid gap-6">
        {services.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiSettings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz hizmet yok
            </h3>
            <p className="text-gray-600 mb-6">
              İlk hizmetinizi oluşturmak için yukarıdaki butona tıklayın.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              İlk Hizmeti Oluştur
            </button>
          </div>
        ) : (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Sıra: {service.order_index}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        service.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.is_active ? (
                          <>
                            <FiEye className="mr-1" size={12} />
                            Aktif
                          </>
                        ) : (
                          <>
                            <FiEyeOff className="mr-1" size={12} />
                            Pasif
                          </>
                        )}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>📅 {formatDate(service.created_at)}</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                        /{service.slug}
                      </span>
                      <span>🎨 {iconOptions.find(opt => opt.value === service.icon)?.label || service.icon}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 