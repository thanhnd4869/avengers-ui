import Button from "react-bootstrap/Button";
import { Link } from "react-router";

import Icon from "@components/Icon";
import { buildPath, PATHS } from "@routes/paths";
import { formatPriceRange } from "@utils/format";

import "./ProductCard.css";

function Rating({ value, count }) {
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
      <span className="product-card__rating-count">({count})</span>
    </div>
  );
}

function ProductCard({ product }) {
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

  return (
    <article className="product-card sf-card h-100 d-flex flex-column">
      <Link to={href} className="product-card__media sf-media sf-media-zoom sf-ratio-4x3">
        <img src={image.url} alt={image.alt} loading="lazy" />
        {isDiscounted ? (
          <span className="product-card__badge sf-skew">
            <span>Sale</span>
          </span>
        ) : null}
        {!inStock ? <span className="product-card__sold-out">Sold out</span> : null}
      </Link>

      <div className="product-card__body d-flex flex-column flex-grow-1">
        <ul className="product-card__platforms list-unstyled d-flex flex-wrap gap-1 mb-2">
          {platforms.map((platform) => (
            <li key={platform.slug} className="product-card__platform">
              {platform.name}
            </li>
          ))}
        </ul>

        <h3 className="product-card__title">
          <Link to={href}>{name}</Link>
        </h3>

        <Rating value={ratingAverage} count={ratingCount} />

        <div className="product-card__footer mt-auto d-flex align-items-center justify-content-between gap-2">
          <p className="product-card__price mb-0">
            {isDiscounted ? (
              <span className="product-card__price-original">
                {formatPriceRange(originalPriceMin, originalPriceMin, currency)}
              </span>
            ) : null}
            {formatPriceRange(priceMin, priceMax, currency)}
          </p>
          <Button as={Link} to={href} variant="primary" size="sm" disabled={!inStock}>
            {hasVariants ? "Select" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
