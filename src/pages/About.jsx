import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="Hakkımda – Uğur Kapancı | Kariyer Rotası"
        description="Elektrik–Elektronik Mühendisi ve kalite profesyoneli Uğur Kapancı'nın kariyer hikâyesi, ilgi alanları ve Kariyer Rotası'nın ortaya çıkış hikâyesi."
        type="profile"
      />

      <div className="about-page">
        <div className="container">
          {/* HERO */}
          <section className="about-hero">
            <div className="about-hero-card">
              <div className="about-hero-left">
                <div className="about-kicker">KARİYER ROTASI • HAKKIMDA</div>
                <h1 className="about-title">Hakkımda</h1>
                <p className="about-subtitle">
                  Ben <b>Uğur Kapancı</b>. Elektrik–Elektronik Mühendisiyim. Kalite yönetim sistemleri,
                  saha süreçleri ve sürekli iyileştirme odağında çalışıyorum.
                  Kariyer Rotası’nda amaç: <b>okuyup uygulayabileceğin</b> net içerikler ve pratik şablonlar sunmak.
                </p>

                <div className="about-pills">
                  <span className="about-pill">⚡ Kalite Profesyoneli</span>
                  <span className="about-pill">🧩 ISO 9001 • 14001 • 45001 • 50001</span>
                  <span className="about-pill">🤖 Yapay Zekâ</span>
                  <span className="about-pill">🛠️ 3D Yazıcı</span>
                </div>
              </div>

              <aside className="about-hero-right">
                {/* LOGO (küçük, opsiyonel) */}
                <div className="about-logo">
                  {/* Logo dosyan yoksa bunu kaldırabilirsin.
                      Öneri: public/logo.svg veya public/logo.png */}
                  <img src="/logo.png" alt="Kariyer Rotası" onError={(e) => (e.currentTarget.style.display = "none")} />
                  <div className="about-logo-text">Kariyer Rotası</div>
                </div>

                <div className="about-card">
                  <div className="about-card-title">Kısaca</div>
                  <ul className="about-list">
                    <li>Elektrik–Elektronik Mühendisi</li>
                    <li>Kalite yönetim sistemleri & saha uygulamaları</li>
                    <li>Yapay zekâ ile iş akışı hızlandırma</li>
                    <li>3D yazıcı / üretim / verimlilik</li>
                  </ul>

                  <div className="about-actions">
                    <Link to="/blog" className="btn btn-primary about-btn">
                      Blog yazılarını incele →
                    </Link>
                    <Link to="/kaynaklar" className="btn btn-ghost about-btn">
                      Ücretsiz şablonları gör →
                    </Link>
                  </div>

                  <div className="about-note">
                    Not: Buradaki her içerik “teori anlatımı” değil; sahada uygulanabilir şekilde hazırlanır.
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* CONTENT */}
          <section className="about-body">
            <div className="about-grid">
              {/* SOL */}
              <div className="about-sections">
                <article className="about-section">
                  <h2 className="about-h2">Ben kimim?</h2>
                  <p className="p">
                    Merhaba, ben <b>Uğur Kapancı</b>. Kariyerimde üretim ortamında kalite yönetim sistemleri,
                    süreç iyileştirme, enerji ve iş güvenliği gibi alanların tam ortasında çalıştım.
                    ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 gibi standartlarla yaşayan bir yapının içinde,
                    denetimlere hazırlanan ve sürekli iyileştiren tarafta yer aldım.
                  </p>
                  <p className="p">
                    Sahada; pres, eloksal, boyahane, bakımhane gibi bölümlerde hem teknik sürece hem de dokümantasyona dokunma fırsatım oldu.
                    Kısacası sadece “prosedür yazan” tarafta değil; hat üstünde, gerçek problemlerin olduğu yerde de çalıştım.
                  </p>
                </article>

                <article className="about-section">
                  <h2 className="about-h2">Kariyer Rotası neden var?</h2>
                  <p className="p">
                    Kariyerimin ilk yıllarında kaliteli, Türkçe ve gerçekten <b>uygulanabilir</b> kaynak bulmakta zorlandım.
                    Birçok içerik ya çok teorikte kalıyor ya da sahaya temas etmiyordu.
                  </p>
                  <p className="p">
                    <b>Kariyer Rotası</b> bu boşluğu kapatmak için var:
                  </p>
                  <ul className="about-bullets">
                    <li>Mühendis ve kalite profesyonellerine sade, örnekli rehberler sunmak</li>
                    <li>Yapay zekâ ve dijital araçlarla işleri hızlandıran pratik senaryolar paylaşmak</li>
                    <li>Kariyerinin ilk yıllarında yol gösteren net içerikler üretmek</li>
                  </ul>
                  <p className="p">
                    Buradaki hedef: “okuyup kapatma” değil; <b>okuyup uygulama</b>.
                  </p>
                </article>

                <article className="about-section">
                  <h2 className="about-h2">İlgi alanlarım</h2>
                  <p className="p">
                    Son yıllarda özellikle <b>yapay zekâ</b> ve <b>3D yazıcı</b> tarafında üretken projeler geliştirmeye odaklandım.
                    İş hayatında kullanılan süreçleri; otomasyon, yazılım ve yapay zekâ ile daha akıllı hale getirme fikri beni heyecanlandırıyor.
                  </p>
                  <p className="p">
                    Kariyer Rotası da bu bakış açısının bir yansıması: hem mühendislik hem üretim hem de “daha iyi çalışma sistemi kurma” tarafı.
                  </p>
                </article>

                <article className="about-section">
                  <h2 className="about-h2">Bu siteden ne kazanacaksın?</h2>
                  <p className="p">
                    Eğer buradaysan muhtemelen daha sistemli ilerlemek, daha az hata yapmak ve daha hızlı öğrenmek istiyorsun.
                    Bu sitede bulacakların:
                  </p>
                  <div className="about-cards">
                    <div className="about-mini-card">
                      <div className="about-mini-title">Kalite</div>
                      <div className="about-mini-text">Rehberler, kontrol listeleri, iç denetim yaklaşımı, uygulama örnekleri.</div>
                    </div>
                    <div className="about-mini-card">
                      <div className="about-mini-title">Kariyer</div>
                      <div className="about-mini-text">CV, mülakat, LinkedIn, iş hayatında iletişim ve net ilerleme planı.</div>
                    </div>
                    <div className="about-mini-card">
                      <div className="about-mini-title">Yapay Zekâ</div>
                      <div className="about-mini-text">ChatGPT ve otomasyon ile iş akışını hızlandıran pratik senaryolar.</div>
                    </div>
                    <div className="about-mini-card">
                      <div className="about-mini-title">Verimlilik</div>
                      <div className="about-mini-text">Odak, zaman yönetimi ve sürdürülebilir sistem kurma alışkanlıkları.</div>
                    </div>
                  </div>
                </article>
              </div>

              {/* SAĞ: küçük “iletişim/bağlantı” kartı */}
              <aside className="about-side">
                <div className="about-side-card">
                  <div className="about-side-title">Bir önerin mi var?</div>
                  <p className="about-side-text">
                    Hangi konuda içerik veya şablon istersin? 1 cümle bile yeter.
                  </p>
                  <Link to="/iletisim" className="btn btn-primary about-btn">
                    İletişime geç →
                  </Link>
                  <div className="about-side-foot">
                    Küçük katkılar en iyi içerikleri doğuruyor.
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
