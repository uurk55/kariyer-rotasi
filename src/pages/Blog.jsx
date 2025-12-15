import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";

const PER_PAGE = 12;

const CATEGORIES = [
  { key: "all", label: "Tümü", icon: "🧭" },
  { key: "Kalite", label: "Kalite", icon: "📊" },
  { key: "Kariyer", label: "Kariyer", icon: "🎯" },
  { key: "Yapay Zekâ", label: "Yapay Zekâ", icon: "🤖" },
  { key: "Verimlilik", label: "Verimlilik", icon: "⏱️" },
];

function toTR(d) {
  try {
    return new Date(d).toLocaleDateString("tr-TR");
  } catch {
    return d || "";
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeRegExp(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightHtml(text = "", query = "") {
  const q = (query || "").trim();
  if (!q) return escapeHtml(text);
  if (q.length < 2) return escapeHtml(text);

  const safeText = escapeHtml(text);
  const re = new RegExp(`(${escapeRegExp(escapeHtml(q))})`, "ig");
  return safeText.replace(re, `<mark class="hl">$1</mark>`);
}

function getPageItems(current, total) {
  const items = [];
  const push = (v) => items.push(v);

  if (total <= 7) {
    for (let i = 1; i <= total; i++) push(i);
    return items;
  }

  push(1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) push("…");
  for (let i = left; i <= right; i++) push(i);
  if (right < total - 1) push("…");
  push(total);

  return items;
}

/* ---------- OKUMA SÜRESİ (OTOMATİK, CACHE’Lİ) ---------- */
const CONTENT_URLS = (slug) => [
  `/blog/${slug}.md`,
  `/blog/posts/${slug}.md`,
  `/posts/${slug}.md`,
];

function stripMarkdown(md = "") {
  return md
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

async function fetchFirstOkText(urls) {
  for (const url of urls) {
    try {
      const r = await fetch(url, { cache: "force-cache" });
      if (r.ok) return await r.text();
    } catch {}
  }
  return null;
}

function minutesFromText(text) {
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export default function Blog() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [sort, setSort] = useState(params.get("sort") || "new"); // new | old | az
  const [page, setPage] = useState(Number(params.get("page") || 1));

  const [rtMap, setRtMap] = useState({});

  // Back to top
  const [showTop, setShowTop] = useState(false);

  // Category scroller
  const catsRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/blog/index.json")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...posts];

    if (category !== "all") {
      list = list.filter((p) => (p.tags || []).includes(category));
    }

    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter((p) => {
        const t = (p.title || "").toLowerCase();
        const e = (p.excerpt || "").toLowerCase();
        const tg = (p.tags || []).join(" ").toLowerCase();
        return t.includes(qq) || e.includes(qq) || tg.includes(qq);
      });
    }

    if (sort === "old") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sort === "az") list.sort((a, b) => (a.title || "").localeCompare(b.title || "", "tr"));
    else list.sort((a, b) => new Date(b.date) - new Date(a.date));

    return list;
  }, [posts, q, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (q.trim()) next.set("q", q.trim());
    if (category !== "all") next.set("category", category);
    if (sort !== "new") next.set("sort", sort);
    if (safePage > 1) next.set("page", String(safePage));
    setParams(next, { replace: true });
  }, [q, category, sort, safePage, setParams]);

  const pageItems = useMemo(() => getPageItems(safePage, totalPages), [safePage, totalPages]);

  // reading time cache
  useEffect(() => {
    const need = visible.filter((p) => p?.slug).filter((p) => rtMap[p.slug] == null);
    if (need.length === 0) return;

    let cancelled = false;

    (async () => {
      const updates = {};
      for (const p of need) {
        if (p.readingTime && Number.isFinite(Number(p.readingTime))) {
          updates[p.slug] = Math.max(1, Math.round(Number(p.readingTime)));
          continue;
        }
        const raw = await fetchFirstOkText(CONTENT_URLS(p.slug));
        if (!raw) continue;
        const plain = stripMarkdown(raw);
        updates[p.slug] = minutesFromText(plain);
      }
      if (!cancelled && Object.keys(updates).length) {
        setRtMap((prev) => ({ ...prev, ...updates }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [visible, rtMap]);

  const getReadingTimeLabel = (p) => {
    const m = rtMap[p.slug];
    if (m != null) return `${m} dk`;

    const base = `${p?.title || ""} ${p?.excerpt || ""}`.trim();
    const wc = base ? base.split(/\s+/).filter(Boolean).length : 0;
    const est = Math.max(2, Math.round(wc / 25));
    return `${est} dk`;
  };

  // ✅ Kart üstündeki “kategori chip” için (Tümü değil, gerçek kategori)
  const getMainCategory = (p) => {
    const tags = p?.tags || [];
    const found = CATEGORIES.find((c) => c.key !== "all" && tags.includes(c.key));
    return found ? found.label : null;
  };

  // ✅ Back to top göster/gizle
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Category scroller: oklar + fade
  const updateCatsArrows = () => {
    const el = catsRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(left > 2);
    setCanRight(left < max - 2);
  };

  useEffect(() => {
    updateCatsArrows();
    const el = catsRef.current;
    if (!el) return;

    const onScroll = () => updateCatsArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateCatsArrows());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollCats = (dir) => {
    const el = catsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <>
      <Seo
        title="Blog | Kariyer Rotası"
        description="Kalite, kariyer, yapay zekâ ve verimlilik üzerine uygulanabilir rehberler."
        type="website"
      />

      <div className="blog-page">
        {/* HERO (sadece tanıtım + buton; arama/sıralama burda kalsın) */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-card">
              <div className="blog-hero-left">
                <div className="blog-kicker">KARİYER ROTASI BLOG</div>
                <h1 className="blog-title">Blog</h1>
                <p className="blog-subtitle">
                  Kalite araçları, kariyer, yapay zekâ ve verimlilik üzerine <b>kısa, net ve “al-uygula”</b>{" "}
                  içerikler. Aradığını hızlıca bul, uygulamaya dök.
                </p>

                <Link className="btn btn-primary" to="/kaynaklar">
                  Ücretsiz şablonlar →
                </Link>
              </div>

              {/* Sağ panel: arama + sıralama (hero içinde kalsın, çirkin durmasın) */}
              <div className="hero-right">
                <div className="hero-panel">
                  <div className="hero-panel-title">
                    <span className="hero-panel-ico">🔎</span>
                    İçerik bul
                  </div>

                  <div className="blog-search hero-search">
                    <span className="blog-search-ico">🔍</span>
                    <input
                      value={q}
                      onChange={(e) => {
                        setQ(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Ara (örn: 8D, FMEA, ISO, STAR...)"
                    />
                  </div>

                  <div className="hero-panel-row">
                    <label className="hero-mini-label">Sıralama</label>
                    <select
                      className="blog-sort hero-sort"
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="new">En yeni</option>
                      <option value="old">En eski</option>
                      <option value="az">A-Z</option>
                    </select>
                  </div>

                  <div className="hero-panel-meta">
                    <span>📌 {loading ? "Yükleniyor…" : `${filtered.length} içerik`}</span>
                    {category !== "all" && (
                      <>
                        <span className="hero-panel-dot">•</span>
                        <span>
                          Seçili: <b>{category}</b>
                        </span>
                      </>
                    )}
                  </div>

                  {(q.trim() || category !== "all" || sort !== "new") && (
                    <button
                      className="hero-panel-clear"
                      type="button"
                      onClick={() => {
                        setQ("");
                        setCategory("all");
                        setSort("new");
                        setPage(1);
                      }}
                    >
                      Filtreleri temizle
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Sticky sadece kategori (arama/filtre yok) + yatay kaydırma */}
        <div className="container">
          <div className="blog-sticky-cats">
            <div className="cats-head">
              <div className="cats-title">
                <span className="cats-ico">🗂️</span> Kategoriler
              </div>
              <div className="cats-selected">
                Seçili: <b>{CATEGORIES.find((c) => c.key === category)?.label || "Tümü"}</b>
              </div>
            </div>

            <div className="cats-scroll-wrap">
              <button
                type="button"
                className={`cats-arrow left ${canLeft ? "is-on" : ""}`}
                onClick={() => scrollCats(-1)}
                aria-label="Sola kaydır"
              >
                ‹
              </button>

              <div className="cats-scroll" ref={catsRef}>
                <div className="blog-chips cats-chips">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      className={`blog-chip ${category === c.key ? "is-active" : ""}`}
                      onClick={() => {
                        setCategory(c.key);
                        setPage(1);
                      }}
                    >
                      <span className="blog-chip-ico">{c.icon}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`cats-arrow right ${canRight ? "is-on" : ""}`}
                onClick={() => scrollCats(1)}
                aria-label="Sağa kaydır"
              >
                ›
              </button>

              {/* fade */}
              <div className={`cats-fade left ${canLeft ? "is-on" : ""}`} />
              <div className={`cats-fade right ${canRight ? "is-on" : ""}`} />
            </div>
          </div>
        </div>

        {/* LIST */}
        <section className="section blog-section">
          <div className="container">
            <div className="section-card">
              <div className="blog-section-head">
                <h2 className="section-title">Yazılar</h2>
              </div>

              <div className="blog-grid">
                {loading &&
                  Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="blog-card blog-skeleton" />
                  ))}

                {!loading && visible.length === 0 && (
                  <div className="blog-empty">
                    <div className="blog-empty-title">Sonuç bulunamadı</div>
                    <div className="blog-empty-text">
                      Arama kelimesini değiştir veya kategori seçimini kaldırmayı dene.
                    </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        setQ("");
                        setCategory("all");
                        setSort("new");
                        setPage(1);
                      }}
                    >
                      Filtreleri temizle
                    </button>
                  </div>
                )}

                {!loading &&
                  visible.map((p) => {
                    const isFeatured = (p.tags || []).includes("Öne Çıkan");
                    const rt = getReadingTimeLabel(p);
                    const mainCat = getMainCategory(p);

                    return (
                      <article
                        key={p.slug}
                        className="blog-card"
                        onClick={() => nav(`/blog/${p.slug}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && nav(`/blog/${p.slug}`)}
                      >
                        <div className="blog-cover">
                          {isFeatured && <div className="blog-badge">★ Öne Çıkan</div>}

                          {p.cover ? (
                            <img src={p.cover} alt={p.title} />
                          ) : (
                            <div className="blog-cover-placeholder">Görsel yakında</div>
                          )}
                        </div>

                        <div className="blog-card-body">
                          {/* ✅ Meta satırı: tarih • dk • kategori (hizayı bozma) */}
                          <div className="blog-meta-line">
                            <span className="blog-date">{toTR(p.date)}</span>
                            <span className="blog-dot">•</span>
                            <span className="blog-rt">⏱️ {rt}</span>
                            {mainCat && (
                              <>
                                <span className="blog-dot">•</span>
                                <span className="blog-mini-cat">{mainCat}</span>
                              </>
                            )}
                          </div>

                          <div
                            className="blog-card-title"
                            dangerouslySetInnerHTML={{ __html: highlightHtml(p.title || "", q) }}
                          />

                          <div
                            className="blog-excerpt"
                            dangerouslySetInnerHTML={{ __html: highlightHtml(p.excerpt || "", q) }}
                          />

                          <div className="blog-tags">
                            {(p.tags || []).slice(0, 3).map((t) => (
                              <span key={t} className="blog-tag">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="blog-actions">
                            <Link
                              to={`/blog/${p.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="blog-read"
                            >
                              Devamını oku →
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>

              {/* ✅ Pagination geri geldi — en altta ORTADA */}
              <div className="blog-pagination-wrap blog-pagination-center">
  <div className="blog-pagination">
    <button
      type="button"
      className="blog-page-btn"
      disabled={safePage === 1}
      onClick={() => setPage((x) => Math.max(1, x - 1))}
      aria-label="Önceki sayfa"
      title="Önceki"
    >
      ←
    </button>

    <div className="blog-page-numbers">
      {pageItems.map((it, idx) =>
        it === "…" ? (
          <span key={`dots-${idx}`} className="blog-page-dots">
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            className={`blog-page-num ${it === safePage ? "is-active" : ""}`}
            onClick={() => setPage(it)}
            disabled={totalPages === 1} // ✅ 1 sayfada tıklanmasın
          >
            {it}
          </button>
        )
      )}
    </div>

    <button
      type="button"
      className="blog-page-btn"
      disabled={safePage === totalPages}
      onClick={() => setPage((x) => Math.min(totalPages, x + 1))}
      aria-label="Sonraki sayfa"
      title="Sonraki"
    >
      →
    </button>
  </div>

  <div className="blog-page-info">Sayfa {safePage}/{totalPages}</div>
</div>
            </div>
          </div>
        </section>

        {/* ✅ Yukarı çık butonu geri geldi */}
        <button
          type="button"
          className={`toTop ${showTop ? "is-show" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Yukarı çık"
          title="Yukarı çık"
        >
          ↑
        </button>
      </div>
    </>
  );
}
