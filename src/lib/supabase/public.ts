import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free client used only for public reads. Keeping it free of cookies()
 * means routes that use it stay eligible for the Next.js Full Route Cache/ISR
 * — touching cookies() anywhere in the render path forces fully dynamic
 * rendering instead, which would defeat the `revalidate` strategy those
 * routes rely on. Dashboard code that needs the signed-in session uses
 * `./server.ts` instead.
 */
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
