import React from "react";
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="minimal-footer">
      <div className="footer-content">
        <div className="footer-logo">
        <img src="/logo_techverse.png" alt="Logo" style={{ height: '30px' }} />
        </div>
        <div className="footer-links">
          <a href="https://umttechverse.com">About</a>
          <a href="https://umttechverse.com/#events">Events</a>
          <a href="https://umttechverse.com/#contact">Contact</a>
        </div>
        <div className="footer-copyright">
          © {currentYear}  Techverse-Generative AI Hackathon
        </div>
      </div>
    </footer>
  );
};

export default Footer;