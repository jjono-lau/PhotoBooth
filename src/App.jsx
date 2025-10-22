// App.jsx

import { Routes, Route, Link } from "react-router-dom";
import PhotoBoothPage from "./pages/PhotoBoothPage.jsx";
import HeroPage from "./pages/Hero.jsx";
import PhotoEditPage from "./pages/PhotoEditPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/booth" element={<PhotoBoothPage />} />
      <Route path="/edit" element={<PhotoEditPage />} />


    </Routes>
  );
}
