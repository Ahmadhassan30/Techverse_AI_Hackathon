import React from "react";
import './Button.css';

const ViewResultsButton = () => {
  return (
    <a
      href="/results"
      target="_blank"
      rel="noopener noreferrer"
      className="themed-btn register"
    >
      <span className="btn-content">View Results</span>
    </a>
  );
};

export default ViewResultsButton;