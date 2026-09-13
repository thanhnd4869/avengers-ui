import { apiClient } from "./apiClient";

/**
 * Dynamic media and social content displayed in the home sidebar.
 */
export function getHomeMedia() {
  return apiClient.get("/home-media");
}
