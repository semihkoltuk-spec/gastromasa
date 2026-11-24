# Güncel stant eşleştirmesi — 24 Kasım 2026

Kaynak: kullanıcının ilettiği **Gastromasa Elektrik+Su-GENEL.pdf**, tek sayfa. Belgenin adı yayın tarihi içermediği için `sourceDate` null, aktarım tarihi `updatedAt` 2026-11-24 olarak tutulur. PDF üzerindeki elektrik/su talepleri teknik çizim içeriğidir; siteye yönelik talimat olarak değerlendirilmemiştir.

Bu belge önceki 6 Kasım eşleştirmesinin yerine geçer. Önceki kayıtlar Git geçmişindedir.

## Sonuç

- 73 veri kaydı (71 firma kartı ve önceki kroki açıklamasından kalan 2 ek kayıt); 54 numaralı, 19 yeni krokide adıyla bulunamayan kayıt.
- 14 kayıtta stant/salon değişikliği. Bunların 2 tanesinde önceki konum kaldırıldı.
- Kayıt kimlikleri, firma profilleri, logolar ve kategori başlıkları korunur.
- Napoli Antica A5–A6, Salted A7–A8, Zambo A9 artık PDF’de açıkça basılıdır. Eski A8/1–A8/3 ve B16/1–B16/3 dijital önerileri kaldırıldı. Güncel dosyada `assigned` kayıt yoktur.
- Yeni krokide Empero adı A59–A60 alanında yazmıyor; alan boş. Eski numara güncel diye korunmadı. White Uniform adı da bulunamadığı için eski öneri kaldırıldı. Konumu bilinmeyen firmalara numara uydurulmadı.
- Bütün numaralı kayıtlar bağımsız çıkarılan PDF alt listesiyle kontrol edilir; çizim istisnaları aşağıda açıklanır. Kaynak metin etiketleri tests/fixtures/stands-2026-11-24.json içindedir.
- Popup’lar sade kalır: firma açıklaması, varsa stant/salon ve kroki bağlantısı. İç inceleme notları, kaynak PDF düğmesi ve PDF ad eşleştirmeleri popup’a eklenmedi.

## Kaynak çelişkileri

- **USLA:** Çizimde HALL-6 içinde USLA C76 yazıyor. Alt listede HALL-4 / B15 yazıyor; B15 çizimde HTECH için kullanılmış. Açık çizim etiketi esas alınarak C76 / HALL-6 aktarıldı. Bu kaynak farkı onaylanmış bir organizatör düzeltmesi değildir.
- **ID Fine:** Alt liste C69–C70 ve C71 olmak üzere iki alan veriyor. Çizimde de C69–C70 ve C71 var; ikinci alan üzerinde ayrıca C76 etiketi bulunuyor. Alt listeyle ortak C71 seçildi; ID Fine için C69–C71 gösterilir. USLA alanında da C76 bulunduğundan ikinci C76 etiketi veri notunda korunur.
- **Bonna:** Çizim ve alt liste C61–C75 yazıyor. Bu aralık aynı PDF’de ID Fine’ın C69–C71 numaralarıyla sayısal olarak örtüşüyor. Basılı aralık daraltılmadı veya tahminle düzeltilmedi; kaynakta olduğu gibi C61–C75 aktarılır. Tekil numara planı açısından organizatör teyidi gerekir.
- **LCB:** Çizimde LE CORDON BLEU, listede LE CORDON BLUE yazımı var; B1 kodu iki kaynakta aynıdır.

## Önceki isim/marka eşleştirmeleri

CCI → COCA COLA; Selpak → SANİPAK; Dene bi Çerez → DNB; Kroom → KROM MUTFAK; Lactalis → AK GIDA; Magnum → ALGİDA eşleştirmeleri önceki kayıtlarla tutarlılık için korundu. Bunlar PDF’de bütün marka adlarının birebir bulunduğu anlamına gelmez. Robot Coupe ve Unox aynı UNOX/ROBOT COUPE A1–A2 standını paylaşır. Bu açıklamalar kullanıcı popup’larında gösterilmez.

