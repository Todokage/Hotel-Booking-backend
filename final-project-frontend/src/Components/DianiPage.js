import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Diani color theme (beach colors)
const theme = {
  primary: "#0369a1",    // Ocean blue
  secondary: "#0c4a6e",  // Deep blue
  accent: "#f59e0b",     // Sunset orange
  accent2: "#f97316",    // Coral orange
  bg: "#f0f9ff",         // Light sky blue
  card: "#ffffff",
  border: "#e0f2fe",
  shadow: "rgba(0,107,166,0.15)",
  text: "#1e3a8a",
  lightText: "#64748b",
};

const USD_TO_KES = 150;

const hotels = [
  {
    name: "Diani Sea Resort",
    description: "Beachfront luxury with white sands and turquoise waters",
    price: 180 * USD_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Beachfront", "Luxury", "Family"],
  },
  {
    name: "Swahili Beach Hotel",
    description: "Authentic Swahili architecture with modern amenities",
    price: 220 * USD_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Swahili", "Luxury", "Spa"],
  },
  {
    name: "The Sands at Nomad",
    description: "Boutique hotel with private beach access",
    price: 150 * USD_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Boutique", "Romantic", "Private"],
  }
];

const slides = [
  {
    title: "Diani Beach",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    description: "11km of pristine white sand beach on Kenya's south coast"
  },
  {
    title: "Marine Life",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    description: "Home to dolphins, whale sharks, and colorful coral reefs"
  },
  {
    title: "Swahili Culture",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description: "Rich coastal culture with delicious cuisine and hospitality"
  }
];

const DianiPage = () => {
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
    phone: "2547XXXXXXXX",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
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
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate user entering PIN on their phone
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 90% chance of success for demo purposes
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      setPaymentStatus('success');
      return true;
    } else {
      setPaymentStatus('failed');
      setError("Payment failed. Please try again or use another payment method.");
      return false;
    }
  };

  // Mock Email Integration
  const sendConfirmationEmail = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  };

  // Booking Submit Handler
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSuccess(false);
    setError(null);
    
    // Validate phone number format
    if (!bookingForm.phone.match(/^254[17]\d{8}$/)) {
      setError("Please enter a valid Kenyan phone number starting with 254");
      return;
    }

    // Initiate mock payment
    const paymentOk = await simulateSTKPush();
    if (!paymentOk) return;

    // Send confirmation email
    const emailResult = await sendConfirmationEmail();
    if (emailResult.success) {
      setBookingSuccess(true);
      setPaymentStatus(null);
    } else {
      setError("Booking completed but confirmation email failed to send.");
    }
  };

  // Reset form when modal closes
  const closeModal = () => {
    setModalHotel(null);
    setShowBooking(false);
    setBookingSuccess(false);
    setPaymentStatus(null);
    setError(null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: theme.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: "hidden",
    }}>
      {/* Hero Section with Wave Effect */}
      <div ref={navbarRef} style={{
        width: "100%",
        minHeight: "80vh",
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
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
            filter: "brightness(0.8) contrast(120%)",
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
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              textTransform: "uppercase",
              textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
            }}
          >
            DIANI BEACH
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "#fff",
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
              color: "#fff",
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
                background: idx === currentSlide ? theme.accent : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: idx === currentSlide ? "scale(1.3)" : "scale(1)",
                borderRadius: "50%",
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
            background: theme.accent,
            color: "#fff",
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
            borderRadius: "50px",
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
          Beach Resorts
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "0",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
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
                boxShadow: "0 10px 30px rgba(0,107,166,0.1)",
                transition: "all 0.3s ease",
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
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
                          background: theme.accent,
                          color: "#fff",
                          padding: "4px 12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          borderRadius: "50px",
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
                    color: theme.accent,
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
                    }}
                    style={{
                      background: theme.primary,
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "50px",
                    }}
                    whileHover={{ background: theme.accent }}
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
              boxShadow: `0 0 0 2px ${theme.accent}`,
              borderRadius: "12px",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: theme.accent,
                color: "#fff",
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
                borderRadius: "50%",
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
                borderRadius: "8px",
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
                    color: "#fff",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
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
                    color: "#fff",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
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
                        background: i === modalImageIdx ? theme.accent : "rgba(255,255,255,0.5)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        borderRadius: "50%",
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
                    background: theme.accent,
                    borderRadius: "2px",
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
                  borderRadius: "8px",
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
                      color: theme.accent,
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
                        color: "#fff",
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                        borderRadius: "8px",
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
                            borderRadius: "8px",
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
                            borderRadius: "8px",
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
                          Phone (254...)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingForm.phone}
                          onChange={handleBookingChange}
                          required
                          placeholder="254712345678"
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                            borderRadius: "8px",
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
                            borderRadius: "8px",
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
                            borderRadius: "8px",
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
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{
                      background: "#f8f8f8",
                      padding: "20px",
                      marginBottom: "24px",
                      textAlign: "center",
                      borderRadius: "8px",
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
                          background: isProcessing ? "#ccc" : theme.accent,
                          color: "#fff",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: "1rem",
                          borderRadius: "8px",
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
                          borderRadius: "8px",
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
                              border: `2px solid ${theme.accent}`,
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
                          borderRadius: "8px",
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
                      borderRadius: "8px",
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
                          <div style={{ fontWeight: 600 }}>ML{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                        </div>
                        <div>
                          <div style={{ color: theme.lightText }}>Phone</div>
                          <div style={{ fontWeight: 600 }}>{bookingForm.phone}</div>
                        </div>
                        <div>
                          <div style={{ color: theme.lightText }}>Date</div>
                          <div style={{ fontWeight: 600 }}>{new Date().toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      style={{
                        padding: "16px 32px",
                        background: theme.primary,
                        color: "#fff",
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                        borderRadius: "8px",
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
            border-color: ${theme.accent} !important;
            box-shadow: 0 0 0 2px ${theme.accent}33;
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

export default DianiPage;