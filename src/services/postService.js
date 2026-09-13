import { apiClient } from "./apiClient";

/**
 * Blog listing shared by the news sections.
 */
export function getPosts({ page = 1, limit = 10, category } = {}) {
  const query = new URLSearchParams({ page, limit, sort: "-publishedAt" });

  if (category) {
    query.set("category", category);
  }

  return apiClient.get(`/posts?${query}`);
}

/**
 * Categories used by the tabbed news filter.
 */
export function getPostCategories() {
  return apiClient.get("/post-categories");
}
