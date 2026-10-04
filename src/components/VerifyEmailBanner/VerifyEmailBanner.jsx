import { useState } from "react";
import Container from "react-bootstrap/Container";

import useAuth from "@hooks/useAuth";
import { resendVerificationEmail } from "@services/authService";

import "./VerifyEmailBanner.css";

/**
 * Reminds a signed-in visitor to confirm their email, with a way to get the
 * link again. Hidden once the address is verified.
 */
function VerifyEmailBanner() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  if (!user || user.emailVerifiedAt) return null;

  const handleResend = async () => {
    setSending(true);
    setMessage("");

    try {
      await resendVerificationEmail();
      setMessage(`A new link was sent to ${user.email}.`);
    } catch (error) {
      setMessage(
        error.status === 429
          ? error.message
          : "We could not send the email. Please try again in a moment.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="verify-banner" role="status">
      <Container className="d-flex flex-wrap align-items-center justify-content-center gap-2 gap-md-3">
        <span>
          Please verify your email address <strong>{user.email}</strong>.
        </span>
        <button
          type="button"
          className="verify-banner__action"
          onClick={handleResend}
          disabled={sending}
        >
          {sending ? "Sending..." : "Resend email"}
        </button>
        {message ? <span className="verify-banner__message">{message}</span> : null}
      </Container>
    </div>
  );
}

export default VerifyEmailBanner;
