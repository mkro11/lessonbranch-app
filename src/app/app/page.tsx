const readinessCards = [
  {
    title: "Auth",
    status: "live",
    detail: "Magic-link sign-in and protected routing are in place.",
  },
  {
    title: "Onboarding",
    status: "stubbed",
    detail: "The parent onboarding shell exists and is ready for persistence.",
  },
  {
    title: "Billing",
    status: "next",
    detail: "Stripe objects exist in test mode, but checkout is not wired yet.",
  },
];

const nextBuildMoves = [
  "Persist the first household record after sign-in.",
  "Add the first student form with Supabase writes.",
  "Add goal and resource capture.",
  "Start the branch overview shell.",
];

export default function AppHomePage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        {readinessCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[24px] border border-stone-200 bg-white/90 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]"
          >
            <p className="text-sm font-medium text-stone-500">{card.title}</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-950">
              {card.status}
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-stone-200 bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
            Parent dashboard direction
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
            Build the calm command center first.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700">
            The protected app shell is now the place to layer in household
            setup, student creation, goals, resources, and then branch planning.
            The system should stay parent-first and operationally simple.
          </p>
        </article>

        <aside className="rounded-[28px] border border-stone-200 bg-stone-950 p-8 text-stone-100 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
          <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
            Next build moves
          </p>
          <ol className="mt-5 space-y-3 text-sm leading-7 text-stone-300">
            {nextBuildMoves.map((item, index) => (
              <li key={item}>
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </div>
  );
}
