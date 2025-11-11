import { toPng } from "html-to-image";
import { formatTimestampForFilename } from "./timeFormat.js";

const DEFAULT_FILENAME = "photo-strip.png";
const DEFAULT_SCALE = 3;
const DEFAULT_CROP_INSET = 1; // CSS px trimmed from each edge
const MAX_PIXEL_RATIO = 6;
const EDGE_ADJUSTMENT = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * Capture the rendered frame + strip node and trigger a file download.
 * The capture is rendered at a higher scale to keep detail when zoomed.
 */
export async function downloadPhoto(targetNode, options = {}) {
  const {
    filename = DEFAULT_FILENAME,
    scale = DEFAULT_SCALE,
    cropInset = DEFAULT_CROP_INSET,
  } = options;

  if (!(targetNode instanceof HTMLElement)) {
    throw new Error("downloadPhoto: a valid DOM element reference is required.");
  }

  const captureScale = Math.max(1, scale);
  const effectivePixelRatio = Math.min(
    MAX_PIXEL_RATIO,
    captureScale * (window.devicePixelRatio || 1)
  );

  const rect = targetNode.getBoundingClientRect();
  const baseWidth = rect.width;
  const baseHeight = rect.height;
  const insetCss = normalizeCropInset(cropInset);
  const insetPx = insetCssToDevicePx(insetCss, effectivePixelRatio);
  const expectedWidthPx = Math.round(baseWidth * effectivePixelRatio);
  const expectedHeightPx = Math.round(baseHeight * effectivePixelRatio);

  try {
    let dataUrl = await toPng(targetNode, {
      cacheBust: true,
      pixelRatio: effectivePixelRatio,
      canvasWidth: baseWidth,
      canvasHeight: baseHeight,
      style: {
        width: `${baseWidth}px`,
        height: `${baseHeight}px`,
        borderRadius: "0px",
        boxShadow: "none",
        outline: "none",
      },
      backgroundColor:
        window.getComputedStyle(targetNode).backgroundColor || "#ffffff",
    });

    const adjustedInsetPx = applyEdgeAdjustment(insetPx);

    dataUrl = await cropDataUrl(dataUrl, {
      insetPx: adjustedInsetPx,
      expectedWidthPx,
      expectedHeightPx,
    });

    const resolvedFilename =
      filename === DEFAULT_FILENAME
        ? `${formatTimestampForFilename()}.png`
        : sanitizeFilename(filename);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = resolvedFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("downloadPhoto failed:", error);
    throw error;
  }
}

export default downloadPhoto;

async function cropDataUrl(
  dataUrl,
  { insetPx, expectedWidthPx, expectedHeightPx }
) {
  const image = await loadImage(dataUrl);
  const extraRightPx = Math.max(0, Math.round(image.width - expectedWidthPx));
  const extraBottomPx = Math.max(0, Math.round(image.height - expectedHeightPx));
  const totalLeft = Math.max(0, insetPx.left);
  const totalTop = Math.max(0, insetPx.top);
  const totalRight = Math.max(0, insetPx.right + extraRightPx);
  const totalBottom = Math.max(0, insetPx.bottom + extraBottomPx);
  const cropWidth = Math.max(1, image.width - totalLeft - totalRight);
  const cropHeight = Math.max(1, image.height - totalTop - totalBottom);

  if (
    cropWidth === image.width &&
    cropHeight === image.height &&
    totalLeft === 0 &&
    totalTop === 0
  ) {
    return dataUrl;
  }

  const canvas = document.createElement("canvas");
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    totalLeft,
    totalTop,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );
  return canvas.toDataURL("image/png");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function normalizeCropInset(cropInset) {
  if (typeof cropInset === "number") {
    const clamped = Math.max(0, cropInset);
    return {
      top: clamped,
      right: clamped,
      bottom: clamped,
      left: clamped,
    };
  }
  if (typeof cropInset === "object" && cropInset !== null) {
    const { top, right, bottom, left } = cropInset;
    return {
      top: Math.max(0, top ?? 0),
      right: Math.max(0, right ?? 0),
      bottom: Math.max(0, bottom ?? 0),
      left: Math.max(0, left ?? 0),
    };
  }
  return {
    top: DEFAULT_CROP_INSET,
    right: DEFAULT_CROP_INSET,
    bottom: DEFAULT_CROP_INSET,
    left: DEFAULT_CROP_INSET,
  };
}

function insetCssToDevicePx(insetCss, pixelRatio) {
  return {
    top: Math.round(insetCss.top * pixelRatio),
    right: Math.round(insetCss.right * pixelRatio),
    bottom: Math.round(insetCss.bottom * pixelRatio),
    left: Math.round(insetCss.left * pixelRatio),
  };
}

function applyEdgeAdjustment(insetPx) {
  return {
    top: Math.max(0, insetPx.top + EDGE_ADJUSTMENT.top),
    right: Math.max(0, insetPx.right + EDGE_ADJUSTMENT.right),
    bottom: Math.max(0, insetPx.bottom + EDGE_ADJUSTMENT.bottom),
    left: Math.max(0, insetPx.left + EDGE_ADJUSTMENT.left),
  };
}

function sanitizeFilename(name) {
  return name.replace(/[<>\"/\\|?*]+/g, "_");
}