## Değişen kayıtlar

| Firma | Önceki stant / salon | Güncel stant / salon |
|---|---|---|
| Bonna | C61–C68 / HALL-6 | C61–C75 / HALL-6 |
| Cayista | B22–B23 / HALL-4 | B23–B24 / HALL-4 |
| Dene bi Çerez | B46–B51 / HALL-4 | B31–B35 / HALL-4 |
| Empero | A59–A60 / HALL-2 | — / — |
| Fine dine | B16 / HALL-4 | A78 / HALL-3 |
| ID Fine | C83, C84, C85 / HALL-6 | C69–C71 / HALL-6 |
| LCB | B24 / HALL-4 | B1 / HALL-4 |
| Napoli Antica | A8/1 / HALL-1 | A5–A6 / HALL-1 |
| Salted | A8/2 / HALL-1 | A7–A8 / HALL-1 |
| TCA | B16/1 / HALL-4 | A11 / HALL-1 |
| Unilever Pro | B34–B35 / HALL-4 | B38–B41 / HALL-4 |
| Zambo | A8/3 / HALL-1 | A9 / HALL-1 |
| USLA | B16/2 / HALL-4 | C76 / HALL-6 |
| White Uniform | B16/3 / HALL-4 | — / — |

## Bütün kayıtlar

