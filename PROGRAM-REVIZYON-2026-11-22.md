# Program revizyonu — 22 Kasım 2026

Kullanıcının ilettiği altı PDF esas alınarak mevcut program tasarımı korunmuştur. Eski 85 oturumun yerine üç salondaki toplam **113 oturum**, **376 katılımcı/moderatör/sunan kaydı** işlenmiştir. Katılımcı sayısı benzersiz kişi sayısı değildir; aynı kişi farklı oturumlarda tekrar yer alabilir.

| Salon | Gün | Kaynak dosya | Oturum | Ayrıntı sayfalarındaki zaman aralığı |
| --- | --- | --- | ---: | --- |
| Haliç Auditorium | 26 Kasım | Gastromasa-MainStage-26Program_v33.pdf | 25 | 09.30–17.45 |
| Haliç Auditorium | 27 Kasım | Gastromasa-MainStage-27Program_v33.pdf | 25 | 10.00–17.55 |
| Sadabad Auditorium | 26 Kasım | GastromasaHospitality-SadabadStage-26Program-TR_v29.pdf | 16 | 11.00–18.45 |
| Sadabad Auditorium | 27 Kasım | GastromasaHospitality-SadabadStage-27Program-TR_v29.pdf | 19 | 10.00–18.45 |
| Eyüp Auditorium | 26 Kasım | GastromasaHospitality-EyupStage-26Program-TR_v31.pdf | 15 | 11.00–18.25 |
| Eyüp Auditorium | 27 Kasım | GastromasaHospitality-EyupStage-27Program-TR_v31.pdf | 13 | 10.00–17.45 |

## Kaynak kontrolü

1. Altı PDF, `pdftotext -layout` ile okunmuştur.
2. Bağımsız olarak PyMuPDF ile yazı tipi ve koordinat temelli çıkarım yapılmıştır. Başlıklar, katılımcılar ve görevler ayrı yazı stillerinden ayrıştırılmıştır; soldaki saat sütunu sırasıyla eşleştirilmiştir.
3. İki çıkarım arasında 113 saat aralığı, 376 ad ve 376 görev metni tek tek eşleştirilmiştir. Oturum başlığı bulunan 103 kaydın başlığı da doğrulanmıştır. Başlığı olmayan on kayıtta mevcut arayüz, konuşmacı adını veya açılış oturum türünü göstermeye devam eder.
4. Ana Sahne 26 Kasım 3. ve 5. sayfa, Ana Sahne 27 Kasım 5. sayfa, Sadabad 26 Kasım 2. sayfa ve Eyüp 27 Kasım 9. sayfa görsel olarak incelenmiştir. Farklı yazı tipindeki iki başlığın (Pia León / Enrico Cerea) yanlışlıkla kişi sayılmaması ayrıca kontrol edilmiştir.
5. PDF'lerde saat sütununun altındaki görsel sponsorlar incelenmiştir: Eduard Xatruch, Pia León, Vicky Cheng ve Matias Perdomo oturumlarında CHEFseasons; Yayla oturumunda Yayla; fırıncılık panelinde La Lorraine bilgisi, mevcut oturum sponsoru alanına işlenmiştir.

`tests/fixtures/program-2026-11-22.json`, kaynak dosya/sayfa, ham saat ve doğrulanmış katılımcıları saklar; statik yayın paketine girmez. Oturum türü yazılmayan Yayla kaydı genel “Oturum” türündedir. PDF'teki PANEL / TALK / SÖYLEŞİ türleri mevcut arayüzün Panel / Konuşma / Özel söyleşi alanlarına eşlenmiştir.

## Açıklığa kavuşturulan ve aynen korunan noktalar

