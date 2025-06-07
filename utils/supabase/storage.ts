import { createClient } from './client';

const supabase = createClient();

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    console.log('Supabase connection successful. Available buckets:', data);
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
};

export const uploadImage = async (file: File, bucket: string = 'blog-images'): Promise<string | null> => {
  try {
    console.log('Starting upload for file:', file.name, 'Size:', file.size);
    
    // Bucket'ın var olup olmadığını kontrol et
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.error('Error listing buckets:', bucketError);
      return null;
    }
    
    const bucketExists = buckets?.some(b => b.name === bucket);
    if (!bucketExists) {
      console.error(`Bucket '${bucket}' does not exist. Available buckets:`, buckets?.map(b => b.name));
      console.error('Please create the bucket manually in Supabase dashboard or use the Setup Storage API');
      return null;
    }
    
    // Dosya adını benzersiz yap
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    console.log('Generated filename:', fileName);
    
    // Dosyayı yükle
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name
      });
      return null;
    }

    console.log('Upload successful:', data);

    // Public URL'i al
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    console.log('Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};

export const deleteImage = async (url: string, bucket: string = 'blog-images'): Promise<boolean> => {
  try {
    // URL'den dosya adını çıkar
    const fileName = url.split('/').pop();
    if (!fileName) return false;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};

export const getImageUrl = (fileName: string, bucket: string = 'blog-images'): string => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);
  
  return publicUrl;
}; 