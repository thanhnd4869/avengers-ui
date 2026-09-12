import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// Bootstrap first so project styles can override it.
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
