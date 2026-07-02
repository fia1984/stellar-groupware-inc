import { serviceCards } from "../data/siteData";

function Services() {
  return (
    <section id="training" className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-sm sm:tracking-[0.35em]">
          Our Services
        </p>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
          Comprehensive support to advance your IT career.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
          Practical services designed for training, mentoring, job support, and
          career readiness.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {serviceCards.map((service) => (
          <article
            key={service.title}
            id={service.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl font-extrabold text-emerald-700">
              {service.title.charAt(0)}
            </div>

            <h3 className="text-xl font-bold text-slate-950">
              {service.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
