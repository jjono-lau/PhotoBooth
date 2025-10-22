
export function captureCounter(limit = 4) {
  let count = 0;
  return () => {
    count = (count % limit) + 1;
    return count;
  };
}