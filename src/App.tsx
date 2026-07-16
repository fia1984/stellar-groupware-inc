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


type ReviewItem = {
  title: string;
  quote: string;
  name: string;
  detail: string;
  message: string;
};

const trainingReviews: ReviewItem[] = [
  {
    title: "Clear Training and Practical Support",
    quote:
      "The training was clear and step by step. I understood how projects work and felt more confident.",
    name: "Beginner IT Learner",
    detail: "Frontend practice support",
    message:
      "Thank you for the clear explanations, patient mentoring, and practical project guidance.",
  },
  {
    title: "Supportive AWS Learning Journey",
    quote:
      "The guidance made difficult AWS concepts easier to understand and apply during practical exercises.",
    name: "AWS Training Learner",
    detail: "Cloud training support",
    message:
      "The sessions were structured, practical, and easy to follow. I gained confidence with every lesson.",
  },
  {
    title: "Confidence Through Real Practice",
    quote:
      "Working through realistic tasks helped me understand what is expected on an actual IT project.",
    name: "Stellar Training Student",
    detail: "Project-based learning",
    message:
      "The practical exercises and patient feedback helped me improve my technical and professional skills.",
  },
];

const careerReviews: ReviewItem[] = [
  {
    title: "Career Transition Journey",
    quote:
      "The mentoring helped me organize my tasks, improve my resume, and prepare for technical work.",
    name: "Career Transition Student",
    detail: "Project and job-readiness guidance",
    message:
      "The support helped me build confidence, improve my resume, and understand real workplace expectations.",
  },
  {
    title: "Clear Job-Readiness Guidance",
    quote:
      "I received structured advice for my resume, LinkedIn profile, interviews, and career planning.",
    name: "Career Support Learner",
    detail: "Resume and interview preparation",
    message:
      "The mentoring gave me a clearer direction and helped me present my experience more professionally.",
  },
  {
    title: "Professional Mentoring Support",
    quote:
      "The sessions helped me identify my strengths and prepare more confidently for new opportunities.",
    name: "Stellar Mentee",
    detail: "Career mentoring",
    message:
      "I appreciated the honest feedback, practical suggestions, and consistent support throughout the process.",
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
  const [trainingReviewIndex, setTrainingReviewIndex] = useState(0);
  const [careerReviewIndex, setCareerReviewIndex] = useState(0);

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
  const trainingReview = trainingReviews[trainingReviewIndex];
  const careerReview = careerReviews[careerReviewIndex];

  const showPreviousTrainingReview = () => {
    setTrainingReviewIndex(
      (current) =>
        (current - 1 + trainingReviews.length) % trainingReviews.length
    );
  };

  const showNextTrainingReview = () => {
    setTrainingReviewIndex(
      (current) => (current + 1) % trainingReviews.length
    );
  };

  const showPreviousCareerReview = () => {
    setCareerReviewIndex(
      (current) =>
        (current - 1 + careerReviews.length) % careerReviews.length
    );
  };

  const showNextCareerReview = () => {
    setCareerReviewIndex(
      (current) => (current + 1) % careerReviews.length
    );
  };

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

          <div className="hero-actions" id="hero-action-buttons">
            <a
              id="hero-book-appointment"
              className="primary-btn"
              href="/appointment"
            >
              Book Appointment →
            </a>

            <a
              id="hero-learn-more"
              className="secondary-btn"
              href="/training"
            >
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

<section
        className="services-section home-services-reference"
        id="training"
        aria-labelledby="home-services-title"
      >
        <div className="home-services-heading">
          <h2 id="home-services-title">Our Services</h2>
          <p>Comprehensive solutions to advance your IT career</p>
        </div>

        <div className="home-services-grid">
          <article className="home-service-card">
            <span className="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
                <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
              </svg>
            </span>
            <h3>Professional Training</h3>
            <p>
              Instructor-led IT training and practical bootcamps designed by
              experienced industry professionals.
            </p>
          </article>

          <article className="home-service-card">
            <span className="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V20" />
                <path d="M16 5.5a3 3 0 0 1 0 5.5M17 13.5a4 4 0 0 1 3.5 4V20" />
              </svg>
            </span>
            <h3>Career Mentoring</h3>
            <p>
              Personalized one-on-one guidance to strengthen your skills,
              confidence, and career direction.
            </p>
          </article>

          <article className="home-service-card">
            <span className="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 3h8l4 4v14H6V3Z" />
                <path d="M14 3v5h5M9 12h6M9 16h6" />
              </svg>
            </span>
            <h3>Resume Marketing</h3>
            <p>
              Professional resume preparation, LinkedIn optimization, and
              strategic career marketing support.
            </p>
          </article>

          <article className="home-service-card">
            <span className="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m4 17 5-5 3 3 7-8" />
                <path d="M14 7h5v5" />
              </svg>
            </span>
            <h3>Intensive Bootcamps</h3>
            <p>
              Hands-on project practice, workplace scenarios, and focused
              technical guidance for rapid skill development.
            </p>
          </article>

          <article className="home-service-card">
            <span className="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m3 9 9-5 9 5-9 5-9-5Z" />
                <path d="M7 12.5V17c2.8 2.2 7.2 2.2 10 0v-4.5M21 9v6" />
              </svg>
            </span>
            <h3>Self-Learning Guidance</h3>
            <p>
              Structured self-paced learning plans, resources, and mentoring
              to help you build new skills independently.
            </p>
          </article>
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


      <section className="reviews-section reviews-reference-page" id="reviews">
        <div className="reviews-heading">
          <h2>What Our Clients Say</h2>
          <p>
            Real feedback from learners who strengthened their IT skills,
            project confidence, and career readiness with Stellar.
          </p>
        </div>

        <div className="review-platform-grid">
          <a
            className="review-platform-card review-platform-link"
            href="https://www.google.com/search?q=Stellar+Groupware+Inc+reviews"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Stellar Groupware Google Reviews"
          >
            <div className="review-platform-icon google-review-icon">G</div>
            <div>
              <h3>Google Reviews</h3>
              <p>See what our learners say</p>
              <div className="review-stars" aria-label="Five-star reviews">
                ★★★★★ <strong>5</strong>
              </div>
            </div>
          </a>

          <a
            className="review-platform-card review-platform-link linkedin-platform-card"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Stellar Groupware LinkedIn recommendations"
          >
            <div className="review-platform-icon linkedin-review-icon">in</div>

            <div>
              <h3>LinkedIn Recommendations</h3>
              <p>Professional recommendations</p>

              <span className="linkedin-review-button">
                View on LinkedIn
              </span>
            </div>
          </a>
        </div>

        <div className="testimonial-column-grid">
          <article className="large-testimonial-card">
            <header>
              <h3>Training Program Testimonials</h3>
              <p>Feedback from our training participants</p>
            </header>

            <div
              className="testimonial-feature"
              key={`training-${trainingReviewIndex}`}
              aria-live="polite"
            >
              <h4>{trainingReview.title}</h4>
              <p>“{trainingReview.quote}”</p>
              <strong>{trainingReview.name}</strong>
              <span>{trainingReview.detail}</span>
            </div>

            <div className="testimonial-controls">
              <button
                type="button"
                onClick={showPreviousTrainingReview}
                aria-label="Previous training review"
              >
                ‹
              </button>

              <span>
                {trainingReviewIndex + 1} / {trainingReviews.length}
              </span>

              <button
                type="button"
                onClick={showNextTrainingReview}
                aria-label="Next training review"
              >
                ›
              </button>
            </div>

            <div className="testimonial-visual">
              <div className="testimonial-message">
                <span className="testimonial-avatar">S</span>
                <div>
                  <strong>{trainingReview.name}</strong>
                  <p>{trainingReview.message}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="large-testimonial-card">
            <header>
              <h3>Career Support Testimonials</h3>
              <p>Feedback from our mentoring and career-support learners</p>
            </header>

            <div
              className="testimonial-feature"
              key={`career-${careerReviewIndex}`}
              aria-live="polite"
            >
              <h4>{careerReview.title}</h4>
              <p>“{careerReview.quote}”</p>
              <strong>{careerReview.name}</strong>
              <span>{careerReview.detail}</span>
            </div>

            <div className="testimonial-controls">
              <button
                type="button"
                onClick={showPreviousCareerReview}
                aria-label="Previous career review"
              >
                ‹
              </button>

              <span>
                {careerReviewIndex + 1} / {careerReviews.length}
              </span>

              <button
                type="button"
                onClick={showNextCareerReview}
                aria-label="Next career review"
              >
                ›
              </button>
            </div>

            <div className="testimonial-visual">
              <div className="testimonial-message">
                <span className="testimonial-avatar">S</span>
                <div>
                  <strong>{careerReview.name}</strong>
                  <p>{careerReview.message}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <section className="share-success-section">
          <h2>Share Your Success Story</h2>
          <p>
            Have you completed a training or mentoring program with us?
            We’d love to hear about your experience!
          </p>

          <div className="share-success-actions">
            <a
              href="https://www.google.com/search?q=Stellar+Groupware+Inc+reviews"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>G</span>
              Leave a Google Review
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>in</span>
              Give LinkedIn Recommendation
            </a>
          </div>
        </section>
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
                <a
                  id="appointment-help-email"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@stellartms.com&su=Stellar%20Appointment%20Help"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Stellar appointment support"
                >
                  ✉ info@stellartms.com
                </a>
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
            <a href="/appointment">Book Appointment</a>
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
