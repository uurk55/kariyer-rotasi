// src/pages/Post.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Seo from "../components/Seo";
import NewsletterForm from "../components/NewsletterForm";

export default function Post() {
  const { slug } = useParams();
  const [meta, setMeta] = React.useState({ title: "", date: "" });
  const [md, setMd] = React.useState("# Yükleniyor...");
  const [toc, setToc] = React.useState([]);        // İçindekiler
  const [readMin, setReadMin] = React.useState(0); // Okuma süresi (dk)
  const [related, setRelated] = React.useState([]); // İlgili yazılar

  // basit slugify; aynı başlık tekrarında -2, -3 ekle
  function slugify(s) {
    return s
      .toLowerCase()
      .replace(/[^\w\- ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/\-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  React.useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/blog/${slug}.md`);
        if (!res.ok) {
          setMd("# Yazı bulunamadı");
          setMeta({ title: slug, date: "" });
          setToc([]);
          setReadMin(0);
          setRelated([]);
          return;
        }

        const text = await res.text();

        // --- frontmatter ---
        let title = slug,
          date = "";
        const fm = text.match(/^---\s*([\s\S]*?)\s*---\s*/);
        let body = text;
        if (fm) {
          body = text.slice(fm[0].length);
          const lines = fm[1].split(/\r?\n/);
          for (const line of lines) {
            const mTitle = line.match(/^title:\s*(.*)$/i);
            const mDate = line.match(/^date:\s*(.*)$/i);
            if (mTitle) title = mTitle[1].trim();
            if (mDate) date = mDate[1].trim();
          }
        }

        // --- TOC çıkar (## ve ###) ---
        const headings = [];
        const usedIds = new Map();
        body.split(/\r?\n/).forEach((line) => {
          const m = line.match(/^(#{2,3})\s+(.+?)\s*$/); // ## veya ###
          if (m) {
            const level = m[1].length; // 2 veya 3
            const text = m[2].trim().replace(/\s+#$/, "");
            let id = slugify(text);
            const n = (usedIds.get(id) || 0) + 1;
            usedIds.set(id, n);
            if (n > 1) id = `${id}-${n}`;
            headings.push({ level, text, id });
          }
        });

        // --- okuma süresi (yaklaşık 200 wpm) ---
        const words = body
          .replace(/```[\s\S]*?```/g, "")
          .split(/\s+/)
          .filter(Boolean).length;
        const mins = Math.max(1, Math.ceil(words / 200));

        setMeta({ title, date });
        setMd(body);
        setToc(headings);
        setReadMin(mins);

        // --- İlgili yazılar (index.json üzerinden) ---
        try {
          const idxRes = await fetch("/blog/index.json");
          if (idxRes.ok) {
            const list = await idxRes.json();
            const current = list.find((p) => p.slug === slug);
            let candidates = [];

            if (current && current.tags && current.tags.length > 0) {
              const tags = current.tags;
              candidates = list.filter(
                (p) =>
                  p.slug !== slug &&
                  (p.tags || []).some((t) => tags.includes(t))
              );
            }

            // Eğer ortak tag'li yazı yoksa: son yazılardan 3 tane, kendisi hariç
            if (!candidates || candidates.length === 0) {
              candidates = [...list]
                .filter((p) => p.slug !== slug)
                .sort(
                  (a, b) => new Date(b.date) - new Date(a.date)
                );
            }

            setRelated(candidates.slice(0, 3));
          } else {
            setRelated([]);
          }
        } catch {
          setRelated([]);
        }
      } catch {
        setMd("# Yüklenemedi");
        setMeta({ title: slug, date: "" });
        setToc([]);
        setReadMin(0);
        setRelated([]);
      }
    }
    load();
  }, [slug]);

  // ReactMarkdown heading bileşenleri: id verelim ki TOC linkleri çalışsın
  const usedOnce = new Map();
  const components = {
    h1({ node, ...props }) {
      const txt = String(props.children?.[0] ?? "");
      let id = slugify(txt);
      const n = (usedOnce.get(id) || 0) + 1;
      usedOnce.set(id, n);
      if (n > 1) id = `${id}-${n}`;
      return <h1 id={id} {...props} />;
    },
    h2({ node, ...props }) {
      const txt = String(props.children?.[0] ?? "");
      let id = slugify(txt);
      const n = (usedOnce.get(id) || 0) + 1;
      usedOnce.set(id, n);
      if (n > 1) id = `${id}-${n}`;
      return <h2 id={id} {...props} />;
    },
    h3({ node, ...props }) {
      const txt = String(props.children?.[0] ?? "");
      let id = slugify(txt);
      const n = (usedOnce.get(id) || 0) + 1;
      usedOnce.set(id, n);
      if (n > 1) id = `${id}-${n}`;
      return <h3 id={id} {...props} />;
    },
  };

  const seoDescription =
    meta.title && !md.startsWith("# Yüklen")
      ? `${meta.title} – Kariyer Rotası blog yazısı.`
      : "Kariyer Rotası blog yazısı.";

  return (
    <>
      <Seo
        title={`${meta.title || "Blog Yazısı"} – Kariyer Rotası`}
        description={seoDescription}
        type="article"
      />

      <div className="container" style={{ padding: "24px 0" }}>
        {/* Başlık + meta satırı */}
        <header style={{ marginBottom: 16 }}>
          <h1 className="h1" style={{ fontSize: 28, marginBottom: 8 }}>
            {meta.title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 4,
              color: "#6b7280",
              fontSize: 13,
              flexWrap: "wrap",
            }}
          >
            {meta.date && (
              <span>{new Date(meta.date).toLocaleDateString("tr-TR")}</span>
            )}
            {readMin > 0 && <span>• ~{readMin} dk okuma</span>}
          </div>
        </header>

        {/* İki sütunlu layout: içerik + TOC */}
        <div className="post-layout">
          {/* İçerik + CTA + İlgili yazılar */}
          <div>
            {/* Ana içerik */}
            <article className="card">
              <div className="markdown">
                <ReactMarkdown components={components}>{md}</ReactMarkdown>
              </div>
            </article>

            {/* Bülten CTA */}
            <div style={{ marginTop: 24 }}>
              <div
                className="card"
                style={{
                  maxWidth: 520,
                  margin: "0 auto",
                  textAlign: "center",
                  display: "grid",
                  gap: 10,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "Poppins,system-ui",
                    fontSize: 20,
                  }}
                >
                  Yeni yazılardan haberdar ol
                </h3>
                <p className="p" style={{ margin: 0 }}>
                  Bu tarz içerikleri kaçırmamak için bültene katıl.
                </p>
                <NewsletterForm />
              </div>
            </div>

            {/* İlgili yazılar */}
            {related && related.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <h3
                  style={{
                    fontFamily: "Poppins,system-ui",
                    fontSize: 18,
                    margin: "0 0 10px",
                  }}
                >
                  İlgini çekebilecek diğer yazılar
                </h3>
                <div className="grid-articles" style={{ marginTop: 4 }}>
                  {related.map((post) => (
                    <article
                      key={post.slug}
                      className="card"
                      style={{
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginBottom: 4,
                        }}
                      >
                        {post.date &&
                          new Date(post.date).toLocaleDateString("tr-TR")}
                      </div>
                      <h4
                        style={{
                          margin: "0 0 6px",
                          fontFamily: "Poppins,system-ui",
                          fontSize: 16,
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </h4>
                      <p
                        className="p"
                        style={{
                          margin: "0 0 8px",
                          fontSize: 14,
                        }}
                      >
                        {post.excerpt}
                      </p>
                      <div style={{ marginTop: "auto" }}>
                        <Link
                          className="btn"
                          to={`/blog/${post.slug}`}
                          style={{ fontSize: 13 }}
                        >
                          Yazıyı aç →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* İçindekiler */}
          <aside className="toc">
            <div className="card" style={{ padding: 16 }}>
              <div className="toc-title">İçindekiler</div>
              {toc.length === 0 ? (
                <div className="p" style={{ margin: 0 }}>
                  Başlık bulunamadı.
                </div>
              ) : (
                <ul>
                  {toc.map((h, i) => (
                    <li key={i} data-level={h.level}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
