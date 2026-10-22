import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side client bound to the current request's cookies — used wherever
 * the signed-in admin session is needed for RLS (dashboard Server
 * Components/Actions). Never used for public reads; see `./public.ts`.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component render (not a Server Action or
            // Route Handler) — cookies() is read-only there. Safe to ignore
            // since middleware refreshes the session on every request.
          }
        },
      },
    },
  );
}
