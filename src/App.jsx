// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import ReactMarkdown from "react-markdown";

/* --------------------------- İSKELET --------------------------- */
function Layout({ children }) {
  return (
    <>
      <header className="header">
        <div className="container header-row">
          <Link
  to="/"
  className="logo"
  style={{display:"flex",alignItems:"center",gap:10, lineHeight:1}}
>
  <img src="/logo.png" alt="Kariyer Rotası" style={{height:28, display:"block"}} />
  <span style={{fontFamily:"Poppins,system-ui", fontWeight:700}}>
    Kariyer <span style={{color:"#111"}}>Rotası</span>
  </span>
</Link>

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
          <div>
            <div style={{ fontWeight: 700, color: "#2563eb" }}>Kariyer Rotası</div>
            <p className="p">Mühendislik, kalite ve teknolojiyi buluşturan pratik bir bilgi platformu.</p>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Sayfalar</div>
            <div className="grid">
              <Link to="/">Ana Sayfa</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/kaynaklar">Kaynaklar</Link>
              <Link to="/hakkimda">Hakkımda</Link>
              <Link to="/iletisim">İletişim</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* --------------------------- BİLEŞENLER --------------------------- */
/* Newsletter */
function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [ok, setOk] = React.useState(false);

  function handleSubmit(e){
    e.preventDefault();
    if(!name.trim()) return alert("Lütfen adınızı yazın.");
    if(!email.includes("@")) return alert("Geçerli bir e-posta girin.");

    const list = JSON.parse(localStorage.getItem("kr_newsletter") || "[]");
    const exists = list.some(x => x.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert("Bu e-posta zaten kayıtlı. Teşekkürler!");
      setOk(true);
      return;
    }
    list.push({ name, email, ts: Date.now() });
    localStorage.setItem("kr_newsletter", JSON.stringify(list));
    setOk(true);
  }

  if (ok) {
    return (
      <div className="card" style={{padding:16, textAlign:"center"}}>
        <h4 style={{margin:"0 0 6px", fontFamily:"Poppins,system-ui"}}>Teşekkürler! 🎉</h4>
        <p className="p" style={{margin:0}}>Bültene kaydınız alındı.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{display:"grid", gap:10, padding:16}}>
      <h4 style={{margin:"0 0 4px", fontFamily:"Poppins,system-ui"}}>Yeni yazılardan haberdar olun</h4>
      <p className="p" style={{margin:"0 0 8px"}}>Aylık özet ve duyurular e-postanıza gelsin.</p>
      <input
        className="btn" style={{textAlign:"left"}}
        placeholder="Ad Soyad" value={name} onChange={e=>setName(e.target.value)}
      />
      <input
        className="btn" style={{textAlign:"left"}}
        type="email" placeholder="E-posta adresi"
        value={email} onChange={e=>setEmail(e.target.value)}
      />
      <button className="btn btn-primary">Kayıt Ol</button>
      <small style={{color:"#6b7280"}}>Gizlilik: E-postanızı üçüncü taraflarla paylaşmayız.</small>
    </form>
  );
}

/* Ana Sayfa */
function Home() {
  const nav = useNavigate();
  const [latest, setLatest] = React.useState([]);

  React.useEffect(() => {
    fetch("/blog/index.json")
      .then(r => r.json())
      .then(list => {
        const sorted = [...list].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,3);
        setLatest(sorted);
      })
      .catch(() => setLatest([]));
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <h1 className="h1">Kariyer Rotanızı Çizmeye Hazır mısınız?</h1>
        <p className="p">
          Elektrik–Elektronik ve kalite yönetimi deneyimini; teknoloji, yapay zeka ve verimlilikle birleştirerek
          pratik bir yol haritası sunuyoruz.
        </p>
        <div className="actions">
  <button className="btn btn-primary" onClick={() => nav("/blog")}>Yazıları Keşfet</button>
  <button className="btn btn-ghost" onClick={() => nav("/kaynaklar")}>Kaynaklar</button>
</div>

        <h3 style={{fontFamily:"Poppins,system-ui", margin:"28px 0 8px"}}>Son Yazılar</h3>
        <div className="grid grid-3">
          {latest.length === 0 ? (
            <>
              <div className="card">Yükleniyor…</div>
              <div className="card">Yükleniyor…</div>
              <div className="card">Yükleniyor…</div>
            </>
          ) : (
            latest.map(item => (
              <article key={item.slug} className="card">
                <div style={{fontSize:12, color:"#6b7280"}}>
                  {new Date(item.date).toLocaleDateString("tr-TR")}
                </div>
                <h4 style={{margin:"6px 0 4px", fontFamily:"Poppins,system-ui"}}>{item.title}</h4>

                {/* küçük etiket rozetleri */}
                <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"6px 0 8px"}}>
                  {(item.tags || []).slice(0,2).map(t => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        padding: "2px 6px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 999,
                        background: "#f9fafb",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="p" style={{margin:"0 0 8px"}}>{item.excerpt}</p>
                <Link className="btn" to={`/blog/${item.slug}`}>Devamı →</Link>
              </article>
            ))
          )}
        </div>

        {/* Bülten formu */}
        <div style={{marginTop:24}}>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

/* Blog (kategori filtresi + arama) */
function Blog() {
  const [items, setItems] = React.useState([]);
  const [activeTag, setActiveTag] = React.useState("Tümü");
  const [tags, setTags] = React.useState(["Tümü"]);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    fetch("/blog/index.json")
      .then(r => r.json())
      .then(data => {
        data.sort((a,b)=>new Date(b.date)-new Date(a.date));
        setItems(data);
        const all = new Set(["Tümü"]);
        data.forEach(p => (p.tags||[]).forEach(t => all.add(t)));
        setTags(Array.from(all));
      })
      .catch(()=>{ setItems([]); setTags(["Tümü"]); });
  }, []);

  const byTag = activeTag === "Tümü"
    ? items
    : items.filter(p => (p.tags||[]).includes(activeTag));

  const qNorm = q.trim().toLowerCase();
  const filtered = !qNorm ? byTag : byTag.filter(p =>
    (p.title||"").toLowerCase().includes(qNorm) ||
    (p.excerpt||"").toLowerCase().includes(qNorm)
  );

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ fontFamily: "Poppins,system-ui", margin: "0 0 8px" }}>Blog</h2>
      <p className="p">En yeni yazılar:</p>

      <div className="card" style={{display:"grid", gap:10, margin:"12px 0"}}>
        <input
          className="btn" style={{textAlign:"left"}}
          placeholder="Yazılarda ara (örn: FMEA, STAR, ChatGPT...)"
          value={q} onChange={e=>setQ(e.target.value)}
        />
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {tags.map(tag => (
            <button
              key={tag}
              className="btn"
              onClick={()=>setActiveTag(tag)}
              style={{
                borderColor: activeTag===tag ? "#2563eb" : "#e5e7eb",
                background: activeTag===tag ? "#eff6ff" : "#fff"
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: 8 }}>
        {filtered.map(p => (
  <article key={p.slug} className="card" style={{position:"relative"}}>
    {p.cover && <img src={p.cover} alt={p.title} style={{width:"100%",borderRadius:"8px",marginBottom:"8px"}} />}

    {/* Sağ üstte Öne Çıkan rozeti */}
    {(((p.tags||[]).includes("Öne Çıkan")) || p.featured) && (
      <span className="badge" style={{position:"absolute", top:12, right:12, zIndex:2}}>
        Öne Çıkan
      </span>
    )}

    {/* KAPAK ALANI (varsa) */}
<div className="cover">
  {p.cover
    ? <img src={p.cover} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:12}}/>
    : "Kapak"}
</div>

    <div style={{ fontSize: 12, color: "#6b7280" }}>
      {new Date(p.date).toLocaleDateString("tr-TR")}
    </div>
    <h3 style={{ margin: "6px 0 4px", fontFamily: "Poppins,system-ui", fontSize: 18 }}>
      {p.title}
    </h3>
    <p className="p" style={{ margin: "0 0 8px" }}>{p.excerpt}</p>

    <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:8}}>
      {(p.tags||[]).map(t=>(
        <span key={t} style={{fontSize:11, padding:"2px 6px", border:"1px solid #e5e7eb", borderRadius:999}}>
          {t}
        </span>
      ))}
    </div>

    <Link className="btn" to={`/blog/${p.slug}`}>Devamı →</Link>
  </article>
))}
      </div>
    </div>
  );
}

