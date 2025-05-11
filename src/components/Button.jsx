import React from "react";
import './Button.css';

const ThemedButtons = () => {
  return (
    <div className="themed-buttons-container">
      <a
        href="/RuleBook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="themed-btn"
      >
        View Rulebook
      </a>

      <a
        href="https://registeration.umttechverse.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="themed-btn register"
      >
        Register Now
      </a>
    </div>
  );
};

export default ThemedButtons;
