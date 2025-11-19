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
  filterCss = "none",
  filterEffects = null,
  className = "",
  onRetakeStart = null,
  onRetakeComplete = null,
}) {
  const canRetake = photos.some(Boolean);
  const { startCountdown } = useTimer();
  const countdownValue =
    typeof countdownSeconds === "number"
      ? countdownSeconds
      : getTimerSeconds();

  const executeRetake = () => {
    if (!setPhotos) return;
    const dataUrl = captureFrame(videoRef, filterCss, filterEffects);
    if (!dataUrl) return;

    setPhotos((prev) => replaceLastFilledSlot(prev, dataUrl));
    if (typeof onRetakeComplete === "function") onRetakeComplete();
  };

  const handleRetake = () => {
    if (!canRetake) return;
    if (typeof onRetakeStart === "function") onRetakeStart();
    if (startCountdown) startCountdown(executeRetake, countdownValue);
    else executeRetake();
  };

  return (
    <button
      type="button"
      onClick={handleRetake}
      disabled={!canRetake}
      className={`booth-control-button right-4 bg-red-100/60 outline-red-100 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <RotateCcw className="text-red-500" />
    </button>
  );
}
