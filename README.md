# Hukuk Bürosu Web Sitesi

Modern ve profesyonel hukuk bürosu web sitesi. Next.js, TypeScript, Tailwind CSS ve PostgreSQL ile geliştirilmiştir.

## Özellikler

- 🏠 Modern ve responsive tasarım
- 📝 Blog yönetim sistemi
- 📄 Hakkımda bölümleri yönetimi
- 🔐 Admin paneli
- 📱 Mobil uyumlu
- 🚀 SEO optimizasyonu
- 💾 PostgreSQL veritabanı desteği
- 🔧 TypeORM ile veritabanı yönetimi

## Teknolojiler

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL, TypeORM
- **UI Components**: Lucide React, React Hot Toast
- **Deployment**: Vercel (önerilen)

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd hukuk-arayuz-v2-front
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables dosyasını oluşturun:
```bash
cp .env.example .env.local
```

4. `.env.local` dosyasını düzenleyerek veritabanı bilgilerinizi girin:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

5. Veritabanı tablolarını oluşturun:
```sql
-- lib/database/migrations/001_initial_schema.sql dosyasındaki SQL komutlarını çalıştırın
```

6. Development server'ı başlatın:
```bash
npm run dev
```

7. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Admin Paneli

Admin paneline erişmek için `/admin` sayfasını ziyaret edin. Admin panelinde:

- Blog yazılarını oluşturabilir, düzenleyebilir ve silebilirsiniz
- Hakkımda bölümlerini yönetebilirsiniz
- İçeriklerin sırasını değiştirebilirsiniz
- Yayın durumlarını kontrol edebilirsiniz

## API Endpoints

### Public Endpoints
- `GET /api/blogs` - Yayınlanmış blog yazılarını listeler
- `GET /api/about` - Aktif hakkımda bölümlerini listeler

### Admin Endpoints
- `GET/POST /api/admin/blogs` - Blog CRUD işlemleri
- `GET/PUT/DELETE /api/admin/blogs/[id]` - Tek blog işlemleri
- `GET/POST /api/admin/about` - Hakkımda CRUD işlemleri
- `GET/PUT/DELETE /api/admin/about/[id]` - Tek hakkımda bölümü işlemleri

## Veritabanı Yapısı

### Blogs Tablosu
- `id` (UUID) - Primary key
- `title` (VARCHAR) - Blog başlığı
- `content` (TEXT) - Blog içeriği
- `excerpt` (VARCHAR) - Kısa özet
- `image_url` (VARCHAR) - Resim URL'i
- `author` (VARCHAR) - Yazar adı
- `slug` (VARCHAR) - URL slug
- `is_published` (BOOLEAN) - Yayın durumu
- `tags` (TEXT[]) - Etiketler
- `created_at` (TIMESTAMP) - Oluşturulma tarihi
- `updated_at` (TIMESTAMP) - Güncellenme tarihi

### About Tablosu
- `id` (UUID) - Primary key
- `title` (VARCHAR) - Bölüm başlığı
- `content` (TEXT) - Bölüm içeriği
- `image_url` (VARCHAR) - Resim URL'i
- `section` (VARCHAR) - Bölüm kategorisi
- `order_index` (INTEGER) - Sıralama
- `is_active` (BOOLEAN) - Aktiflik durumu
- `created_at` (TIMESTAMP) - Oluşturulma tarihi
- `updated_at` (TIMESTAMP) - Güncellenme tarihi

## Deployment

Projeyi Vercel'e deploy etmek için:

1. GitHub'a push edin
2. Vercel hesabınızla bağlayın
3. Environment variables'ları Vercel dashboard'unda ayarlayın
4. Deploy edin

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun
