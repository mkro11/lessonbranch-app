import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env, hasSupabaseBrowserEnv } from "@/lib/env";

export async function getSupabaseServerClient() {
  if (!hasSupabaseBrowserEnv) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // Auth middleware is not in place yet. This keeps the bootstrap client
        // safe to import without pretending cookie writes already exist.
      },
    },
  });
}
