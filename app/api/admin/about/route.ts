import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: aboutSections, error } = await supabase
      .from('about')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data: aboutSections });
  } catch (error) {
    console.error('Error fetching about sections:', error);
    return NextResponse.json(
      { success: false, error: 'Hakkımda bölümleri alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
      .insert({
        title,
        content,
        image_url,
        section,
        order_index: order_index || 0,
        is_active: is_active ?? true
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data: aboutSection });
  } catch (error) {
    console.error('Error creating about section:', error);
    return NextResponse.json(
      { success: false, error: 'Hakkımda bölümü oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
} 