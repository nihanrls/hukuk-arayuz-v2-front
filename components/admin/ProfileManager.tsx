'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FiSave, FiPlus, FiTrash2, FiUser, FiMail, FiPhone, FiBriefcase, FiBook, FiEdit3, FiX } from 'react-icons/fi';
import { ImageUpload } from './ImageUpload';
import { EditableTimeline } from '@/components/ui/Timeline';

interface CareerItem {
  id: string;
  position: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  is_current: boolean;
}

interface EducationItem {
  id: string;
  degree: string;
  school: string;
  field_of_study: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  is_current: boolean;
}

interface ProfileData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  title: string;
  about: string;
  specialties: string[];
  profile_image_url: string | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  } | null;
  career_history: CareerItem[] | null;
  education_history: EducationItem[] | null;
}

export function ProfileManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Ortak input stil sınıfı
  const inputClassName = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black";
  const [profile, setProfile] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    title: 'Av.',
    about: '',
    specialties: [],
    profile_image_url: '',
    social_links: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: ''
    },
    career_history: [],
    education_history: []
  });

  const [newSpecialty, setNewSpecialty] = useState('');
  const [editingCareer, setEditingCareer] = useState<number | null>(null);
  const [editingEducation, setEditingEducation] = useState<number | null>(null);
  const [careerForm, setCareerForm] = useState<CareerItem>({
    id: '',
    position: '',
    company: '',
    start_date: '',
    end_date: null,
    description: '',
    is_current: false
  });
  const [educationForm, setEducationForm] = useState<EducationItem>({
    id: '',
    degree: '',
    school: '',
    field_of_study: '',
    start_date: '',
    end_date: null,
    description: '',
    is_current: false
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile');
      const data = await response.json();
      
      if (data.success && data.data) {
        setProfile(data.data);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Profil bilgileri alınamadı');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message || 'Profil kaydedildi! 🎉');
        setProfile(data.data);
      } else {
        toast.error(data.error || 'Profil kaydedilemedi');
      }
    } catch (error) {
      console.error('Profile save error:', error);
      toast.error('Profil kaydedilirken hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !profile.specialties.includes(newSpecialty.trim())) {
      setProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (index: number) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  const addCareer = () => {
    const newCareer: CareerItem = {
      id: Date.now().toString(),
      position: '',
      company: '',
      start_date: '',
      end_date: null,
      description: '',
      is_current: false
    };
    
    setProfile(prev => ({
      ...prev,
      career_history: [...(prev.career_history || []), newCareer]
    }));
  };

  const updateCareer = (index: number, field: keyof CareerItem, value: any) => {
    setProfile(prev => ({
      ...prev,
      career_history: prev.career_history?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ) || []
    }));
  };

  const removeCareer = (index: number) => {
    setProfile(prev => ({
      ...prev,
      career_history: prev.career_history?.filter((_, i) => i !== index) || []
    }));
  };

  const addEducation = () => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      field_of_study: '',
      start_date: '',
      end_date: null,
      description: '',
      is_current: false
    };
    
    setProfile(prev => ({
      ...prev,
      education_history: [...(prev.education_history || []), newEducation]
    }));
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: any) => {
    setProfile(prev => ({
      ...prev,
      education_history: prev.education_history?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ) || []
    }));
  };

  const removeEducation = (index: number) => {
    setProfile(prev => ({
      ...prev,
      education_history: prev.education_history?.filter((_, i) => i !== index) || []
    }));
  };

  // Timeline helper functions
  const formatPeriod = (startDate: string, endDate: string | null, isCurrent: boolean) => {
    const start = new Date(startDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
    if (isCurrent) return `${start} - Devam Ediyor`;
    if (!endDate) return start;
    const end = new Date(endDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  };

  const convertCareerToTimeline = () => {
    return (profile.career_history || []).map((career, index) => ({
      id: career.id,
      title: career.position,
      subtitle: career.company,
      period: formatPeriod(career.start_date, career.end_date, career.is_current),
      description: career.description || undefined,
      isActive: career.is_current
    }));
  };

  const convertEducationToTimeline = () => {
    return (profile.education_history || []).map((education, index) => ({
      id: education.id,
      title: education.degree,
      subtitle: education.school,
      period: formatPeriod(education.start_date, education.end_date, education.is_current),
      description: education.field_of_study ? `${education.field_of_study}${education.description ? ` - ${education.description}` : ''}` : education.description || undefined,
      isActive: education.is_current
    }));
  };

  const handleEditCareer = (index: number) => {
    const career = profile.career_history?.[index];
    if (career) {
      setCareerForm(career);
      setEditingCareer(index);
    }
  };

  const handleEditEducation = (index: number) => {
    const education = profile.education_history?.[index];
    if (education) {
      setEducationForm(education);
      setEditingEducation(index);
    }
  };

  const handleAddCareer = () => {
    const newCareer: CareerItem = {
      id: Date.now().toString(),
      position: '',
      company: '',
      start_date: '',
      end_date: null,
      description: '',
      is_current: false
    };
    setCareerForm(newCareer);
    setEditingCareer(-1); // -1 indicates new item
  };

  const handleAddEducation = () => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      field_of_study: '',
      start_date: '',
      end_date: null,
      description: '',
      is_current: false
    };
    setEducationForm(newEducation);
    setEditingEducation(-1); // -1 indicates new item
  };

  const saveCareer = () => {
    if (editingCareer === -1) {
      // Adding new career
      setProfile(prev => ({
        ...prev,
        career_history: [...(prev.career_history || []), careerForm]
      }));
    } else if (editingCareer !== null) {
      // Editing existing career
      setProfile(prev => ({
        ...prev,
        career_history: prev.career_history?.map((item, i) => 
          i === editingCareer ? careerForm : item
        ) || []
      }));
    }
    setEditingCareer(null);
  };

  const saveEducation = () => {
    if (editingEducation === -1) {
      // Adding new education
      setProfile(prev => ({
        ...prev,
        education_history: [...(prev.education_history || []), educationForm]
      }));
    } else if (editingEducation !== null) {
      // Editing existing education
      setProfile(prev => ({
        ...prev,
        education_history: prev.education_history?.map((item, i) => 
          i === editingEducation ? educationForm : item
        ) || []
      }));
    }
    setEditingEducation(null);
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profil Yönetimi</h2>
          <p className="text-gray-600 mt-1">Kişisel bilgilerinizi düzenleyin</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Kaydediliyor...
            </>
          ) : (
            <>
              <FiSave className="mr-2" />
              Kaydet
            </>
          )}
        </button>
      </div>

      <div className="space-y-8">
        {/* Temel Bilgiler */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 pb-4 border-b border-gray-200">
            <FiUser className="text-blue-600" />
            Temel Bilgiler
          </h3>
          
          {/* Profil Fotoğrafı */}
          <ImageUpload
            value={profile.profile_image_url || ''}
            onChange={(url) => setProfile(prev => ({ ...prev, profile_image_url: url }))}
            label="Profil Fotoğrafı"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.first_name}
                onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                className={inputClassName}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soyad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.last_name}
                onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                className={inputClassName}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unvan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                className={inputClassName}
                placeholder="Av."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiMail size={16} />
                E-posta <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className={inputClassName}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiPhone size={16} />
                Telefon
              </label>
              <input
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hakkında <span className="text-red-500">*</span>
            </label>
            <textarea
              value={profile.about}
              onChange={(e) => setProfile(prev => ({ ...prev, about: e.target.value }))}
              rows={6}
              className={inputClassName}
              placeholder="Kendiniz hakkında bilgi verin..."
              required
            />
          </div>
        </div>

        {/* Uzmanlık Alanları */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">Uzmanlık Alanları</h3>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Yeni uzmanlık alanı ekle..."
            />
            <button
              onClick={addSpecialty}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
            >
              <FiPlus />
              Ekle
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {profile.specialties.map((specialty, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {specialty}
                <button
                  onClick={() => removeSpecialty(index)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiTrash2 size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">Sosyal Medya Linkleri</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={profile.social_links?.linkedin || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, linkedin: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
              <input
                type="url"
                value={profile.social_links?.twitter || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, twitter: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://twitter.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
              <input
                type="url"
                value={profile.social_links?.instagram || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, instagram: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://instagram.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
              <input
                type="url"
                value={profile.social_links?.facebook || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, facebook: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>
        </div>

        {/* Kariyer Geçmişi */}
        <EditableTimeline
          items={convertCareerToTimeline()}
          onEdit={handleEditCareer}
          onDelete={removeCareer}
          onAdd={handleAddCareer}
          title="Kariyer Geçmişi"
          addButtonText="Kariyer Ekle"
          emptyMessage="Henüz kariyer geçmişi eklenmemiş"
        />

        {/* Eğitim Geçmişi */}
        <EditableTimeline
          items={convertEducationToTimeline()}
          onEdit={handleEditEducation}
          onDelete={removeEducation}
          onAdd={handleAddEducation}
          title="Eğitim Geçmişi"
          addButtonText="Eğitim Ekle"
          emptyMessage="Henüz eğitim geçmişi eklenmemiş"
        />

        {/* Career Edit Modal */}
        {editingCareer !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingCareer === -1 ? 'Yeni Kariyer Ekle' : 'Kariyer Düzenle'}
                  </h3>
                  <button
                    onClick={() => setEditingCareer(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pozisyon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={careerForm.position}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, position: e.target.value }))}
                      className={inputClassName}
                      placeholder="Örn: Avukat, Hukuk Müşaviri"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şirket <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={careerForm.company}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, company: e.target.value }))}
                      className={inputClassName}
                      placeholder="Şirket adı"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlangıç Tarihi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={careerForm.start_date}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, start_date: e.target.value }))}
                      className={inputClassName}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={careerForm.end_date || ''}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, end_date: e.target.value || null }))}
                      disabled={careerForm.is_current}
                      className={`${inputClassName} ${careerForm.is_current ? 'bg-gray-100' : ''}`}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={careerForm.is_current}
                    onChange={(e) => {
                      setCareerForm(prev => ({
                        ...prev,
                        is_current: e.target.checked,
                        end_date: e.target.checked ? null : prev.end_date
                      }));
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Şu anda burada çalışıyorum</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={careerForm.description || ''}
                    onChange={(e) => setCareerForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className={inputClassName}
                    placeholder="İş tanımı, sorumluluklar, başarılar..."
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setEditingCareer(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  İptal
                </button>
                <button
                  onClick={saveCareer}
                  disabled={!careerForm.position || !careerForm.company || !careerForm.start_date}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSave />
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Education Edit Modal */}
        {editingEducation !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingEducation === -1 ? 'Yeni Eğitim Ekle' : 'Eğitim Düzenle'}
                  </h3>
                  <button
                    onClick={() => setEditingEducation(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Derece <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={educationForm.degree}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                      className={inputClassName}
                      placeholder="Lisans, Yüksek Lisans, Doktora"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Okul <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={educationForm.school}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, school: e.target.value }))}
                      className={inputClassName}
                      placeholder="Üniversite adı"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bölüm
                    </label>
                    <input
                      type="text"
                      value={educationForm.field_of_study || ''}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, field_of_study: e.target.value }))}
                      className={inputClassName}
                      placeholder="Hukuk, İşletme, vb."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlangıç Tarihi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={educationForm.start_date}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, start_date: e.target.value }))}
                      className={inputClassName}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={educationForm.end_date || ''}
                      onChange={(e) => setEducationForm(prev => ({ ...prev, end_date: e.target.value || null }))}
                      disabled={educationForm.is_current}
                      className={`${inputClassName} ${educationForm.is_current ? 'bg-gray-100' : ''}`}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={educationForm.is_current}
                    onChange={(e) => {
                      setEducationForm(prev => ({
                        ...prev,
                        is_current: e.target.checked,
                        end_date: e.target.checked ? null : prev.end_date
                      }));
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Şu anda devam ediyor</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={educationForm.description || ''}
                    onChange={(e) => setEducationForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className={inputClassName}
                    placeholder="Notlar, başarılar, özel projeler..."
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setEditingEducation(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  İptal
                </button>
                <button
                  onClick={saveEducation}
                  disabled={!educationForm.degree || !educationForm.school || !educationForm.start_date}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSave />
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 