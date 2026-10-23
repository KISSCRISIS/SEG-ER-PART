import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { getOwnedPdfPath, isValidOwnedPdfId, listStoredPdfs, storePdf } from "./pdfLibrary";

let dataDir = "";
let previousDataDir: string | undefined;

beforeEach(async () => {
  previousDataDir = process.env.SEG_LOCAL_DATA_DIR;
  dataDir = await mkdtemp(path.join(tmpdir(), "seg-pdf-library-test-"));
  process.env.SEG_LOCAL_DATA_DIR = dataDir;
});

afterEach(async () => {
  if (previousDataDir === undefined) delete process.env.SEG_LOCAL_DATA_DIR;
  else process.env.SEG_LOCAL_DATA_DIR = previousDataDir;
  if (dataDir) await rm(dataDir, { recursive: true, force: true });
});

describe("PDF library ownership and validation", () => {
  it("lists and opens only PDFs owned by the requested user", async () => {
    const pdf = Buffer.from("%PDF-1.4\n%%EOF", "ascii");
    const stored = await storePdf(101, "study.pdf", pdf);

    expect(isValidOwnedPdfId(101, stored.id)).toBe(true);
    expect(await getOwnedPdfPath(101, stored.id)).toBe(stored.filePath);
    expect(await getOwnedPdfPath(202, stored.id)).toBeNull();

    const ownerItems = await listStoredPdfs(101);
    const otherUserItems = await listStoredPdfs(202);
    expect(ownerItems.map(item => item.id)).toEqual([stored.id]);
    expect(otherUserItems).toEqual([]);
  });

  it("rejects traversal paths and IDs belonging to another user", () => {
    expect(isValidOwnedPdfId(101, "../202-secret.pdf")).toBe(false);
    expect(isValidOwnedPdfId(101, "202-secret.pdf")).toBe(false);
    expect(isValidOwnedPdfId(101, "101-../secret.pdf")).toBe(false);
    expect(isValidOwnedPdfId(101, "101-study.txt")).toBe(false);
  });

  it("rejects invalid headers and unsafe filenames", async () => {
    await expect(storePdf(101, "not-a-pdf.pdf", Buffer.from("not a PDF"))).rejects.toThrow(/PDF header/);
    await expect(storePdf(101, "../study.pdf", Buffer.from("%PDF-1.4"))).rejects.toThrow(/filename/);
  });
});
