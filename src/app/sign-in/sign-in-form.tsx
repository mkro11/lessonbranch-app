"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { requestMagicLink } from "@/app/sign-in/actions";
import { SubmitButton } from "@/components/submit-button";

export function SignInForm() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const email = searchParams.get("email");
  const error = searchParams.get("error");

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
      <section className="rounded-[28px] border border-stone-200 bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <div className="space-y-5">
          <div className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium tracking-[0.18em] text-amber-900 uppercase">
            Parent Sign In
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-stone-950">
              Sign in with a magic link.
            </h1>
            <p className="max-w-xl text-base leading-8 text-stone-700">
              LessonBranch V1 uses email magic links only. Enter your email and
              Supabase will send a secure sign-in link to continue into the
              parent command center.
            </p>
          </div>
        </div>

        <form action={requestMagicLink} className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-700">
              Parent email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none ring-0 transition focus:border-stone-500"
            />
          </label>

          <SubmitButton
            idleLabel="Send magic link"
            pendingLabel="Sending magic link..."
            className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </form>

        {sent === "1" && email ? (
          <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm leading-7 text-emerald-900">
            Magic link sent to <span className="font-medium">{email}</span>.
            Open the email and follow the link to finish sign in.
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm leading-7 text-rose-900">
            {error}
          </div>
        ) : null}
      </section>

      <aside className="rounded-[28px] border border-stone-200 bg-stone-950 p-8 text-stone-100 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
        <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
          Current access model
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-300">
          <li>One primary parent account per household in V1.</li>
          <li>No child accounts or student login.</li>
          <li>Billing remains separate from auth until checkout is wired.</li>
          <li>Branch planning and onboarding live inside the protected app.</li>
        </ul>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-stone-400">
          Need the product overview first? Return to{" "}
          <Link href="/" className="text-stone-100 underline underline-offset-4">
            the bootstrap page
          </Link>
          .
        </div>
      </aside>
    </div>
  );
}
