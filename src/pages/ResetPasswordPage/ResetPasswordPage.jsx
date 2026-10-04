import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useSearchParams } from "react-router";

import AuthLayout from "@components/AuthLayout";
import PasswordField from "@components/PasswordField";
import useAuth from "@hooks/useAuth";
import { PATHS } from "@routes/paths";
import { resetPassword } from "@services/authService";
import {
  apiFieldErrors,
  apiFormError,
  collectErrors,
  PASSWORD_HINT,
  validatePassword,
} from "@utils/validation";

const EMPTY_FORM = { password: "", confirmPassword: "" };
const INVALID_LINK = "This link is invalid or has expired. Please request a new one.";

export function Component() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { status, logout } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(token ? "" : INVALID_LINK);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const found = collectErrors({
      password: validatePassword(form.password),
      confirmPassword:
        form.confirmPassword === form.password ? undefined : "Passwords do not match.",
    });

    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);

    try {
      await resetPassword({ token, password: form.password });
      // The server ended every session, this tab's included.
      if (status === "authenticated") await logout().catch(() => {});
      setDone(true);
    } catch (error) {
      const byField = apiFieldErrors(error);

      setErrors(byField);
      setFormError(
        error.code === "INVALID_TOKEN" || byField.token
          ? INVALID_LINK
          : Object.keys(byField).length
            ? ""
            : apiFormError(error),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      highlight="New"
      title="password"
      subtitle="Choose a new password for your account."
      error={formError}
      footer={
        <>
          Need another link? <Link to={PATHS.FORGOT_PASSWORD}>Request a new one</Link>
        </>
      }
    >
      {done ? (
        <div className="d-grid gap-3">
          <Alert variant="success" className="mb-0" role="status">
            Your password was changed. All devices were signed out.
          </Alert>
          <Button as={Link} to={PATHS.LOGIN} variant="primary">
            Sign in
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} noValidate className="d-grid gap-3">
          <PasswordField
            id="reset-password"
            label="New password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            error={errors.password}
            hint={PASSWORD_HINT}
            disabled={!token}
            autoFocus
            required
          />

          <PasswordField
            id="reset-confirm-password"
            label="Confirm new password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            error={errors.confirmPassword}
            disabled={!token}
            required
          />

          <Button type="submit" variant="primary" disabled={submitting || !token} className="mt-2">
            {submitting ? "Saving..." : "Change password"}
          </Button>
        </Form>
      )}
    </AuthLayout>
  );
}

Component.displayName = "ResetPasswordPage";
