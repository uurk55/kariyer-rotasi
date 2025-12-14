
// src/pages/Home.jsx (içinde sadece ilgili kısmı değiştir)
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
        const sorted = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
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

      {/* HEADER ALTI – REKLAM ALANI (Landing boşluğu arttırıldı) */}
      <div className="top-ad-slot">
        {/* Buraya reklam / banner gelecek */}
      </div>

      <div className="home-wrap">
        {/* HERO */}
<section className="hero hero-landing">
  <div className="hero-bg" aria-hidden="true" />

  <div className="container">
    <div className="hero-inner">

      {/* SOL – ŞEFFAF CAM KUTU */}
      <div className="hero-left hero-glass" style={{ minWidth: 0 }}>
        <div className="hero-kicker">
          🚀 MÜHENDİSLER VE KALİTE PROFESYONELLERİ İÇİN
        </div>

        <h1 className="hero-title">
          Kariyer yolculuğuna hazır mısın?
        </h1>

        <p className="hero-desc">
          Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik konularında;
          teoride kaybolmadan, sahada uygulanabilir rehberler ve şablonlar.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => nav("/blog")}>
            Yazıları keşfet →
          </button>
          <button className="btn btn-secondary" onClick={() => nav("/kaynaklar")}>
            Ücretsiz şablonlara göz at →
          </button>
        </div>

        <ul className="hero-bullets">
          <li>🧩 8D, DÖF, FMEA, SPC pratik rehberleri</li>
          <li>💼 CV, mülakat & LinkedIn kariyer içerikleri</li>
          <li>🤖 ChatGPT ile hızlandırılmış iş akışları</li>
        </ul>
      </div>

      {/* SAĞ – BİLGİ KUTUSU (DEĞİŞMEDİ) */}
      <aside className="hero-note hero-note-landing" style={{ minWidth: 0 }}>
        <div className="hero-note-badge">KISA ÖZET</div>
        <h3>Kariyer Rotası’nda neler bulacaksın?</h3>

        <ul className="hero-note-list">
          <li>✅ Örnekli anlatımlar & kontrol listeleri</li>
          <li>📎 İndirilebilir şablonlar</li>
          <li>📊 ISO maddelerini sahaya indiren yorumlar</li>
          <li>🤖 Yapay zekâ senaryoları</li>
          <li>🧭 LinkedIn’e uygun özet formatlar</li>
        </ul>

        <div className="hero-note-footer">
          🎯 Hedef: “Oku → Uygula → İlerlet”
        </div>
      </aside>

    </div>
  </div>
