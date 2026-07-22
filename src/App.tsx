import { useEffect, useState, useRef, type ReactNode } from "react";
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

const appointmentDates = Array.from({ length: 10 }, (_, index) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + index);

  const day = date.toLocaleDateString("en-CA", { weekday: "short" }).toUpperCase();
  const month = date.toLocaleDateString("en-CA", { month: "short" }).toUpperCase();
  const dateNumber = date.getDate().toString();

  return {
    day,
    date: dateNumber,
    month,
    value: `${day}, ${month} ${dateNumber}`,
    disabled: date.getDay() === 0,
  };
});


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

const homePathways = [
  {
    title: "Training Pathway",
    tone: "blue",
    description: "Structured learning for people building practical technical skills.",
    steps: ["Free consultation", "Instructor-led training", "One-on-one mentoring", "Career preparation"],
  },
  {
    title: "Self-Learning Pathway",
    tone: "green",
    description: "Flexible guidance for independent learners who want a clear roadmap.",
    steps: ["Skills assessment", "Learning plan", "Mentor check-ins", "Portfolio guidance"],
  },
  {
    title: "Career Support Pathway",
    tone: "mint",
    description: "Professional positioning support for learners preparing for opportunities.",
    steps: ["Career strategy", "Resume preparation", "LinkedIn optimization", "Interview practice"],
  },
  {
    title: "Bootcamp Pathway",
    tone: "amber",
    description: "Focused project-based practice with hands-on technical guidance.",
    steps: ["Free consultation", "Intensive bootcamp", "Project portfolio", "Job readiness"],
  },
];

type CareerIconName =
  | "award"
  | "briefcase"
  | "calendar"
  | "code"
  | "file"
  | "globe"
  | "graduation"
  | "growth"
  | "mentor"
  | "shield"
  | "target"
  | "transition"
  | "video"
  | "clock";

type HomeInfoCard = {
  icon: CareerIconName;
  title: string;
  description: string;
};

type HomeAudienceCard = HomeInfoCard & {
  benefits: string[];
};

const homeOffers: HomeInfoCard[] = [
  { icon: "graduation", title: "Training", description: "Practical instructor-led courses designed around real workplace skills." },
  { icon: "code", title: "Bootcamps", description: "Focused learning programs with hands-on exercises and guided projects." },
  { icon: "mentor", title: "Self-Learning Guidance", description: "Structured resources and mentoring for independent learning paths." },
  { icon: "code", title: "Hands-On Practice", description: "Realistic labs and exercises that strengthen practical confidence." },
  { icon: "award", title: "Certification Guidance", description: "A clear study plan for recognized technology certifications." },
  { icon: "calendar", title: "Progress Check-Ins", description: "Regular mentor check-ins to review progress and resolve challenges." },
  { icon: "file", title: "Resume Preparation", description: "Professional resumes tailored to target roles and Canadian employers." },
  { icon: "mentor", title: "LinkedIn Optimization", description: "Profile improvements that communicate skills and attract recruiters." },
  { icon: "growth", title: "Career Marketing", description: "Strategic guidance for presenting your experience to employers." },
];

const homeAudiences: HomeAudienceCard[] = [
  { icon: "graduation", title: "Recent Graduates", description: "Start your IT career with a structured foundation and practical guidance.", benefits: ["Build workplace-ready skills", "Develop project confidence", "Learn from experienced mentors"] },
  { icon: "transition", title: "Career Changers", description: "Move into technology with a focused plan that builds on your experience.", benefits: ["Identify transferable skills", "Learn in-demand tools", "Prepare for a confident transition"] },
  { icon: "code", title: "Non-IT to IT Professionals", description: "Break into IT through beginner-friendly training and mentoring.", benefits: ["Build technical skills from scratch", "Practice realistic tasks", "Prepare for entry-level opportunities"] },
  { icon: "growth", title: "IT Professionals", description: "Strengthen your expertise and prepare for your next professional step.", benefits: ["Expand modern technical skills", "Improve professional positioning", "Prepare for senior responsibilities"] },
];

