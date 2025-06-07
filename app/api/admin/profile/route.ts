import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/database/supabase';

// Profile bilgilerini getir
export async function GET() {
  try {
    console.log('📋 Profile bilgileri getiriliyor...');
    
    const { data: profile, error } = await supabaseAdmin
      .from('profile')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('❌ Profile getirme hatası:', error);
      return NextResponse.json(
        { success: false, error: 'Profile bilgileri alınamadı: ' + error.message },
        { status: 500 }
      );
    }
    
    // Eğer profil yoksa boş bir profil döndür
    if (!profile) {
      console.log('ℹ️ Profil bulunamadı, boş profil döndürülüyor');
      return NextResponse.json({
        success: true,
        data: null,
        message: 'Profil bulunamadı'
      });
    }
    
    console.log('✅ Profile başarıyla getirildi:', { id: profile.id, name: `${profile.first_name} ${profile.last_name}` });
    
    return NextResponse.json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('💥 Profile GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Profile bilgileri alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Profile bilgilerini güncelle veya oluştur
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Profile güncelleme/oluşturma:', { 
      name: `${body.first_name} ${body.last_name}`,
      email: body.email 
    });
    
    // Önce mevcut profil var mı kontrol et
    const { data: existingProfile, error: checkError } = await supabaseAdmin
      .from('profile')
      .select('id')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Profile kontrol hatası:', checkError);
      return NextResponse.json(
        { success: false, error: 'Profile kontrol edilemedi: ' + checkError.message },
        { status: 500 }
      );
    }
    
    const profileData = {
      ...body,
      updated_at: new Date().toISOString()
    };
    
    let result;
    
    if (existingProfile) {
      // Güncelle
      console.log('🔄 Mevcut profil güncelleniyor...');
      result = await supabaseAdmin
        .from('profile')
        .update(profileData)
        .eq('id', existingProfile.id)
        .select()
        .single();
    } else {
      // Yeni oluştur
      console.log('➕ Yeni profil oluşturuluyor...');
      profileData.created_at = new Date().toISOString();
      result = await supabaseAdmin
        .from('profile')
        .insert(profileData)
        .select()
        .single();
    }
    
    if (result.error) {
      console.error('❌ Profile kaydetme hatası:', result.error);
      return NextResponse.json(
        { success: false, error: 'Profile kaydedilemedi: ' + result.error.message },
        { status: 500 }
      );
    }
    
    console.log('✅ Profile başarıyla kaydedildi:', { 
      id: result.data.id, 
      name: `${result.data.first_name} ${result.data.last_name}` 
    });
    
    return NextResponse.json({
      success: true,
      data: result.data,
      message: existingProfile ? 'Profil güncellendi' : 'Profil oluşturuldu'
    });
    
  } catch (error) {
    console.error('💥 Profile PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Profile kaydedilirken hata oluştu' },
      { status: 500 }
    );
  }
} 