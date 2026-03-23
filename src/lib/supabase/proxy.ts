import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { env, hasSupabaseBrowserEnv } from "@/lib/env";

export async function updateSession(request: NextRequest) {
  if (!hasSupabaseBrowserEnv) {
    return NextResponse.next({
      request,
    });
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const cookie of cookiesToSet) {
          request.cookies.set(cookie.name, cookie.value);
        }

        response = NextResponse.next({
          request,
        });

        for (const cookie of cookiesToSet) {
          response.cookies.set(cookie.name, cookie.value, cookie.options);
        }
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}
