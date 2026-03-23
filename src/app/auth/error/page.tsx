import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#fffaf4_34%,#f8fbff_100%)] px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-stone-200 bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <div className="inline-flex rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-medium tracking-[0.18em] text-rose-900 uppercase">
          Auth Error
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">
          The sign-in link could not be confirmed.
        </h1>
        <p className="mt-4 text-base leading-8 text-stone-700">
          Request a new magic link and try again. If this keeps failing, check
          the Supabase auth redirect URLs and email template settings.
        </p>
        <div className="mt-8">
          <Link
            href="/sign-in"
            className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
