import React from "react";
import "./Header.css";

const Header = () => (
  <header className="custom-header">
    <div className="header-left">
      <div className="logo-section">
        <img src="/logo_techverse.png" alt="Logo" style={{ height: '40px' }} />
       <button
  className="view-results-btn"
  onClick={() => window.location.href = '/result.html'}
>
  <span className="btn-text">View Results</span>
  <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</button>

      </div>
    </div>
   
    <div className="header-right">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="reimagine">Techverse</span>
        <span className="desc"> – AI Hackathon.</span>
      </div>
      <span className="university">By University of Management and Technology</span>
    </div>
  </header>
);

export default Header;