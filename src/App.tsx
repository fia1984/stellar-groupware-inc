import { useEffect, useState, useRef, type ReactNode } from "react";

const slides = [
  {
    tag: "CAREER TRANSITION",
    title: "Switching from Non-IT to IT? Start with Stellar.",
    subtitle: "Transition into Canada's IT Market with Structure & Strategy",
    text: "Many professionals want to move into IT but struggle with how and where to start. Stellar's training and mentoring help you become confident in IT.",
    primaryLabel: "Explore Training →",
    primaryHref: "/training",
    secondaryHref: "/about",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
  },
  {
    tag: "IT TRAINING",
    title: "Learn Practical IT Skills with Confidence.",
    subtitle: "Training, mentoring, and real project guidance",
    text: "We help beginners understand IT support, business systems, tools, workflows, and professional project practice step by step.",
    primaryLabel: "View Programs →",
    primaryHref: "/pricing",
    secondaryHref: "/training",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    tag: "BUSINESS SUPPORT",
    title: "Smart Groupware Support for Modern Teams.",
    subtitle: "Better communication, better systems, better workflow",
    text: "Stellar Groupware Inc supports teams with practical technology guidance, collaboration tools, and digital process improvement.",
    primaryLabel: "See How It Works →",
    primaryHref: "/process",
    secondaryHref: "/about",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80",
  },
  {
    tag: "CAREER SUPPORT",
    title: "Build Your IT Career with Practical Support.",
    subtitle: "Mentoring, project practice, and job preparation",
    text: "Get structured guidance to strengthen your technical skills, practise real workplace scenarios, and prepare confidently for IT opportunities.",
    primaryLabel: "Read Reviews →",
    primaryHref: "/reviews",
    secondaryHref: "/process",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80",
  },
];

