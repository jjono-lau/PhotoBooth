import { RotateCcw } from "lucide-react";
import { captureFrame } from "../utils/captureFrame.js";
import { replaceLastFilledSlot } from "../utils/photoCounter.js";
import { getTimerSeconds } from "../utils/timerConfig.js";
import { useTimer } from "./Timer.jsx";

export default function RetakePhoto({
  videoRef,
  photos = [],
  setPhotos,
  countdownSeconds,
  className = "",
}) {
  const canRetake = photos.some(Boolean);
  const { startCountdown } = useTimer();
  const countdownValue =
    typeof countdownSeconds === "number"
      ? countdownSeconds
      : getTimerSeconds();

  const executeRetake = () => {
    if (!setPhotos) return;
    const dataUrl = captureFrame(videoRef);
    if (!dataUrl) return;

    setPhotos((prev) => replaceLastFilledSlot(prev, dataUrl));
  };

  const handleRetake = () => {
    if (!canRetake) return;
    if (startCountdown) startCountdown(executeRetake, countdownValue);
    else executeRetake();
  };

  return (
    <button
      type="button"
      onClick={handleRetake}
      disabled={!canRetake}
      className={`right-4 rounded-full bg-red-100/60 p-3 outline-2 outline-red-100 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <RotateCcw className="text-red-500" />
    </button>
  );
}
