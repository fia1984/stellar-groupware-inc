import { serviceCards } from "../data/siteData";

function Services() {
  return (
    <section id="training" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-600">
          Our Services
        </p>
        <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
          Practical support for your IT journey.
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {serviceCards.map((service) => (
          <article
            key={service.title}
            id={service.id}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-950">
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
