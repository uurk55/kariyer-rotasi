// src/pages/Blog.jsx
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";

const CATEGORIES = [
  { key: "all", label: "Tümü", icon: "🧭" },
  { key: "Kalite", label: "Kalite", icon: "📊" },
  { key: "Kariyer", label: "Kariyer", icon: "🎯" },
  { key: "Yapay Zekâ", label: "Yapay Zekâ", icon: "🤖" },
  { key: "Verimlilik", label: "Verimlilik", icon: "⏱️" },
];

function normalizeTR(s = "") {
  return s
    .toLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ş", "s")
    .replaceAll("Ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("Ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("Ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("Ö", "o")
    .replaceAll("ç", "c")
    .replaceAll("Ç", "c");
}

export default function Blog() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();

  const [allPosts, setAllPosts] = React.useState([]);
  const [featured, setFeatured] = React.useState(null);

  const [q, setQ] = React.useState(params.get("q") || "");
  const [category, setCategory] = React.useState(params.get("category") || "all");
  const [sort, setSort] = React.useState(params.get("sort") || "new"); // new | old

  const [visible, setVisible] = React.useState(9);

  React.useEffect(() => {
    fetch("/blog/index.json")
      .then((r) => r.json())
      .then((list) => {
        const sorted = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
        const f =
          sorted.find((p) => p.featured) ||
          sorted.find((p) => (p.tags || []).includes("Öne Çıkan")) ||
          null;

        setFeatured(f);
        setAllPosts(sorted);
      })
      .catch(() => {
        setAllPosts([]);
        setFeatured(null);
      });
  }, []);

  // URL sync
  React.useEffect(() => {
    const next = new URLSearchParams(params);

    if (q) next.set("q", q);
    else next.delete("q");

    if (category && category !== "all") next.set("category", category);
    else next.delete("category");

    if (sort && sort !== "new") next.set("sort", sort);
    else next.delete("sort");

    setParams(next, { replace: true });
    setVisible(9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, category, sort]);

  const filtered = React.useMemo(() => {
    let items = [...allPosts];

    // category (index.json’da category alanı yoksa tags içinden yakala)
    if (category && category !== "all") {
      items = items.filter((p) => {
        const tags = (p.tags || []).map(String);
        return (
          p.category === category ||
          tags.includes(category) ||
          tags.some((t) => normalizeTR(t) === normalizeTR(category))
        );
      });
    }

    // search
    const qq = normalizeTR(q.trim());
    if (qq) {
      items = items.filter((p) => {
        const hay = normalizeTR(
          [
            p.title || "",
            p.excerpt || "",
            (p.tags || []).join(" "),
            p.category || "",
          ].join(" ")
        );
        return hay.includes(qq);
      });
    }

    // sort
    items.sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return sort === "old" ? da - db : db - da;
    });

    return items;
  }, [allPosts, q, category, sort]);

  const visiblePosts = filtered.slice(0, visible);
  const remaining = Math.max(0, filtered.length - visible);

  const showFeatured =
    featured &&
    (category === "all" ||
      featured.category === category ||
      (featured.tags || []).includes(category)) &&
    (!q ||
      normalizeTR(
        `${featured.title || ""} ${featured.excerpt || ""} ${(featured.tags || []).join(" ")}`
      ).includes(normalizeTR(q)));

  return (
    <>
      <Seo
        title="Blog – Kariyer Rotası"
        description="Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik üzerine sade, uygulanabilir rehberler."
        type="website"
      />

      <div className="blog-wrap">
        {/* HERO + Kontroller */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-inner">
              <div>
                <h1 className="blog-title">Blog</h1>
                <p className="blog-subtitle">
                  Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik üzerine
                  “al ve uygula” rehberleri. Aradığını hızlıca bul.
                </p>

                <div className="chips" style={{ marginTop: 12 }}>
                  {CATEGORIES.map((c) => (
                    <div
                      key={c.key}
                      className={`chip ${category === c.key ? "active" : ""}`}
                      onClick={() => setCategory(c.key)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setCategory(c.key)}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="blog-panel">
                <div className="blog-controls">
                  <div className="blog-search" title="Ara">
                    <span style={{ opacity: 0.7 }}>🔎</span>
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Blogda ara… (örn: 8D, FMEA, ISO, CV, STAR)"
                    />
                  </div>

                  <select
                    className="blog-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    title="Sırala"
                  >
                    <option value="new">En yeni</option>
                    <option value="old">En eski</option>
                  </select>
                </div>

                <div style={{ marginTop: 10, fontSize: 13, color: "#64748b" }}>
                  Toplam <b>{filtered.length}</b> yazı bulundu.
                  {(category !== "all" || q) && (
                    <button
                      className="btn"
                      style={{ padding: "6px 10px", fontSize: 13, marginLeft: 8 }}
                      type="button"
                      onClick={() => {
                        setQ("");
                        setCategory("all");
                        setSort("new");
                      }}
                    >
                      Filtreleri temizle
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Featured */}
            {showFeatured && (
              <div style={{ marginTop: 16 }}>
                <div className="blog-featured">
                  <div className="blog-featured-top">
                    <div className="blog-featured-badge">ÖNE ÇIKAN</div>
                    <Link
                      to={`/blog/${featured.slug}`}
                      style={{
                        fontSize: 13,
                        color: "#2563eb",
                        textDecoration: "none",
                      }}
                    >
                      Oku →
                    </Link>
                  </div>

                  <div
                    className="blog-featured-grid"
                    style={{
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          margin: "0 0 6px",
                          fontFamily: "Poppins,system-ui",
                          fontSize: 18,
                        }}
                      >
                        {featured.title}
                      </h2>
                      <p className="p" style={{ margin: 0, fontSize: 14 }}>
                        {featured.excerpt}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                        {(featured.tags || []).slice(0, 4).map((t) => (
                          <span key={t} className="blog-tag">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => nav(`/blog/${featured.slug}`)}
                        >
                          Rehberi oku →
                        </button>
                        <button className="btn" type="button" onClick={() => nav("/kaynaklar")}>
                          İlgili şablonlara git →
                        </button>
                      </div>
                    </div>

                    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e8edf5" }}>
                      {featured.cover ? (
                        <img
                          src={featured.cover}
                          alt={featured.title}
                          style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <div className="blog-cover-placeholder" style={{ height: 170 }}>
                          Kapak yakında
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* GRID */}
        <section className="section">
          <div className="container">
            <div className="blog-grid-head">
              <div className="blog-count">
                {q || category !== "all" ? (
                  <>
                    Filtrelenmiş sonuçlar: <b>{filtered.length}</b>
                  </>
                ) : (
                  <>Tüm yazılar</>
                )}
              </div>

              <Link to="/kaynaklar" style={{ fontSize: 13, textDecoration: "none", color: "#2563eb" }}>
                Ücretsiz şablonlar →
              </Link>
            </div>

            {visiblePosts.length === 0 ? (
              <div className="card" style={{ padding: 18 }}>
                Hiç sonuç bulunamadı. (Aramayı kısalt veya filtreleri temizle)
              </div>
            ) : (
              <div className="blog-grid">
                {visiblePosts.map((item) => {
                  const hasCover = Boolean(item.cover);

                  return (
                    <article
                      key={item.slug}
                      className="blog-card"
                      onClick={() => nav(`/blog/${item.slug}`)}
                    >
                      {hasCover ? (
                        <div className="blog-cover">
                          <img src={item.cover} alt={item.title} />
                        </div>
                      ) : (
                        <div className="blog-cover-placeholder">Kapak yakında</div>
                      )}

                      <div className="blog-body">
                        <div className="blog-date">
                          {item.date && new Date(item.date).toLocaleDateString("tr-TR")}
                        </div>

                        <h3 className="blog-title">{item.title}</h3>

                        <p className="blog-excerpt">{item.excerpt}</p>

                        <div className="blog-tags">
                          {(item.tags || []).slice(0, 3).map((t) => (
                            <span key={t} className="blog-tag">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="blog-action">
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
                })}
              </div>
            )}

            {/* Load more */}
            {remaining > 0 && (
              <div className="blog-loadmore">
                <button className="btn btn-primary" type="button" onClick={() => setVisible((v) => v + 9)}>
                  Daha fazla yükle ({remaining})
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
