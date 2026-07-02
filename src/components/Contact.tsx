import { contactButton } from "./buttonStyles";
import { contactEmail, gmailComposeLink } from "../data/siteData";

function Contact() {
  return (
    <section id="contact" className="bg-emerald-50 px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-sm">
              Contact Us
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Ready to start your IT journey?
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Connect with Stellar Groupware Inc. for IT training, job support,
              career guidance, and project-based learning.
            </p>
          </div>

          <div className="rounded-3xl bg-emerald-100 p-6 sm:p-8">
            <p className="font-semibold text-slate-700">Email</p>

            <a
              href={gmailComposeLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-words text-lg font-bold text-emerald-700 hover:text-emerald-800"
            >
              {contactEmail}
            </a>

            <a
              href={gmailComposeLink}
              target="_blank"
              rel="noreferrer"
              className={`mt-8 ${contactButton}`}
            >
              Contact Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
