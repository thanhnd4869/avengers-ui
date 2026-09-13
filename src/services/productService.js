import { apiClient } from "./apiClient";

/**
 * Product listing shared by the storefront sections.
 */
export function getProducts({ page = 1, limit = 10, sort = "-sales" } = {}) {
  const query = new URLSearchParams({ page, limit, sort });

  return apiClient.get(`/products?${query}`);
}
