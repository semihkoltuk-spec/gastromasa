# Gastromasa resmî haberleri — 12 Kasım 2026

`https://www.gastromasa.com/news/` ile resmî WordPress API'si karşılaştırıldı:

- `/wp-json/wp/v2/posts?per_page=15`: ilk 15 yazı ve yayın sırası.
- `/wp-json/wp/v2/posts?per_page=10&offset=5`: mevcut beş yazının hemen öncesindeki on yazı.
- `/wp-json/wp/v2/media?include=...&per_page=20`: kapakların kaynak URL ve boyutları.

İlk beş yazı (41408, 41081, 41004, 41001, 40743) içerikleriyle korundu. Sonraki kayıtlar:

| Yazı ID | Konu | Kaynak yayın tarihi |
| --- | --- | --- |
| 40740 | Pía León | 9 Eylül 2026 |
| 40737 | Bo Bech | 9 Eylül 2026 |
| 40732 | Santiago Lastra | 1 Eylül 2026 |
| 40729 | Mohammad Orfali | 1 Eylül 2026 |
| 40723 | Thomas Bühner | 28 Ağustos 2026 |
| 40720 | Grégoire Berger | 28 Ağustos 2026 |
| 40715 | Thibault Hauchard | 26 Ağustos 2026 |
| 40711 | Luiz Filipe Souza | 26 Ağustos 2026 |
| 40709 | Viki Geunes | 26 Ağustos 2026 |
| 40706 | Franco Pepe | 26 Ağustos 2026 |

Tarih sıralamasında aynı gün içindeki resmî `publishedAt` sırası korundu. `news.json` her kaydın özgün İngilizce başlığını ve doğrudan kaynak bağlantısını saklar. Kullanıcı arayüzünde Türkçe başlıklar ve kaynak içerikten hazırlanmış kısa, üç paragraflık editoryal özetler gösterilir; kişi, restoran ve kurum adları korunur. Uzun makale metinleri kopyalanmadı.

Sekiz yazının resmî kapakları yerel WebP dosyaları olarak eklendi; orijinal URL'ler JSON'da saklanır. Luiz Filipe Souza ve Viki Geunes yazılarının `featured_media` değeri 0; tam yazı sayfalarında da haber görseli yok, yalnızca site logosu bulunuyor. Bu iki yazıda kullanıcının haber görseli eksikliği için daha önce onayladığı mevcut Gastromasa sahne fotoğrafı (`assets/press/turizmproje.jpg`) kullanılır. Görselin kaynaktan alındığı iddia edilmez; `imageFallback` alanında gerekçe korunur, kullanıcı arayüzüne kaynak notu eklenmez.

Ana sayfada Rakamlarla Gastromasa'nın ardından ilk beş haber ve “Devamı” bağlantısı gösterilir; bağlantı tüm 15 haberin bulunduğu #haberler sayfasını açar. Aynı kartlar rota değişiminde yeniden kullanılmaya devam eder. Görseller lazy yüklenir; ayrıntı metni JSON'u ilk haber tıklamasında yüklenmeye devam eder. Bu bir kaynak anlık görüntüsüdür, otomatik senkronizasyon değildir.
