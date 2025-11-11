export default function PhonePreview({ photos = [] }) {
  if (!Array.isArray(photos)) return null;

  const latestPhoto = [...photos].reverse().find(Boolean);
  const takenCount = photos.filter(Boolean).length;
  const totalCount = photos.length;

  if (!latestPhoto) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
      <img
        src={latestPhoto}
        alt="Latest capture preview"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute top-4 left-1/2 w-11/12 -translate-x-1/2 rounded-xl bg-black/60 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
        Photo {takenCount} of {totalCount}
      </div>
    </div>
  );
}
