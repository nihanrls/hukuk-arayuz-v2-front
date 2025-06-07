import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: aboutSection, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Hakkımda bölümü bulunamadı' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data: aboutSection });
  } catch (error) {
    console.error('Error fetching about section:', error);
    return NextResponse.json(
      { success: false, error: 'Hakkımda bölümü alınırken hata oluştu' },
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
    const body = await request.json();
    const { title, content, image_url, section, order_index, is_active } = body;
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Başlık ve içerik zorunludur' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    
    const { data: aboutSection, error } = await supabase
      .from('about')
      .update({
        title,
        content,
        image_url,
        section,
        order_index: order_index || 0,
        is_active: is_active ?? true
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Hakkımda bölümü bulunamadı' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data: aboutSection });
  } catch (error) {
    console.error('Error updating about section:', error);
    return NextResponse.json(
      { success: false, error: 'Hakkımda bölümü güncellenirken hata oluştu' },
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
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('about')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Hakkımda bölümü başarıyla silindi' 
    });
  } catch (error) {
    console.error('Error deleting about section:', error);
    return NextResponse.json(
      { success: false, error: 'Hakkımda bölümü silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 