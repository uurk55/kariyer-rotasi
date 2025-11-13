// src/pages/Blog.jsx
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";

export default function Blog() {
  const [items, setItems] = React.useState([]);
  const [activeTag, setActiveTag] = React.useState("Tümü");
  const [tags, setTags] = React.useState(["Tümü"]);

  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [q, setQ] = React.useState(initialQ);

  const nav = useNavigate();

  React.useEffect(() => {
    fetch("/blog/index.json")
      .then((r) => r.json())
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(data);

        const all = new Set(["Tümü"]);
        data.forEach((p) => (p.tags || []).forEach((t) => all.add(t)));
        setTags(Array.from(all));
      })
      .catch(() => {
        setItems([]);
        setTags(["Tümü"]);
      });
  }, []);

  // URL değişirse arama inputunu güncelle
  React.useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  const byTag =
    activeTag === "Tümü"
      ? items
      : items.filter((p) => (p.tags || []).includes(activeTag));

  const qNorm = q.trim().toLowerCase();
  const filtered = !qNorm
    ? byTag
    : byTag.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(qNorm) ||
          (p.excerpt || "").toLowerCase().includes(qNorm)
      );

  return (
    <>
      <Seo
        title="Blog – Kariyer Rotası"
        description="Kalite yönetimi, kariyer gelişimi, yapay zekâ ve verimlilik üzerine tüm blog yazılarını burada bulabilirsiniz."
        type="article"
      />

      <div className="container" style={{ padding: "24px 0" }}>
        <h2
          style={{
            fontFamily: "Poppins,system-ui",
            margin: "0 0 6px",
            fontSize: 24,
          }}
        >
          Blog
        </h2>
        <p className="p" style={{ marginTop: 0 }}>
          Mühendisler ve kalite profesyonelleri için kalite, kariyer, yapay zekâ ve
          verimlilik üzerine yazılar.
        </p>

        {/* Arama + filtre kartı */}
        <div
          className="card"
          style={{
            display: "grid",
            gap: 10,
            margin: "16px 0 18px",
          }}
        >
          <input
            className="btn"
            style={{ textAlign: "left" }}
            placeholder="Yazılarda ara (örn: 8D, FMEA, STAR, ChatGPT...)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 4,
            }}
          >
            {tags.map((tag) => (
              <button
                key={tag}
                className="btn"
                type="button"
                onClick={() => setActiveTag(tag)}
                style={{
                  borderColor:
                    activeTag === tag ? "#2563eb" : "var(--border)",
                  background: activeTag === tag ? "#dbeafe" : "#ffffff",
                  color: activeTag === tag ? "#1d4ed8" : "#374151",
                  fontSize: 13,
                  paddingInline: 10,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Yazı kartları */}
        <div className="grid-articles" style={{ marginTop: 8 }}>
          {filtered.map((p) => {
            const hasCover = Boolean(p.cover);

            return (
              <article
                key={p.slug}
                className="card"
                style={{
                  position: "relative",
                  padding: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => nav(`/blog/${p.slug}`)}
              >
                {/* Kapak görseli / placeholder */}
                {hasCover ? (
                  <div
                    style={{
                      width: "100%",
                      height: 160,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={p.cover}
                      alt={p.title}
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

                {/* Öne çıkan rozet */}
                {(((p.tags || []).includes("Öne Çıkan")) || p.featured) && (
                  <span
                    className="badge"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                      background: "#ffffff",
                      borderColor: "#e5e7eb",
                      color: "#1d4ed8",
                      fontWeight: 600,
                    }}
                  >
                    ⭐ Öne Çıkan
                  </span>
                )}

                {/* İçerik */}
                <div
                  style={{
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      marginBottom: 6,
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    {p.date && (
                      <span>
                        {new Date(p.date).toLocaleDateString("tr-TR")}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 6px",
                      fontFamily: "Poppins,system-ui",
                      fontSize: 18,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="p"
                    style={{
                      margin: "0 0 10px",
                      fontSize: 14,
                    }}
                  >
                    {p.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 10,
                    }}
                  >
                    {(p.tags || []).map((t) => (
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
                      to={`/blog/${p.slug}`}
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

          {filtered.length === 0 && (
            <div
              className="card"
              style={{ gridColumn: "1 / -1", textAlign: "center" }}
            >
              <p className="p" style={{ margin: 0 }}>
                Aradığınız kriterlere uygun yazı bulunamadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
