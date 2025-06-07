import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Environment variables kontrolü
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Supabase environment variables eksik',
          missing: {
            url: !supabaseUrl,
            key: !supabaseKey
          }
        },
        { status: 500 }
      );
    }

    console.log('Setup storage API called');
    console.log('Supabase URL:', supabaseUrl);

    // Direct API call ile bucket listesi al
    const listResponse = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Content-Type': 'application/json'
      }
    });

    console.log('List response status:', listResponse.status);

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error('List buckets error:', errorText);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bucket listesi alınamadı',
          status: listResponse.status,
          details: errorText
        },
        { status: 500 }
      );
    }

    const buckets = await listResponse.json();
    console.log('Found buckets:', buckets);
    
    // blog-images bucket'ı var mı kontrol et
    const bucketExists = buckets?.some((b: any) => b.name === 'blog-images' || b.id === 'blog-images');
    
    if (bucketExists) {
      return NextResponse.json({
        success: true,
        message: 'blog-images bucket zaten mevcut',
        buckets: buckets?.map((b: any) => b.name || b.id),
        bucketCount: buckets?.length || 0
      });
    }

    console.log('Attempting to create bucket...');

    // Bucket oluşturmayı dene
    const createResponse = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'blog-images',
        name: 'blog-images',
        public: true,
        file_size_limit: 5242880,
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      })
    });

    console.log('Create response status:', createResponse.status);

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Create bucket error:', errorText);
      
      // Eğer bucket zaten varsa, bu bir hata değil
      if (errorText.includes('already exists') || createResponse.status === 409) {
        return NextResponse.json({
          success: true,
          message: 'blog-images bucket zaten mevcut (create sırasında tespit edildi)'
        });
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bucket oluşturulamadı',
          status: createResponse.status,
          details: errorText,
          suggestion: 'Supabase dashboard\'dan manuel olarak oluşturmayı deneyin'
        },
        { status: 500 }
      );
    }

    const newBucket = await createResponse.json();
    console.log('Bucket created successfully:', newBucket);

    return NextResponse.json({
      success: true,
      message: 'blog-images bucket başarıyla oluşturuldu',
      bucket: newBucket
    });
    
  } catch (error) {
    console.error('Setup storage error:', error);
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