# Gastromasa 2026

14 dil seçeneği, sahne programı, konuşmacılar, partnerler, kroki ve bilet bağlantıları bulunan statik web sitesi.

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
- `app.js`: program, arama, filtreler ve kaydetme
- `i18n.js`: TR/ENG/ESP arayüz çevirileri
- `program.json`, `program.en.json`, `program.es.json`: program verileri
- `chefs.js`, `chef-bios.json`: şef kartları ve açıklamaları
- `map.js`: kroki yakınlaştırma ve perspektif kontrolü
- `assets/`: şef fotoğrafları, logolar, kroki ve kapaklar

## Kapak görselleri

- Masaüstü: `assets/gastromasa-header.jpg`, 2400 × 1200 px.
- Mobil (600 px ve altı): `assets/gastromasa-header-mobile.jpg`, 1200 × 1600 px.

## Bilgiler

Kaydedilen oturumlar ziyaretçinin tarayıcısında saklanır. Bilet satışı haricî satış sayfasında yapılır. Fontlar Google Fonts üzerinden yüklenir.

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

Bölümler sol menüden ayrı görünümler olarak açılır. Languages menüsü 14 dili destekler: TR, EN, ES, IT, DE, FR, PT, ZH-CN, JA, AR, RU, DA, NL, EL. Arapça arayüz sağdan sola gösterilir.

47 konuşmacının organizatör tarafından iletilen biyografileri eklendi. İngilizce kaynaklar chef-bios.json dosyasındadır; çeviriler speaker-bios/ altında dil başına ayrı dosyalarda tutulur. Arayüz çevirileri locales/ altında yer alır. Biyografi çevirileri makine çevirisidir; sayfa açılışında haricî çeviri servisine ihtiyaç yoktur.

Fotoğraflı listede biyografisi henüz iletilmeyenler: Alexandre Couillon, Christian Escribà, Giulia Caffiero, Jaime Pesaque, Marco Müller, Matias Perdomo, Simon Rogan, Viki Geunes, Álvaro Salazar.

## Güncel sahne programı

11 Kasım 2026 tarihinde iletilen dört PDF esas alınmıştır. Ana Sahne: 26 Kasım 28, 27 Kasım 24 oturum. Hospitality / Sadabad: 26 Kasım 15, 27 Kasım 18 oturum. Toplam 85 oturum, 14 dilde statik JSON dosyalarında tutulur.

26 Kasım Sadabad “Yerel Mutfakların Yükselişi” saati organizatörün onayıyla 17.00–17.30 olarak düzeltilmiştir. PDF'de boş bırakılan moderatörler ve bilinmeyen konuşmacılar açıklanacak olarak işaretlenir. Oturum saatlerinde PDF kapaklarının genel aralıkları yerine tek tek oturumlarda belirtilen saatler kullanılır. Aynı program oturumlarının kimlikleri korunarak kayıtlı oturumların yeni saatlerle eşleşmesi sağlanır.

## Hakkında ve geri sayım

Hakkında bölümü organizatörün ilettiği metni 14 dilde sunar. Sohbet arayüzü ve uygulama kodu kaldırılmıştır. `countdown.js`, ilk program oturumuna göre 26 Kasım 2026 09.30 İstanbul saati (`2026-11-26T09:30:00+03:00`) için kapak üzerindeki kutuda gün/saat/dakika/saniye geri sayımı gösterir. Etkinlik başladığında değerler sıfırda kalır ve başlangıç mesajı görünür.

## Sol menü, logo ve konuşmacı kartları

Ana sayfa kapak galerisi ve sayacı gösterir. Sol üstteki menüden Hakkında, Program, Konuşmacılar, Partnerler, Kroki, Mekân ve Basında Biz görünümlerine geçilir. Sponsorlar alt menüsünde sekiz kategoriye doğrudan bağlantı vardır. URL parçası (#program gibi) doğrudan paylaşılabilir; tarayıcının geri/ileri düğmeleri de desteklenir. Üstteki bilet bağlantısı kaldırılmıştır; kapaktaki bilet bağlantısı korunur.

Ortadaki logo için önerilen dosya: 1200 × 300 px, şeffaf PNG veya SVG. Konuşmacı kartları sabit 3:4 görsel alanı ve üst hizalı içerik kullanır. Çeviri işlemi aynı metni tekrar tekrar dönüştürmez; oturum özeti yerelleştirilmiş, korunmuş bir metin olarak oluşturulur.

## Logolar, iletişim ve WhatsApp

İletilen 1200 × 300 px PNG ana logo üst alanda, sol menüde ve alt alanda kullanılır. TUROYD logosu STK kategorisine eklenmiştir. Ana logolar ve sponsor/STK logoları bağlantı içermez. Ana sayfaya sol menüdeki Ana Sayfa bağlantısıyla dönülür.

Basında Biz menüde Kroki'den önce gelir. İletişim, sol menünün son bölümündedir ve sitenin alt alanında adres ile her iki telefon numarasını gösterir. WhatsApp bağlantıları menüde ve alt alanda `https://wa.me/905348111937` adresini açar. Telefon bağlantıları +90 212 213 10 50 ve +90 534 811 19 37 numaralarına yönelir. Adres Arkon Residence 20/B, 19 Mayıs, 19 Mayıs Cd., 34360 Şişli/İstanbul olarak verilmiştir.

## Oturum bildirimleri

OneSignal web push altyapısı hazırlanmıştır. Etkinleştirmek için [BILDIRIM-KURULUM.md](BILDIRIM-KURULUM.md) adımlarını uygulayın. Bağlantı yapılmadan bildirim açma arayüzü gösterilmez. OneSignal, 85 oturumun her biri için İstanbul saatine göre başlangıçtan 5 dakika önce gönderilecek mesajları planlar. Gizli yapılandırma Vercel ortam değişkenlerinde tutulur. Hesap bağlanmadan gerçek cihaz teslimi doğrulanamaz.

Alt alanda yalnızca iletişim bilgileri ve WhatsApp bağlantısı kalır; alt logo, konferans adı ve partner bağlantısı kaldırılmıştır. Telefonlar tek satırda gösterilir.

## Basında Biz haber kartları

İlk haber kartı Euronews'in 3 Kasım 2026 tarihli “Dünyaca ünlü şefler 11. Gastromasa için İstanbul'da buluşacak” haberidir. Başlık ve ana görsel haberin Open Graph verilerinden, tarih `datePublished` bilgisinden doğrulanmıştır. Kart haberi yeni sekmede açar. Görsel yerel `assets/press/` altında tutulur; tarih `press.js` ile seçili dile göre biçimlendirilir. Kartlar masaüstünde üç, tablette iki, telefonda tek sütun olarak görüntülenir.
