import { useMemo } from "react";
import { Plus } from "lucide-react";
import {
  FRAME_TYPES,
  FRAME_COLORS,
  getFrameTypeConfig,
} from "../utils/frameFilters.js";

export default function FrameEditor({
  selectedFrameType,
  onFrameTypeChange,
  topAdjust,
  onTopAdjustChange,
  bottomAdjust,
  onBottomAdjustChange,
  selectedFrameColor,
  onFrameColorChange,
  onCustomFrameColorClick,
  customFrameColor = "#ffffff",
  className = "",
}) {
  const frameTypeConfig = useMemo(
    () => getFrameTypeConfig(selectedFrameType),
    [selectedFrameType]
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-700">
          Frame Layout
        </h2>

        <div className="grid gap-3 md:grid-cols-2">
          {FRAME_TYPES.map((frame) => {
            const isActive = frame.id === selectedFrameType;
            return (
              <button
                key={frame.id}
                type="button"
                onClick={() => onFrameTypeChange?.(frame.id)}
                className={`rounded-lg border p-4 text-left transition ${
                  isActive
                    ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                    : "border-slate-200 hover:border-purple-300"
                }`}
              >
                <p className="text-sm font-semibold text-slate-800">
                  {frame.label}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {frame.description}
                </p>
              </button>
            );
          })}

          {frameTypeConfig.adjustable ? (
            <div className="rounded-lg border border-slate-200 p-4 text-slate-700 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Frame Size</p>
              <div className="mt-4 space-y-4">
                {frameTypeConfig.adjustable.top ? (
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      Top Padding
                    </span>
                    <input
                      type="range"
                      min={frameTypeConfig.adjustable.top.min}
                      max={frameTypeConfig.adjustable.top.max}
                      value={topAdjust}
                      onChange={(event) =>
                        onTopAdjustChange?.(Number(event.target.value))
                      }
                      className="accent-purple-500"
                    />
                  </label>
                ) : null}

                {frameTypeConfig.adjustable.bottom ? (
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      Bottom Padding
                    </span>
                    <input
                      type="range"
                      min={frameTypeConfig.adjustable.bottom.min}
                      max={frameTypeConfig.adjustable.bottom.max}
                      value={bottomAdjust}
                      onChange={(event) =>
                        onBottomAdjustChange?.(Number(event.target.value))
                      }
                      className="accent-purple-500"
                    />
                  </label>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-700">
          Frame Colors
        </h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {FRAME_COLORS.map((palette) => {
            const isActive = palette.id === selectedFrameColor;
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => onFrameColorChange?.(palette.id)}
                className={`flex flex-col items-start gap-2 text-left text-xs font-medium ${
                  isActive ? "text-slate-900" : "text-slate-500"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                    isActive
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: palette.swatchColor,
                  }}
                />
                {palette.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              onFrameColorChange?.("custom");
              onCustomFrameColorClick?.();
            }}
            className={`flex flex-col items-start gap-2 text-left text-xs font-medium ${
              selectedFrameColor === "custom"
                ? "text-slate-900"
                : "text-slate-500"
            }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                selectedFrameColor === "custom"
                  ? "border-purple-500 ring-2 ring-purple-200"
                  : "border-dashed border-slate-300"
              }`}
              style={{ backgroundColor: customFrameColor }}
            >
              <Plus
                className={`h-5 w-5 ${
                  selectedFrameColor === "custom"
                    ? "text-white drop-shadow"
                    : "text-slate-600"
                }`}
              />
            </span>
            Custom
          </button>
        </div>
      </div>
    </div>
  );
}
