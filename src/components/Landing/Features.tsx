import React from 'react';
import { theme } from '../../styles/theme';

export const Features: React.FC = () => {
       const features = [
              {
                     icon: '🔒',
                     title: 'Privacy First',
                     description: 'Your code never leaves your machine. The AI runs locally in your browser using WebGPU technology.'
              },
              {
                     icon: '⚡',
                     title: 'Zero Latency',
                     description: 'No API calls means no network delays. Experience instant feedback after the model loads.'
              },
              {
                     icon: '💾',
                     title: 'Fully Offline',
                     description: 'Code on a plane, in a cabin, or anywhere without WiFi. The app caches everything it needs.'
              }
       ];

       return (
              <section id="features" style={{ padding: '100px 7%', background: theme.colors.surface }}>
                     <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '64px' }}>Why go offline?</h2>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                            {features.map((f, i) => (
                                   <div key={i} style={{
                                          padding: '32px',
                                          background: theme.colors.background,
                                          borderRadius: '24px',
                                          border: `1px solid ${theme.colors.border}`,
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'flex-start',
                                          transition: 'transform 0.2s',
                                          cursor: 'default'
                                   }}
                                          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                   >
                                          <div style={{
                                                 width: '56px', height: '56px',
                                                 background: 'rgba(99, 102, 241, 0.1)',
                                                 borderRadius: '16px',
                                                 display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                 fontSize: '1.8rem',
                                                 marginBottom: '24px',
                                                 color: theme.colors.accent.primary
                                          }}>
                                                 {f.icon}
                                          </div>
                                          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{f.title}</h3>
                                          <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6 }}>{f.description}</p>
                                   </div>
                            ))}
                     </div>
              </section>
       );
};
