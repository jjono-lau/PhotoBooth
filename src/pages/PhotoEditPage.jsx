import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLinks from "../components/PageLinks";
import PhotoStrips from "../components/PhotoStrip.jsx";
import FrameEditor from "../components/FrameEditor.jsx";
import TextEditor from "../components/TextEditor.jsx";
import DownloadButton from "../components/Download.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import {
  FRAME_TYPES,
  FRAME_COLORS,
  getFrameTypeConfig,
  getFrameColorConfig,
} from "../utils/frameFilters.js";
import {
  FRAME_TEXT_STYLES,
  FRAME_TEXT_COLORS,
  getFrameTextStyle,
  getFrameTextColor,
} from "../utils/frameTextOptions.js";
import { createPhotoSlots } from "../utils/photoCounter.js";

const DEFAULT_SHADOW = "0 18px 44px rgba(15, 23, 42, 0.25)";

function hexToRgba(hex, alpha = 1) {
  let sanitized = hex?.replace("#", "");
  if (sanitized?.length === 3) {
    sanitized = sanitized
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!sanitized || sanitized.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function PhotoEditPage() {
  const location = useLocation();
  const framePreviewRef = useRef(null);
  const photos = useMemo(() => {
    if (Array.isArray(location.state?.photos)) {
      return location.state.photos;
    }
    return createPhotoSlots();
  }, [location.state]);
  const [selectedFrameType, setSelectedFrameType] = useState(FRAME_TYPES[0].id);
  const [selectedFrameColor, setSelectedFrameColor] = useState(
    FRAME_COLORS[0].id
  );
  const [customFrameColor, setCustomFrameColor] = useState(
    FRAME_COLORS[0].backgroundColor
  );
  const [isFrameColorPickerOpen, setFrameColorPickerOpen] = useState(false);
  const [frameText, setFrameText] = useState("");
  const [selectedTextStyle, setSelectedTextStyle] = useState(
    FRAME_TEXT_STYLES[0].id
  );
  const [selectedTextColor, setSelectedTextColor] = useState(
    FRAME_TEXT_COLORS[0].id
  );
  const [customTextColor, setCustomTextColor] = useState(
    FRAME_TEXT_COLORS[0].value
  );
  const [isTextColorPickerOpen, setTextColorPickerOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(500);
  const [isItalic, setIsItalic] = useState(false);
  const [topAdjust, setTopAdjust] = useState(0);
  const [bottomAdjust, setBottomAdjust] = useState(0);

  const frameTypeConfig = useMemo(
    () => getFrameTypeConfig(selectedFrameType),
    [selectedFrameType]
  );

  useEffect(() => {
    setTopAdjust(0);
    setBottomAdjust(0);
  }, [selectedFrameType]);

  const frameColorConfig = useMemo(() => {
    if (selectedFrameColor === "custom") {
      const fallback = customFrameColor || "#ffffff";
      return {
        backgroundColor: fallback,
        borderColor: fallback,
        borderWidth: 3,
        borderRadius: 2,
        shadow: `0 18px 44px ${hexToRgba(fallback, 0.35)}`,
      };
    }
    return getFrameColorConfig(selectedFrameColor);
  }, [selectedFrameColor, customFrameColor]);

  const { adjustedPadding, fontSizeLimit } = useMemo(() => {
    const padding = { ...frameTypeConfig.padding };
    let extraSpace = 0;
    if (frameTypeConfig.adjustable?.top) {
      const { min, max } = frameTypeConfig.adjustable.top;
      const clamped = Math.min(max, Math.max(min, topAdjust));
      padding.top = Math.max(4, padding.top + clamped);
      extraSpace += Math.max(0, clamped);
    }
    if (frameTypeConfig.adjustable?.bottom) {
      const { min, max } = frameTypeConfig.adjustable.bottom;
      const clamped = Math.min(max, Math.max(min, bottomAdjust));
      padding.bottom = Math.max(4, padding.bottom + clamped);
      extraSpace += Math.max(0, clamped);
    }

    const baseFontLimit =
      frameTypeConfig.id === "classic-even" ? 60 : 100 + extraSpace * 0.3;

    return {
      adjustedPadding: padding,
      fontSizeLimit: baseFontLimit,
    };
  }, [frameTypeConfig, topAdjust, bottomAdjust]);

  const frameStyle = useMemo(() => {
    return {
      backgroundColor: frameColorConfig.backgroundColor,
      borderColor: frameColorConfig.borderColor,
      borderWidth: `${frameTypeConfig.borderWidth}px`,
      borderRadius: `${frameTypeConfig.borderRadius}px`,
      boxShadow: frameColorConfig.shadow ?? DEFAULT_SHADOW,
      paddingTop: `${adjustedPadding.top}px`,
      paddingRight: `${adjustedPadding.right}px`,
      paddingBottom: `${adjustedPadding.bottom}px`,
      paddingLeft: `${adjustedPadding.left}px`,
    };
  }, [frameColorConfig, frameTypeConfig, adjustedPadding]);

  const textColorValue = useMemo(() => {
    if (selectedTextColor === "custom") {
      return customTextColor;
    }
    return getFrameTextColor(selectedTextColor).value;
  }, [selectedTextColor, customTextColor]);

  const trimmedUserText = frameText.trim();
  const allowFrameText = selectedFrameType !== "classic-even";
  const displayText = allowFrameText ? trimmedUserText : "";

  const fontSliderMax = Math.max(140, Math.round(fontSizeLimit));

  useEffect(() => {
    setFontSize((size) => Math.min(size, fontSliderMax));
  }, [fontSliderMax]);

  const computedFontSize = useMemo(() => {
    if (!displayText) return Math.min(fontSize, fontSliderMax);
    return Math.min(fontSize, fontSliderMax);
  }, [displayText, fontSize, fontSliderMax]);

  const frameTextStyle = useMemo(() => {
    const textConfig = getFrameTextStyle(selectedTextStyle);
    return {
      fontFamily: textConfig.fontFamily,
      textTransform: textConfig.textTransform ?? "none",
      letterSpacing: textConfig.letterSpacing ?? "normal",
      fontSize: `${computedFontSize}px`,
      fontWeight,
      fontStyle: isItalic ? "italic" : "normal",
      color: textColorValue,
      maxWidth: "100%",
      wordBreak: "break-word",
      display: "inline-block",
      paddingInline: "1px",
      boxSizing: "border-box",
      lineHeight: 1.05,
      overflow: "visible",
    };
  }, [
    selectedTextStyle,
    computedFontSize,
    fontWeight,
    isItalic,
    textColorValue,
  ]);

  const trimmedText = displayText;
  const textPlacement = frameTypeConfig.textPosition ?? "bottom";
  const showTopText = trimmedText && textPlacement === "top";
  const showBottomText = trimmedText && textPlacement === "bottom";

  const handleCustomFrameColorChange = (hex) => {
    if (!hex) return;
    setCustomFrameColor(hex);
    setSelectedFrameColor("custom");
  };

  const handleCustomTextColorChange = (hex) => {
    if (!hex) return;
    setCustomTextColor(hex);
    setSelectedTextColor("custom");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
        <section className="flex-1 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Edit
            </p>
            <h1 className="text-4xl font-semibold text-slate-800">
              Customize your strip
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Pick a photo booth frame color and we will apply it to your
              captured strip.
            </p>
          </div>

          <FrameEditor
            selectedFrameType={selectedFrameType}
            onFrameTypeChange={setSelectedFrameType}
            topAdjust={topAdjust}
            onTopAdjustChange={setTopAdjust}
            bottomAdjust={bottomAdjust}
            onBottomAdjustChange={setBottomAdjust}
            selectedFrameColor={selectedFrameColor}
            onFrameColorChange={setSelectedFrameColor}
            customFrameColor={customFrameColor}
            onCustomFrameColorClick={() => setFrameColorPickerOpen(true)}
          />

          {allowFrameText ? (
            <TextEditor
              frameText={frameText}
              onFrameTextChange={setFrameText}
              selectedTextStyle={selectedTextStyle}
              onTextStyleChange={setSelectedTextStyle}
              selectedTextColor={selectedTextColor}
              onTextColorChange={setSelectedTextColor}
              customTextColor={customTextColor}
              onCustomTextColorClick={() => setTextColorPickerOpen(true)}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              fontSliderMax={fontSliderMax}
              fontWeight={fontWeight}
              onFontWeightChange={setFontWeight}
              isItalic={isItalic}
              onItalicToggle={setIsItalic}
            />
          ) : null}

          <div className="flex flex-wrap gap-4">
            <PageLinks to="/" variant="blue" className="px-6 py-3 font-semibold">
              Home
            </PageLinks>
            <PageLinks to="/booth" variant="red" className="px-6 py-3 font-semibold">
              Back to Booth
            </PageLinks>
            <PageLinks to="/edit" variant="purple" className="px-6 py-3 font-semibold">
              Go to Photo Editor
            </PageLinks>
            <DownloadButton targetRef={framePreviewRef} />
          </div>
        </section>

        <section className="flex w-full justify-center lg:w-auto items-start">
          <div
            className="relative inline-block transition-all duration-300"
            style={frameStyle}
            ref={framePreviewRef}
          >
            <PhotoStrips photos={photos} className="h-120 w-40 bg-transparent" />

            {showTopText ? (
              <div className="pointer-events-none absolute inset-x-1 top-1 flex justify-center px-1 text-center">
                <span style={frameTextStyle}>{trimmedText}</span>
              </div>
            ) : null}

            {showBottomText ? (
              <div className="pointer-events-none absolute inset-x-1 bottom-2 flex justify-center px-1 text-center">
                <span style={frameTextStyle}>{trimmedText}</span>
              </div>
            ) : null}
          </div>
        </section>
      </div>
      {isFrameColorPickerOpen ? (
        <ColorPicker
          title="Custom frame color"
          description="Applies to the frame border and background."
          value={customFrameColor}
          onChange={handleCustomFrameColorChange}
          onClose={() => setFrameColorPickerOpen(false)}
        />
      ) : null}

      {isTextColorPickerOpen ? (
        <ColorPicker
          title="Custom text color"
          description="Pick any colour for your caption text."
          value={customTextColor}
          onChange={handleCustomTextColorChange}
          onClose={() => setTextColorPickerOpen(false)}
        />
      ) : null}
    </div>
  );
}