- **Kullanıcı onayı:** Ana Sahne 27 Kasım'da Maksut Aşkar'ın oturumu PDF'te 11.10–15.25 yazmasına rağmen, kullanıcının açık onayıyla **15.10–15.25** olarak düzeltilmiştir.
- Sadabad 26 Kasım kapağı 11.30 başlangıç gösterir; ilk ayrıntılı oturum 11.00–11.30'dur. Oturumun yanındaki saat esas alınmıştır.
- Eyüp 26 Kasım kapağında bitiş 18.20, son oturumda 18.25'tir; oturumun yanındaki saat esas alınmıştır.
- Eyüp 27 Kasım kapağı 18.45'e uzanır; ayrıntılı programın son kaydı 17.45'te biter. 16.30–17.00 arasında oturum yoktur; bu boşluk için oturum veya ara uydurulmamıştır.
- Ana Sahne kapaklarındaki genel 18.00 bitiş saatleri için ayrıntılı programın sonuna ek kayıt oluşturulmamıştır.
- Eyüp 26 Kasım 12.50–13.30 ve 14.10–14.25 oturumlarında moderatör alanı boştur; mevcut “Moderatör açıklanacak” bildirimi gösterilir. Diğer oturumlara varsayımsal moderatör/konuşmacı eklenmez.
- PDF ligatürleri (fi/ffi vb.) Unicode normalizasyonuyla düzeltilmiştir. “BÜYÜMENİIN”, “ETTİĞİYER”, “GASTRONOMİDEKI”, “ARDINDAKI” ve “TÜRKIYE” gibi açık tipografik hatalar başlıklarda düzeltilmiştir. İsim ve kurumlar farklı dillere çevrilmemiştir.

## Mevcut işlevlerin korunması

Üç sekmenin görünümü korunur. Önceden boş olan “Bar Sahne · Eyüp Auditorium” sekmesi PDF'in adıyla **Hospitality Sahne · Eyüp Auditorium** olarak güncellenmiş, dahili sahne anahtarı `eyup` olmuştur. Sadabad sekmesi ve Haliç sekmesi korunmuştur. Gün seçimi, arama, tür filtresi, kayıtlı oturumlar ve detay pencereleri aynı tasarımla çalışır; genel “Oturum” türü filtreye eklenmiştir.

78 mevcut oturum kimliği korunmuştur; böylece eşleştirilen oturumların eski yerel kayıtları yeni zamanlarını gösterir. Kaldırılan veya belirgin şekilde yeni olan oturumlar farklı kimliklerle tutulur. Oturumların yeni konuşmacıları ve saatleri konuşmacı sayfasına da yansır. Kaynakla eşleşen mevcut fotoğraflar kullanılır, yeni katılımcılar için fotoğraf uydurulmaz. Şu anda programdan türeyen 51 uluslararası fotoğraflı konuşmacı kartı vardır. Aksan farkları nedeniyle mevcut biyografinin kaybolmaması için isim eşleştirmesine aksan duyarsız geri dönüş eklenmiştir.

Tüm 14 program dosyasının kimlik, salon, gün, saat, tür ve kişi adları eşitlenmiştir; aktif yayın hâlâ yalnızca Türkçedir. Değişmeyen başlık ve görevlerin mevcut çevirileri korunmuştur. Diğer 12 dildeki 52 yeni/değişmiş başlık İngilizce yedek metinle ve `translationPending` işaretiyle; henüz çevirisi bulunmayan görevler `roleTranslationPending` işaretiyle saklanmıştır. Bunlar çok dilli yayın açılmadan önce tamamlanmalıdır; yeni tüm metinlerin 14 dilde çevrildiği iddia edilmez. Bildirim planlayıcısının veri eşlemesi ve beş dakika hesabı 113 kayıtla test edilmiştir; gerçek bildirim gönderilmemiştir.

Veri ve dosya önbelleği sürümü 66'ya yükseltilmiştir. Stil dosyasında veya diğer sayfalarda tasarım değişikliği yapılmamıştır. Yalnızca program sekmesi adı, bir filtre seçeneği ve ilgili veriler güncellenmiştir.
