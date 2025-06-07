-- Hizmetler tablosu oluştur
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  icon VARCHAR(100), -- Icon class name (örn: FiScale, FiShield)
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Varsayılan hizmetleri ekle (Markdown formatında)
INSERT INTO services (title, slug, description, content, icon, order_index) VALUES
(
  'Ceza Hukuku',
  'ceza-hukuku',
  'Ceza davalarında profesyonel hukuki destek ve savunma hizmetleri.',
  '# Ceza Hukuku Hizmetlerimiz

Ceza hukuku alanında uzman kadromuzla, müvekkillerimize en iyi savunma hizmetini sunuyoruz.

## Hizmet Alanlarımız

- **Ceza davalarında müdafilik** - Tüm ceza davalarında profesyonel savunma
- **Suç mağduru hakları** - Mağdur haklarının korunması ve tazminat talepleri
- **Ceza muhakemesi danışmanlığı** - Soruşturma ve kovuşturma süreçlerinde rehberlik
- **İcra takip işlemleri** - Hukuki alacakların takibi

## Uzmanlık Alanlarımız

### Ekonomik Suçlar
- Dolandırıcılık
- Sahtecilik
- Vergi suçları
- Bankacılık suçları

### Şiddet Suçları
- Kasten yaralama
- Tehdit
- Hakaret
- Cinsel suçlar

### Trafik Suçları
- Trafik kazaları
- Alkollü araç kullanma
- Ehliyetsiz araç kullanma

## Neden Bizi Tercih Etmelisiniz?

> Deneyimli kadromuz ve başarılı dava geçmişimizle, ceza hukuku alanında güvenilir çözümler sunuyoruz.

**25+ yıllık deneyim** ile yanınızdayız.',
  'FiShield',
  1
),
(
  'Medeni Hukuk',
  'medeni-hukuk',
  'Kişisel haklar, aile hukuku ve miras konularında kapsamlı hukuki danışmanlık.',
  '# Medeni Hukuk Hizmetlerimiz

Medeni hukuk alanında geniş kapsamlı hizmetler sunarak, kişisel haklarınızı koruyoruz.

## Ana Hizmet Alanlarımız

### Aile Hukuku
- **Boşanma davaları** - Anlaşmalı ve çekişmeli boşanma süreçleri
- **Nafaka davaları** - Eş ve çocuk nafakası hesaplamaları
- **Velayet davaları** - Çocukların üstün yararı gözetilerek
- **Mal paylaşımı** - Edinilmiş mallara katılma rejimi

### Miras Hukuku
- **Miras paylaşımı** - Mirasçılar arası anlaşmazlıkların çözümü
- **Vasiyetname düzenleme** - Hukuki geçerliliği olan vasiyetnameler
- **Mirasçılık belgesi** - Resmi işlemler için gerekli belgeler
- **Miras reddi** - Borçlu mirasların reddi işlemleri

### Kişilik Hakları
- **Şeref ve haysiyetin korunması**
- **Özel yaşamın gizliliği**
- **Kişisel verilerin korunması**

## Süreç Yönetimi

1. **İlk Görüşme** - Durumunuzun değerlendirilmesi
2. **Hukuki Analiz** - Detaylı dosya incelemesi
3. **Strateji Belirleme** - En uygun çözüm yolunun seçimi
4. **Takip ve Sonuç** - Sürecin yakın takibi

*Aile içi anlaşmazlıklarda önceliğimiz, tarafların menfaatlerini gözeterek barışçıl çözümler bulmaktır.*',
  'FiUsers',
  2
),
(
  'İş Hukuku',
  'is-hukuku',
  'İşçi ve işveren hakları, iş sözleşmeleri ve iş kazaları konularında uzman hizmet.',
  '# İş Hukuku Hizmetlerimiz

İş hukuku alanında hem işçi hem de işveren tarafına profesyonel danışmanlık hizmetleri veriyoruz.

## İşçi Hakları

### Temel Haklar
- **İş güvencesi** - 4857 sayılı İş Kanunu kapsamında
- **Kıdem ve ihbar tazminatı** - Hesaplama ve tahsil
- **Fazla mesai ücreti** - Yasal sınırlar ve hesaplama
- **Yıllık izin hakları** - Kullanım ve karşılığı

### İş Kazaları ve Meslek Hastalıkları
- **İş kazası tazminatları** - Maddi ve manevi tazminat talepleri
- **Meslek hastalığı tespiti** - Sağlık kurulu raporları
- **İş güvenliği ihlalleri** - İşverenin sorumluluğu

## İşveren Danışmanlığı

### Sözleşme Yönetimi
- **İş sözleşmesi hazırlama** - Hukuka uygun sözleşmeler
- **Toplu iş sözleşmeleri** - Sendika müzakereleri
- **İş yeri yönetmelikleri** - İç düzenlemeler

### Risk Yönetimi
- **İş hukuku uyum programları**
- **Personel politikaları**
- **Disiplin süreçleri**

## Dava Süreçleri

| Dava Türü | Süre | Başarı Oranı |
|-----------|------|---------------|
| İşe İade | 2-6 ay | %85 |
| Kıdem Tazminatı | 1-3 ay | %90 |
| İş Kazası | 6-12 ay | %80 |

## Uzman Kadromuz

**İş hukuku alanında 15+ yıl deneyim** sahibi avukatlarımızla, tüm iş hukuku süreçlerinizde yanınızdayız.

> "İş barışının sağlanması, hem işçi hem de işveren için en önemli hedeftir."',
  'FiBriefcase',
  3
),
(
  'Ticaret Hukuku',
  'ticaret-hukuku',
  'Şirket kuruluşu, ticari sözleşmeler ve ticaret hukuku danışmanlığı.',
  '# Ticaret Hukuku Hizmetlerimiz

Ticaret hukuku alanında şirketlere ve girişimcilere kapsamlı hukuki destek sağlıyoruz.

## Şirket Hukuku

### Şirket Kuruluşu
- **Limited Şirket** - Küçük ve orta ölçekli işletmeler için
- **Anonim Şirket** - Büyük ölçekli yatırımlar için
- **Kollektif ve Komandit Şirketler** - Geleneksel yapılar
- **Kooperatif** - Sosyal ekonomi modelleri

### Şirket İşlemleri
- **Sermaye artırımı** - Nakdi ve ayni sermaye
- **Birleşme ve devir** - Şirket yapılandırmaları
- **Tasfiye işlemleri** - Şirket kapatma süreçleri

## Ticari Sözleşmeler

### Temel Sözleşmeler
- **Alım-satım sözleşmeleri**
- **Distribütörlük anlaşmaları**
- **Franchising sözleşmeleri**
- **Ortaklık anlaşmaları**

### Özel Sözleşmeler
- **Teknoloji transfer anlaşmaları**
- **Lisans sözleşmeleri**
- **Joint venture anlaşmaları**

## Ticari Uyuşmazlıklar

### Dava Türleri
1. **Alacak davaları** - Ticari alacakların tahsili
2. **Sözleşme ihlali** - Tazminat talepleri
3. **Haksız rekabet** - Rekabet hukuku ihlalleri
4. **Marka ve patent uyuşmazlıkları**

### Alternatif Çözüm Yolları
- **Arabuluculuk** - Hızlı ve ekonomik çözüm
- **Tahkim** - Uzman hakem heyetleri
- **Müzakere** - Dostane çözüm arayışı

## Sektörel Uzmanlık

```
✓ Teknoloji ve yazılım
✓ İnşaat ve gayrimenkul  
✓ Turizm ve otelcilik
✓ İmalat ve üretim
✓ E-ticaret
```

## Danışmanlık Hizmetleri

**Sürekli hukuki danışmanlık** ile şirketinizin tüm hukuki ihtiyaçlarını karşılıyoruz:

- Aylık hukuki değerlendirme raporları
- Mevzuat takibi ve uyum
- Risk analizi ve önleme
- Eğitim ve seminerler

*Ticari hayatta başarı, doğru hukuki stratejilerle mümkündür.*',
  'FiTrendingUp',
  4
),
(
  'İdare Hukuku',
  'idare-hukuku',
  'Kamu yönetimi, idari işlemler ve idari yargı konularında danışmanlık.',
  '# İdare Hukuku Hizmetlerimiz

İdare hukuku alanında kamu kurumları ve vatandaşlar arasındaki ilişkilerde hukuki destek sunuyoruz.

## Ana Hizmet Alanları

### İdari İşlemler
- **İdari işlem iptali** - Hukuka aykırı işlemlerin iptali
- **İdari para cezaları** - Ceza itirazları ve iptali
- **Ruhsat ve izin işlemleri** - Başvuru ve itiraz süreçleri
- **Kamu görevlisi hakları** - Atama, terfi, disiplin

### Kamu İhale Hukuku
- **İhale süreçleri** - Katılım ve itiraz hakları
- **İhale iptali davaları** - Usulsüzlük iddialarının takibi
- **Sözleşme uyuşmazlıkları** - Kamu sözleşmelerinde sorunlar
- **Teminat işlemleri** - Geçici ve kesin teminatlar

## İdari Yargı

### Dava Türleri
1. **İptal Davaları**
   - İdari işlemlerin iptali
   - Düzenleyici işlemlerin iptali
   - Yürütmenin durdurulması

2. **Tam Yargı Davaları**
   - Tazminat talepleri
   - Sözleşme uyuşmazlıkları
   - Kamu zararı davaları

### Süreç Yönetimi
- **Ön inceleme** - Dosyanın hukuki değerlendirmesi
- **Dava açma** - Usul ve süre takibi
- **Delil toplama** - Bilgi edinme ve keşif
- **Temyiz** - Üst mahkeme başvuruları

## Özel Uzmanlık Alanları

### İmar Hukuku
- **İmar planı değişiklikleri**
- **Yapı ruhsatı sorunları**
- **Kaçak yapı cezaları**
- **İmar barışı başvuruları**

### Çevre Hukuku
- **Çevresel etki değerlendirmesi**
- **Çevre kirliliği davaları**
- **Orman alanları uyuşmazlıkları**
- **Su hakları ve kullanımı**

### Vergi Hukuku
- **Vergi davaları** - İdari ve adli yargı
- **Vergi cezaları** - İtiraz ve temyiz
- **Vergi incelemesi** - Süreç yönetimi
- **Vergi barışı** - Yapılandırma işlemleri

## Başvuru Süreçleri

| İşlem | Süre | Gerekli Belgeler |
|-------|------|------------------|
| İdari Başvuru | 30 gün | Dilekçe + Ekler |
| İptal Davası | 60 gün | Tebliğ + Gerekçe |
| Tam Yargı | 1 yıl | Zarar + Nedensellik |

## Kamu Kurumları ile İlişkiler

**25+ yıllık deneyimimiz** ile kamu kurumlarındaki süreçleri yakından biliyoruz:

- Bakanlıklar ve bağlı kuruluşlar
- Belediyeler ve il özel idareleri  
- Düzenleyici ve denetleyici kurumlar
- Kamu iktisadi teşebbüsleri

> "Kamu yararı ile bireysel haklar arasındaki dengeyi korumak, idare hukukunun temel amacıdır."

## Danışmanlık Avantajları

- **Hızlı çözüm** - Uzman kadro ile süratli değerlendirme
- **Maliyet etkinliği** - Gereksiz dava masraflarından kaçınma  
- **Süreç takibi** - Tüm aşamalarda bilgilendirme
- **Başarı odaklılık** - Sonuç almaya yönelik strateji',
  'FiFileText',
  5
),
(
  'Sigorta Hukuku',
  'sigorta-hukuku',
  'Sigorta poliçeleri, hasar tazminatları ve sigorta uyuşmazlıkları.',
  '# Sigorta Hukuku Hizmetlerimiz

Sigorta hukuku alanında poliçe sahipleri ve sigorta şirketleri arasındaki uyuşmazlıklarda çözüm üretiyoruz.

## Sigorta Türleri

### Zorunlu Sigortalar
- **Trafik Sigortası** - Araç sahipleri için zorunlu
- **DASK** - Doğal afet sigortası
- **İşveren Mali Sorumluluk** - İş kazaları için
- **Mesleki Sorumluluk** - Meslek grupları için

### İhtiyari Sigortalar
- **Kasko Sigortası** - Araç hasarları
- **Konut Sigortası** - Ev ve eşya güvencesi
- **Sağlık Sigortası** - Özel sağlık hizmetleri
- **Hayat Sigortası** - Yaşam güvencesi

## Hasar Süreçleri

### Hasar Bildirimi
1. **Anında bildirim** - 24-48 saat içinde
2. **Belge toplama** - Gerekli evrakların hazırlanması
3. **Ekspertiz** - Hasar tespit süreçleri
4. **Değerlendirme** - Sigorta şirketi incelemesi

### Tazminat Hesaplama
- **Maddi hasar** - Onarım veya yenileme bedeli
- **Manevi tazminat** - Acı ve ıstırap bedeli
- **İş göremezlik** - Gelir kaybı tazminatı
- **Bakım giderleri** - Sürekli bakım ihtiyacı

## Uyuşmazlık Çözümü

### Sigorta Şirketi ile Anlaşmazlık
- **Red gerekçelerinin incelenmesi**
- **Ekspertiz raporlarının değerlendirilmesi**
- **Hukuki hakların belirlenmesi**
- **Müzakere ve dava süreçleri**

### Dava Türleri
1. **Tazminat Davaları**
   - Hasar bedeli talepleri
   - Gecikme faizi
   - Vekalet ücreti

2. **Sözleşme Davaları**
   - Poliçe şartları uyuşmazlığı
   - Prim iadesi talepleri
   - Fesih davaları

## Trafik Kazaları

### Kaza Anında Yapılacaklar
```
1. Güvenlik önlemleri
2. Polis ve ambulans çağırma
3. Fotoğraf çekme
4. Tanık bilgileri alma
5. Sigorta şirketini arama
```

### Kusur Oranları
- **%0 Kusur** - Tam tazminat hakkı
- **%25-50 Kusur** - Kısmi tazminat
- **%100 Kusur** - Tazminat hakkı yok
- **Karma Kusur** - Karşılıklı tazminat

### Tazminat Kalemleri
| Kalem | Açıklama | Hesaplama |
|-------|----------|-----------|
| Araç Hasarı | Onarım/Değer kaybı | Ekspertiz raporu |
| Tedavi Gideri | Hastane masrafları | Fatura toplamı |
| İş Göremezlik | Gelir kaybı | Günlük kazanç × Gün |
| Manevi Tazminat | Acı ve ıstırap | Mahkeme takdiri |

## Özel Durumlar

### Alkollü Sürücü
- **Cezai sorumluluk** - Adli süreçler
- **Sigorta kapsamı** - Rücu hakları
- **Tazminat hakları** - Mağdur hakları

### Ehliyetsiz Sürücü
- **Sigorta şirketi rücu hakkı**
- **Kişisel sorumluluk**
- **Cezai yaptırımlar**

### Çalıntı Araç
- **Kasko tazminatı** - Çalınma bedeli
- **Polis raporu** - Suç duyurusu
- **Bekleme süresi** - 30 gün kural

## Sağlık Sigortası

### Kapsam Dışı Durumlar
- **Önceden var olan hastalıklar**
- **Estetik operasyonlar**
- **Deneysel tedaviler**
- **Bekleme süreleri**

### İtiraz Süreçleri
- **Red gerekçesi analizi**
- **Tıbbi rapor değerlendirmesi**
- **İkinci görüş alma**
- **Hukuki başvuru yolları**

## Uzman Desteği

**Sigorta hukuku alanında 20+ yıl deneyim** ile:

- Sigorta şirketleri ile müzakere
- Ekspertiz süreçlerinde temsil
- Mahkeme süreçlerinde savunma
- Tazminat hesaplama ve takip

> "Sigorta, güvence sağlamak için vardır. Bu güvencenin eksiksiz kullanılması hakkınızdır."

*Her sigorta uyuşmazlığında, poliçe sahibinin haklarını sonuna kadar savunuyoruz.*',
  'FiUmbrella',
  6
)
ON CONFLICT (slug) DO NOTHING;

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Services için trigger
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 