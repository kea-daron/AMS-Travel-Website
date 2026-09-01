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
