import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "./AuthPage";
import { motion, AnimatePresence } from "framer-motion";


import dianiImage from './images/diani.jpg';
import tokyoImage from './images/tokyo.jpg';
import monacoImage from './images/monaco.jpg';
import dubaiImage from './images/dubai.jpg';
import londonImage from './images/london.jpg';
import nyImage from './images/new-york.jpg';
import parisImage from './images/paris.jpg';
import berlinImage from './images/berlin.jpg';

const locations = [
  { 
    id: 'Diani,KENYA', 
    title: 'Diani', 
    theme: 'blue',
    image: dianiImage,
    filter: 'rgba(32, 178, 170, 0.4)',
    accentColor: '#20b2aa'
  },
  { 
    id: 'Tokyo,JAPAN', 
    title: 'Tokyo', 
    theme: 'pink',
    image: tokyoImage,
    filter: 'rgba(231, 84, 128, 0.4)',
    accentColor: '#e75480'
  },
  { 
    id: 'Monaco,', 
    title: 'Monaco', 
    theme: 'red',
    image: monacoImage,
    filter: 'rgba(231, 76, 60, 0.4)',
    accentColor: '#e74c3c'
  },
  { 
    id: 'Dubai,UNITED ARAB EMIRATES', 
    title: 'Dubai', 
    theme: 'gold',
    image: dubaiImage,
    filter: 'rgba(255, 215, 0, 0.4)',
    accentColor: '#ffd700'
  },
  { 
    id: 'London,UNITED KINGDOM', 
    title: 'London', 
    theme: 'brown',
    image: londonImage,
    filter: 'rgba(139, 92, 42, 0.4)',
    accentColor: '#8b5c2a'
  },
  { 
    id: 'New York,USA', 
    title: 'New York', 
    theme: 'indigo',
    image: nyImage,
    filter: 'rgba(75, 0, 130, 0.4)',
    accentColor: '#4b0082'
  },
  { 
    id: 'Paris,FRANCE', 
    title: 'Paris', 
    theme: 'purple',
    image: parisImage,
    filter: 'rgba(142, 68, 173, 0.4)',
    accentColor: '#8e44ad'
  },
  { 
    id: 'Berlin,GERMANY', 
    title: 'Berlin', 
    theme: 'teal',
    image: berlinImage,
    filter: 'rgba(32, 207, 207, 0.4)',
    accentColor: '#20cfcf'
  }
];

const Navbar = ({ setUser }) => {
  const [showAuth, setShowAuthPage] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowAuthPage(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthPage = () => {
    setShowAuthPage(false);
    document.body.style.overflow = "auto";
  };

  const toggleDestinations = () => {
    setShowDestinations(!showDestinations);
  };

  const handleLocationClick = (location) => {
    navigate(`/visit/${location.title.toLowerCase().replace(/\s+/g, '')}`);
    setShowDestinations(false);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Brand Button */}
        <button
          onClick={handleHomeClick}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: "1.8rem",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            backgroundImage: "linear-gradient(90deg,#4ea8de,#4361ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            ":hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          ToDo Travels
        </button>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Destinations Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={toggleDestinations}
              style={{
                background: "transparent",
                border: "2px solid transparent",
                backgroundImage: "linear-gradient(90deg,#4ea8de,#4361ee)",
                backgroundClip: "padding-box",
                padding: "0.5rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                ":hover": {
                  background: "#fff",
                  color: "#000",
                },
              }}
            >
              Destinations
            </button>

            <AnimatePresence>
              {showDestinations && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    width: "250px",
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "1rem",
                    marginTop: "0.5rem",
                    zIndex: 1001,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleLocationClick(location)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#fff",
                          padding: "0.5rem 1rem",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          borderRadius: "4px",
                          ":hover": {
                            background: "rgba(255, 255, 255, 0.1)",
                            color: location.accentColor,
                          },
                        }}
                      >
                        {location.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            style={{
              background: "transparent",
              border: "2px solid transparent",
              backgroundImage: "linear-gradient(90deg,#4ea8de,#4361ee)",
              backgroundClip: "padding-box",
              padding: "0.5rem 1.5rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
              ":hover": {
                background: "#fff",
                color: "#000",
              },
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2000,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "2rem",
                position: "relative",
              }}
            >
              <AuthPage onClose={closeAuthPage} setUser={setUser} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;