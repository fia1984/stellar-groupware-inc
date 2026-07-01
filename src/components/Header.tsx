import { navLinks } from "../data/siteData";
import { navButton } from "./buttonStyles";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold text-slate-950">
          Stellar Groupware Inc.
        </a>

        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-sky-600">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className={navButton}>
          Get Started
        </a>
      </nav>
    </header>
  );
}

export default Header;
