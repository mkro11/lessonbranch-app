import { env, hasStripeEnv, hasSupabaseBrowserEnv } from "@/lib/env";

export default function Home() {
  const readiness = [
    {
      label: "App Scaffold",
      value: "Ready",
      detail: "Next.js app, Tailwind, linting, and app router are in place.",
    },
    {
      label: "Supabase Wiring",
      value: hasSupabaseBrowserEnv ? "Configured" : "Pending env",
      detail: hasSupabaseBrowserEnv
        ? "Public Supabase variables are available for auth and data work."
        : "Add Supabase URL and anon key to start auth and schema work.",
    },
    {
      label: "Stripe Wiring",
      value: hasStripeEnv ? "Configured" : "Pending env",
      detail: hasStripeEnv
        ? "Server billing variables are present for trial and subscription work."
        : "Add Stripe keys and webhook secret before billing integration.",
    },
  ];

  const surfaces = [
    "Magic-link sign in",
    "Parent onboarding shell",
    "Student setup",
    "Goals and resources input",
    "Branch overview",
    "Upcoming",
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#fffaf4_34%,#f8fbff_100%)] px-6 py-8 text-stone-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[32px] border border-stone-200/70 bg-white/80 shadow-[0_24px_80px_rgba(58,44,16,0.08)] backdrop-blur">
          <div className="grid gap-8 px-8 py-10 md:grid-cols-[1.35fr_0.85fr] md:px-10">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium tracking-[0.18em] text-amber-900 uppercase">
                LessonBranch V1 Bootstrap
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
                  Parent-first planning that turns resources into next steps.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-stone-700 md:text-lg">
                  This starter app is wired for the LessonBranch stack: Next.js
                  on Vercel, Supabase for auth and data, and Stripe for the
                  seven-day trial-to-paid path.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-stone-950 px-4 py-2 font-medium text-white">
                  Magic link only
                </span>
                <span className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-700">
                  $20 / month
                </span>
                <span className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-700">
                  7-day trial, card up front
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-950 p-6 text-stone-50">
              <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
                Current app target
              </p>
              <ul className="mt-5 space-y-3 text-sm text-stone-200">
                {surfaces.map((surface) => (
                  <li
                    key={surface}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span>{surface}</span>
                    <span className="text-xs text-stone-400">planned</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {readiness.map((item) => (
            <article
              key={item.label}
              className="rounded-[24px] border border-stone-200 bg-white/85 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-500">
                    {item.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-stone-950">
                    {item.value}
                  </h2>
                </div>
                <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                  bootstrap
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                {item.detail}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 rounded-[28px] border border-stone-200 bg-white/80 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
              Next implementation moves
            </p>
            <ol className="space-y-3 text-sm leading-7 text-stone-700">
              <li>1. Add a local `.env.local` from `.env.example`.</li>
              <li>2. Build the magic-link auth entry flow with Supabase.</li>
              <li>3. Add the parent onboarding shell and first student form.</li>
              <li>4. Link Stripe checkout and trial gating.</li>
            </ol>
          </div>
          <div className="rounded-[24px] bg-stone-950 p-6 text-stone-100">
            <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
              Local app URL
            </p>
            <p className="mt-3 break-all font-mono text-sm">{env.appUrl}</p>
            <div className="mt-6 border-t border-white/10 pt-6 text-sm leading-7 text-stone-300">
              Product truth stays in Supabase. Billing truth stays in Stripe.
              This shell is intentionally thin so auth, onboarding, and branch
              planning can be layered in without churn.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
