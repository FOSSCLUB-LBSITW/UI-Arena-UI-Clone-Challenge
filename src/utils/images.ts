/**
 * Verified Wikimedia Commons image, addressed via Special:FilePath so we
 * never depend on knowing the internal per-file hash path — Commons
 * resolves the filename straight to the current media file.
 */
export function commonsImage(filename: string, width = 800): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}

/** Deterministic small integer from a string, used to vary fallback seeds. */
function hashSeed(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 100000;
  }
  return hash;
}

/** Broad, reliable fallback used only if a primary Commons image fails to load. */
export function foodImageFallback(id: string, width = 400, height = 300): string {
  return `https://loremflickr.com/${width}/${height}/food,meal,dish/all?lock=${hashSeed(id) + 5000}`;
}
