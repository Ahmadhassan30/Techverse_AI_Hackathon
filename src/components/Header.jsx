import React from "react";
import "./Header.css";

const Header = () => (
  <header className="custom-header">
    <div className="header-left">
      <img src="/logo_techverse.png" alt="Logo" style={{ height: '40px' }} />
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