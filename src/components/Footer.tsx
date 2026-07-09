const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Training", href: "/training" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Process", href: "/process" },
  { label: "Contact Us", href: "mailto:info@stellartms.com" },
]

const resources = [
  { label: "Courses", href: "/training" },
  { label: "Job Support", href: "/training" },
  { label: "Career Mentoring", href: "/training" },
  { label: "Videos", href: "/training" },
  { label: "FAQs", href: "/process" },
  { label: "Customer Support", href: "mailto:info@stellartms.com" },
]

const socialLinks = ["f", "in", "◎", "𝕏", "▶", "♪", "⌖"]

export default function Footer() {
  return (
    <footer className="border-t-4 border-sky-400 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Stellar<span className="text-sky-300"> Groupware</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-slate-300">
              Empowering IT learners and professionals with practical training,
              career mentoring, and job support designed for real workplace success.
            </p>

            <p className="mt-5 text-sm font-semibold leading-7 text-slate-300">
              Trusted support for IT Training | Job Support | Career Mentoring.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-300 transition hover:text-sky-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white">Resources</h3>
            <ul className="mt-5 space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-300 transition hover:text-sky-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white">Select Region</h3>

            <div className="mt-5 space-y-3">
              <a
                href="/"
                className="flex rounded-xl bg-sky-500/15 px-4 py-3 text-sm font-bold text-sky-100 transition hover:bg-sky-500/25"
              >
                🇨🇦 Canada
              </a>
              <a
                href="/"
                className="flex rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800"
              >
                🇬🇧 UK & EU
              </a>
              <a
                href="/"
                className="flex rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800"
              >
                🇮🇳 India
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item}
                  href="/"
                  aria-label={`Social link ${item}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-sm font-bold text-slate-300 transition hover:border-sky-300 hover:text-sky-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-7">
          <div className="flex flex-col gap-5 text-sm font-semibold text-slate-300 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Stellar Groupware Inc. All rights reserved.</p>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              <a href="/" className="hover:text-sky-300">Privacy Policy</a>
              <span className="text-slate-600">|</span>
              <a href="/" className="hover:text-sky-300">Terms of Use</a>
              <span className="text-slate-600">|</span>
              <a href="/" className="hover:text-sky-300">Refund Policy</a>
              <span className="text-slate-600">|</span>
              <a href="/" className="hover:text-sky-300">Sitemap</a>
              <span className="text-slate-600">|</span>
              <a href="mailto:info@stellartms.com" className="hover:text-sky-300">
                Customer Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
