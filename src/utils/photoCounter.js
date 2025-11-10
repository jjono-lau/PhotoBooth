export const MAX_PHOTO_SLOTS = 4;

export function createPhotoSlots(count = MAX_PHOTO_SLOTS) {
  return Array(count).fill(null);
}

export function hasEmptySlot(photos = []) {
  return photos.some((slot) => slot === null);
}

export function addPhotoToSlots(photos = [], dataUrl) {
  if (!dataUrl) return photos;
  if (!hasEmptySlot(photos)) return photos;

  const next = [...photos];
  const emptyIndex = next.findIndex((slot) => slot === null);
  if (emptyIndex === -1) return photos;
  next[emptyIndex] = dataUrl;
  return next;
}

export function replaceLastFilledSlot(photos = [], dataUrl) {
  if (!dataUrl) return photos;
  const next = [...photos];
  let lastIndex = -1;
  for (let i = next.length - 1; i >= 0; i -= 1) {
    if (next[i]) {
      lastIndex = i;
      break;
    }
  }
  if (lastIndex === -1) return photos;
  next[lastIndex] = dataUrl;
  return next;
}
