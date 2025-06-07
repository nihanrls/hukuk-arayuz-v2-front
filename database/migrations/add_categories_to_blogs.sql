-- Blog kategorileri tablosu oluştur
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#6B7280', -- Hex color code
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs tablosuna category_id kolonu ekle (eğer yoksa)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'blogs' AND column_name = 'category_id') THEN
        ALTER TABLE blogs ADD COLUMN category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Varsayılan kategorileri ekle
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Genel Hukuk', 'genel-hukuk', 'Genel hukuki konular ve güncel gelişmeler', '#3B82F6'),
('İş Hukuku', 'is-hukuku', 'İş hukuku ile ilgili makaleler', '#10B981'),
('Aile Hukuku', 'aile-hukuku', 'Aile hukuku ve medeni hukuk konuları', '#F59E0B'),
('Ceza Hukuku', 'ceza-hukuku', 'Ceza hukuku ve ceza muhakemesi', '#EF4444'),
('Ticaret Hukuku', 'ticaret-hukuku', 'Ticaret hukuku ve şirket hukuku', '#8B5CF6'),
('Gayrimenkul Hukuku', 'gayrimenkul-hukuku', 'Gayrimenkul ve tapu işlemleri', '#06B6D4'),
('Tüketici Hukuku', 'tuketici-hukuku', 'Tüketici hakları ve korunması', '#84CC16')
ON CONFLICT (slug) DO NOTHING;

-- Updated at trigger for categories
DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
CREATE TRIGGER update_blog_categories_updated_at
    BEFORE UPDATE ON blog_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 