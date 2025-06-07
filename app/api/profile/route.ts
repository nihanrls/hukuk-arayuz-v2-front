import { NextResponse } from 'next/server';
import { supabase } from '@/lib/database/supabase';

// Public profile bilgilerini getir
export async function GET() {
  try {
    console.log('📋 Public profile bilgileri getiriliyor...');
    
    const { data: profile, error } = await supabase
      .from('profile')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('❌ Profile getirme hatası:', error);
      return NextResponse.json(
        { success: false, error: 'Profile bilgileri alınamadı' },
        { status: 500 }
      );
    }
    
    if (!profile) {
      console.log('ℹ️ Profil bulunamadı');
      return NextResponse.json({
        success: true,
        data: null,
        message: 'Profil bulunamadı'
      });
    }
    
    console.log('✅ Public profile başarıyla getirildi');
    
    return NextResponse.json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('💥 Public profile GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Profile bilgileri alınırken hata oluştu' },
      { status: 500 }
    );
  }
} 