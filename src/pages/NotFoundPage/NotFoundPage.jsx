import Button from "react-bootstrap/Button";
import { Link } from "react-router";

import { PATHS } from "@routes/paths";

export function Component() {
  return (
    <section>
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead mb-4">The page you are looking for does not exist.</p>
      <Button as={Link} to={PATHS.HOME} variant="primary">
        Back to home
      </Button>
    </section>
  );
}

Component.displayName = "NotFoundPage";
