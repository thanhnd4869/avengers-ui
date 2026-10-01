const cache = new Map();

/**
 * Shares one in-flight or settled request between every component asking for
 * the same key during a page visit, so widgets rendering the same data do not
 * each hit the API. A failed request is forgotten so the next caller retries.
 */
export function cachedRequest(key, request) {
  if (!cache.has(key)) {
    cache.set(
      key,
      request().catch((error) => {
        cache.delete(key);
        throw error;
      }),
    );
  }

  return cache.get(key);
}
