import { contactButton } from "./buttonStyles";
import { contactEmail, gmailComposeLink } from "../data/siteData";

function Contact() {
  return (
    <section id="contact" className="bg-sky-50 px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Ready to start?
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Contact Stellar Groupware Inc. to discuss training, support, and
              career guidance options.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-100 p-8">
            <p className="font-semibold text-slate-700">Email</p>

            <a
              href={gmailComposeLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-lg font-bold text-sky-700 hover:text-sky-800"
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
