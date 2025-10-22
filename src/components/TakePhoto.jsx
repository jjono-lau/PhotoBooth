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
      className={`rounded-full bg-blue-300/60 hover:bg-blue-200 p-3 outline-2 outline-blue-300 ${className}`}
    >
      <Camera className="h-6 w-6 text-blue-700" />
    </button>
  );
}
