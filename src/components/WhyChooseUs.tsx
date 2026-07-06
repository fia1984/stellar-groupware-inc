import { benefits } from "../mocks/siteData";

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-sm sm:tracking-[0.35em]">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
            Guidance built around real learning and career confidence.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Stellar Groupware Inc. gives learners clear support through training,
            mentoring, project guidance, and career preparation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-emerald-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-lg font-extrabold text-white shadow-sm">
                ✓
              </div>

              <p className="text-base font-semibold leading-7 text-slate-700">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
