import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/database/supabase';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      .update({
        question,
        answer,
        category: category || 'Genel',
        order_index: order_index || 0,
        is_active: is_active !== undefined ? is_active : true,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('FAQ update error:', error);
      return NextResponse.json(
        { success: false, error: 'SSS güncellenirken hata oluştu' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'SSS bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('FAQ update API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('faq')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('FAQ delete error:', error);
      return NextResponse.json(
        { success: false, error: 'SSS silinirken hata oluştu' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'SSS başarıyla silindi'
    });

  } catch (error) {
    console.error('FAQ delete API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 