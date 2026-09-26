import { apiClient } from "./apiClient";

/**
 * Product listing shared by the storefront sections.
 */
export function getProducts({ page = 1, limit = 10, sort = "-sales", collection } = {}) {
  const query = new URLSearchParams({ page, limit, sort });

  // Curated lists (deals, new releases, pre-orders) are chosen by the shop
  // rather than derived from a sort order, so they are requested by name.
  if (collection) {
    query.set("collection", collection);
  }

  return apiClient.get(`/products?${query}`);
}
