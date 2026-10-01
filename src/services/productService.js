import { apiClient } from "./apiClient";

/**
 * Product listing shared by the storefront sections.
 */
export function getProducts({ page = 1, limit = 10, sort, collection } = {}) {
  const query = new URLSearchParams({ page, limit });

  // Curated lists (deals, new releases, pre-orders) are requested by name, and
  // the API orders each one the way it suits: biggest discount, newest, or
  // soonest release. `sort` is only sent to override that order.
  if (collection) {
    query.set("collection", collection);
  }

  if (sort) {
    query.set("sort", sort);
  }

  return apiClient.get(`/products?${query}`);
}
