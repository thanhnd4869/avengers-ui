/**
 * Route paths used across the application.
 *
 * Referencing these constants instead of writing URL strings inline keeps every
 * link in sync when a path changes.
 */
export const PATHS = Object.freeze({
  HOME: "/",
  SHOP: "/shop",
  PRODUCT: "/products/:slug",
  CART: "/cart",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CHECKOUT: "/checkout",
  BLOG: "/blog",
  POST: "/blog/:slug",
  GALLERY: "/gallery",
  FAQ: "/faq",
  REFUND_POLICY: "/refund-policy",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  NOT_FOUND: "/not-found",
});

/**
 * Builds a path from a pattern by replacing its `:param` placeholders.
 */
export function buildPath(pattern, params = {}) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    pattern,
  );
}
