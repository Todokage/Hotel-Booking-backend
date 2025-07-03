import React from 'react';

const theme = {
  accent: "#4ea8de",
  accent2: "#4361ee",
  bgDark: "#22223b",
  border: "#e0e1dd"
};

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
    )
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"/></svg>
    )
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.11 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 0 1 0 19.54 12.8 12.8 0 0 0 6.92 22c8.29 0 12.84-6.87 12.84-12.84 0-.2 0-.41-.02-.61A9.22 9.22 0 0 0 23 3z"/></svg>
    )
  }
];

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        width: '100%',
        minHeight: 160,
        maxHeight: 320,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        textAlign: 'center',
        padding: '32px 0 18px 0',
        background: `linear-gradient(90deg, ${theme.bgDark} 70%, ${theme.accent2} 100%)`,
        color: '#fff',
        margin: 0,
        position: 'relative',
        fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        maxWidth: 600,
        margin: '0 auto'
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
          © 2025 ToDo Travels
        </div>
        <div style={{ fontSize: 16, marginBottom: 10 }}>
          Follow us on
        </div>
        <div style={{ 
          display: 'flex', 
          gap: 32,
          justifyContent: 'center',
          marginBottom: 10,
          flexWrap: 'wrap'
        }}>
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${link.name}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: theme.border,
                transition: 'all 0.2s ease',
                padding: '8px 12px',
                borderRadius: '8px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = theme.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: `${theme.accent}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                border: `1px solid ${theme.accent}`
              }}>
                {React.cloneElement(link.icon, { style: { color: theme.accent } })}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {link.name}
              </span>
            </a>
          ))}
        </div>
        <div style={{ fontSize: 15, color: theme.border, marginTop: 8 }}>
          Designed by <span style={{ color: theme.accent, fontWeight: 700 }}>Todokage</span> ♥
        </div>
      </div>
    </footer>
  );
};

export default Footer;