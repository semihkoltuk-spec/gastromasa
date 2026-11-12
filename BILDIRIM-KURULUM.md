# Gastromasa: site kapalıyken oturum bildirimleri

Kod hazırdır; gerçek bildirim gönderimi OneSignal hesabı bağlanana kadar kapalıdır. Gizli anahtarları sohbet, GitHub dosyaları veya ekran görüntülerinde paylaşmayın.

## 1. OneSignal hesabı ve uygulaması

1. https://onesignal.com adresinden hesap açın.
2. Yeni bir uygulama oluşturun: **Gastromasa 2026**.
3. Platform olarak **Web Push**, entegrasyon olarak **Custom Code** seçin.
4. Site adresini **https://gastromasa.vercel.app** olarak ayarlayın. Şu anda kullanılan alan adı budur.
5. Kurulumda otomatik izin penceresi eklemeyin. Site, kullanıcının tıklayacağı bildirim aç/kapat düğmelerini içerir. SDK kodu ve `OneSignalSDKWorker.js` dosyası siteye eklenmiştir; tekrar kod yapıştırmanız gerekmez.
6. **Settings → Keys & IDs** bölümünden **App ID** ve uygulamaya ait **App API Key** bilgilerini alın. App ID gizli değildir; App API Key gizlidir.

## 2. Vercel bağlantısı

Vercel → **gastromasa** projesi → **Settings → Environment Variables** bölümünde, **Production** ortamına şu üç değişkeni ekleyin:

| Değişken adı | Değer |
|---|---|
| `ONESIGNAL_APP_ID` | OneSignal App ID |
| `ONESIGNAL_REST_API_KEY` | OneSignal uygulamasının App API Key değeri |
| `CRON_SECRET` | Parola yöneticisiyle üretilmiş en az 32 karakterli rastgele bir gizli değer |

Sonra Vercel → **Deployments → en son yayın → Redeploy** seçin. Değişkenler yeniden yayınlandıktan sonra uygulanır.

## 3. İlk izin ve planlama

1. Canlı sitede menüyü veya Program bölümünü açın. Bağlantı doğruysa **Oturum bildirimleri** alanı görünür.
2. **Bildirimleri aç** düğmesine basıp tarayıcıdan izin verin. İlk planlama öncesinde en az bir abonenin bulunması gerekir.
3. Vercel → **Settings → Cron Jobs** bölümünde `/api/schedule-reminders` görevinin **Run / Run now** seçeneğini kullanın.
4. OneSignal'da planlanmış mesajları kontrol edin. Güncel programdaki henüz hatırlatma zamanı geçmemiş oturumlar listelenir. 26 Kasım ilk oturum 09.30'da, ilk hatırlatma **09.25 İstanbul saati** olacak şekilde planlanır.
5. İlk uçtan uca kontrol için OneSignal panelinden yalnızca kendi cihazınıza bir test bildirimi gönderin. Gönderimin gerçek cihazda doğrulanması hesap bağlandıktan sonra yapılabilir.

Sunucu görevi her gün 00.00 UTC / 03.00 İstanbul saatinde planı denetler. Bildirimler ise OneSignal tarafından her oturumdan tam 5 dakika önce gönderilmek üzere ayrı ayrı planlanır; günlük görevin o anda çalışması gerekmez. Program değişirse Cron Jobs → Run ile planı hemen güncelleyin. Değişmemiş hatırlatmalar korunur; eski saatli veya kaldırılmış oturumların bekleyen hatırlatmaları iptal edilir. Plan yenilense bile aynı hatırlatma çoğaltılmaz.

## iPhone

- iOS/iPadOS 16.4 veya üzeri gerekir.
- Safari → Paylaş → **Ana Ekrana Ekle**.
- Siteyi Ana Ekran'daki simgeden açın; ardından **Bildirimleri aç** düğmesini kullanın.
- Ziyaretçi izin vermeden bildirim gönderilemez. Bildirimler, izin vermiş bu cihazlara gider.

## Bildirim içeriği

> “Oturum adı” başlamak üzere. Başlamasına 5 dakika kaldı.

Tüm oturumlar kapsanır; yalnızca kaydedilmiş oturumlarla sınırlandırılmaz. Mesajlar sitenin seçili 14 dilinden uygun olanıyla gönderilir. Bildirim seçilince Program bölümü açılır. Başlangıç anını geçmiş hatırlatmalar yeni planlamada gönderilmez. Bir mesajın geçerlilik süresi 5 dakikadır; çevrimdışı cihazlara daha sonra eski oturum uyarısı gönderilmesi önlenir.

## Kontrol ve teknik notlar

- `/api/push-config` yalnızca `configured` ve herkese açık App ID döndürür; gizli anahtarları döndürmez.
- Zamanlama uç noktası `Authorization: Bearer <CRON_SECRET>` gerektirir; yetkisiz ziyaretçiler bildirim oluşturamaz.
- OneSignal hata verirse veya gönderilecek abone yoksa işlem hata olarak raporlanır; gönderilmiş gibi gösterilmez.
- Standart tarayıcı, işletim sistemi ve ağ teslim koşulları geçerlidir. Gerçek cihaz testi kurulumun son adımıdır.
- Sunucu testleri: `node --test tests/push-reminders.test.cjs`.
