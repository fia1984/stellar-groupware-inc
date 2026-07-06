import { processSteps } from "../mocks/siteData";

function Process() {
  return (
    <section className="bg-white px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-sm sm:tracking-[0.35em]">
            Our Approach
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
            A clear pathway for learning and career growth.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Start with consultation, follow a focused roadmap, practice with
            support, and prepare for career opportunities.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {processSteps.map((item, index) => {
            const cardColors = [
              "bg-blue-50",
              "bg-emerald-50",
              "bg-green-50",
              "bg-amber-50",
            ];

            return (
              <article
                key={item.step}
                className={`rounded-3xl border border-slate-200 p-6 shadow-sm ${cardColors[index]}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-xl font-extrabold text-white shadow-md">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Process;
