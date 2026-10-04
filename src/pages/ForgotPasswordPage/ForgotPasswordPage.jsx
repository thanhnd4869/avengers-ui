import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router";

import AuthLayout from "@components/AuthLayout";
import { PATHS } from "@routes/paths";
import { requestPasswordReset } from "@services/authService";
import { apiFieldErrors, apiFormError, validateEmail } from "@utils/validation";

export function Component() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const found = validateEmail(email);

    setError(found ?? "");
    if (found) return;

    setSubmitting(true);

    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch (requestError) {
      const byField = apiFieldErrors(requestError);

      setError(byField.email ?? "");
      setFormError(byField.email ? "" : apiFormError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      highlight="Forgot"
      title="password"
      subtitle="Enter the email of your account and we will send you a link to choose a new password."
      error={formError}
      footer={
        <>
          Remembered it? <Link to={PATHS.LOGIN}>Sign in</Link>
        </>
      }
    >
      {sent ? (
        // The same message whether or not the address has an account, so the
        // form cannot be used to find out who is registered.
        <Alert variant="success" className="mb-0" role="status">
          If an account exists for <strong>{email.trim()}</strong>, a reset link is on its way. The
          link is valid for 1 hour.
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit} noValidate className="d-grid gap-3">
          <Form.Group controlId="forgot-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              autoComplete="email"
              placeholder="you@example.com"
              className="auth-input"
              isInvalid={Boolean(error)}
              autoFocus
              required
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={submitting} className="mt-2">
            {submitting ? "Sending..." : "Send reset link"}
          </Button>
        </Form>
      )}
    </AuthLayout>
  );
}

Component.displayName = "ForgotPasswordPage";
