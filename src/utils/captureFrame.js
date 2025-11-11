export function captureFrame(videoRef, filterCss = "none", effects = null) {
  const video = videoRef?.current;
  if (!video) return null;

  const sourceWidth = video.videoWidth;
  const sourceHeight = video.videoHeight;
  if (!sourceWidth || !sourceHeight) return null;

  const targetWidth = video.clientWidth || sourceWidth;
  const targetHeight = video.clientHeight || sourceHeight;
  const targetAspect =
    targetWidth && targetHeight
      ? targetWidth / targetHeight
      : sourceWidth / sourceHeight;
  const sourceAspect = sourceWidth / sourceHeight;

  let sx = 0;
  let sy = 0;
  let sWidth = sourceWidth;
  let sHeight = sourceHeight;

  if (sourceAspect > targetAspect) {
    // Video is wider than preview window; crop horizontally (match object-cover)
    sWidth = Math.round(sourceHeight * targetAspect);
    sx = Math.round((sourceWidth - sWidth) / 2);
  } else if (sourceAspect < targetAspect) {
    // Video is taller than preview window; crop vertically
    sHeight = Math.round(sourceWidth / targetAspect);
    sy = Math.round((sourceHeight - sHeight) / 2);
  }

  const canvas = document.createElement("canvas");
  canvas.width = sWidth;
  canvas.height = sHeight;
  const ctx = canvas.getContext("2d");

  // Mirror so the saved image matches the mirrored preview
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.filter = filterCss || "none";
  ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);

  applyEffects(ctx, canvas.width, canvas.height, effects);

  return canvas.toDataURL("image/png");
}

function applyEffects(ctx, width, height, effects) {
  if (!effects) return;
  const { warmthOverlayOpacity, vignetteStrength, grainIntensity } = effects;

  if (warmthOverlayOpacity) {
    ctx.save();
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = `rgba(255, 214, 165, ${warmthOverlayOpacity})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (vignetteStrength) {
    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.25,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.75
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, `rgba(0,0,0,${vignetteStrength})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (grainIntensity) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    const amount = Math.max(0, Math.min(grainIntensity, 1)) * 50;
    for (let i = 0; i < data.length; i += 4) {
      const rand = (Math.random() - 0.5) * amount;
      data[i] = clampChannel(data[i] + rand);
      data[i + 1] = clampChannel(data[i + 1] + rand);
      data[i + 2] = clampChannel(data[i + 2] + rand);
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

function clampChannel(value) {
  if (value < 0) return 0;
  if (value > 255) return 255;
  return value;
}
