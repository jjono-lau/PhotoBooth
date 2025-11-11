// components/PhotoStrips.jsx

export default function PhotoStrips({ photos, className = "" }) {
  return (
    <div className={"outline bg-white/90"}>
    <div className={`grid grid-rows-4 ${className}`}>
      {photos.map((src, i) => (
        <div key={i} className="flex items-center justify-center overflow-hidden outline">
          {src ? (
            <img
              src={src}
              alt={`Capture ${i + 1}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-s text-gray-500 ">Image {i + 1}</span>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}
