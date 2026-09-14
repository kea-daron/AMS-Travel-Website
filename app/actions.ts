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

const USERNAME = /^[a-zA-Z0-9_.]{3,24}$/;

/**
 * The one account that can log in until the API exists. It lives here, in a
 * server action, so the password never reaches the browser.
 *
 * TODO: delete this and check credentials against the API instead.
 */
const TEST_ACCOUNT = { username: "qwer", password: "1234" } as const;

/**
 * Signs a traveller in with a username or email and a password.
 *
 * TODO: no auth provider is wired up yet, so only TEST_ACCOUNT gets in. On
 * success the login form starts a stand-in session in the browser (see
 * `lib/use-session.ts`).
 */
export async function signIn(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const identifier = String(formData.get("identifier") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors: Record<string, string> = {};
  if (!identifier) errors.identifier = "Enter your username or email.";
  if (!password) errors.password = "Enter your password.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values: { identifier },
    };
  }

  const matches =
    identifier.toLowerCase() === TEST_ACCOUNT.username &&
    password === TEST_ACCOUNT.password;

  if (!matches) {
    return {
      status: "error",
      message: "Incorrect username or password.",
      errors: { password: "Incorrect username or password." },
      values: { identifier },
    };
  }

  return {
    status: "success",
    message: "Signed in.",
    values: { username: TEST_ACCOUNT.username },
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
