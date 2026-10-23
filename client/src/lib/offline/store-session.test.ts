/**
 * Device store + local identity tests (jsdom localStorage backend).
 */
import { beforeEach, describe, expect, it } from "vitest";
import { clearCollection, deleteDoc, getDoc, listDocs, putDoc, updateDoc } from "./store";
import {
  clearSession,
  getCurrentUser,
  getLearningProfile,
  getOrCreateLocalUser,
  updateAccountProfile,
} from "./session";

const COLL = "t-scratch";

beforeEach(async () => {
  await clearCollection(COLL, 1);
});

describe("device document store", () => {
  it("puts, lists, gets, updates and deletes documents", async () => {
    await putDoc(COLL, 1, "a", { v: 1 });
    await putDoc(COLL, 1, "b", { v: 2 });
    expect(await listDocs(COLL, 1)).toEqual([{ v: 1 }, { v: 2 }]);
    expect(await getDoc(COLL, 1, "a")).toEqual({ v: 1 });
    await updateDoc(COLL, 1, "a", { v: 10 });
    expect(await getDoc(COLL, 1, "a")).toEqual({ v: 10 });
    await deleteDoc(COLL, 1, "b");
    expect(await listDocs(COLL, 1)).toEqual([{ v: 10 }]);
    expect(await getDoc(COLL, 1, "missing")).toBeNull();
  });

  it("revives Date objects through persistence", async () => {
    const at = new Date("2024-01-02T03:04:05.000Z");
    await putDoc(COLL, 1, "d", { at, nested: { list: [at] }, label: "2024-looks-like-a-date" });
    const back = (await getDoc<{ at: unknown; nested: { list: unknown[] }; label: string }>(COLL, 1, "d"))!;
    expect(back.at).toBeInstanceOf(Date);
    expect((back.at as Date).toISOString()).toBe("2024-01-02T03:04:05.000Z");
    expect(back.nested.list[0]).toBeInstanceOf(Date);
    // Plain strings that merely look like dates stay strings.
    expect(back.label).toBe("2024-looks-like-a-date");
  });

  it("isolates users by id", async () => {
    await putDoc(COLL, 1, "x", { v: 1 });
    await putDoc(COLL, 2, "x", { v: 2 });
    expect(await listDocs(COLL, 1)).toEqual([{ v: 1 }]);
    expect(await listDocs(COLL, 2)).toEqual([{ v: 2 }]);
  });
});

describe("device-local identity", () => {
  it("starts signed out, attaches on login, detaches on logout", async () => {
    expect(await getCurrentUser()).toBeNull();
    const first = await getOrCreateLocalUser("Doc@Example.com");
    expect(first.email).toBe("doc@example.com");
    expect(first.emailVerifiedAt).toBeInstanceOf(Date);
    const second = await getOrCreateLocalUser("doc@example.com");
    expect(second.openId).toBe(first.openId);
    expect(await getCurrentUser()).toMatchObject({ openId: first.openId });
    await clearSession();
    expect(await getCurrentUser()).toBeNull();
  });

  it("keeps learning-profile defaults and updates", async () => {
    await getOrCreateLocalUser("profile.case@example.com");
    const defaults = await getLearningProfile();
    expect(defaults.professionalTrack).toBe("Emergency Medicine Resident");
    expect(defaults.preferredLanguage).toBe("en");
    await updateAccountProfile({
      fullName: "Alaa Aqrabawi",
      professionalTrack: "Emergency medicine",
      trainingLevel: "pgy2",
      country: "Jordan",
      graduationYear: 2015,
      preferredLanguage: "ar",
    });
    const updated = await getLearningProfile();
    expect(updated.professionalTrack).toBe("Emergency medicine");
    expect(updated.preferredLanguage).toBe("ar");
    expect((await getCurrentUser())?.name).toBe("Alaa Aqrabawi");
  });
});
