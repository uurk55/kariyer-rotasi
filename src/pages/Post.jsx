// src/pages/Post.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Seo from "../components/Seo";
import NewsletterForm from "../components/NewsletterForm";

export default function Post() {
  const { slug } = useParams();
  const nav = useNavigate();

  const [meta, setMeta] = React.useState({
    title: "",
    date: "",
    cover: "",
    tags: [],
    excerpt: "",
  });

  const [md, setMd] = React.useState("# Yükleniyor...");
  const [toc, setToc] = React.useState([]); // İçindekiler
  const [readMin, setReadMin] = React.useState(0);
  const [related, setRelated] = React.useState([]);
  const [activeId, setActiveId] = React.useState("");
  const [showTop, setShowTop] = React.useState(false);

  // basit slugify; aynı başlık tekrarında -2, -3 ekle
  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[^\w\-ğüşöçıİĞÜŞÖÇ ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/\-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function toTR(d) {
    try {
      return new Date(d).toLocaleDateString("tr-TR");
    } catch {
      return d || "";
    }
  }

  const CONTENT_URLS = (slug0) => [
    `/blog/${slug0}.md`,
    `/blog/posts/${slug0}.md`,
    `/posts/${slug0}.md`,
  ];

  async function fetchFirstOkText(urls) {
    for (const url of urls) {
      try {
        const r = await fetch(url, { cache: "force-cache" });
        if (r.ok) return await r.text();
      } catch {}
    }
    return null;
  }

  function parseFrontmatter(text) {
    // --- ... ---
    const fm = text.match(/^---\s*([\s\S]*?)\s*---\s*/);
    if (!fm) return { front: {}, body: text };

    const raw = fm[1];
    const body = text.slice(fm[0].length);

    const front = {};
    raw.split(/\r?\n/).forEach((line) => {
      const l = line.trim();
      if (!l) return;

      const m = l.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
      if (!m) return;

      const key = m[1];
      let val = (m[2] || "").trim();

      // tags: [a, b] veya tags: a,b
      if (key.toLowerCase() === "tags") {
        if (val.startsWith("[") && val.endsWith("]")) {
          val = val.slice(1, -1);
        }
        const arr = val
          .split(",")
          .map((x) => x.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
        front.tags = arr;
        return;
      }

      // string temizliği
      val = val.replace(/^["']|["']$/g, "");
      front[key.toLowerCase()] = val;
    });

    return { front, body };
  }

  function stripMarkdown(md0 = "") {
    return md0
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
      .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
      .replace(/^\s{0,3}#{1,6}\s+/gm, " ")
      .replace(/^\s*[-*+]\s+/gm, " ")
      .replace(/^\s*\d+\.\s+/gm, " ")
      .replace(/[*_~>]/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // --- yükle ---
  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const text = await fetchFirstOkText(CONTENT_URLS(slug));

      if (!text) {
        if (cancelled) return;
        setMd("# Yazı bulunamadı");
        setMeta({ title: slug, date: "", cover: "", tags: [], excerpt: "" });
        setToc([]);
        setReadMin(0);
        setRelated([]);
        return;
      }

      const { front, body } = parseFrontmatter(text);

      const title = front.title || slug;
      const date = front.date || "";
      const cover = front.cover || "";
      const tags = Array.isArray(front.tags) ? front.tags : [];
      const excerpt = front.excerpt || "";

      // --- TOC (## ve ###) ---
      const headings = [];
      const usedIds = new Map();
      body.split(/\r?\n/).forEach((line) => {
        const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
        if (m) {
          const level = m[1].length; // 2 veya 3
          const text0 = m[2].trim().replace(/\s+#$/, "");
          let id = slugify(text0);
          const n = (usedIds.get(id) || 0) + 1;
          usedIds.set(id, n);
          if (n > 1) id = `${id}-${n}`;
          headings.push({ level, text: text0, id });
        }
      });

      // --- okuma süresi ---
      const plain = stripMarkdown(body);
      const words = plain ? plain.split(/\s+/).filter(Boolean).length : 0;
      const mins = Math.max(1, Math.ceil(words / 200));

      if (cancelled) return;

      setMeta({ title, date, cover, tags, excerpt });
      setMd(body);
      setToc(headings);
      setReadMin(mins);
      setActiveId(headings[0]?.id || "");

      // --- ilgili yazılar ---
      try {
        const idxRes = await fetch("/blog/index.json");
        if (idxRes.ok) {
          const list = await idxRes.json();
          const current = list.find((p) => p.slug === slug);
          let candidates = [];

          if (current?.tags?.length) {
            const tgs = current.tags;
            candidates = list.filter(
              (p) => p.slug !== slug && (p.tags || []).some((t) => tgs.includes(t))
            );
          }

          if (!candidates.length) {
            candidates = [...list]
              .filter((p) => p.slug !== slug)
              .sort((a, b) => new Date(b.date) - new Date(a.date));
          }

          setRelated(candidates.slice(0, 3));
        } else {
          setRelated([]);
        }
      } catch {
        setRelated([]);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // --- ReactMarkdown heading id’leri (TOC linkleri çalışsın) ---
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

  // --- Scroll Spy (aktif başlığı bul) + BackToTop görünümü ---
  React.useEffect(() => {
    function onScroll() {
      const y = window.scrollY || 0;
      setShowTop(y > 500);

      if (!toc?.length) return;

      const ids = toc.map((t) => t.id);
      let current = ids[0];

      // üstten 120px pay bırak
      const offset = 120;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
        else break;
      }
      setActiveId(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const seoDescription =
    meta.title && !md.startsWith("# Yüklen")
      ? `${meta.title} – Kariyer Rotası blog yazısı.`
      : "Kariyer Rotası blog yazısı.";

  function handleTocClick(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // URL hash güncelle (jump yapmadan)
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <>
      <Seo
        title={`${meta.title || "Blog Yazısı"} – Kariyer Rotası`}
        description={seoDescription}
        type="article"
      />

      <div className="post-page">
        {/* HERO */}
        <section className="post-hero">
          <div className="container post-hero-inner">
            <div className="post-hero-card">
              <div className="post-hero-top">
                <div className="post-hero-kicker">KARİYER ROTASI BLOG</div>
                <div className="post-hero-actions">
                  <button className="btn btn-ghost" type="button" onClick={() => nav("/blog")}>
                    ← Blog’a dön
                  </button>
                  <Link className="btn btn-primary" to="/kaynaklar">
                    Ücretsiz şablonlar →
                  </Link>
                </div>
              </div>

              <h1 className="post-hero-title">{meta.title}</h1>

              <div className="post-hero-meta">
                {meta.date ? <span>{toTR(meta.date)}</span> : null}
                {readMin > 0 ? <span>• ~{readMin} dk okuma</span> : null}
              </div>

              {!!meta.tags?.length && (
                <div className="post-hero-tags">
                  {meta.tags.slice(0, 6).map((t) => (
                    <span key={t} className="post-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Cover (varsa) */}
              <div className="post-hero-cover">
                {meta.cover ? (
                  <img src={meta.cover} alt={meta.title} />
                ) : (
                  <div className="post-hero-cover-placeholder">
                    <div className="phcp-title">Kariyer Rotası</div>
                    <div className="phcp-sub">Uygulanabilir rehberler • Kısa & net</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BODY */}
        <div className="container" style={{ padding: "18px 0 28px" }}>
          <div className="post-layout-grid">
            {/* TOC SOLDa */}
            <aside className="toc-left">
              <div className="toc-card">
                <div className="toc-title">İçindekiler</div>

                {toc.length === 0 ? (
                  <div className="p" style={{ margin: 0 }}>
                    Başlık bulunamadı.
                  </div>
                ) : (
                  <ul className="toc-list">
                    {toc.map((h, i) => (
                      <li key={i} className={`toc-li level-${h.level}`}>
                        <a
                          href={`#${h.id}`}
                          className={`toc-link ${activeId === h.id ? "is-active" : ""}`}
                          onClick={(e) => handleTocClick(e, h.id)}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>

            {/* CONTENT */}
            <main className="post-main">
              <article className="card post-content-card">
                <div className="markdown">
                  <ReactMarkdown components={components}>{md}</ReactMarkdown>
                </div>
              </article>

              {/* Newsletter CTA */}
              <div className="post-newsletter">
                <div className="card post-newsletter-card">
                  <div className="post-newsletter-head">
                    <h3>Yeni yazılardan haberdar ol</h3>
                    <p className="p" style={{ margin: 0 }}>
                      Aylık özet + yeni şablonlar e-postana gelsin.
                    </p>
                  </div>
                  <NewsletterForm />
                  <div className="post-newsletter-note">Gizlilik: E-postanı üçüncü taraflarla paylaşmayız.</div>
                </div>
              </div>

              {/* Related */}
              {related?.length > 0 && (
                <div className="post-related">
                  <div className="post-related-head">
                    <h3>İlgini çekebilecek diğer yazılar</h3>
                    <Link to="/blog" className="post-related-all">
                      Tüm yazılar →
                    </Link>
                  </div>

                  <div className="post-related-grid">
                    {related.map((p) => (
                      <article key={p.slug} className="post-related-card">
                        <div className="post-related-meta">{p.date ? toTR(p.date) : ""}</div>
                        <div className="post-related-title">{p.title}</div>
                        <div className="post-related-excerpt">{p.excerpt}</div>
                        <div className="post-related-actions">
                          <Link className="post-related-link" to={`/blog/${p.slug}`}>
                            Yazıyı aç →
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Back to top */}
        {showTop && (
          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Yukarı çık"
            title="Yukarı çık"
          >
            ↑
          </button>
        )}
      </div>
    </>
  );
}
