import { describe, expect, it } from "vitest";
import { SEG_PUBLIC_ACTIONS } from "./seg-copy";

describe("SEG public action copy", () => {
  it("preserves the approved public action labels", () => {
    expect(SEG_PUBLIC_ACTIONS).toEqual({
      startJourney: "Start Journey",
      login: "Login",
      register: "Register",
    });
  });
});
