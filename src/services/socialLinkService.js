import { apiClient } from "./apiClient";
import { cachedRequest } from "./requestCache";

/**
 * Official social accounts shown in the header, the footer and the sidebar.
 */
export function getSocialLinks() {
  return cachedRequest("/social-links", () => apiClient.get("/social-links"));
}