const seekerChallenges: HomeInfoCard[] = [
  { icon: "target", title: "Targeting the Wrong Role", description: "Choosing roles without matching your strengths or current market demand limits results." },
  { icon: "code", title: "No Focused Upskilling", description: "Outdated skills make it harder to demonstrate readiness for current technology roles." },
  { icon: "calendar", title: "Inconsistent Applications", description: "An irregular job-search routine reduces opportunities and makes progress difficult to track." },
  { icon: "briefcase", title: "Applying Before You Are Ready", description: "Candidates need practical skills and interview preparation before entering the market." },
  { icon: "file", title: "Weak Resume Positioning", description: "Unclear structure and missing role-specific keywords can prevent a resume from being noticed." },
  { icon: "transition", title: "Targeting Too Many Roles", description: "A focused role strategy creates a clearer professional profile for recruiters." },
];

function CareerIcon({ name }: { name: CareerIconName }) {
  const paths: Record<CareerIconName, ReactNode> = {
    award: <><circle cx="12" cy="8" r="5" /><path d="M8.5 12 7 21l5-3 5 3-1.5-9" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8 15l2 2 5-5" /></>,
    code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>,
    file: <><path d="M6 2h8l4 4v16H6V2Z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    graduation: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 12.5V17c2.8 2.2 7.2 2.2 10 0v-4.5M21 9v6" /></>,
    growth: <><path d="M4 18 10 12l4 4 6-8" /><path d="M15 8h5v5" /></>,
    mentor: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V20M16 5.5a3 3 0 0 1 0 5.5M17 13.5a4 4 0 0 1 3.5 4V20" /></>,
    shield: <path d="M12 3 4.5 6v5.5c0 4.6 3 8.1 7.5 9.5 4.5-1.4 7.5-4.9 7.5-9.5V6L12 3Z" />,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
    transition: <><path d="M4 7h13l-3-3M20 17H7l3 3M17 4l3 3-3 3M7 14l-3 3 3 3" /></>,
    video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3v-4Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };

  return (
    <svg className="home-semantic-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<"training" | "process" | "about" | null>(null);
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
    const auto = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => clearInterval(auto);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileSubmenuOpen(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

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
        className="hero-section"
      >
        <div className="hero-backgrounds" aria-hidden="true">
          {slides.map((item, index) => (
            <div
              key={item.image}
              className={
                activeSlide === index
                  ? "hero-background active"
                  : "hero-background"
              }
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>
        <div className="dark-overlay"></div>
        <div className="code-layer"></div>
        <div className="globe-effect"></div>

        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">S</div>
            <div>
              <h2>Stellar</h2>
              <span>Groupware Inc</span>
            </div>
          </div>

          <a className="mobile-header-appointment" href="/appointment">
            Book Appointment
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              if (mobileMenuOpen) {
                setMobileSubmenuOpen(null);
              }
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            id="primary-navigation"
            className={mobileMenuOpen ? "nav-links menu-open" : "nav-links"}
            onClick={(event) => {
              const clickedLink = (event.target as HTMLElement).closest("a");
              const isMobileDropdownTrigger = clickedLink?.parentElement?.classList.contains("nav-dropdown");

              if (clickedLink && !isMobileDropdownTrigger) {
                setMobileMenuOpen(false);
                setMobileSubmenuOpen(null);
              }
            }}
          >
            <a
              id="home-nav-link"
              className={currentRoute === "home" ? "home-link active" : "home-link"}
              href="/"
              aria-current={currentRoute === "home" ? "page" : undefined}
              onClick={(event) => {
                if (currentRoute === "home") {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Home
            </a>
            <a
              className={currentRoute === "reviews" ? "active" : ""}
              href="/reviews"
              aria-current={currentRoute === "reviews" ? "page" : undefined}
            >
              Reviews
            </a>
            <a className={currentRoute === "pricing" ? "active" : ""} href="/pricing">Pricing</a>

            <div className={mobileSubmenuOpen === "training" ? "nav-dropdown mobile-submenu-open" : "nav-dropdown"}>
              <a
                className={currentRoute === "training" ? "active" : ""}
                href="/training"
                aria-expanded={mobileSubmenuOpen === "training"}
                onClick={(event) => {
                  if (window.matchMedia("(max-width: 1050px)").matches) {
                    event.preventDefault();
                    setMobileSubmenuOpen((open) => open === "training" ? null : "training");
                  }
                }}
              >
                Training ▾
              </a>
              <div className="dropdown-menu">
                <a href="/training">IT Training</a>
                <a href="/training#job-support">Job Support</a>
                <a href="/training#career-mentoring">Career Mentoring</a>
              </div>
            </div>

            <div className={mobileSubmenuOpen === "process" ? "nav-dropdown mobile-submenu-open" : "nav-dropdown"}>
              <a
                className={currentRoute === "process" ? "active" : ""}
                href="/process"
                aria-expanded={mobileSubmenuOpen === "process"}
                onClick={(event) => {
                  if (window.matchMedia("(max-width: 1050px)").matches) {
                    event.preventDefault();
                    setMobileSubmenuOpen((open) => open === "process" ? null : "process");
                  }
                }}
              >
                Process ▾
              </a>
              <div className="dropdown-menu">
                <a href="/process">How It Works</a>
                <a href="/process#enrollment">Enrollment Steps</a>
                <a href="/process#support">Support Process</a>
              </div>
            </div>

            <div className={mobileSubmenuOpen === "about" ? "nav-dropdown mobile-submenu-open" : "nav-dropdown"}>
              <a
                className={currentRoute === "about" ? "active" : ""}
                href="/about"
                aria-expanded={mobileSubmenuOpen === "about"}
                onClick={(event) => {
                  if (window.matchMedia("(max-width: 1050px)").matches) {
                    event.preventDefault();
                    setMobileSubmenuOpen((open) => open === "about" ? null : "about");
                  }
                }}
              >
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




<button
          type="button"
          className="slide-arrow left"
          onClick={previousSlide}
          aria-label="Previous hero slide"
        >
          ‹
        </button>

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

        <button
          type="button"
          className="slide-arrow right"
          onClick={nextSlide}
          aria-label="Next hero slide"
        >
          ›
        </button>

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


      <section className="home-reference-section home-video-showcase" aria-labelledby="home-video-title">
        <div className="home-section-heading">
          <h2 id="home-video-title">Watch How We Help You Succeed</h2>
          <p>See how Stellar training and mentoring can support your IT career.</p>
        </div>
        <div className="home-video-frame">
          <iframe
            src="https://www.youtube.com/embed/XoZdIzjFIFE"
            title="How Stellar training and mentoring support career growth"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      <section className="home-reference-section home-approach-section" aria-labelledby="home-approach-title">
        <div className="home-section-heading">
          <h2 id="home-approach-title">Our Approach</h2>
          <p>Four flexible pathways designed to support practical IT career growth.</p>
        </div>
        <div className="home-pathway-grid">
          {homePathways.map((pathway) => (
            <article className={`home-pathway-card ${pathway.tone}`} key={pathway.title}>
              <h3>{pathway.title}</h3>
              <p>{pathway.description}</p>
              <ol>
                {pathway.steps.map((step, index) => (
                  <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="home-reference-section home-path-cta" aria-labelledby="home-path-title">
        <h2 id="home-path-title">Choose Your Path to Success</h2>
        <p>Whether you are building new skills or strengthening existing experience, Stellar has a pathway for you.</p>
        <a href="/appointment">Book Free Consultation</a>
      </section>

      <section className="home-reference-section home-offer-section" aria-labelledby="home-offer-title">
        <div className="home-section-heading">
          <h2 id="home-offer-title">What We Offer</h2>
          <p>Comprehensive support designed for your IT career success.</p>
        </div>
        <div className="home-offer-grid">
          {homeOffers.map(({ icon, title, description }) => (
            <article key={title}>
              <span aria-hidden="true"><CareerIcon name={icon} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-reference-section home-audience-section" aria-labelledby="home-audience-title">
        <div className="home-section-heading">
          <h2 id="home-audience-title">Who We Help</h2>
          <p>Support for every stage of your IT learning and career journey.</p>
        </div>
        <div className="home-audience-grid">
          {homeAudiences.map(({ icon, title, description, benefits }) => (
            <article key={title} tabIndex={0}>
              <span className="home-audience-icon" aria-hidden="true"><CareerIcon name={icon} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>
                {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home-reference-section home-canada-section" aria-labelledby="home-canada-title">
        <div className="home-section-heading">
          <h2 id="home-canada-title">Why Stellar in Canada</h2>
        </div>
        <div className="home-canada-grid">
          <article><span>✓</span><p>Training focused on practical skills used by Canadian and North American employers.</p></article>
          <article><span>✓</span><p>Online mentoring and one-on-one guidance scheduled for Eastern Time.</p></article>
          <article><span>✓</span><p>Canadian-format resume, LinkedIn, interview, and career-readiness support.</p></article>
        </div>
      </section>

      <section className="home-reference-section home-struggle-section" aria-labelledby="home-struggle-title">
        <div className="home-section-heading light">
          <h2 id="home-struggle-title">Why Job Seekers Struggle</h2>
          <p>Many qualified candidates miss a few important success factors.</p>
        </div>
        <div className="home-struggle-grid">
          {seekerChallenges.map(({ icon, title, description }) => (
            <article key={title}>
              <span aria-hidden="true"><CareerIcon name={icon} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-reference-section home-mentoring-section" aria-labelledby="home-mentoring-title">
        <div className="home-mentoring-image" role="img" aria-label="Professionals meeting for career mentoring" />
        <div className="home-mentoring-copy">
          <h2 id="home-mentoring-title">Personalized Career Mentoring</h2>
          <p>Get practical guidance from experienced IT professionals who understand your goals, challenges, and schedule.</p>
          <div className="home-mentoring-grid">
            <article><span><CareerIcon name="globe" /></span><h3>Completely Remote &amp; Online</h3><p>Attend from anywhere with reliable internet access.</p></article>
            <article><span><CareerIcon name="video" /></span><h3>Live Guidance</h3><p>Ask questions and receive feedback in real time.</p></article>
            <article><span><CareerIcon name="clock" /></span><h3>Flexible Scheduling</h3><p>Choose sessions that work with your availability.</p></article>
            <article><span><CareerIcon name="briefcase" /></span><h3>Learn While You Work</h3><p>Build skills without putting your current responsibilities on hold.</p></article>
          </div>
          <a href="/appointment">Schedule a Free Consultation</a>
        </div>
      </section>

      <section className="home-reference-section home-expert-section" aria-labelledby="home-expert-title">
        <div className="home-section-heading">
          <h2 id="home-expert-title">Learn From Industry Experts</h2>
          <p>Practical support from professionals who understand modern IT workplaces.</p>
        </div>
        <div className="home-expert-card">
          <div className="home-expert-image" role="img" aria-label="Technology mentor supporting a learner" />
          <div>
            <span>STELLAR MENTORING TEAM</span>
            <h3>Guidance Built Around Your Goals</h3>
            <p>Stellar mentors combine technical knowledge with practical project and career guidance. Sessions focus on clear explanations, useful feedback, and realistic next steps.</p>
            <ul>
              <li>Practical IT industry experience</li>
              <li>Beginner-friendly mentoring</li>
              <li>Project and career-readiness guidance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home-reference-section home-guarantee-section" aria-labelledby="home-guarantee-title">
        <div className="home-section-heading">
          <h2 id="home-guarantee-title">Our Commitment</h2>
          <p>Your learning progress is our priority.</p>
        </div>
        <div className="home-guarantee-grid">
          <article><span><CareerIcon name="award" /></span><h3>Quality Training</h3><p>Clear learning materials and practical instruction delivered with professional standards.</p></article>
          <article><span><CareerIcon name="mentor" /></span><h3>Personal Attention</h3><p>Focused mentoring and feedback designed around individual learning needs.</p></article>
          <article><span><CareerIcon name="growth" /></span><h3>Progress Focused</h3><p>Structured milestones that help learners track improvement and prepare for next steps.</p></article>
        </div>
      </section>

      <section className="home-reference-section home-consultation-section" aria-labelledby="home-consultation-title">
        <span><CareerIcon name="calendar" /> Free 30-Minute Strategy Call</span>
        <h2 id="home-consultation-title">Book Your Free Consultation</h2>
        <p>Talk one-on-one with a Stellar mentor and receive a personalized learning and career roadmap.</p>
        <div className="home-consultation-benefits">
          <article><strong><CareerIcon name="target" /></strong><h3>Personalized Roadmap</h3><p>Built around your background and goals.</p></article>
          <article><strong><CareerIcon name="mentor" /></strong><h3>One-on-One Guidance</h3><p>Speak with an experienced professional.</p></article>
          <article><strong><CareerIcon name="shield" /></strong><h3>No Obligation</h3><p>A helpful first conversation at no cost.</p></article>
        </div>
        <a href="/appointment">Book Free Consultation</a>
        <small>Start with a clear conversation about your goals.</small>
      </section>

      <section className="home-reference-section home-final-cta" aria-labelledby="home-final-cta-title">
        <h2 id="home-final-cta-title">Ready to Transform Your IT Career?</h2>
        <p>Book a free consultation and start building your personalized pathway today.</p>
        <a href="/appointment">Schedule Your Free Consultation</a>
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
          <span className="reviews-eyebrow">CLIENT SUCCESS STORIES</span>
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
              <span className="linkedin-review-button">View on LinkedIn</span>
            </div>
          </a>
        </div>

        <div className="testimonial-column-grid">
          <article className="large-testimonial-card">
            <header>
              <h3>Training Program Testimonials</h3>
              <p>Feedback from our training participants</p>
            </header>

            <div className="testimonial-feature" aria-live="polite">
              <h4>{trainingReview.title}</h4>
              <p>{trainingReview.quote}</p>
            </div>

            <div className="testimonial-controls">
              <button
                type="button"
                onClick={showPreviousTrainingReview}
                aria-label="Previous training review"
              >
                ‹
              </button>
              <span>{trainingReviewIndex + 1} / {trainingReviews.length}</span>
              <button
                type="button"
                onClick={showNextTrainingReview}
                aria-label="Next training review"
              >
                ›
              </button>
            </div>

            <div className="testimonial-visual">
              <div className="testimonial-phone">
                <div className="testimonial-phone-header">
                  <span className="testimonial-avatar">S</span>
                  <div>
                    <strong>{trainingReview.name}</strong>
                    <span>{trainingReview.detail}</span>
                  </div>
                </div>
                <div className="testimonial-chat-bubble">
                  <p>{trainingReview.message}</p>
                  <small>Stellar learner feedback ✓✓</small>
                </div>
                <div className="testimonial-phone-input">Message</div>
              </div>
            </div>
          </article>

          <article className="large-testimonial-card">
            <header>
              <h3>Career Support Testimonials</h3>
              <p>Feedback from our mentoring and career-support learners</p>
            </header>

            <div className="testimonial-feature" aria-live="polite">
              <h4>{careerReview.title}</h4>
              <p>{careerReview.quote}</p>
            </div>

            <div className="testimonial-controls">
              <button
                type="button"
                onClick={showPreviousCareerReview}
                aria-label="Previous career review"
              >
                ‹
              </button>
              <span>{careerReviewIndex + 1} / {careerReviews.length}</span>
              <button
                type="button"
                onClick={showNextCareerReview}
                aria-label="Next career review"
              >
                ›
              </button>
            </div>

            <div className="testimonial-visual">
              <div className="testimonial-phone linkedin-phone">
                <div className="testimonial-phone-header">
                  <span className="testimonial-avatar">S</span>
                  <div>
                    <strong>{careerReview.name}</strong>
                    <span>{careerReview.detail}</span>
                  </div>
                </div>
                <div className="testimonial-chat-bubble">
                  <p>{careerReview.message}</p>
                  <small>Stellar career feedback ✓✓</small>
                </div>
                <div className="testimonial-phone-input">Message</div>
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
                    {appointmentDates.map(({ day, date, month, value, disabled }) => {
                      return (
                        <button
                          key={value}
                          type="button"
                          className={selectedDate === value ? "selected" : ""}
                          aria-pressed={selectedDate === value}
                          aria-label={`${value}${disabled ? ", unavailable" : ""}`}
                          disabled={disabled}
                          onClick={() => {
                            setSelectedDate(value);
                            setSelectedTime("");
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
