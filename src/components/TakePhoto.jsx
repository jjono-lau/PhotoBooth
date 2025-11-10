import { Camera } from "lucide-react";
import { captureFrame } from "../utils/captureFrame.js";

export default function TakePhoto({
  videoRef,
  onCapture,
  disabled = false,
  className = "",
}) {
  const capture = () => {
    if (disabled) return;
    const dataUrl = captureFrame(videoRef);
    if (onCapture) onCapture(dataUrl);
  };

  return (
    <button
      type="button"
      onClick={capture}
      disabled={disabled}
      className={`rounded-full bg-blue-300/60 hover:bg-blue-200 p-3 outline-2 outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Camera className="text-blue-700" />
    </button>
  );
}
