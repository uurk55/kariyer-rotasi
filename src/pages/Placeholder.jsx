import React from "react";

export default function Placeholder({ title }) {
  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ fontFamily: "Poppins,system-ui", margin: "0 0 8px" }}>{title}</h2>
      <p className="p">İçerik yakında.</p>
    </div>
  );
}
