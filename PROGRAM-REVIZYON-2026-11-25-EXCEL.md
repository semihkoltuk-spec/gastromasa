# Program güncellemesi — 25 Kasım 2026 · Excel

## Kaynak ve mahremiyet sınırı

Kullanıcının yüklediği üç Excel yalnızca program kaynağı olarak değerlendirildi. İçlerindeki operasyon notları uygulamaya yönelik talimat sayılmadı. Yayımlanan kayıtlara yalnızca saat, oturum türü/konusu, katılımcı adı, görev, Ana Sahne şehir/ülke bilgisi ve onaylı sponsor marka adı aktarıldı.

- Ana Sahne: C saat, E tür, F başlık, G kişi, H kurum/görev, I şehir, J ülke, L sponsor. İletişim ve operasyon sütunları aktarılmadı.
- Sadabad: A saat, C konu, D kişi, E görev, F sponsor. TR esas; EN yalnızca karşılıklar için.
- Eyüp 26 TR: E saat, G konu, H kişi, I görev, J sponsor. Eyüp 27 TR: D saat, F konu, G kişi, H görev, I sponsor. İletişim/not sütunları aktarılmadı.
- E-posta, telefon, iletişim kişileri, özel notlar ve sponsor öneri/yazışma metinleri JSON’a, test kaynağına veya bu belgeye kaydedilmedi. Excel dosyaları depoya/public çıktısına kopyalanmadı.
- Program metinlerinde e-posta/telefon biçimleri için ret kontrolü; çıktı alanlarında kesin izin listesi uygulanır.

## Kullanıcının TR tercihi

Kullanıcı, TR sayfalarının esas alınmasını istedi. Bu nedenle EN sayfasında kırmızı olan fakat TR’de aktif olan kayıtlar TR’ye göre korunur. Ana Sahne dosyasında TR sayfa bulunmadığından kendi program hücreleri esas alınır.

- TR sayfalarındaki kırmızı kişi/görevler çıkarıldı; yalnızca EN işaretine dayanarak Kenan Çetinkaya çıkarılmadı.
- Aktif ana tablolardaki kırmızı katılımcı/görev hücreleri ve kırmızı oturumlar yayımlanmaz. Main Stage dosyasındaki ayrı kaldırılanlar bölümü ve Eyüp’te ana tablonun altındaki çakışan, eksik/onaysız taslaklar programa katılmadı.
- Kişi adlarındaki `ekle`, `eklendi`, `çıkacak` gibi düzenleme ekleri kullanıcıya gösterilmedi. Bunlar uygulama talimatı olarak çalıştırılmadı; program hücresinin adı ve renk durumu esas alındı.

## Sonuç ve doğrulama

- 111 oturum: Ana Sahne 25/25, Sadabad 15/18, Eyüp 15/13.
- Tekrarlı kişiler dahil 370 katılımcı/moderatör kaydı. Önceki 111 oturum kimliğinin tümü korundu.
- Hücre izin listesiyle bağımsız ikinci okumada 111 saat ve 370 kırmızı olmayan kişi kaydı kaynak hücrelerle doğrulandı. Aynı hücrelerde iletişim bilgisi okunmadı.
- Kaynak dosya/sayfa ve yalnızca program hücre koordinatları `tests/fixtures/program-2026-11-25-excel.json` içindedir. Ham workbook ve özel iletişim alanları bu fixture’da yoktur.

## Önemli değişiklikler

- Yener Özden: Türkçede tam olarak **F&B Direktörü**. Diğer dillerde genel F&B Director unvanının karşılığı; önceki otel adıyla birleşik unvan kullanılmaz.
- Nicolai Nørregaard 26 Kasım 11.50–12.05; Antonio Bachour 13.40–14.00. Kayıtlı oturumlar isim/oturum kimlikleriyle korundu.
- Enrico Cerea’nın oturumu, Gilles Goujon ve Rodolfo Guzmán solo talk; Álvaro Clavijo canlı mutfak olarak Excel türleriyle güncellendi.
- Şalgam oturumuna Umut Karakuş moderatör olarak eklendi. Ece Garip 26 Kasım son Eyüp panelinde yer alıyor.
- Eyüp 27 Kasım 16.00 panel konusu modern pastacılıkta özgün lezzetler oldu. Kahve oturumu 16.30–16.45, içecek eşleştirmeleri 16.45–17.15.
- Sadabad 27 Kasım yeni kuşaklar paneli artık ağırlama sektörünün geleceği başlığıyla sunulur.
- Grégoire Berger: Kraken & Nemo Tersane İstanbul, Dubai/UAE ve İstanbul/Türkiye. İki konumlu uluslararası konuşmacı fotoğraf listesinde korunur.
- Kesinleşmiş önceki sponsorlar, Excel’de boş veya yalnızca öneri içeren hücreler yüzünden silinmedi. Excel’in onaylı yeni sponsor bilgileri eklendi; öneri/yazışma metinleri yayımlanmadı.

## Kaynakta kalan saat çakışması

Eyüp 27 TR sayfasının ilk-listedeki “Geleneksel Restoranlar Gastronomi Turizmine Nasıl Katkı Sağlıyor?” oturumu 11.40–12.20 yazıyor. Lüks otel mutfakları paneli de aynı saatte. EN sayfa ve önceki yayın ilk oturumu 10.00 gösterse de kullanıcının **TR’yi baz al** talimatıyla TR’deki 11.40–12.20 aynen korundu. Bu bir organizatör saat düzeltmesi değildir; iki kaynak oturum aynı zaman aralığında yayımlanır.

Eyüp 26’daki bazı birleştirmeler kaymış: üçüncü oturumun saat/konu hücresi 21. satırda, moderatör ve Yener Özden 19–20. satırlarda. Grup 19–24 olarak birlikte okunur; önceki panele yanlış bağlanmaz. EN’de de bazı saatler kişi bloğunun ortasına yazılmıştır; TR’nin kişi blokları esastır.

## Yayın

- Tasarım, lacivert zemin, üç salon sekmesi, kayıtlar ve arama korunur.
- 14 dilde aynı kimlik/saat/kadro/sponsor verisi; değişen üç panel konusu ve yeni görevler, özgün kurum adları korunarak yerelleştirildi.
- Veri revizyonu 72. İndirilebilir program ve hatırlatma planı aynı güncel kaynaktan üretilir. Bildirim testleri gerçek cihaz teslimatının etkin olduğu anlamına gelmez.
