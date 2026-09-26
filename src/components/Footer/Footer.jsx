import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import Icon from "@components/Icon";
import { APP_NAME, SOCIAL_LINKS } from "@constants/app";
import { PATHS } from "@routes/paths";
import { sendContactMessage } from "@services/contactService";

import "./Footer.css";

/*
 * Buying a key raises questions about activation and refunds, so the footer
 * links to those answers rather than repeating the shop categories already in
 * the header navigation.
 */
const SUPPORT_LINKS = [
  { label: "Help centre", to: PATHS.FAQ },
  { label: "Refund policy", to: PATHS.REFUND_POLICY },
  { label: "Terms of service", to: PATHS.TERMS },
  { label: "Privacy policy", to: PATHS.PRIVACY },
];

const EMPTY_FORM = { email: "", message: "" };

function Footer() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    // Clearing as the visitor types stops a stale message from contradicting
    // what is now in the field.
    setFieldErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: "sending", message: "" });
    setFieldErrors({});

    try {
      const response = await sendContactMessage(form);

      setStatus({ state: "success", message: response.data.message });
      setForm(EMPTY_FORM);
    } catch (error) {
      // The API reports which field failed, so those messages sit next to the
      // input instead of only appearing as one line under the button.
      const byField = Object.fromEntries(
        (error.details ?? [])
          .filter((detail) => detail.field)
          .map((detail) => [detail.field, detail.message]),
      );

      setFieldErrors(byField);
      setStatus({
        state: "error",
        message: Object.keys(byField).length ? "Please check the fields above." : error.message,
      });
    }
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="gy-5">
          <Col lg={4}>
            <h4 className="footer__heading">Contact with us</h4>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="footer-email">
                <Form.Label className="visually-hidden">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  required
                  className="footer__input"
                  isInvalid={Boolean(fieldErrors.email)}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="footer-message">
                <Form.Label className="visually-hidden">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message *"
                  required
                  className="footer__input"
                  isInvalid={Boolean(fieldErrors.message)}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.message}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="primary" disabled={status.state === "sending"}>
                {status.state === "sending" ? "Sending..." : "Submit"}
              </Button>
              {status.message ? (
                <p
                  className={`footer__status mt-3 ${status.state === "error" ? "text-danger" : "text-success"}`}
                  role="status"
                >
                  {status.message}
                </p>
              ) : null}
            </Form>
          </Col>

          <Col lg={3}>
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__links list-unstyled">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="sf-link-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={5}>
            <h4 className="footer__heading">About {APP_NAME}</h4>
            <p className="footer__about">
              Genuine game keys delivered instantly. Every key is sourced from authorised
              distributors and activates on the official platform store.
            </p>
            <ul className="footer__social list-unstyled d-flex gap-3 mb-0">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="footer__social-link"
                    data-social={social.icon}
                  >
                    <Icon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="footer__bottom">
        <Container className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <p className="mb-0">
            Copyright &copy; {new Date().getFullYear()} {APP_NAME}
          </p>
          <p className="mb-0">All trademarks belong to their respective owners.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