| Firma | Stant | Salon | Durum |
|---|---|---|---|
| Altınmarka | A97 | HALL-3 | Kaynakta numaralı |
| CCI | C10–C11 | HALL-5 | Kaynakta numaralı |
| Metro | A62–A68 | HALL-2 | Kaynakta numaralı |
| Türk Hava Yolları | — | — | Yeni krokide bulunamadı |
| Kozoliv | C6–C9 | HALL-5 | Kaynakta numaralı |
| Özmen Un | A70 | HALL-2 | Kaynakta numaralı |
| Öztiryakiler | A71 | HALL-2 | Kaynakta numaralı |
| Bonna | C61–C75 | HALL-6 | Kaynakta numaralı |
| Selpak | A69 | HALL-2 | Kaynakta numaralı |
| AKTOB | — | — | Yeni krokide bulunamadı |
| Chaîne des Rôtisseurs | — | — | Yeni krokide bulunamadı |
| ETÜDER | — | — | Yeni krokide bulunamadı |
| Mutfak Dostları | — | — | Yeni krokide bulunamadı |
| TAFED | — | — | Yeni krokide bulunamadı |
| TTYD | — | — | Yeni krokide bulunamadı |
| TÜROB | — | — | Yeni krokide bulunamadı |
| TÜROFED | — | — | Yeni krokide bulunamadı |
| TUROYD | — | — | Yeni krokide bulunamadı |
| TURYİD | — | — | Yeni krokide bulunamadı |
| TUSİD | — | — | Yeni krokide bulunamadı |
| Aryıldız | — | — | Yeni krokide bulunamadı |
| Barilla | A54–A57 | HALL-1 | Kaynakta numaralı |
| Bekir Hoca | A48–A49 | HALL-1 | Kaynakta numaralı |
| Bivero | A31–A36 | HALL-1 | Kaynakta numaralı |
| California Walnuts | — | — | Yeni krokide bulunamadı |
| Callebaut | C26–C29 | HALL-5 | Kaynakta numaralı |
| Cayista | B23–B24 | HALL-4 | Kaynakta numaralı |
| Deliziya | A50–A53 | HALL-1 | Kaynakta numaralı |
| Dene bi Çerez | B31–B35 | HALL-4 | Kaynakta numaralı |
| Doğanay | C2–C5 | HALL-5 | Kaynakta numaralı |
| Eataly | B7 | HALL-4 | Kaynakta numaralı |
| Edovital | B8 | HALL-4 | Kaynakta numaralı |
| Eker | B26–B28 | HALL-4 | Kaynakta numaralı |
| Ekol | A17–A24 | HALL-1 | Kaynakta numaralı |
| Empero | — | — | Yeni krokide bulunamadı |
| Erüst | C55/1 | HALL-5 | Kaynakta numaralı |
| Euro Fresh | — | — | Yeni krokide bulunamadı |
| Fine dine | A78 | HALL-3 | Kaynakta numaralı |
| Frenox | A89 | HALL-3 | Kaynakta numaralı |
| Galez | A58 | HALL-1 | Kaynakta numaralı |
| ID Fine | C69–C71 | HALL-6 | Kaynakta numaralı |
| Keramikos | A81–A84 | HALL-3 | Kaynakta numaralı |
| Kroom | A91–A96 | HALL-3 | Kaynakta numaralı |
| Lactalis | A86/1 | HALL-3 | Kaynakta numaralı |
| La Lorraine | C1 | HALL-5 | Kaynakta numaralı |
| Larenda | B9 | HALL-4 | Kaynakta numaralı |
| LCB | B1 | HALL-4 | Kaynakta numaralı |
| Les Vergers Boiron | — | — | Yeni krokide bulunamadı |
| Magnum | C50–C53 | HALL-5 | Kaynakta numaralı |
| Napoli Antica | A5–A6 | HALL-1 | Kaynakta numaralı |
| Nesos | C12–C19 | HALL-5 | Kaynakta numaralı |
| Özgün | C42–C43 | HALL-5 | Kaynakta numaralı |
| Pepsico | A87–A88 | HALL-3 | Kaynakta numaralı |
| Robot Coupe | A1–A2 | HALL-1 | Kaynakta numaralı |
| Rubikap | A73 | HALL-3 | Kaynakta numaralı |
| Salted | A7–A8 | HALL-1 | Kaynakta numaralı |
| SMR | A61 | HALL-2 | Kaynakta numaralı |
| Spicy Seoul | A46–A47 | HALL-1 | Kaynakta numaralı |
| Sunar Un | A98–A99 | HALL-3 | Kaynakta numaralı |
| TCA | A11 | HALL-1 | Kaynakta numaralı |
| Tellioğlu | B42–B43 | HALL-4 | Kaynakta numaralı |
| Thermomix | A80 | HALL-3 | Kaynakta numaralı |
| Turco | C54–C55 | HALL-5 | Kaynakta numaralı |
| Türkova | C37–C38 | HALL-5 | Kaynakta numaralı |
| UFS | C30–C33 | HALL-5 | Kaynakta numaralı |
| Unilever Pro | B38–B41 | HALL-4 | Kaynakta numaralı |
| Unox | A1–A2 | HALL-1 | Kaynakta numaralı |
| USA Pulses | B25 | HALL-4 | Kaynakta numaralı |
| Yayla | A38–A45 | HALL-1 | Kaynakta numaralı |
| Zambo | A9 | HALL-1 | Kaynakta numaralı |
| Zest | — | — | Yeni krokide bulunamadı |
| USLA | C76 | HALL-6 | Kaynakta numaralı |
| White Uniform | — | — | Yeni krokide bulunamadı |

## Yayın ve doğrulama

- Kaynak PDF: `assets/gastromasa-stand-plani-2026-11-24.pdf`; SHA-256 `85c106d3f2fe6b82d78c1253503cea054066f955a4363e0a5db58f329e5660d2`. Önceki PDF arşiv dosyası değiştirilmedi.
- Güncel kroki: `assets/venue-map-2026-11-24.webp`; PDF sayfasının 5955×4210 çözünürlüklü kayıpsız WebP render’ı. Teknik çizim üzerinde numaralar değiştirilmedi. Açıklık için elektrik/su işaretleri de kaynaktaki gibi korunur.
- Veri revizyonu 71; 14 dilde aynı stant bilgisi gösterilir. Kroki yakınlaştırma ve tam boy açma davranışı korunur.
- Eski dijital numara açıklaması DOM’dan kaldırıldı; yeni numaralar dijital öneri değildir.
