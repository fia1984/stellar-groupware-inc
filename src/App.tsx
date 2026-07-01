function App() {
  const navButton =
    "inline-flex h-11 w-[140px] items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white shadow-sm transition hover:bg-sky-600";

  const heroButton =
    "inline-flex h-12 w-[220px] items-center justify-center rounded-xl text-sm font-bold transition";


  const contactButton =
    "inline-flex h-12 w-[165px] items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white shadow-sm transition hover:bg-sky-600";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#home" className="text-xl font-bold text-slate-950">
            Stellar Groupware Inc
          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <a href="#home" className="hover:text-sky-600">Home</a>
            <a href="#training" className="hover:text-sky-600">Training</a>
            <a href="#support" className="hover:text-sky-600">Job Support</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
          </div>

          <a href="#contact" className={navButton}>
            Get Started
          </a>
        </nav>
      </header>

      <section id="home" className="border-b border-slate-200 bg-sky-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-6 font-bold text-sky-600">
              IT Training • Career Mentoring • Job Support
            </p>

            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-slate-950 md:text-6xl">
              Upgrade Your IT Career with{" "}
              <span className="text-sky-500">Stellar Groupware Inc</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              We help students and professionals build job-ready technology
              skills through practical training, real-time project guidance,
              interview preparation, resume support, and career mentoring.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className={`${heroButton} bg-sky-500 text-white shadow-md hover:bg-sky-600`}
              >
                Book Free Consultation
              </a>

              <a
                href="#training"
                className={`${heroButton} border border-sky-500 text-sky-600 hover:bg-white`}
              >
                Explore Programs
              </a>
            </div>
          </div>

          <div className="rounded-3xl border-t-4 border-sky-500 bg-white p-8 shadow-sm">
            <h2 className="text-center text-2xl font-extrabold text-slate-950">
              What We Help With
            </h2>

            <div className="mt-8 space-y-4">
              {[
                "Frontend development training",
                "Backend and database support",
                "Resume and LinkedIn guidance",
                "Interview preparation",
                "Real-time job support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-sky-50 px-5 py-4 font-semibold text-slate-700"
                >
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="training" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="font-bold text-sky-600">Our Services</p>
          <h2 className="mt-3 text-4xl font-extrabold text-slate-950">
            Practical support for your IT journey
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-sky-600">IT Training</h3>
            <p className="mt-5 leading-8 text-slate-700">
              Learn frontend, backend, database, and real project development
              with practical guidance.
            </p>
          </article>

          <article id="support" className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-sky-600">Job Support</h3>
            <p className="mt-5 leading-8 text-slate-700">
              Get help with real-time work tasks, debugging, project flow, and
              technical problem solving.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-sky-600">
              Career Guidance
            </h3>
            <p className="mt-5 leading-8 text-slate-700">
              Improve your resume, LinkedIn profile, interview confidence, and
              job preparation.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="bg-sky-50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-10 shadow-sm lg:grid-cols-2 lg:items-center">
          <div>

            <h2 className="mt-6 text-4xl font-extrabold text-slate-950">
              Ready to start your IT journey?
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              Reach out to Stellar Groupware Inc for training, job support,
              career mentoring, or project guidance.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-50 p-8">
            <p className="font-bold text-slate-950">Email</p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=fia@stellartms.com" target="_blank" rel="noreferrer"
              className="mt-4 block font-bold text-sky-600 underline"
            >
              fia@stellartms.com
            </a>

            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fia@stellartms.com" target="_blank" rel="noreferrer" className={`mt-8 ${contactButton}`}>
              Contact Now
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-8 text-center font-semibold text-slate-500">
        © 2026 Stellar Groupware Inc. All rights reserved.
      </footer>
    </main>
  );
}

export default App;
