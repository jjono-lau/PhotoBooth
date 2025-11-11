const DATE_OPTIONS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const TIME_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

export function formatTimestampForFilename(date = new Date()) {
  const datePart = date.toLocaleDateString(undefined, DATE_OPTIONS);
  const timePart = date.toLocaleTimeString(undefined, TIME_OPTIONS);

  return `${datePart} ${timePart}`
    .replace(/\//g, ".")
    .replace(/:/g, "-")
    .replace(/\s+/g, " ");
}

export default formatTimestampForFilename;
