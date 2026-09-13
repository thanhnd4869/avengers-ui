import axios from "axios";

import { API_URL } from "@constants/app";

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

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (cause) => {
    if (!axios.isAxiosError(cause)) {
      return Promise.reject(cause);
    }

    const error = cause.response?.data?.error;

    return Promise.reject(
      new ApiError(
        error?.message ?? (cause.response ? "The request failed." : "Unable to reach the server."),
        {
          status: cause.response?.status,
          code: error?.code ?? (cause.response ? "INTERNAL_ERROR" : "NETWORK_ERROR"),
          details: error?.details,
          requestId: error?.requestId ?? cause.response?.headers?.["x-request-id"],
          cause,
        },
      ),
    );
  },
);

export const apiClient = {
  get: (path, config) => axiosClient.get(path, config),
  post: (path, body, config) => axiosClient.post(path, body, config),
  put: (path, body, config) => axiosClient.put(path, body, config),
  delete: (path, config) => axiosClient.delete(path, config),
};
