export const PHOTO_FILTERS = [
  { id: "none", label: "None", css: "none" },
  {
    id: "retro",
    label: "Retro",
    css: "contrast(1.1) sepia(0.5) saturate(1.25) hue-rotate(-5deg)",
  },
  {
    id: "monochrome",
    label: "Monochrome",
    css: "grayscale(1) contrast(1.1) brightness(1.05)",
  },
  {
    id: "film",
    label: "Film",
    // Settings: Exposure +14, Contrast -21, Vibrance +27
    css: "url(#custom-film) brightness(1.14) contrast(0.79) saturate(1.27)",
    effects: {
      warmthOverlayOpacity: 0.16,
      vignetteStrength: 0.35,
      grainIntensity: 0.14,
    },
  },
];

export function getFilterConfig(filterId = "none") {
  return (
    PHOTO_FILTERS.find((filter) => filter.id === filterId) ?? PHOTO_FILTERS[0]
  );
}

export function getFilterCss(filterId = "none") {
  return getFilterConfig(filterId).css;
}
