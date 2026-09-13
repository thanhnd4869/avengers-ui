import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import Icon from "@components/Icon";
import { APP_NAME } from "@constants/app";
import { PATHS } from "@routes/paths";
import { sendContactMessage } from "@services/contactService";

import "./Footer.css";

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "facebook" },
  { label: "Discord", icon: "discord" },
  { label: "Twitch", icon: "twitch" },
  { label: "YouTube", icon: "youtube" },
  { label: "Steam", icon: "steam" },
];

const SHOP_LINKS = [
  { label: "All games", to: PATHS.SHOP },
  { label: "PC keys", to: `${PATHS.SHOP}?platform=pc` },
  { label: "PlayStation keys", to: `${PATHS.SHOP}?platform=ps5` },
  { label: "Xbox keys", to: `${PATHS.SHOP}?platform=xbox` },
];

function Footer() {
  const [form, setForm] = useState({ email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: "sending", message: "" });

    try {
      const response = await sendContactMessage(form);

      setStatus({ state: "success", message: response.data.message });
      setForm({ email: "", message: "" });
    } catch (error) {
      setStatus({ state: "error", message: error.message });
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
                />
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
                />
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
            <h4 className="footer__heading">Shop</h4>
            <ul className="footer__links list-unstyled">
              {SHOP_LINKS.map((link) => (
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
                  <a href="#" aria-label={social.label} className="footer__social-link">
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
