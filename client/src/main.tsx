import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { startLogin } from "./const";
import "./index.css";
import { getTrpcUrl, getFetchCredentials } from "@/lib/api-config";
import { getBearerTokenSync } from "@/lib/mobile-auth";
import { isOfflineMode } from "@/lib/offline/offline-mode";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  startLogin();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const OFFLINE = isOfflineMode();

const trpcClient = OFFLINE
  ? null
  : trpc.createClient({
  links: [
    httpBatchLink({
      url: getTrpcUrl(),
      transformer: superjson,
      method: "POST",
      headers() {
        // Web/Electron: cookie flow primary; Bearer fallback for WebView/ITP.
        // Capacitor Android: persistent Bearer via mobile-auth (Preferences + sessionStorage)
        try {
          const token = getBearerTokenSync();
          if (token) {
            return { Authorization: `Bearer ${token}` };
          }
          // Legacy: direct sessionStorage read (kept for backward compat)
          const raw = sessionStorage.getItem("manus-cookie");
          if (raw) {
            const prefix = `${COOKIE_NAME}=`;
            const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
            const t = pair?.trim().slice(prefix.length);
            if (t) return { Authorization: `Bearer ${t}` };
          }
        } catch {
          // storage unavailable
        }
        return {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: getFetchCredentials(),
        });
      },
    }),
  ],
});

if (OFFLINE) {
  // Offline bundle: no tRPC client/Provider — queries run on-device.
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <trpc.Provider client={trpcClient!} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
