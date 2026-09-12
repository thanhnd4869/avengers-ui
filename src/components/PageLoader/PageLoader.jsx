import Spinner from "react-bootstrap/Spinner";

/**
 * Shown while a lazily loaded page chunk is downloading.
 */
function PageLoader() {
  return (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default PageLoader;
