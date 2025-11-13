// src/components/Seo.jsx
import { useEffect } from "react";

export default function Seo({ title, description, type = "website", image, url }) {
  useEffect(() => {
    // TITLE
    if (title) {
      document.title = title;
    }

    // DESCRIPTION
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    const currentUrl = url || window.location.href;

    // OG title
    if (title) {
      setMetaProperty("og:title", title);
      setMetaProperty("twitter:title", title);
    }
    // OG description
    if (description) {
      setMetaProperty("og:description", description);
      setMetaProperty("twitter:description", description);
    }
    // type
    setMetaProperty("og:type", type);
    // url
    setMetaProperty("og:url", currentUrl);

    // image (opsiyonel)
    if (image) {
      setMetaProperty("og:image", image);
      setMetaProperty("twitter:image", image);
    }
  }, [title, description, type, image, url]);

  return null;
}

function setMetaProperty(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
