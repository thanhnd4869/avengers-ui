import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import HeroSection from "@components/HeroSection";
import LatestPostsSection from "@components/LatestPostsSection";
import NewsSection from "@components/NewsSection";
import PlatformSection from "@components/PlatformSection";
import ProductSection from "@components/ProductSection";

export function Component() {
  return (
    <>
      <HeroSection />
      <PlatformSection />
      <NewsSection />
      <LatestPostsSection />
      <div className="home-content">
        <Container>
          <Row>
            <Col>
              <ProductSection highlight="Best" title="Selling" sort="-sales" limit={4} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

Component.displayName = "HomePage";
