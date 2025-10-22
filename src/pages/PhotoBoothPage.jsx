// PhotoBoothPage.jsx
// Displays live camera view on the left and four panels on the right.

import { useState } from "react";
import { captureCounter } from "../utils/Captures.js";
import CameraView from "../components/CameraView.jsx";
import  PageLinks  from "../components/PageLinks";

const counter = captureCounter(4);

export default function PhotoBoothPage() {
  const [captures, setCaptures] = useState(0);

  return (
    // Full-page layout: centered container with two columns
    <div className="flex items-center justify-center min-h-screen">

      {/* Left column: camera preview area (up to 80% width) */}
      <div className="h-100 flex-none overflow-hidden bg-gray-400 max-w-[80%]">
        <CameraView />
      </div>

      {/* Right column: 4 equal-height controls (20% width) */}
      <div className="h-100 w-1/5 flex flex-col ">
        
        {/* Counter button – cycles values 1–4 */}
        <button
          className="flex-1 bg-green-300 hover:bg-green-400"
          onClick={() => setCaptures(counter())}
        >
          count is {captures}
        </button>

        {/* Navigation and placeholder control links */}
      <div className="flex-1 flex items-center justify-center bg-blue-500"><PageLinks to="/" variant="blue">Go to Home Page</PageLinks></div>

      <div className="flex-1 flex items-center justify-center bg-red-500"><PageLinks to="/booth" variant="red">Go to Photo Booth</PageLinks></div>

        <div className="flex-1 flex items-center justify-center bg-purple-500"><PageLinks to="/edit" variant="purple">Go to Photo Editor</PageLinks></div>
      </div>
    </div>
  );
}
