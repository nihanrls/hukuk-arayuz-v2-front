import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET - Aktif hizmetleri getir (public)
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Services fetch error:', error);
      return NextResponse.json(
        { success: false, error: 'Hizmetler alınamadı' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 