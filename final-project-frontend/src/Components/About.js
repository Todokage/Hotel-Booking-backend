import React from 'react';
import styled, { keyframes } from 'styled-components';

const services = [
  {
    id: 1,
    title: "Flight Bookings",
    description: "Book flights worldwide with the best airlines.",
    icon: "✈️",
    color: "#4ea8de"
  },
  {
    id: 2,
    title: "Hotel Reservations",
    description: "Find top-rated hotels for every budget.",
    icon: "🏨",
    color: "#4361ee"
  },
  {
    id: 3,
    title: "Guided Tours",
    description: "Explore cities with expert guides.",
    icon: "🗺️",
    color: "#20b2aa"
  },
  {
    id: 4,
    title: "Visa Assistance",
    description: "Get help with travel documentation.",
    icon: "🛂",
    color: "#e75480"
  }
];

//seamless looping
const doubledServices = [...services, ...services];

// Keyframes for marquee animation
const marquee = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Styled components
const MarqueeContainer = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
  margin-left: calc(-50vw + 50%);
`;

const MarqueeContent = styled.div`
  display: inline-flex;
  animation: ${marquee} 15s linear infinite;
  will-change: transform;
`;

const ServiceCard = styled.article`
  flex: 0 0 auto;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  width: 250px;
  margin-right: 1.5rem;
  white-space: normal;
  height: 100%;
`;

const About = () => {
  return (
    <section 
      aria-labelledby="services-heading"
      style={{
        margin: '4rem 0 0',
        padding: '2.5rem 1.25rem',
        width: '100%',
        background: '#f8fafc',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <h2 
        id="services-heading"
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#1e293b',
          marginBottom: '0.5rem',
          padding: '0 1rem'
        }}
      >
        Our Services
      </h2>
      <p style={{
        color: '#64748b',
        fontSize: '1rem',
        marginBottom: '2.25rem',
        maxWidth: '43.75rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 1.6,
        padding: '0 1rem'
      }}>
        Discover our wide range of travel services
      </p>
      
      <MarqueeContainer>
        <MarqueeContent>
          {doubledServices.map((service, index) => (
            <ServiceCard key={`${service.id}-${index}`}>
              <div style={{
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                fontSize: '2.5rem'
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                color: '#1e293b',
                marginBottom: '0.5rem',
                fontWeight: 600
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#64748b',
                lineHeight: 1.5
              }}>
                {service.description}
              </p>
            </ServiceCard>
          ))}
        </MarqueeContent>
      </MarqueeContainer>
    </section>
  );
};

export default About;