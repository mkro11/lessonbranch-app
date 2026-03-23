import Link from "next/link";

import { SignInForm } from "@/app/sign-in/sign-in-form";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function SignInPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#fffaf4_34%,#f8fbff_100%)] px-6 py-10 text-stone-900">
      <div className="mx-auto w-full max-w-6xl">
        {user ? (
          <div className="rounded-[28px] border border-stone-200 bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
              You are already signed in.
            </h1>
            <p className="mt-3 text-base leading-8 text-stone-700">
              Go to{" "}
              <Link href="/app" className="underline underline-offset-4">
                /app
              </Link>{" "}
              to continue onboarding and product setup.
            </p>
          </div>
        ) : (
          <SignInForm />
        )}
      </div>
    </main>
  );
}
