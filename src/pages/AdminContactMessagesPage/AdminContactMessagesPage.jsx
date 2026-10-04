import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

import TabFilter from "@components/TabFilter";
import useAsync from "@hooks/useAsync";
import {
  getContactMessages,
  updateContactMessageStatus,
} from "@services/adminContactMessageService";

import "./AdminContactMessagesPage.css";

const PAGE_SIZE = 20;

const STATUSES = [
  { value: "new", label: "New", badge: "danger" },
  { value: "read", label: "Read", badge: "secondary" },
  { value: "replied", label: "Replied", badge: "success" },
];

const FILTERS = [{ value: "", label: "All" }, ...STATUSES];

function formatDateTime(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(value),
  );
}

export function Component() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [savingId, setSavingId] = useState(null);
  const [actionError, setActionError] = useState("");
  // Changes made on this page, applied over the fetched list so a status
  // update shows at once without refetching.
  const [overrides, setOverrides] = useState({});

  const result = useAsync(
    () => getContactMessages({ page, limit: PAGE_SIZE, status: status || undefined }),
    [page, status, reload],
  );

  const messages = (result.data?.data ?? []).map((message) => overrides[message.id] ?? message);
  const meta = result.data?.meta;

  const handleFilter = (value) => {
    setStatus(value);
    setPage(1);
    setOverrides({});
  };

  const handleStatusChange = async (message, nextStatus) => {
    setSavingId(message.id);
    setActionError("");

    try {
      const { data } = await updateContactMessageStatus(message.id, nextStatus);

      setOverrides((current) => ({ ...current, [data.id]: data }));
    } catch (error) {
      setActionError(error.message || "Could not update the message.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="admin-page container">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <h1 className="admin-page__title mb-0">
          <span className="text-primary">Contact</span> messages
        </h1>
        <Button
          variant="outline-light"
          size="sm"
          onClick={() => {
            setOverrides({});
            setReload((count) => count + 1);
          }}
        >
          Refresh
        </Button>
      </div>

      <TabFilter items={FILTERS} value={status} onChange={handleFilter} className="mb-4" />

      {actionError ? (
        <Alert variant="danger" dismissible onClose={() => setActionError("")}>
          {actionError}
        </Alert>
      ) : null}

      {result.isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}

      {result.error ? (
        <Alert variant="danger">Could not load the messages. {result.error.message}</Alert>
      ) : null}

      {!result.isLoading && !result.error && messages.length === 0 ? (
        <p className="admin-page__empty">No messages.</p>
      ) : null}

      {!result.isLoading && messages.length > 0 ? (
        <div className="admin-table">
          <Table responsive variant="dark" className="mb-0 align-middle">
            <thead>
              <tr>
                <th scope="col">Received</th>
                <th scope="col">From</th>
                <th scope="col">Message</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => {
                const current = STATUSES.find((item) => item.value === message.status);

                return (
                  <tr key={message.id} className={message.status === "new" ? "is-new" : ""}>
                    <td className="text-nowrap">{formatDateTime(message.createdAt)}</td>
                    <td>
                      <a href={`mailto:${message.email}`} className="admin-table__email">
                        {message.email}
                      </a>
                    </td>
                    <td className="admin-table__message">{message.message}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg={current?.badge ?? "secondary"}>{current?.label}</Badge>
                        <Form.Select
                          size="sm"
                          aria-label={`Status of the message from ${message.email}`}
                          value={message.status}
                          disabled={savingId === message.id}
                          onChange={(event) => handleStatusChange(message, event.target.value)}
                          className="admin-table__select"
                        >
                          {STATUSES.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : null}

      {meta && meta.totalPages > 1 ? (
        <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
          <Button
            variant="outline-light"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>
          <span>
            Page {meta.page} of {meta.totalPages} ({meta.total} messages)
          </span>
          <Button
            variant="outline-light"
            size="sm"
            disabled={page >= meta.totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </section>
  );
}

Component.displayName = "AdminContactMessagesPage";
