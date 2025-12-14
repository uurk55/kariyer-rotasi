// src/pages/Home.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Seo from "../components/Seo";
import NewsletterForm from "../components/NewsletterForm";

export default function Home() {
  const nav = useNavigate();
  const [latest, setLatest] = React.useState([]);
  const [featured, setFeatured] = React.useState(null);

  React.useEffect(() => {
    fetch("/blog/index.json")
      .then((r) => r.json())
      .then((list) => {
        const sorted = [...list].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const f =
          sorted.find((p) => p.featured) ||
          sorted.find((p) => (p.tags || []).includes("Öne Çıkan")) ||
          sorted[0];

        setFeatured(f || null);
        setLatest(sorted.slice(0, 3));
      })
      .catch(() => {
        setLatest([]);
        setFeatured(null);
      });
  }, []);

  return (
    <>
      <Seo
        title="Kariyer Rotası – Mühendisler ve kalite profesyonelleri için kariyer & kalite rehberleri"
        description="Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik konularında; teoride kaybolmadan, sahada uygulanabilir rehberler ve şablonlar."
        type="website"
      />

      {/* HEADER ALTI – REKLAM ALANI */}
      <div className="top-ad-slot" aria-label="Reklam alanı">
        {/* Buraya reklam / banner gelecek */}
      </div>

      <div className="home-wrap">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />

          <div className="container">
            <div className="hero-inner">
              <div className="hero-left">
                <div className="hero-kicker">
                  MÜHENDİSLER VE KALİTE PROFESYONELLERİ İÇİN
                </div>

                <h1 className="hero-title">Kariyer yolculuğuna hazır mısın?</h1>

                <p className="hero-desc">
                  Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik
                  konularında; teoride kaybolmadan, sahada uygulanabilir rehberler
                  ve şablonlar paylaşan bir platform.
                </p>

                <div className="hero-actions">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => nav("/blog")}
                  >
                    Yazıları keşfet →
                  </button>

                  {/* İkincil değil: primary gibi vurgulu */}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => nav("/kaynaklar")}
                  >
                    Ücretsiz şablonlara göz at →
                  </button>
                </div>

                <ul className="hero-bullets">
                  <li>8D, DÖF, FMEA, SPC gibi kalite araçları için pratik rehberler</li>
                  <li>CV, mülakat ve LinkedIn odaklı kariyer içerikleri</li>
                  <li>ChatGPT ile hızlandırma ve verimlilik artırma senaryoları</li>
                </ul>
              </div>

              <aside className="hero-note">
                <h3>Kariyer Rotası’nda neler bulacaksın?</h3>
                <p style={{ margin: 0 }}>
                  Özellikle kariyerinin ilk yıllarındaki mühendis ve kalite
                  profesyonelleri için, doğrudan sahada kullanabileceğin sade içerikler.
                </p>
                <ul>
                  <li>Örnekli anlatımlar ve kısa kontrol listeleri</li>
                  <li>İndirilebilir şablonlar ve hazır formlar</li>
                  <li>Yapay zekâyı işine entegre etmeyi kolaylaştıran fikirler</li>
                </ul>
                <p style={{ margin: "10px 0 0", opacity: 0.95 }}>
                  Hedef: Teoride boğmadan, “al ve uygula” formatı.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* KONULARI KEŞFET */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Konuları keşfet</h2>
              <p className="section-sub">
                Nereden başlayacağını bilmiyorsan, bu dört alana göz at.
              </p>
            </div>

            <div className="topic-grid">
              <div className="topic-card topic-quality">
                <div className="topic-head">
                  <div className="topic-icon">📊</div>
                  <h3 className="topic-title">Kalite Yönetimi</h3>
                </div>
                <p className="topic-desc">
                  8D, DÖF, FMEA, SPC gibi araçlar ve ISO 9001/14001/45001/50001 üzerine
                  sahadan örnekli rehberler.
                </p>
                <Link className="topic-link" to="/blog?category=Kalite">
                  Kalite yazılarına git →
                </Link>
              </div>

              <div className="topic-card topic-career">
                <div className="topic-head">
                  <div className="topic-icon">🎯</div>
                  <h3 className="topic-title">Kariyer Gelişimi</h3>
                </div>
                <p className="topic-desc">
                  CV, mülakat, LinkedIn ve maaş pazarlığı gibi konularda mühendisler için
                  net, uygulanabilir içerikler.
                </p>
                <Link className="topic-link" to="/blog?category=Kariyer">
                  Kariyer yazılarına git →
                </Link>
              </div>

              <div className="topic-card topic-ai">
                <div className="topic-head">
                  <div className="topic-icon">🤖</div>
                  <h3 className="topic-title">Teknoloji & Yapay Zekâ</h3>
                </div>
                <p className="topic-desc">
                  ChatGPT ve benzeri araçları iş akışına entegre etmek için promptlar,
                  şablonlar ve örnek senaryolar.
                </p>
                <Link className="topic-link" to="/blog?category=Yapay%20Zek%C3%A2">
                  Yapay zekâ içerikleri →
                </Link>
              </div>

              <div className="topic-card topic-prod">
                <div className="topic-head">
                  <div className="topic-icon">⏱️</div>
                  <h3 className="topic-title">Verimlilik</h3>
                </div>
                <p className="topic-desc">
                  Zaman yönetimi, odaklanma ve kişisel sistemler kurma üzerine sade yöntemler
                  ve kontrol listeleri.
                </p>
                <Link className="topic-link" to="/blog?category=Verimlilik">
                  Verimlilik yazıları →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEREDEN BAŞLAMALIYIM */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Nereden başlamalıyım?</h2>
              <p className="section-sub">2 hızlı rota: “Kalite tarafı” veya “Kariyer + verimlilik”.</p>
            </div>

            <div className="start-grid">
              <div className="start-card">
                <div className="start-badge">Kaliteye sıfırdan başla</div>
                <h3 className="start-title">Kalite & sahalar rehberim</h3>
                <p className="p" style={{ margin: "0 0 10px", fontSize: 14 }}>
                  Kalibrasyon, tedarikçi değerlendirme, DÖF ve 8D gibi temel dokümanları sahada
                  nasıl kullanacağını adım adım anlatan başlangıç seti.
                </p>

                <ul className="start-list">
                  <li>Hangi form ne zaman kullanılır?</li>
                  <li>İndirilebilir şablonlarla pratik ilerleme</li>
                  <li>LinkedIn paylaşımına uygun kısa özetler</li>
                </ul>

                <div className="start-actions">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => nav("/blog?category=Kalite")}
                  >
                    Kalite rehberine git →
                  </button>
                  <Link className="topic-link" to="/kaynaklar">
                    İlk şablonları indir →
                  </Link>
                </div>
              </div>

              <div className="start-card">
                <div className="start-badge">Kariyer + verimlilik</div>
                <h3 className="start-title">Mühendisler için kariyer pusulası</h3>
                <p className="p" style={{ margin: "0 0 10px", fontSize: 14 }}>
                  CV’den LinkedIn’e, mülakattan odak sistemlerine kadar “daha kontrollü bir kariyer”
                  kurmanı sağlayacak içerikler.
                </p>

                <ul className="start-list">
                  <li>CV & LinkedIn kontrol listeleri</li>
                  <li>STAR tekniği ve örnek cevaplar</li>
                  <li>Yapay zekâyla hızlandırılmış iş akışları</li>
                </ul>

                <div className="start-actions">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => nav("/blog?category=Kariyer")}
                  >
                    Kariyer yazılarına git →
                  </button>
                  <Link className="topic-link" to="/blog?category=Verimlilik">
                    Verimlilik ipuçlarına git →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ÖNE ÇIKAN REHBER */}
        {featured && (
          <section className="section">
            <div className="container">
              <div className="section-head">
                <h2 className="section-title">Öne çıkan rehber</h2>
                <Link to="/kaynaklar" className="topic-link">
                  Ücretsiz şablonlar →
                </Link>
              </div>

              <div className="featured">
                <div className="featured-grid">
                  <div>
                    <div className="featured-label">ÖNE ÇIKAN REHBER</div>
                    <h3 style={{ fontFamily: "Poppins,system-ui", margin: "0 0 8px", fontSize: 20 }}>
                      {featured.title}
                    </h3>
                    <p className="p" style={{ margin: "0 0 12px", fontSize: 14 }}>
                      {featured.excerpt}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                      {(featured.tags || []).slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 11,
                            padding: "4px 10px",
                            borderRadius: 999,
                            border: "1px solid #e5e7eb",
                            background: "#f9fafb",
                            color: "#475569",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => nav(`/blog/${featured.slug}`)}
                      >
                        Rehberi oku →
                      </button>
                      <Link className="topic-link" to="/kaynaklar">
                        İlgili şablonları gör →
                      </Link>
                    </div>
                  </div>

                  <div className="featured-side">
                    <div className="featured-side-title">Bu rehberden ne kazanacaksın?</div>
                    <ul className="p" style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "#475569" }}>
                      <li>Adım adım uygulanabilir bir araç örneği</li>
                      <li>Gerçek üretim ortamına yakın senaryolar</li>
                      <li>İndirilebilir şablonla pratik kullanım</li>
                    </ul>
                    <div style={{ marginTop: 10, fontSize: 12, color: "#64748b" }}>
                      ✦ Mantık: “Önce prensip, hemen ardından uygulama”.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SON YAZILAR */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Son yazılar</h2>
              <Link to="/blog" className="topic-link">
                Tüm yazıları gör →
              </Link>
            </div>

            <div className="grid-articles">
              {latest.length === 0 ? (
                <>
                  <div className="card">Yükleniyor…</div>
                  <div className="card">Yükleniyor…</div>
                  <div className="card">Yükleniyor…</div>
                </>
              ) : (
                latest.map((item) => {
                  const hasCover = Boolean(item.cover);
                  return (
                    <article
                      key={item.slug}
                      className="card"
                      style={{
                        position: "relative",
                        padding: 0,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                      onClick={() => nav(`/blog/${item.slug}`)}
                    >
                      {hasCover ? (
                        <div style={{ width: "100%", height: 150, overflow: "hidden" }}>
                          <img
                            src={item.cover}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="post-cover-placeholder">
                          <span>Kapak görseli yakında</span>
                        </div>
                      )}

                      <div style={{ padding: 12, display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                          {item.date && new Date(item.date).toLocaleDateString("tr-TR")}
                        </div>

                        <h3
                          style={{
                            margin: "0 0 6px",
                            fontFamily: "Poppins,system-ui",
                            fontSize: 17,
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </h3>

                        <p className="p" style={{ margin: "0 0 10px", fontSize: 14 }}>
                          {item.excerpt}
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                          {(item.tags || []).slice(0, 2).map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: 11,
                                padding: "3px 8px",
                                borderRadius: 999,
                                border: "1px solid #e5e7eb",
                                background: "#f9fafb",
                                color: "#4b5563",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div style={{ marginTop: "auto" }}>
                          <Link
                            className="topic-link"
                            to={`/blog/${item.slug}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Devamını oku →
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Yeni yazılardan haberdar ol</h2>
              <p className="section-sub">
                Kalite yönetimi, kariyer ve verimlilik üzerine yeni içerikler mailine gelsin.
              </p>
            </div>

            {/* ORTALAMA WRAPPER */}
            <div className="newsletter-center">
              <div className="card newsletter-card" style={{ margin: 0 }}>
                <div style={{ marginTop: 8 }}>
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
