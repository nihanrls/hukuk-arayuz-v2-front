import { NextResponse } from 'next/server';
import { supabase } from '@/lib/database/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('FAQ fetch error:', error);
      return NextResponse.json(
        { success: false, error: 'SSS verileri alınırken hata oluştu' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('FAQ API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 