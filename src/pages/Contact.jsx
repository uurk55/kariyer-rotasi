import React from "react";
import Seo from "../components/Seo";


export default function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [ok, setOk] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Lütfen adınızı yazın.");
    if (!email.includes("@")) return alert("Geçerli bir e-posta girin.");
    if (!msg.trim()) return alert("Lütfen bir mesaj yazın.");

    const inbox = JSON.parse(localStorage.getItem("kr_messages") || "[]");
    inbox.push({ name, email, message: msg, ts: Date.now() });
    localStorage.setItem("kr_messages", JSON.stringify(inbox));
    setOk(true);
  }

  if (ok) {
    return (
      <>
        <Seo
          title="İletişim – Kariyer Rotası"
          description="Kariyer Rotası ile ilgili sorularınız, iş birlikleri ve geri bildirimleriniz için iletişim formunu kullanabilirsiniz."
          type="website"
        />
        <div className="container" style={{ padding: "24px 0" }}>
          {/* teşekkür mesajı */}
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title="İletişim – Kariyer Rotası"
        description="Kariyer Rotası ile ilgili sorularınız, iş birlikleri ve geri bildirimleriniz için iletişim formunu kullanabilirsiniz."
        type="website"
      />
      <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ fontFamily: "Poppins,system-ui", margin: "0 0 8px" }}>İletişim</h2>
      <p className="p">Sorularınız ve işbirlikleri için yazın.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 10, marginTop: 12, maxWidth: 640 }}
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
        <textarea
          className="btn"
          style={{ textAlign: "left", minHeight: 120 }}
          placeholder="Mesajınız"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="btn btn-primary">Gönder</button>
      </form>
    </div>
     </>
    );
 }
