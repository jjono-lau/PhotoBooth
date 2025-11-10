export function captureFrame(videoRef, filterCss = "none", effects = null) {
  const video = videoRef?.current;
  if (!video) return null;

  const width = video.videoWidth;
  const height = video.videoHeight;
  if (!width || !height) return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Mirror so the saved image matches the mirrored preview
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.filter = filterCss || "none";
  ctx.drawImage(video, 0, 0, width, height);

  applyEffects(ctx, width, height, effects);

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
