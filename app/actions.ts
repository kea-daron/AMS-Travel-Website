"use server";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles the "plan my trip" form.
 *
 * TODO: forward the enquiry to the CRM / email provider. Until that exists this
 * only validates the address and records it in the server log.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const email = String(formData.get("email") ?? "").trim();
  const destination = String(formData.get("destination") ?? "").trim();

  if (!EMAIL.test(email)) {
    return {
      status: "error",
      message: "That email address doesn't look right — mind checking it?",
    };
  }

  console.info("[enquiry]", { email, destination });

  return {
    status: "success",
    message: "Got it. One of our specialists will reply within one working day.",
  };
}

export type AuthState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Keyed by field name, so each input can show its own message. */
  errors?: Record<string, string>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values?: Record<string, string>;
};

export const authInitialState: AuthState = { status: "idle", message: "" };

const USERNAME = /^[a-zA-Z0-9_.]{3,24}$/;

/**
 * Signs a traveller in.
 *
 * TODO: no auth provider is wired up yet. This validates the shape of the
 * credentials and stops there — it never checks them against a user record and
 * never establishes a session.
 */
export async function signIn(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors: Record<string, string> = {};
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values: { email },
    };
  }

  console.info("[auth] sign-in attempt", { email });

  return {
    status: "success",
    message: "Details look right — sign-in is not connected yet.",
    values: { email },
  };
}

/**
 * Registers a new traveller.
 *
 * TODO: as with `signIn`, there is no user store behind this. It validates the
 * form and logs the attempt.
 */
export async function signUp(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const username = String(formData.get("username") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const errors: Record<string, string> = {};

  if (!USERNAME.test(username)) {
    errors.username =
      "3–24 characters, using letters, numbers, dots or underscores.";
  }
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8) {
    errors.password = "Use at least 8 characters.";
  } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    errors.password = "Mix in at least one letter and one number.";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Repeat your password.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Both passwords need to match.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values: { username, email },
    };
  }

  console.info("[auth] sign-up attempt", { username, email });

  return {
    status: "success",
    message: "Details look right — registration is not connected yet.",
    values: { username, email },
  };
}
