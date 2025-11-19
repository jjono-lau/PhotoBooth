import { Camera } from "lucide-react";
import { captureFrame } from "../utils/captureFrame.js";
import { getTimerSeconds } from "../utils/timerConfig.js";
import { useTimer } from "./Timer.jsx";

export default function TakePhoto({
  videoRef,
  onCapture,
  countdownSeconds,
  filterCss = "none",
  filterEffects = null,
  disabled = false,
  className = "",
  onBeforeCapture = null,
}) {
  const { startCountdown } = useTimer();
  const countdownValue =
    typeof countdownSeconds === "number"
      ? countdownSeconds
      : getTimerSeconds();

  const capture = () => {
    const dataUrl = captureFrame(videoRef, filterCss, filterEffects);
    if (onCapture) onCapture(dataUrl);
  };

  const handleClick = () => {
    if (disabled) return;
    if (typeof onBeforeCapture === "function") onBeforeCapture();
    if (startCountdown) startCountdown(capture, countdownValue);
    else capture();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`booth-control-button bg-blue-300/60 hover:bg-blue-200 outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Camera className="text-blue-700" />
    </button>
  );
}
