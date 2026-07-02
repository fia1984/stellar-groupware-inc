import { stats } from "../data/siteData";
import { heroButton, outlineButton } from "./buttonStyles";

function Hero() {
  return (
    <section
      id="home"
      className="overflow-hidden border-b border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 sm:py-20 lg:min-h-[680px] lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-sm">
            IT Training • Mentoring • Job Support
          </p>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl md:text-6xl">
            Upgrade your IT career with practical guidance.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Stellar Groupware Inc. helps learners and professionals build
            practical IT skills through training, project support, interview
            preparation, resume guidance, and career mentoring.
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

        <div className="hidden lg:block">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Professional IT Support
            </p>

            <h2 className="mt-5 text-4xl font-extrabold text-slate-950">
              Learn with structure. Practice with support.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A focused homepage for IT training, mentoring, job support, and
              career preparation services.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-emerald-50 p-4"
                >
                  <p className="text-2xl font-extrabold text-emerald-700">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
