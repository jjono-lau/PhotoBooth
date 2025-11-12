import { useEffect } from "react";
import { X } from "lucide-react";

export default function ColorPicker({
  value = "#ffffff",
  title = "Pick a color",
  description = "Use the picker or enter a hex value.",
  onChange,
  onClose,
}) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const colorValue = value || "#ffffff";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close color picker"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <input
          type="color"
          value={colorValue}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-36 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="font-mono text-xl font-semibold text-slate-800">
            {colorValue?.toUpperCase()}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
