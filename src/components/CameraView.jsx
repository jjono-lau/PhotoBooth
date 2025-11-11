// Component: CameraView
// Purpose: Display live video feed from user's camera

import { useEffect, useMemo, useRef } from "react";
import {
  acquireCameraStream,
  stopCameraStream,
} from "../utils/cameraManager.js";

function CameraView({
  videoRef: externalRef,
  filterCss = "none",
  overlayClassName = "",
}) {
  const fallbackRef = useRef(null);
  const videoRef = useMemo(() => externalRef ?? fallbackRef, [externalRef]);

  useEffect(() => {
    let isMounted = true;

    async function startCamera() {
      try {
        const stream = await acquireCameraStream({ video: true });
        if (!isMounted) {
          stopCameraStream();
          return;
        }
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }
    startCamera();

    return () => {
      isMounted = false;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      stopCameraStream();
    };
  }, [videoRef]);

  // transform scale-x-[-1] mirrors the output. Remove to unmirror.
  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover transform scale-x-[-1]"
        style={{ filter: filterCss }}
      />

      {overlayClassName ? (
        <div className={`filter-overlay ${overlayClassName}`} />
      ) : null}
    </div>
  );
}

export default CameraView;
