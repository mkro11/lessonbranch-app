import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/sign-in/actions";
import { SubmitButton } from "@/components/submit-button";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4f0e8_0%,#fbfaf8_42%,#f2f7ff_100%)] px-6 py-8 text-stone-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[28px] border border-stone-200 bg-white/90 px-6 py-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
              LessonBranch Parent App
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
              Authenticated build shell
            </h1>
            <p className="mt-1 text-sm text-stone-600">{user.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
            >
              Dashboard
            </Link>
            <Link
              href="/app/onboarding"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
            >
              Onboarding
            </Link>
            <form action={signOut}>
              <SubmitButton
                idleLabel="Sign out"
                pendingLabel="Signing out..."
                className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white"
              />
            </form>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
