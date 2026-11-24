# Program revizyonu — 24 Kasım 2026 · v50/v45

Bu sürüm önceki v41/v42/v40 veri kümesinin yerine geçer. Altı kullanıcı PDF’i yalnızca program kaynağı olarak değerlendirildi.

## Kontrol

- Ana Sahne v50: 26 Kasım 25, 27 Kasım 25 oturum.
- Sadabad v45: 26 Kasım 15, 27 Kasım 18 oturum.
- Eyüp v45: 26 Kasım 15, 27 Kasım 13 oturum.
- Toplam 111 oturum ve tekrar eden kişiler dahil 374 konuşmacı/moderatör kaydı.
- Altı belgenin program sayfaları görsel olarak kontrol edildi. Font/koordinat tabanlı PyMuPDF ayrıştırması bağımsız pdftotext çıktısıyla karşılaştırıldı: 111 saat aralığı, 374 isim, 374 görev ve 102 dolu başlık eşleşti.
- Saatler, günler, oturum türleri ve mevcut oturum kimlikleri önceki sürümle aynı. 111 kimliğin tamamı korundu.

## Değişiklikler

- Eyüp 26 Kasım 11.40–12.20 başlığı “ŞEHİR OTELLERİNDE BAR KÜLTÜRÜ & YENİ NESİL MİSAFİR BEKLENTİLERİ” olarak düzeltildi.
- Eyüp 27 Kasım 10.00–10.40 başlığı “GELENEKSEL RESTORANLAR GASTRONOMİ TURİZMİNE NASIL KATKI SAĞLIYOR?” olarak düzeltildi.
- Bu iki düzeltmede konuşmacılar ve saatler değişmedi; eski kayıt kimlikleri korunur.
- Sadabad 26 Kasım 12.30–13.00 paneline Utkan Gülaçtı — Swissôtel The Bosphorus İstanbul Genel Müdürü eklendi.
- Doğa Çitçi’nin görev bilgisi “Mutfak Sanatları Merkezi Koordinatör Şefi” oldu.
- Prof. Dr. Özge Samancı’nın unvan sırası PDF’de de düzeltilmiş; önceki normalleştirmeyle artık birebir uyumlu.
- Kaynakta daha önce görülen dizgi sorunlarının Türkçe normalizasyonları korundu. Ana Sahne başlıkları/kadroları v41 ile aynı.

## Sponsor bilgileri

Mevcut yedi sponsorluk korunup yeni PDF logolarından 14 eşleşme eklendi; toplam 21 oturum sponsorlu.

- Ana Sahne 26 Kasım: 11.15 CHEFseasons, 11.30 KAPP, 11.50 Özmen Un, 12.40 CHEFseasons, 13.10 Porland, 13.40 Culinarist, 14.15 Öztiryakiler, 14.50 Özmen Un, 16.50 CHEFseasons.
- Ana Sahne 27 Kasım: 10.55 Jumbo, 12.40 Melodi, 14.05 CHEFseasons, 15.45 Jumbo.
- Eyüp 26 Kasım: 14.55 FineDine.
- Marka adları mevcut oturum sponsoru alanında gösterilir; program tasarımı değiştirilmez.

## Yayın

- 14 veri dosyasının zaman, kimlik, kadro ve sponsor yapıları eşlendi. Mevcut gözden geçirilmiş başlık çevirileri içeriklerine göre yeniden kullanıldı; yeni görevlerde çeviri bekleyen alanlar işaretlendi. Site Türkçe kalır; kişi ve kurum adları çevrilmez.
- Veri revizyonu 69. Üretim çıktısı ve indirilebilir 111 oturumluk HTML aynı kaynaktan yeniden üretilir.
- Kaynak sayfa, ham başlık/saat ve dosya adı `tests/fixtures/program-2026-11-24-v50.json` içinde tutulur.
- Bildirim planı testleri saatlerden beş dakika önceki planı doğrular; gerçek push teslimatının etkin olduğunu göstermez.

## Kaynak SHA-256

- `Gastromasa-MainStage-26Program_v50.pdf`: `7e0e1316fd900dd5d775b56888471d5460344a42fe5d89af52a48bf5d07dbe9d`
- `GastromasaHospitality-EyupStage-27Program-TR_v45.pdf`: `b1035725e7928cd9c22330f2be4986efa941935b39fb43412365cd28affc76a1`
- `GastromasaHospitality-SadabadStage-27Program-TR_v45.pdf`: `f8fc675707e9c0ebe798237e89a7a997db27f02b7723785cb5d4c356287c85b1`
- `GastromasaHospitality-EyupStage-26Program-TR_v45.pdf`: `1cbb58a04c4e585e9dcbcc15cd1f1466b33f472365a5f64d10bb3bc075fd3e94`
- `Gastromasa-MainStage-27Program_v50.pdf`: `9ec794c246bc7cb7278b006dd826e5fee9fde5cfef269de55d4eb7491a6097db`
- `GastromasaHospitality-SadabadStage-26Program-TR_v45.pdf`: `955b6c6a34c6eac10ca51bc546f8755d44b5b8b5617e668943acd288209a56d5`
