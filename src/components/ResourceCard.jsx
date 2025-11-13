// src/components/ResourceCard.jsx
import React from "react";

function EmailGateForm({ onOk }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [agree, setAgree] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Lütfen adınızı yazın.");
    if (!email.includes("@")) return alert("Lütfen geçerli bir e-posta girin.");
    if (!agree) return;

    const db = JSON.parse(localStorage.getItem("kr_emails") || "[]");
    db.push({ name, email, ts: Date.now() });
    localStorage.setItem("kr_emails", JSON.stringify(db));
    onOk?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 10, marginTop: 8 }}
    >
      <input
        className="btn"
        style={{ textAlign: "left" }}
        placeholder="Ad Soyad"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="btn"
        style={{ textAlign: "left" }}
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label style={{ fontSize: 12, color: "#6b7280", textAlign: "left" }}>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          style={{ marginRight: 6 }}
        />
        Bu formu göndererek e-posta bültenine katılmayı kabul ediyorum.
      </label>
      <button className="btn btn-primary" disabled={!agree}>
        Devam Et
      </button>
    </form>
  );
}

export default function ResourceCard({ item }) {
  const [open, setOpen] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    try {
      const counters = JSON.parse(
        localStorage.getItem("kr_download_counts") || "{}"
      );
      setCount(counters[item.id] || 0);
    } catch {
      setCount(0);
    }
  }, [item.id]);

  const ext = (item.href.split(".").pop() || "").toLowerCase();
  let icon = "📎";
  let extLabel = ext.toUpperCase();
  if (ext === "xlsx") icon = "📊";
  else if (ext === "docx") icon = "📄";
  else if (ext === "pdf") icon = "📕";

  async function handleDownload() {
    try {
      const head = await fetch(item.href, { method: "HEAD" });
      if (!head.ok) {
        alert(
          "Dosya bulunamadı. 'public/downloads' klasörünü ve dosya adını kontrol edin."
        );
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

      const counters = JSON.parse(
        localStorage.getItem("kr_download_counts") || "{}"
      );
      counters[item.id] = (counters[item.id] || 0) + 1;
      localStorage.setItem("kr_download_counts", JSON.stringify(counters));
      setCount(counters[item.id]);
    } catch (e) {
      alert("İndirme sırasında bir hata oluştu.");
    }
  }

  return (
    <article className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Üst satır: ikon + başlık + rozetler */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #eff6ff, #e0f2fe)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            <span aria-hidden="true">{icon}</span>
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontFamily: "Poppins,system-ui",
                fontSize: 17,
              }}
            >
              {item.title}
            </h3>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
              {item.sub || "Kalite mühendisliği için pratik şablon."}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          {count > 0 && (
            <span
              title="Toplam indirme"
              style={{
                fontSize: 11,
                padding: "4px 8px",
                borderRadius: 999,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
              }}
            >
              İndirildi: {count} kez
            </span>
          )}
          <span
            style={{
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
              color: "#4b5563",
            }}
          >
            {extLabel}
          </span>
          {item.badge && (
            <span
              style={{
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 999,
                border: "1px solid #c7d2fe",
                background: "#eef2ff",
                color: "#3730a3",
              }}
            >
              {item.badge}
            </span>
          )}
        </div>
      </div>

      {/* Açıklama */}
      <p className="p" style={{ margin: 0, fontSize: 14 }}>
        {item.description}
      </p>

      {/* İçindekiler / Notlar */}
      {item.highlights && item.highlights.length > 0 && (
        <ul
          className="p"
          style={{
            margin: "4px 0 0",
            paddingLeft: 18,
            fontSize: 13,
          }}
        >
          {item.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div style={{ marginTop: 10 }}>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setOpen(true)}
          style={{ width: "100%" }}
        >
          Ücretsiz indir (İsim & E-posta ile)
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            className="card"
            style={{
              position: "relative",
              maxWidth: 520,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 2,
                  }}
                >
                  İndirme Öncesi
                </div>
                <h4
                  style={{
                    margin: 0,
                    fontFamily: "Poppins,system-ui",
                    fontSize: 17,
                  }}
                >
                  {item.title}
                </h4>
              </div>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setOpen(false);
                  setReady(false);
                }}
              >
                ✕
              </button>
            </div>

            {!ready ? (
              <EmailGateForm onOk={() => setReady(true)} />
            ) : (
              <div style={{ marginTop: 12 }}>
                <div className="p" style={{ margin: "0 0 8px" }}>
                  Teşekkürler! İndirme hazır.
                </div>
                <button className="btn" type="button" onClick={handleDownload}>
                  İndir →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
