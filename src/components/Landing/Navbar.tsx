import React from 'react';
import { theme } from '../../styles/theme';

interface NavbarProps {
       onStart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
       return (
              <nav style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     padding: '24px 7%',
                     position: 'absolute',
                     width: '100%',
                     top: 0,
                     left: 0,
                     zIndex: 10
              }}>
                     <div style={{ fontWeight: 700, fontSize: '1.5rem', color: theme.colors.text.primary, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', background: `linear-gradient(135deg, ${theme.colors.accent.primary}, ${theme.colors.accent.secondary})`, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                   <span style={{ fontSize: '1.2rem' }}>⚡</span>
                            </div>
                            OfflineAI
                     </div>
                     <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                            <a href="#features" style={{ color: theme.colors.text.secondary, textDecoration: 'none', fontWeight: 500 }}>Features</a>
                            <a href="#how-it-works" style={{ color: theme.colors.text.secondary, textDecoration: 'none', fontWeight: 500 }}>How it Works</a>
                            <a href="#faq" style={{ color: theme.colors.text.secondary, textDecoration: 'none', fontWeight: 500 }}>FAQ</a>
                            <button
                                   onClick={onStart}
                                   style={{
                                          padding: '10px 24px',
                                          background: `linear-gradient(90deg, ${theme.colors.accent.primary}, ${theme.colors.accent.secondary})`,
                                          border: 'none',
                                          borderRadius: '50px',
                                          color: '#fff',
                                          fontWeight: 600,
                                          cursor: 'pointer',
                                          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                          transition: 'transform 0.2s'
                                   }}
                                   onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                   onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                   Start Coding
                            </button>
                     </div>
              </nav>
       );
};
