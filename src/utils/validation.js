const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_MIN_LENGTH = 8;
export const DISPLAY_NAME_MAX_LENGTH = 32;

/**
 * Field rules shared by the sign-in and sign-up forms. Each returns a message
 * when the value is invalid and `undefined` otherwise. The server validates
 * again; these only spare the visitor a round trip.
 */
export function validateEmail(value) {
  const email = value.trim();

  if (!email) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";

  return undefined;
}

export function validatePassword(value) {
  if (!value) return "Please enter a password.";
  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return "Password must contain at least one letter and one number.";
  }

  return undefined;
}

export function validateDisplayName(value) {
  const name = value.trim();

  if (name.length < 2) return "Display name must be at least 2 characters.";
  if (name.length > DISPLAY_NAME_MAX_LENGTH) {
    return `Display name must be at most ${DISPLAY_NAME_MAX_LENGTH} characters.`;
  }

  return undefined;
}

/**
 * Drops the rules that passed, so an empty object means the form is valid.
 */
export function collectErrors(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}

/**
 * Maps an API validation error onto the form fields it names.
 */
export function apiFieldErrors(error) {
  return Object.fromEntries(
    (error.details ?? [])
      .filter((detail) => detail.field)
      .map((detail) => [detail.field, detail.message]),
  );
}

/**
 * The message to show above a form when the API rejected the whole request
 * rather than a field. Raw server wording (such as an unknown route) is not
 * meant for visitors, so only validation messages are passed through.
 */
export function apiFormError(error) {
  if (error.code === "NETWORK_ERROR") {
    return "Unable to reach the server. Please check your connection and try again.";
  }

  if (error.code === "VALIDATION_ERROR") {
    return error.message;
  }

  return "Something went wrong on our side. Please try again in a moment.";
}

/**
 * Accepts only a path on this site, so a crafted `?redirect=` link cannot send
 * the visitor to another host after signing in.
 */
export function safeRedirect(value, fallback = "/") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : fallback;
}
