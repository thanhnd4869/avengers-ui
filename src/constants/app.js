/**
 * Application-wide constants.
 *
 * Only variables prefixed with `WEBPACK_` are exposed to the browser bundle, so
 * they are read here once and shared from a single place. Never put secrets in
 * these values.
 */
export const APP_NAME = process.env.WEBPACK_APP_NAME ?? "Avengers UI";
