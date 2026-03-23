"use server";

import { redirect } from "next/navigation";

import { env, hasSupabaseBrowserEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email) {
    redirect(`/sign-in?error=${encodeMessage("Email is required.")}`);
  }

  if (!hasSupabaseBrowserEnv) {
    redirect(
      `/sign-in?error=${encodeMessage(
        "Supabase environment variables are missing.",
      )}`,
    );
  }

  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    redirect(
      `/sign-in?error=${encodeMessage("Supabase server client is unavailable.")}`,
    );
  }

  const emailRedirectTo = new URL("/auth/confirm?next=/app", env.appUrl);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: emailRedirectTo.toString(),
      shouldCreateUser: true,
    },
  });

  if (error) {
    redirect(`/sign-in?error=${encodeMessage(error.message)}`);
  }

  redirect(`/sign-in?sent=1&email=${encodeURIComponent(email)}`);
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/sign-in");
}
