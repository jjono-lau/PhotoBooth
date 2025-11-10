// PhotoBoothPage.jsx
// Displays live camera view on the left and four panels for the photos on the right.

import { useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import CameraView from "../components/CameraView.jsx";
import TakePhoto from "../components/TakePhoto.jsx";
import PageLinks from "../components/PageLinks";
import PhotoStrips from "../components/PhotoStrip.jsx";
import RetakePhoto from "../components/RetakePhoto.jsx";
import TimerProvider, { TimerOverlay } from "../components/Timer.jsx";
import {
  createPhotoSlots,
  addPhotoToSlots,
  hasEmptySlot,
} from "../utils/photoCounter.js";

export default function PhotoBoothPage() {
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState(() => createPhotoSlots());

  const handleCapture = (dataUrl) => {
    if (!dataUrl) return;
    setPhotos((prev) => addPhotoToSlots(prev, dataUrl));
  };

  const canCapture = hasEmptySlot(photos);

  return (
    <div className="grid place-items-center min-h-screen">
      {/* Full-page layout: centered container with two columns */}
      {/* w-194 is 48.5rem which is w-150 + w-40 + gap-4 calcaultion */}
      <div className="flex items-center justify-center w-194 m-2 gap-4 ">
        {/* Left column: camera preview area (up to 80% width) */}
        <TimerProvider>
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
              disabled={!canCapture}
              className="left-1/2 -translate-x-1/2 "
            />

            <RetakePhoto
              videoRef={videoRef}
              photos={photos}
              setPhotos={setPhotos}
            />

            <TimerOverlay />
          </div>
        </TimerProvider>

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
