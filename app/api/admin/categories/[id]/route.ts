import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// PUT - Kategori güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, color, is_active } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Kategori adı gereklidir' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Slug oluştur
    const slug = name
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

    const { data: category, error } = await supabase
      .from('blog_categories')
      .update({
        name,
        slug,
        description,
        color,
        is_active
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Category update error:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'Bu kategori adı zaten kullanılıyor' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Kategori güncellenemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Kategori başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Category update API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// DELETE - Kategori sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Önce bu kategoriye ait blog var mı kontrol et
    const { data: blogs, error: blogsError } = await supabase
      .from('blogs')
      .select('id')
      .eq('category_id', id)
      .limit(1);

    if (blogsError) {
      console.error('Blogs check error:', blogsError);
      return NextResponse.json(
        { success: false, error: 'Kategori kontrol edilemedi' },
        { status: 500 }
      );
    }

    if (blogs && blogs.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Bu kategoriye ait blog yazıları bulunuyor. Önce blog yazılarını başka kategoriye taşıyın.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Category delete error:', error);
      return NextResponse.json(
        { success: false, error: 'Kategori silinemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Kategori başarıyla silindi'
    });
  } catch (error) {
    console.error('Category delete API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 