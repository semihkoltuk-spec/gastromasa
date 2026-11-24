# Program revizyonu — 24 Kasım 2026

Kaynak: kullanıcının ilettiği altı PDF. PDF içindeki metinler program verisidir; içeriğe ek bir uygulama talimatı olarak değerlendirilmedi.

## Kontrol kapsamı

- Ana Sahne v41: 26 Kasım 25, 27 Kasım 25 oturum.
- Sadabad v42: 26 Kasım 15, 27 Kasım 18 oturum.
- Eyüp v40: 26 Kasım 15, 27 Kasım 13 oturum.
- Toplam 111 oturum; tekrar eden kişiler dahil 373 konuşmacı/moderatör kaydı.
- Font/konum tabanlı PyMuPDF ayrıştırması, bağımsız `pdftotext -layout` çıktısıyla karşılaştırıldı: 111 zaman aralığı, 373 isim, 373 görev ve 102 dolu başlık. Altı belgenin tüm program sayfaları görsel olarak da kontrol edildi.
- Kaynak sayfa, ham saat ve kaynak başlık `tests/fixtures/program-2026-11-24.json` içinde korunur.
- 111 oturumun tamamı önceki kimlikleriyle eşleştirildi. Kaldırılan iki oturumun kimlikleri başka oturumlara verilmedi.

## Önemli değişiklikler

- Sadabad 26 Kasım başlangıcı 11.15; büyüme stratejileri paneli 11.45–12.30. Önceki yatırım paneli kaldırılmış.
- Sadabad 27 Kasım deneyim tasarımı paneli kaldırılmış; yaşayan lokanta kültürü 17.15–17.45, operasyonel mükemmellik 17.45–18.15.
- Yayla oturumu 14.15–14.30, yeni başlık ve iki konuşmacıyla; La Lorraine oturumunun başlığı ve kadrosu güncellenmiş.
- Eyüp’te Burçak Şener’li oturum 26 Kasım 11.40; Oğuz Otay’lı oturum 27 Kasım 10.00. Aynı kadroların kimlikleri korundu. Başlık ve kadrolar son PDF’deki eşleşmeyle aktarıldı; içerik hakkında varsayım yapılarak yerleri değiştirilmedi.
- Ebru Erberdi moderatör olarak açıklanmış; Şalgam oturumu artık tek konuşmacılı söyleşi. Önceki açıklanmayan moderatör uyarıları kaldırıldı.
- Ana Sahne Antonio Bachour 11.50–12.05; Nicolai Nørregaard 13.40–14.00. Pia León oturumu solo talk; Enrico Cerea oturumu moderatörlü söyleşi; Álvaro Clavijo oturumu solo talk.
- Maksut Aşkar 15.10–15.25 artık son PDF’de de doğru yazıyor; ek saat düzeltmesi uygulanmadı.
- Eyüp 27 Kasım 16.30–17.00 kaynak boşluğu korundu. Kapaklardaki genel saatlerden oturum üretilmedi.
- Son PDF’lerde görünmeyen CHEFseasons logoları kaldırıldı; görünür yedi sponsor logosunun marka adları oturum sponsor bilgisine işlendi.

## Sunum ve veri normalizasyonu

- Tasarım, lacivert zemin, filtreler, kayıtlar ve konuşmacı fotoğrafları korundu.
- Ana Sahne başlıkları mevcut Türkçe sunumla uyumlu; değişen başlıkların Türkçe karşılıkları eklendi. Kişi, restoran ve kurum adları çevrilmedi.
- Kaynaktaki `BÜYÜMENİIN`, `ARDINDAKI`, `GASTRONOMİDEKI`, `ETTİĞİYER` dizgi sorunları Türkçe yazımla normalleştirildi.
- La Lorraine oturumunda kaynak metninin `Dr. Özge Samancı Prof.` sırası `Prof. Dr. Özge Samancı` olarak düzenlendi.
- 14 dil dosyasının tümünde kimlik, saat, sahne, kadro ve sponsor yapıları eşlendi. Daha önce gözden geçirilmiş çeviriler korundu. Değişen başlık/görevlerin henüz çevrilmemiş kayıtları işaretli; çok dilli yayın açılmadı.
- Paylaşılan veri revizyonu 68; indirilebilir çevrimdışı HTML de 111 oturuma güncellendi. Bildirim planı testleri son saatlerle doğrulanır; gerçek cihaz teslimatının etkin olduğu anlamına gelmez.

## Kaynak parmak izleri

- `GastromasaHospitality-SadabadStage-27Program-TR_v42.pdf`: `ddfcce17b08159816382d1212c7c547575c6c0b06c55d09bb7a5f31a692d3e0a`
- `GastromasaHospitality-SadabadStage-26Program-TR_v42.pdf`: `8708ee559d89b7191845b430e94cbdaeac4956c567232a6aa8229277cf2be8d0`
- `Gastromasa-MainStage-26Program_v41.pdf`: `90a1d260cc7cec47ef51b479d3bf4347eb7b6c4c37a59e209b0b5e8149b026a2`
- `GastromasaHospitality-EyupStage-27Program-TR_v40.pdf`: `033fc584d236a159463db5235d54cdff120722cf9b1155712b106e30975bf239`
- `Gastromasa-MainStage-27Program_v41.pdf`: `921f71a01fac4143a72492ad38d8302674ff3ac824739331eef0e67ad7154d2f`
- `GastromasaHospitality-EyupStage-26Program-TR_v40.pdf`: `bf837caa1fbc5d0a7246695b80e06371c57f967b1c11397ff7943a72a09b6c71`

