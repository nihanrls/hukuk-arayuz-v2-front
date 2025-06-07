'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { uploadImage, deleteImage, testSupabaseConnection } from '@/utils/supabase/storage';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label: string;
  required?: boolean;
  accept?: string;
  maxSize?: number; // MB cinsinden
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  label,
  required = false,
  accept = 'image/*',
  maxSize = 5
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`);
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen geçerli bir görsel dosyası seçin');
      return;
    }

    setUploading(true);

    try {
      // Supabase bağlantısını test et
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest) {
        toast.error('Supabase bağlantısı kurulamadı. Environment variables\'ları kontrol edin.');
        setUploading(false);
        return;
      }

      // Preview oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Dosyayı yükle
      console.log('Attempting to upload file:', file.name);
      const uploadedUrl = await uploadImage(file);
      
      if (uploadedUrl) {
        console.log('Upload successful, URL:', uploadedUrl);
        onChange(uploadedUrl);
        toast.success('Görsel başarıyla yüklendi');
      } else {
        console.error('Upload failed, no URL returned');
        toast.error('Storage bucket bulunamadı. Lütfen /admin/debug sayfasından "Setup Storage" butonuna tıklayın.');
        setPreview(value || null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Görsel yüklenirken hata oluştu');
      setPreview(value || null);
    } finally {
      setUploading(false);
      // Input'u temizle
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (value) {
      try {
        await deleteImage(value);
        toast.success('Görsel silindi');
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
    
    setPreview(null);
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="space-y-3">
        {/* Preview Area */}
        {preview ? (
          <div className="relative group">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                  <button
                    type="button"
                    onClick={handleClick}
                    disabled={uploading}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <FiUpload className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    disabled={uploading}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <FiX className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Upload Area */
          <div
            onClick={handleClick}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-sm text-gray-600">Yükleniyor...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FiImage className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  Görsel yüklemek için tıklayın
                  <br />
                  <span className="text-xs text-gray-400">
                    Maksimum {maxSize}MB, JPG, PNG, GIF
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        {/* URL Input (Fallback) */}
        <div className="text-center">
          <span className="text-xs text-gray-500">veya</span>
        </div>
        
        <input
          type="url"
          value={value || ''}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="Görsel URL'si girin"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          disabled={uploading}
        />
      </div>
    </div>
  );
} 