import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useSearchParams } from "react-router";

import AuthLayout from "@components/AuthLayout";
import useAuth from "@hooks/useAuth";
import { PATHS } from "@routes/paths";
import { verifyEmail } from "@services/authService";

// The token works once, but StrictMode (and a remount) runs the effect twice.
// Sharing the request per token keeps the second run from reporting failure.
const pending = new Map();

function verifyOnce(token) {
  if (!pending.has(token)) {
    pending.set(token, verifyEmail(token));
  }

  return pending.get(token);
}

export function Component() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { status, updateUser } = useAuth();
  const [state, setState] = useState(token ? "verifying" : "invalid");
  const [verifiedUser, setVerifiedUser] = useState(null);

  useEffect(() => {
    if (!token) return undefined;

    let cancelled = false;

    verifyOnce(token)
      .then((user) => {
        if (cancelled) return;
        setVerifiedUser(user);
        setState("verified");
      })
      .catch(() => !cancelled && setState("invalid"));

    return () => {
      cancelled = true;
    };
  }, [token]);

  // Opening the link reloads the app, so the session is restored alongside
  // the verification and may arrive later still marked unverified. Applying
  // the verified user once the session is known keeps the banner from coming
  // back.
  useEffect(() => {
    if (verifiedUser && status === "authenticated") {
      updateUser(verifiedUser);
    }
  }, [verifiedUser, status, updateUser]);

  return (
    <AuthLayout highlight="Verify" title="email">
      {state === "verifying" ? (
        <div className="d-flex align-items-center gap-3" role="status">
          <Spinner animation="border" size="sm" variant="primary" />
          Verifying your email address...
        </div>
      ) : null}

      {state === "verified" ? (
        <div className="d-grid gap-3">
          <Alert variant="success" className="mb-0">
            Your email address is verified. Thank you!
          </Alert>
          <Button as={Link} to={PATHS.HOME} variant="primary">
            Continue
          </Button>
        </div>
      ) : null}

      {state === "invalid" ? (
        <div className="d-grid gap-3">
          <Alert variant="danger" className="mb-0" role="alert">
            This link is invalid or has expired. Sign in and use the banner at the top of the page
            to get a new one.
          </Alert>
          <Button as={Link} to={PATHS.HOME} variant="primary">
            Back to home
          </Button>
        </div>
      ) : null}
    </AuthLayout>
  );
}

Component.displayName = "VerifyEmailPage";
