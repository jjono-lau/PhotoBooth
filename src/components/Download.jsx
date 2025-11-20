import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import downloadPhoto from "../utils/downloadPhoto";

export default function DownloadButton({
  targetRef,
  resolveTarget,
  onAfterDownload,
  className = "",
  filename = "photo-strip.png",
  qualityScale = 4,
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const targetNode = resolveTarget
        ? await resolveTarget()
        : targetRef?.current;

      if (!targetNode) return;

      await downloadPhoto(targetNode, { filename, scale: qualityScale });
      if (onAfterDownload) onAfterDownload();
    } catch {
      // Already logged inside util; silently fail to keep UI simple.
    } finally {
      setIsDownloading(false);
    }
  }, [resolveTarget, targetRef, filename, qualityScale, isDownloading, onAfterDownload]);

  const isDisabled = isDownloading;

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`flex items-center justify-center gap-2 text-black font-semibold rounded-md border border-green-400 bg-green-300 p-1 hover:bg-green-400 ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>{isDownloading ? "Preparing..." : "Download Photo"}</span>
    </button>
  );
}
