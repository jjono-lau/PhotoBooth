import { Camera } from "lucide-react";

export default function TakePhoto({ videoRef, onCapture, className = "" }) {
  const capture = () => {
    const v = videoRef?.current;
    if (!v) return;
    const { videoWidth: w, videoHeight: h } = v;

    if (!w || !h) return;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    // Mirror so saved image matches mirrored preview
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(v, 0, 0, w, h);

    const dataUrl = canvas.toDataURL("image/png");
    if (onCapture) onCapture(dataUrl);
  };

  return (
    <button
      type="button"
      onClick={capture}
      className={`flex items-center justify-center gap-2 rounded bg-blue-400 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-500 ${className}`}
    >
      <Camera className="h-5 w-5" />
      Capture
    </button>
  );
}
