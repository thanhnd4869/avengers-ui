import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import ProductCard from "@components/ProductCard";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getProducts } from "@services/productService";

import "./ProductSection.css";

function ProductSection({
  highlight,
  title,
  sort,
  limit = 4,
  viewAllTo = PATHS.SHOP,
  compact = false,
}) {
  const { data, isLoading, error } = useAsync(() => getProducts({ sort, limit }), [sort, limit]);

  if (error || (!isLoading && !data?.data.length)) {
    return null;
  }

  return (
    <section className={`product-section ${compact ? "product-section--compact" : ""}`}>
      <Container fluid={compact} className={compact ? "p-0" : undefined}>
        <div className="product-section__heading-row">
          <SectionHeading highlight={highlight}>{title}</SectionHeading>
          <Link to={viewAllTo} className="product-section__all">
            View all
          </Link>
        </div>

        <Row className={compact ? "g-3" : "g-3 g-lg-4"}>
          {isLoading
            ? Array.from({ length: limit }, (_, index) => (
                <Col key={index} xs={12} lg={compact ? 12 : 3}>
                  <div className="sf-card p-3">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} style={{ height: "8rem" }} />
                      <Placeholder xs={8} className="mt-3" />
                      <Placeholder xs={5} />
                    </Placeholder>
                  </div>
                </Col>
              ))
            : data.data.map((product) => (
                <Col key={product.id} xs={12} lg={compact ? 12 : 3}>
                  <ProductCard product={product} />
                </Col>
              ))}
        </Row>
      </Container>
    </section>
  );
}

export default ProductSection;
