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
    <main>
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

          <div className="nav-links">
            <a className="active" href="#home">Home</a>
            <a href="#reviews">Reviews</a>
            <a href="#pricing">Pricing</a>
            <a href="#training">Training</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
            <a href="#contact">My Account</a>
            <a className="book-btn" href="mailto:info@stellartms.com">Book Appointment</a>
          </div>
        </nav>

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
            <a className="secondary-btn" href="#training">
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

      <section className="contact-section" id="contact">
        <p className="section-label">CONTACT US</p>
        <h2>Ready to start your IT journey?</h2>
        <p>Email us and we will help you choose the right next step.</p>
        <a className="primary-btn" href="mailto:info@stellartms.com">
          Contact Now
        </a>
      </section>

      <footer>© 2026 Stellar Groupware Inc. All rights reserved.</footer>
    </main>
  );
}

export default App;
