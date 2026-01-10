import React from 'react';
import { theme } from '../../styles/theme';

export const FAQ: React.FC = () => {
       const items = [
              { q: "Is it really free?", a: "Yes. The computation happens on your own device's GPU, so there are no server costs to pass on to you." },
              { q: "What hardware do I need?", a: "A modern browser (Chrome 113+, Edge, Safari 18+) and a device with a dedicated or integrated GPU (4GB+ RAM recommended)." },
              { q: "Which models are supported?", a: "We support Phi-3 Mini (Microsoft), Llama 3 (Meta), Gemma (Google), and RedPajama." }
       ];

       return (
              <section id="faq" style={{ padding: '100px 7%', background: theme.colors.background }}>
                     <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '64px' }}>Frequently Asked Questions</h2>
                     <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {items.map((item, i) => (
                                   <div key={i} style={{ borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '24px' }}>
                                          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{item.q}</h3>
                                          <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6 }}>{item.a}</p>
                                   </div>
                            ))}
                     </div>
              </section>
       );
};