/* Tekil Yazı (Markdown) */
function Post() {
  const { slug } = useParams();
  const [meta, setMeta] = React.useState({ title: "", date: "" });
  const [md, setMd] = React.useState("# Yükleniyor...");
  const [toc, setToc] = React.useState([]);        // ← İçindekiler
  const [readMin, setReadMin] = React.useState(0); // ← Okuma süresi (dk)

  // basit slugify; aynı başlık tekrarında -2, -3 ekle
  function slugify(s){ 
    return s.toLowerCase()
      .replace(/[^\w\- ]+/g,"")
      .replace(/\s+/g,"-")
      .replace(/\-+/g,"-")
      .replace(/^-+|-+$/g,"");
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
          return;
        }
        const text = await res.text();

        // --- frontmatter ---
        let title = slug, date = "";
        const fm = text.match(/^---\s*([\s\S]*?)\s*---\s*/);
        let body = text;
        if (fm) {
          body = text.slice(fm[0].length);
          const lines = fm[1].split(/\r?\n/);
          for (const line of lines) {
            const mTitle = line.match(/^title:\s*(.*)$/i);
            const mDate  = line.match(/^date:\s*(.*)$/i);
            if (mTitle) title = mTitle[1].trim();
            if (mDate)  date  = mDate[1].trim();
          }
        }

        // --- TOC çıkar (## ve ###) ---
        const headings = [];
        const usedIds = new Map();
        body.split(/\r?\n/).forEach((line)=>{
          const m = line.match(/^(#{2,3})\s+(.+?)\s*$/); // ## veya ###
          if (m) {
            const level = m[1].length;  // 2 veya 3
            const text  = m[2].trim().replace(/\s+#$/,"");
            let id = slugify(text);
            // uniq id
            const n = (usedIds.get(id) || 0) + 1;
            usedIds.set(id, n);
            if (n > 1) id = `${id}-${n}`;
            headings.push({ level, text, id });
          }
        });

        // --- okuma süresi (yaklaşık 200 wpm) ---
        const words = body.replace(/```[\s\S]*?```/g,"").split(/\s+/).filter(Boolean).length;
        const mins  = Math.max(1, Math.ceil(words / 200));

        setMeta({ title, date });
        setMd(body);
        setToc(headings);
        setReadMin(mins);
      } catch {
        setMd("# Yüklenemedi");
        setMeta({ title: slug, date: "" });
        setToc([]);
        setReadMin(0);
      }
    }
    load();
  }, [slug]);

  // ReactMarkdown heading bileşenleri: id verelim ki TOC linkleri çalışsın
  const usedOnce = new Map();
  const components = {
    h1({node, ...props}) {
      const txt = String(props.children?.[0] ?? "");
      let id = slugify(txt);
      const n = (usedOnce.get(id) || 0) + 1; usedOnce.set(id, n);
      if (n>1) id = `${id}-${n}`;
      return <h1 id={id} {...props} />;
    },
    h2({node, ...props}) {
      const txt = String(props.children?.[0] ?? "");
      let id = slugify(txt);
      const n = (usedOnce.get(id) || 0) + 1; usedOnce.set(id, n);
      if (n>1) id = `${id}-${n}`;
      return <h2 id={id} {...props} />;
    },
    h3({node, ...props}) {
      const txt = String(props.children?.[0] ?? "");
      let id = slugify(txt);
      const n = (usedOnce.get(id) || 0) + 1; usedOnce.set(id, n);
      if (n>1) id = `${id}-${n}`;
      return <h3 id={id} {...props} />;
    },
  };

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h1 className="h1" style={{ fontSize: 28 }}>{meta.title}</h1>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:16 }}>
        {/* içerik */}
        <div>
          {/* meta satırı */}
          <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12, color:"#6b7280", fontSize:13 }}>
            {meta.date && <span>{new Date(meta.date).toLocaleDateString("tr-TR")}</span>}
            {readMin > 0 && <span>• ~{readMin} dk okuma</span>}
          </div>

          <article className="card">
            <ReactMarkdown components={components}>{md}</ReactMarkdown>
          </article>
        </div>

        {/* TOC */}
        <aside className="toc">
          <div className="card" style={{padding:16}}>
            <div className="toc-title">İçindekiler</div>
            {toc.length === 0 ? (
              <div className="p">Başlık bulunamadı.</div>
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
  );
}


