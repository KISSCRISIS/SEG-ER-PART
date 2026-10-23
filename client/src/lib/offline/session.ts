/**
 * Device-local identity — offline replacement for the server auth workspace.
 * Single-user model: the device holds one profile (the person holding the
 * phone). Login/registration create-or-attach that profile; there is no
 * password gate, no email verification, and no OAuth — nothing leaves the
 * device. Shapes mirror server/db.ts local-workspace branches so the client
 * observes identical user/profile objects.
 */
import { getDoc, listDocs, putDoc } from "./store";

export type OfflineUser = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string;
  role: "user";
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
  emailVerifiedAt: Date | null;
};

export type OfflineLearningProfile = {
  id: number;
  userId: number;
  fullName?: string;
  professionalTrack: string;
  trainingLevel: string;
  country: string | null;
  graduationYear: number | null;
  preferredLanguage: "en" | "ar";
  createdAt: Date;
  updatedAt: Date;
};

const DEVICE_USER_ID = 1;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function defaultProfile(): OfflineLearningProfile {
  const now = new Date();
  return {
    id: DEVICE_USER_ID,
    userId: DEVICE_USER_ID,
    professionalTrack: "Emergency Medicine Resident",
    trainingLevel: "pgy1",
    country: null,
    graduationYear: null,
    preferredLanguage: "en",
    createdAt: now,
    updatedAt: now,
  };
}

export async function getCurrentUser(): Promise<OfflineUser | null> {
  const session = await getDoc<{ openId: string }>("session", 0, "current");
  if (!session) return null;
  return getDoc<OfflineUser>("users", 0, session.openId);
}

/** LoginPage / RegisterPage entry point: attach the device to this email. */
export async function getOrCreateLocalUser(
  emailInput: string,
  fullName?: string
): Promise<OfflineUser> {
  const email = normalizeEmail(emailInput);
  const openId = `local:${email}`;
  const existing = await getDoc<OfflineUser>("users", 0, openId);
  const now = new Date();
  if (existing) {
    const updated: OfflineUser = { ...existing, lastSignedIn: now, updatedAt: now };
    if (fullName && !existing.name) updated.name = fullName;
    await putDoc("users", 0, openId, updated);
    await putDoc("session", 0, "current", { openId });
    return updated;
  }
  const users = await listDocs<OfflineUser>("users", 0);
  const id = users.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const user: OfflineUser = {
    id,
    openId,
    email,
    name: fullName ?? email.split("@")[0] ?? "SEG User",
    role: "user",
    loginMethod: "local",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    emailVerifiedAt: now,
  };
  await putDoc("users", 0, openId, user);
  await putDoc("session", 0, "current", { openId });
  return user;
}

export async function clearSession(): Promise<void> {
  // keep(): remove the current-session pointer only — profile, progress and
  // content stay on the device for the next sign-in.
  const { storageRemoveAsync } = await import("../mobile-storage");
  try {
    await storageRemoveAsync("seg-offline/v1:session:0");
  } catch {
    // storage unavailable — session stays, harmless on a personal device.
  }
}

export async function getLearningProfile(): Promise<OfflineLearningProfile> {
  const saved = await getDoc<OfflineLearningProfile>("profiles", DEVICE_USER_ID, "profile");
  if (saved) return saved;
  const fresh = defaultProfile();
  await putDoc("profiles", DEVICE_USER_ID, "profile", fresh);
  return fresh;
}

export async function updateAccountProfile(input: {
  fullName: string;
  professionalTrack: string;
  trainingLevel: string;
  country?: string | null;
  graduationYear?: number | null;
  preferredLanguage: "en" | "ar";
}): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Please login (10001)");
  const now = new Date();
  await putDoc<OfflineUser>("users", 0, user.openId, {
    ...user,
    name: input.fullName.trim(),
    updatedAt: now,
  });
  const previous = await getLearningProfile();
  const country = input.country?.trim() || null;
  await putDoc<OfflineLearningProfile>("profiles", DEVICE_USER_ID, "profile", {
    ...previous,
    fullName: input.fullName.trim(),
    professionalTrack: input.professionalTrack.trim(),
    trainingLevel: input.trainingLevel,
    country,
    graduationYear: input.graduationYear ?? null,
    preferredLanguage: input.preferredLanguage,
    updatedAt: now,
  });
}
