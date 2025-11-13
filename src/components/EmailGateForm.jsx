import React from "react";

export default function EmailGateForm({ onOk }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [agree, setAgree] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) return alert("Lütfen geçerli bir e-posta girin.");
    const db = JSON.parse(localStorage.getItem("kr_emails") || "[]");
    db.push({ name, email, ts: Date.now() });
    localStorage.setItem("kr_emails", JSON.stringify(db));
    onOk?.();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginTop: 8 }}>
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
      <label style={{ fontSize: 12, color: "#6b7280" }}>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />{" "}
        Bu formu göndererek e-posta bültenine katılmayı kabul ediyorum.
      </label>
      <button className="btn btn-primary" disabled={!agree}>
        Devam Et
      </button>
    </form>
  );
}
