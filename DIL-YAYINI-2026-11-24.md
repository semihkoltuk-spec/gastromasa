# Dil yayını — 24 Kasım 2026

Kullanıcının talebiyle 14 dil seçicisi yeniden açıldı: Türkçe, İngilizce, İspanyolca, İtalyanca, Almanca, Fransızca, Portekizce, Basitleştirilmiş Çince, Japonca, Arapça, Rusça, Danca, Felemenkçe ve Yunanca.

## Tamamlananlar

- 111 oturum ve 374 konuşmacı/moderatör kaydının tüm dillerde saatleri, kimlikleri, adları ve sponsorları aynıdır. Bekleyen program başlığı/görev işaretleri çözüldü. Son v50/v45 programı korundu.
- Başlıklar ve görev açıklamaları seçilen dilde; kişi adları, restoran/kurum adları, salon adları ve stant kodları değişmeden kalır. Kaynaklardaki bilinen kişi adları ve kurumlar çeviriden önce yer tutucularla korundu; metinler istemciye yerel JSON dosyaları olarak sunulur.
- Biyografi başlıkları/anahtarları programdaki özgün adlarla eşlendi; Pia León ve Andoni Luiz Aduriz dahil aksan/isim eşleşmeleri korundu. Biyografilerin her paragrafı korunan kaynak varlıklar bakımından test edilir.
- Dil değiştirirken bulunduğunuz bölüm korunur. Türkçede gereksiz çeviri gözlemcisi çalışmaz; diğer dillerde gözlemci yalnızca değişen düğümleri işler.
- Haber/firma pencereleri de sözlükleri kullanır; orijinal kaynak URL’leri ve yayın tarihleri korunur. Tarihler seçilen dilde biçimlendirilir.
- Arapçada sağdan sola düzen; program saatleri soldan sağa. Lacivert zemin ve mevcut tasarım korundu.

## Açık kalan metinler ve dürüst yedek davranışı

Bu yayın, her uzun metnin her dilde eksiksiz çevrildiği anlamına gelmez. Çeviri sağlayıcısı HTTP 429 hız sınırı döndürdü. Eksik veya korunan isimleri kaybetmiş metinlerde hatalı çeviri yayımlanmadı: İngilizce kaynak, gerektiğinde orijinal Türkçe gösterilir. Dil seçicisindeki ve ilgili bilgi kutusundaki yerelleştirilmiş uyarılar bu durumu açıklar. Bu bir ziyaretçi tarafı canlı çeviri servisi değildir.

`locales/*.json` içindeki `_sourceFallbacks` kaynak metin anahtarlarını ve kullanılan dili; `speaker-bios/*.json` içindeki `sourceLanguage` biyografi yedeklerini belirtir. Bunlar tamamlanacak metinlerin makinece okunabilir listeleridir. Yunanca arayüzün 215 kısa metni ayrıca gözden geçirildi; kalan açıklar ağırlıkla uzun haber/firma açıklamaları ve biyografilerdir. Bazı basın başlıkları yayınlandıkları özgün dilde korunur.

| Dil | İngilizce kaynakla gösterilen biyografi | Kaynak dille gösterilen metin anahtarı |
|---|---:|---:|
| en | 0 | 0 |
| es | 0 | 2 |
| it | 2 | 2 |
| de | 2 | 4 |
| fr | 1 | 5 |
| pt | 0 | 2 |
| zh-CN | 0 | 6 |
| ja | 4 | 15 |
| ar | 3 | 20 |
| ru | 2 | 21 |
| da | 8 | 5 |
| nl | 1 | 1 |
| el | 13 | 213 |

Bu tablo metin anahtarlarını sayar; aynı içerik başlık, bağlantı etiketi ve erişilebilirlik açıklaması olarak tekrar edebilir.

## Kontroller

- 29 otomatik kontrol: 14 dilin güncel program yapısı, ad/kurum koruması, biyografi varlıkları, kaynak yedekleri, yerel sözlükler, güvenlik ve bildirim planı.
- Mobil tarayıcıda her dilde dil seçimi, mevcut bölümün korunması, program, kişi isimleri, haber ve firma pencereleri, 51 konuşmacı kartı, biyografi ve lacivert zemin kontrol edilir.
- Otomatik kontroller çevirilerin anadil editörü tarafından onaylandığı anlamına gelmez. Diğer haber/kaynak doğruluk notları kendi inceleme belgelerinde geçerlidir.
