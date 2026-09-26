import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import Icon from "@components/Icon";
import { buildPath, PATHS } from "@routes/paths";
import { formatPriceRange } from "@utils/format";

import "./ProductCard.css";

function Rating({ value, count, showCount = true }) {
  return (
    <div className="product-card__rating" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          size={12}
          className={star <= Math.round(value) ? "is-filled" : ""}
        />
      ))}
      {showCount ? <span className="product-card__rating-count">({count})</span> : null}
    </div>
  );
}

/**
 * Product tile rendered either as a stacked `grid` card or as a `list` row with
 * the artwork beside the details, which is the shape the reference uses for the
 * best sellers and the sidebar.
 */
function ProductCard({ product, variant = "grid" }) {
  const {
    slug,
    name,
    image,
    priceMin,
    priceMax,
    originalPriceMin,
    currency,
    ratingAverage,
    ratingCount,
    hasVariants,
    inStock,
    platforms,
  } = product;

  const href = buildPath(PATHS.PRODUCT, { slug });
  const isDiscounted = originalPriceMin !== null && originalPriceMin > priceMin;
  const isList = variant === "list";

  const media = (
    <Link
      to={href}
      className={`product-card__media sf-media sf-media-zoom rounded ${isList ? "sf-ratio-3x4" : "sf-ratio-4x3"}`}
    >
      <img src={image.url} alt={image.alt} loading="lazy" />
      {isDiscounted ? <span className="product-card__badge">Sale</span> : null}
      {!inStock ? <span className="product-card__sold-out">Sold out</span> : null}
    </Link>
  );

  const price = (
    <p className="product-card__price mb-0">
      {isDiscounted ? (
        <span className="product-card__price-original">
          {formatPriceRange(originalPriceMin, originalPriceMin, currency)}
        </span>
      ) : null}
      {formatPriceRange(priceMin, priceMax, currency)}
    </p>
  );

  const action = (
    <Button as={Link} to={href} variant="secondary" size="sm" disabled={!inStock}>
      {hasVariants ? "Select options" : "Add to cart"}
    </Button>
  );

  if (isList) {
    return (
      <article className="product-card product-card--list">
        <Row className="g-3">
          <Col xs={4}>{media}</Col>
          <Col xs={8} className="d-flex flex-column align-items-start gap-2">
            <h3 className="product-card__title mb-0">
              <Link to={href}>{name}</Link>
            </h3>
            <Rating value={ratingAverage} count={ratingCount} showCount={false} />
            {price}
            {action}
          </Col>
        </Row>
      </article>
    );
  }

  return (
    <article className="product-card h-100 d-flex flex-column">
      {media}

      <div className="product-card__body d-flex flex-column flex-grow-1">
        <ul className="product-card__platforms list-unstyled d-flex flex-wrap gap-1 mb-2">
          {platforms.map((platform) => (
            <li key={platform.slug} className="product-card__platform rounded-1">
              {platform.name}
            </li>
          ))}
        </ul>

        <h3 className="product-card__title">
          <Link to={href}>{name}</Link>
        </h3>

        <Rating value={ratingAverage} count={ratingCount} />

        <div className="product-card__footer mt-auto d-flex align-items-center justify-content-between gap-2">
          {price}
          {action}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
