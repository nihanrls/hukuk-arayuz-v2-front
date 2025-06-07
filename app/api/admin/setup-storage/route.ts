import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
  try {
    console.log('🚀 Storage setup API çağrıldı');
    
    // Environment variables kontrolü
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Environment variables eksik');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Supabase environment variables eksik',
          missing: {
            url: !supabaseUrl,
            key: !supabaseAnonKey
          }
        },
        { status: 500 }
      );
    }

    console.log('✅ Environment variables mevcut');
    console.log('🔗 Supabase URL:', supabaseUrl);

    // Server client oluştur
    const supabase = await createClient();
    
    // Bucket var mı kontrol et
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Bucket listesi alınamadı:', listError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bucket listesi alınamadı: ' + listError.message
        },
        { status: 500 }
      );
    }
    
    const bucketExists = buckets?.some((b: any) => b.name === 'blog-images');
    
    if (bucketExists) {
      console.log('✅ Bucket zaten mevcut: blog-images');
      return NextResponse.json({
        success: true,
        message: 'blog-images bucket zaten mevcut'
      });
    }
    
    // Bucket oluştur
    const { data, error: createError } = await supabase.storage.createBucket('blog-images', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg']
    });
    
    if (createError) {
      console.error('❌ Bucket oluşturulamadı:', createError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bucket oluşturulamadı: ' + createError.message
        },
        { status: 500 }
      );
    }
    
    console.log('✅ Bucket oluşturuldu:', data);
    return NextResponse.json({
      success: true,
      message: 'blog-images bucket başarıyla oluşturuldu'
    });
    
  } catch (error) {
    console.error('💥 Setup storage error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Storage kurulumu sırasında hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
} 