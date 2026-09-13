import { Link } from "react-router";

import Icon from "@components/Icon";
import { buildPath, PATHS } from "@routes/paths";
import { formatDate } from "@utils/format";

import "./PostCard.css";

function PostCard({ post, variant = "grid" }) {
  const { slug, title, excerpt, image, publishedAt, commentCount, category } = post;
  const href = buildPath(PATHS.POST, { slug });

  if (variant === "compact") {
    return (
      <article className="post-card post-card--compact d-flex gap-3">
        <Link to={href} className="post-card__thumb sf-media sf-media-zoom">
          <img src={image.url} alt={image.alt} loading="lazy" />
        </Link>
        <div>
          <h3 className="post-card__title post-card__title--compact">
            <Link to={href}>{title}</Link>
          </h3>
          <p className="post-card__meta mb-0 d-flex align-items-center gap-2">
            <Icon name="calendar" size={12} />
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="post-card sf-card h-100 d-flex flex-column">
      <Link to={href} className="post-card__media sf-media sf-media-zoom sf-ratio-16x9">
        <img src={image.url} alt={image.alt} loading="lazy" />
        <span className="post-card__comments" aria-label={`${commentCount} comments`}>
          {commentCount}
        </span>
        <span className="post-card__category sf-skew">
          <span>{category.name}</span>
        </span>
      </Link>
      <div className="post-card__body d-flex flex-column flex-grow-1">
        <h3 className="post-card__title">
          <Link to={href}>{title}</Link>
        </h3>
        <p className="post-card__excerpt">{excerpt}</p>
        <div className="post-card__footer mt-auto d-flex align-items-center justify-content-between gap-3">
          <Link to={href} className="post-card__read-more">
            Read More
          </Link>
          <p className="post-card__meta mb-0 d-inline-flex align-items-center gap-2">
            <Icon name="calendar" size={12} />
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          </p>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
