import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { ENV } from "./env";

export const VERIFICATION_CODE_TTL_MS = 10 * 60 * 1000;
export const VERIFICATION_RESEND_DELAY_MS = 60 * 1000;
export const MAX_VERIFICATION_ATTEMPTS = 5;

export function isPilotVerificationEnabled() {
  return process.env.PILOT_MODE?.trim().toLowerCase() === "true";
}

export class EmailDeliveryError extends Error {
  constructor(public readonly status: number) {
    super(`Email provider rejected the message (${status})`);
    this.name = "EmailDeliveryError";
  }
}

export function createVerificationCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function hashVerificationCode(email: string, code: string) {
  return createHmac("sha256", ENV.cookieSecret).update(`${email.trim().toLowerCase()}:${code}`).digest("hex");
}

export function verificationCodeMatches(email: string, code: string, expectedHash: string) {
  const actual = Buffer.from(hashVerificationCode(email, code), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function sendVerificationEmail(input: { email: string; name: string; code: string }) {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoFromEmail = process.env.BREVO_FROM_EMAIL;
  const brevoFromName = process.env.BREVO_FROM_NAME ?? "JEM Nexus";
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const subject = "Verify your JEM Nexus email";
  const textContent = `Hello ${input.name},\n\nYour JEM Nexus verification code is: ${input.code}\n\nThis code expires in 10 minutes. If you did not create this account, ignore this email.`;
  const htmlContent = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#0f172a"><h1 style="color:#0891b2">Verify your email</h1><p>Hello ${escapeHtml(input.name)},</p><p>Use this verification code to activate your JEM Nexus account:</p><p style="font-size:36px;font-weight:800;letter-spacing:8px;color:#0f766e">${input.code}</p><p>This code expires in 10 minutes. If you did not create this account, ignore this email.</p></div>`;

  if (brevoApiKey && brevoFromEmail) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": brevoApiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: brevoFromName, email: brevoFromEmail },
        to: [{ email: input.email, name: input.name }],
        subject,
        textContent,
        htmlContent,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new EmailDeliveryError(response.status);
    return;
  }

  if (!apiKey || !from) throw new Error("Email delivery provider is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [input.email],
      subject,
      text: textContent,
      html: htmlContent,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new EmailDeliveryError(response.status);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}
