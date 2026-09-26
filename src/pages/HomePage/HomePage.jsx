import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import GallerySection from "@components/GallerySection";
import HeroSection from "@components/HeroSection";
import LatestPostsSection from "@components/LatestPostsSection";
import MediaSidebar from "@components/MediaSidebar";
import NewsSection from "@components/NewsSection";
import PlatformSection from "@components/PlatformSection";
import ProductSection from "@components/ProductSection";
import TabbedNewsSection from "@components/TabbedNewsSection";

import "./HomePage.css";

export function Component() {
  return (
    <>
      <HeroSection />

      <Container className="home-page">
        <PlatformSection />
        <NewsSection />

        {/* From here down the reference splits into a content column and a
            sticky sidebar that spans the remaining sections. */}
        <Row className="gx-5">
          <Col lg={8}>
            <LatestPostsSection />
            <TabbedNewsSection />
            <GallerySection />
            <ProductSection
              highlight="Best"
              title="Selling"
              sort="-sales"
              limit={4}
              variant="list"
              span={{ xs: 12, md: 6 }}
            />
          </Col>
          <Col lg={4}>
            <div className="home-page__sidebar">
              <MediaSidebar />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Component.displayName = "HomePage";
