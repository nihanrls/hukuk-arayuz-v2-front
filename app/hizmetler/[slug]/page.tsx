import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

// Hizmet verileri (gerçek uygulamada bu veriler bir API'den veya CMS'den gelecektir)
const services = {
  'ceza-hukuku': {
    title: 'Ceza Hukuku',
    description: `Ceza hukuku alanında uzman kadromuzla, müvekkillerimize en iyi hukuki danışmanlık hizmetini sunuyoruz. 
    Ceza davalarında profesyonel yaklaşımımız ve deneyimimizle, haklarınızı en etkili şekilde savunuyoruz. 
    Ceza hukuku alanında karşılaştığınız tüm sorunlarda yanınızdayız.`,
    shortDescription: "Ceza davalarında profesyonel hukuki danışmanlık ve savunma hizmetleri",
    image: '/media/services/ceza-hukuku.jpg',
    tag: "Ceza Hukuku"
  },
  'medeni-hukuk': {
    title: 'Medeni Hukuk',
    description: `Medeni hukuk alanında uzman kadromuzla, aile hukuku, miras hukuku, kişiler hukuku ve eşya hukuku 
    konularında profesyonel hukuki danışmanlık hizmeti veriyoruz. Deneyimli avukatlarımızla, haklarınızı koruyoruz.`,
    shortDescription: "Aile, miras ve kişiler hukuku alanında uzman hukuki danışmanlık",
    image: '/media/services/medeni-hukuk.jpg',
    tag: "Medeni Hukuk"
  },
  'is-hukuku': {
    title: 'İş Hukuku',
    description: `İş hukuku alanında uzman kadromuzla, işçi ve işveren uyuşmazlıklarında profesyonel hukuki danışmanlık 
    hizmeti veriyoruz. İş sözleşmeleri, işe iade davaları, tazminat talepleri ve diğer iş hukuku konularında yanınızdayız.`,
    shortDescription: "İşçi ve işveren uyuşmazlıklarında profesyonel hukuki destek",
    image: '/media/services/is-hukuku.jpg',
    tag: "İş Hukuku"
  },
  'ticaret-hukuku': {
    title: 'Ticaret Hukuku',
    description: `Ticaret hukuku alanında uzman kadromuzla, şirketler hukuku, sözleşmeler, ticari uyuşmazlıklar ve 
    iflas hukuku konularında profesyonel hukuki danışmanlık hizmeti veriyoruz. İşletmenizin hukuki ihtiyaçlarında yanınızdayız.`,
    shortDescription: "Şirketler ve ticari uyuşmazlıklarda uzman hukuki danışmanlık",
    image: '/media/services/ticaret-hukuku.jpg',
    tag: "Ticaret Hukuku"
  },
  'idare-hukuku': {
    title: 'İdare Hukuku',
    description: `İdare hukuku alanında uzman kadromuzla, kamu kurumlarıyla ilgili hukuki süreçlerde profesyonel 
    danışmanlık hizmeti veriyoruz. İdari davalar, kamu ihaleleri ve diğer idari hukuk konularında yanınızdayız.`,
    shortDescription: "Kamu kurumlarıyla ilgili hukuki süreçlerde profesyonel destek",
    image: '/media/services/idare-hukuku.jpg',
    tag: "İdare Hukuku"
  },
  'sigorta-hukuku': {
    title: 'Sigorta Hukuku',
    description: `Sigorta hukuku alanında uzman kadromuzla, sigorta uyuşmazlıkları ve tazminat talepleri konusunda 
    profesyonel hukuki danışmanlık hizmeti veriyoruz. Sigorta şirketleriyle yaşanan sorunlarda haklarınızı koruyoruz.`,
    shortDescription: "Sigorta uyuşmazlıkları ve tazminat taleplerinde hukuki destek",
    image: '/media/services/sigorta-hukuku.jpg',
    tag: "Sigorta Hukuku"
  }
};

