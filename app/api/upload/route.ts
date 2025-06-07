import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary/config';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Cloudinary upload başlatılıyor...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }
    
    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Dosya boyutu 5MB\'dan küçük olmalıdır' },
        { status: 400 }
      );
    }
    
    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Sadece görsel dosyaları yüklenebilir' },
        { status: 400 }
      );
    }
    
    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log('📤 Cloudinary\'a yükleniyor:', file.name, 'Boyut:', file.size);
    
    // Cloudinary'a yükle
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'blog-images',
          public_id: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload hatası:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary upload başarılı:', result?.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });
    
    const uploadResult = result as any;
    
    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });
    
  } catch (error) {
    console.error('💥 Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Görsel yüklenirken hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { public_id } = await request.json();
    
    if (!public_id) {
      return NextResponse.json(
        { success: false, error: 'Public ID gerekli' },
        { status: 400 }
      );
    }
    
    const result = await cloudinary.uploader.destroy(public_id);
    
    return NextResponse.json({
      success: result.result === 'ok',
      result
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Silme işlemi başarısız' },
      { status: 500 }
    );
  }
} 