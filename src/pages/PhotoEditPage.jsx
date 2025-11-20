import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Eye } from "lucide-react";
import PageLinks from "../components/PageLinks";
import PhotoStrips from "../components/PhotoStrip.jsx";
import { FrameLayoutSection, FrameColorSection } from "../components/FrameEditor.jsx";
import { TextContentSection, TextStyleSection } from "../components/TextEditor.jsx";
import DownloadButton from "../components/Download.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import Blur from "../components/Blur.jsx";
import PhotoEditDropDown, { PhotoEditDropDownItem } from "../components/PhotoEditDropDown.jsx";
import StripPreviewModal from "../components/StripPreviewModal.jsx";
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
import pb3 from "../assets/pb3.png";

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
  const [frameText, setFrameText] = useState({ line1: "", line2: "", line3: "" });
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("layout");
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

  const trimmedUserText = useMemo(() => {
    const lines = [frameText.line1, frameText.line2, frameText.line3]
      .map((line) => line?.trim())
      .filter(Boolean);
    return lines.join("\n");
  }, [frameText]);

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
      lineHeight: 1.2,
      overflow: "visible",
      whiteSpace: "pre-wrap",
      textAlign: "center",
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
    <>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center bg-repeat px-4 py-8"
        style={{ backgroundImage: `url(${pb3})` }}
      >
        {/* Preview Button - Mobile Only */}
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="fixed top-4 right-4 z-50 flex items-center rounded-full bg-purple-500 px-4 py-2 text-white shadow-xl transition hover:bg-purple-600 hover:scale-105 lg:hidden"
          aria-label="Preview photo strip"
        >
          <Eye className="h-5 w-5" />
          <span className="ml-2 font-semibold">Preview</span>
        </button>

        <Blur className="w-full max-w-6xl text-white" paddingClass="px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
            {/* Photo Strip Preview */}
            <div className="relative flex w-full flex-none items-center justify-center hidden lg:block lg:w-auto lg:max-w-none">
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
            </div>

            {/* Editor Controls */}
            <div className="flex w-full flex-col gap-6 lg:flex-1">
              <div className="rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-sm">
                <div className="mb-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-500">
                    Edit
                  </p>
                  <h1 className="text-3xl font-black text-slate-800">
                    Customize your strip
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    Pick a photo booth frame color and add custom text to your strip.
                  </p>
                </div>

                <div className="space-y-6">
                  <PhotoEditDropDown>
                    <PhotoEditDropDownItem
                      title="Frame Layout"
                      isOpen={activeSection === "layout"}
                      onToggle={() => setActiveSection(activeSection === "layout" ? null : "layout")}
                    >
                      <FrameLayoutSection
                        selectedFrameType={selectedFrameType}
                        onFrameTypeChange={setSelectedFrameType}
                        topAdjust={topAdjust}
                        onTopAdjustChange={setTopAdjust}
                        bottomAdjust={bottomAdjust}
                        onBottomAdjustChange={setBottomAdjust}
                      />
                    </PhotoEditDropDownItem>

                    <PhotoEditDropDownItem
                      title="Frame Colors"
                      isOpen={activeSection === "colors"}
                      onToggle={() => setActiveSection(activeSection === "colors" ? null : "colors")}
                    >
                      <FrameColorSection
                        selectedFrameColor={selectedFrameColor}
                        onFrameColorChange={setSelectedFrameColor}
                        customFrameColor={customFrameColor}
                        onCustomFrameColorClick={() => setFrameColorPickerOpen(true)}
                      />
                    </PhotoEditDropDownItem>

                    {allowFrameText && (
                      <>
                        <PhotoEditDropDownItem
                          title="Text Content"
                          isOpen={activeSection === "textContent"}
                          onToggle={() => setActiveSection(activeSection === "textContent" ? null : "textContent")}
                        >
                          <TextContentSection
                            frameText={frameText}
                            onFrameTextChange={setFrameText}
                            selectedTextStyle={selectedTextStyle}
                            onTextStyleChange={setSelectedTextStyle}
                          />
                        </PhotoEditDropDownItem>

                        <PhotoEditDropDownItem
                          title="Text Style"
                          isOpen={activeSection === "textStyle"}
                          onToggle={() => setActiveSection(activeSection === "textStyle" ? null : "textStyle")}
                        >
                          <TextStyleSection
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
                        </PhotoEditDropDownItem>
                      </>
                    )}
                  </PhotoEditDropDown>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <PageLinks
                  to="/"
                  variant="blue"
                  className="flex-1 px-4 py-2 text-center font-semibold"
                >
                  Home
                </PageLinks>

                <PageLinks
                  to="/booth"
                  variant="red"
                  className="flex-1 px-4 py-2 text-center font-semibold"
                >
                  New Photo
                </PageLinks>

                <DownloadButton
                  targetRef={framePreviewRef}
                  className="flex-1 px-4 py-2"
                />
              </div>
            </div>
          </div>
        </Blur>
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

      {/* Strip Preview Modal */}
      <StripPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <div
          className="relative inline-block transition-all duration-300"
          style={frameStyle}
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
      </StripPreviewModal>
    </>
  );
}
