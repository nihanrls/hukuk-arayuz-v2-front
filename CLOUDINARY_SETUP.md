# 🌟 Cloudinary Kurulum Rehberi

Supabase Storage sorunları nedeniyle görsel yükleme için Cloudinary'ye geçtik. Bu rehber Cloudinary hesabı oluşturma ve yapılandırma adımlarını açıklar.

## 🚀 **1. Cloudinary Hesabı Oluşturun**

1. **Cloudinary'ye gidin**: https://cloudinary.com/
2. **"Sign Up for Free"** butonuna tıklayın
3. **Email, şifre ve company name** girin
4. **Hesabınızı doğrulayın** (email'e gelen link)

## 🔑 **2. API Bilgilerini Alın**

1. **Dashboard'a gidin**: https://console.cloudinary.com/
2. **"Dashboard"** sekmesinde aşağıdaki bilgileri bulun:

### 📋 **Gerekli Bilgiler:**
```
Cloud Name: your_cloud_name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123456
```

## ⚙️ **3. Environment Variables Ayarlayın**

`.env.local` dosyanıza aşağıdaki satırları ekleyin:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 🔍 **Örnek:**
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=my-blog-images
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## 🎯 **4. Cloudinary Ayarları (Opsiyonel)**

### **Upload Presets (Önerilen):**
1. **Settings > Upload** sayfasına gidin
2. **"Add upload preset"** tıklayın
3. **Preset name**: `blog-images`
4. **Signing Mode**: `Unsigned`
5. **Folder**: `blog-images`
6. **Transformations** ekleyin:
   - Width: 1200, Height: 800, Crop: Limit
   - Quality: Auto
   - Format: Auto

## ✅ **5. Test Edin**

1. **Sunucuyu yeniden başlatın**: `npm run dev`
2. **Admin paneline gidin**: `/admin`
3. **Yeni blog oluşturun** ve **görsel yüklemeyi test edin**

## 🎉 **Avantajlar**

### ✅ **Cloudinary vs Supabase Storage:**
- **Daha hızlı**: CDN ile optimize edilmiş görsel dağıtımı
- **Otomatik optimizasyon**: WebP, AVIF formatları
- **Transformasyonlar**: Otomatik boyutlandırma ve kalite ayarı
- **Güvenilir**: %99.9 uptime garantisi
- **Ücretsiz plan**: 25GB storage + 25GB bandwidth/ay

### 📊 **Özellikler:**
- ✅ Otomatik görsel optimizasyonu
- ✅ Responsive görseller
- ✅ CDN ile hızlı yükleme
- ✅ Backup ve güvenlik
- ✅ Analytics ve raporlama

## 🔧 **Sorun Giderme**

### **Environment Variables Görünmüyor:**
- `.env.local` dosyasının root dizinde olduğundan emin olun
- Sunucuyu yeniden başlatın
- Dosya adının doğru olduğundan emin olun

### **Upload Hatası:**
- API key'lerin doğru olduğundan emin olun
- Cloud name'in doğru olduğundan emin olun
- Network bağlantınızı kontrol edin

### **Görsel Görünmüyor:**
- URL'nin doğru olduğundan emin olun
- Cloudinary dashboard'da görselin yüklendiğini kontrol edin
- Browser cache'ini temizleyin

## 📞 **Destek**

Sorun yaşarsanız:
1. **Cloudinary Dashboard** > **Support** bölümünü kontrol edin
2. **Console loglarını** kontrol edin
3. **Network tab**'ında API çağrılarını kontrol edin

## 🎯 **Sonuç**

Artık görsel yükleme sistemi Cloudinary ile çalışıyor:
- ✅ RLS sorunları çözüldü
- ✅ Hızlı ve güvenilir görsel yükleme
- ✅ Otomatik optimizasyon
- ✅ CDN ile hızlı erişim

Cloudinary ücretsiz planı çoğu proje için yeterlidir! 🚀 