import React from "react";

export default function Admin() {
  const [news, setNews] = React.useState([]);
  const [gated, setGated] = React.useState([]);
  const [msgs, setMsgs] = React.useState([]);
  const [counts, setCounts] = React.useState({});

  React.useEffect(() => {
    setNews(JSON.parse(localStorage.getItem("kr_newsletter") || "[]"));
    setGated(JSON.parse(localStorage.getItem("kr_emails") || "[]"));
    setMsgs(JSON.parse(localStorage.getItem("kr_messages") || "[]"));
    try {
      setCounts(JSON.parse(localStorage.getItem("kr_download_counts") || "{}"));
    } catch {
      setCounts({});
    }
  }, []);

  function downloadCSV(rows, filename) {
    if (!rows || rows.length === 0) {
      alert("İndirilecek veri yok.");
      return;
    }
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        headers
          .map((h) => {
            const val = (r[h] ?? "").toString().replace(/"/g, '""');
            return /[,"\n]/.test(val) ? `"${val}"` : val;
          })
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const fmt = (ts) => (ts ? new Date(ts).toLocaleString("tr-TR") : "");

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ fontFamily: "Poppins,system-ui", margin: "0 0 8px" }}>
        Yönetim – Yerel Kayıtlar
      </h2>
      <p className="p">
        Bu sayfa sadece tarayıcındaki <b>localStorage</b> verilerini gösterir.
      </p>

      {/* Bülten */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Bülten Kayıtları (kr_newsletter)</h3>
          <button className="btn" onClick={() => downloadCSV(news, "newsletter.csv")}>
            CSV indir
          </button>
        </div>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Ad
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  E-posta
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {news.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.email}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{fmt(r.ts)}</td>
                </tr>
              ))}
              {news.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: "8px" }}>
                    Kayıt yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kaynak indirme e-postaları */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Kaynak İndirme E-postaları (kr_emails)</h3>
          <button
            className="btn"
            onClick={() => downloadCSV(gated, "downloads_emails.csv")}
          >
            CSV indir
          </button>
        </div>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Ad
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  E-posta
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {gated.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.email}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{fmt(r.ts)}</td>
                </tr>
              ))}
              {gated.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: "8px" }}>
                    Kayıt yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* İletişim mesajları */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>İletişim Mesajları (kr_messages)</h3>
          <button className="btn" onClick={() => downloadCSV(msgs, "messages.csv")}>
            CSV indir
          </button>
        </div>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Ad
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  E-posta
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Mesaj
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {msgs.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.email}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{r.message}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{fmt(r.ts)}</td>
                </tr>
              ))}
              {msgs.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "8px" }}>
                    Kayıt yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* İndirme sayaçları */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>İndirme Sayaçları (kr_download_counts)</h3>
          <button
            className="btn"
            onClick={() => {
              if (Object.keys(counts).length === 0) {
                alert("İndirilecek veri yok.");
                return;
              }
              const rows = Object.entries(counts).map(([id, count]) => ({
                id,
                count,
              }));
              downloadCSV(rows, "download_counts.csv");
            }}
          >
            CSV indir
          </button>
        </div>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Kaynak ID
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px" }}>
                  Toplam İndirme
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(counts).length > 0 ? (
                Object.entries(counts).map(([id, cnt]) => (
                  <tr key={id}>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{id}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{cnt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={{ padding: "8px" }}>
                    Kayıt yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
