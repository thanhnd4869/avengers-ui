const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_HINT = `${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters, with a lowercase and an uppercase letter, a number and a special character.`;

// Mirrors the API. "Special" is anything that is not an ASCII letter, a digit
// or whitespace.
const PASSWORD_RULES = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9\s]/];
export const DISPLAY_NAME_MAX_LENGTH = 32;

/**
 * Field rules shared by the sign-in and sign-up forms. Each returns a message
 * when the value is invalid and `undefined` otherwise. The server validates
 * again; these only spare the visitor a round trip.
 */
export function validateEmail(value) {
  const email = value.trim();

  if (!email) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(email) || email.length > EMAIL_MAX_LENGTH) {
    return "Please enter a valid email address.";
  }

  return undefined;
}

export function validatePassword(value) {
  if (!value) return "Please enter a password.";
  if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
    return `Password must contain between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`;
  }
  if (!PASSWORD_RULES.every((rule) => rule.test(value))) {
    return "Password must contain a lowercase letter, an uppercase letter, a number and a special character.";
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

  if (error.status === 429) {
    return "Too many attempts. Please wait a few minutes and try again.";
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
