# SEG Full QA — Production Route Matrix

Captured: 2026-08-22T16:40:22Z

| Route | Status | Content type | SPA/JSON observation |
|---|---:|---|---|
| `/` | 200 | `text/html; charset=UTF-8` | HTML shell |
| `/register` | 200 | `text/html; charset=UTF-8` | HTML shell |
| `/login` | 200 | `text/html; charset=UTF-8` | HTML shell |
| `/dashboard` | 200 | `text/html; charset=UTF-8` | HTML shell |
| `/laboratory` | 200 | `text/html; charset=UTF-8` | HTML shell |
| `/404` | 200 | `text/html; charset=UTF-8` | HTML shell |
| `/api/unknown` | 404 | `application/json; charset=utf-8` | {"error":"Not found","requestId":"5fd20c55-03dd-40ff-a79d-fdacbcf2f218"} |

## Security header observation on `/healthz`
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';object-src 'none';frame-ancestors 'self';form-action 'self';script-src 'self';style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;font-src 'self' data: https://fonts.gstatic.com;img-src 'self' data: blob: https:;connect-src 'self' https: wss:;worker-src 'self' blob:;manifest-src 'self'
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
X-Request-Id: e3c3bb81-03c1-4f8b-b29d-48d444a7fad6

## Authentication boundary
The protected Dashboard was checked only as an unauthenticated HTTP shell response. No login, cookie injection, OAuth callback, or session takeover was performed; authenticated behavior remains unverified in this local run.
