import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Icon from "@components/Icon";

import "./TrustBar.css";

/*
 * Buying a key from a site you do not know is a leap of faith, so the page
 * answers the usual doubts (is it genuine, how fast, is payment safe, what if it
 * fails) right under the hero, before any product is shown.
 */
const PROMISES = [
  { icon: "shield", title: "100% official keys", text: "Sourced from authorised distributors" },
  { icon: "bolt", title: "Instant delivery", text: "Your key arrives by email in seconds" },
  { icon: "lock", title: "Secure checkout", text: "Encrypted payment, no card stored" },
  { icon: "headset", title: "24/7 support", text: "Refund if a key fails to activate" },
];

function TrustBar() {
  return (
    <section className="trust-bar rounded mb-5" aria-label="Why shop with us">
      <Row className="g-0">
        {PROMISES.map((item) => (
          <Col key={item.title} xs={6} lg={3} className="trust-bar__item">
            <div className="d-flex align-items-center gap-3 p-3 p-lg-4 h-100">
              <span className="trust-bar__icon">
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <p className="trust-bar__title mb-1">{item.title}</p>
                <p className="trust-bar__text mb-0">{item.text}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default TrustBar;
