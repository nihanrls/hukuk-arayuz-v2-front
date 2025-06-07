// Cloudinary upload utility
export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  try {
    console.log('🚀 Cloudinary upload başlatılıyor:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Cloudinary upload başarılı:', data.url);
      return data.url;
    } else {
      console.error('❌ Cloudinary upload hatası:', data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('💥 Upload error:', error);
    throw error;
  }
};

export const deleteFromCloudinary = async (url: string): Promise<boolean> => {
  try {
    // URL'den public_id çıkar
    const urlParts = url.split('/');
    const fileWithExt = urlParts[urlParts.length - 1];
    const publicId = `blog-images/${fileWithExt.split('.')[0]}`;
    
    const response = await fetch('/api/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id: publicId }),
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}; 