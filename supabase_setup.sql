-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    image_url VARCHAR(255),
    author VARCHAR(100),
    slug VARCHAR(255),
    is_published BOOLEAN DEFAULT true,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create about table
CREATE TABLE IF NOT EXISTS public.about (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    section VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);

CREATE INDEX IF NOT EXISTS idx_about_active ON public.about(is_active);
CREATE INDEX IF NOT EXISTS idx_about_order ON public.about(order_index);
CREATE INDEX IF NOT EXISTS idx_about_section ON public.about(section);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON public.blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_updated_at 
    BEFORE UPDATE ON public.about
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON public.blogs
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.about
    FOR SELECT USING (true);

-- Create policies for authenticated users (admin operations)
-- You can modify these based on your authentication requirements
CREATE POLICY "Enable all operations for authenticated users" ON public.blogs
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.about
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO public.blogs (title, content, excerpt, author, slug, is_published) VALUES
('Hukuk Büromuz Hakkında', 'Bu blog yazısında hukuk büromuzun tarihçesi ve hizmetleri hakkında bilgi bulabilirsiniz...', 'Hukuk büromuzun tarihçesi ve hizmetleri', 'Av. Mehmet Yılmaz', 'hukuk-buromuz-hakkinda', true),
('Aile Hukuku Rehberi', 'Aile hukuku konularında bilmeniz gerekenler ve süreçler hakkında detaylı bilgiler...', 'Aile hukuku süreçleri hakkında rehber', 'Av. Ayşe Demir', 'aile-hukuku-rehberi', true),
('İş Hukuku ve Çalışan Hakları', 'İş hukuku kapsamında çalışan hakları ve işveren yükümlülükleri...', 'Çalışan hakları ve işveren yükümlülükleri', 'Av. Ali Kaya', 'is-hukuku-calisan-haklari', true);

INSERT INTO public.about (title, content, section, order_index, is_active) VALUES
('Misyonumuz', 'Müvekkillerimize en kaliteli hukuki hizmeti sunmak ve adaletin tecellisine katkıda bulunmak temel misyonumuzdur.', 'Misyon', 1, true),
('Vizyonumuz', 'Hukuk alanında öncü ve güvenilir bir büro olarak, toplumsal adalete katkıda bulunmayı hedefliyoruz.', 'Vizyon', 2, true),
('Değerlerimiz', 'Dürüstlük, şeffaflık, profesyonellik ve müvekkil memnuniyeti temel değerlerimizdir.', 'Değerler', 3, true),
('Ekibimiz', 'Deneyimli avukatlarımız ve uzman personelimizle güçlü bir ekip oluşturuyoruz.', 'Ekip', 4, true); 