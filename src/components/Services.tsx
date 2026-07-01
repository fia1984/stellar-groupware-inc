import { serviceCards } from "../data/siteData";

function Services() {
  return (
    <section id="training" className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-600 sm:text-sm sm:tracking-[0.35em]">
          Our Services
        </p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
          Practical support for your IT journey.
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {serviceCards.map((service) => (
          <article
            key={service.title}
            id={service.id}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-xl font-bold text-slate-950 sm:text-2xl">
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
