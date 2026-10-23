import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(path.join(distPath, "index.html"))) {
    throw new Error("Application build is missing. Run the build before starting SEG.");
  }
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`) && /-[A-Za-z0-9_-]{8}\.[^.]+$/.test(path.basename(filePath))) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (path.basename(filePath) === "index.html") res.setHeader("Cache-Control", "no-cache");
    },
  }));
  app.get("*", (_req, res) => { res.setHeader("Cache-Control", "no-cache"); res.sendFile(path.join(distPath, "index.html")); });
}
