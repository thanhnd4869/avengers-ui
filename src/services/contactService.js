import { apiClient } from "./apiClient";

/**
 * Footer contact form submission.
 */
export function sendContactMessage({ email, message }) {
  return apiClient.post("/contact", { email, message });
}
