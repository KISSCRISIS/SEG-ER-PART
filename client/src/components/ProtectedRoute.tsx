import React from "react";
import { useAuth } from "@/_core/hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectPath?: string;
};

export default function ProtectedRoute({ children, redirectPath }: ProtectedRouteProps) {
  const { loading, user } = useAuth({
    redirectOnUnauthenticated: true,
    ...(redirectPath ? { redirectPath } : {}),
  });

  if (loading) {
    return (
      <main className="seg-app flex min-h-screen items-center justify-center p-5">
        <p role="status" className="text-sm text-slate-300">
          Preparing your secure workspace…
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="seg-app flex min-h-screen items-center justify-center p-5">
        <p role="status" className="text-sm text-slate-300">
          Redirecting to sign in…
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
