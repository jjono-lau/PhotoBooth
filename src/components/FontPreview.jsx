export default function FontPreview({
  text,
  fontFamily,
  height = "3rem",
  className = "",
}) {
  const previewText = text?.trim() || "Preview";

  return (
    <div
      className={`flex-1 rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 text-base text-slate-800 ${className}`}
      style={{
        fontFamily,
        height,
        minHeight: height,
        maxHeight: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        fontSize: `calc(${height} * 0.9)`,
        lineHeight: 1,
      }}
      title={previewText}
    >
      {previewText}
    </div>
  );
}
