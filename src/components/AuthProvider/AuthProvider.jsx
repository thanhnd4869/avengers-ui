import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext } from "@hooks/useAuth";
import * as authService from "@services/authService";
import { onSessionEnded } from "@services/session";

export const SESSION_NOTICES = Object.freeze({
  revoked: "You were signed out because your account signed in on another device.",
  expired: "Your session has expired. Please sign in again.",
});

function AuthProvider({ children }) {
  const [state, setState] = useState({ status: "loading", user: null });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    // The access token is not kept across reloads; the refresh cookie gets a
    // new one if the visitor was signed in.
    authService
      .restoreSession()
      .then((user) => !cancelled && setState({ status: "authenticated", user }))
      .catch(() => !cancelled && setState({ status: "anonymous", user: null }));

    const unsubscribe = onSessionEnded((reason) => {
      setState({ status: "anonymous", user: null });
      setNotice(SESSION_NOTICES[reason] ?? "");
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const signedIn = useCallback((user) => {
    setNotice("");
    setState({ status: "authenticated", user });

    return user;
  }, []);

  const login = useCallback(
    async (credentials) => signedIn(await authService.login(credentials)),
    [signedIn],
  );

  const register = useCallback(
    async (details) => signedIn(await authService.register(details)),
    [signedIn],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setState({ status: "anonymous", user: null });
    }
  }, []);

  // Used after the email is verified, so the banner disappears at once.
  const updateUser = useCallback((user) => {
    setState((current) =>
      current.user && current.user.id === user.id ? { ...current, user } : current,
    );
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      isAdmin: state.user?.role === "admin",
      notice,
      clearNotice: () => setNotice(""),
      login,
      register,
      logout,
      updateUser,
    }),
    [state, notice, login, register, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
