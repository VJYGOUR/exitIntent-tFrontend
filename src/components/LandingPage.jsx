import "../css/Landingpage.css"; // Make sure this CSS file is in the same directory
import { useUserStore } from "../store/userStore";

const LandingPage = () => {
  const { setIsOpen, isOpen } = useUserStore();
  return (
    <div className="landing-page-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Dream Portfolio. Just $3.</h1>
          <p>
            Stop designing. Start impressing. Get a stunning portfolio template
            for less than your morning coffee.
          </p>
          <a
            href="https://linkly.link/2D1df"
            className="cta-button inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the Template for just $2
          </a>
          <button
            onClick={setIsOpen}
            disabled={isOpen}
            className="cta-button mx-auto mt-10 block cursor-pointer"
          >
            I'm not buying because...
          </button>
        </div>
      </header>

      <section className="price-comparison-section">
        <div className="price-box">
          <div className="price-tag">
            <span className="price-amount">$2</span>
          </div>
          <div className="value-comparison">
            <p>vs.</p>
            <ul>
              <li>🚫 Countless hours wasted on design</li>
              <li>🚫 Risk of a generic, unappealing portfolio</li>
              <li>🚫 Missed opportunities for new clients or jobs</li>
            </ul>
          </div>
        </div>
        <p className="no-brainer-statement">
          It’s a no-brainer. Your career is worth it.
        </p>
      </section>

      <section className="features-section">
        <h2>What makes our template the best deal ever?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Modern Design</h3>
            <p>
              Sleek, minimalist aesthetic that puts your work front and center.
            </p>
          </div>
          <div className="feature-item">
            <h3>Fully Responsive</h3>
            <p>Looks flawless on any device, from a desktop to a smartphone.</p>
          </div>
          <div className="feature-item">
            <h3>Easy Customization</h3>
            <p>Change colors, fonts, and layouts with minimal effort.</p>
          </div>
          <div className="feature-item">
            <h3>Built for Results</h3>
            <p>Designed to convert visitors into clients and employers.</p>
          </div>
        </div>
      </section>

      <footer className="footer-cta">
        <h2>Ready to invest $2 in your career?</h2>
        <a
          href="https://linkly.link/2D1df"
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          I'm in! Get the Template for $2
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
