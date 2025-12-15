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

  return (
    <>
      <Seo
        title="İletişim – Kariyer Rotası"
        description="Kariyer Rotası ile ilgili sorularınız, iş birlikleri ve geri bildirimleriniz için iletişime geçin."
        type="website"
      />

      <div className="contact-page">
        <div className="container">
          {/* HERO */}
          <section className="contact-hero">
            <div className="contact-hero-card">
              <div>
                <div className="contact-kicker">KARİYER ROTASI</div>
                <h1 className="contact-title">İletişim</h1>
                <p className="contact-subtitle">
                  İçerik önerisi, iş birliği, geri bildirim veya sadece bir fikir…
                  Yazmak için uzun uzun düşünmene gerek yok.
                </p>
              </div>
            </div>
          </section>

          {/* BODY */}
          <section className="contact-body">
            {ok ? (
              /* TEŞEKKÜR */
              <div className="contact-success">
                <h2>Mesajın alındı 🙌</h2>
                <p>
                  En kısa sürede dönüş yapacağım.
                  Kariyer Rotası’nı daha iyi hale getirmeme katkı sağladığın için teşekkür ederim.
                </p>
                <a href="/blog" className="btn btn-primary">
                  Blog’a dön →
                </a>
              </div>
            ) : (
              <div className="contact-grid">
                {/* SOL AÇIKLAMA */}
                <div className="contact-info">
                  <h2>Neden yazmalısın?</h2>
                  <ul>
                    <li>Bir konuda içerik veya rehber görmek istiyorsan</li>
                    <li>Şablonlarla ilgili önerin veya hatayı bildirmek için</li>
                    <li>İş birliği veya proje fikrin varsa</li>
                    <li>Sadece “şu yazı çok işime yaradı” demek için bile</li>
                  </ul>

                  <p className="contact-note">
                    Not: Satış veya otomatik mesajlar değil, gerçekten okunan mesajlar isterim.
                  </p>
                </div>

                {/* SAĞ FORM */}
                <div className="contact-form-card">
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label>Ad Soyad</label>
                      <input
                        placeholder="Adınızı yazın"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>E-posta</label>
                      <input
                        type="email"
                        placeholder="ornek@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Mesaj</label>
                      <textarea
                        placeholder="Kısaca ne hakkında yazmak istiyorsun?"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                    </div>

                    <button className="btn btn-primary">
                      Mesajı gönder →
                    </button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
