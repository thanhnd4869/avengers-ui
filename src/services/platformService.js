import { apiClient } from "./apiClient";

/**
 * Platform tiles such as PC, PS5, and Xbox.
 */
export function getPlatforms() {
  return apiClient.get("/platforms");
}