</section>


        {/* KONULARI KEŞFET */}
        <section className="section">
          <div className="container">
            <div className="section-card">
              <div className="section-head">
                <h2 className="section-title">Konuları keşfet</h2>
                <div className="section-hint">Nereden başlayacağını bilmiyorsan, bu dört alana göz at.</div>
              </div>

              <div className="topic-grid">
                <div className="topic-card topic-quality">
                  <div className="topic-head">
                    <div className="topic-icon">📊</div>
                    <h3 className="topic-title">Kalite Yönetimi</h3>
                  </div>
                  <p className="topic-desc">
                    8D, DÖF, FMEA, SPC gibi araçlar ve ISO 9001/14001/45001/50001 üzerine sahadan örnekli rehberler.
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
                    CV, mülakat, LinkedIn ve maaş pazarlığı gibi konularda mühendisler için net, uygulanabilir içerikler.
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
                    ChatGPT ve benzeri araçları iş akışına entegre etmek için promptlar, şablonlar ve örnek senaryolar.
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
                    Zaman yönetimi, odaklanma ve kişisel sistemler kurma üzerine sade yöntemler ve kontrol listeleri.
                  </p>
                  <Link className="topic-link" to="/blog?category=Verimlilik">
                    Verimlilik yazıları →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEREDEN BAŞLAMALIYIM */}
        <section className="section">
          <div className="container">
            <div className="section-card">
              <div className="section-head">
                <h2 className="section-title">Nereden başlamalıyım?</h2>
                <div className="section-hint">2 hızlı rota: “Kalite tarafı” veya “Kariyer + verimlilik”.</div>
              </div>

              <div className="start-grid">
                <div className="start-card">
                  <div className="start-badge">Kaliteye sıfırdan başla</div>
                  <h3 className="start-title">Kalite & sahalar rehberim</h3>
                  <p className="p" style={{ margin: "0 0 10px", fontSize: 14 }}>
                    Kalibrasyon, tedarikçi değerlendirme, DÖF ve 8D gibi temel dokümanları sahada nasıl kullanacağını
                    adım adım anlatan başlangıç seti.
                  </p>

                  <ul className="start-list">
                    <li>Hangi form ne zaman kullanılır?</li>
                    <li>İndirilebilir şablonlarla pratik ilerleme</li>
                    <li>LinkedIn paylaşımına uygun kısa özetler</li>
                  </ul>

                  <div className="start-actions">
                    <button className="btn btn-primary" type="button" onClick={() => nav("/blog?category=Kalite")}>
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
                    CV’den LinkedIn’e, mülakattan odak sistemlerine kadar “daha kontrollü bir kariyer” kurmanı sağlayacak
                    içerikler.
                  </p>

                  <ul className="start-list">
                    <li>CV & LinkedIn kontrol listeleri</li>
                    <li>STAR tekniği ve örnek cevaplar</li>
                    <li>Yapay zekâyla hızlandırılmış iş akışları</li>
                  </ul>

                  <div className="start-actions">
                    <button className="btn btn-primary" type="button" onClick={() => nav("/blog?category=Kariyer")}>
                      Kariyer yazılarına git →
                    </button>
                    <Link className="topic-link" to="/blog?category=Verimlilik">
                      Verimlilik ipuçlarına git →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ÖNE ÇIKAN REHBER */}
        {featured && (
          <section className="section">
            <div className="container">
              <div className="section-card">
                <div className="section-head">
                  <h2 className="section-title">Öne çıkan rehber</h2>
                  <Link to="/kaynaklar" className="link-btn">
                    Ücretsiz şablonlar →
                  </Link>
                </div>

                <div className="featured">
                  <div className="featured-grid">
                    <div className="featured-main">
                      <div className="featured-label">ÖNE ÇIKAN REHBER</div>
                      <h3 className="featured-title">{featured.title}</h3>
                      <p className="p" style={{ margin: "0 0 12px", fontSize: 14 }}>
                        {featured.excerpt}
                      </p>

                      <div className="tag-row">
                        {(featured.tags || []).slice(0, 4).map((t) => (
                          <span className="tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="featured-actions">
                        <button className="btn btn-primary" type="button" onClick={() => nav(`/blog/${featured.slug}`)}>
                          Rehberi oku →
                        </button>
                        <Link className="topic-link" to="/kaynaklar">
                          İlgili şablonları gör →
                        </Link>
                      </div>
                    </div>

                    {/* KAPAK GÖRSELİ: varsa göster, yoksa placeholder */}
                    <div className="featured-media">
                      {featured.cover ? (
                        <img className="featured-img" src={featured.cover} alt={featured.title} />
                      ) : (
                        <div className="post-cover-placeholder featured-ph">
                          <span>Kapak görseli yakında</span>
                        </div>
                      )}
                    </div>

                    <div className="featured-side">
                      <div className="featured-side-title">Bu rehberden ne kazanacaksın?</div>
                      <ul className="p" style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
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
            </div>
          </section>
        )}

        {/* SON YAZILAR */}
        <section className="section">
          <div className="container">
            <div className="section-card">
              <div className="section-head">
                <h2 className="section-title">Son yazılar</h2>
                <Link to="/blog" className="link-btn">
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
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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

                          <h3 style={{ margin: "0 0 6px", fontFamily: "Poppins,system-ui", fontSize: 17, lineHeight: 1.3 }}>
                            {item.title}
                          </h3>

                          <p className="p" style={{ margin: "0 0 10px", fontSize: 14 }}>
                            {item.excerpt}
                          </p>

                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                            {(item.tags || []).slice(0, 2).map((t) => (
                              <span className="tag" key={t}>
                                {t}
                              </span>
                            ))}
                          </div>

                          <div style={{ marginTop: "auto" }}>
                            <Link className="topic-link" to={`/blog/${item.slug}`} onClick={(e) => e.stopPropagation()}>
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
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="section">
          <div className="container">
            <div className="section-card">
              <div className="section-head">
                <h2 className="section-title">Yeni yazılardan haberdar ol</h2>
                <div className="section-hint">Kalite yönetimi, kariyer ve verimlilik üzerine yeni içerikler mailine gelsin.</div>
              </div>

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