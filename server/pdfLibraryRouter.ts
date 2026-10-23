import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { parseImportPayload } from "./questionImport"; // reusing parse logic conceptually, but this is different
import * as pdfLib from "./pdfLibrary";
import path from "node:path";
import { mkdirSync } from "node:fs";

export const pdfLibraryRouter = router({
  import: protectedProcedure
    .input(z.object({ fileName: z.string().min(1).max(120), fileBase64: z.string().max(50_000_000) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const buffer = Buffer.from(input.fileBase64, "base64");
        const meta = pdfLib.storePdf(ctx.user.id, input.fileName, buffer);
        const extract = pdfLib.countPagesAndExtract(buffer);
        return { id: meta.id, name: meta.name, pages: extract.pageCount, createdAt: meta.createdAt };
      } catch (e: any) {
        throw new TRPCError({ code: "BAD_REQUEST", message: e.message ?? "Failed to import PDF." });
      }
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const dir = process.env.SEG_LOCAL_DATA_DIR ? path.resolve(process.env.SEG_LOCAL_DATA_DIR, "pdf-library") : null;
    if (!dir) return { items: [] };
    try {
      const entries = await import("fs/promises").then(m => m.readdir(dir, { withFileTypes: true }));
      const files = entries.filter((e: any) => e.isFile() && (e.name.endsWith(".pdf") || e.name.endsWith(".PDF")));
      const items: { id: string; name: string; pages: number; createdAt: string }[] = [];
      for (const file of files) {
        const fp = path.join(dir, file.name);
        const stats = await import("fs/promises").then(m => m.stat(fp));
        // Try to get page count from cached meta if available; else 0 (will be read on open)
        items.push({ id: file.name, name: file.name.replace(/^.*-/, "").replace(/\.pdf$/i, ""), pages: 0, createdAt: new Date(stats.mtime).toISOString() });
      }
      return { total: items.length, items };
    } catch { return { total: 0, items: [] }; }
  }),
  read: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200) }))
    .mutation(async ({ input }) => {
      const dir = process.env.SEG_LOCAL_DATA_DIR ? path.resolve(process.env.SEG_LOCAL_DATA_DIR, "pdf-library") : null;
      if (!dir) throw new TRPCError({ code: "NOT_FOUND", message: "Local PDF store unavailable." });
      const fp = path.join(dir, input.pdfId);
      try {
        const stat = await import("fs/promises").then(m => m.stat(fp));
        return { filePath: fp, exists: true, size: stat.size };
      } catch { throw new TRPCError({ code: "NOT_FOUND", message: "PDF not found in library." }); }
    }),
  summarize: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200), pageRange: z.array(z.number().int().min(1)).optional() }))
    .mutation(async ({ input }) => {
      const dir = process.env.SEG_LOCAL_DATA_DIR ? path.resolve(process.env.SEG_LOCAL_DATA_DIR, "pdf-library") : null;
      if (!dir) throw new TRPCError({ code: "NOT_FOUND", message: "Local PDF store unavailable." });
      const fp = path.join(dir, input.pdfId);
      try {
        const buf = require("fs").readFileSync(fp);
        const { pageCount, pages } = pdfLib.countPagesAndExtract(buf);
        const summary = pdfLib.summarizeExtracted(pages, input.pageRange);
        return { pageCount, summaryText: summary.summaryText, sourcePages: summary.sourcePages, isImageOnlyDetected: summary.isImageOnlyDetected, pagesExtracted: pages.map(p => p.page) };
      } catch (e: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: e.message ?? "Failed to summarize." });
      }
    }),
  saveNote: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200), page: z.number().int().min(1), text: z.string().max(4000) }))
    .mutation(async ({ ctx, input }) => {
      const key = `pdf-note:${ctx.user.id}:${input.pdfId}:${input.page}`;
      // Persist via localStore in server; for simplicity here we rely on client localStorage
      // but to satisfy "persist after restart" locally, server writes to workspace
      const { localStorageEnabled, localStore } = await import("./localStore");
      if (localStorageEnabled()) {
        localStore().put("pdf-library-notes", ctx.user.id, key, { pdfId: input.pdfId, page: input.page, text: input.text, updatedAt: new Date() });
      }
      return { saved: true };
    }),
  saveBookmark: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200), page: z.number().int().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const key = `pdf-bookmark:${ctx.user.id}:${input.pdfId}`;
      const { localStorageEnabled, localStore } = await import("./localStore");
      if (localStorageEnabled()) {
        const existing = localStore().list<{ pages: number[] }>("pdf-library-bookmarks", ctx.user.id).find(b => b.pdfId === input.pdfId) ?? { pdfId: input.pdfId, pages: [] };
        const pages = new Set(existing.pages);
        pages.add(input.page);
        localStore().put("pdf-library-bookmarks", ctx.user.id, key, { pdfId: input.pdfId, pages: Array.from(pages).sort((a,b)=>a-b), updatedAt: new Date() });
      }
      return { saved: true };
    }),
  getPosition: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200) }))
    .query(async ({ ctx, input }) => {
      const key = `pdf-pos:${ctx.user.id}:${input.pdfId}`;
      const { localStorageEnabled, localStore } = await import("./localStore");
      if (localStorageEnabled()) {
        const docs = localStore().list<{ page: number }>("pdf-library-positions", ctx.user.id);
        const doc = docs.find(d => (d as any).pdfId === input.pdfId);
        if (doc) return { page: doc.page };
      }
      return { page: 1 };
    }),
  setPosition: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200), page: z.number().int().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const key = `pdf-pos:${ctx.user.id}:${input.pdfId}`;
      const { localStorageEnabled, localStore } = await import("./localStore");
      if (localStorageEnabled()) localStore().put("pdf-library-positions", ctx.user.id, key, { pdfId: input.pdfId, page: input.page, updatedAt: new Date() });
      return { saved: true };
    }),
  notes: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200) }))
    .query(async ({ ctx, input }) => {
      const { localStorageEnabled, localStore } = await import("./localStore");
      if (!localStorageEnabled()) return { items: [] };
      const docs = localStore().list<{ pdfId: string; page: number; text: string; updatedAt: string }>("pdf-library-notes", ctx.user.id);
      const items = docs.filter((d: any) => d.pdfId === input.pdfId);
      return { items: items.map((d: any) => ({ page: d.page ?? 0, text: d.text ?? "", updatedAt: d.updatedAt ?? "" })) };
    }),
  bookmarks: protectedProcedure
    .input(z.object({ pdfId: z.string().min(1).max(200) }))
    .query(async ({ ctx, input }) => {
      const { localStorageEnabled, localStore } = await import("./localStore");
      if (!localStorageEnabled()) return { pages: [] };
      const docs = localStore().list<{ pdfId: string; pages: number[]; updatedAt: string }>("pdf-library-bookmarks", ctx.user.id);
      const found = docs.find((d: any) => d.pdfId === input.pdfId) ?? { pages: [] as number[] };
      return { pages: Array.from(new Set(found.pages ?? [])).sort((a: number, b: number) => a - b) };
    }),
});
