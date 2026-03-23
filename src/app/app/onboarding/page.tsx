const onboardingSteps = [
  {
    title: "Household",
    detail: "Name the household and establish the owner relationship.",
  },
  {
    title: "Student",
    detail: "Create the first child profile with age/grade band and notes.",
  },
  {
    title: "Goals",
    detail: "Capture the first learning priorities before branch generation.",
  },
  {
    title: "Resources",
    detail: "Add the first books, links, PDFs, apps, and activities.",
  },
];

export default function OnboardingPage() {
  return (
    <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-[28px] border border-stone-200 bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
          Onboarding shell
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
          Start the first parent setup flow.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700">
          This page is the first protected onboarding surface. It is intentionally
          not writing to the database yet. The goal is to establish the structure
          and sequence before persistence is added.
        </p>

        <div className="mt-8 grid gap-4">
          {onboardingSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[22px] border border-stone-200 bg-stone-50 p-5"
            >
              <p className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
                Step {index + 1}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-stone-950">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                {step.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-[28px] border border-stone-200 bg-stone-950 p-8 text-stone-100 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
        <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
          Immediate implementation target
        </p>
        <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold">First persistent write</h2>
          <p className="mt-3 text-sm leading-7 text-stone-300">
            Create the `households` table and insert the signed-in parent’s first
            household record. After that, student creation is the next useful
            vertical slice.
          </p>
        </div>
      </aside>
    </div>
  );
}
