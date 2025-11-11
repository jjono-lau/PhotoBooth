import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import downloadPhoto from "../utils/downloadPhoto";

export default function DownloadButton({
  targetRef,
  className = "",
  filename = "photo-strip.png",
  qualityScale = 4,
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!targetRef?.current || isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadPhoto(targetRef.current, { filename, scale: qualityScale });
    } catch {
      // Already logged inside util; silently fail to keep UI simple.
    } finally {
      setIsDownloading(false);
    }
  }, [targetRef, filename, qualityScale, isDownloading]);

  const isDisabled = isDownloading || !targetRef?.current;

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDisabled}
      className={`inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {isDownloading ? "Preparing..." : "Download Photo"}
    </button>
  );
}
