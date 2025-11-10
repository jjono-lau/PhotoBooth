import { Camera } from "lucide-react";
import { captureFrame } from "../utils/captureFrame.js";
import { getTimerSeconds } from "../utils/timerConfig.js";
import { useTimer } from "./Timer.jsx";

export default function TakePhoto({
  videoRef,
  onCapture,
  countdownSeconds,
  disabled = false,
  className = "",
}) {
  const { startCountdown } = useTimer();
  const countdownValue =
    typeof countdownSeconds === "number"
      ? countdownSeconds
      : getTimerSeconds();

  const capture = () => {
    const dataUrl = captureFrame(videoRef);
    if (onCapture) onCapture(dataUrl);
  };

  const handleClick = () => {
    if (disabled) return;
    if (startCountdown) startCountdown(capture, countdownValue);
    else capture();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-full bg-blue-300/60 hover:bg-blue-200 p-3 outline-2 outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Camera className="text-blue-700" />
    </button>
  );
}
