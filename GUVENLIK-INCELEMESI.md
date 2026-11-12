# Güvenlik incelemesi — 12 Kasım 2026

Ekran görüntüsündeki potansiyel riskler doğrulanmış kritik açık olarak değerlendirilmedi. Bu uygulamada veritabanı, yönetici paneli, oturum açma veya kullanıcı içerik yükleme uç noktası bulunmuyor.

## Doğrulanan ve giderilen eksikler

- Önceki canlı yayında `/lib/push-reminders.js` ve `/AGENTS.md` HTTP 200 ile indirilebiliyordu. Gizli anahtar değerleri bu dosyalarda yoktu; yine de sunucu kodu ve iç notlar gereksiz yere yayımlanıyordu. `scripts/build-site.cjs` yalnızca açıkça belirlenen statik dosyaları `public/` içine kopyalar. API kaynakları Vercel işlevi olarak kalır; kaynak dosyalar, notlar, testler, ortam dosyaları ve git dizini statik pakete girmez.
- CSP, nosniff, çerçeveleme koruması, referrer ve Permissions Policy başlıkları eklendi. Satır içi JavaScript ve eval izinli değil. Mevcut stiller için inline CSS izni korunur. OneSignal SDK/worker ve Google Fonts için gereken alan adlarına izin verilir.
- CORS uygulamanın üretim adresiyle sınırlandırıldı. CORS kimlik doğrulama yerine kullanılmaz. Bildirim planlayıcı ayrıca sabit süreli Bearer anahtar kontrolünü korur; yabancı Origin ve desteklenmeyen yöntemler reddedilir. Eksik, kısa veya boşluk/kontrol karakteri içeren kimlik bilgileriyle servis etkinleşmez.
- Planlayıcıya aynı çalışan süreçte eşzamanlı çalışmayı ve 60 saniye içindeki tekrarları engelleyen kontrol eklendi. Bu kontrol dağıtık/global bir rate limiter değildir. Sunucusuz farklı örnekler arasında sağlayıcının mevcut idempotency anahtarları tekrar bildirim oluşturmayı önler. Public config CDN'de 300 saniye önbelleklenebilir; sadece herkese açık App ID döner.
- Dinamik oturum kimlikleri escape edilir; haber/sunum görselleri yerel assets ile, haber kaynak bağlantıları kimlik bilgisi içermeyen HTTPS adresleriyle sınırlanır. Görsel boyutları sayısal olarak doğrulanır.

## Doğrulama ve sınırlar

Node testleri planlama zamanları, tekrarları önleme, yetkilendirme, gizli veri sızdırmama, URL doğrulama, statik paket ve güvenlik başlıklarını kapsar. Mobil/masaüstü Chromium kontrolleri CSP altında sayfaların JavaScript hatası olmadan açıldığını doğrular. İzlenen dosyalardaki yaygın özel anahtar/token kalıpları taramasında eşleşme bulunmadı; bu, tüm olası sırların bulunabileceği garantisi değildir.

Projede npm bağımlılığı yok. OneSignal'ın uzaktan v16 SDK'sı ve Google Fonts harici güven sınırlarıdır. Hesap MFA/ekip erişimleri, Vercel WAF ile dağıtık hız sınırı ve gizli anahtar rotasyonu bu kod değişikliğinin dışında; hesap ayarlarına erişilmeden doğrulanamaz. Gerçek cihaza bildirim teslimatı bu incelemede test edilmedi; test sırasında gerçek bildirim gönderilmedi. Bu inceleme kapsamlı bir penetrasyon testi değildir.
