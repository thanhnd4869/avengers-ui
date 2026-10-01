import { apiClient } from "./apiClient";
import { cachedRequest } from "./requestCache";

/**
 * Screenshots and videos for the gallery and the sidebar widgets.
 */
export function getMedia({ type, limit = 12 } = {}) {
  const query = new URLSearchParams({ limit });

  if (type) {
    query.set("type", type);
  }

  return cachedRequest(`/media?${query}`, () => apiClient.get(`/media?${query}`));
}