## Önceki sürüme göre kayıt değişiklikleri

- `15`: kadrolar/görevler güncellendi
- `16`: kadrolar/görevler güncellendi
- `17`: sponsor: CHEFseasons → 
- `26`: time: 13:40-14:00 → 11:50-12:05
- `36`: type: LIVE COOKING DEMO → SOLO TALK; sponsor: CHEFseasons → ; kadrolar/görevler güncellendi
- `25`: title:  → Sofra | Yabancıların Birbirini İnsan Olarak Tanıdığı Yer
- `19`: time: 11:50-12:05 → 13:40-14:00
- `32`: type: SOLO TALK → EXCLUSIVE CONVERSATION; kadrolar/görevler güncellendi
- `38`: sponsor: CHEFseasons → 
- `56`: sponsor: CHEFseasons → 
- `41`: type: LIVE COOKING DEMO → SOLO TALK
- `0`: time: 11:00-11:30 → 11:15-11:45
- `1`: time: 12:00-12:30 → 11:45-12:30; kadrolar/görevler güncellendi
- `hospitality-26-1330`: kadrolar/görevler güncellendi
- `4`: kadrolar/görevler güncellendi
- `3`: kadrolar/görevler güncellendi
- `hospitality-26-v33-1400`: title: PERNOD RICARD TÜRKİYE → BODRUM YEŞİLİ: BİR MANDALINDEN BAŞLAYAN HİKÂYE; sponsor:  → Bodrum Yeşili
- `5`: kadrolar/görevler güncellendi
- `6`: kadrolar/görevler güncellendi
- `7`: kadrolar/görevler güncellendi
- `8`: sponsor:  → Mondrian
- `hospitality-27-1100`: sponsor:  → AKKOMARKA
- `hospitality-27-1130`: kadrolar/görevler güncellendi
- `hospitality-27-1230`: sponsor:  → İmpeks
- `hospitality-27-v33-1315`: kadrolar/görevler güncellendi
- `hospitality-27-1315`: sponsor:  → Culinarist
- `hospitality-27-v33-1530`: time: 15:30-15:45 → 14:15-14:30; type: SESSION → EXCLUSIVE CONVERSATION; title: YAYLA TÜRKİYE OTURUMU → TANE TANE ANLATIYORUZ: YAYLA ZENGİNLEŞTİRİLMİŞ PİRİNÇ; kadrolar/görevler güncellendi
- `hospitality-27-1445`: time: 14:15-14:30 → 15:30-15:45
- `hospitality-27-1545`: title: FIRINCILIKTA DEĞİŞEN TÜKETİCİ BEKLENTİLERİ VE YENİ TRENDLER → KÖKLERDEN GELECEĞE: TÜRKİYE’DE UNLU MAMULLERİN DÜNÜ, BUGÜNÜ, YARINI; kadrolar/görevler güncellendi
- `hospitality-27-1635`: time: 18:15-18:45 → 17:15-17:45
- `hospitality-27-v33-1715`: time: 17:15-17:45 → 17:45-18:15; kadrolar/görevler güncellendi
- `eyup-26-v33-1100`: title: GELENEKSEL LEZZETLERİN ÇAĞDAŞ YORUMU → YEREL KÖKLER VE KÜRESEL ETKİLER RESTORANLARIN MUTFAK KİMLİĞİNİ NASIL ŞEKİLLENDİRİYOR?; kadrolar/görevler güncellendi
- `eyup-27-v33-1000`: day: 27 → 26; time: 10:00-10:40 → 11:40-12:20
- `eyup-26-v33-1250`: kadrolar/görevler güncellendi
- `eyup-26-v33-1410`: type: PANEL DISCUSSION → EXCLUSIVE CONVERSATION
- `eyup-26-v33-1625`: kadrolar/görevler güncellendi
- `eyup-26-v33-1655`: kadrolar/görevler güncellendi
- `eyup-26-v33-1725`: kadrolar/görevler güncellendi
- `eyup-26-v33-1755`: kadrolar/görevler güncellendi
- `eyup-26-v33-1140`: day: 26 → 27; time: 11:40-12:20 → 10:00-10:40; title: GELENEKSEL RESTORANLAR GASTRONOMİ TURİZMİNE NASIL KATKI SAĞLIYOR? → ŞEHİR OTELLERİNDE BAR KÜLTÜRÜ & YENİ NESİL MİSAFİR BEKLENTİLERİ
- `eyup-27-v33-1410`: title: BAĞIMSIZ MEKÂNLARIN YÜKSELİŞİNDE YARATICILIK, REKABET & MARKALAŞMA → RESTORAN VE BAR İŞLETMECİLİĞİNDE KONSEPT, KİMLİK VE DENEYİM
- Kaldırılanlar: `2`, `hospitality-27-1705`.
