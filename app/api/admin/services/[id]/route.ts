import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// PUT - Hizmet güncelle (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      .update({
        title,
        slug,
        description,
        content,
        cover_image,
        icon,
        order_index,
        is_active,
        meta_title: meta_title || title,
        meta_description: meta_description || description
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Service update error:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'Bu hizmet adı veya slug zaten kullanılıyor' },
          { status: 400 }
        );
      }
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Hizmet bulunamadı' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Hizmet güncellenemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
      message: 'Hizmet başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Service update API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// DELETE - Hizmet sil (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Service delete error:', error);
      return NextResponse.json(
        { success: false, error: 'Hizmet silinemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Hizmet başarıyla silindi'
    });
  } catch (error) {
    console.error('Service delete API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 