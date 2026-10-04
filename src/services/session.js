/**
 * The access token lives only in memory, never in storage a script could read.
 * A reload loses it; the refresh cookie (httpOnly) then gets a new one.
 */
let accessToken = null;
const listeners = new Set();

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token) {
  accessToken = token ?? null;
}

/**
 * Lets the auth context hear about a session that ended on the server side,
 * such as a sign-in from another device. Returns an unsubscribe function.
 */
export function onSessionEnded(listener) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function endSession(reason) {
  accessToken = null;
  listeners.forEach((listener) => listener(reason));
}
