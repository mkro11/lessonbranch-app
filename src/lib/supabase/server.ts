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
      setAll(cookiesToSet) {
        try {
          for (const cookie of cookiesToSet) {
            cookieStore.set(cookie.name, cookie.value, cookie.options);
          }
        } catch {
          // Server Components can read cookies but may not be able to write
          // them. Proxy/route handlers cover refresh and session writes.
        }
      },
    },
  });
}
