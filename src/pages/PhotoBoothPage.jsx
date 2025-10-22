// PhotoBoothPage.jsx
// Displays live camera view on the left and four panels for the photos on the right.

import { useRef, useState } from "react";
import { Camera, RotateCcw, SlidersHorizontal   } from "lucide-react";
import CameraView from "../components/CameraView.jsx";
import TakePhoto from "../components/TakePhoto.jsx";
import PageLinks from "../components/PageLinks";


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
      <div className="flex items-center justify-center w-194 m-2 gap-4 outline-1 outline-red-500 ">
        {/* Left column: camera preview area (up to 80% width) */}
        <div className="relative h-120 w-150 flex-none overflow-hidden bg-gray-400 max-w-[80%] outline-1">
          <CameraView videoRef={videoRef} />
            <button
            type="button"
            className="absolute bottom-4 left-4 rounded-full bg-purple-300/60 p-3 outline-2 outline-purple-300"
          >
            <SlidersHorizontal className="h-6 w-6 text-purple-600" />
          </button>
          
          <button
            type="button"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-300/60 p-3 outline-2 outline-blue-300"
          >
            <Camera className="h-6 w-6 text-blue-700" />
          </button>
          <button
            type="button"
            className="absolute bottom-4 right-4 rounded-full bg-red-100/60 p-3 outline-2 outline-red-100"
          >
            <RotateCcw className="h-6 w-6 text-red-500" />
          </button>
        </div>

        {/* Right column: 4 equal-height controls (20% width) */}
        <div className="h-120 flex flex-col outline outline-blue-500">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="h-30 w-40 flex-1 flex items-center justify-center outline outline-purple-500"
              >
                {photos[i] && (
                  <img
                    src={photos[i]}
                    alt={`Capture ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Bottom row: capture button, counter, and navigation links */}
      <div className="flex items-center justify-center w-194 m-2 gap-4 outline-1 outline-red-500">
        <TakePhoto
          videoRef={videoRef}
          onCapture={handleCapture}
          className="flex-1 min-w-[140px]"
        />

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
