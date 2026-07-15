import { useEffect, useState, useRef } from "react";
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
  {
    tag: "CAREER SUPPORT",
    title: "Build Your IT Career with Practical Support.",
    subtitle: "Mentoring, project practice, and job preparation",
    text: "Get structured guidance to strengthen your technical skills, practise real workplace scenarios, and prepare confidently for IT opportunities.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80",
  },
];


type AnimatedCounterProps = {
  end: number;
  duration?: number;
};

function AnimatedCounter({ end, duration = 1800 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(end * easedProgress));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <strong ref={counterRef}>
      {count.toLocaleString()}
    </strong>
  );
}

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

  const [appointmentStep, setAppointmentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentPhone, setAppointmentPhone] = useState("");
  const [appointmentEmail, setAppointmentEmail] = useState("");
  const [appointmentCity, setAppointmentCity] = useState("");
  const [appointmentCountry, setAppointmentCountry] = useState("Canada");
  const [appointmentService, setAppointmentService] = useState("");
  const [appointmentRequirement, setAppointmentRequirement] = useState("");
  const [appointmentConsent, setAppointmentConsent] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

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
            <a id="home-nav-link" className="home-link" href="/">Home</a>
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

            <a id="book-appointment-nav" className="book-btn" href="/appointment">Book Appointment</a>
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

        <div
          className="dots"
          role="group"
          aria-label="Hero slide navigation"
        >
          {slides.slice(0, 4).map((_, index) => (
            <button
              type="button"
              key={index}
              className={activeSlide === index ? "dot active-dot" : "dot"}
              aria-label={`Show hero slide ${index + 1}`}
              aria-pressed={activeSlide === index}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="home-stats-section" aria-label="Stellar statistics">
        <div className="home-stats-grid">
          <div className="home-stat-item">
            <AnimatedCounter end={2870} />
            <span>Successful Stories</span>
          </div>

          <div className="home-stat-item">
            <AnimatedCounter end={2075} />
            <span>Active Mentees</span>
          </div>

          <div className="home-stat-item">
            <AnimatedCounter end={186} />
            <span>Team Members</span>
          </div>

          <div className="home-stat-item">
            <AnimatedCounter end={55} />
            <span>Trainers</span>
          </div>
        </div>
      </section>

      <a
        className="stellar-chat-bubble"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=info@stellartms.com&su=Stellar%20Groupware%20Inquiry"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Stellar Groupware"
        title="Contact Stellar Groupware"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 3.25c-4.83 0-8.75 3.55-8.75 7.93 0 1.75.63 3.37 1.7 4.68L3.8 20.75l5.03-1.68c.98.34 2.05.53 3.17.53 4.83 0 8.75-3.55 8.75-7.92S16.83 3.25 12 3.25Zm0 14.6c-1.02 0-1.99-.18-2.87-.51l-.43-.16-2.59.87.61-2.54-.3-.38A6.11 6.11 0 0 1 5 11.18C5 7.76 8.14 5 12 5s7 2.76 7 6.18-3.14 6.67-7 6.67Z" />
        </svg>
      </a>

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
          <section className="pricing-faq" aria-labelledby="pricing-faq-title">
            <h2 id="pricing-faq-title">Pricing questions, answered</h2>

            <div className="pricing-faq-list">
              <article className="pricing-faq-card">
                <h3>What currency are Stellar prices listed in?</h3>
                <p>
                  Stellar prices are listed in Canadian dollars (CAD). Applicable
                  taxes may be added depending on the service and location.
                </p>
              </article>

              <article className="pricing-faq-card">
                <h3>Can I choose only one service?</h3>
                <p>
                  Yes. You can choose training, bootcamp support, or career support
                  separately, or follow a complete pathway based on your goals.
                </p>
              </article>

              <article className="pricing-faq-card">
                <h3>Are the programs available online?</h3>
                <p>
                  Yes. Most Stellar training, mentoring, project-support, and
                  career-support sessions are available online.
                </p>
              </article>
            </div>
          </section>

          <section className="pricing-cta" aria-labelledby="pricing-cta-title">
            <h2 id="pricing-cta-title">Not sure which pathway?</h2>
            <p>
              Book a free consultation and we’ll help you choose the right pathway
              based on your experience, learning needs, and career goals.
            </p>

            <div className="pricing-cta-actions">
              <a href="/reviews" className="pricing-cta-btn primary">
                Testimonials
              </a>

              <a
                href="/appointment"
                className="pricing-cta-btn secondary"
              >
                Book Consultation
              </a>
            </div>
          </section>

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
          <div className="appointment-layout">
            <div className="appointment-main-card">
              <p className="section-label">BOOK APPOINTMENT</p>
              <h2>Schedule Your Consultation</h2>
                {appointmentBooked ? (
                  <div className="appointment-confirmation">
                    <div className="appointment-confirmation-icon">✓</div>

                    <h3>You’re booked!</h3>

                    <p>
                      Your appointment request has been prepared. Check Gmail for
                      the completed message and meeting-request details.
                    </p>

                    <div className="appointment-confirmation-date">
                      <span>▣</span>
                      <div>
                        <strong>{selectedDate} at {selectedTime}</strong>
                        <small>Eastern Time — Canada</small>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="appointment-new-booking"
                      onClick={() => {
                        setAppointmentBooked(false);
                        setAppointmentStep(1);
                        setSelectedDate("");
                        setSelectedTime("");
                        setAppointmentConsent(false);
                      }}
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <>

              <h3>IT Training and Career Consultation — Canada</h3>
              <p className="appointment-description">
                This free consultation helps learners and professionals choose the
                right IT training, project support, or career-support pathway.
              </p>

              <p className="appointment-meta">◷ 30 minutes · Online meeting</p>

              <div className="appointment-steps">
                <span className={appointmentStep >= 1 ? "active" : ""}>1</span>
                <strong>Date</strong>
                <span className={appointmentStep >= 2 ? "active" : ""}>2</span>
                <strong>Time</strong>
                <span className={appointmentStep >= 3 ? "active" : ""}>3</span>
                <strong>Details</strong>
              </div>

              {appointmentStep === 1 && (
                <div className="appointment-step-panel">
                  <h4>Select a day</h4>

                  <div className="appointment-date-grid">
                    {[
                      ["MON", "13", "JUL"],
                      ["TUE", "14", "JUL"],
                      ["WED", "15", "JUL"],
                      ["THU", "16", "JUL"],
                      ["FRI", "17", "JUL"],
                      ["SAT", "18", "JUL"],
                    ].map(([day, date, month]) => {
                      const value = `${day}, ${month} ${date}`;

                      return (
                        <button
                          key={value}
                          type="button"
                          className={selectedDate === value ? "selected" : ""}
                          onClick={() => {
                            setSelectedDate(value);
                            setSelectedTime("");
                            setAppointmentStep(2);
                          }}
                        >
                          <small>{day}</small>
                          <strong>{date}</strong>
                          <span>{month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {appointmentStep === 2 && (
                <div className="appointment-step-panel">
                  <div className="appointment-selection-summary">
                    <strong>{selectedDate}</strong>
                    <button type="button" onClick={() => setAppointmentStep(1)}>
                      Change date
                    </button>
                  </div>

                  <h4>Select a time</h4>

                  <div className="appointment-time-grid">
                    {[
                      "9:00 AM",
                      "10:00 AM",
                      "11:30 AM",
                      "1:00 PM",
                      "3:30 PM",
                      "5:00 PM",
                    ].map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={selectedTime === time ? "selected" : ""}
                        onClick={() => {
                          setSelectedTime(time);
                          setAppointmentStep(3);
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="appointment-back-btn"
                    onClick={() => setAppointmentStep(1)}
                  >
                    ← Back to dates
                  </button>
                </div>
              )}

              {appointmentStep === 3 && (
                <form
                  className="appointment-details-form"
                  onSubmit={(event) => {
                    event.preventDefault();

                    setAppointmentBooked(true);
                  }}
                >
                  <div className="appointment-selection-summary">
                    <strong>{selectedDate} at {selectedTime}</strong>
                    <button type="button" onClick={() => setAppointmentStep(1)}>
                      Change
                    </button>
                  </div>

                  <label>
                    Full Name *
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={appointmentName}
                      onChange={(event) => setAppointmentName(event.target.value)}
                    />
                  </label>

                  <label>
                    Mobile Number *
                    <input
                      required
                      type="tel"
                      placeholder="+1 416 555 0123"
                      value={appointmentPhone}
                      onChange={(event) => setAppointmentPhone(event.target.value)}
                    />
                  </label>

                  <label>
                    Email *
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={appointmentEmail}
                      onChange={(event) => setAppointmentEmail(event.target.value)}
                    />
                  </label>

                  <label>
                    City *
                    <input
                      required
                      type="text"
                      placeholder="Toronto"
                      value={appointmentCity}
                      onChange={(event) => setAppointmentCity(event.target.value)}
                    />
                  </label>

                  <label>
                    Country *
                    <select
                      required
                      value={appointmentCountry}
                      onChange={(event) => setAppointmentCountry(event.target.value)}
                    >
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label>
                    Service Interested *
                    <select
                      required
                      value={appointmentService}
                      onChange={(event) => setAppointmentService(event.target.value)}
                    >
                      <option value="">Select a service</option>
                      <option>Regular IT Training</option>
                      <option>AI + IT Training</option>
                      <option>Bootcamp Support</option>
                      <option>Career Support</option>
                    </select>
                  </label>

                  <label>
                    Requirement *
                    <textarea
                      required
                      rows={5}
                      placeholder="Mention your detailed requirement"
                      value={appointmentRequirement}
                      onChange={(event) =>
                        setAppointmentRequirement(event.target.value)
                      }
                    />
                  </label>

                    <button
                      type="button"
                      className={`appointment-consent-toggle ${
                        appointmentConsent ? "checked" : ""
                      }`}
                      aria-pressed={appointmentConsent}
                      onClick={() =>
                        setAppointmentConsent((current) => !current)
                      }
                    >
                      <span className="appointment-consent-box" aria-hidden="true">
                        {appointmentConsent ? "✓" : ""}
                      </span>

                      <span className="appointment-consent-copy">
                        By checking this box, I consent to receive transactional
                        messages related to services I have requested. These messages
                        may include appointment reminders. Reply STOP to opt out.
                      </span>
                    </button>

                  <div className="appointment-form-actions">
                    <button
                      type="submit"
                      className="appointment-book-btn"
                      disabled={!appointmentConsent}
                    >
                      ✈ Book Appointment
                    </button>
                  </div>
                </form>
              )}
                  </>
                )}
            </div>

            <aside className="appointment-sidebar">
              <div className="appointment-info-card">
                <h3>What to Expect</h3>
                <ul>
                  <li>30-minute consultation with a Stellar advisor</li>
                  <li>Personalized learning and career assessment</li>
                  <li>Training recommendations tailored to your goals</li>
                  <li>Discussion of project and career-support options</li>
                </ul>
              </div>

              <div className="appointment-hours-card">
                <h3>◷ Available Hours</h3>
                <p><span>Monday – Friday:</span><strong>9:00 AM – 6:00 PM ET</strong></p>
                <p><span>Saturday:</span><strong>10:00 AM – 4:00 PM ET</strong></p>
                <p><span>Sunday:</span><strong>Closed</strong></p>
              </div>

              <div className="appointment-info-card">
                <h3>Need Help?</h3>
                <p>If you have questions or need to reschedule, contact us:</p>
                <a href="mailto:info@stellartms.com">✉ info@stellartms.com</a>
              </div>
            </aside>
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
            <a className="book-btn" href="/appointment">Book Appointment</a>
            <a href="/pricing">Courses</a>
            <a href="/reviews">Student Reviews</a>
            <a href="/contact">Support</a>
          </div>

          <div>
            <h4>Select Region</h4>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/ca";
                }}
                aria-label="Open Canada website"
              >
                🇨🇦 Canada
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/uk";
                }}
                aria-label="Open UK and EU website"
              >
                🇬🇧 UK &amp; EU
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/in";
                }}
                aria-label="Open India website"
              >
                🇮🇳 India
              </button>

              <div className="social-row">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Facebook"
                >
                  <span>f</span>
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn"
                >
                  <span>in</span>
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Instagram"
                >
                  <span>◎</span>
                </a>

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open X"
                >
                  <span>𝕏</span>
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open YouTube"
                >
                  <span>▶</span>
                </a>
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
