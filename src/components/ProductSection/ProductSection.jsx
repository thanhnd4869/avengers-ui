import Col from "react-bootstrap/Col";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";

import ProductCard from "@components/ProductCard";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getProducts } from "@services/productService";

import "./ProductSection.css";

function CardPlaceholder() {
  return (
    <Placeholder as="div" animation="glow">
      <Placeholder className="d-block w-100 sf-ratio-4x3 rounded" />
      <Placeholder xs={8} className="mt-3" />
      <Placeholder xs={5} />
    </Placeholder>
  );
}

/**
 * Product listing with a heading and a "view all" link.
 *
 * `layout` chooses how the items are arranged:
 * - `grid`      equal columns sized by `span`
 * - `spotlight` one featured tile beside a 2x2 block of the rest
 * - `carousel`  a horizontal scroll-snap strip
 * - `ranked`    a numbered leaderboard, one product per row
 *
 * Rotating through these keeps consecutive product rows from looking alike.
 * `variant` picks the card shape inside a grid, and `collection` requests a
 * curated list (deals, new releases, pre-orders).
 */
function ProductSection({
  highlight,
  title,
  sort,
  collection,
  limit = 4,
  viewAllTo = PATHS.SHOP,
  layout = "grid",
  variant = "grid",
  span = { xs: 12, sm: 6, lg: 3 },
}) {
  const { data, isLoading, error } = useAsync(
    () => getProducts({ sort, collection, limit }),
    [sort, collection, limit],
  );

  const products = data?.data ?? [];

  if (error || (!isLoading && !products.length)) {
    return null;
  }

  const skeletons = Array.from({ length: limit }, (_, index) => ({ id: `s${index}` }));
  const items = isLoading ? skeletons : products;
  const renderCard = (product, cardVariant = variant) =>
    isLoading ? <CardPlaceholder /> : <ProductCard product={product} variant={cardVariant} />;

  let body;

  if (layout === "spotlight") {
    const [lead, ...rest] = items;

    // The featured tile stretches to the 2x2 block beside it. That block is a
    // CSS grid with equal rows, so every small card is exactly half the
    // featured height minus the gutter — a Bootstrap row would size each row to
    // its content and leave the pair uneven.
    body = (
      <Row className="g-4">
        <Col lg={6}>{renderCard(lead, "featured")}</Col>
        <Col lg={6}>
          <div className="product-section__quad h-100">
            {rest.slice(0, 4).map((product) => (
              <div key={product.id}>{renderCard(product)}</div>
            ))}
          </div>
        </Col>
      </Row>
    );
  } else if (layout === "carousel") {
    body = (
      <div className="product-section__carousel">
        {items.map((product) => (
          <div key={product.id} className="product-section__slide">
            {renderCard(product)}
          </div>
        ))}
      </div>
    );
  } else if (layout === "ranked") {
    // Two columns read top to bottom (01–03, then 04–06), so the row count is
    // passed to CSS to split the list evenly.
    body = (
      <ol
        className="product-section__ranked list-unstyled mb-0"
        style={{ "--rank-rows": Math.ceil(items.length / 2) }}
      >
        {items.map((product, index) => (
          <li key={product.id} className="product-section__rank-row rounded">
            <span className="product-section__rank" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="product-section__rank-body">{renderCard(product, "rank")}</div>
          </li>
        ))}
      </ol>
    );
  } else {
    body = (
      <Row className="g-4">
        {items.map((product) => (
          <Col key={product.id} {...span}>
            {renderCard(product)}
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <section className="mb-5">
      <SectionHeading highlight={highlight} viewAllTo={viewAllTo}>
        {title}
      </SectionHeading>
      {body}
    </section>
  );
}

export default ProductSection;
