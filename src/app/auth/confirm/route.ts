import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const code = searchParams.get("code");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") || "/app";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("code");

  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    const errorRedirect = request.nextUrl.clone();
    errorRedirect.pathname = "/auth/error";
    return NextResponse.redirect(errorRedirect);
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  const errorRedirect = request.nextUrl.clone();
  errorRedirect.pathname = "/auth/error";
  return NextResponse.redirect(errorRedirect);
}
