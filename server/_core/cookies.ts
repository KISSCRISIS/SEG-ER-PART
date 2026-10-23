import type { CookieOptions, Request } from "express";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isIpAddress(host: string) {
  // Basic IPv4 check and IPv6 presence detection.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  return host.includes(":");
}

function isSecureRequest(req: Request) {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: Request
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  const hostname = req.hostname;
  const shouldSetDomain = Boolean(
    hostname &&
      hostname.includes(".") &&
      !LOCAL_HOSTS.has(hostname) &&
      !isIpAddress(hostname)
  );
  const domain = shouldSetDomain ? `.${hostname}` : undefined;
  const isLocalDevelopmentHost =
    !hostname || LOCAL_HOSTS.has(hostname) || isIpAddress(hostname);

  return {
    domain,
    httpOnly: true,
    path: "/",
    sameSite: isLocalDevelopmentHost && !isSecureRequest(req) ? "lax" : "none",
    // Production traffic may be TLS-terminated before it reaches Express. A
    // public hostname must still receive a Secure cookie even if that proxy
    // omits `x-forwarded-proto`; otherwise Chromium discards SameSite=None
    // cookies and the following protected request has no session.
    secure: isSecureRequest(req) || !isLocalDevelopmentHost,
  };
}
