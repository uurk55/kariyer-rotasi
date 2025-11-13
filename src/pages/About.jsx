import React from "react";
import Seo from "../components/Seo";


export default function About() {
  return (
    <>
      <Seo
        title="Hakkımda – Uğur Kapancı | Kariyer Rotası"
        description="Elektrik–Elektronik Mühendisi ve kalite profesyoneli Uğur Kapancı'nın kariyer hikâyesi, ilgi alanları ve Kariyer Rotası'nın ortaya çıkış hikâyesi."
        type="profile"
      />
      <div className="container" style={{ padding: "24px 0" }}>
      <h1
        className="h1"
        style={{ fontSize: 26, marginBottom: 4 }}
      >
        Hakkımda – Uğur Kapancı
      </h1>
      <p className="p" style={{ margin: 0, fontSize: 14 }}>
        Elektrik–Elektronik Mühendisi • Kalite Profesyoneli • Yapay Zekâ ve 3D Yazıcı Meraklısı
      </p>

      <div
        style={{
          display: "grid",
          gap: 24,
          alignItems: "flex-start",
          marginTop: 24,
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.2fr)",
        }}
      >
        {/* SOL BLOK – HİKÂYE */}
        <div style={{ display: "grid", gap: 16 }}>
          {/* Ben kimim? */}
          <section>
            <h2
              style={{
                fontFamily: "Poppins,system-ui",
                fontSize: 18,
                margin: "0 0 6px",
              }}
            >
              Ben kimim?
            </h2>
            <p className="p">
              Merhaba, ben <b>Uğur Kapancı</b>. Elektrik–Elektronik Mühendisiyim. Kariyerimde;
              üretim ortamında kalite yönetim sistemleri, süreç iyileştirme, enerji ve iş güvenliği
              gibi alanların tam ortasında çalıştım. ISO 9001, 14001, 45001 ve 50001 gibi
              standartlarla yaşayan, denetimlere hazırlanan ve sürekli iyileşen bir yapının içinde
              yer aldım.
            </p>
            <p className="p">
              Sahada; pres, eloksal, boyahane, bakımhane gibi bölümlerde hem teknik süreçlere hem de
              dokümantasyon tarafına dokunma fırsatım oldu. Kısacası sadece “prosedür yazan”
              tarafta değil; hat üstünde, gerçek problemlerle boğuşan tarafta da yer aldım.
            </p>
          </section>

          {/* Bu proje neden var? */}
          <section>
            <h2
              style={{
                fontFamily: "Poppins,system-ui",
                fontSize: 18,
                margin: "0 0 6px",
              }}
            >
              Kariyer Rotası neden var?
            </h2>
            <p className="p">
              Kariyerimin ilk yıllarında kaliteli, Türkçe ve gerçekten{" "}
              <b>“uygulanabilir”</b> içerik bulmakta zorlandım. 8D, FMEA, SPC, ISO maddeleri,
              iç denetimler… Çoğu kaynak ya çok teorikti ya da gerçek hayatla bağlantısı zayıftı.
            </p>
            <p className="p">
              <b>Kariyer Rotası</b>, tam da bu yüzden var. Bu projeyle;
            </p>
            <ul className="p" style={{ paddingLeft: 18, marginTop: 4 }}>
              <li>
                Mühendis ve kalite profesyonellerine sade, örneklerle dolu kalite rehberleri sunmak,
              </li>
              <li>
                Yapay zekâ ve dijital araçlarla işini hızlandırmak isteyenlere pratik kullanım
                senaryoları göstermek,
              </li>
              <li>Kariyerinin ilk yıllarındaki kişilere yön çizen içerikler hazırlamak</li>
            </ul>
            <p className="p" style={{ marginTop: 4 }}>
              istiyorum. Buradaki her yazı, “okuyup kapatma” değil; <b>“okuyup uygulama”</b>
              odaklı.
            </p>
          </section>

          {/* İlgi alanlarım & başka projeler */}
          <section>
            <h2
              style={{
                fontFamily: "Poppins,system-ui",
                fontSize: 18,
                margin: "0 0 6px",
              }}
            >
              İlgi alanlarım ve yan projelerim
            </h2>
            <p className="p">
              Son yıllarda özellikle <b>yapay zekâ</b> ve <b>3D yazıcı teknolojilerine</b> odaklandım.
              “EDU 3D Model Dünyası” adını verdiğim projeyle hem eğitim hem de 3D model üretimi
              tarafında içerikler üretiyorum.
            </p>
            <p className="p">
              Aynı zamanda iş hayatında kullanılan süreçleri; yazılım, otomasyon ve yapay zekâ
              araçlarıyla daha akıllı hale getirme fikrine kafayı takmış durumdayım. Kariyer Rotası
              da bu bakış açısının bir yansıması.
            </p>
          </section>

          {/* Sen bu siteden ne kazanacaksın? */}
          <section>
            <h2
              style={{
                fontFamily: "Poppins,system-ui",
                fontSize: 18,
                margin: "0 0 6px",
              }}
            >
              Bu siteden ne kazanacaksın?
            </h2>
            <p className="p">
              Eğer bu satırları okuyorsan muhtemelen;
            </p>
            <ul className="p" style={{ paddingLeft: 18, marginTop: 4 }}>
              <li>Kalite yönetimi ve mühendislik tarafında daha sistemli çalışmak,</li>
              <li>Yapay zekâyı günlük işlerine entegre etmek,</li>
              <li>Kariyerinin ilk yıllarında daha az hata yapıp daha hızlı ilerlemek</li>
            </ul>
            <p className="p" style={{ marginTop: 4 }}>
              istiyorsun. Bu sitede bulacakların kısaca:
            </p>
            <ul className="p" style={{ paddingLeft: 18, marginTop: 4 }}>
              <li>
                <b>Kalite Yönetimi Rehberleri:</b> 8D, FMEA, iç denetim, ISO maddeleri için
                basitleştirilmiş anlatımlar ve şablonlar.
              </li>
              <li>
                <b>Kariyer Yazıları:</b> mülakat, CV, LinkedIn, iş hayatında iletişim.
              </li>
              <li>
                <b>Yapay Zekâ & Teknoloji:</b> ChatGPT, otomasyon ve verimlilik araçlarıyla ilgili
                uygulamalı örnekler.
              </li>
              <li>
                <b>Verimlilik:</b> zaman yönetimi, odaklanma ve sistem kurma üzerine pratik öneriler.
              </li>
            </ul>
          </section>
        </div>

        {/* SAĞ BLOK – KART + ÖZET */}
        <aside>
          <div className="card" style={{ maxWidth: 420, marginLeft: "auto" }}>
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop"
              alt="Uğur Kapancı"
              style={{ width: "100%", borderRadius: 12 }}
            />
            <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>Fotoğraf (temsili)</div>

            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid #e5e7eb",
                fontSize: 14,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Kısaca ben</div>
              <ul style={{ paddingLeft: 18, margin: 0, color: "#4b5563" }}>
                <li>Elektrik–Elektronik Mühendisi</li>
                <li>Kalite yönetim sistemleriyle çalışan bir mühendis</li>
                <li>Yapay zekâ, 3D yazıcı ve verimlilik meraklısı</li>
              </ul>
            </div>

            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid #e5e7eb",
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14 }}>Buradan devam etmek istersen:</div>
              <a href="/blog" className="btn" style={{ textAlign: "center" }}>
                Blog yazılarını incele →
              </a>
              <a href="/kaynaklar" className="btn btn-ghost" style={{ textAlign: "center" }}>
                Ücretsiz şablonları gör →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </>
  );
}