const appointmentDates = Array.from({ length: 7 }, (_, index) => {
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


const stellarTrainingCategories = [
  "All Programs",
  "AI & Automation",
  "Cloud & DevOps",
  "Data & Analytics",
  "Software Development",
  "Security & Support",
];

const stellarTrainingCourses = [
  {
    title: "AI & Automation Foundations",
    category: "AI & Automation",
    visual: "AI",
    tone: "mint",
    duration: "50 hours live training",
    description:
      "Build practical AI skills, understand modern automation, and create guided portfolio projects.",
    topics: ["AI fundamentals", "Prompt design", "Workflow automation", "Portfolio project"],
  },
  {
    title: "Azure Cloud & DevOps",
    category: "Cloud & DevOps",
    visual: "AZ",
    tone: "blue",
    duration: "60 hours live training",
    description:
      "Learn cloud foundations, Azure services, Git, CI/CD, containers, and deployment workflows.",
    topics: ["Azure fundamentals", "Git and GitHub", "CI/CD pipelines", "Docker deployment"],
  },
  {
    title: "Data Analytics with Power BI",
    category: "Data & Analytics",
    visual: "BI",
    tone: "gold",
    duration: "50 hours live training",
    description:
      "Turn raw data into clear reports using Excel, SQL, Power BI, and practical business scenarios.",
    topics: ["Excel analysis", "SQL foundations", "Power BI dashboards", "Capstone report"],
  },
  {
    title: "Full Stack Web Development",
    category: "Software Development",
    visual: "</>",
    tone: "violet",
    duration: "70 hours live training",
    description:
      "Create responsive applications with modern frontend, backend, database, and deployment skills.",
    topics: ["HTML, CSS and TypeScript", "React development", "API integration", "Cloud deployment"],
  },
  {
    title: "Cybersecurity & IT Support",
    category: "Security & Support",
    visual: "SEC",
    tone: "navy",
    duration: "50 hours live training",
    description:
      "Develop troubleshooting, networking, system support, and security-awareness skills for IT roles.",
    topics: ["IT troubleshooting", "Networking basics", "Security operations", "Support simulations"],
  },
  {
    title: "QA & Test Automation",
    category: "Software Development",
    visual: "QA",
    tone: "coral",
    duration: "45 hours live training",
    description:
      "Learn manual testing, test planning, API checks, and browser automation through real scenarios.",
    topics: ["Testing fundamentals", "Test cases and defects", "API testing", "UI automation"],
  },
];

function App() {
  const routeMap: Record<string, string> = {
    "/": "home",
    "/reviews": "reviews",
    "/pricing": "pricing",
    "/training": "training",
    "/course": "course",
    "/process": "process",
    "/about": "about",
    "/account": "account",
    "/appointment": "appointment",
    "/enroll": "enroll",
    "/contact": "contact",
    "/privacy": "privacy",
    "/terms": "terms",
  };

  const requestedCourseName = new URLSearchParams(window.location.search).get("program");
  const requestedCourseExists =
    !requestedCourseName ||
    stellarTrainingCourses.some((course) => course.title === requestedCourseName);
  const matchedRoute = routeMap[window.location.pathname];
  const currentRoute =
    matchedRoute === "course" && !requestedCourseExists
      ? "not-found"
      : matchedRoute || "not-found";

  const routeTitle =
    currentRoute === "reviews"
      ? "Reviews"
      : currentRoute === "pricing"
      ? "Pricing"
      : currentRoute === "training"
      ? "Training"
      : currentRoute === "course"
      ? "Course Curriculum"
      : currentRoute === "process"
      ? "Process"
      : currentRoute === "about"
      ? "About"
      : currentRoute === "account"
      ? "My Account"
      : currentRoute === "appointment"
      ? "Book Appointment"
      : currentRoute === "enroll"
      ? "Enrollment"
      : currentRoute === "contact"
      ? "Contact"
      : currentRoute === "privacy"
      ? "Privacy Policy"
      : currentRoute === "terms"
      ? "Terms of Use"
      : currentRoute === "not-found"
      ? "Page Not Found"
      : "Home";

  useEffect(() => {
    const title = currentRoute === "home" ? "Home" : routeTitle;
    document.title = `${title} | Stellar Groupware Inc.`;
  }, [currentRoute, routeTitle]);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => window.removeEventListener("hashchange", scrollToHashTarget);
  }, [currentRoute]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<"training" | "process" | "about" | null>(null);
  const [trainingReviewIndex, setTrainingReviewIndex] = useState(0);
  const [careerReviewIndex, setCareerReviewIndex] = useState(0);
  const [trainingSearch, setTrainingSearch] = useState("");
  const [trainingCategory, setTrainingCategory] = useState("All Programs");

  const filteredTrainingCourses = stellarTrainingCourses.filter((course) => {
    const matchesCategory =
      trainingCategory === "All Programs" || course.category === trainingCategory;
    const searchText = trainingSearch.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      course.title.toLowerCase().includes(searchText) ||
      course.category.toLowerCase().includes(searchText) ||
      course.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const selectTrainingCategory = (category: string) => {
    setTrainingCategory(category);

    window.requestAnimationFrame(() => {
      document.getElementById("training-results-heading")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const selectedCourseName =
    requestedCourseName || stellarTrainingCourses[0].title;
  const selectedTrainingCourse =
    stellarTrainingCourses.find((course) => course.title === selectedCourseName) ||
    stellarTrainingCourses[0];

  const enrollmentProgram =
    new URLSearchParams(window.location.search).get("program") ||
    "Regular IT Training";
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [enrollmentEmail, setEnrollmentEmail] = useState("");
  const [enrollmentName, setEnrollmentName] = useState("");
  const [enrollmentPhone, setEnrollmentPhone] = useState("");
  const [enrollmentCity, setEnrollmentCity] = useState("");
  const [enrollmentCountry, setEnrollmentCountry] = useState("Canada");
  const [enrollmentGoal, setEnrollmentGoal] = useState("");
  const [enrollmentErrors, setEnrollmentErrors] = useState<
    Record<string, string>
  >({});
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

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
  const [appointmentErrors, setAppointmentErrors] = useState<Record<string, string>>({});

  const validateEnrollmentStep = (step: number) => {
    const errors: Record<string, string> = {};

    if (
      step === 1 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enrollmentEmail.trim())
    ) {
      errors.email = "Enter a valid email address.";
    }

    if (step === 2) {
      if (!/^[A-Za-zÀ-ÿ' -]{2,80}$/.test(enrollmentName.trim())) {
        errors.name = "Enter your full name using at least 2 letters.";
      }

      if (!/^[0-9+() -]{10,20}$/.test(enrollmentPhone.trim())) {
        errors.phone = "Enter a valid phone number.";
      }

      if (!/^[A-Za-zÀ-ÿ' .-]{2,80}$/.test(enrollmentCity.trim())) {
        errors.city = "Enter a valid city name.";
      }

      if (enrollmentGoal.trim().length < 10) {
        errors.goal = "Tell us about your goal using at least 10 characters.";
      }
    }

    setEnrollmentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearEnrollmentError = (field: string) => {
    setEnrollmentErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const validateAppointmentField = (
    field: "name" | "phone" | "email" | "city" | "service" | "requirement"
  ) => {
    let error = "";

    if (
      field === "name" &&
      !/^[A-Za-zÀ-ÿ' -]{2,80}$/.test(appointmentName.trim())
    ) {
      error = "Enter your full name using at least 2 letters.";
    }

    if (
      field === "phone" &&
      !/^[0-9+() -]{10,20}$/.test(appointmentPhone.trim())
    ) {
      error = "Enter a valid phone number.";
    }

    if (
      field === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appointmentEmail.trim())
    ) {
      error = "Enter a valid email address.";
    }

    if (
      field === "city" &&
      !/^[A-Za-zÀ-ÿ' .-]{2,80}$/.test(appointmentCity.trim())
    ) {
      error = "Enter a valid city name.";
    }

    if (field === "service" && !appointmentService) {
      error = "Select a service.";
    }

    if (
      field === "requirement" &&
      appointmentRequirement.trim().length < 10
    ) {
      error = "Add at least 10 characters.";
    }

    setAppointmentErrors((current) => ({
      ...current,
      [field]: error,
    }));
  };

  const validateAppointmentForm = () => {
    const errors: Record<string, string> = {};
    const namePattern = /^[A-Za-zÀ-ÿ' -]{2,80}$/;
    const phonePattern = /^[0-9+() -]{10,20}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cityPattern = /^[A-Za-zÀ-ÿ' .-]{2,80}$/;

    if (!namePattern.test(appointmentName.trim())) {
      errors.name = "Please enter a valid full name using at least 2 letters.";
    }

    if (!phonePattern.test(appointmentPhone.trim())) {
      errors.phone = "Please enter a valid phone number using 10 to 20 characters.";
    }

    if (!emailPattern.test(appointmentEmail.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!cityPattern.test(appointmentCity.trim())) {
      errors.city = "Please enter a valid city name using at least 2 letters.";
    }

    if (!appointmentCountry) {
      errors.country = "Please select your country.";
    }

    if (!appointmentService) {
      errors.service = "Please select a service.";
    }

    if (appointmentRequirement.trim().length < 10) {
      errors.requirement = "Please provide at least 10 characters.";
    }

    setAppointmentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Automatically reset the booking confirmation after 15 seconds.
  useEffect(() => {
    if (!appointmentBooked) {
      return;
    }

    const confirmationTimer = window.setTimeout(() => {
      setAppointmentBooked(false);
      setAppointmentStep(1);
      setSelectedDate("");
      setSelectedTime("");
      setAppointmentName("");
      setAppointmentPhone("");
      setAppointmentEmail("");
      setAppointmentCity("");
      setAppointmentCountry("Canada");
      setAppointmentService("");
      setAppointmentRequirement("");
      setAppointmentConsent(false);
    }, 15000);

    return () => window.clearTimeout(confirmationTimer);
  }, [appointmentBooked]);


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
            <a
              className={currentRoute === "pricing" ? "active" : ""}
              href="/pricing"
              aria-current={currentRoute === "pricing" ? "page" : undefined}
            >
              Pricing
            </a>

            <div className={mobileSubmenuOpen === "training" ? "nav-dropdown mobile-submenu-open" : "nav-dropdown"}>
              <a
                className={currentRoute === "training" ? "active" : ""}
                href="/training"
                aria-current={currentRoute === "training" ? "page" : undefined}
                aria-expanded={mobileSubmenuOpen === "training"}
                onClick={(event) => {
                  if (window.matchMedia("(max-width: 1250px)").matches) {
                    event.preventDefault();
                    setMobileSubmenuOpen((open) => open === "training" ? null : "training");
                  }
                }}
              >
                Training ▾
              </a>
              <div className="dropdown-menu training-dropdown-menu">
                <a href="/training">
                  <span className="training-dropdown-icon" aria-hidden="true">IT</span>
                  <span><strong>IT Training</strong><small>Browse practical programs</small></span>
                </a>
                <a href="/training#job-support">
                  <span className="training-dropdown-icon" aria-hidden="true">JOB</span>
                  <span><strong>Job Support</strong><small>Build workplace confidence</small></span>
                </a>
                <a href="/training#career-mentoring">
                  <span className="training-dropdown-icon" aria-hidden="true">CAREER</span>
                  <span><strong>Career Mentoring</strong><small>Plan your next career move</small></span>
                </a>
              </div>
            </div>

            <div className={mobileSubmenuOpen === "process" ? "nav-dropdown mobile-submenu-open" : "nav-dropdown"}>
              <a
                className={currentRoute === "process" ? "active" : ""}
                href="/process"
                aria-current={currentRoute === "process" ? "page" : undefined}
                aria-expanded={mobileSubmenuOpen === "process"}
                onClick={(event) => {
                  if (window.matchMedia("(max-width: 1250px)").matches) {
                    event.preventDefault();
                    setMobileSubmenuOpen((open) => open === "process" ? null : "process");
                  }
                }}
              >
                Process ▾
              </a>
              <div className="dropdown-menu training-dropdown-menu process-dropdown-menu">
                <a href="/process">
                  <span className="training-dropdown-icon" aria-hidden="true">MAP</span>
                  <span>
                    <strong>How It Works</strong>
                    <small>Explore the complete process</small>
                  </span>
                </a>

                <a href="/enroll">
                  <span className="training-dropdown-icon" aria-hidden="true">JOIN</span>
                  <span>
                    <strong>Enrollment Form</strong>
                    <small>Start your program enrollment</small>
                  </span>
                </a>

                <a href="/process#process-journey">
                  <span className="training-dropdown-icon" aria-hidden="true">HELP</span>
                  <span>
                    <strong>Support Process</strong>
                    <small>See how Stellar supports you</small>
                  </span>
                </a>
              </div>
            </div>

            <div className={mobileSubmenuOpen === "about" ? "nav-dropdown mobile-submenu-open" : "nav-dropdown"}>
              <a
                className={currentRoute === "about" ? "active" : ""}
                href="/about"
                aria-current={currentRoute === "about" ? "page" : undefined}
                aria-expanded={mobileSubmenuOpen === "about"}
                onClick={(event) => {
                  if (window.matchMedia("(max-width: 1250px)").matches) {
                    event.preventDefault();
                    setMobileSubmenuOpen((open) => open === "about" ? null : "about");
                  }
                }}
              >
                About ▾
              </a>
              <div className="dropdown-menu training-dropdown-menu about-dropdown-menu">
                <a href="/about">
                  <span className="training-dropdown-icon" aria-hidden="true">INFO</span>
                  <span>
                    <strong>About Stellar</strong>
                    <small>Learn who we are</small>
                  </span>
                </a>

                <a href="/about#mission">
                  <span className="training-dropdown-icon" aria-hidden="true">GOAL</span>
                  <span>
                    <strong>Our Mission</strong>
                    <small>See what guides our work</small>
                  </span>
                </a>

                <a href="/about#team">
                  <span className="training-dropdown-icon" aria-hidden="true">TEAM</span>
                  <span>
                    <strong>Our Team</strong>
                    <small>Meet your support network</small>
                  </span>
                </a>
              </div>
            </div>

            <a
              className={currentRoute === "account" ? "active" : ""}
              href="/account"
              aria-current={currentRoute === "account" ? "page" : undefined}
            >
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
              id="hero-primary-action"
              className="primary-btn"
              href={slide.primaryHref}
            >
              {slide.primaryLabel}
            </a>

            <a
              id="hero-learn-more"
              className="secondary-btn"
              href={slide.secondaryHref}
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
        href="mailto:info@stellargroupware.com?subject=Stellar%20Groupware%20Inquiry"
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
        id="home-services"
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



      <section
        className="training-catalog-page"
        id="training"
        aria-labelledby="training-page-title"
      >
        <header className="training-page-hero">
          <div>
            <span className="training-page-kicker">STELLAR LEARNING STUDIO</span>
            <h1 id="training-page-title">Build skills that work in the real world.</h1>
            <p>
              Instructor-led IT programs with practical projects, supportive
              mentoring, and a clear path from learning to career readiness.
            </p>
          </div>
          <div className="training-hero-strips" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </header>

        <div className="training-catalog-inner">
          <div className="training-intro">
            <span>EXPLORE PROGRAMS</span>
            <h2>Find the right training path</h2>
            <p>Search by skill or choose a category to see programs designed for Stellar learners.</p>
          </div>

          <label className="training-search">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search training programs</span>
            <input
              type="search"
              value={trainingSearch}
              onChange={(event) => setTrainingSearch(event.target.value)}
              placeholder="Search programs, skills, or categories..."
            />
          </label>

          <div className="training-category-strip" role="group" aria-label="Filter training programs">
            {stellarTrainingCategories.map((category, index) => (
              <button
                type="button"
                key={category}
              className={trainingCategory === category ? "active" : ""}
              aria-pressed={trainingCategory === category}
              aria-controls="training-results-heading"
              aria-label={`Show ${category} courses`}
              onClick={() => selectTrainingCategory(category)}
            >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {category}
              </button>
            ))}
          </div>

          <div
            className="training-results-heading"
            id="training-results-heading"
            tabIndex={-1}
          >
            <h2>Stellar training programs</h2>
            <span aria-live="polite">
              {filteredTrainingCourses.length}{" "}
              {filteredTrainingCourses.length === 1 ? "program" : "programs"}
            </span>
          </div>

          {filteredTrainingCourses.length > 0 ? (
            <div className="training-course-grid">
              {filteredTrainingCourses.map((course) => (
                <article className="training-course-card" key={course.title}>
                  <div className={`training-course-visual ${course.tone}`}>
                    <span>{course.visual}</span>
                    <small>STELLAR LAB</small>
                  </div>
                  <div className="training-course-body">
                    <span className="training-course-category">{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className="training-course-meta">
                      <span>◷ {course.duration}</span>
                      <span>♢ Certificate</span>
                    </div>
                    <a
                      className="training-view-curriculum"
                      href={`/course?program=${encodeURIComponent(course.title)}`}
                    >
                      View Curriculum <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="training-empty-state">
              <strong>No programs found</strong>
              <p>Try another keyword or select All Programs.</p>
              <button type="button" onClick={() => {
                setTrainingSearch("");
                setTrainingCategory("All Programs");
              }}>
                Clear filters
              </button>
            </div>
          )}

          <section className="training-support-panel" id="job-support">
            <div>
              <span>JOB SUPPORT</span>
              <h2>Learning continues after the course.</h2>
              <p>Get practical guidance for projects, workplace questions, interviews, and career preparation.</p>
            </div>
            <a href="/appointment">Talk to a Stellar mentor →</a>
          </section>

          <section className="training-mentoring-panel" id="career-mentoring">
            <div>
              <span>CAREER MENTORING</span>
              <h2>A clearer route toward your next role.</h2>
            </div>
            <ul>
              <li>Personal learning roadmap</li>
              <li>Resume and LinkedIn guidance</li>
              <li>Interview preparation</li>
              <li>Canadian career-readiness support</li>
            </ul>
          </section>
        </div>
      </section>


      <section
        className="training-course-detail-page"
        id="course"
        aria-labelledby="course-detail-title"
      >
        <header className="course-detail-hero">
          <div>
            <a href="/training">‹ All training programs</a>
            <span>STELLAR COURSE CURRICULUM</span>
            <h1 id="course-detail-title">
              {selectedTrainingCourse.title} Course &amp; Curriculum
            </h1>
            <p>
              Practical, instructor-led training with guided projects,
              certification preparation, mentoring, and career-readiness support.
            </p>
          </div>
        </header>

        <div className="course-detail-inner">
          <div className="course-detail-facts" aria-label="Course highlights">
            <article>
              <span aria-hidden="true">CERT</span>
              <strong>Industry-Focused Certificate</strong>
              <p>Credentials that support your portfolio</p>
            </article>
            <article>
              <span aria-hidden="true">HRS</span>
              <strong>{selectedTrainingCourse.duration}</strong>
              <p>Interactive instructor-led sessions</p>
            </article>
            <article>
              <span aria-hidden="true">LAB</span>
              <strong>Hands-On Projects</strong>
              <p>Practice based on workplace scenarios</p>
            </article>
            <article>
              <span aria-hidden="true">MOD</span>
              <strong>4 Learning Modules</strong>
              <p>Structured from foundations to practice</p>
            </article>
          </div>

          <div className="course-curriculum-heading">
            <span>YOUR LEARNING ROADMAP</span>
            <h2>Course curriculum</h2>
          </div>

          <article className="course-module-card course-module-open">
            <div className="course-module-title">
              <span>Module 1</span>
              <h3>{selectedTrainingCourse.title} Foundations</h3>
            </div>
            <p>
              Build the core knowledge and practical confidence required for
              the rest of this Stellar program.
            </p>
            <div className="course-topic-grid">
              {selectedTrainingCourse.topics.map((topic) => (
                <div key={topic}><span>✓</span>{topic}</div>
              ))}
              <div><span>✓</span>Guided workplace scenario</div>
              <div><span>✓</span>Instructor feedback session</div>
              <div><span>✓</span>Practical knowledge check</div>
              <div><span>✓</span>Portfolio planning</div>
            </div>
          </article>

          <div className="course-locked-modules" aria-hidden="true">
            <article className="course-module-card">
              <div className="course-module-title">
                <span>Module 2</span>
                <h3>Core Tools &amp; Applied Workflows</h3>
              </div>
              <p>Develop practical skills using the tools and processes used in modern workplaces.</p>
              <div className="course-topic-grid">
                <div><span>✓</span>Core technical workflow</div>
                <div><span>✓</span>Guided practice lab</div>
                <div><span>✓</span>Tool configuration</div>
                <div><span>✓</span>Applied troubleshooting</div>
              </div>
            </article>
            <article className="course-module-card">
              <div className="course-module-title">
                <span>Module 3</span>
                <h3>Projects &amp; Workplace Practice</h3>
              </div>
              <p>Complete realistic activities with structured mentor feedback.</p>
            </article>
            <article className="course-module-card">
              <div className="course-module-title">
                <span>Module 4</span>
                <h3>Career Readiness &amp; Final Project</h3>
              </div>
              <p>Bring your skills together and prepare to explain your work confidently.</p>
            </article>
          </div>

          <aside className="course-unlock-card">
            <span className="course-lock-icon" aria-hidden="true">▢</span>
            <h2>See the full module-by-module breakdown</h2>
            <p>
              Start your Stellar enrollment to unlock every module, the complete
              topic list, project details, mentoring options, and current program information.
            </p>
            <a href={`/enroll?program=${encodeURIComponent(selectedTrainingCourse.title)}`}>
              Unlock the Full Curriculum <span>→</span>
            </a>
            <small>No payment is required to start your request.</small>
          </aside>
        </div>
      </section>

      <section
        className="enrollment-page"
        id="enroll"
        aria-labelledby="enrollment-title"
      >
        <aside className="enrollment-brand-panel">
          <div className="enrollment-brand-name">
            <span>S</span>
            <strong>STELLAR GROUPWARE INC</strong>
          </div>

          <div className="enrollment-brand-content">
            <p className="enrollment-eyebrow">YOUR STELLAR PATHWAY</p>
            <h1>Your IT career, supported from learning to work.</h1>
            <p>
              Training, mentoring, project practice, and career support—all
              organized around your selected pathway.
            </p>

            <ul>
              <li>Expert-led, beginner-friendly training</li>
              <li>Mentoring and project support</li>
              <li>Clear learning and career next steps</li>
            </ul>
          </div>

          <small>© 2026 Stellar Groupware Inc.</small>
        </aside>

        <div className="enrollment-form-panel">
          <div className="enrollment-form-wrap">
            <div className="enrollment-logo">
              <span>S</span>
              <strong>Stellar</strong>
            </div>

            <div
              className="enrollment-progress"
              aria-label={`Step ${enrollmentStep} of 3`}
            >
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  className={enrollmentStep >= step ? "active" : ""}
                  aria-hidden="true"
                />
              ))}
              <small>Step {enrollmentStep} of 3</small>
            </div>

            {enrollmentStep === 1 ? (
              <form
                className="enrollment-form"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();

                  if (validateEnrollmentStep(1)) {
                    setEnrollmentStep(2);
                  }
                }}
              >
                <p className="enrollment-eyebrow">START YOUR ENROLLMENT</p>
                <h1 id="enrollment-title">Enter your email</h1>
                <p>
                  Start your request for the selected Stellar program.
                </p>

                <div className="enrollment-program-summary">
                  <small>Selected program</small>
                  <strong>{enrollmentProgram}</strong>
                </div>

                <label htmlFor="enrollment-email">Email address</label>
                <input
                  id="enrollment-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={enrollmentEmail}
                  aria-invalid={Boolean(enrollmentErrors.email)}
                  onChange={(event) => {
                    setEnrollmentEmail(event.target.value);
                    clearEnrollmentError("email");
                  }}
                />

                {enrollmentErrors.email && (
                  <span className="enrollment-error" role="alert">
                    {enrollmentErrors.email}
                  </span>
                )}

                <button type="submit" className="enrollment-primary-btn">
                  Continue →
                </button>

                <a href="/pricing" className="enrollment-back-link">
                  ← Back to programs and pricing
                </a>
              </form>
            ) : enrollmentStep === 2 ? (
              <form
                className="enrollment-form"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();

                  if (validateEnrollmentStep(2)) {
                    setEnrollmentStep(3);
                  }
                }}
              >
                <p className="enrollment-eyebrow">YOUR DETAILS</p>
                <h1>Tell us about yourself</h1>
                <p>Complete the details for your selected Stellar pathway.</p>

                <label htmlFor="enrollment-name">Full name</label>
                <input
                  id="enrollment-name"
                  type="text"
                  autoComplete="name"
                  value={enrollmentName}
                  aria-invalid={Boolean(enrollmentErrors.name)}
                  onChange={(event) => {
                    setEnrollmentName(event.target.value);
                    clearEnrollmentError("name");
                  }}
                />
                {enrollmentErrors.name && (
                  <span className="enrollment-error" role="alert">
                    {enrollmentErrors.name}
                  </span>
                )}

                <label htmlFor="enrollment-phone">Mobile number</label>
                <input
                  id="enrollment-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={enrollmentPhone}
                  aria-invalid={Boolean(enrollmentErrors.phone)}
                  onChange={(event) => {
                    setEnrollmentPhone(event.target.value);
                    clearEnrollmentError("phone");
                  }}
                />
                {enrollmentErrors.phone && (
                  <span className="enrollment-error" role="alert">
                    {enrollmentErrors.phone}
                  </span>
                )}

                <div className="enrollment-field-row">
                  <div>
                    <label htmlFor="enrollment-city">City</label>
                    <input
                      id="enrollment-city"
                      type="text"
                      autoComplete="address-level2"
                      value={enrollmentCity}
                      aria-invalid={Boolean(enrollmentErrors.city)}
                      onChange={(event) => {
                        setEnrollmentCity(event.target.value);
                        clearEnrollmentError("city");
                      }}
                    />
                    {enrollmentErrors.city && (
                      <span className="enrollment-error" role="alert">
                        {enrollmentErrors.city}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="enrollment-country">Country</label>
                    <select
                      id="enrollment-country"
                      value={enrollmentCountry}
                      onChange={(event) =>
                        setEnrollmentCountry(event.target.value)
                      }
                    >
                      <option>Canada</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <label htmlFor="enrollment-goal">
                  Your learning or career goal
                </label>
                <textarea
                  id="enrollment-goal"
                  rows={4}
                  value={enrollmentGoal}
                  aria-invalid={Boolean(enrollmentErrors.goal)}
                  onChange={(event) => {
                    setEnrollmentGoal(event.target.value);
                    clearEnrollmentError("goal");
                  }}
                />
                {enrollmentErrors.goal && (
                  <span className="enrollment-error" role="alert">
                    {enrollmentErrors.goal}
                  </span>
                )}

                <div className="enrollment-form-actions">
                  <button
                    type="button"
                    className="enrollment-secondary-btn"
                    onClick={() => setEnrollmentStep(1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="enrollment-primary-btn">
                    Review →
                  </button>
                </div>
              </form>
            ) : (
              <div className="enrollment-review">
                {enrollmentComplete ? (
                  <>
                    <span className="enrollment-success-icon">✓</span>
                    <h1>Request prepared</h1>
                    <p>
                      Your frontend request for <strong>{enrollmentProgram}</strong>{" "}
                      has been prepared.
                    </p>
                    <a href="/pricing">Back to programs and pricing</a>
                  </>
                ) : (
                  <>
                    <p className="enrollment-eyebrow">REVIEW</p>
                    <h1>Confirm your details</h1>

                    <dl>
                      <div><dt>Program</dt><dd>{enrollmentProgram}</dd></div>
                      <div><dt>Email</dt><dd>{enrollmentEmail}</dd></div>
                      <div><dt>Name</dt><dd>{enrollmentName}</dd></div>
                      <div><dt>Phone</dt><dd>{enrollmentPhone}</dd></div>
                      <div><dt>Location</dt><dd>{enrollmentCity}, {enrollmentCountry}</dd></div>
                      <div><dt>Goal</dt><dd>{enrollmentGoal}</dd></div>
                    </dl>

                    <p className="enrollment-notice">
                      Frontend demonstration only. No payment is collected and
                      no information is sent to a backend.
                    </p>

                    <div className="enrollment-form-actions">
                      <button
                        type="button"
                        className="enrollment-secondary-btn"
                        onClick={() => setEnrollmentStep(2)}
                      >
                        Edit details
                      </button>
                      <button
                        type="button"
                        className="enrollment-primary-btn"
                        onClick={() => setEnrollmentComplete(true)}
                      >
                        Confirm request
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
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
              <a href="/enroll?program=Regular%20IT%20Training" className="enroll-btn" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
              <a href="/enroll?program=AI%20%2B%20IT%20Training" className="enroll-btn" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
              <a href="/enroll?program=Bootcamp%20Support" className="enroll-btn dark" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
              <a href="/enroll?program=Marketing%20Support" className="enroll-btn" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
              <a href="/enroll?program=Direct%20Bootcamp" className="enroll-btn dark" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
              <a href="/enroll?program=Career%20Marketing" className="enroll-btn" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
              <a href="/enroll?program=Direct%20Marketing%20Program" className="enroll-btn dark" target="_blank" rel="noopener noreferrer">Enroll Now →</a>
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
            href="https://www.linkedin.com/search/results/companies/?keywords=Stellar%20Groupware%20Inc"
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
              href="https://www.linkedin.com/search/results/companies/?keywords=Stellar%20Groupware%20Inc"
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
        <div className="process-hero">
          <div className="process-hero-copy">
            <p className="section-label">STELLAR TRAINING PROCESS</p>
            <h1>From learning to <span>career confidence.</span></h1>
            <p>
              Our structured five-phase process combines guided training, daily
              practice, session support, practical milestones, and job-readiness
              preparation—giving beginners a clear path forward.
            </p>
            <div className="process-highlights" aria-label="Training process highlights">
              <span><strong>Live</strong> Guided Training</span>
              <span><strong>Daily</strong> Practical Tasks</span>
              <span><strong>Recorded</strong> Session Access</span>
              <span><strong>Career</strong> Preparation</span>
            </div>
          </div>
          <div className="process-hero-visual" aria-label="Stellar learning journey illustration">
            <div className="process-orbit">
              <span>Learn</span><span>Practice</span><span>Build</span><span>Prepare</span>
              <strong>STELLAR<br />JOURNEY</strong>
            </div>
          </div>
        </div>

        <div className="process-overview">
          <p className="section-label">HOW IT ALL CONNECTS</p>
          <h2>A complete learning journey.</h2>
          <p>Each phase builds on the previous one to create a practical, supportive path.</p>
          <ol className="process-flow" aria-label="Five training phases">
            <li><span>01</span><strong>Goal Plan</strong></li>
            <li><span>02</span><strong>Skill Building</strong></li>
            <li><span>03</span><strong>Guided Practice</strong></li>
            <li><span>04</span><strong>Project Proof</strong></li>
            <li><span>05</span><strong>Career Ready</strong></li>
          </ol>
        </div>

        <div className="process-journey" id="process-journey">
          <div className="process-journey-heading">
            <p className="section-label">THE STELLAR TRAINING JOURNEY</p>
            <h2>Simple step-by-step support.</h2>
            <p>Five focused phases take you from a clear starting point to stronger job readiness.</p>
          </div>

          <article className="process-phase phase-one">
            <span className="process-phase-number">01</span>
            <div className="process-phase-body">
              <span className="process-phase-icon" aria-hidden="true">◎</span>
              <div><small>PHASE 01</small><h3>Understand Your Goal</h3><b>A plan designed around your starting point</b></div>
              <p>We review your experience, learning needs, availability, and career direction. Together, we create a realistic roadmap so you know what to learn and why it matters.</p>
              <ul><li>Current-level review</li><li>Clear learning roadmap</li><li>Schedule planning</li><li>Dedicated guidance</li></ul>
            </div>
          </article>

          <article className="process-phase phase-two">
            <span className="process-phase-number">02</span>
            <div className="process-phase-body">
              <span className="process-phase-icon" aria-hidden="true">⌘</span>
              <div><small>PHASE 02</small><h3>Build Core Skills</h3><b>Practical learning with clear explanations</b></div>
              <p>You learn essential tools and concepts through instructor guidance, demonstrations, and structured activities. Every topic is explained in beginner-friendly language.</p>
              <ul><li>Guided live learning</li><li>Module-based curriculum</li><li>Hands-on exercises</li><li>Question support</li></ul>
            </div>
          </article>

          <article className="process-phase phase-three">
            <span className="process-phase-number">03</span>
            <div className="process-phase-body">
              <span className="process-phase-icon" aria-hidden="true">▶</span>
              <div><small>PHASE 03</small><h3>Practice With Support</h3><b>Build confidence by applying what you learn</b></div>
              <p>Short daily activities, practice scenarios, and session recordings help you revisit concepts and turn new knowledge into repeatable skills without falling behind.</p>
              <ul><li>Daily practice tasks</li><li>Session recordings</li><li>Feedback and corrections</li><li>Progress check-ins</li></ul>
            </div>
          </article>

          <article className="process-phase phase-four">
            <span className="process-phase-number">04</span>
            <div className="process-phase-body">
              <span className="process-phase-icon" aria-hidden="true">◇</span>
              <div><small>PHASE 04</small><h3>Complete Practical Projects</h3><b>Show your skills through realistic work</b></div>
              <p>You complete guided projects and workflow-based assignments that connect training to real workplace situations. These examples strengthen your understanding and portfolio.</p>
              <ul><li>Realistic scenarios</li><li>Project guidance</li><li>Portfolio evidence</li><li>Quality review</li></ul>
            </div>
          </article>

          <article className="process-phase phase-five">
            <span className="process-phase-number">05</span>
            <div className="process-phase-body">
              <span className="process-phase-icon" aria-hidden="true">✓</span>
              <div><small>PHASE 05</small><h3>Prepare for Work</h3><b>Turn your progress into career confidence</b></div>
              <p>We help you organize your resume, improve LinkedIn, practise interviews, and explain your project experience clearly so you are better prepared for opportunities.</p>
              <ul><li>Resume support</li><li>LinkedIn guidance</li><li>Interview practice</li><li>Job-readiness review</li></ul>
            </div>
          </article>
        </div>

        <section className="process-ecosystem">
          <div className="process-ecosystem-visual" aria-hidden="true">
            <span>Training</span><span>Practice</span><span>Projects</span><span>Career</span><strong>YOU</strong>
          </div>
          <div>
            <p className="section-label">CONNECTED SUPPORT</p>
            <h2>A complete learning ecosystem.</h2>
            <p>Stellar’s process connects training, practice, project work, and career preparation. You are supported throughout the journey instead of being left with theory alone.</p>
            <ul><li>Learning fits around realistic weekly schedules</li><li>Practice reinforces every important concept</li><li>Recordings help you revisit difficult topics</li><li>Career preparation connects skills to opportunities</li></ul>
          </div>
        </section>

        <section className="process-guidelines">
          <p className="section-label">PROGRAM GUIDELINES</p>
          <h2>What helps learners succeed.</h2>
          <p>Simple expectations keep the learning experience productive and consistent.</p>
          <div className="process-guideline-grid">
            <article><span>◫</span><h3>Flexible Start</h3><p>Begin from the most suitable module after your learning plan is confirmed.</p></article>
            <article><span>▥</span><h3>Consistent Attendance</h3><p>Regular participation helps you understand each topic and maintain momentum.</p></article>
            <article><span>✓</span><h3>Active Participation</h3><p>Complete practice and ask questions so your trainer can support your progress.</p></article>
            <article><span>▶</span><h3>Recordings Available</h3><p>Review recorded sessions when you need to revisit a concept or missed explanation.</p></article>
            <article><span>◷</span><h3>Progress Check-ins</h3><p>Stay in contact with your coordinator and discuss blockers before they grow.</p></article>
            <article><span>◇</span><h3>Completion Milestones</h3><p>Finish the required modules, activities, and projects to complete your pathway.</p></article>
          </div>
        </section>

        <section className="process-cta">
          <h2>Have questions about our training process?</h2>
          <p>Book a free consultation to discuss your goals and find the right learning pathway.</p>
          <div><a href="/appointment">Book Consultation →</a><a href="/training">Browse Training</a></div>
        </section>
      </section>

      <section className="about-section" id="about">
        <div className="about-hero">
          <p className="section-label">ABOUT STELLAR</p>
          <h1>Practical IT guidance built around your progress.</h1>
          <p className="section-intro">
            Stellar Groupware Inc helps beginners, career changers, and growing
            professionals develop practical technology skills through structured
            training, mentoring, project practice, and career support.
          </p>
        </div>

        <section className="about-story" aria-labelledby="about-story-title">
          <div className="about-story-media">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
              alt="Professionals collaborating around a workplace table"
            />
            <div className="about-story-badge">
              <strong>2,870+</strong>
              <span>Successful Stories</span>
            </div>
          </div>

          <div className="about-story-copy">
            <p className="section-label">OUR STORY</p>
            <h2 id="about-story-title">
              Support designed for real career progress.
            </h2>
            <p>
              Stellar was created to make technology learning easier to
              understand, practise, and apply. We organize training into
              manageable steps so learners can build skills without feeling
              overwhelmed.
            </p>
            <p>
              Our approach connects instructor guidance, project practice,
              mentoring, and career preparation so every learner understands
              what to work on and how each skill connects to the workplace.
            </p>
          </div>
        </section>

        <div className="about-stats" aria-label="Stellar Groupware statistics">
          <article>
            <AnimatedCounter end={2870} />
            <span>Successful Stories</span>
          </article>
          <article>
            <AnimatedCounter end={2075} />
            <span>Active Mentees</span>
          </article>
          <article>
            <AnimatedCounter end={186} />
            <span>Team Members</span>
          </article>
          <article>
            <AnimatedCounter end={55} />
            <span>Trainers</span>
          </article>
        </div>

        <section className="about-mission" id="mission">
          <div className="about-section-heading">
            <p className="section-label">OUR PURPOSE</p>
            <h2>Clear guidance for every stage of your progress.</h2>
          </div>

          <div className="about-mission-grid">
            <article className="about-purpose-card mission-card">
              <span aria-hidden="true">◎</span>
              <h3>Our Mission</h3>
              <p>
                Make technology learning clear, practical, and achievable
                through structured instruction, project practice, mentoring,
                and dependable career support.
              </p>
            </article>

            <article className="about-purpose-card vision-card">
              <span aria-hidden="true">◉</span>
              <h3>Our Vision</h3>
              <p>
                Create an accessible learning environment where beginners and
                growing professionals can develop useful skills, confidence,
                and a clear pathway toward technology opportunities.
              </p>
            </article>
          </div>
        </section>

        <section
          className="about-values"
          aria-labelledby="about-values-title"
        >
          <div className="about-section-heading">
            <p className="section-label">OUR CORE VALUES</p>
            <h2 id="about-values-title">
              Principles that guide how we support learners.
            </h2>
          </div>

          <div className="about-values-grid">
            <article>
              <span aria-hidden="true">✓</span>
              <h3>Clarity</h3>
              <p>
                We explain technical concepts in straightforward language.
              </p>
            </article>

            <article>
              <span aria-hidden="true">◆</span>
              <h3>Practical Learning</h3>
              <p>
                We connect lessons with tasks, tools, and workplace scenarios.
              </p>
            </article>

            <article>
              <span aria-hidden="true">↗</span>
              <h3>Consistent Support</h3>
              <p>
                We help learners resolve blockers and maintain momentum.
              </p>
            </article>

            <article>
              <span aria-hidden="true">◎</span>
              <h3>Career Confidence</h3>
              <p>
                We prepare learners to discuss and demonstrate their skills.
              </p>
            </article>
          </div>
        </section>

        <section
          className="about-difference"
          aria-labelledby="about-difference-title"
        >
          <div className="about-section-heading">
            <p className="section-label">WHY STELLAR</p>
            <h2 id="about-difference-title">What sets us apart.</h2>
          </div>

          <div className="about-difference-grid">
            <article>
              <h3>Practical Expertise</h3>
              <p>
                Guidance is connected to useful tools, realistic tasks, and
                professional workplace expectations.
              </p>
            </article>

            <article>
              <h3>Personalized Approach</h3>
              <p>
                Learners receive structured support based on their experience,
                goals, learning pace, and selected pathway.
              </p>
            </article>

            <article>
              <h3>Complete Support</h3>
              <p>
                Training, mentoring, project guidance, and career preparation
                work together as one organized experience.
              </p>
            </article>
          </div>
        </section>

        <section className="about-team" id="team">
          <div className="about-section-heading">
            <p className="section-label">OUR TEAM</p>
            <h2>Experienced guidance at every stage.</h2>
            <p>
              Our instructors, mentors, and coordinators work together to
              provide organized training, useful feedback, project guidance,
              and career preparation throughout each learner&apos;s pathway.
            </p>
          </div>

          <div className="about-team-grid">
            <article>
              <span aria-hidden="true">IT</span>
              <h3>Instructors</h3>
              <p>
                Teach core concepts and demonstrate practical workflows.
              </p>
            </article>

            <article>
              <span aria-hidden="true">PM</span>
              <h3>Project Mentors</h3>
              <p>
                Guide practical activities and strengthen project confidence.
              </p>
            </article>

            <article>
              <span aria-hidden="true">CS</span>
              <h3>Career Support</h3>
              <p>
                Help learners prepare their profiles and next career steps.
              </p>
            </article>
          </div>
        </section>

        <section className="about-cta">
          <div>
            <p className="section-label">START YOUR PATHWAY</p>
            <h2>Ready to discuss your IT goals?</h2>
            <p>
              Book a free consultation and receive clear recommendations for
              your next step.
            </p>
          </div>

          <div className="about-cta-actions">
            <a className="enroll-btn" href="/appointment">
              Book Free Consultation
            </a>
            <a className="about-training-link" href="/training">
              View Our Training
            </a>
          </div>
        </section>
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
          <div className="appointment-page-intro">
            <div>
              <p className="appointment-intro-label">FREE CAREER CONSULTATION</p>
              <h1>Plan your next step in IT.</h1>
              <p>
                Choose a date and time that works for you. A Stellar advisor
                will help you understand your training, project-support, and
                career options.
              </p>
            </div>

            <div className="appointment-intro-benefits" aria-label="Appointment benefits">
              <span>✓ 30-minute online meeting</span>
              <span>✓ Clear recommendations</span>
              <span>✓ No booking fee</span>
            </div>
          </div>

          <div className="appointment-layout">
            <div className="appointment-main-card">
              <p className="section-label">BOOK APPOINTMENT</p>
              <h2>Schedule Your Consultation</h2>
                {appointmentBooked ? (
                  <div className="appointment-confirmation">
                    <div className="appointment-confirmation-icon">✓</div>

                    <h3>Request prepared!</h3>

                    <p>
                      Your appointment details passed validation. Email confirmation
                      is not connected yet, so please contact Stellar to complete
                      the booking.
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

              <div className="appointment-steps appointment-steps-simple">
                <span className={appointmentStep >= 1 ? "active" : ""}>1</span>
                <strong>Date</strong>
                <span className={appointmentStep >= 3 ? "active" : ""}>2</span>
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
                  noValidate
                  onSubmit={(event) => {
                    event.preventDefault();

                    if (!validateAppointmentForm()) {
                      return;
                    }

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
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={appointmentName}
                      aria-invalid={Boolean(appointmentErrors.name)}
                      aria-describedby={
                        appointmentErrors.name ? "appointment-name-error" : undefined
                      }
                      onBlur={() => validateAppointmentField("name")}
                      onChange={(event) => {
                        setAppointmentName(event.target.value);
                        setAppointmentErrors((current) => ({
                          ...current,
                          name: "",
                        }));
                      }}
                    />
                    {appointmentErrors.name && (
                      <span
                        id="appointment-name-error"
                        className="appointment-field-error"
                        role="alert"
                      >
                        {appointmentErrors.name}
                      </span>
                    )}
                  </label>

                  <label>
                    Mobile Number *
                    <input
                      minLength={10}
                      maxLength={20}
                      inputMode="tel"
                      autoComplete="tel"
                      type="tel"
                      placeholder="+1 416 555 0123"
                      value={appointmentPhone}
                      aria-invalid={Boolean(appointmentErrors.phone)}
                      aria-describedby={
                        appointmentErrors.phone ? "appointment-phone-error" : undefined
                      }
                      onBlur={() => validateAppointmentField("phone")}
                      onChange={(event) => {
                        setAppointmentPhone(event.target.value);
                        setAppointmentErrors((current) => ({
                          ...current,
                          phone: "",
                        }));
                      }}
                    />
                    {appointmentErrors.phone && (
                      <span
                        id="appointment-phone-error"
                        className="appointment-field-error"
                        role="alert"
                      >
                        {appointmentErrors.phone}
                      </span>
                    )}
                  </label>

                  <label>
                    Email *
                    <input
                      maxLength={120}
                      autoComplete="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={appointmentEmail}
                      aria-invalid={Boolean(appointmentErrors.email)}
                      aria-describedby={
                        appointmentErrors.email ? "appointment-email-error" : undefined
                      }
                      onBlur={() => validateAppointmentField("email")}
                      onChange={(event) => {
                        setAppointmentEmail(event.target.value);
                        setAppointmentErrors((current) => ({
                          ...current,
                          email: "",
                        }));
                      }}
                    />
                    {appointmentErrors.email && (
                      <span
                        id="appointment-email-error"
                        className="appointment-field-error"
                        role="alert"
                      >
                        {appointmentErrors.email}
                      </span>
                    )}
                  </label>

                  <label>
                    City *
                    <input
                      minLength={2}
                      maxLength={80}
                      autoComplete="address-level2"
                      type="text"
                      placeholder="Toronto"
                      value={appointmentCity}
                      aria-invalid={Boolean(appointmentErrors.city)}
                      aria-describedby={
                        appointmentErrors.city ? "appointment-city-error" : undefined
                      }
                      onBlur={() => validateAppointmentField("city")}
                      onChange={(event) => {
                        setAppointmentCity(event.target.value);
                        setAppointmentErrors((current) => ({
                          ...current,
                          city: "",
                        }));
                      }}
                    />
                    {appointmentErrors.city && (
                      <span
                        id="appointment-city-error"
                        className="appointment-field-error"
                        role="alert"
                      >
                        {appointmentErrors.city}
                      </span>
                    )}
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
                      value={appointmentService}
                      aria-invalid={Boolean(appointmentErrors.service)}
                      aria-describedby={
                        appointmentErrors.service
                          ? "appointment-service-error"
                          : undefined
                      }
                      onBlur={() => validateAppointmentField("service")}
                      onChange={(event) => {
                        setAppointmentService(event.target.value);
                        setAppointmentErrors((current) => ({
                          ...current,
                          service: "",
                        }));
                      }}
                    >
                      <option value="">Select a service</option>
                      <option>Regular IT Training</option>
                      <option>AI + IT Training</option>
                      <option>Bootcamp Support</option>
                      <option>Career Support</option>
                    </select>
                    {appointmentErrors.service && (
                      <span
                        id="appointment-service-error"
                        className="appointment-field-error"
                        role="alert"
                      >
                        {appointmentErrors.service}
                      </span>
                    )}
                  </label>

                  <label>
                    Requirement *
                    <textarea
                      minLength={10}
                      maxLength={1000}
                      rows={5}
                      placeholder="Mention your detailed requirement"
                      value={appointmentRequirement}
                      aria-invalid={Boolean(appointmentErrors.requirement)}
                      aria-describedby={
                        appointmentErrors.requirement
                          ? "appointment-requirement-error"
                          : undefined
                      }
                      onBlur={() => validateAppointmentField("requirement")}
                      onChange={(event) => {
                        setAppointmentRequirement(event.target.value);
                        setAppointmentErrors((current) => ({
                          ...current,
                          requirement: "",
                        }));
                      }}
                    />
                    {appointmentErrors.requirement && (
                      <span
                        id="appointment-requirement-error"
                        className="appointment-field-error"
                        role="alert"
                      >
                        {appointmentErrors.requirement}
                      </span>
                    )}
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
                  href="mailto:info@stellargroupware.com?subject=Stellar%20Appointment%20Help"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Stellar appointment support"
                >
                  ✉ info@stellargroupware.com
                </a>
              </div>
            </aside>
          </div>
        </section>

      <section className="contact-section" id="contact">
        <p className="section-label">CONTACT US</p>
        <h2>Ready to start your IT journey?</h2>
        <p>Email us and we will help you choose the right next step.</p>
        <a className="primary-btn" href="mailto:info@stellargroupware.com">
          Contact Now
        </a>
      </section>

      <section className="legal-page" id="privacy" aria-labelledby="privacy-title">
        <div className="legal-page-inner">
          <p className="section-label">LEGAL</p>
          <h1 id="privacy-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: August 11, 2026</p>

          <div className="legal-content">
            <article>
              <h2>1. Introduction</h2>
              <p>Stellar Groupware Inc. ("Stellar", "we", "our", or "us") is committed to protecting your privacy and personal information. This policy explains how we collect, use, disclose, and safeguard information in accordance with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy laws.</p>
            </article>
            <article>
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>Depending on how you use our website and services, we may collect:</p>
              <ul>
                <li>Your name and contact information, including email address, phone number, city, and address when required</li>
                <li>Educational background, employment history, professional goals, and career interests</li>
                <li>Course enrollment, attendance, progress, and completion information</li>
                <li>Payment and billing information processed through our payment providers</li>
                <li>Messages and other communications with our advisors, mentors, and instructors</li>
              </ul>
              <h3>2.2 Technical Information</h3>
              <p>When you visit our website, we or our service providers may collect:</p>
              <ul>
                <li>IP address, browser type, device information, and operating system</li>
                <li>Pages visited, time spent on the website, and referring website addresses</li>
                <li>Essential cookie data and analytics information, where permitted</li>
              </ul>
            </article>
            <article>
              <h2>3. How We Use Your Information</h2>
              <p>We may use personal information to:</p>
              <ul>
                <li>Provide IT training, mentoring, job-support, and career-readiness services</li>
                <li>Process course registrations, appointments, and payments</li>
                <li>Communicate about programs, consultations, schedules, and service updates</li>
                <li>Improve our programs, website functionality, and visitor experience</li>
                <li>Send marketing communications when you have provided consent</li>
                <li>Meet legal, regulatory, security, and record-keeping obligations</li>
              </ul>
            </article>
            <article>
              <h2>4. Your Privacy Rights</h2>
              <p>Subject to applicable law, you may ask to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Withdraw consent for certain uses of your information</li>
                <li>Request deletion of information, subject to legal and record-keeping requirements</li>
                <li>Raise a concern with Stellar or the Office of the Privacy Commissioner of Canada</li>
              </ul>
            </article>
            <article>
              <h2>5. Sharing and Data Security</h2>
              <p>We do not sell personal information. We may share limited information with service providers that help us operate the website, process payments, communicate with you, or deliver requested services. We use reasonable administrative, technical, and organizational safeguards designed to protect information from unauthorized access, use, disclosure, alteration, or loss.</p>
            </article>
            <article>
              <h2>6. Contact Us</h2>
              <p>For questions, concerns, or requests about this policy or our privacy practices, contact:</p>
              <address>
                <strong>Stellar Groupware Inc.</strong><br />
                Canada<br />
                Email: <a href="mailto:info@stellargroupware.com">info@stellargroupware.com</a>
              </address>
            </article>
          </div>
        </div>
      </section>

      <section className="legal-page" id="terms" aria-labelledby="terms-title">
        <div className="legal-page-inner">
          <p className="section-label">LEGAL</p>
          <h1 id="terms-title">Terms of Use</h1>
          <p className="legal-updated">Last updated: August 11, 2026</p>

          <div className="legal-content">
            <article>
              <h2>Using this website</h2>
              <p>By using this website, you agree to use it lawfully and not interfere with its operation, security, content, or other visitors.</p>
            </article>
            <article>
              <h2>Training information</h2>
              <p>Program descriptions, schedules, fees, and availability may change. Enrollment is confirmed only after Stellar Groupware Inc. accepts the registration and any required payment arrangements.</p>
            </article>
            <article>
              <h2>No employment guarantee</h2>
              <p>Training and career-support services are designed to build skills and readiness. They do not guarantee certification, employment, promotion, income, or any particular career result.</p>
            </article>
            <article>
              <h2>Website content</h2>
              <p>Website text, branding, graphics, and original training materials belong to Stellar Groupware Inc. or their respective owners and may not be copied or redistributed without permission.</p>
            </article>
            <article>
              <h2>External links</h2>
              <p>This website may link to third-party services. Stellar Groupware Inc. is not responsible for their content, availability, or privacy practices.</p>
            </article>
            <article>
              <h2>Contact us</h2>
              <p>Questions about these terms can be sent to <a href="mailto:info@stellargroupware.com">info@stellargroupware.com</a>.</p>
            </article>
          </div>
        </div>
      </section>


      <section className="not-found-section" id="not-found" aria-labelledby="not-found-title">
        <p className="section-label">404 ERROR</p>
        <h1 id="not-found-title">Page not found.</h1>
        <p>The page you requested does not exist or may have moved.</p>
        <div className="not-found-actions">
          <a className="primary-btn" href="/">Return Home</a>
          <a className="secondary-btn" href="/training">Explore Training</a>
        </div>
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
            <a href="/about">About</a>
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
                  href="https://www.linkedin.com/search/results/companies/?keywords=Stellar%20Groupware%20Inc"
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
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/contact">Customer Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
