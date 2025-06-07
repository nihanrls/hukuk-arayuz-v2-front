'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  section?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function AboutManager() {
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutSection | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    section: '',
    order_index: 0,
    is_active: true
  });

  useEffect(() => {
    fetchAboutSections();
  }, []);

  const fetchAboutSections = async () => {
    try {
      const response = await fetch('/api/admin/about');
      const data = await response.json();
      
      if (data.success) {
        setAboutSections(data.data);
      } else {
        toast.error(data.error || 'Hakkımda bölümleri alınırken hata oluştu');
      }
    } catch (error) {
      toast.error('Hakkımda bölümleri alınırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingSection 
        ? `/api/admin/about/${editingSection.id}`
        : '/api/admin/about';
      
      const method = editingSection ? 'PUT' : 'POST';
      
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
          editingSection 
            ? 'Hakkımda bölümü güncellendi' 
            : 'Hakkımda bölümü oluşturuldu'
        );
        fetchAboutSections();
        resetForm();
      } else {
        toast.error(data.error || 'İşlem sırasında hata oluştu');
      }
    } catch (error) {
      toast.error('İşlem sırasında hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hakkımda bölümünü silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/about/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Hakkımda bölümü silindi');
        fetchAboutSections();
      } else {
        toast.error(data.error || 'Silme işlemi sırasında hata oluştu');
      }
    } catch (error) {
      toast.error('Silme işlemi sırasında hata oluştu');
    }
  };

  const handleEdit = (section: AboutSection) => {
    setEditingSection(section);
    setFormData({
      title: section.title,
      content: section.content,
      image_url: section.image_url || '',
      section: section.section || '',
      order_index: section.order_index,
      is_active: section.is_active
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image_url: '',
      section: '',
      order_index: 0,
      is_active: true
    });
    setEditingSection(null);
    setShowForm(false);
  };

  const updateOrder = async (id: string, newOrderIndex: number) => {
    try {
      const section = aboutSections.find(s => s.id === id);
      if (!section) return;

      const response = await fetch(`/api/admin/about/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...section,
          order_index: newOrderIndex
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchAboutSections();
      } else {
        toast.error('Sıralama güncellenirken hata oluştu');
      }
    } catch (error) {
      toast.error('Sıralama güncellenirken hata oluştu');
    }
  };

  const moveUp = (section: AboutSection) => {
    const currentIndex = section.order_index;
    if (currentIndex > 0) {
      updateOrder(section.id, currentIndex - 1);
    }
  };

  const moveDown = (section: AboutSection) => {
    const maxIndex = Math.max(...aboutSections.map(s => s.order_index));
    const currentIndex = section.order_index;
    if (currentIndex < maxIndex) {
      updateOrder(section.id, currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Hakkımda Bölümleri ({aboutSections.length})
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Yeni Bölüm
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingSection ? 'Bölümü Düzenle' : 'Yeni Bölüm'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlık *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bölüm
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Örn: Misyon, Vizyon, Değerler"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İçerik *
              </label>
              <textarea
                rows={6}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resim URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sıra
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                Aktif
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editingSection ? 'Güncelle' : 'Oluştur'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {aboutSections.map((section) => (
            <li key={section.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {section.title}
                      </h3>
                      {section.section && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {section.section}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>
                        Sıra: {section.order_index} • 
                        {new Date(section.created_at).toLocaleDateString('tr-TR')}
                      </span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        section.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {section.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {section.content}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => moveUp(section)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      disabled={section.order_index === 0}
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveDown(section)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      disabled={section.order_index === Math.max(...aboutSections.map(s => s.order_index))}
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(section)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {aboutSections.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Henüz hakkımda bölümü bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
} 