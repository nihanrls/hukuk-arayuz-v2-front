import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Service role key ile admin client oluştur
const getAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export async function GET() {
  try {
    const supabase = getAdminClient();
    
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories (
          id,
          name,
          color
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    console.log('📋 Fetched blogs:', blogs?.map(b => ({ id: b.id, title: b.title })));
    
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
    const { title, content, excerpt, image_url, cover_image, author, slug, is_published, tags, category_id } = body;
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Başlık ve içerik zorunludur' },
        { status: 400 }
      );
    }
    
    const supabase = getAdminClient();
    
    const { data: blog, error } = await supabase
      .from('blogs')
      .insert({
        title,
        content,
        excerpt,
        image_url,
        cover_image,
        author,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        is_published: is_published ?? true,
        tags: tags || [],
        category_id: category_id || null
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
    
    console.log('✅ Blog created successfully:', blog.id);
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazısı oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
} 