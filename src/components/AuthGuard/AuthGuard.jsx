import { Navigate, Outlet, useLocation, useSearchParams } from "react-router";

import PageLoader from "@components/PageLoader";
import useAuth from "@hooks/useAuth";
import { PATHS } from "@routes/paths";
import { safeRedirect } from "@utils/validation";

function Loading() {
  return (
    <div className="d-flex justify-content-center py-5">
      <PageLoader />
    </div>
  );
}

/** Sends anonymous visitors to sign in, then back to the page they asked for. */
function SignInFirst() {
  const location = useLocation();
  const redirect = encodeURIComponent(location.pathname + location.search);

  return <Navigate to={`${PATHS.LOGIN}?redirect=${redirect}`} replace />;
}

/** Sends anonymous visitors to sign in, then back to the page they asked for. */
export function RequireAuth() {
  const { status } = useAuth();

  if (status === "loading") return <Loading />;
  if (status === "anonymous") return <SignInFirst />;

  return <Outlet />;
}

/**
 * Admin pages. Signed-in visitors without the role see the not-found page, so
 * the admin area is not advertised. The API enforces the same rule anyway.
 */
export function RequireAdmin() {
  const { status, isAdmin } = useAuth();

  if (status === "loading") return <Loading />;
  // Also reached when the session ends while on an admin page; the sign-in
  // page then explains why.
  if (status === "anonymous") return <SignInFirst />;
  if (!isAdmin) return <Navigate to={PATHS.NOT_FOUND} replace />;

  return <Outlet />;
}

/** Sign-in and sign-up pages: a signed-in visitor moves straight on. */
export function GuestOnly() {
  const { status } = useAuth();
  const [searchParams] = useSearchParams();

  if (status === "loading") return <Loading />;

  if (status === "authenticated") {
    return <Navigate to={safeRedirect(searchParams.get("redirect"), PATHS.HOME)} replace />;
  }

  return <Outlet />;
}
