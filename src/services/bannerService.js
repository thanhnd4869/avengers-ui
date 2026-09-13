import { apiClient } from "./apiClient";

/**
 * Hero carousel slides.
 */
export function getBanners({ limit = 10 } = {}) {
  return apiClient.get(`/banners?limit=${limit}`);
}
