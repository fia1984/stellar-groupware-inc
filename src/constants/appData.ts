export const routeMap: Record<string, string> = {
  "/": "home",
  "/ca": "home",
  "/uk": "home",
  "/in": "home",
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
  "/unsubscribe": "unsubscribe",
  "/sitemap": "sitemap",
  "/refund-policy": "refund",
  "/privacy": "privacy",
  "/terms": "terms",
};

export const slides = [
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

export const mobileNavigationQuery = "(max-width: 1050px)";

export const regionConfig = {
  "/": {
    name: "Canada",
    market: "Canada's IT Market",
    flag: "🇨🇦",
    timeZone: "America/Toronto",
    timeLabel: "Eastern Time",
    timeAbbrev: "ET",
    defaultCountry: "Canada",
    cityPlaceholder: "Toronto",
  },
  "/ca": {
    name: "Canada",
    market: "Canada's IT Market",
    flag: "🇨🇦",
    timeZone: "America/Toronto",
    timeLabel: "Eastern Time",
    timeAbbrev: "ET",
    defaultCountry: "Canada",
    cityPlaceholder: "Toronto",
  },
  "/uk": {
    name: "UK & EU",
    market: "the UK & EU IT Market",
    flag: "🇬🇧",
    timeZone: "Europe/London",
    timeLabel: "UK Time",
    timeAbbrev: "UK",
    defaultCountry: "United Kingdom",
    cityPlaceholder: "London",
  },
  "/in": {
    name: "India",
    market: "India's IT Market",
    flag: "🇮🇳",
    timeZone: "Asia/Kolkata",
    timeLabel: "India Time",
    timeAbbrev: "IST",
    defaultCountry: "India",
    cityPlaceholder: "Bengaluru",
  },
} as const;

export const appointmentServices = [
  "Regular IT Training",
  "AI + IT Training",
  "Bootcamp Support",
  "Marketing Support",
  "Direct Bootcamp",
  "Career Marketing",
  "Direct Marketing Program",
] as const;

export const weekdayAppointmentTimes = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "3:30 PM",
  "5:00 PM",
] as const;

export const saturdayAppointmentTimes = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "3:30 PM",
] as const;

export type AppointmentDateOption = {
  day: string;
  date: string;
  month: string;
  value: string;
  iso: string;
  weekday: number;
  disabled: boolean;
};

function addDaysToIso(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));
  return shifted.toISOString().slice(0, 10);
}

function weekdayFromIso(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).getUTCDay();
}

function formatIsoDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  return {
    day: date.toLocaleDateString("en-CA", { weekday: "short", timeZone: "UTC" }).toUpperCase(),
    month: date.toLocaleDateString("en-CA", { month: "short", timeZone: "UTC" }).toUpperCase(),
    date: String(day),
    value: `${date.toLocaleDateString("en-CA", { weekday: "short", timeZone: "UTC" }).toUpperCase()}, ${date.toLocaleDateString("en-CA", { month: "short", timeZone: "UTC" }).toUpperCase()} ${day}`,
    iso: isoDate,
    weekday: date.getUTCDay(),
  };
}

export function timeLabelToMinutes(label: string) {
  const [clock, period] = label.split(" ");
  const [hours, minutes] = clock.split(":").map(Number);
  const hour = (hours % 12) + (period === "PM" ? 12 : 0);
  return hour * 60 + minutes;
}

export function getZonedNow(timeZone: string, now = new Date()) {
  const isoDate = now.toLocaleDateString("en-CA", { timeZone });
  const hour = Number(
    now.toLocaleString("en-US", { timeZone, hour: "numeric", hour12: false }),
  );
  const minute = Number(
    now.toLocaleString("en-US", { timeZone, minute: "numeric" }),
  );

  return {
    isoDate,
    minutes: ((hour === 24 ? 0 : hour) * 60) + minute,
  };
}

export function getAppointmentDates(timeZone: string, now = new Date()): AppointmentDateOption[] {
  const todayIso = getZonedNow(timeZone, now).isoDate;

  return Array.from({ length: 7 }, (_, index) => {
    const iso = addDaysToIso(todayIso, index);
    const formatted = formatIsoDate(iso);
    const weekday = weekdayFromIso(iso);
    const availableTimes = getAvailableAppointmentTimes(
      { ...formatted, weekday, disabled: false },
      timeZone,
      now,
    );

    return {
      ...formatted,
      weekday,
      disabled: weekday === 0 || availableTimes.length === 0,
    };
  });
}

export function getAvailableAppointmentTimes(
  date: Pick<AppointmentDateOption, "iso" | "weekday">,
  timeZone: string,
  now = new Date(),
) {
  const slots =
    date.weekday === 6 ? saturdayAppointmentTimes : weekdayAppointmentTimes;
  const zonedNow = getZonedNow(timeZone, now);

  return slots.filter((slot) => {
    if (date.iso > zonedNow.isoDate) {
      return true;
    }

    if (date.iso < zonedNow.isoDate) {
      return false;
    }

    return timeLabelToMinutes(slot) > zonedNow.minutes;
  });
}


export type ReviewItem = {
  title: string;
  quote: string;
  name: string;
  detail: string;
  message: string;
};

export const trainingReviews: ReviewItem[] = [
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

export const careerReviews: ReviewItem[] = [
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

export const homePathways = [
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

export type CareerIconName =
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

export type HomeInfoCard = {
  icon: CareerIconName;
  title: string;
  description: string;
};

export type HomeAudienceCard = HomeInfoCard & {
  benefits: string[];
};

export const homeOffers: HomeInfoCard[] = [
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

export const homeAudiences: HomeAudienceCard[] = [
  { icon: "graduation", title: "Recent Graduates", description: "Start your IT career with a structured foundation and practical guidance.", benefits: ["Build workplace-ready skills", "Develop project confidence", "Learn from experienced mentors"] },
  { icon: "transition", title: "Career Changers", description: "Move into technology with a focused plan that builds on your experience.", benefits: ["Identify transferable skills", "Learn in-demand tools", "Prepare for a confident transition"] },
  { icon: "code", title: "Non-IT to IT Professionals", description: "Break into IT through beginner-friendly training and mentoring.", benefits: ["Build technical skills from scratch", "Practice realistic tasks", "Prepare for entry-level opportunities"] },
  { icon: "growth", title: "IT Professionals", description: "Strengthen your expertise and prepare for your next professional step.", benefits: ["Expand modern technical skills", "Improve professional positioning", "Prepare for senior responsibilities"] },
];

export const seekerChallenges: HomeInfoCard[] = [
  { icon: "target", title: "Targeting the Wrong Role", description: "Choosing roles without matching your strengths or current market demand limits results." },
  { icon: "code", title: "No Focused Upskilling", description: "Outdated skills make it harder to demonstrate readiness for current technology roles." },
  { icon: "calendar", title: "Inconsistent Applications", description: "An irregular job-search routine reduces opportunities and makes progress difficult to track." },
  { icon: "briefcase", title: "Applying Before You Are Ready", description: "Candidates need practical skills and interview preparation before entering the market." },
  { icon: "file", title: "Weak Resume Positioning", description: "Unclear structure and missing role-specific keywords can prevent a resume from being noticed." },
  { icon: "transition", title: "Targeting Too Many Roles", description: "A focused role strategy creates a clearer professional profile for recruiters." },
];

export const stellarTrainingCategories = [
  "All Programs",
  "AI & Automation",
  "Cloud & DevOps",
  "Data & Analytics",
  "Software Development",
  "Security & Support",
];

export const stellarTrainingCourses = [
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

