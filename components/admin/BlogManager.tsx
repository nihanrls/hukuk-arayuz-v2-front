'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSave, FiX, FiImage, FiCalendar, FiSearch } from 'react-icons/fi';
import { ImageUpload } from './ImageUpload';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  cover_image?: string;
  author?: string;
  slug?: string;
  is_published: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

type SortOption = 'newest' | 'oldest' | 'title' | 'author' | 'published' | 'draft';

export function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    cover_image: '',
    author: '',
    slug: '',
    is_published: true,
    tags: [] as string[]
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filtrelenmiş ve sıralanmış bloglar
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs;

    // Arama filtresi
    if (searchTerm) {
      filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sıralama
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title':
          return a.title.localeCompare(b.title, 'tr');
        case 'author':
          return (a.author || '').localeCompare(b.author || '', 'tr');
        case 'published':
          if (a.is_published === b.is_published) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return a.is_published ? -1 : 1;
        case 'draft':
          if (a.is_published === b.is_published) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return a.is_published ? 1 : -1;
        default:
          return 0;
      }
    });

    return sorted;
  }, [blogs, searchTerm, sortBy]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      } else {
        toast.error(data.error || 'Blog yazıları alınırken hata oluştu');
      }
    } catch (error) {
      toast.error('Blog yazıları alınırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Slug otomatik oluştur (eğer boşsa)
    const finalFormData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title)
    };
    
    try {
      const url = editingBlog 
        ? `/api/admin/blogs/${editingBlog.id}`
        : '/api/admin/blogs';
      
      const method = editingBlog ? 'PUT' : 'POST';
      
      console.log('🚀 BlogManager Request:', {
        url,
        method,
        editingBlogId: editingBlog?.id,
        finalFormData: { ...finalFormData, content: finalFormData.content?.substring(0, 50) + '...' }
      });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(
          editingBlog 
            ? 'Blog yazısı güncellendi! 🎉' 
            : 'Blog yazısı oluşturuldu! 🎉'
        );
        fetchBlogs();
        resetForm();
      } else {
        toast.error(data.error || 'İşlem sırasında hata oluştu');
      }
    } catch (error) {
      toast.error('İşlem sırasında hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Blog yazısı silindi');
        fetchBlogs();
      } else {
        toast.error(data.error || 'Silme işlemi sırasında hata oluştu');
      }
    } catch (error) {
      toast.error('Silme işlemi sırasında hata oluştu');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      image_url: blog.image_url || '',
      cover_image: blog.cover_image || '',
      author: blog.author || '',
      slug: blog.slug || '',
      is_published: blog.is_published,
      tags: blog.tags || []
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      cover_image: '',
      author: '',
      slug: '',
      is_published: true,
      tags: []
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'newest': return 'En Yeni';
      case 'oldest': return 'En Eski';
      case 'title': return 'Başlık (A-Z)';
      case 'author': return 'Yazar (A-Z)';
      case 'published': return 'Yayında Olanlar';
      case 'draft': return 'Taslaklar';
      default: return 'Sırala';
    }
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
          <h2 className="text-2xl font-bold text-gray-900">Blog Yazıları</h2>
          <p className="text-gray-600 mt-1">
            {filteredAndSortedBlogs.length} / {blogs.length} yazı gösteriliyor
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
        >
          <FiPlus className="mr-2" />
          Yeni Blog Yazısı
        </button>
      </div>

      {/* Arama ve Filtreleme */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Blog yazılarında ara... (başlık, içerik, yazar, etiket)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="title">Başlık (A-Z)</option>
            <option value="author">Yazar (A-Z)</option>
            <option value="published">Yayında Olanlar</option>
            <option value="draft">Taslaklar</option>
          </select>
        </div>
      </div>

      {/* Arama sonucu bilgisi */}
      {searchTerm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>"{searchTerm}"</strong> araması için {filteredAndSortedBlogs.length} sonuç bulundu.
            {filteredAndSortedBlogs.length === 0 && (
              <span className="block mt-1 text-sm">Farklı anahtar kelimeler deneyebilirsiniz.</span>
            )}
          </p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingBlog ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
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
              {/* Başlık ve Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                    placeholder="Blog yazısının başlığı..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                    placeholder="url-friendly-slug (otomatik oluşturulur)"
                  />
                </div>
              </div>

              {/* Yazar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yazar
                </label>
                                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                    placeholder="Yazarın adı..."
                  />
              </div>

              {/* Özet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özet
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                  placeholder="Blog yazısının kısa özeti..."
                />
              </div>

              {/* İçerik */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İçerik <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm text-black"
                  placeholder="Blog yazısının içeriği..."
                  required
                />
              </div>

              {/* Görsel Yükleme */}
              <div>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                  label="Blog Görseli"
                />
              </div>

              {/* Yayınlama Durumu */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                  Yayınla
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
                  {editingBlog ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="grid gap-6">
        {filteredAndSortedBlogs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz blog yazısı yok'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Farklı anahtar kelimeler deneyebilir veya filtreleri temizleyebilirsiniz.'
                : 'İlk blog yazınızı oluşturmak için yukarıdaki butona tıklayın.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                İlk Blog Yazısını Oluştur
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedBlogs.map((blog) => (
            <div key={blog.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{blog.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {blog.is_published ? (
                          <>
                            <FiEye className="mr-1" size={12} />
                            Yayında
                          </>
                        ) : (
                          <>
                            <FiEyeOff className="mr-1" size={12} />
                            Taslak
                          </>
                        )}
                      </span>
                    </div>
                    
                    {blog.excerpt && (
                      <p className="text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      {blog.author && (
                        <span>👤 {blog.author}</span>
                      )}
                      <span className="flex items-center">
                        <FiCalendar className="mr-1" size={14} />
                        {formatDate(blog.created_at)}
                      </span>
                      {blog.slug && (
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                          /{blog.slug}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 