import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET - Tüm hizmetleri getir (admin)
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Services fetch error:', error);
      return NextResponse.json(
        { success: false, error: 'Hizmetler alınamadı' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// POST - Yeni hizmet oluştur (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      content, 
      cover_image, 
      icon, 
      order_index, 
      is_active,
      meta_title,
      meta_description 
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Başlık ve içerik gereklidir' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Slug oluştur
    const slug = title
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

    const { data: service, error } = await supabase
      .from('services')
      .insert({
        title,
        slug,
        description,
        content,
        cover_image,
        icon: icon || 'FiSettings',
        order_index: order_index || 0,
        is_active: is_active ?? true,
        meta_title: meta_title || title,
        meta_description: meta_description || description
      })
      .select()
      .single();

    if (error) {
      console.error('Service create error:', error);
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { success: false, error: 'Bu hizmet adı veya slug zaten kullanılıyor' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Hizmet oluşturulamadı' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
      message: 'Hizmet başarıyla oluşturuldu'
    });
  } catch (error) {
    console.error('Service create API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 