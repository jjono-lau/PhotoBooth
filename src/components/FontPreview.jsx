export default function FontPreview({
  text,
  fontFamily,
  styleOverrides,
  height = "2.5rem",
  className = "",
}) {
  const previewText = text?.trim() || "Preview";

  return (
    <div
      className={`flex h-full w-full flex-1 rounded-md border border-dashed border-slate-300 bg-slate-50 px-2 py-1 text-base text-slate-800 ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
      title={previewText}
    >
      <span
        className="text-3xl block w-full truncate text-center text-slate-800"
        style={{
          fontFamily,
          lineHeight: height,
          ...(styleOverrides ?? {}),
        }}
      >
        {previewText}
      </span>
    </div>
  );
}
