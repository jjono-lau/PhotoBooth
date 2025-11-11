const PHOTO_STORAGE_KEY = "photoBooth.photos";

export function loadStoredPhotos(expectedCount = 4) {
  if (typeof window === "undefined") {
    return Array(expectedCount).fill(null);
  }

  try {
    const raw = window.localStorage.getItem(PHOTO_STORAGE_KEY);
    if (!raw) return Array(expectedCount).fill(null);

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return Array(expectedCount).fill(null);
    }

    const normalized = parsed.slice(0, expectedCount);
    while (normalized.length < expectedCount) {
      normalized.push(null);
    }
    return normalized;
  } catch (err) {
    console.warn("Failed to load stored photos:", err);
    return Array(expectedCount).fill(null);
  }
}

export function storePhotos(photos) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PHOTO_STORAGE_KEY,
      JSON.stringify(photos ?? [])
    );
  } catch (err) {
    console.warn("Failed to store photos:", err);
  }
}
