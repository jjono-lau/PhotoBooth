export const FRAME_TYPES = [
  {
    id: "classic-even",
    label: "Classic Frame",
    description: "The classic timeless photo strip look.",
    padding: { top: 12, right: 12, bottom: 12, left: 12 },
    borderWidth: 3,
    borderRadius: 2,
    textPosition: "bottom",
  },
  {
    id: "bottom-heavy",
    label: "Bottom Spaced Frame",
    description: "Extra space at the bottom for custom decal.",
    padding: { top: 12, right: 12, bottom: 80, left: 12 },
    borderWidth: 3,
    borderRadius: 2,
    adjustable: { bottom: { min: -50, max: 80 } },
    textPosition: "bottom",
  },
  {
    id: "top-heavy",
    label: "Top Spaced Frame",
    description: "Extra space at the top for custom decal",
    padding: { top: 80, right: 12, bottom: 12, left: 12 },
    borderWidth: 3,
    borderRadius: 2,
    adjustable: { top: { min: -50, max: 80 } },
    textPosition: "top",
  },
];

export const FRAME_COLORS = [
{
  id: "fiery-red",
  label: "Fiery Red",
  swatchColor: "#ff5a4f",
  backgroundColor: "#ffe3e0",
  borderColor: "#f7b0a9",
  shadow: "0 15px 35px rgba(255, 90, 79, 0.25)",
},
  {
    id: "latte-cream",
    label: "Latte Cream",
    swatchColor: "#fde3b1",
    backgroundColor: "#fef3d7",
    borderColor: "#f3d5a3",
    shadow: "0 15px 35px rgba(209, 164, 104, 0.22)",
  },
  {
    id: "blush-rose",
    label: "Blush Rose",
    swatchColor: "#fecdd3",
    backgroundColor: "#ffe4e8",
    borderColor: "#f8b4c2",
    shadow: "0 15px 38px rgba(244, 114, 182, 0.2)",
  },
  {
    id: "sunset-peach",
    label: "Sunset Peach",
    swatchColor: "#fec89a",
    backgroundColor: "#ffe2c6",
    borderColor: "#f4c08a",
    shadow: "0 16px 40px rgba(242, 153, 74, 0.25)",
  },
  {
    id: "sage-mint",
    label: "Sage Mint",
    swatchColor: "#bbf7d0",
    backgroundColor: "#d1fade",
    borderColor: "#a0e8c2",
    shadow: "0 16px 38px rgba(16, 185, 129, 0.18)",
  },
  {
    id: "seafoam",
    label: "Seafoam",
    swatchColor: "#bae6fd",
    backgroundColor: "#d6ecff",
    borderColor: "#a4cffd",
    shadow: "0 16px 38px rgba(14, 165, 233, 0.2)",
  },
  {
    id: "lilac-mist",
    label: "Lilac Mist",
    swatchColor: "#d6d9ff",
    backgroundColor: "#eceefc",
    borderColor: "#c3c6fb",
    shadow: "0 18px 42px rgba(99, 102, 241, 0.25)",
  },
  {
    id: "midnight-ink",
    label: "Midnight Ink",
    swatchColor: "#111827",
    backgroundColor: "#151a26",
    borderColor: "#1f2633",
    shadow: "0 18px 42px rgba(15, 23, 42, 0.4)",
  },
  {
    id: "charcoal-soft",
    label: "Charcoal Soft",
    swatchColor: "#475569",
    backgroundColor: "#2b3440",
    borderColor: "#333c48",
    shadow: "0 20px 45px rgba(17, 24, 39, 0.35)",
  },
  {
    id: "sunburst-gold",
    label: "Sunburst Gold",
    swatchColor: "#fbbf24",
    backgroundColor: "#ffe8a3",
    borderColor: "#f3cb6f",
    shadow: "0 18px 44px rgba(217, 119, 6, 0.3)",
  },
  {
    id: "berry-punch",
    label: "Berry Punch",
    swatchColor: "#f06595",
    backgroundColor: "#fcc6de",
    borderColor: "#f29ebe",
    shadow: "0 20px 46px rgba(219, 39, 119, 0.25)",
  },
];

export function getFrameTypeConfig(typeId = "classic-even") {
  return (
    FRAME_TYPES.find((frame) => frame.id === typeId) ?? FRAME_TYPES[0]
  );
}

export function getFrameColorConfig(colorId = "polar-white") {
  return (
    FRAME_COLORS.find((color) => color.id === colorId) ?? FRAME_COLORS[0]
  );
}
