import type { ErrorRequestHandler, Express, RequestHandler, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { createRequestLogger, log } from "./logger";

const ONE_MINUTE_MS = 60_000;
const FIFTEEN_MINUTES_MS = 15 * ONE_MINUTE_MS;

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function isEnabled(value: string | undefined, fallback = false) {
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function createContentSecurityPolicy() {
  const development = !isProduction();

  return {
    useDefaults: false as const,
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
      formAction: ["'self'"],
      scriptSrc: development ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"] : ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: development
        ? ["'self'", "https:", "wss:", "capacitor:", "http://localhost:*", "https://localhost:*"]
        : ["'self'", "https:", "wss:", "capacitor:"],
      workerSrc: ["'self'", "blob:"],
      manifestSrc: ["'self'"],
      upgradeInsecureRequests: isEnabled(process.env.CSP_UPGRADE_INSECURE_REQUESTS) ? [] : null,
    },
  };
}

export function configureSecurity(app: Express) {
  const hstsEnabled = isEnabled(process.env.ENABLE_HSTS, false);

  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: isEnabled(process.env.DISABLE_CSP) ? false : createContentSecurityPolicy(),
      crossOriginEmbedderPolicy: false,
      hsts: hstsEnabled
        ? {
            maxAge: 31_536_000,
            includeSubDomains: true,
            preload: isEnabled(process.env.HSTS_PRELOAD, false),
          }
        : false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
  );

  app.use((_req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    res.setHeader("X-Content-Type-Options", "nosniff");
    next();
  });
}

export function createApiRateLimiter(): RequestHandler {
  return rateLimit({
    windowMs: ONE_MINUTE_MS,
    limit: Number(process.env.API_RATE_LIMIT ?? 240),
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many requests. Please retry later." },
    handler: (req, res, _next, options) => {
      log.warn("api_rate_limit_exceeded", {
        requestId: req.requestId,
        path: req.path,
        limit: options.limit,
      });
      res.status(options.statusCode).json(options.message);
    },
  });
}

export function createAuthRateLimiter(): RequestHandler {
  return rateLimit({
    windowMs: FIFTEEN_MINUTES_MS,
    limit: Number(process.env.AUTH_RATE_LIMIT ?? 30),
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many authentication attempts. Please retry later." },
    handler: (req, res, _next, options) => {
      log.warn("auth_rate_limit_exceeded", {
        requestId: req.requestId,
        path: req.path,
        limit: options.limit,
      });
      res.status(options.statusCode).json(options.message);
    },
  });
}

export function requestLoggingMiddleware(): RequestHandler {
  return createRequestLogger();
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const statusCode = typeof error?.status === "number" && error.status >= 400 && error.status < 600 ? error.status : 500;
  log.error("unhandled_request_error", {
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    statusCode,
    error,
  });

  res.status(statusCode).json({
    error: isProduction() ? "Internal server error" : error?.message ?? "Internal server error",
    requestId: req.requestId,
  });
};

export function notFoundHandler(req: Express.Request, res: Response) {
  res.status(404).json({
    error: "Not found",
    requestId: req.requestId,
  });
}
