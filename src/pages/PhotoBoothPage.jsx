// PhotoBoothPage.jsx
// Displays live camera view on the left and four panels for the photos on the right.

import { useRef, useState } from "react";
import { Camera, RotateCcw, SlidersHorizontal } from "lucide-react";
import CameraView from "../components/CameraView.jsx";
import TakePhoto from "../components/TakePhoto.jsx";
import PageLinks from "../components/PageLinks";
import PhotoStrips from "../components/PhotoStrip.jsx";

export default function PhotoBoothPage() {
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState(Array(4).fill(null));

  const handleCapture = (dataUrl) => {
    if (!dataUrl) return;
    setPhotos((prev) => {
      const next = [...prev];
      const emptyIndex = next.findIndex((slot) => slot === null);
      if (emptyIndex === -1) {
        next.shift();
        next.push(dataUrl);
      } else {
        next[emptyIndex] = dataUrl;
      }
      return next;
    });
  };

  return (
    <div className="grid place-items-center min-h-screen">
      {/* Full-page layout: centered container with two columns */}
      {/* w-194 is 48.5rem which is w-150 + w-40 + gap-4 calcaultion */}
      <div className="flex items-center justify-center w-194 m-2 gap-4 ">
        {/* Left column: camera preview area (up to 80% width) */}
        <div className="relative h-120 w-150 flex-none overflow-hidden bg-gray-400 max-w-[80%]">

          <CameraView videoRef={videoRef} />

          <button
            type="button"
            className="left-4 bg-purple-300/60 hover:bg-purple-200 outline-purple-300"
          >
            <SlidersHorizontal className="text-purple-600" />
          </button>

          <TakePhoto
            videoRef={videoRef}
            onCapture={handleCapture}
            className="left-1/2 -translate-x-1/2 "
          />

          <button
            type="button"
            className="right-4 bg-red-100/60 hover:bg-red-200 outline-red-100"
          >
            <RotateCcw className="text-red-500" />
          </button>
          
        </div>

        <PhotoStrips photos={photos} className="h-120 w-40" />
      </div>

      {/* Bottom row: capture button, counter, and navigation links */}
      <div className="flex items-center justify-center w-194 m-2 gap-4">
        <PageLinks
          to="/"
          variant="blue"
          className="flex-1 min-w-[140px] px-4 py-2 text-center font-semibold"
        >
          Go to Home Page
        </PageLinks>

        <PageLinks
          to="/booth"
          variant="red"
          className="flex-1 min-w-[140px] px-4 py-2 text-center font-semibold"
        >
          Go to Photo Booth
        </PageLinks>

        <PageLinks
          to="/edit"
          variant="purple"
          className="flex-1 min-w-[140px] px-4 py-2 text-center font-semibold"
        >
          Go to Photo Editor
        </PageLinks>
      </div>
    </div>
  );
}
