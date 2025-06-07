import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();
    
    // Önce slug ile ara
    let { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    // Slug ile bulunamazsa ID ile ara (backward compatibility)
    if (error && error.code === 'PGRST116') {
      const { data: blogById, error: errorById } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', slug)
        .eq('is_published', true)
        .single();
      
      if (errorById) {
        return NextResponse.json(
          { success: false, error: 'Blog yazısı bulunamadı' },
          { status: 404 }
        );
      }
      
      blog = blogById;
    } else if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazısı alınırken hata oluştu' },
      { status: 500 }
    );
  }
} 