// Hizmet detayları (gerçek uygulamada bu veriler bir API'den veya CMS'den gelecektir)
const serviceDetails = {
  'ceza-hukuku': {
    sections: [
      {
        title: "Ceza Davalarında Savunma",
        content: "Ceza davalarında profesyonel savunma stratejileri geliştiriyor, müvekkillerimizin haklarını en etkili şekilde savunuyoruz. Uzman kadromuz, ceza muhakemesi süreçlerinde deneyimli ve başarılı bir savunma sunuyor."
      },
      {
        title: "Hizmet Kapsamımız",
        content: "• Ceza davalarında savunma\n• Soruşturma aşamasında hukuki danışmanlık\n• İtiraz ve temyiz süreçleri\n• Ceza muhakemesi süreçleri\n• Ceza davalarında uzlaşma"
      },
      {
        title: "Uzmanlık Alanlarımız",
        content: "• Ekonomik suçlar\n• Trafik suçları\n• Şiddet suçları\n• Siber suçlar\n• Kamu görevlilerine karşı suçlar"
      }
    ]
  },
  'medeni-hukuk': {
    sections: [
      {
        title: "Aile Hukuku",
        content: "Boşanma, nafaka, velayet ve mal paylaşımı konularında profesyonel hukuki danışmanlık ve avukatlık hizmeti veriyoruz. Aile hukuku alanında uzman kadromuzla yanınızdayız."
      },
      {
        title: "Miras Hukuku",
        content: "Miras paylaşımı, vasiyetname düzenleme, mirasçılık belgesi ve miras davalarında profesyonel hukuki destek sağlıyoruz."
      },
      {
        title: "Hizmet Kapsamımız",
        content: "• Boşanma davaları\n• Nafaka davaları\n• Velayet davaları\n• Mal paylaşımı\n• Miras davaları\n• Vasiyetname düzenleme"
      }
    ]
  },
  'is-hukuku': {
    sections: [
      {
        title: "İşçi-İşveren İlişkileri",
        content: "İş sözleşmeleri, işe iade davaları, tazminat talepleri ve iş hukuku alanındaki tüm uyuşmazlıklarda profesyonel hukuki danışmanlık hizmeti veriyoruz."
      },
      {
        title: "Hizmet Kapsamımız",
        content: "• İş sözleşmesi düzenleme\n• İşe iade davaları\n• Tazminat davaları\n• İş kazası davaları\n• Toplu iş hukuku\n• İş hukuku danışmanlığı"
      },
      {
        title: "Uzmanlık Alanlarımız",
        content: "• İşçi hakları\n• İşveren hakları\n• İş kazaları\n• Meslek hastalıkları\n• Toplu iş hukuku"
      }
    ]
  },
  'ticaret-hukuku': {
    sections: [
      {
        title: "Şirketler Hukuku",
        content: "Şirket kuruluşu, birleşme, devir ve tasfiye süreçlerinde profesyonel hukuki danışmanlık hizmeti veriyoruz."
      },
      {
        title: "Ticari Uyuşmazlıklar",
        content: "Ticari sözleşmeler, ticari davalar ve uyuşmazlık çözümünde uzman kadromuzla yanınızdayız."
      },
      {
        title: "Hizmet Kapsamımız",
        content: "• Şirket kuruluşu\n• Şirket birleşme ve devirleri\n• Ticari sözleşmeler\n• Ticari davalar\n• İflas hukuku\n• Rekabet hukuku"
      }
    ]
  },
  'idare-hukuku': {
    sections: [
      {
        title: "İdari Davalar",
        content: "Kamu kurumlarıyla ilgili hukuki süreçlerde, idari davalarda ve kamu ihalelerinde profesyonel hukuki danışmanlık hizmeti veriyoruz."
      },
      {
        title: "Hizmet Kapsamımız",
        content: "• İdari davalar\n• Kamu ihaleleri\n• İdari yargı süreçleri\n• Kamu görevlileri hukuku\n• İmar hukuku\n• Çevre hukuku"
      },
      {
        title: "Uzmanlık Alanlarımız",
        content: "• Kamu ihaleleri\n• İmar hukuku\n• Çevre hukuku\n• Kamu görevlileri hukuku\n• İdari yargı"
      }
    ]
  },
  'sigorta-hukuku': {
    sections: [
      {
        title: "Sigorta Uyuşmazlıkları",
        content: "Sigorta şirketleriyle yaşanan uyuşmazlıklarda ve tazminat taleplerinde profesyonel hukuki danışmanlık hizmeti veriyoruz."
      },
      {
        title: "Hizmet Kapsamımız",
        content: "• Sigorta uyuşmazlıkları\n• Tazminat davaları\n• Sigorta sözleşmeleri\n• Sigorta hukuku danışmanlığı\n• Sigorta şirketleri hukuku"
      },
      {
        title: "Uzmanlık Alanlarımız",
        content: "• Kasko sigortası\n• Trafik sigortası\n• Sağlık sigortası\n• İşyeri sigortası\n• Zorunlu sigortalar"
      }
    ]
  }
};