/* Kaynaklar – İndirilebilirler */
function EmailGateForm({ onOk }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [agree, setAgree] = React.useState(true);

  function handleSubmit(e){
    e.preventDefault();
    if(!email.includes("@")) return alert("Lütfen geçerli bir e-posta girin.");
    const db = JSON.parse(localStorage.getItem("kr_emails") || "[]");
    db.push({ name, email, ts: Date.now() });
    localStorage.setItem("kr_emails", JSON.stringify(db));
    onOk?.();
  }

  return (
    <form onSubmit={handleSubmit} style={{display:"grid",gap:10,marginTop:8}}>
      <input className="btn" style={{textAlign:"left"}} placeholder="Ad Soyad" value={name} onChange={e=>setName(e.target.value)} />
      <input className="btn" style={{textAlign:"left"}} type="email" placeholder="E-posta" value={email} onChange={e=>setEmail(e.target.value)} />
      <label style={{fontSize:12,color:"#6b7280"}}>
        <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} /> Bu formu göndererek e-posta bültenine katılmayı kabul ediyorum.
      </label>
      <button className="btn btn-primary" disabled={!agree}>Devam Et</button>
    </form>
  );
}

function ResourceCard({ item }) {
  const [open,setOpen] = React.useState(false);
  const [ready,setReady] = React.useState(false);
  const [count,setCount] = React.useState(0); // ← sayaç

  // sayacı yükle
  React.useEffect(()=>{
    try{
      const counters = JSON.parse(localStorage.getItem("kr_download_counts")||"{}");
      setCount(counters[item.id] || 0);
    }catch{
      setCount(0);
    }
  },[item.id]);

  async function handleDownload() {
    try {
      const head = await fetch(item.href, { method: "HEAD" });
      if (!head.ok) {
        alert("Dosya bulunamadı. 'public/downloads' klasörünü ve dosya adını kontrol edin.");
        return;
      }
      const resp = await fetch(item.href);
      if (!resp.ok) {
        alert("Dosyaya erişilemedi.");
        return;
      }
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.href.split("/").pop() || "dosya";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // ← İNDİRME BAŞARILI: sayaç artır
      const counters = JSON.parse(localStorage.getItem("kr_download_counts")||"{}");
      counters[item.id] = (counters[item.id] || 0) + 1;
      localStorage.setItem("kr_download_counts", JSON.stringify(counters));
      setCount(counters[item.id]);
    } catch (e) {
      alert("İndirme sırasında bir hata oluştu.");
    }
  }

  return (
    <article className="card">
      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center"}}>
<h3 style={{margin:"0 0 6px", fontFamily:"Poppins,system-ui", fontSize:18}}>
  <span aria-hidden="true" style={{marginRight:8}}>
    {item.href.endsWith(".xlsx") ? "📊" : item.href.endsWith(".docx") ? "📄" : "📎"}
  </span>
  {item.title}
</h3>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          {count > 0 && (
            <span title="Toplam indirme" style={{fontSize:11, padding:"4px 8px", borderRadius:999, background:"#f1f5ff", border:"1px solid #cbd5e1", color:"#334155"}}>
              İndirildi: {count} kez
            </span>
          )}
          {item.badge && <span style={{fontSize:11, padding:"4px 8px", borderRadius:999, background:"#eef2ff", border:"1px solid #c7d2fe", color:"#3730a3"}}>{item.badge}</span>}
        </div>
      </div>
      <p className="p" style={{margin:"0 0 12px"}}>{item.description}</p>
      <button className="btn btn-primary" onClick={()=>setOpen(true)}>İndir (İsim & E-posta ile)</button>

      {open && (
        <div style={{position:"fixed", left:0, top:0, width:"100vw", height:"100vh",
          background:"rgba(0,0,0,.25)", zIndex:9999, display:"flex", alignItems:"center",
          justifyContent:"center", padding:16}}>
          <div className="card" style={{position:"relative", maxWidth:520, width:"100%"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
              <div>
                <div style={{fontSize:12, color:"#6b7280"}}>İndirme Öncesi</div>
                <h4 style={{margin:"4px 0", fontFamily:"Poppins,system-ui"}}>{item.title}</h4>
              </div>
              <button className="btn" onClick={()=>setOpen(false)}>✕</button>
            </div>

            {!ready ? (
              <EmailGateForm onOk={()=>setReady(true)} />
            ) : (
              <div style={{marginTop:12}}>
                <div className="p" style={{margin:"0 0 8px"}}>Teşekkürler! İndirme hazır.</div>
                <button className="btn" onClick={handleDownload}>İndir →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function Resources() {
  const resources = [
    {
      id: "8d-rapor",
      title: "8D Problem Çözme Rapor Şablonu (DOCX)",
      description: "8D adımlarını eksiksiz takip etmek için pratik şablon.",
      href: "/downloads/8d-template.docx",
      badge: "Popüler",
    },
    {
      id: "fmea-form",
      title: "FMEA Formu (XLSX)",
      description: "RPN, aksiyon ve sorumlu takibi içeren tablo.",
      href: "/downloads/fmea-form.xlsx",
      badge: "Yeni",
    },
    {
      id: "spc-kart",
      title: "SPC Kontrol Kartı Şablonları (XLSX)",
      description: "Xbar-R, P ve C kartları için hazır sayfalar.",
      href: "/downloads/spc-charts.xlsx",
      badge: "Önerilen",
    },
  ];

  return (
    <div className="container" style={{padding:"24px 0"}}>
      <h2 style={{fontFamily:"Poppins,system-ui", margin:"0 0 8px"}}>Kaynaklar</h2>
      <p className="p">İndirilebilir şablonlar ve dokümanlar</p>
      <div className="grid grid-3" style={{marginTop:16}}>
        {resources.map(r => <ResourceCard key={r.id} item={r} />)}
      </div>
    </div>
  );
}

/* İletişim – localStorage'a kaydeder (şimdilik) */
function Contact() {
  const [name,setName]   = React.useState("");
  const [email,setEmail] = React.useState("");
  const [msg,setMsg]     = React.useState("");
  const [ok,setOk]       = React.useState(false);

  function handleSubmit(e){
    e.preventDefault();
    if(!name.trim())  return alert("Lütfen adınızı yazın.");
    if(!email.includes("@")) return alert("Geçerli bir e-posta girin.");
    if(!msg.trim())   return alert("Lütfen bir mesaj yazın.");

    const inbox = JSON.parse(localStorage.getItem("kr_messages")||"[]");
    inbox.push({ name, email, message: msg, ts: Date.now() });
    localStorage.setItem("kr_messages", JSON.stringify(inbox));
    setOk(true);
  }

  if (ok) {
    return (
      <div className="container" style={{padding:"24px 0"}}>
        <h2 style={{fontFamily:"Poppins,system-ui", margin:"0 0 8px"}}>Teşekkürler!</h2>
        <p className="p">Mesajınızı aldım, en kısa sürede dönüş yapacağım.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{padding:"24px 0"}}>
      <h2 style={{fontFamily:"Poppins,system-ui", margin:"0 0 8px"}}>İletişim</h2>
      <p className="p">Sorularınız ve işbirlikleri için yazın.</p>

      <form onSubmit={handleSubmit} style={{display:"grid",gap:10, marginTop:12, maxWidth:640}}>
        <input
          className="btn" style={{textAlign:"left"}} placeholder="Ad Soyad"
          value={name} onChange={e=>setName(e.target.value)}
        />
        <input
          className="btn" style={{textAlign:"left"}} type="email" placeholder="E-posta"
          value={email} onChange={e=>setEmail(e.target.value)}
        />
        <textarea
          className="btn" style={{textAlign:"left", minHeight:120}} placeholder="Mesajınız"
          value={msg} onChange={e=>setMsg(e.target.value)}
        />
        <button className="btn btn-primary">Gönder</button>
      </form>
    </div>
  );
}

/* Hakkımda */
function About() {
  return (
    <div className="container" style={{padding:"24px 0"}}>
      <h2 style={{fontFamily:"Poppins,system-ui", margin:"0 0 8px"}}>Hakkımda – Uğur Kapancı</h2>
      <div style={{display:"grid", gap:16, alignItems:"start", marginTop:16}}>
        <div style={{display:"grid", gap:12}}>
          <p className="p">
            Elektrik-Elektronik Mühendisiyim. Kariyerimi kalite yönetim sistemleri, mühendislik süreçleri ve
            sürekli iyileştirme üzerine inşa ettim. ISO 9001, 14001, 45001, 50001 ve 17025 standartlarında
            entegrasyon ve sistem kurulum projeleri yürüttüm; sertifikasyon ve denetim süreçlerinde
            ekipleriyle birlikte sıfır majör uygunsuzlukla tamamlanan denetimler gerçekleştirdim.
          </p>
          <p className="p">
            Kalite yönetiminin yalnızca standartlardan ibaret olmadığını; insan, teknoloji ve inovasyonun
            kesişiminde şekillendiğini gördüm. Bu bakış beni teknolojinin gücünü kaliteye entegre etmeye
            yönlendirdi.
          </p>
          <p className="p">
            Son yıllarda <b>yapay zekâ</b> ve <b>3D yazıcı teknolojilerine</b> özel ilgi duyuyorum. Bu alanda
            <b> EDU 3D Model Dünyası</b> adını verdiğim blog ve uygulama projeleriyle yapay zekâ destekli
            öğrenme deneyimleri ve modelleme süreçlerine odaklandım. Ayrıca bu “Kariyer Rotası” sitesini
            kurarak mühendislik, kalite ve teknolojiyi bir araya getiren sade, öğretici bir platform
            tasarladım.
          </p>
          <p className="p">
            Amacım; iş hayatında yapay zekâ, otomasyon ve kalite kültürünü bir araya getirerek hem bireysel
            hem kurumsal verimliliği artırmak. Bu sayfa, bu yolculuğun paylaşım noktası. 🚀
          </p>
        </div>

        <div className="card" style={{maxWidth:420}}>
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop"
            alt="Uğur Kapancı"
            style={{width:"100%", borderRadius:12}}
          />
          <div style={{marginTop:8, fontSize:14, color:"#6b7280"}}>Fotoğraf (temsili)</div>
        </div>
      </div>
    </div>
  );
}

/* Placeholder */
const Placeholder = ({ title }) => (
  <div className="container" style={{ padding: "24px 0" }}>
    <h2 style={{ fontFamily: "Poppins,system-ui", margin: "0 0 8px" }}>{title}</h2>
    <p className="p">İçerik yakında.</p>
  </div>
);

/* Admin – localStorage görünümleri + CSV + sayaçlar */
function Admin() {
  const [news, setNews] = React.useState([]);
  const [gated, setGated] = React.useState([]);
  const [msgs, setMsgs]   = React.useState([]);
  const [counts, setCounts] = React.useState({}); // ← sayaçlar

  React.useEffect(()=>{
    setNews(JSON.parse(localStorage.getItem("kr_newsletter")||"[]"));
    setGated(JSON.parse(localStorage.getItem("kr_emails")||"[]"));
    setMsgs(JSON.parse(localStorage.getItem("kr_messages")||"[]"));
    try{
      setCounts(JSON.parse(localStorage.getItem("kr_download_counts")||"{}"));
    }catch{ setCounts({}); }
  }, []);

  function downloadCSV(rows, filename){
    if(!rows || rows.length===0){ alert("İndirilecek veri yok."); return; }
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map(r => headers.map(h => {
        const val = (r[h] ?? "").toString().replace(/"/g,'""');
        return /[,"\n]/.test(val) ? `"${val}"` : val;
      }).join(","))
    ].join("\n");
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  const fmt = (ts)=> ts ? new Date(ts).toLocaleString("tr-TR") : "";

  const countRows = Object.entries(counts).map(([id, count])=>({id, count}));

  return (
    <div className="container" style={{padding:"24px 0"}}>
      <h2 style={{fontFamily:"Poppins,system-ui", margin:"0 0 8px"}}>Yönetim – Yerel Kayıtlar</h2>
      <p className="p">Bu sayfa sadece tarayıcındaki <b>localStorage</b> verilerini gösterir.</p>

      {/* Bülten */}
      <div className="card" style={{marginTop:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{margin:0}}>Bülten Kayıtları (kr_newsletter)</h3>
          <button className="btn" onClick={()=>downloadCSV(news,"newsletter.csv")}>CSV indir</button>
        </div>
        <div style={{overflowX:"auto", marginTop:8}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead><tr>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Ad</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>E-posta</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Tarih</th>
            </tr></thead>
            <tbody>
              {news.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.name}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.email}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{fmt(r.ts)}</td>
                </tr>
              ))}
              {news.length===0 && <tr><td colSpan={3} style={{padding:"8px"}}>Kayıt yok.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kaynak indirme e-postaları */}
      <div className="card" style={{marginTop:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{margin:0}}>Kaynak İndirme E-postaları (kr_emails)</h3>
          <button className="btn" onClick={()=>downloadCSV(gated,"downloads_emails.csv")}>CSV indir</button>
        </div>
        <div style={{overflowX:"auto", marginTop:8}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead><tr>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Ad</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>E-posta</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Tarih</th>
            </tr></thead>
            <tbody>
              {gated.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.name}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.email}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{fmt(r.ts)}</td>
                </tr>
              ))}
              {gated.length===0 && <tr><td colSpan={3} style={{padding:"8px"}}>Kayıt yok.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* İletişim mesajları */}
      <div className="card" style={{marginTop:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{margin:0}}>İletişim Mesajları (kr_messages)</h3>
          <button className="btn" onClick={()=>downloadCSV(msgs,"messages.csv")}>CSV indir</button>
        </div>
        <div style={{overflowX:"auto", marginTop:8}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead><tr>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Ad</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>E-posta</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Mesaj</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Tarih</th>
            </tr></thead>
            <tbody>
              {msgs.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.name}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.email}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{r.message}</td>
                  <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{fmt(r.ts)}</td>
                </tr>
              ))}
              {msgs.length===0 && <tr><td colSpan={4} style={{padding:"8px"}}>Kayıt yok.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* İndirme sayaçları */}
      <div className="card" style={{marginTop:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{margin:0}}>İndirme Sayaçları (kr_download_counts)</h3>
          <button
            className="btn"
            onClick={()=>{
              if(Object.keys(counts).length===0){ alert("İndirilecek veri yok."); return; }
              const rows = Object.entries(counts).map(([id,count])=>({id, count}));
              downloadCSV(rows, "download_counts.csv");
            }}
          >
            CSV indir
          </button>
        </div>
        <div style={{overflowX:"auto", marginTop:8}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead><tr>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Kaynak ID</th>
              <th style={{textAlign:"left",borderBottom:"1px solid #e5e7eb",padding:"8px"}}>Toplam İndirme</th>
            </tr></thead>
            <tbody>
              {Object.keys(counts).length>0 ? (
                Object.entries(counts).map(([id, cnt])=>(
                  <tr key={id}>
                    <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{id}</td>
                    <td style={{padding:"8px",borderBottom:"1px solid #f1f5f9"}}>{cnt}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2} style={{padding:"8px"}}>Kayıt yok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- ROUTER --------------------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/kaynaklar" element={<Resources />} />
          <Route path="/hakkimda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Placeholder title="Sayfa bulunamadı" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
