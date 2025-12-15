// src/pages/Resources.jsx
import React, { useMemo, useState } from "react";
import Seo from "../components/Seo";
import ResourceCard from "../components/ResourceCard";
import { Link } from "react-router-dom";

const TYPES = [
  { key: "all", label: "Tümü", icon: "🧰" },
  { key: "docx", label: "Word", icon: "📝" },
  { key: "xlsx", label: "Excel", icon: "📊" },
  { key: "pdf", label: "PDF", icon: "📄" },
  { key: "checklist", label: "Checklist", icon: "✅" },
  { key: "other", label: "Diğer", icon: "✨" },
];

function getTypeFromHref(href = "") {
  const h = href.toLowerCase();
  if (h.endsWith(".doc") || h.endsWith(".docx")) return "docx";
  if (h.endsWith(".xls") || h.endsWith(".xlsx")) return "xlsx";
  if (h.endsWith(".pdf")) return "pdf";
  return "other";
}

export default function Resources() {
  const resources = [
    {
      id: "8d-rapor",
      title: "8D Problem Çözme Rapor Şablonu",
      sub: "Müşteri şikâyetleri ve kronik problemler için.",
      description:
        "Adım adım problem çözme için; ekip ataması, kök neden analizi ve aksiyon takibi alanları içeren pratik rapor şablonu.",
      href: "/downloads/8d-template.docx",
      badge: "Popüler",
      highlights: [
        "Adım adım akış + sorumlular",
        "Kök neden & aksiyon alanları",
        "Onay / imza alanları",
      ],
    },
    {
      id: "fmea-form",
      title: "FMEA Formu (Süreç / Ürün)",
      sub: "Risk bazlı düşünme için temel araç.",
      description:
        "Riskleri görünür kılmak, aksiyonları takip etmek ve revizyonu yönetmek için uyarlanabilir Excel formu.",
      href: "/downloads/fmea-form.xlsx",
      badge: "Yeni",
      highlights: [
        "Şiddet / olasılık / tespit alanları",
        "RPN hesaplama altlığı",
        "Revizyon ve versiyon takibi",
      ],
    },
    {
      id: "spc-kart",
      title: "SPC Kontrol Kartı Şablonları",
      sub: "İstatistiksel proses kontrol için pratik kartlar.",
      description:
        "Farklı kontrol kartları için ayrı sayfalar içeren, ölçüm ve grafik alanları hazır SPC şablon seti.",
      href: "/downloads/spc-charts.xlsx",
      badge: "Önerilen",
      highlights: [
        "Birden fazla kontrol kartı",
        "Grafik alanları hazır",
        "Operatör/tarih izlenebilirliği",
      ],
    },
  ];

  // Kaynaklara tip bilgisini ekleyelim (ResourceCard'a dokunmadan)
  const normalized = useMemo(() => {
    return resources.map((r) => {
      const type = r.type || getTypeFromHref(r.href);
      return { ...r, type };
    });
  }, [resources]);

  const [q, setQ] = useState("");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    let list = [...normalized];

    if (type !== "all") {
      list = list.filter((x) => x.type === type);
    }

    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter((x) => {
        const t = (x.title || "").toLowerCase();
        const s = (x.sub || "").toLowerCase();
        const d = (x.description || "").toLowerCase();
        const h = (x.highlights || []).join(" ").toLowerCase();
        return t.includes(qq) || s.includes(qq) || d.includes(qq) || h.includes(qq);
      });
    }

    return list;
  }, [normalized, q, type]);

  const total = normalized.length;
  const shown = filtered.length;

  const activeTypeLabel = useMemo(() => {
    const found = TYPES.find((x) => x.key === type);
    return found?.label || "Tümü";
  }, [type]);

  return (
    <>
      <Seo
        title="Kaynaklar – Kariyer Rotası"
        description="Kalite, kariyer, üretim ve verimlilik odaklı; indirilebilir şablonlar, kontrol listeleri ve pratik dokümanlar."
        type="website"
      />

      <div className="res-page">
        <div className="container">
          {/* HERO */}
          <section className="res-hero">
            <div className="res-hero-card">
              <div className="res-hero-left">
                <div className="res-kicker">KARİYER ROTASI • KAYNAKLAR</div>
                <h1 className="res-title">Ücretsiz Kaynaklar</h1>
                <p className="res-sub">
                  Günlük işte “al ve uygula” diye hazırlanmış <b>şablonlar</b>, <b>kontrol listeleri</b>,
                  <b>formlar</b> ve <b>dokümanlar</b>. Konu tek bir alana bağlı değil; içerik kütüphanesi
                  düzenli olarak büyür.
                </p>

                <div className="res-badges">
                  <span className="res-pill">📦 {total} kaynak</span>
                  <span className="res-pill">⚡ Hızlı uyarlama</span>
                  <span className="res-pill">🧩 Şablon • Liste • Form</span>
                </div>

                <div className="res-cta">
                  <a className="btn btn-primary" href="#kaynak-listesi">
                    Kaynaklara git →
                  </a>
                  <Link className="btn btn-ghost" to="/blog">
                    Blogdan öğren →
                  </Link>
                </div>
              </div>

              <aside className="res-hero-right">
                <div className="res-info-title">Nasıl çalışıyor?</div>
                <p className="res-info-text">
                  Kaynakları indirirken <b>isim</b> ve <b>e-posta</b> istenmesinin sebebi yeni kaynaklar
                  eklendiğinde haber vermek. Gereksiz mail yok, spam yok.
                </p>

                <ul className="res-info-list">
                  <li>✅ Kısa ve uygulanabilir format</li>
                  <li>✅ İndir → uyarlayın → standardize edin</li>
                  <li>✅ Yeni içerik geldikçe kütüphane büyür</li>
                </ul>

                <div className="res-mini-note">
                  İpucu: En iyi sonuç için şablonu 1 kez şirket diline uyarlayıp “standart doküman”
                  olarak kaydedin.
                </div>
              </aside>
            </div>
          </section>

          {/* TOOLBAR (Premium, sade) */}
          <section className="res-toolbar" aria-label="Kaynak filtreleri">
            <div className="res-toolbar-inner">
              <div className="res-tabs" role="tablist" aria-label="Kaynak türleri">
                {TYPES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`res-tab ${type === t.key ? "is-active" : ""}`}
                    onClick={() => setType(t.key)}
                    role="tab"
                    aria-selected={type === t.key}
                  >
                    <span className="res-tab-ico">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="res-search">
                <span className="res-search-ico">🔎</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Kaynaklarda ara (örn: kontrol listesi, form, rapor...)"
                />
              </div>

              <div className="res-toolbar-meta">
                <span className="res-meta-pill">
                  Filtre: <b>{activeTypeLabel}</b>
                </span>
                <span className="res-meta-pill">
                  Gösterilen: <b>{shown}</b> / {total}
                </span>

                {(q.trim() || type !== "all") && (
                  <button
                    type="button"
                    className="res-clear"
                    onClick={() => {
                      setQ("");
                      setType("all");
                    }}
                  >
                    Temizle
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* LIST */}
          <section id="kaynak-listesi" className="res-section">
            <div className="res-section-head">
              <h2 className="section-title">Kaynaklar</h2>
              <div className="res-section-right">
                <Link className="res-link" to="/iletisim">
                  Yeni kaynak öner →
                </Link>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="res-empty">
                <div className="res-empty-title">Sonuç bulunamadı</div>
                <div className="res-empty-text">
                  Arama terimini değiştir veya filtreyi kaldırmayı dene.
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setQ("");
                    setType("all");
                  }}
                >
                  Filtreleri temizle
                </button>
              </div>
            ) : (
              <div className="res-grid">
                {filtered.map((r) => (
                  <ResourceCard key={r.id} item={r} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
