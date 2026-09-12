import Container from "react-bootstrap/Container";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container
        as="main"
        className="flex-grow-1 d-flex align-items-center justify-content-center text-center py-4"
      >
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
