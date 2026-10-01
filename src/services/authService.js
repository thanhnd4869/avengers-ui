import { apiClient } from "./apiClient";

/**
 * Account sign-in. The API is expected to start a session and answer with the
 * signed-in user.
 */
export function login({ email, password, remember }) {
  return apiClient.post("/auth/login", { email, password, remember });
}

/**
 * Account creation.
 */
export function register({ displayName, email, password }) {
  return apiClient.post("/auth/register", { displayName, email, password });
}
