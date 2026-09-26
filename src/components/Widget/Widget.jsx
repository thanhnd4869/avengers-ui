import "./Widget.css";

/**
 * Panel used by every sidebar block.
 *
 * The reference design repeats the same shell for each sidebar item: a raised
 * title bar followed by an elevated body, so it lives here once instead of being
 * restated in each widget.
 */
function Widget({ title, children, className = "", bodyClassName = "" }) {
  return (
    <section className={`widget rounded ${className}`}>
      {title ? (
        <h3 className="widget__title">
          <span>{title}</span>
        </h3>
      ) : null}
      <div className={`widget__body ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export default Widget;
