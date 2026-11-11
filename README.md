# Gastromasa 2026

TR / ENG / ESP dil seçenekleri, sahne programı, şefler, partnerler, kroki ve bilet bağlantıları bulunan statik web sitesi.

## GitHub'a yükleme

1. ZIP'i bilgisayarınızda açın.
2. GitHub'da bir repository oluşturun.
3. **Add file → Upload files** ile bu ZIP'ten çıkan dosya ve klasörleri repository'nin köküne yükleyin. ZIP'in kendisini veya üst klasörünü yüklemeyin; `index.html` doğrudan kökte olmalı.
4. **Settings → Pages → Build and deployment** bölümünde **Deploy from a branch** seçin.
5. Branch: `main`, klasör: `/ (root)` seçip **Save** düğmesine basın.
6. GitHub Pages işlemi tamamlanınca aynı ekranda site bağlantısı görünür. Repository erişimi ve Pages kullanılabilirliği hesabınızın planına bağlıdır.

Node.js, npm veya build komutu gerekmez. Bağlantılar göreli olduğundan repository alt yolunda da çalışır.

## Dosyalar

- `index.html`: sayfa yapısı ve partner kartları
- `style.css`: mobil uyumlu tasarım
- `app.js`: program, arama, filtreler, kaydetme ve otomatik bilgi rehberi
- `i18n.js`: TR/ENG/ESP arayüz çevirileri
- `program.json`, `program.en.json`, `program.es.json`: program verileri
- `chefs.js`, `chef-bios.json`: şef kartları ve açıklamaları
- `map.js`: kroki yakınlaştırma ve perspektif kontrolü
- `assets/`: şef fotoğrafları, logolar, kroki ve kapaklar

## Kapak görselleri

- Masaüstü: `assets/gastromasa-header.jpg`, 2400 × 1200 px.
- Mobil (600 px ve altı): `assets/gastromasa-header-mobile.jpg`, 1200 × 1600 px.

## Bilgiler

Chat otomatik bir etkinlik bilgi rehberidir; canlı destek veya ziyaretçiler arası mesajlaşma değildir. Kaydedilen oturumlar ve sohbet geçmişi ziyaretçinin tarayıcısında saklanır. Bilet satışı haricî satış sayfasında yapılır. Fontlar Google Fonts üzerinden yüklenir.

## Yerelde önizleme

JSON dosyaları fetch ile yüklendiği için index.html'yi çift tıklayarak açmak yerine HTTP sunucusu kullanın:

```sh
python3 -m http.server 8000
```

Tarayıcıda http://localhost:8000 adresini açın.

## Otomatik yayın ve arka plan müziği

Bu deponun main dalına gönderilen değişiklikler Vercel tarafından otomatik yayınlanır.
MP3: assets/audio/saragina-rumba.mp3. Sayfa açılışında çalmayı dener; tarayıcı izin vermezse ilk etkileşimde başlar. YouTube veya müzik düğmesi yoktur.

## Konuşmacılar ve diller

Konuşmacılar bölümü programın önündedir. Languages menüsü 14 dili destekler: TR, EN, ES, IT, DE, FR, PT, ZH-CN, JA, AR, RU, DA, NL, EL. Arapça arayüz sağdan sola gösterilir.

47 konuşmacının organizatör tarafından iletilen biyografileri eklendi. İngilizce kaynaklar chef-bios.json dosyasındadır; çeviriler speaker-bios/ altında dil başına ayrı dosyalarda tutulur. Arayüz çevirileri locales/ altında yer alır. Biyografi çevirileri makine çevirisidir; sayfa açılışında haricî çeviri servisine ihtiyaç yoktur.

Fotoğraflı listede biyografisi henüz iletilmeyenler: Alexandre Couillon, Christian Escribà, Giulia Caffiero, Jaime Pesaque, Marco Müller, Matias Perdomo, Santiago Lastra, Simon Rogan, Viki Geunes, Álvaro Salazar.
