import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

/**
 * The signed-in visitor and the actions that change who that is. `status` is
 * `"loading"` until the session has been restored after a page load.
 */
function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return auth;
}

export default useAuth;
