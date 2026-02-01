import { NextRequest } from "next/server";
import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import databaseClient from "@/lib/tina";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal ? LocalBackendAuthProvider() : LocalBackendAuthProvider(),
  databaseClient,
});

export const GET = async (request: NextRequest, context: { params: Promise<{ routes: string[] }> }) => {
  const params = await context.params;
  // @ts-expect-error - TinaNodeBackend expects IncomingMessage but Next.js provides NextRequest
  return handler(request, { params });
};

export const POST = async (request: NextRequest, context: { params: Promise<{ routes: string[] }> }) => {
  const params = await context.params;
  // @ts-expect-error - TinaNodeBackend expects IncomingMessage but Next.js provides NextRequest
  return handler(request, { params });
};
