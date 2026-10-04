import axios from "axios";

import { API_URL } from "@constants/app";

import { endSession, getAccessToken, setAccessToken } from "./session";

export class ApiError extends Error {
  constructor(message, { status, code, details, requestId, cause } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
    this.cause = cause;
  }
}

function toApiError(cause) {
  if (!axios.isAxiosError(cause)) {
    return cause;
  }

  const error = cause.response?.data?.error;

  return new ApiError(
    error?.message ?? (cause.response ? "The request failed." : "Unable to reach the server."),
    {
      status: cause.response?.status,
      code: error?.code ?? (cause.response ? "INTERNAL_ERROR" : "NETWORK_ERROR"),
      details: error?.details,
      requestId: error?.requestId ?? cause.response?.headers?.["x-request-id"],
      cause,
    },
  );
}

// The refresh cookie is httpOnly and, in development, cross-origin, so every
// request opts in to sending credentials.
const CLIENT_CONFIG = {
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosClient = axios.create(CLIENT_CONFIG);
// Has none of the interceptors below, so a failing refresh cannot recurse.
const refreshClient = axios.create(CLIENT_CONFIG);

let refreshing = null;

/**
 * Trades the refresh cookie for a new access token. Concurrent callers share
 * one request: the server rotates the cookie on every use, so two parallel
 * refreshes would make the slower one look like a replayed token.
 */
export function refreshSession() {
  refreshing ??= refreshClient
    .post("/auth/refresh")
    .then((response) => {
      setAccessToken(response.data.data.accessToken);

      return response.data.data;
    })
    .catch((cause) => Promise.reject(toApiError(cause)))
    .finally(() => {
      refreshing = null;
    });

  return refreshing;
}

axiosClient.interceptors.request.use((request) => {
  const token = getAccessToken();

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (cause) => {
    const error = toApiError(cause);
    const request = cause.config;

    // Only a request that carried a token can have been refused for an
    // expired one; a 401 from the sign-in form is a wrong password.
    if (error.status !== 401 || !request?.headers?.Authorization) {
      throw error;
    }

    if (error.code === "SESSION_REVOKED") {
      endSession("revoked");
      throw error;
    }

    if (request.retried) {
      endSession("expired");
      throw error;
    }

    // The access token expired: refresh once, then replay the request.
    try {
      await refreshSession();
    } catch (refreshError) {
      endSession(refreshError.code === "SESSION_REVOKED" ? "revoked" : "expired");
      throw error;
    }

    request.retried = true;

    return axiosClient(request);
  },
);

export const apiClient = {
  get: (path, options) => axiosClient.get(path, options),
  post: (path, body, options) => axiosClient.post(path, body, options),
  put: (path, body, options) => axiosClient.put(path, body, options),
  patch: (path, body, options) => axiosClient.patch(path, body, options),
  delete: (path, options) => axiosClient.delete(path, options),
};
