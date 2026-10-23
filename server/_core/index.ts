import "dotenv/config";
import compression from "compression";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic } from "./static";
import {
  configureSecurity,
  createApiRateLimiter,
  createAuthRateLimiter,
  errorHandler,
  notFoundHandler,
  requestLoggingMiddleware,
} from "./production";
import { log } from "./logger";
import { assertProductionEnvironment } from "./env";
import { requireSameOrigin } from "./originGuard";
import { registerLocalLogin, localEmailLoginEnabled } from "./localLogin";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

function getTrustProxySetting() {
  const value = process.env.TRUST_PROXY;
  if (!value) return process.env.NODE_ENV === "production" ? 1 : false;
  if (value === "true") return true;
  if (value === "false") return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : value;
}

function getBodyLimit() {
  return process.env.BODY_SIZE_LIMIT ?? "48mb";
}

async function startServer() {
  assertProductionEnvironment();
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", getTrustProxySetting());
  configureSecurity(app);
  app.use(requestLoggingMiddleware());
  app.use(
    compression({
      threshold: 1024,
      level: 6,
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) return false;
        return compression.filter(req, res);
      },
    })
  );

  // Rate-limit PDF imports before parsing their potentially large JSON bodies.
  app.use("/api/trpc/pdfLibrary.import", createApiRateLimiter());

  // Configure body parser with an explicit limit (35 MiB PDF + Base64/JSON overhead).
  app.use(express.json({ limit: getBodyLimit() }));
  app.use(express.urlencoded({ limit: getBodyLimit(), extended: true }));
  registerLocalLogin(app);

  // Capacitor Android WebView: minimal CORS for native bridge (additive, does not affect same-origin web/Electron)
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (origin && (origin.startsWith("capacitor://") || origin === "https://localhost" || origin === "http://localhost")) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
      if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
      }
    }
    next();
  });

  // Health checks stay lightweight and do not require authentication.
  app.get("/healthz", (req, res) => {
    res.status(200).json({
      status: "ok",
      service: process.env.SERVICE_NAME ?? "seg-api",
      environment: process.env.NODE_ENV ?? "development",
      uptimeSeconds: Math.floor(process.uptime()),
      version: process.env.APP_VERSION ?? "unknown",
      requestId: req.requestId,
    });
  });

  // Apply stricter controls to API and authentication surfaces.
  app.use("/api/trpc", createApiRateLimiter());
  app.use("/api/trpc", requireSameOrigin);
  app.use("/api/oauth", createAuthRateLimiter());
  app.use("/api/trpc/auth.login", createAuthRateLimiter());
  app.use("/api/trpc/auth.register", createAuthRateLimiter());

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Serve only the authenticated user's PDFs before the generic API 404 handler.
  app.get("/api/pdf-library/file/:pdfId", async (req, res) => {
    let user: { id: number };
    try {
      const { sdk } = await import("./sdk");
      user = await sdk.authenticateRequest(req);
    } catch {
      res.status(401).send("Unauthorized");
      return;
    }
    const { getOwnedPdfPath } = await import("../pdfLibrary");
    const fp = await getOwnedPdfPath(user.id, req.params.pdfId ?? "");
    if (!fp) { res.status(404).send("Not found"); return; }
    try {
      const fs = await import("node:fs");
      const info = await fs.promises.stat(fp);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", info.size);
      res.setHeader("X-Content-Type-Options", "nosniff");
      const stream = fs.createReadStream(fp);
      stream.on("error", () => { if (!res.headersSent) res.status(500).end(); else res.destroy(); });
      stream.pipe(res);
    } catch {
      if (!res.headersSent) res.status(404).end(); else res.destroy();
    }
  });

  // API paths never fall through to the SPA shell.
  app.use("/api", notFoundHandler);

  // Development mode uses Vite; production mode serves the compiled SPA.
  if (process.env.NODE_ENV === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  app.use(errorHandler);

  server.keepAliveTimeout = Number(process.env.KEEP_ALIVE_TIMEOUT_MS ?? 5_000);
  server.headersTimeout = Number(process.env.HEADERS_TIMEOUT_MS ?? 6_000);
  server.requestTimeout = Number(process.env.REQUEST_TIMEOUT_MS ?? 30_000);

  const preferredPort = parseInt(process.env.PORT || "3000", 10);
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    log.warn("preferred_port_unavailable", { preferredPort, selectedPort: port });
  }

  server.listen(port, process.env.SEG_DESKTOP === "true" || localEmailLoginEnabled() ? "127.0.0.1" : undefined, () => {
    const address = server.address();
    if (process.env.SEG_DESKTOP === "true" && address && typeof address === "object") {
      const desktopProcess = process as typeof process & { parentPort?: { postMessage: (message: unknown) => void } };
      desktopProcess.parentPort?.postMessage({ type: "seg-ready", port: address.port });
    }
    log.info("server_started", {
      url: `http://localhost:${port}/`,
      port,
      environment: process.env.NODE_ENV ?? "development",
    });
  });

  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    log.info("server_shutdown_started", { signal });
    server.close(error => {
      if (error) log.error("server_shutdown_failed", { signal, error });
      process.exit(error ? 1 : 0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}

process.on("unhandledRejection", reason => {
  log.error("unhandled_rejection", { error: reason });
});

process.on("uncaughtException", error => {
  log.error("uncaught_exception", { error });
  process.exitCode = 1;
});

startServer().catch(error => {
  log.error("server_start_failed", { error });
  process.exitCode = 1;
});
