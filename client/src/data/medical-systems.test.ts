import { describe, expect, it } from "vitest";
import { HIGH_YIELD_SECTION_TITLES } from "@/lib/high-yield-chapter-map";
import {
  MEDICAL_SYSTEMS,
  SECTION_TO_SYSTEM,
  isMedicalSystemId,
  medicalSystemById,
  systemForTopic,
} from "./medical-systems";

const REQUIRED_SYSTEM_IDS = [
  "cardiovascular",
  "respiratory",
  "neurology",
  "trauma",
  "musculoskeletal",
  "toxicology",
  "infectious-disease",
  "gastrointestinal",
  "renal-urology",
  "endocrinology",
  "pediatrics",
  "obstetrics-gynecology",
  "ent-ophthalmology",
  "dermatology",
];

describe("browse by medical system", () => {
  it("exposes every required medical system with a unique system route", () => {
    for (const id of REQUIRED_SYSTEM_IDS) {
      expect(isMedicalSystemId(id)).toBe(true);
      expect(medicalSystemById(id)?.route).toBe(`/learn/system/${id}`);
    }
    const routes = MEDICAL_SYSTEMS.map(system => system.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("covers every existing chapter-map section so no topic is hidden", () => {
    for (const section of HIGH_YIELD_SECTION_TITLES) {
      expect(SECTION_TO_SYSTEM[section]).toBeTruthy();
      expect(isMedicalSystemId(SECTION_TO_SYSTEM[section])).toBe(true);
    }
  });

  it("classifies representative emergency topics into the expected system", () => {
    expect(systemForTopic("rosen", "ACUTE CORONARY SYNDROME")).toBe(
      "cardiovascular"
    );
    expect(systemForTopic("tintinalli", "Head Trauma")).toBe("trauma");
    expect(systemForTopic("rosen", "ANKYLOSING SPONDYLITIS")).toBe(
      "musculoskeletal"
    );
    expect(systemForTopic("rosen", "APPENDICITIS")).toBe("gastrointestinal");
    expect(systemForTopic("rosh", "Cardiovascular System")).toBe(
      "cardiovascular"
    );
    expect(systemForTopic("rosh", "Pulmonology")).toBe("respiratory");
    expect(systemForTopic("rosh", "Orthopedics/Rheumatology")).toBe(
      "musculoskeletal"
    );
  });

  it("returns unknown ids as missing instead of inventing a system", () => {
    expect(medicalSystemById("not-a-system")).toBeUndefined();
    expect(isMedicalSystemId("not-a-system")).toBe(false);
  });
});
