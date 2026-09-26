import { Link } from "react-router";

import "./SectionHeading.css";

/**
 * Two-tone section title used across the home page: the leading word is
 * highlighted in the accent colour and a rule runs along either side.
 *
 * Passing `viewAllTo` adds a "View all" link at the end of the row, so every
 * section links to its full listing the same way.
 */
function SectionHeading({
  highlight,
  children,
  viewAllTo,
  viewAllLabel = "View all",
  className = "",
}) {
  const heading = (
    <h2 className={`section-heading ${className}`}>
      <span className="section-heading__text">
        <span className="section-heading__highlight">{highlight}</span> {children}
      </span>
    </h2>
  );

  if (!viewAllTo) {
    return heading;
  }

  return (
    <div className="section-heading-row">
      {heading}
      <Link to={viewAllTo} className="section-heading__all">
        {viewAllLabel}
      </Link>
    </div>
  );
}

export default SectionHeading;
