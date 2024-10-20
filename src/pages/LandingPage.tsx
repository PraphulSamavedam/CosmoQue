// src/pages/LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';  // Import the SCSS

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = (): void => {
    navigate('/console');
  };

  return (
    <div data-component="LandingPage">
      <div className="content">
        <h1 className="title">Welcome to My Application</h1>
        <p className="description">
          This is a simple landing page. Click below to explore the console page.
        </p>
        <button className="btn" onClick={handleRedirect}>Go to Console Page</button>
      </div>
      <div className="spacer"></div>
      <div className="footer">© 2024 My Application. All rights reserved.</div>
    </div>
  );
}

export default LandingPage;
