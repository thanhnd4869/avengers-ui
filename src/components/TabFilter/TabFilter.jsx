import "./TabFilter.css";

/**
 * Row of pill buttons used to filter a list by category.
 *
 * Filtering happens in the parent, so this component only reports the selected
 * value and highlights it.
 */
function TabFilter({ items, value, onChange, className = "" }) {
  return (
    <div className={`tab-filter d-flex flex-wrap gap-2 ${className}`} role="tablist">
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tab-filter__item rounded ${isActive ? "is-active" : ""}`}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabFilter;
