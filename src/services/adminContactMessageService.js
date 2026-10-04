import { apiClient } from "./apiClient";

export function getContactMessages({ page = 1, limit = 20, status } = {}) {
  return apiClient.get("/admin/contact-messages", {
    params: { page, limit, ...(status ? { status } : {}) },
  });
}

export function updateContactMessageStatus(id, status) {
  return apiClient.patch(`/admin/contact-messages/${encodeURIComponent(id)}`, { status });
}
