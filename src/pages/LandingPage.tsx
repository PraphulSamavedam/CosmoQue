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
    // <div data-component="LandingPage">
    //   <div className="content">
    //     <h1 className="title">Welcome to My Application</h1>
    //     <p className="description">
    //       This is a simple landing page. Click below to explore the console page.
    //     </p>
    //     <button className="btn" onClick={handleRedirect}>Go to Console Page</button>
    //   </div>
    //   <div className="spacer"></div>
    //   <div className="footer">© 2024 My Application. All rights reserved.</div>
    // </div>

    <div className="container">
      {/* <Head>
  <title>Cairo - Market Hypotheses</title>
  <link rel="icon" href="/favicon.ico" />
</Head> */}

      <main>
        <h1 className="title">VAC AI Assistant</h1>
        <div className="content">
          <h2 className="headline">Automated Real Time AI Support Assistant</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Connect To AI</p>
            </div>
            <div className="arrow"></div>

            <div className="step">
              <div className="step-number">2</div>
              <p>Describe Your Concerns</p>
            </div>
            <div className="arrow"></div>

            <div className="step">
              <div className="step-number">3</div>
              <p>Realtime Support - Resolution</p>
            </div>
            <div className="arrow"></div>

            <div className="step">
              <div className="step-number">4</div>
              <p>JIRA Ticket Generation</p>
            </div>
          </div>
          {/* <p className="subtitle">for optimal navigation towards PMF.</p> */}
          <button onClick={handleRedirect} className="cta">Connect to AI</button>
        </div>
      </main>


    </div>

  );
}

export default LandingPage;
