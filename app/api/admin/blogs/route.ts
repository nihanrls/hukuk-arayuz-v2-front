import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazıları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, image_url, author, slug, is_published, tags } = body;
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Başlık ve içerik zorunludur' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    
    const { data: blog, error } = await supabase
      .from('blogs')
      .insert({
        title,
        content,
        excerpt,
        image_url,
        author,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        is_published: is_published ?? true,
        tags: tags || []
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazısı oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
} 