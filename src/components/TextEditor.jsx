import CustomDropDown from "./CustomDropDown.jsx";
import FontPreview from "./FontPreview.jsx";
import {
  FRAME_TEXT_STYLES,
  FRAME_TEXT_COLORS,
} from "../utils/frameTextOptions.js";

export default function TextEditor({
  frameText,
  onFrameTextChange,
  selectedTextStyle,
  onTextStyleChange,
  selectedTextColor,
  onTextColorChange,
  fontSize,
  onFontSizeChange,
  fontSliderMax,
  fontWeight,
  onFontWeightChange,
  isItalic,
  onItalicToggle,
  className = "",
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-700">Frame Text</h2>
        <span className="text-xs text-slate-400">
          Placement matches the chosen frame layout
        </span>
      </div>

      <input
        type="text"
        maxLength={40}
        value={frameText}
        onChange={(event) => onFrameTextChange?.(event.target.value)}
        placeholder="Type an optional booth caption…"
        className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
      />

      <CustomDropDown
        label="Font Styles"
        options={FRAME_TEXT_STYLES}
        selectedId={selectedTextStyle}
        onSelect={onTextStyleChange}
        placeholder="Choose a font style"
        menuClassName="max-h-96"
        renderTrigger={(style) =>
          style ? (
            <div className="flex min-h-[2.5rem] items-center overflow-hidden">
              <span
                className=" text-xl font-semibold leading-tight text-slate-800"
                style={{
                  fontFamily: style.fontFamily,
                  lineHeight: "2.5rem",
                  ...(style.styleOverrides ?? {}),
                }}
              >
                {style.sample}
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">Choose a font style</span>
          )
        }
        renderOption={(style, { isActive }) => (
          <FontPreview
            text={style.sample}
            fontFamily={style.fontFamily}
            styleOverrides={style.styleOverrides}
            className={`${
              isActive ? "border-purple-400 bg-purple-50" : ""
            }`}
          />
        )}
      />

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-600">Text Colour</p>
        <div className="flex flex-wrap gap-3">
          {FRAME_TEXT_COLORS.map((color) => {
            const isActive = color.id === selectedTextColor;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onTextColorChange?.(color.id)}
                className={`flex flex-col items-center text-xs font-medium ${
                  isActive ? "text-slate-900" : "text-slate-500"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${
                    isActive
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
                {color.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Font Size <span className="font-semibold">{Math.round(fontSize)}px</span>
          <input
            type="range"
            min="12"
            max={fontSliderMax}
            value={fontSize}
            onChange={(event) =>
              onFontSizeChange?.(Number(event.target.value))
            }
            className="accent-purple-500"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Font Weight <span className="font-semibold">{fontWeight}</span>
          <input
            type="range"
            min="300"
            max="900"
            step="100"
            value={fontWeight}
            onChange={(event) =>
              onFontWeightChange?.(Number(event.target.value))
            }
            className="accent-purple-500"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            onFontWeightChange?.((weight) => (weight >= 700 ? 500 : 700))
          }
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            fontWeight >= 700
              ? "bg-purple-600 text-white"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          Bold Toggle
        </button>

        <button
          type="button"
          onClick={() => onItalicToggle?.((prev) => !prev)}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            isItalic ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
          }`}
        >
          Italic Toggle
        </button>
      </div>
    </div>
  );
}
