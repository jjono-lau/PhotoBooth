// Component: CameraView
// Purpose: Display live video feed from user's camera

import { useEffect, useRef } from "react";

function CameraView() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }
    startCamera();
  }, []);

  // Transform - scaleX(-1) mirrors the output. Remove to unmirror.
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="h-full w-auto  object-cover"
    />
  );
}

export default CameraView;
