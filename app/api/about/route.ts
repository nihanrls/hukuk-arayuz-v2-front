import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: aboutSections, error } = await supabase
      .from('about')
      .select('*')
      .eq('is_active', true)
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