function App() {
  return (
    <main className="min-h-screen bg-blue-50 text-slate-900">
      <nav className="bg-white/90 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold text-blue-950">
            Stellar Groupware Inc
          </h1>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <a href="#" className="hover:text-sky-600">Home</a>
            <a href="#" className="hover:text-sky-600">Training</a>
            <a href="#" className="hover:text-sky-600">Job Support</a>
            <a href="#" className="hover:text-sky-600">Contact</a>
          </div>

          <button className="rounded-lg bg-sky-500 px-5 py-2 text-sm font-bold text-white hover:bg-sky-600">
            Get Started
          </button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <p className="mb-5 text-sm font-bold text-sky-600">
            IT Training • Career Mentoring • Job Support
          </p>

          <h2 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Upgrade Your IT Career with{" "}
            <span className="text-sky-500">Stellar Groupware Inc</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
            We help students and professionals build job-ready technology skills
            through practical training, real-time project guidance, interview
            preparation, resume support, and career mentoring.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button className="rounded-lg bg-sky-500 px-7 py-3 font-bold text-white shadow-lg shadow-sky-200 hover:bg-sky-600">
              Book Free Consultation
            </button>

            <button className="rounded-lg border border-sky-500 px-7 py-3 font-bold text-sky-600 hover:bg-sky-100">
              Explore Programs
            </button>
          </div>
        </div>

        <div className="rounded-3xl border-t-4 border-sky-400 bg-white/90 p-7 shadow-xl shadow-sky-100">
          <h3 className="mb-7 text-center text-2xl font-extrabold text-blue-950">
            What We Help With
          </h3>

          <ul className="space-y-4 text-slate-700">
            <li className="rounded-xl bg-sky-50 p-3 font-bold">
              • Frontend development training
            </li>
            <li className="rounded-xl bg-sky-50 p-3 font-bold">
              • Backend and database support
            </li>
            <li className="rounded-xl bg-sky-50 p-3 font-bold">
              • Resume and LinkedIn guidance
            </li>
            <li className="rounded-xl bg-sky-50 p-3 font-bold">
              • Interview preparation
            </li>
            <li className="rounded-xl bg-sky-50 p-3 font-bold">
              • Real-time job support
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-center text-3xl font-extrabold text-blue-950">
          Our Main Services
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-sky-100">
            <h3 className="text-xl font-bold text-sky-600">
              IT Training
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Learn frontend, backend, database, and real project development
              with practical guidance.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-sky-100">
            <h3 className="text-xl font-bold text-sky-600">
              Job Support
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Get help with real-time work tasks, debugging, project flow, and
              technical problem solving.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-sky-100">
            <h3 className="text-xl font-bold text-sky-600">
              Career Guidance
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Improve your resume, LinkedIn profile, interview confidence, and
              job preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-xl shadow-sky-100 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold text-sky-600">
              Contact Us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-blue-950">
              Ready to start your IT journey?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Reach out to Stellar Groupware Inc for training, job support,
              career mentoring, or project guidance.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-50 p-6">
            <p className="font-bold text-slate-800">
              Email
            </p>
            <p className="mt-2 text-slate-600">
              info@stellargroupware.com
            </p>

            <p className="mt-6 font-bold text-slate-800">
              Services
            </p>
            <p className="mt-2 text-slate-600">
              IT Training, Job Support, Resume Help, Interview Preparation
            </p>

            <button className="mt-6 rounded-lg bg-sky-500 px-6 py-3 font-bold text-white shadow-lg shadow-sky-200 hover:bg-sky-600">
              Contact Now
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white py-6 text-center text-sm font-semibold text-slate-500">
        © 2026 Stellar Groupware Inc. All rights reserved.
      </footer>
    </main>
  );
}

export default App;
