import React from 'react';
import { theme } from '../../styles/theme';

interface HeroProps {
       onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
       return (
              <section style={{
                     minHeight: '100vh',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                     textAlign: 'center',
                     padding: '0 20px',
                     background: `radial-gradient(circle at 50% 50%, #1a1f2e 0%, ${theme.colors.background} 100%)`
              }}>
                     <div style={{
                            padding: '8px 16px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: `1px solid ${theme.colors.accent.primary}`,
                            borderRadius: '50px',
                            color: theme.colors.accent.primary,
                            fontSize: '0.9rem',
                            marginBottom: '24px',
                            fontWeight: 500
                     }}>
                            🚀 Now running Phi-3 Mini & Llama 3
                     </div>
                     <h1 style={{
                            fontSize: '4rem',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            maxWidth: '900px',
                            background: `linear-gradient(135deg, #fff 0%, ${theme.colors.text.secondary} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                     }}>
                            Your Private AI Coding Assistant. <br />
                            Running <span style={{ color: theme.colors.accent.primary, WebkitTextFillColor: theme.colors.accent.primary }}>100% Offline.</span>
                     </h1>
                     <p style={{
                            fontSize: '1.25rem',
                            color: theme.colors.text.secondary,
                            maxWidth: '600px',
                            marginBottom: '48px',
                            lineHeight: 1.6
                     }}>
                            Write code faster with an intelligent assistant that lives in your browser. No data leaves your device. No cloud fees. No internet required.
                     </p>
                     <div style={{ display: 'flex', gap: '16px' }}>
                            <button
                                   onClick={onStart}
                                   style={{
                                          padding: '16px 48px',
                                          fontSize: '1.1rem',
                                          background: `linear-gradient(90deg, ${theme.colors.accent.primary}, ${theme.colors.accent.secondary})`,
                                          border: 'none',
                                          borderRadius: '12px',
                                          color: '#fff',
                                          fontWeight: 600,
                                          cursor: 'pointer',
                                          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                                          transition: 'transform 0.2s'
                                   }}
                                   onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                   onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                   Get Started for Free
                            </button>
                            <button
                                   onClick={() => window.open('https://github.com/mlc-ai/web-llm', '_blank')}
                                   style={{
                                          padding: '16px 48px',
                                          fontSize: '1.1rem',
                                          background: 'transparent',
                                          border: `1px solid ${theme.colors.border}`,
                                          borderRadius: '12px',
                                          color: theme.colors.text.primary,
                                          fontWeight: 600,
                                          cursor: 'pointer',
                                          transition: 'background 0.2s'
                                   }}
                                   onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                   onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                   View on GitHub
                            </button>
                     </div>

                     <div style={{ marginTop: '64px', opacity: 0.6 }}>
                            <p style={{ fontSize: '0.9rem', color: theme.colors.text.secondary, marginBottom: '12px' }}>POWERED BY</p>
                            <div style={{ display: 'flex', gap: '32px', alignItems: 'center', filter: 'grayscale(100%)' }}>
                                   <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>WebLLM</span>
                                   <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>WebGPU</span>
                                   <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>HuggingFace</span>
                            </div>
                     </div>
              </section>
       );
};
