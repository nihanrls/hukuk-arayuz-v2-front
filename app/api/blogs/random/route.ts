import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');
    
    const supabase = await createClient();
    
    // Yayınlanmış blog yazılarını rastgele sırayla getir
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('id, title, excerpt, image_url, author, created_at, slug')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit * 3); // Daha fazla veri çekip rastgele seçeceğiz
    
    if (error) {
      console.error('Random blogs fetch error:', error);
      return NextResponse.json(
        { success: false, error: 'Blog yazıları alınamadı' },
        { status: 500 }
      );
    }

    if (!blogs || blogs.length === 0) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    // Rastgele sıralama ve limit uygulama
    const shuffledBlogs = blogs
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: shuffledBlogs
    });
  } catch (error) {
    console.error('Random blogs API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 