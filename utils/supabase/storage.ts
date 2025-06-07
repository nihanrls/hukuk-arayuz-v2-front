import { createClient } from './client';

// Client-side storage operations
export const clientStorage = {
  async uploadImage(file: File, bucket: string = 'blog-images'): Promise<string | null> {
    try {
      console.log('🚀 Client-side upload başlatılıyor:', file.name, 'Boyut:', file.size);
      
      const supabase = createClient();
      
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.error('❌ Dosya çok büyük:', file.size);
        throw new Error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      }
      
      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        console.error('❌ Geçersiz dosya tipi:', file.type);
        throw new Error('Sadece görsel dosyaları yüklenebilir');
      }
      
      // Benzersiz dosya adı oluştur
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log('📝 Oluşturulan dosya adı:', fileName);
      
      // Dosyayı yükle
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (error) {
        console.error('❌ Upload hatası:', error);
        throw error;
      }

      console.log('✅ Upload başarılı:', data);

      // Public URL al
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      console.log('🔗 Public URL:', publicUrl);
      return publicUrl;
      
    } catch (error) {
      console.error('💥 Upload error:', error);
      throw error;
    }
  },

  async deleteImage(url: string, bucket: string = 'blog-images'): Promise<boolean> {
    try {
      const supabase = createClient();
      
      // URL'den dosya adını çıkar
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (!fileName) {
        console.error('❌ Dosya adı URL\'den çıkarılamadı:', url);
        return false;
      }

      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) {
        console.error('❌ Delete error:', error);
        return false;
      }

      console.log('✅ Dosya silindi:', fileName);
      return true;
    } catch (error) {
      console.error('💥 Delete error:', error);
      return false;
    }
  },

  async testConnection(): Promise<boolean> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('❌ Connection test failed:', error);
        return false;
      }
      
      console.log('✅ Connection successful. Buckets:', data?.map(b => b.name));
      return true;
    } catch (error) {
      console.error('💥 Connection test error:', error);
      return false;
    }
  }
};

// Server-side storage operations - Bu fonksiyonlar sadece API route'larında kullanılmalı

// Backward compatibility için eski fonksiyonlar
export const uploadImage = clientStorage.uploadImage;
export const deleteImage = clientStorage.deleteImage;
export const testSupabaseConnection = clientStorage.testConnection;

export const getImageUrl = (fileName: string, bucket: string = 'blog-images'): string => {
  const { data: { publicUrl } } = createClient().storage
    .from(bucket)
    .getPublicUrl(fileName);
  
  return publicUrl;
}; 