---
title: "Kalibrasyon Takip Listesi: Cihaz Doğrulama Nasıl Yapılır? (Excel İndir)"
date: "2025-12-30"
excerpt: "Kalibrasyon ve doğrulama farkı, cihaz güvenilirliği ve Excel tabanlı Kalibrasyon Takip Listesi ile ölçüm hatalarını önleme."
tags: ["Kalite", "ISO 9001", "Kalibrasyon", "Doğrulama", "Ölçüm", "Excel", "Şablon"]
cover: "/covers/kalibrasyon.png"
---

Bir sabah üretim hattına indiğinizi ve operatörün kullandığı kumpasın aslında 0.1 mm hatalı ölçtüğünü fark ettiğinizi düşünün. O kumpasla ölçülüp "OK" onayı verilen ve müşteriye gönderilen binlerce parça ne olacak?

Cevap basit: **Felaket.**

Müşteri iadesi, hurda maliyeti ve en kötüsü de itibar kaybı. İşte bu senaryoyu yaşamamanın tek yolu, etkili bir **Kalibrasyon Yönetim Sistemi** kurmaktır.

Çoğu işletmede kalibrasyon, *"Yılda bir cihazları laboratuvara gönder, sertifikaları dosyaya koy"* rutini olarak görülür. Oysa **ISO 9001** ve **IATF 16949**, bundan çok daha fazlasını, yani **"Ölçüm Güvenilirliğini"** ister.

Bu yazıda hem kalibrasyon sürecini nasıl yöneteceğinizi anlatacağım hem de işinizi kolaylaştıracak **Otomatik Renklendirmeli Kalibrasyon Takip Listesi Excel şablonunu** paylaşacağım.

---

## Kalibrasyon Nedir, Ne Değildir?

Önce kavramları oturtalım. **Kalibrasyon, bozuk bir cihazı tamir etmek değildir.**

**Kalibrasyon:**  
Bir ölçüm cihazının (örneğin kumpas), doğruluğu bilinen bir referans (mastar) ile karşılaştırılması ve hata miktarının raporlanmasıdır.  

Yani kumpasınız 10.00 mm'yi 10.02 mm ölçüyorsa, kalibrasyon size **"Bu cihaz 0.02 mm sapıyor"** der. Kullanıp kullanmamak sizin kararınızdır.

---

## Kritik Ayrım: Kalibrasyon mu, Doğrulama mı?

Mühendislerin en sık karıştırdığı iki kavramı netleştirelim. Excel dosyasını kullanırken bu ayrım işinize çok yarayacak.

| Özellik | Kalibrasyon (Calibration) | Doğrulama (Verification) |
|------|---------------------------|--------------------------|
| Kim Yapar? | Genelde Akredite (TÜRKAK vb.) Laboratuvarlar | İşletme içindeki Yetkin Personel |
| Sıklık | Genelde Yılda 1 Kez | Günlük, Haftalık veya Vardiya Başında |
| Maliyet | Yüksektir | Düşüktür (Sadece zaman maliyeti) |
| Amaç | İzlenebilirlik ve Sertifikasyon | Cihazın o an doğru çalıştığından emin olmak |

**Altın Kural:**  
Cihazlarınızı yılda 1 kez kalibrasyona gönderin, ancak her hafta (veya kritikse her gün) doğrulama yapın.

Kalibrasyon cihazın **ehliyeti** ise, doğrulama **alkol kontrolüdür**. Ehliyetiniz olsa bile o an araba sürmeye uygun olmayabilirsiniz.

---

## Kalibrasyon Süreci Nasıl Yönetilir? (4 Adım)

Sizin için hazırladığım Excel dosyasını doldurmadan önce şu 4 adımı tamamlamış olmalısınız:

### 1. Envanter Çıkarma ve Kimliklendirme
Ölçüm cihazlarını *"Kumpas 1, Kumpas 2"* diye çağıramazsınız.  

Her cihaza benzersiz bir kimlik numarası (ID) verin.  
**Örn:** KL-001, KL-002  

Ve bu numaraları silinmeyecek şekilde cihazın üzerine etiketleyin.

---

### 2. Periyot Belirleme
Her cihaz 1 yılda bir kalibre edilmek zorunda değildir.

- Çok kullanılan ve hassas cihazlar → **6 ay**
- Nadir kullanılan mastarlar → **2 yıl**

Risk analizi yaparak periyodu belirleyin.

---

### 3. Kabul Kriteri Belirleme
Kalibrasyon raporu geldiğinde sadece *"Sertifika var mı?"* diye bakmayın.

**Örnek:**  
0.02 mm hassasiyetle iş yapıyorsanız ve kumpasınız 0.05 mm sapıyorsa, o cihaz sizin için **RED**’dir. Üretimde kullanılamaz.

---

### 4. Etiketleme
Sahadaki operatör, elindeki cihazın durumunu bilmelidir.  
Üç renkli sistem en basitidir:

- **Yeşil Etiket:** Kalibreli, Kullanıma Uygun  
- **Kırmızı Etiket:** Hatalı / Kullanım Dışı  
- **Sarı Etiket:** Şartlı Kullanım (Sadece kaba ölçümler için)

---

## Excel Şablonunda Sizi Neler Bekliyor?

Sıfırdan liste hazırlamakla uğraşmamanız için, denetimlerde başarıyla kullanılan formatı sizinle paylaşıyorum.

**Kalibrasyon Takip Listesi Özellikleri:**

- **Otomatik Tarih Uyarısı:**  
  Yaklaşan tarihler **SARI**, geçen tarihler **KIRMIZI** yanar.
- **Cihaz Durum Statüsü:**  
  Aktif / Hurda / Kayboldu
- **Doğrulama Sütunları:**  
  İç doğrulama periyotlarını da takip edebilirsiniz.
- **Konum Bilgisi:**  
  Cihazın hangi hatta veya kimde olduğu.

---

## İndirme Alanı

Denetimlerde *"Hangi cihazın süresi doldu?"* stresi yaşamamak için aşağıdaki butona tıklayarak dosyayı indirebilirsiniz.

👉 **[📥 Excel Şablonunu İndir: Kalibrasyon Takip Listesi v1.0](DOSYA_LINKI_BURAYA_GELECEK)**

*(Dosya Linki Buraya Gelecek)*

---

## Sonuç

Ölçemediğiniz şeyi yönetemezsiniz, yanlış ölçtüğünüz şeyi ise yanlış yönetirsiniz.  
Kalibrasyon bir **masraf** değil, firmanızın itibarını koruyan bir **sigortadır**.

Bu listeyi indirin, cihazlarınızı sisteme girin ve bir daha  
*"Acaba hatalı mı ölçtük?"* korkusu yaşamayın.
