/**
 * Keeps short hyphenated number terms ("top-4", "k-4", "day-1") on one line by
 * swapping in a non-breaking hyphen at render time. Source data keeps plain
 * hyphens so it stays searchable.
 */
export const keepTogether = (text: string) => text.replace(/\b([A-Za-z]{1,4})-(\d)/g, '$1‑$2');
