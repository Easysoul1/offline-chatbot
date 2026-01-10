import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { FAQ } from './FAQ';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { theme } from '../../styles/theme';

interface LandingPageProps {
       onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
       return (
              <div style={{
                     background: theme.colors.background,
                     color: theme.colors.text.primary,
                     fontFamily: theme.fonts.body,
                     overflowX: 'hidden',
                     animation: 'fadeIn 0.8s ease-in-out'
              }}>
                     <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
                     <Navbar onStart={onStart} />
                     <Hero onStart={onStart} />
                     <Features />
                     <FAQ />
                     <Footer />
              </div>
       );
};
