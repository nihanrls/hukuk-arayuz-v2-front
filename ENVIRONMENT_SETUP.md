# 🔧 Environment Variables Kurulum Rehberi

Bu dosya, görsel yükleme sorunlarını çözmek için gerekli environment variables'ların nasıl kurulacağını açıklar.

## 📋 Gerekli Environment Variables

Projenizin root dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary Configuration (Görsel yükleme için)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🔍 Supabase Bilgilerini Nereden Bulacaksınız?

1. **Supabase Dashboard'a gidin**: https://supabase.com/dashboard
2. **Projenizi seçin**
3. **Settings > API** sayfasına gidin
4. Aşağıdaki bilgileri kopyalayın:

### Project URL
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
```

### Anon Key (Public)
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Service Role Key (Private)
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📁 Dosya Yapısı

```
your-project/
├── .env.local          # ← Bu dosyayı oluşturun
├── .env.example        # ← Opsiyonel: Örnek dosya
├── app/
├── components/
└── ...
```

## ⚠️ Güvenlik Notları

- `.env.local` dosyasını **asla** git'e commit etmeyin
- `.gitignore` dosyasında `.env.local` olduğundan emin olun
- `NEXT_PUBLIC_` ile başlayan değişkenler client-side'da görünür
- `SUPABASE_SERVICE_ROLE_KEY` sadece server-side işlemler için kullanılır

## 🧪 Test Etme

1. Environment variables'ları ayarladıktan sonra
2. Sunucuyu yeniden başlatın: `npm run dev`
3. `/admin/debug` sayfasına gidin
4. "Bağlantıyı Test Et" butonuna tıklayın
5. "Storage Kurulumu" butonuna tıklayın

## 🔧 Sorun Giderme

### Environment Variables Görünmüyor
- Dosya adının `.env.local` olduğundan emin olun
- Sunucuyu yeniden başlattığınızdan emin olun
- Dosyanın root dizinde olduğundan emin olun

### Bağlantı Hatası
- URL'nin `https://` ile başladığından emin olun
- URL'nin sonunda `/` olmadığından emin olun
- Key'lerin doğru kopyalandığından emin olun

### Storage Bucket Hatası
- Supabase projenizde Storage'ın aktif olduğundan emin olun
- RLS (Row Level Security) ayarlarını kontrol edin
- Manuel bucket oluşturmayı deneyin

## 📞 Destek

Sorun devam ederse:
1. Browser console'u kontrol edin
2. Network tab'ında API çağrılarını kontrol edin
3. Supabase Dashboard'da logs'ları kontrol edin 