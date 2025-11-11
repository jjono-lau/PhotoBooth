export const FRAME_TEXT_STYLES = [
  {
    id: "allura",
    label: "Allura",
    sample: "Allura",
    fontFamily: "'Allura', cursive",
    letterSpacing: "0.04em",
  },
  {
    id: "arial",
    label: "Arial",
    sample: "Arial",
    fontFamily: "Arial, 'Helvetica Neue', sans-serif",
  },
  {
    id: "bebas-neue",
    label: "Bebas Neue",
    sample: "Bebas Neue",
    fontFamily: "'Bebas Neue', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  {
    id: "cinzel",
    label: "Cinzel",
    sample: "Cinzel",
    fontFamily: "'Cinzel', serif",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
  },
  {
    id: "courier-new",
    label: "Courier New",
    sample: "Courier New",
    fontFamily: "'Courier New', Courier, monospace",
    letterSpacing: "0.08em",
  },
  {
    id: "dancing-script",
    label: "Dancing Script",
    sample: "Dancing Script",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.05em",
  },
  {
    id: "fredoka-one",
    label: "Fredoka One",
    sample: "Fredoka One",
    fontFamily: "'Fredoka One', cursive",
    letterSpacing: "0.05em",
  },
  {
    id: "georgia",
    label: "Georgia",
    sample: "Georgia",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  {
    id: "great-vibes",
    label: "Great Vibes",
    sample: "Great Vibes",
    fontFamily: "'Great Vibes', cursive",
    letterSpacing: "0.03em",
  },
  {
    id: "inter",
    label: "Inter",
    sample: "Inter",
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
  },
  {
    id: "playfair-display",
    label: "Playfair Display",
    sample: "Playfair Display",
    fontFamily: "'Playfair Display', serif",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  {
    id: "roboto-condensed",
    label: "Roboto Condensed",
    sample: "Roboto Condensed",
    fontFamily: "'Roboto Condensed', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  {
    id: "shadows-into-light",
    label: "Shadows Into Light",
    sample: "Shadows Into Light",
    fontFamily: "'Shadows Into Light', cursive",
    letterSpacing: "0.1em",
  },
  {
    id: "times-new-roman",
    label: "Times New Roman",
    sample: "Times New Roman",
    fontFamily: "'Times New Roman', serif",
  },
  {
    id: "trebuchet-ms",
    label: "Trebuchet MS",
    sample: "Trebuchet MS",
    fontFamily: "'Trebuchet MS', 'Helvetica Neue', sans-serif",
  },
  {
    id: "verdana",
    label: "Verdana",
    sample: "Verdana",
    fontFamily: "Verdana, 'Geneva', sans-serif",
  },
];

export function getFrameTextStyle(styleId = "allura") {
  return (
    FRAME_TEXT_STYLES.find((style) => style.id === styleId) ??
    FRAME_TEXT_STYLES[0]
  );
}

export const FRAME_TEXT_COLORS = [
  { id: "slate", label: "Slate", value: "#475569" },
  { id: "charcoal", label: "Charcoal", value: "#1f2933" },
  { id: "white", label: "White", value: "#ffffff" },
  { id: "soft-gold", label: "Soft Gold", value: "#f6c56c" },
  { id: "rose", label: "Rose", value: "#f472b6" },
  { id: "mint", label: "Mint", value: "#34d399" },
  { id: "azure", label: "Azure", value: "#38bdf8" },
  { id: "violet", label: "Violet", value: "#c084fc" },
];

export function getFrameTextColor(colorId = "slate") {
  return (
    FRAME_TEXT_COLORS.find((color) => color.id === colorId) ??
    FRAME_TEXT_COLORS[0]
  );
}
