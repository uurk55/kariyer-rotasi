import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/kaynaklar" element={<Resources />} />
          <Route path="/hakkimda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Placeholder title="Sayfa bulunamadı" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
