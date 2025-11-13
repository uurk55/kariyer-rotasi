// src/pages/Home.jsx 
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Seo from "../components/Seo";
import NewsletterForm from "../components/NewsletterForm";

export default function Home() {
  const nav = useNavigate();
  const [latest, setLatest] = React.useState([]);

  React.useEffect(() => {
    fetch("/blog/index.json")
      .then((r) => r.json())
      .then((list) => {
        const sorted = [...list].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLatest(sorted.slice(0, 3));
      })
      .catch(() => setLatest([]));
  }, []);

  return (
    <>
      <Seo
        title="Kariyer Rotası – Mühendisler ve kalite profesyonelleri için kariyer & kalite rehberleri"
        description="Elektrik–Elektronik mühendisliği ve kalite yönetimi deneyimini; yapay zekâ ve verimlilikle birleştirerek mühendisler ve kalite profesyonellerine uygulanabilir rehberler sunan platform."
        type="website"
      />

      <section className="hero">
        <div className="container">
          {/* HERO GRID */}
          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "minmax(0,2fr) minmax(0,1.3fr)",
              alignItems: "flex-start",
            }}
          >
            {/* SOL BLOK – ANA MESAJ */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "#2563eb",
                  marginBottom: 6,
                }}
              >
                Mühendisler ve kalite profesyonelleri için
              </div>

              <h1 className="h1">Kariyer yolculuğuna hazır mısın?</h1>
              <p className="p" style={{ marginTop: 8 }}>
                Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik
                konularında; teoride kaybolmadan, sahada uygulanabilir rehberler
                ve şablonlar paylaşan bir platform.
              </p>

              <div className="actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => nav("/blog")}
                >
                  Yazıları keşfet →
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => nav("/kaynaklar")}
                >
                  Ücretsiz şablonlara göz at
                </button>
              </div>

              <ul
                className="p"
                style={{
                  marginTop: 8,
                  paddingLeft: 18,
                  fontSize: 14,
                }}
              >
                <li>8D, FMEA, SPC gibi kalite araçları için pratik rehberler</li>
                <li>Mühendisler için CV, mülakat ve LinkedIn ipuçları</li>
                <li>ChatGPT ile işi hızlandırma ve verimlilik artırma yolları</li>
              </ul>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: "#6b7280",
                }}
              >
                ✦ İçerikler: gerçek üretim ortamı deneyimi + sade anlatım.
              </div>
            </div>

            {/* SAĞ BLOK – KÜÇÜK BİLGİ KARTI */}
            <aside>
              <div className="card">
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1d4ed8",
                    marginBottom: 6,
                  }}
                >
                  Kariyer Rotası’nda neler bulacaksın?
                </div>
                <p className="p" style={{ fontSize: 14, marginTop: 0 }}>
                  Bu platform, özellikle kariyerinin ilk yıllarındaki mühendis ve
                  kalite profesyonelleri için tasarlandı.
                </p>
                <ul
                  className="p"
                  style={{
                    paddingLeft: 18,
                    marginTop: 4,
                    fontSize: 14,
                  }}
                >
                  <li>Kalite yönetimi için örnekli anlatımlar</li>
                  <li>İndirilebilir şablonlar ve dokümanlar</li>
                  <li>Yapay zekâyı işine entegre etme fikirleri</li>
                </ul>
                <p
                  className="p"
                  style={{
                    fontSize: 13,
                    marginTop: 8,
                  }}
                >
                  Hedef: Teoride boğmadan, doğrudan sahada kullanabileceğin bilgi
                  vermek.
                </p>
              </div>
            </aside>
          </div>

          {/* SON YAZILAR */}
          <div style={{ marginTop: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <h3
                style={{
                  fontFamily: "Poppins,system-ui",
                  margin: 0,
                  fontSize: 20,
                }}
              >
                Son Yazılar
              </h3>
              <Link
                to="/blog"
                style={{
                  fontSize: 13,
                  textDecoration: "none",
                  color: "#2563eb",
                }}
              >
                Tüm yazıları gör →
              </Link>
            </div>

            <div className="grid-articles" style={{ marginTop: 10 }}>
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
                      {/* Kapak (varsa) / placeholder */}
                      {hasCover ? (
                        <div
                          style={{
                            width: "100%",
                            height: 150,
                            overflow: "hidden",
                          }}
                        >
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
                          <span>Blog yazısı kapağı</span>
                        </div>
                      )}

                      <div
                        style={{
                          padding: 12,
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            color: "#6b7280",
                            marginBottom: 4,
                          }}
                        >
                          {item.date &&
                            new Date(item.date).toLocaleDateString("tr-TR")}
                        </div>

                        <h4
                          style={{
                            margin: "0 0 6px",
                            fontFamily: "Poppins,system-ui",
                            fontSize: 17,
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </h4>

                        <p
                          className="p"
                          style={{
                            margin: "0 0 8px",
                            fontSize: 14,
                          }}
                        >
                          {item.excerpt}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            marginBottom: 8,
                          }}
                        >
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
                            className="btn"
                            to={`/blog/${item.slug}`}
                            style={{ fontSize: 14 }}
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

            {/* BÜLTEN ABONELİK KARTI – YAZILARIN ALTINDA */}
            <div style={{ marginTop: 40 }}>
              <div
                className="card"
                style={{
                  padding: 32,
                  display: "grid",
                  gap: 12,
                  maxWidth: 720,
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "Poppins,system-ui",
                    fontSize: 22,
                  }}
                >
                  Yeni yazılardan haberdar ol
                </h3>

                <p className="p" style={{ margin: 0 }}>
                  Kalite yönetimi, kariyer ve verimlilik üzerine yeni içerikler
                  mailine gelsin.
                </p>

                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
