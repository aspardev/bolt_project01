# E-Ticaret Ürün Katalog Yönetimi

Bu proje, modern e-ticaret platformları için geliştirilmiş kapsamlı bir ürün katalog yönetim sistemidir. React frontend ve Node.js backend ile geliştirilmiştir.

## 🚀 Özellikler

### Frontend Özellikleri
- ✅ Modern, responsive React uygulaması
- ✅ Ürün CRUD işlemleri (Ekleme, Düzenleme, Silme, Listeleme)
- ✅ Gelişmiş filtreleme ve arama sistemi
- ✅ Kategori bazlı filtreleme
- ✅ Grid/List görünüm modları
- ✅ Drag & drop resim yükleme
- ✅ Cloudinary entegrasyonu
- ✅ Pagination ve lazy loading
- ✅ Responsive tasarım
- ✅ TypeScript desteği

### Backend Özellikleri (Örnek Kodlar)
- 🔧 RESTful API endpoints
- 🔧 Redis cache mekanizması
- 🔧 Cloudinary resim yükleme
- 🔧 Filtreleme ve sıralama
- 🔧 Pagination desteği
- 🔧 Error handling

## 🛠️ Teknolojiler

### Frontend
- **React 18** - Modern UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - İkon kütüphanesi
- **Vite** - Hızlı build aracı

### Backend (Örnek Yapı)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Redis** - Cache mekanizması
- **Cloudinary** - Resim yönetimi
- **Multer** - File upload

## 🚦 Kurulum ve Çalıştırma

### Frontend (Mevcut Proje)
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

### Backend (Ayrı kurulum gerekli)
```bash
# Backend dizinine git
cd backend-example

# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env
# .env dosyasını düzenle

# Redis sunucusunu başlat (Docker ile)
docker run -d --name redis -p 6379:6379 redis:alpine

# Sunucuyu başlat
npm run dev
```

## 🔧 Yapılandırma

### Cloudinary Kurulumu
1. [Cloudinary](https://cloudinary.com) hesabı oluşturun
2. Dashboard'dan API credentials'ları alın
3. `src/services/cloudinaryService.ts` dosyasında ayarları güncelleyin

### Redis Kurulumu
1. Redis sunucusu kurun veya Docker kullanın
2. Backend'de `.env` dosyasında Redis URL'sini ayarlayın

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── ImageUpload.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ProductFilters.tsx
│   ├── ProductDetailModal.tsx
│   └── Pagination.tsx
├── hooks/               # Custom hooks
│   └── useProducts.ts
├── services/            # API servis katmanı
│   ├── productService.ts
│   ├── categoryService.ts
│   └── cloudinaryService.ts
├── types/               # TypeScript tip tanımları
│   └── product.ts
└── App.tsx             # Ana uygulama bileşeni

backend-example/         # Backend örnek kodları
├── server.js           # Express sunucu
├── package.json        # Backend bağımlılıkları
└── .env.example        # Environment variables örneği
```

## 🔑 Ana Özellikler Detayı

### Ürün Yönetimi
- **CRUD İşlemleri**: Ürün ekleme, düzenleme, silme ve listeleme
- **Toplu İşlemler**: Çoklu seçim ve toplu işlem desteği
- **Durum Yönetimi**: Aktif, pasif ve taslak durumları

### Filtreleme ve Arama
- **Metin Araması**: Ürün adı, açıklama ve etiketlerde arama
- **Kategori Filtresi**: Kategori bazlı filtreleme
- **Durum Filtresi**: Ürün durumuna göre filtreleme
- **Sıralama**: Fiyat, ad, tarih ve stok bazlı sıralama

### Resim Yönetimi
- **Çoklu Resim**: Her ürün için maksimum 5 resim
- **Drag & Drop**: Kolay resim yükleme arayüzü
- **Cloudinary Entegrasyonu**: Otomatik resim optimizasyonu
- **Preview**: Anında resim önizleme

### Responsive Tasarım
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- **Grid/List Modu**: Kullanıcı tercihine göre görünüm
- **Touch Friendly**: Mobil cihazlar için optimize edilmiş

## 🎯 Cache Stratejisi

### Redis Cache Katmanları
- **Ürün Listesi**: Filtrelenmiş sonuçlar 10 dakika
- **Tekil Ürün**: Ürün detayları 1 saat
- **Kategoriler**: Kategori listesi 1 saat
- **Arama Sonuçları**: Arama sorguları 5 dakika

## 🔒 Güvenlik Özellikleri
- **Input Validation**: Tüm girdiler doğrulanır
- **XSS Koruması**: Cross-site scripting koruması
- **CORS Yapılandırması**: Güvenli cross-origin istekleri
- **File Upload Güvenliği**: Güvenli dosya yükleme

## 📈 Performans Optimizasyonları
- **Lazy Loading**: İhtiyaç halinde yükleme
- **Image Optimization**: Cloudinary ile otomatik optimizasyon
- **Pagination**: Büyük veri setleri için sayfalama
- **Cache**: Redis ile hızlı veri erişimi

## 🤝 Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-özellik`)
3. Değişiklikleri commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'e push yapın (`git push origin feature/yeni-özellik`)
5. Pull Request oluşturun

## 📄 Lisans
Bu proje MIT lisansı altında lisanslanmıştır.

## 🐛 Bilinen Sorunlar ve Çözümler
- **Cloudinary Upload**: Demo modunda mock response kullanılır
- **Redis Connection**: Yerel Redis sunucusu gereklidir
- **File Size**: Büyük dosyalar için client-side validation eklenmeli

## 📞 Destek
Sorularınız için issue açabilir veya e-posta gönderebilirsiniz.