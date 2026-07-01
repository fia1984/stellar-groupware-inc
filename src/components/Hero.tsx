import { heroButton, outlineButton } from "./buttonStyles";

function Hero() {
  return (
    <section id="home" className="border-b border-slate-200 bg-sky-50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 sm:min-h-[620px] sm:py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-600 sm:text-sm sm:tracking-[0.35em]">
            Training • Job Support • Career Growth
          </p>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl md:text-6xl">
            Build your technology career with expert guidance.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Stellar Groupware Inc. helps learners and professionals gain practical
            IT skills, project confidence, and career-ready support.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a href="#contact" className={heroButton}>
              Book Free Consultation
            </a>

            <a href="#training" className={outlineButton}>
              Explore Programs
            </a>
          </div>
        </div>

        <div className="hidden rounded-3xl bg-white p-8 shadow-xl lg:block">
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
