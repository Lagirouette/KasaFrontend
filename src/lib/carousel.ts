export function wrapIndex(index: number, count: number) {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

export function getThumbnailIndexes(count: number, current: number, max = 4) {
  const visible = Math.min(max, Math.max(count - 1, 0));
  return Array.from({ length: visible }, (_, k) => wrapIndex(current + k + 1, count));
}
