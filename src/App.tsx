import { useState } from "react";
import "./index.css";

const slides = [
  {
    tag: "CAREER TRANSITION",
    title: "Switching from Non-IT to IT? Start with Stellar.",
    subtitle: "Move into Canada's IT market with structure, confidence, and real project guidance.",
    text: "Stellar Groupware Inc helps beginners and career changers understand IT support, business systems, training paths, and practical workplace skills.",
  },
  {
    tag: "IT TRAINING",
    title: "Learn IT Skills with Practical Mentoring.",
    subtitle: "Step-by-step support for people who want a clear start in technology.",
    text: "We focus on simple explanations, guided practice, project work, and confidence-building so learners are not lost or confused.",
  },
  {
    tag: "GROUPWARE SOLUTIONS",
    title: "Smart Support for Teams, Tools, and Workflows.",
    subtitle: "Helping small businesses improve communication, systems, and digital processes.",
    text: "From training to workflow guidance, Stellar Groupware Inc supports better collaboration and professional technology habits.",
  },
];

function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const slide = slides[activeSlide];

  return (
    <main>
      <section className="hero-section" id="home">
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

        <button className="slide-arrow left" onClick={previousSlide} aria-label="Previous slide">
          ‹
        </button>

        <div className="hero-content">
          <p className="hero-tag">{slide.tag}</p>
          <h1>{slide.title}</h1>
          <h3>{slide.subtitle}</h3>
          <p className="hero-text">{slide.text}</p>

          <div className="hero-actions">
            <a className="primary-btn" href="mailto:info@stellartms.com">
              Book a Consultation →
            </a>
            <a className="secondary-btn" href="#training">
              Learn More
            </a>
          </div>
        </div>

        <button className="slide-arrow right" onClick={nextSlide} aria-label="Next slide">
          ›
        </button>

        <div className="dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={activeSlide === index ? "dot active-dot" : "dot"}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
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

      <section className="video-section">
        <div>
          <p className="section-label">LEARN WITH STRUCTURE</p>
          <h2>Start with the right IT roadmap.</h2>
          <p>
            Many people want to enter IT but do not know where to begin. Stellar Groupware Inc gives learners
            a simple path, practical support, and professional guidance.
          </p>
        </div>

        <div className="video-card">
          <iframe
            src="https://www.youtube.com/embed/2ePf9rue1Ao"
            title="IT training video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="process-section" id="process">
        <p className="section-label">OUR PROCESS</p>
        <h2>Simple steps. Professional support.</h2>

        <div className="process-list">
          <div>
            <strong>1. Consultation</strong>
            <p>We understand your current background and goals.</p>
          </div>
          <div>
            <strong>2. Training Plan</strong>
            <p>We suggest a practical learning path based on your needs.</p>
          </div>
          <div>
            <strong>3. Guided Practice</strong>
            <p>You work on simple real-world tasks with support.</p>
          </div>
          <div>
            <strong>4. Confidence Building</strong>
            <p>You learn how to explain your work professionally.</p>
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

      <footer>
        © 2026 Stellar Groupware Inc. All rights reserved.
      </footer>
    </main>
  );
}

export default App;
