// PhotoBoothPage.jsx
// Displays live camera view on the left and four panels on the right.

import { useRef, useState } from "react";
// import { captureCounter } from "../utils/Captures.js";
import CameraView from "../components/CameraView.jsx";
import TakePhoto from "../components/TakePhoto.jsx";
import PageLinks from "../components/PageLinks";

// const counter = captureCounter(4);

export default function PhotoBoothPage() {
  const videoRef = useRef(null);
  // const [counterValue, setCounterValue] = useState(0);
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
    // Full-page layout: centered container with two columns
    <>
      <div className="flex items-center justify-center min-h-screen">
        {/* Left column: camera preview area (up to 80% width) */}
        <div className="h-120 flex-none overflow-hidden bg-gray-400 max-w-[80%]">
          <CameraView videoRef={videoRef} />
        </div>

        {/* Right column: 4 equal-height controls (20% width) */}
        <div className="h-120 w-1/5 flex flex-col">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="h-30 w-40 flex-1 flex items-center justify-center"
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
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
        <TakePhoto
          videoRef={videoRef}
          onCapture={handleCapture}
          className="flex-1 min-w-[140px]"
        />

        {/* <button
          type="button"
          className="flex-1 min-w-[140px] rounded border border-green-400 bg-green-300 px-4 py-2 font-semibold text-slate-900 transition hover:bg-green-400"
          onClick={() => setCounterValue(counter())}
        >
          count is {counterValue}
        </button> */}

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
    </>
  );
}
