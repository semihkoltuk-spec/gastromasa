# Kapasite testi sonrası iyileştirmeler — 12 Kasım 2026

## Raporun sınırı

Kullanıcının paylaştığı test `/` ve `/program.json` adreslerini okuyup 10 saniye bekleyen 2.000 sanal kullanıcıya çıktı. Toplam 12.784 isteğin 3.475'i başarısız (%27,18); sabit yükte hata %38,93. 1.024 zaman aşımı, HTTP yanıtı alınamayan 2.247 “Service Unavailable” ve 103 “Bad Gateway”, ayrıca gerçekten HTTP 502 dönen 101 istek bildirildi. HTTP yanıtı alınamayan hataları otomatik olarak uygulamanın HTTP 503/502 yanıtı olarak yorumlamak doğru değildir. 20 saniye, testin zaman aşımı sınırıdır; gerçek en uzun yanıt süresini göstermez.

Değişiklik öncesi düşük hacimli okumada her iki statik adres Vercel CDN HIT veriyordu. Site yük altında zaten CDN kullanıyordu; bu çalışma “önceden önbellek yoktu” veya “hatalar kesin sunucudan kaynaklandı” iddiasında bulunmaz. Vercel hesabının istek/WAF kayıtlarına ve test çalıştırıcısının CPU, bağlantı ve ağ ölçümlerine erişim bulunmuyor. Yeni bir 2.000 kullanıcı testi çalıştırılmadı.

## Yapılan değişiklikler

- Ana HTML: **106.613 → 57.581 bayt (%46 azalma)**. Basında Biz kartlarının HTML kopyaları ilk belgeden çıkarıldı; 50 kart, bölüm açılınca `press.json` üzerinden oluşturulur. İki kategori, özgün başlıklar/tarihler, bağlantılar ve görsel konumları korunur. Yükleme hatasında yeniden deneme düğmesi vardır.
- Program JSON: yayımlanan dosya **55.282 → 38.609 bayt (%30 azalma)**. Bütün JSON dosyaları yayın derlemesinde boşluksuz yazılır; kaynak dosyalar ve 14 dilin tüm verileri korunur. Bu sayılar sıkıştırma öncesi dosya boyutlarıdır, ölçülmüş HTTP transfer süresi değildir.
- `data-loader.js`: program/konuşmacı bileşenleri aynı Promise ve JSON yanıtını paylaşır. Firma ve haber ayrıntıları ilk tıklamaya kadar indirilmez. Her kaynak için 6 saniyelik istek zaman aşımı, yalnızca bir gecikmeli/jitter'lı tekrar vardır. 404 ve uzun Retry-After yeniden denenmez; başarısız istek önbellekten temizlenerek sonraki kullanıcı eyleminde tekrar denenebilir. JSON istekleri yayın revizyonuyla sürümlenir.
- Ana HTML için tarayıcıda doğrulama, Vercel CDN için 300 saniye; JSON için tarayıcıda 60 saniye, CDN'de 3.600 saniye ve arka planda yenileme kuralları eklendi. Ortak statik JS/CSS/görseller için 3.600 saniye tarayıcı önbelleği tanımlandı. Service worker'ın no-cache ve özel CSP kuralı en sonda kalır. API ve kimlik doğrulama kuralları bu statik cache kapsamına girmez.
- Ana görsel: **511.956 → 67.504 bayt**, mobil ana görsel **261.131 → 53.208 bayt**. Dört galeri görseli toplam **2.423.672 → 364.442 bayt**. Yeni WebP dosyaları kullanılır; orijinaller saklanır.
- Kullanıcının kapak PNG'si **2.067.233 → 982.004 bayt** kayıpsız WebP olarak sunulur. RGB piksel karşılaştırması birebir aynı sonucu verdi; kırpma, logo değişimi veya yeniden tasarım yoktur. PNG orijinali saklanır.

## Doğrulama

Node testleri istek birleştirme, sınırlı tekrar, timeout/abort, Retry-After, dış kaynak engeli, 14 programın anlamsal eşitliği ve mevcut güvenlik/bildirim davranışlarını kapsar. 390 ve 1440 piksel Chromium kontrolleri program, 56 konuşmacı, firma/haber pencereleri, ertelenmiş kaynak istekleri ve 50 basın kartının bağlantı/tarih/görsellerini kontrol eder. Gerçek cihazda push teslimatı bu çalışmanın parçası değildir.

2.000 eşzamanlı kullanıcı kapasitesini doğrulamak için Vercel loglarında verilen User-Agent ve 20:48:12–20:49:44 Türkiye saati aralığı incelenmeli; testin ham k6 çıktısında her adres için hata kodları, blocked/connect/TLS/waiting/receiving süreleri karşılaştırılmalı. Aynı test, aşamalı yük ve %1 hata/p95 sınırlarında durdurma koşullarıyla, test istemcisinin kaynakları izlenerek ve mümkünse bağımsız bir ağdan yeniden doğrulanmalı. Görsel ve tarayıcı iyileştirmeleri, sadece iki URL okuyan testin tam tarayıcı deneyimini kapsadığı anlamına gelmez.

Önbellek davranışı için resmi kaynak: https://vercel.com/docs/caching/cache-control-headers
