import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Icon from "@components/Icon";
import SectionHeading from "@components/SectionHeading";

import "./HowItWorksSection.css";

/*
 * First-time buyers often do not know what they receive: a code, not a box. The
 * three steps make that explicit and point to where the key is redeemed.
 */
const STEPS = [
  {
    icon: "cart",
    title: "Choose your game",
    text: "Pick the edition and the platform you play on.",
  },
  {
    icon: "envelope",
    title: "Get your key",
    text: "Pay securely and receive the code by email instantly.",
  },
  {
    icon: "key",
    title: "Activate & play",
    text: "Redeem it on Steam, PlayStation or Xbox and start playing.",
  },
];

function HowItWorksSection() {
  return (
    <section className="mb-5">
      <SectionHeading highlight="How it">Works</SectionHeading>
      <Row className="g-4">
        {STEPS.map((step, index) => (
          <Col key={step.title} md={4}>
            <div className="how-step rounded h-100 p-4">
              <span className="how-step__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="how-step__icon mb-3">
                <Icon name={step.icon} size={22} />
              </span>
              <h3 className="how-step__title">{step.title}</h3>
              <p className="mb-0">{step.text}</p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default HowItWorksSection;
