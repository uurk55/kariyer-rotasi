// src/components/Layout.jsx
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [search, setSearch] = React.useState("");
  const nav = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    const q = search.trim();
    if (!q) nav("/blog");
    else nav(`/blog?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      <header className="header">
        <div className="container header-row">
          {/* Logo (ESKİ HALİNE GERİ DÖNDÜ) */}
          <Link
            to="/"
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              lineHeight: 1,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="Kariyer Rotası"
              style={{ height: 28, width: "auto", display: "block" }}
            />
            <span
              style={{
                fontFamily: "Poppins,system-ui",
                fontWeight: 700,
                fontSize: 18,
                color: "#e5e7eb", // koyu header için açık
              }}
            >
              Kariyer{" "}
              <span style={{ color: "#ffffff" }}>
                Rotası
              </span>
            </span>
          </Link>

          {/* Arama çubuğu (ESKİ YAPI) */}
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <div className="header-search-inner">
              <span className="header-search-icon">🔍</span>
              <input
                type="search"
                placeholder="Yazılarda ara (örn: 8D, FMEA, ChatGPT...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>

          {/* Nav (ESKİ HAL) */}
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Ana Sayfa
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
              Blog
            </NavLink>
            <NavLink to="/kaynaklar" className={({ isActive }) => (isActive ? "active" : "")}>
              Kaynaklar
            </NavLink>
            <NavLink to="/hakkimda" className={({ isActive }) => (isActive ? "active" : "")}>
              Hakkımda
            </NavLink>
            <NavLink to="/iletisim" className={({ isActive }) => (isActive ? "active" : "")}>
              İletişim
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-col">
            <div className="footer-logo">Kariyer Rotası</div>
            <p className="footer-text">
              Mühendislik, kalite ve teknolojiyi buluşturan modern bilgi platformu.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-title">Sayfalar</div>
            <nav className="footer-links">
              <Link to="/">Ana Sayfa</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/kaynaklar">Kaynaklar</Link>
              <Link to="/hakkimda">Hakkımda</Link>
              <Link to="/iletisim">İletişim</Link>
            </nav>
          </div>

          <div className="footer-col">
            <div className="footer-title">Yasal</div>
            <div className="footer-links">
              <a href="/gizlilik-politikasi">Gizlilik Politikası</a>
              <a href="/cerez-politikasi">Çerez Politikası</a>
              <a href="/kvkk-aydinlatma">KVKK Aydınlatma Metni</a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-title">Sosyal</div>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/uğur-kapancı" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="mailto:uurk5505@gmail.com">E-posta</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Kariyer Rotası — Tüm Hakları Saklıdır.
        </div>
      </footer>
    </>
  );
}