// Blog yazıları (gerçek uygulamada bu veriler bir API'den veya CMS'den gelecektir)
const blogPosts = [
  {
    id: 1,
    title: "İş Sözleşmesinin Feshi ve Haklar",
    excerpt: "İş sözleşmesinin feshi durumunda işçi ve işveren hakları nelerdir? Detaylı hukuki analiz...",
    author: "Av. Mehmet Yılmaz",
    date: "2024-03-15",
    readTime: "8 dk",
    tags: ["İş Hukuku", "Sözleşmeler"],
    image: "/blog-images/is-hukuku.jpg",
    slug: "is-sozlesmesinin-feshi-ve-haklar"
  },
  {
    id: 2,
    title: "Ceza Davalarında Zamanaşımı Süreleri",
    excerpt: "Ceza davalarında zamanaşımı süreleri nelerdir? Hangi durumlarda zamanaşımı uygulanır?",
    author: "Av. Ahmet Demir",
    date: "2024-03-10",
    readTime: "6 dk",
    tags: ["Ceza Hukuku"],
    image: "/blog-images/ceza-hukuku.jpg",
    slug: "ceza-davalarinda-zamanasimi-sureleri"
  },
  {
    id: 3,
    title: "Aile Hukuku ve Boşanma Süreci",
    excerpt: "Boşanma süreci nasıl işler? Aile hukuku kapsamında haklarınız nelerdir?",
    author: "Av. Elif Kaya",
    date: "2024-03-05",
    readTime: "7 dk",
    tags: ["Medeni Hukuk"],
    image: "/blog-images/aile-hukuku.jpg",
    slug: "aile-hukuku-ve-bosanma-sureci"
  },
  {
    id: 4,
    title: "Miras Hukuku: Mirasın Paylaşımı",
    excerpt: "Miras paylaşımı nasıl yapılır? Miras hukuku kapsamında dikkat edilmesi gerekenler.",
    author: "Av. Selin Yıldız",
    date: "2024-02-28",
    readTime: "5 dk",
    tags: ["Medeni Hukuk"],
    image: "/blog-images/miras-hukuku.jpg",
    slug: "miras-hukuku-mirasin-paylasimi"
  },
  {
    id: 5,
    title: "Ticaret Hukuku ve Sözleşmeler",
    excerpt: "Ticaret hukuku kapsamında sözleşmelerin önemi ve geçerlilik şartları.",
    author: "Av. Canan Çelik",
    date: "2024-02-20",
    readTime: "9 dk",
    tags: ["Ticaret Hukuku"],
    image: "/blog-images/ticaret-hukuku.jpg",
    slug: "ticaret-hukuku-ve-sozlesmeler"
  },
  {
    id: 6,
    title: "İdare Hukuku: İdari İşlemler",
    excerpt: "İdari işlemler nelerdir? İdare hukuku kapsamında haklarınız.",
    author: "Av. Oğuzhan Arslan",
    date: "2024-02-15",
    readTime: "6 dk",
    tags: ["İdare Hukuku"],
    image: "/blog-images/idare-hukuku.jpg",
    slug: "idare-hukuku-idari-islemler"
  }
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];
  const details = serviceDetails[slug as keyof typeof serviceDetails];
  
  if (!service) {
    notFound();
  }

  // İlgili blog yazılarını etiketlere göre filtrele
  const relatedPosts = blogPosts.filter(post => 
    post.tags.includes(service.tag)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[#111C31]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="pt-12 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Sol taraf - İletişim CTA ve Kategoriler */}
            <div className="md:w-1/3 space-y-6">
              {/* İletişim CTA */}
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/media/contact-bg.jpg"
                  alt="İletişim"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Daha Fazla Sorunuz mu Var?
                  </h3>
                  <p className="text-gray-200 mb-6">
                    Hukuki danışmanlık için hemen bizimle iletişime geçin.
                  </p>
                  <Link
                    href="/bizeulasin"
                    className="bg-white text-[#111C31] px-6 py-3 rounded-lg font-semibold hover:bg-[#111C31] hover:text-white transition-colors"
                  >
                    Bize Ulaşın
                  </Link>
                </div>
              </div>

              {/* Diğer Hizmetler */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#111C31] mb-4">
                  Diğer Hizmetler
                </h3>
                <div className="space-y-2">
                  {Object.entries(services).map(([serviceSlug, s]) => (
                    <Link
                      key={serviceSlug}
                      href={`/hizmetler/${serviceSlug}`}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        serviceSlug === slug
                          ? 'bg-[#111C31] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sağ taraf - Açıklama */}
            <div className="md:w-2/3 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#111C31] pb-4">
                Hizmet Detayları
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed mb-8">
                  {service.description}
                </p>
                {details.sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold text-[#111C31] mb-3">
                      {section.title}
                    </h3>
                    {section.content.includes('•') ? (
                      <div className="space-y-2">
                        {section.content.split('\n').map((item, i) => (
                          item.trim() && (
                            <div key={i} className="flex items-start gap-3">
                              <FaCheck className="text-[#25D366] mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item.replace('•', '').trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700 whitespace-pre-line">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* İlgili Blog Yazıları */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-[#111C31] pb-4 text-center">
                {service.title} ile İlgili Blog Yazıları
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group overflow-hidden"
                  >
                    {/* Blog Görseli */}
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Blog İçeriği */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#111C31] group-hover:text-[#4352a5] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 