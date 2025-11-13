// src/pages/Resources.jsx
import React from "react";
import Seo from "../components/Seo";
import ResourceCard from "../components/ResourceCard";

export default function Resources() {
  const resources = [
    {
      id: "8d-rapor",
      title: "8D Problem Çözme Rapor Şablonu",
      sub: "Müşteri şikâyetleri ve kronik problemler için.",
      description:
        "8D adımlarını eksiksiz takip eden, ekip atamaları ve aksiyon planı alanları içeren pratik bir 8D rapor şablonu.",
      href: "/downloads/8d-template.docx",
      badge: "Popüler",
      highlights: [
        "Her 8D adımı için ayrı bölüm",
        "Kök neden, düzeltici ve önleyici aksiyon alanları",
        "Müşteri onayı ve ekip imzaları için alanlar",
      ],
    },
    {
      id: "fmea-form",
      title: "FMEA Formu (Süreç / Ürün)",
      sub: "Risk bazlı düşünme için temel araç.",
      description:
        "RPN hesaplaması, aksiyon ve sorumlu takibini içeren; hem süreç hem ürün FMEA için uyarlanabilir Excel formu.",
      href: "/downloads/fmea-form.xlsx",
      badge: "Yeni",
      highlights: [
        "Olasılık, şiddet ve tespit edilebilirlik alanları",
        "Otomatik RPN hesaplama altlığı (elle formül eklenebilir)",
        "Revizyon tarihleri ve versiyon takibi için alan",
      ],
    },
    {
      id: "spc-kart",
      title: "SPC Kontrol Kartı Şablonları",
      sub: "İstatistiksel proses kontrol için pratik kartlar.",
      description:
        "Xbar-R, P ve C kartları için ayrı sayfalar içeren, ölçüm ve grafik alanları hazır SPC şablon seti.",
      href: "/downloads/spc-charts.xlsx",
      badge: "Önerilen",
      highlights: [
        "Farklı kontrol kartı tipleri için ayrı sayfalar",
        "Numune, ortalama ve limit alanları",
        "Operatör ve tarih alanları ile izlenebilirlik",
      ],
    },
  ];

  return (
    <>
      <Seo
        title="Kaynaklar – Kariyer Rotası"
        description="8D, FMEA, SPC ve diğer kalite araçları için indirilebilir şablon ve dokümanları buradan ücretsiz indirebilirsiniz."
        type="website"
      />

      <div className="container" style={{ padding: "24px 0" }}>
        {/* Üst başlık + mini açıklama */}
        <header style={{ marginBottom: 16 }}>
          <h2
            style={{
              fontFamily: "Poppins,system-ui",
              margin: "0 0 6px",
              fontSize: 24,
            }}
          >
            Kaynaklar
          </h2>
          <p className="p" style={{ margin: 0 }}>
            Kalite mühendisi ve kalite yöneticilerinin günlük işlerinde kullanabileceği,
            pratik ve sade şablonlar.
          </p>
        </header>

        {/* Üst bilgi kartı */}
        <section
          className="card"
          style={{
            marginBottom: 20,
            display: "grid",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1d4ed8",
            }}
          >
            Nasıl çalışıyor?
          </div>
          <p className="p" style={{ margin: 0, fontSize: 14 }}>
            Şablonları ücretsiz indirebilmek için isim ve e-posta adresini
            bırakman yeterli. Böylece yeni içerik ve şablonlardan da haberdar
            olabilirsin.
          </p>
          <ul
            className="p"
            style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}
          >
            <li>Şablonlar pratik kullanım için tasarlandı, gereksiz süs yok.</li>
            <li>8D, FMEA ve SPC gibi temel kalite araçlarına odaklı.</li>
            <li>İleride yeni şablonlar eklendikçe bu sayfa güncellenecek.</li>
          </ul>
        </section>

        {/* Kartlar */}
        <section
  style={{
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    marginTop: 12,
  }}
>
  {resources.map((r) => (
    <ResourceCard key={r.id} item={r} />
  ))}
</section>

      </div>
    </>
  );
}
