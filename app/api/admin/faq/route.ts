import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/database/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('faq')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Admin FAQ fetch error:', error);
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
    console.error('Admin FAQ API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, category, order_index, is_active } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: 'Soru ve cevap alanları zorunludur' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('faq')
      .insert([{
        question,
        answer,
        category: category || 'Genel',
        order_index: order_index || 0,
        is_active: is_active !== undefined ? is_active : true
      }])
      .select()
      .single();

    if (error) {
      console.error('FAQ create error:', error);
      return NextResponse.json(
        { success: false, error: 'SSS oluşturulurken hata oluştu' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('FAQ create API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 