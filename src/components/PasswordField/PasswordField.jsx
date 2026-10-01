import { useState } from "react";
import Form from "react-bootstrap/Form";

import Icon from "@components/Icon";

/**
 * Password input with a show/hide toggle, so the visitor can check what they
 * typed on a phone keyboard without retyping it.
 */
function PasswordField({ id, label, error, hint, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      {/* The toggle is laid over the right end of the input, so the field
          keeps a single border and the same width as the other inputs. */}
      <div className="auth-password">
        <Form.Control
          type={visible ? "text" : "password"}
          isInvalid={Boolean(error)}
          className="auth-input auth-input--password"
          {...inputProps}
        />
        <button
          type="button"
          className="auth-password__toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <Icon name={visible ? "eye-slash" : "eye"} />
        </button>
      </div>
      {/* Rendered outside the wrapper, where Bootstrap's sibling selector no
          longer reaches it, so it is shown explicitly. */}
      {error ? (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      ) : null}
      {hint && !error ? <Form.Text className="auth-hint">{hint}</Form.Text> : null}
    </Form.Group>
  );
}

export default PasswordField;
