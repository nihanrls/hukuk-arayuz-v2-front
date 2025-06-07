-- Supabase RLS Politikalarını Düzeltme
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'da çalıştırın

-- 1. Mevcut politikaları kaldır (eğer varsa)
DROP POLICY IF EXISTS "Enable read access for all users" ON blogs;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blogs;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blogs;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blogs;

-- 2. RLS'yi devre dışı bırak (geliştirme aşaması için)
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;

-- 3. About tablosu için de aynı işlemi yap
ALTER TABLE about DISABLE ROW LEVEL SECURITY;

-- 4. Eğer RLS'yi aktif tutmak istiyorsanız, aşağıdaki politikaları kullanın:
-- (Yukarıdaki DISABLE komutlarını çalıştırmayın)

/*
-- Blogs tablosu için politikalar
CREATE POLICY "Enable read access for all users" ON blogs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON blogs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON blogs
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON blogs
    FOR DELETE USING (true);

-- About tablosu için politikalar
CREATE POLICY "Enable read access for all users" ON about
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON about
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON about
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON about
    FOR DELETE USING (true);
*/

-- 5. Storage bucket için politikalar (eğer yoksa)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage politikaları
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images'); 