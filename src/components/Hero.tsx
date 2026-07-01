import { heroButton, outlineButton } from "./buttonStyles";

function Hero() {
  return (
    <section id="home" className="border-b border-slate-200 bg-sky-50">
      <div className="mx-auto grid min-h-[620px] max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-sky-600">
            Training • Job Support • Career Growth
          </p>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-slate-950 md:text-6xl">
            Build your technology career with expert guidance.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Stellar Groupware Inc. helps learners and professionals gain practical
            IT skills, project confidence, and career-ready support.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className={heroButton}>
              Book Free Consultation
            </a>

            <a href="#training" className={outlineButton}>
              Explore Programs
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="rounded-2xl bg-sky-100 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-700">
              Professional Support
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-950">
              Learn. Practice. Grow.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A clean, professional platform for IT training, job support, and
              career development services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
