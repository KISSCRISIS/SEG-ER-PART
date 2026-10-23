import { randomUUID } from "node:crypto";
import type { NextFunction, Request, RequestHandler, Response } from "express";

const SENSITIVE_KEYS = new Set(["authorization", "cookie", "set-cookie", "x-api-key", "api-key", "password", "token"]);

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      requestStartedAt?: number;
    }
  }
}

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    };
  }
  return { message: String(error) };
}

function write(level: "info" | "warn" | "error", event: string, metadata: Record<string, unknown> = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    service: process.env.SERVICE_NAME ?? "seg-api",
    environment: process.env.NODE_ENV ?? "development",
    ...metadata,
  };

  const output = `${JSON.stringify(payload)}\n`;
  if (level === "error") {
    process.stderr.write(output);
  } else {
    process.stdout.write(output);
  }
}

export const log = {
  info: (event: string, metadata?: Record<string, unknown>) => write("info", event, metadata),
  warn: (event: string, metadata?: Record<string, unknown>) => write("warn", event, metadata),
  error: (event: string, metadata?: Record<string, unknown>) =>
    write("error", event, {
      ...metadata,
      error: metadata?.error === undefined ? undefined : serializeError(metadata.error),
    }),
};

function getRequestId(request: Request) {
  const incoming = request.header("x-request-id")?.trim();
  if (incoming && /^[A-Za-z0-9._:-]{1,128}$/.test(incoming)) return incoming;
  return randomUUID();
}

function safeHeaders(request: Request) {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(request.headers)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) continue;
    if (typeof value === "string") result[key] = value;
  }
  return result;
}

export function createRequestLogger(): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    const startedAt = process.hrtime.bigint();
    request.requestId = getRequestId(request);
    request.requestStartedAt = Date.now();
    response.setHeader("X-Request-Id", request.requestId);

    response.on("finish", () => {
      const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
      const metadata = {
        requestId: request.requestId,
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
        durationMs: Number(durationMs.toFixed(2)),
        userAgent: request.get("user-agent"),
      };

      if (response.statusCode >= 500) log.error("request_completed", metadata);
      else if (response.statusCode >= 400) log.warn("request_completed", metadata);
      else log.info("request_completed", metadata);
    });

    if (process.env.LOG_REQUEST_HEADERS === "true") {
      log.info("request_received", {
        requestId: request.requestId,
        method: request.method,
        path: request.originalUrl,
        headers: safeHeaders(request),
      });
    }

    next();
  };
}
