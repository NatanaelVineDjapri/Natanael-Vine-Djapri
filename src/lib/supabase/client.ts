import { createBrowserClient } from "@supabase/ssr";

/** Browser-side client. Only consumer: the `/dashboard/login` form. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
