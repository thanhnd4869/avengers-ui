import Col from "react-bootstrap/Col";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import ProductCard from "@components/ProductCard";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getProducts } from "@services/productService";

import "./ProductSection.css";

/**
 * Product listing with a heading and a "view all" link.
 *
 * `variant` picks the card shape and `span` the column width, so the same
 * section serves both the wide storefront grid and the narrower home column.
 */
function ProductSection({
  highlight,
  title,
  sort,
  limit = 4,
  viewAllTo = PATHS.SHOP,
  variant = "grid",
  span = { xs: 12, sm: 6, lg: 3 },
}) {
  const { data, isLoading, error } = useAsync(() => getProducts({ sort, limit }), [sort, limit]);

  if (error || (!isLoading && !data?.data.length)) {
    return null;
  }

  return (
    <section className="mb-5">
      <div className="product-section__heading-row">
        <SectionHeading highlight={highlight}>{title}</SectionHeading>
        <Link to={viewAllTo} className="product-section__all">
          View all
        </Link>
      </div>

      <Row className="g-4">
        {isLoading
          ? Array.from({ length: limit }, (_, index) => (
              <Col key={index} {...span}>
                <Placeholder as="div" animation="glow">
                  <Placeholder className="d-block w-100 sf-ratio-4x3 rounded" />
                  <Placeholder xs={8} className="mt-3" />
                  <Placeholder xs={5} />
                </Placeholder>
              </Col>
            ))
          : data.data.map((product) => (
              <Col key={product.id} {...span}>
                <ProductCard product={product} variant={variant} />
              </Col>
            ))}
      </Row>
    </section>
  );
}

export default ProductSection;
