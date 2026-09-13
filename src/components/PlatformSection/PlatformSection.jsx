import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Placeholder from "react-bootstrap/Placeholder";
import { Link } from "react-router";

import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getPlatforms } from "@services/platformService";

import "./PlatformSection.css";

function PlatformSection() {
  const { data, isLoading, error } = useAsync(() => getPlatforms(), []);

  if (isLoading) {
    return (
      <section className="platform-section" aria-label="Loading platforms">
        <Container>
          <Row className="g-3 g-lg-4">
            {Array.from({ length: 3 }, (_, index) => (
              <Col key={index} lg={4}>
                <Placeholder as="div" animation="glow" className="platform-tile">
                  <Placeholder className="platform-tile__icon-placeholder" />
                  <span className="platform-tile__content">
                    <Placeholder xs={5} />
                    <Placeholder xs={8} />
                  </span>
                </Placeholder>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }

  if (error || !data?.data.length) return null;

  return (
    <section className="platform-section">
      <Container>
        <Row className="g-3 g-lg-4">
          {data.data.slice(0, 3).map((platform) => (
            <Col key={platform.id} lg={4}>
              <Link to={`${PATHS.SHOP}?platform=${platform.slug}`} className="platform-tile">
                <span className="platform-tile__icon">
                  <img src={platform.image.url} alt={platform.image.alt} loading="lazy" />
                </span>
                <span className="platform-tile__content">
                  <span className="platform-tile__name">{platform.name}</span>
                  <span className="platform-tile__cta">View games</span>
                </span>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PlatformSection;
