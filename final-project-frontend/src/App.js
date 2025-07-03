import React, { useState } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";
import AuthPage from "./Components/AuthPage";
import About from "./Components/About";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DianiPage from "./Components/DianiPage";
import TokyoPage from "./Components/TokyoPage";
import MonacoPage from "./Components/MonacoPage";
import DubaiPage from "./Components/DubaiPage";
import LondonPage from "./Components/LondonPage";
import NewYorkPage from "./Components/NewYorkPage";
import ParisPage from "./Components/ParisPage";
import BerlinPage from "./Components/BerlinPage";


function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="App">
      <Router>
        <Navbar
          onLoginClick={() => setShowAuthModal(true)}
          onAboutClick={() => setShowAboutModal(true)}
        />
        {showAuthModal && (
          <div className="modal">
            <div className="modal-content">
              <AuthPage onClose={() => setShowAuthModal(false)} />
            </div>
          </div>
        )}
        {showAboutModal && (
          <div className="modal">
            <div className="modal-content">
              <About onClose={() => setShowAboutModal(false)} />
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/visit/diani" element={<DianiPage />} />
          <Route path="/visit/tokyo" element={<TokyoPage />} />
          <Route path="/visit/monaco" element={<MonacoPage />} />
          <Route path="/visit/dubai" element={<DubaiPage />} />
          <Route path="/visit/london" element={<LondonPage />} />
          <Route path="/visit/newyork" element={<NewYorkPage />} />
          <Route path="/visit/paris" element={<ParisPage />} />
          <Route path="/visit/berlin" element={<BerlinPage />} />
        </Routes>
        <About />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
