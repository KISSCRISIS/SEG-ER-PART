import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/routers";
import { isOfflineMode } from "./offline/offline-mode";
import { offlineTrpc } from "./offline/offlineTrpc";

const serverTrpc = createTRPCReact<AppRouter>();

type ServerTrpc = typeof serverTrpc;

/**
 * Single switch point for every page: offline mode (Capacitor, or desktop
 * with ?offline=1) serves the on-device implementation with the identical
 * hook shape; all other platforms keep the tRPC server proxy untouched.
 */
export const trpc: ServerTrpc = (
  isOfflineMode() ? offlineTrpc : serverTrpc
) as unknown as ServerTrpc;
