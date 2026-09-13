import "./SectionHeading.css";

/**
 * Two-tone section title used across the home page, where the first word is
 * highlighted in the accent colour.
 */
function SectionHeading({ highlight, children, align = "start", className = "" }) {
  return (
    <h2 className={`section-heading text-${align} ${className}`}>
      <span className="section-heading__highlight">{highlight}</span> {children}
    </h2>
  );
}

export default SectionHeading;
