import { PHOTO_FILTERS } from "../utils/photoFilters.js";

const TIMER_OPTIONS = [1, 3, 5, 10];

export default function PhotoBoothSettingsForm({
  isOpen,
  onClose,
  selectedFilter = "none",
  onFilterChange,
  timerSeconds = 3,
  onTimerChange,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Photo Booth Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Filters
            </h3>

            <div className="mt-3 grid gap-2">
              {PHOTO_FILTERS.map((filter) => (
                <label
                  key={filter.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2 text-sm transition ${
                    selectedFilter === filter.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="font-medium text-gray-800">
                    {filter.label}
                  </span>
                  <input
                    type="radio"
                    name="photo-filter"
                    value={filter.id}
                    checked={selectedFilter === filter.id}
                    onChange={() =>
                      onFilterChange ? onFilterChange(filter.id) : null
                    }
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Timer
            </h3>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {TIMER_OPTIONS.map((seconds) => (
                <button
                  type="button"
                  key={seconds}
                  onClick={() =>
                    onTimerChange ? onTimerChange(seconds) : null
                  }
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    timerSeconds === seconds
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-700 hover:border-purple-300"
                  }`}
                >
                  {seconds}s
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
