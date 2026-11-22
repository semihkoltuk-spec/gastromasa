# Konferans yayını hazırlığı — 23 Kasım 2026

## Uygulananlar
- HTML, program ve görseller statik Vercel CDN dosyalarıdır; ziyaretçi başına veritabanı işlemi yoktur.
- Üretimde 18 klasik JavaScript isteği tek, içerik parmak izli deferred bundle olarak sunulur. CSS aynı şekilde parmak izlidir. `/static/` dosyaları immutable önbelleklidir. Kaynaklar ve eski istemciler için bireysel JS dosyaları tutulur.
- Türkçe yayında gereksiz locale isteği ve tüm DOM'u her değişiklikte tarayan çeviri gözlemcisi kaldırıldı; 14 dilin kaynakları ve yeniden açma bayrağı korundu.
- Program, konuşmacı biyografileri ve push kurulumu ilgili bölüme girilince yüklenir. Ana sayfa bu istekleri başlatmaz.
- Program istekleri paylaşılır, zaman aşımı ve en fazla iki deneme uygulanır. Son başarılı program en fazla yedi gün tarayıcıda tutulur; bağlantı başarısız olduğunda tarihiyle birlikte açık uyarı gösterilir. İlk kez çevrimdışı açılan site için bu bir çözüm değildir.
- Programın 113 oturumluk, scriptsiz HTML kopyası açıkça indirilebilir; telefona kaydedilen dosya çevrimdışı okunabilir. İndirilen kopya otomatik güncellenmez.
- Müzik preload none; otomatik oynatma girişimi ve kullanıcı hareketiyle başlatma korunur. Instagram açılınca durma/kapanınca sürme korunur.
- Galeri yalnızca görünürken döner ve sonraki görseller ihtiyaç oldukça yüklenir.
- Google Fonts bağımlılığı kaldırıldı; aynı ailelerin Latin/Türkçe glifleri yerel WOFF olarak sunulur. OFL lisansları depoda tutulur. CSP font-src self olarak daraltıldı.
- Node testleri her push/PR için GitHub Actions'a eklendi. Gizli dosyalar public çıktısına alınmaz.

## Doğrulama ve sınırlar
- 26 otomatik kontrol: güvenlik, gizli yapılandırma, scheduler, kaynak program tutarlılığı, bundle ve statik referanslar, önbellek yedeği ve süresi.
- Yerel Chromium: 390/1440 pikselde 113 oturum kartı ve diyalog, altı salon/gün kombinasyonu, arama, filtre, eski kayıtlı ID'ler, 51 konuşmacı ve aksanlı biyografi eşlemesi.
- İlk açılış ölçümü yerel Chromium'da, boş önbellekle, beş saniyelik pencere ve dış kaynaklar engellenerek yapılır. Gerçek kullanıcı LCP veya Vercel kapasite ölçümü değildir. Fontların artık yerel olması karşılaştırılan istek kapsamını da değiştirir.
- 23 Kasım kontrolünde canlı `/api/push-config` hâlâ `configured:false` döndürüyor. Bu nedenle kapalı site bildirimlerinin çalıştığı söylenemez. ONESIGNAL_APP_ID / ONESIGNAL_REST_API_KEY / CRON_SECRET adları ve değer biçimleri hesap tarafında kontrol edilmeli. Gizli değerler paylaşılmamalı. Gerçek cihaz aboneliği ve test teslimatı ayrıca doğrulanmalı.
- Vercel hesabı kullanıcı beyanına göre Hobby. Kalan kota, faturalama dönemi, Firewall olayları, ham test çıktısı ve hesap loglarına erişimimiz yok. Eski 2.000 VU testindeki yanıt alınamayan hataların kaynağı bu bilgiler olmadan belirlenemez.

## Yayın öncesi hesap adımları
1. Hobby kişisel/ticari olmayan kullanım içindir. Konferans yayını için ticari kullanıma uygun plan gerekir. Pro'ya geçiş tek başına 5.000 eşzamanlı kullanıcı garantisi değildir.
2. Usage: kalan Fast Data Transfer ve CDN Requests; Firewall: engellenen trafik ve test IP'leri; Observability: 5xx, gecikme ve kaynak yolları kontrol edilmeli. CDN istek sayısı kişi sayısı değildir. Web Analytics'teki Demo Data gerçek trafik değildir.
3. Vercel yük testi politikası Enterprise veya satış ekibiyle önceden anlaşma gerektirir. Bu nedenle Hobby canlı siteye 3.000/5.000 VU testi çalıştırılmadı. Platform onaylı ortamda, kademeli yük, gerçek QR kullanıcı akışı ve ham bağlantı/TLS/HTTP hata ayrımıyla yeniden test gerekir. Genel güvenlik korumalarını kapatmayın.
4. Sahada Wi-Fi/mobil ağ, QR URL'si, Safari/Android, program güncelliği ve indirilebilir yedek birden fazla gerçek telefonda denenmeli.

Kaynaklar:
- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/limits/fair-use-guidelines
- https://vercel.com/kb/guide/what-s-vercel-s-policy-regarding-load-testing-deployments
- https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application

Bu çalışma 3.000 veya 5.000 eşzamanlı kullanıcı kapasitesini doğrulamaz. Bu iddia ancak onaylı platform testi ve gerçek hesap limitleriyle desteklenebilir.
