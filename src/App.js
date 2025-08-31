import './App.css';
import React, { useRef } from 'react';

function App() {
  const bubbleContainerRef = useRef(null);
  const tableDownloadRef = useRef(null);

  const releaseBubbles = (btnRef) => {
    const container = bubbleContainerRef.current;
    const btn = btnRef.current;
    if (!container || !btn) return;
    const btnRect = btn.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.width = bubble.style.height = (Math.random() * 30 + 20) + 'px';
      bubble.style.position = 'fixed';
      // Position bubbles randomly around the button
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 40 + 10;
      const x = btnRect.left + btnRect.width / 2 + Math.cos(angle) * radius;
      const y = btnRect.top + btnRect.height / 2 + Math.sin(angle) * radius;
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      container.appendChild(bubble);
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    }
  };

  // Track download in Google Analytics
  const trackDownload = (platform) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'download', {
        'event_category': 'File Download',
        'event_label': platform,
        'value': 1
      });
    }
  };

  // Smooth scroll handler for navbar links to allow custom offset
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const offset = 60; // navbar height
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="landing-container">
      <div ref={bubbleContainerRef} className="bubble-container" />
      <nav className="navbar">
        <div className="logo">
          <a href="#" className="navbar-bubble-link logo">Bubbles</a>
        </div>
        <div className="nav-links-container">
          <ul className="nav-links">
            <li><a href="/about.html">About</a></li>
            <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
          </ul>
        </div>
      </nav>
      <section className="hero">
        <h3>Avoid redundant clicking, accidental file drops, and other file-sharing troubles. Use Bubbles.</h3>
        <div className="download-table-wrapper">
          <table className="download-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Windows</td>
                <td>
                  <div className="download-cell">
                    <a href="#" className="download-link" ref={tableDownloadRef} onClick={(e) => { 
                      e.preventDefault(); 
                      trackDownload('Windows'); 
                      releaseBubbles(tableDownloadRef); 
                    }}>Download .exe</a>
                    <span className="free-badge">It's free!</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>macOS</td>
                <td style={{ color: '#888', fontStyle: 'italic' }}>Build in progress, see contact information if interested in contributing to the project</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="features" id="features">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Fast, Secure, Visible</h3>
            <p>A bubble stores any file, regardless of size or type.
            </p>
            <p>
              The files always stay on your computer.
            </p>
            <p>
              The bubbles are always visible to you, they 'float' on top of other apps.
            </p>
            <p>
              Hover on a bubble to see it's contents.
            </p>
          </div>
          <div className="feature-item">
            <h3>Easy to Use</h3>
            <h4 className="feature-subheading">3 buttons</h4>
            <p>Add</p>
            <p>Clear</p>
            <p>Pop</p>
          </div>
          <div className="feature-item-howto" style={{alignItems: "start"}}>
            <h3>How to Use</h3>
            <p>Step 1. Start Bubbles, add a bubble</p>
            <p>Step 2. Select files from folder of choice</p>
            <p>Step 3. Drag them into a bubble</p>
            <p>Step 4. Go to the application/website where you want to share those files</p>
            <p>Step 5. Drag FROM the bubble, drop on the application/website</p>
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <h2>Contact</h2>
        <p>Questions, Complaints, Feedback, Saying Hi? Fill out the form below and I'll get back to you!</p>
        <form className="contact-form" action="https://formsubmit.co/nasaarbaaz3@gmail.com" method="POST">
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
          <input type="hidden" name="_next" value={`${window.location.origin}${window.location.pathname}#contact`} />
          <input type="hidden" name="_subject" value="New contact from Bubbles website" />
          <input type="hidden" name="_captcha" value="false" />
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
      <footer className="footer">
        <p>&copy; 2025 Bubbles. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
