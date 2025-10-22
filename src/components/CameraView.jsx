// Component: CameraView
// Purpose: Display live video feed from user's camera

import { useEffect, useMemo, useRef } from "react";

function CameraView({ videoRef: externalRef }) {
  const fallbackRef = useRef(null);
  const videoRef = useMemo(() => externalRef ?? fallbackRef, [externalRef]);

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
  }, [videoRef]);

  // transform scale-x-[-1] mirrors the output. Remove to unmirror.
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="h-full w-auto  object-cover transform scale-x-[-1]"
    />
  );
}

export default CameraView;
