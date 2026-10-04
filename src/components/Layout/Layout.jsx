import { Outlet } from "react-router";

import Footer from "@components/Footer";
import Header from "@components/Header";
import VerifyEmailBanner from "@components/VerifyEmailBanner";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <VerifyEmailBanner />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
