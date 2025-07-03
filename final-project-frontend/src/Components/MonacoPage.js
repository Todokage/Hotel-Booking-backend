import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Monaco color theme (red and white)
const theme = {
  primary: "#ce1126", // Monaco red
  secondary: "#ffffff", // White
  accent: "#ce1126", 
  accent2: "#f0f0f0", 
  bg: "#f8f8f8",
  card: "#ffffff",
  border: "#e0e0e0",
  shadow: "rgba(0,0,0,0.1)",
  text: "#333",
  lightText: "#888",
};

const EUR_TO_KES = 140;

const hotels = [
  {
    name: "Hôtel de Paris Monte-Carlo",
    description: "Legendary luxury hotel with casino, spa, and Michelin-starred dining",
    price: 1200 * EUR_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f408f6a1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539667547529-84d5085f3b3b?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Palace", "Luxury", "Casino"],
  },
  {
    name: "Monte-Carlo Bay Hotel & Resort",
    description: "Exclusive Mediterranean resort with private beach and lagoon",
    price: 800 * EUR_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Resort", "Beach", "Luxury"],
  },
];

const slides = [
  {
    title: "Monte Carlo Casino",
    image: "https://images.unsplash.com/photo-1520250497591-112f408f6a1f?auto=format&fit=crop&w=1200&q=80",
    description: "Iconic Belle Époque casino and opera house",
  },
  {
    title: "Port Hercules",
    image: "https://images.unsplash.com/photo-1539667547529-84d5085f3b3b?auto=format&fit=crop&w=1200&q=80",
    description: "Luxury yacht harbor in the heart of Monaco",
  },
];

const MonacoPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalHotel, setModalHotel] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    phone: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [mpesaCode, setMpesaCode] = useState("");
  const [paymentTimestamp, setPaymentTimestamp] = useState("");
  const navbarRef = useRef(null);
  const [showHomeBtn, setShowHomeBtn] = useState(false);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
      setShowHomeBtn(navbarBottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image carousel effects
  useEffect(() => {
    let imgInterval;
    if (modalHotel) {
      imgInterval = setInterval(() => {
        setModalImageIdx((prev) => (prev + 1) % modalHotel.images.length);
      }, 3500);
    }
    return () => clearInterval(imgInterval);
  }, [modalHotel, modalHotel?.images.length]);

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setModalImageIdx((prev) => (prev - 1 + modalHotel.images.length) % modalHotel.images.length);
  };

  const handleNextImage = () => {
    setModalImageIdx((prev) => (prev + 1) % modalHotel.images.length);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = modalHotel ? modalHotel.price * (parseInt(bookingForm.guests, 10) || 1) : 0;

  // Mock MPESA STK Push Simulation
  const simulateSTKPush = async () => {
    setIsProcessing(true);
    setPaymentStatus('pending');
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setPaymentStatus('pending');
    await new Promise(resolve => setTimeout(resolve, 3000));

    setPaymentStatus('success');
    setIsProcessing(false);
    setMpesaCode("ML" + Math.random().toString(36).substring(2, 10).toUpperCase());
    setPaymentTimestamp(new Date().toLocaleString());
    return true;
  };

  const sendConfirmationEmail = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSuccess(false);
    setError(null);

    const paymentOk = await simulateSTKPush();
    if (!paymentOk) return;

    const emailResult = await sendConfirmationEmail();
    if (emailResult.success) {
      setBookingSuccess(true);
      setPaymentStatus(null);
    } else {
      setError("Booking completed but confirmation email failed to send.");
    }
  };

  const closeModal = () => {
    setModalHotel(null);
    setShowBooking(false);
    setBookingSuccess(false);
    setPaymentStatus(null);
    setError(null);
    setMpesaCode("");
    setPaymentTimestamp("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: theme.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: "hidden",
    }}>
      {/* Hero Section */}
      <div ref={navbarRef} style={{
        width: "100%",
        minHeight: "80vh",
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent2} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
        marginBottom: "-10vh",
      }}>
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
            filter: "grayscale(30%) contrast(120%)",
          }}
        />

        <div style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 20px",
          maxWidth: "1200px",
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              color: theme.secondary,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              textTransform: "uppercase",
              textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
            }}
          >
            MONACO
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: theme.secondary,
              letterSpacing: "0.1em",
            }}
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: "1.2rem",
              color: theme.secondary,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {slides[currentSlide].description}
          </motion.p>
        </div>

        {/* Slide Indicators */}
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
          zIndex: 10,
        }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: "12px",
                height: "12px",
                background: idx === currentSlide ? theme.secondary : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: idx === currentSlide ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Home Button */}
      {showHomeBtn && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          style={{
            position: "fixed",
            top: "24px",
            left: "24px",
            background: theme.primary,
            color: theme.secondary,
            border: "none",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 100,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span style={{ fontSize: "1.2rem" }}>←</span> HOME
        </motion.button>
      )}

      {/* Hotel Cards Section */}
      <section style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "80px auto 120px",
        padding: "0 20px",
        position: "relative",
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            color: theme.primary,
            textAlign: "center",
            marginBottom: "60px",
            fontSize: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Palace Hotels
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "0",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent2})`,
            }}
          ></span>
        </motion.h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "40px",
          padding: "0 20px",
        }}>
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              style={{
                background: theme.card,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{
                height: "220px",
                position: "relative",
                overflow: "hidden",
              }}>
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  padding: "12px 20px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                }}>
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}>
                    {hotel.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: theme.primary,
                          color: theme.secondary,
                          padding: "4px 12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                padding: "24px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: theme.primary,
                }}>
                  {hotel.name}
                </h3>

                <p style={{
                  color: theme.text,
                  marginBottom: "20px",
                  lineHeight: 1.5,
                  flex: 1,
                }}>
                  {hotel.description}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}>
                  <div style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: theme.primary,
                  }}>
                    KSH {hotel.price.toLocaleString()}
                    <span style={{
                      fontSize: "1rem",
                      color: theme.lightText,
                      fontWeight: 400,
                    }}>
                      /night
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setModalHotel(hotel);
                      setModalImageIdx(0);
                      setShowBooking(false);
                      setBookingSuccess(false);
                      setMpesaCode("");
                      setPaymentTimestamp("");
                    }}
                    style={{
                      background: theme.primary,
                      color: theme.secondary,
                      border: "none",
                      padding: "12px 24px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>BOOK NOW</span>
                    <span style={{ fontSize: "1.2rem" }}>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {modalHotel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            style={{
              background: theme.card,
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              boxShadow: `0 0 0 2px ${theme.primary}`,
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: theme.primary,
                color: theme.secondary,
                border: "none",
                width: "40px",
                height: "40px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              padding: "40px",
            }}>
              {/* Image Gallery */}
              <div style={{
                position: "relative",
                height: "400px",
                overflow: "hidden",
              }}>
                <img
                  src={modalHotel.images[modalImageIdx]}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <button
                  onClick={handlePrevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: theme.secondary,
                    border: "none",
                    width: "40px",
                    height: "40px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ←
                </button>

                <button
                  onClick={handleNextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: theme.secondary,
                    border: "none",
                    width: "40px",
                    height: "40px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  →
                </button>

                <div style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "10px",
                }}>
                  {modalHotel.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModalImageIdx(i)}
                      style={{
                        width: "10px",
                        height: "10px",
                        background: i === modalImageIdx ? theme.primary : "rgba(255,255,255,0.5)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  marginBottom: "16px",
                  color: theme.primary,
                  position: "relative",
                  display: "inline-block",
                }}>
                  {modalHotel.name}
                  <span style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "60px",
                    height: "4px",
                    background: theme.primary,
                  }}></span>
                </h2>

                <p style={{
                  color: theme.text,
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}>
                  {modalHotel.description}
                </p>

                <div style={{
                  background: "#f8f8f8",
                  padding: "20px",
                  marginBottom: "24px",
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}>
                    <span style={{ fontWeight: 600 }}>Price per night:</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: theme.primary,
                    }}>
                      KSH {modalHotel.price.toLocaleString()}
                    </span>
                  </div>

                  {!showBooking && !bookingSuccess && (
                    <button
                      onClick={() => setShowBooking(true)}
                      style={{
                        width: "100%",
                        padding: "16px",
                        background: theme.primary,
                        color: theme.secondary,
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                      }}
                    >
                      RESERVE NOW
                    </button>
                  )}
                </div>

                {/* Booking Form */}
                {showBooking && !bookingSuccess && (
                  <form onSubmit={handleBookingSubmit}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "24px",
                    }}>
                      <div>
                        <label style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={bookingForm.name}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={bookingForm.email}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingForm.phone}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}>
                          Check-in
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={bookingForm.checkIn}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}>
                          Check-out
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={bookingForm.checkOut}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}>
                          Guests
                        </label>
                        <input
                          type="number"
                          name="guests"
                          min="1"
                          max="10"
                          value={bookingForm.guests}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{
                      background: "#f8f8f8",
                      padding: "20px",
                      marginBottom: "24px",
                      textAlign: "center",
                    }}>
                      <div style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}>
                        TOTAL: KSH {totalPrice.toLocaleString()}
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        style={{
                          width: "100%",
                          padding: "16px",
                          background: isProcessing ? "#ccc" : theme.primary,
                          color: theme.secondary,
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: "1rem",
                        }}
                      >
                        {paymentStatus === 'pending' ? (
                          "PROCESSING PAYMENT..."
                        ) : (
                          "PAY WITH MPESA"
                        )}
                      </button>

                      {paymentStatus === 'pending' && (
                        <div style={{
                          marginTop: "16px",
                          padding: "12px",
                          background: "#fff3cd",
                          color: "#856404",
                          borderRadius: "4px",
                        }}>
                          <p style={{ marginBottom: "8px", fontWeight: 600 }}>
                            Enter your MPESA PIN on your phone
                          </p>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}>
                            <div style={{
                              width: "16px",
                              height: "16px",
                              border: "2px solid #856404",
                              borderTopColor: "transparent",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                            }}></div>
                            <span>Waiting for payment confirmation...</span>
                          </div>
                        </div>
                      )}

                      {paymentStatus === 'failed' && (
                        <div style={{
                          marginTop: "16px",
                          padding: "12px",
                          background: "#f8d7da",
                          color: "#721c24",
                          borderRadius: "4px",
                        }}>
                          <p style={{ fontWeight: 600 }}>Payment failed</p>
                          <p style={{ marginTop: "4px" }}>{error}</p>
                        </div>
                      )}

                      {error && !paymentStatus && (
                        <div style={{
                          marginTop: "16px",
                          color: "#d32f2f",
                          fontWeight: 600,
                        }}>
                          {error}
                        </div>
                      )}
                    </div>
                  </form>
                )}

                {/* Success Message */}
                {bookingSuccess && (
                  <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                  }}>
                    <div style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                      color: "#4CAF50",
                    }}>
                      ✓
                    </div>
                    <h3 style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      marginBottom: "16px",
                      color: theme.primary,
                    }}>
                      Booking Confirmed!
                    </h3>
                    <p style={{
                      marginBottom: "24px",
                      lineHeight: 1.6,
                    }}>
                      Your reservation at {modalHotel.name} has been confirmed.
                      A receipt has been sent to {bookingForm.email}
                    </p>
                    <div style={{
                      background: "#f8f8f8",
                      padding: "20px",
                      marginBottom: "20px",
                      textAlign: "left",
                    }}>
                      <h4 style={{
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}>
                        Payment Details
                      </h4>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}>
                        <div>
                          <div style={{ color: theme.lightText }}>Amount</div>
                          <div style={{ fontWeight: 600 }}>KES {totalPrice.toLocaleString()}</div>
                        </div>
                        <div>
                          <div style={{ color: theme.lightText }}>MPESA Code</div>
                          <div style={{ fontWeight: 600 }}>{mpesaCode}</div>
                        </div>
                        <div>
                          <div style={{ color: theme.lightText }}>Phone</div>
                          <div style={{ fontWeight: 600 }}>{bookingForm.phone}</div>
                        </div>
                        <div>
                          <div style={{ color: theme.lightText }}>Date</div>
                          <div style={{ fontWeight: 600 }}>{paymentTimestamp}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      style={{
                        padding: "16px 32px",
                        background: theme.primary,
                        color: theme.secondary,
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                      }}
                    >
                      CLOSE
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Global Styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            overflow-x: hidden;
          }
          button {
            transition: all 0.3s ease;
          }
          button:hover {
            opacity: 0.9;
          }
          input, textarea {
            transition: all 0.3s ease;
          }
          input:focus, textarea:focus {
            outline: none;
            border-color: ${theme.primary} !important;
            box-shadow: 0 0 0 2px ${theme.primary}33;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MonacoPage;