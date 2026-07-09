import { useEffect, useState } from "react";
import "./index.css";

const slides = [
  {
    tag: "CAREER TRANSITION",
    title: "Switching from Non-IT to IT? Start with Stellar.",
    subtitle: "Transition into Canada's IT Market with Structure & Strategy",
    text: "Many professionals want to move into IT but struggle with how and where to start. Stellar's training and mentoring help you become confident in IT.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
  },
  {
    tag: "IT TRAINING",
    title: "Learn Practical IT Skills with Confidence.",
    subtitle: "Training, mentoring, and real project guidance",
    text: "We help beginners understand IT support, business systems, tools, workflows, and professional project practice step by step.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    tag: "BUSINESS SUPPORT",
    title: "Smart Groupware Support for Modern Teams.",
    subtitle: "Better communication, better systems, better workflow",
    text: "Stellar Groupware Inc supports teams with practical technology guidance, collaboration tools, and digital process improvement.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80",
  },
];

function App() {
  const routeMap: Record<string, string> = {
    "/": "home",
    "/reviews": "reviews",
    "/pricing": "pricing",
    "/training": "training",
    "/process": "process",
    "/about": "about",
    "/account": "account",
    "/appointment": "appointment",
    "/contact": "contact",
  };

  const currentRoute = routeMap[window.location.pathname] || "home";

  const routeTitle =
    currentRoute === "reviews"
      ? "Reviews"
      : currentRoute === "pricing"
      ? "Pricing"
      : currentRoute === "training"
      ? "Training"
      : currentRoute === "process"
      ? "Process"
      : currentRoute === "about"
      ? "About"
      : currentRoute === "account"
      ? "My Account"
      : "Home";

  const [activeSlide, setActiveSlide] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 900);
    return () => clearTimeout(timer);
  }, [activeSlide]);

  useEffect(() => {
    const auto = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => clearInterval(auto);
  }, []);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const slide = slides[activeSlide];

  return (
    <main className={`page-shell route-${currentRoute}`}>
      <section
        id="home"
        className={flash ? "hero-section flash-active" : "hero-section"}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="dark-overlay"></div>
        <div className="code-layer"></div>
        <div className="globe-effect"></div>
        <div className="slide-flash"></div>

        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">S</div>
            <div>
              <h2>Stellar</h2>
              <span>Groupware Inc</span>
            </div>
          </div>

          <input className="mobile-menu-toggle" id="mobile-menu-toggle" type="checkbox" />
          <label className="mobile-menu-button" htmlFor="mobile-menu-toggle" aria-label="Open navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </label>

          <div className="nav-links">
            <a className={currentRoute === "home" ? "active" : ""} href="/">Home</a>
            <a className={currentRoute === "reviews" ? "active" : ""} href="/reviews">Reviews</a>
            <a className={currentRoute === "pricing" ? "active" : ""} href="/pricing">Pricing</a>

            <div className="nav-dropdown">
              <a className={currentRoute === "training" ? "active" : ""} href="/training">
                Training ▾
              </a>
              <div className="dropdown-menu">
                <a href="/training">IT Training</a>
                <a href="/training#job-support">Job Support</a>
                <a href="/training#career-mentoring">Career Mentoring</a>
              </div>
            </div>

            <div className="nav-dropdown">
              <a className={currentRoute === "process" ? "active" : ""} href="/process">
                Process ▾
              </a>
              <div className="dropdown-menu">
                <a href="/process">How It Works</a>
                <a href="/process#enrollment">Enrollment Steps</a>
                <a href="/process#support">Support Process</a>
              </div>
            </div>

            <div className="nav-dropdown">
              <a className={currentRoute === "about" ? "active" : ""} href="/about">
                About ▾
              </a>
              <div className="dropdown-menu">
                <a href="/about">About Us</a>
                <a href="/about#mission">Our Mission</a>
                <a href="/about#team">Our Team</a>
              </div>
            </div>

            <a href="/account-access.html" target="_blank" rel="noreferrer">
              My Account
            </a>

            <a className="book-btn" href="/appointment">Book Appointment</a>
          </div>
        </nav>

        {currentRoute !== "home" && (
          <div className="breadcrumb-strip">
            <span className="breadcrumb-stellar-icon">S</span>
            <a href="/">Home</a>
            <span>›</span>
            <span>{routeTitle}</span>
          </div>
        )}




<button className="slide-arrow left" onClick={previousSlide}>‹</button>

        <div className="hero-content" key={activeSlide}>
          <p className="hero-tag">{slide.tag}</p>
          <h1>{slide.title}</h1>
          <div className="green-line"></div>
          <h3>{slide.subtitle}</h3>
          <p>{slide.text}</p>

          <div className="hero-actions">
            <a className="primary-btn" href="mailto:info@stellartms.com">
              Book a Consultation →
            </a>
            <a className="secondary-btn" href="/training">
              Learn More
            </a>
          </div>
        </div>

        <button className="slide-arrow right" onClick={nextSlide}>›</button>

        <div className="dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={activeSlide === index ? "dot active-dot" : "dot"}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>
<section className="services-section" id="training">
        <p className="section-label">WHAT WE DO</p>
        <h2>Training, mentoring, and IT support made simple.</h2>

        <div className="service-grid">
          <div className="service-card">
            <span>01</span>
            <h3>IT Career Guidance</h3>
            <p>Clear direction for beginners who want to move into IT without feeling overwhelmed.</p>
          </div>

          <div className="service-card">
            <span>02</span>
            <h3>Practical Training</h3>
            <p>Step-by-step learning using real examples, simple tools, and professional project practice.</p>
          </div>

          <div className="service-card">
            <span>03</span>
            <h3>Business Workflow Support</h3>
            <p>Helping teams use technology, communication tools, and digital systems more effectively.</p>
          </div>
        </div>
      </section>


      <section className="pricing-section" id="pricing">
        <p className="section-label">PRICING & PATHWAYS</p>
        <h2>Choose Your Learning Path</h2>
        <p className="pricing-intro">
          Pick the pathway that matches where you are today. Each option is designed to help you build skills,
          confidence, and job-readiness step by step.
        </p>

        <div className="pathway-box">
          <div className="pathway-header">
            <div>
              <span className="pathway-number">1</span>
              <div>
                <h3>Pathway 1</h3>
                <p>Training → Project Practice → Job Support</p>
              </div>
            </div>
            <em>Best for beginners who want a complete guided start.</em>
          </div>

          <div className="pricing-grid">
            <div className="price-card popular">
              <span className="badge">MOST POPULAR</span>
              <h3>Regular IT Training</h3>
              <p className="small-text">Complete instructor-led learning support</p>
              <h4>$1,500</h4>
              <ul>
                <li>Live guided training sessions</li>
                <li>Frontend development basics</li>
                <li>Backend and database support</li>
                <li>Real-world practice tasks</li>
                <li>Certificate of completion</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn">Enroll Now →</a>
            </div>

            <div className="price-card popular">
              <span className="badge">MOST POPULAR</span>
              <h3>AI + IT Training</h3>
              <p className="small-text">Training support for modern AI tools and IT work</p>
              <h4>$2,000</h4>
              <ul>
                <li>All regular training features</li>
                <li>AI tool guidance</li>
                <li>Prompting and workflow basics</li>
                <li>Project mentorship</li>
                <li>Career confidence building</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn">Enroll Now →</a>
            </div>

            <div className="price-card">
              <h3>Bootcamp Support</h3>
              <p className="small-text">Add-on project and hands-on practice support</p>
              <h4>$500</h4>
              <ul>
                <li>Project-based practice</li>
                <li>Portfolio building</li>
                <li>Technical task guidance</li>
                <li>Interview preparation</li>
                <li>Skill validation support</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn dark">Enroll Now →</a>
            </div>

            <div className="price-card popular">
              <span className="badge">CAREER SUPPORT</span>
              <h3>Marketing Support</h3>
              <p className="small-text">Placement and career preparation support</p>
              <h4>$500</h4>
              <ul>
                <li>Professional resume creation</li>
                <li>LinkedIn optimization</li>
                <li>Apply up to 10 jobs per day</li>
                <li>Interview guidance</li>
                <li>Placement support</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn">Enroll Now →</a>
            </div>
          </div>
        </div>

        <div className="pathway-box">
          <div className="pathway-header">
            <div>
              <span className="pathway-number">2</span>
              <div>
                <h3>Pathway 2</h3>
                <p>Bootcamp → Career Support</p>
              </div>
            </div>
            <em>Already trained? Start with project practice and job preparation.</em>
          </div>

          <div className="pricing-grid two-card">
            <div className="price-card">
              <h3>Direct Bootcamp</h3>
              <p className="small-text">Hands-on project and job-readiness support</p>
              <h4>$1,000</h4>
              <ul>
                <li>Intensive project practice</li>
                <li>Hands-on technical tasks</li>
                <li>Portfolio support</li>
                <li>Interview preparation</li>
                <li>Workplace confidence building</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn dark">Enroll Now →</a>
            </div>

            <div className="price-card popular">
              <span className="badge">NEXT STEP</span>
              <h3>Career Marketing</h3>
              <p className="small-text">Resume, LinkedIn, applications, and interview support</p>
              <h4>$500</h4>
              <ul>
                <li>Professional resume creation</li>
                <li>LinkedIn optimization</li>
                <li>Job application support</li>
                <li>Interview guidance</li>
                <li>Placement support</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn">Enroll Now →</a>
            </div>
          </div>
        </div>

        <div className="pathway-box single-pathway">
          <div className="pathway-header">
            <div>
              <span className="pathway-number">3</span>
              <div>
                <h3>Pathway 3</h3>
                <p>Direct Placement Support</p>
              </div>
            </div>
            <em>Experienced? Skip training and go straight to career support.</em>
          </div>

          <div className="pricing-grid single-card">
            <div className="price-card">
              <h3>Direct Marketing Program</h3>
              <p className="small-text">Placement-only support for trained candidates</p>
              <h4>$1,000</h4>
              <ul>
                <li>Professional resume creation</li>
                <li>LinkedIn optimization</li>
                <li>Job portal registrations</li>
                <li>Apply up to 10 jobs per day</li>
                <li>Interview guidance</li>
                <li>Placement support</li>
              </ul>
              <a href="mailto:info@stellartms.com" className="enroll-btn dark">Enroll Now →</a>
            </div>
          </div>
        </div>
      </section>


      <section className="reviews-section" id="reviews">
        <p className="section-label">STUDENT REVIEWS</p>
        <h2>What learners say about Stellar Groupware.</h2>
        <p className="section-intro">
          Realistic feedback from learners who needed guidance, structure, and confidence while moving into IT.
        </p>

        <div className="review-grid">
          <div className="review-card">
            <p>“The training was clear and step by step. I understood how projects work and felt more confident.”</p>
            <strong>Beginner IT Learner</strong>
            <span>Frontend practice support</span>
          </div>

          <div className="review-card">
            <p>“The mentoring helped me organize my tasks, improve my resume, and prepare for technical work.”</p>
            <strong>Career Transition Student</strong>
            <span>Project and job-readiness guidance</span>
          </div>

          <div className="review-card">
            <p>“I liked the practical approach. It was not only theory; we worked through real examples.”</p>
            <strong>Bootcamp Support Learner</strong>
            <span>Hands-on project practice</span>
          </div>
        </div>
      </section>

      <section className="process-section" id="process">
        <p className="section-label">OUR PROCESS</p>
        <h2>Simple step-by-step support.</h2>

        <div className="process-grid">
          <div className="process-card">
            <span>01</span>
            <h3>Understand Your Goal</h3>
            <p>We look at your current level, learning needs, and career direction.</p>
          </div>

          <div className="process-card">
            <span>02</span>
            <h3>Build Skills</h3>
            <p>You get practical training, guided tasks, and project-based learning.</p>
          </div>

          <div className="process-card">
            <span>03</span>
            <h3>Prepare for Work</h3>
            <p>We support resume, LinkedIn, interview practice, and job-readiness.</p>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="section-label">ABOUT STELLAR</p>
        <h2>Training and mentoring built for real beginners.</h2>
        <p className="section-intro">
          Stellar Groupware Inc helps learners understand IT concepts, business systems, tools,
          workflows, and project practice in a simple and structured way.
        </p>

        <div className="about-box">
          <div>
            <h3>What we focus on</h3>
            <p>Clear explanations, practical tasks, project confidence, and career preparation.</p>
          </div>

          <div>
            <h3>Who it is for</h3>
            <p>Beginners, career changers, bootcamp learners, and students who need extra support.</p>
          </div>
        </div>
      </section>

      <section className="account-section" id="account">
        <p className="section-label">MY ACCOUNT</p>
        <h2>Student account access coming soon.</h2>
        <p className="section-intro">
          This area can later include student login, course progress, saved resources, and appointment history.
        </p>
        <a href="/appointment" className="enroll-btn">Request Account Help →</a>
      </section>

      <section className="appointment-section" id="appointment">
        <p className="section-label">BOOK APPOINTMENT</p>
        <h2>Book a consultation with Stellar Groupware.</h2>
        <p className="section-intro">
          Ready to discuss training, mentoring, project practice, or career support? Send us a message and we will follow up.
        </p>

        <div className="appointment-actions">
          <a href="mailto:info@stellartms.com?subject=Book%20Appointment%20Request" className="enroll-btn">
            Email to Book Appointment →
          </a>
          <a href="/contact" className="enroll-btn dark">
            Go to Contact Section →
          </a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-label">CONTACT US</p>
        <h2>Ready to start your IT journey?</h2>
        <p>Email us and we will help you choose the right next step.</p>
        <a className="primary-btn" href="mailto:info@stellartms.com">
          Contact Now
        </a>
      </section>


      <div className="cookie-banner">
        <div className="cookie-icon">🛡️</div>
        <div className="cookie-copy">
          <strong>We value your privacy</strong>
          <p>
            We use cookies to improve your experience and analyze website traffic.
            By clicking “Accept All”, you consent to our use of analytics cookies.
          </p>
        </div>
        <div className="cookie-actions">
          <button type="button" onClick={() => document.querySelector('.cookie-banner')?.remove()}>
            Accept All
          </button>
          <button type="button" className="decline-btn" onClick={() => document.querySelector('.cookie-banner')?.remove()}>
            Decline
          </button>
        </div>
      </div>


      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span>S</span>
              <div>
                <strong>Stellar</strong>
                <small>GROUPWARE INC</small>
              </div>
            </div>
            <p>
              Helping beginners and professionals build practical IT skills,
              project confidence, and career readiness.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/training">Training</a>
            <a href="/pricing">Pricing</a>
            <a href="/reviews">Reviews</a>
            <a href="/contact">Contact Us</a>
          </div>

          <div>
            <h4>Resources</h4>
            <a href="/process">Our Process</a>
            <a href="/account">My Account</a>
            <a href="/appointment">Book Appointment</a>
            <a href="/pricing">Courses</a>
            <a href="/reviews">Student Reviews</a>
            <a href="/contact">Support</a>
          </div>

          <div>
            <h4>Select Region</h4>
            <button type="button">🇨🇦 Canada</button>
            <button type="button">🇬🇧 UK & EU</button>
            <button type="button">🇮🇳 India</button>
            <div className="social-row">
              <span>f</span>
              <span>in</span>
              <span>◎</span>
              <span>𝕏</span>
              <span>▶</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Stellar Groupware Inc. All rights reserved.</span>
          <div>
            <a href="/contact">Privacy Policy</a>
            <a href="/contact">Terms of Use</a>
            <a href="/contact">Customer Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
