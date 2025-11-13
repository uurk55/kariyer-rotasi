import React from "react";

export default function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [ok, setOk] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Lütfen adınızı yazın.");
    if (!email.includes("@")) return alert("Geçerli bir e-posta girin.");

    const list = JSON.parse(localStorage.getItem("kr_newsletter") || "[]");
    const exists = list.some((x) => x.email.toLowerCase() === email.toLowerCase());
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
      <div className="card" style={{ padding: 16, textAlign: "center" }}>
        <h4 style={{ margin: "0 0 6px", fontFamily: "Poppins,system-ui" }}>Teşekkürler! 🎉</h4>
        <p className="p" style={{ margin: 0 }}>
          Bültene kaydınız alındı.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "grid", gap: 10, padding: 16 }}
    >
      <h4 style={{ margin: "0 0 4px", fontFamily: "Poppins,system-ui" }}>
        Yeni yazılardan haberdar olun
      </h4>
      <p className="p" style={{ margin: "0 0 8px" }}>
        Aylık özet ve duyurular e-postanıza gelsin.
      </p>
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
        placeholder="E-posta adresi"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary">Kayıt Ol</button>
      <small style={{ color: "#6b7280" }}>Gizlilik: E-postanızı üçüncü taraflarla paylaşmayız.</small>
    </form>
  );
}
