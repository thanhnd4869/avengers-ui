import "./SectionHeading.css";

/**
 * Two-tone section title used across the home page: the leading word is
 * highlighted in the accent colour and a rule runs along either side.
 */
function SectionHeading({ highlight, children, className = "" }) {
  return (
    <h2 className={`section-heading ${className}`}>
      <span className="section-heading__text">
        <span className="section-heading__highlight">{highlight}</span> {children}
      </span>
    </h2>
  );
}

export default SectionHeading;
