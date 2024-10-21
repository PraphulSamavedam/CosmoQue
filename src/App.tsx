// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { ConsolePage } from './pages/ConsolePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/console" element={<ConsolePage />} />
      </Routes>
    </Router>
  );
}

export default App;
