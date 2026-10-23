import type { RequestHandler } from "express";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function expectedOrigin(protocol: string, host: string) {
  return `${protocol}://${host}`;
}

const CAPACITOR_ALLOWED_ORIGINS = new Set(["capacitor://localhost", "https://localhost", "http://localhost"]);

export const requireSameOrigin: RequestHandler = (req, res, next) => {
  if (SAFE_METHODS.has(req.method.toUpperCase())) {
    next();
    return;
  }

  const origin = req.get("origin");
  if (!origin) {
    next();
    return;
  }

  // Capacitor Android WebView: allow capacitor://localhost and https localhost origins
  if (CAPACITOR_ALLOWED_ORIGINS.has(origin) || origin.startsWith("capacitor://")) {
    next();
    return;
  }

  const forwardedProto = req.get("x-forwarded-proto")?.split(",")[0].trim();
  const forwardedHost = req.get("x-forwarded-host")?.split(",")[0].trim();
  const protocol = forwardedProto || req.protocol;
  const host = forwardedHost || req.get("host");

  if (!host || origin !== expectedOrigin(protocol, host)) {
    res.status(403).json({ error: "Cross-origin request rejected", requestId: req.requestId });
    return;
  }

  next();
};
