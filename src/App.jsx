// App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PhotoBoothPage from "./pages/PhotoBoothPage.jsx";
import HeroPage from "./pages/Hero.jsx";
import PhotoEditPage from "./pages/PhotoEditPage.jsx";
import { stopCameraStream } from "./utils/cameraManager.js";
import { GlobalFilters } from "./components/GlobalFilters.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/booth") {
      stopCameraStream();
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/booth" element={<PhotoBoothPage />} />
        <Route path="/edit" element={<PhotoEditPage />} />
      </Routes>
      <GlobalFilters />
    </>
  );
}
