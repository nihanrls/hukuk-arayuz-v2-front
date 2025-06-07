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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();
    
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Blog yazısı bulunamadı' },
          { status: 404 }
        );
      }
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔍 PUT Blog ID:', id);
    
    const body = await request.json();
    const { title, content, excerpt, image_url, author, slug, is_published, tags } = body;
    console.log('📝 PUT Blog Data:', { title, content: content?.substring(0, 50) + '...', excerpt, image_url, author, slug, is_published, tags });
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Başlık ve içerik zorunludur' },
        { status: 400 }
      );
    }
    
    const supabase = getAdminClient();
    
    // Önce kaydın var olup olmadığını kontrol et
    const { data: existingBlog, error: checkError } = await supabase
      .from('blogs')
      .select('id, title')
      .eq('id', id)
      .single();
    
    console.log('🔍 Existing blog check:', { existingBlog, checkError });
    
    if (checkError && checkError.code === 'PGRST116') {
      console.log('❌ Blog bulunamadı:', id);
      return NextResponse.json(
        { success: false, error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      );
    }
    
    const { data: blog, error } = await supabase
      .from('blogs')
      .update({
        title,
        content,
        excerpt,
        image_url,
        author,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        is_published: is_published ?? true,
        tags: tags || []
      })
      .eq('id', id)
      .select()
      .single();
    
    console.log('📝 Update result:', { blog, error });
    
    if (error) {
      console.log('❌ Update error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Blog yazısı bulunamadı' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazısı güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();
    
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog yazısı başarıyla silindi' 
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazısı silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 