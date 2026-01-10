import React from 'react';
import { theme } from '../../styles/theme';

export const Footer: React.FC = () => {
       return (
              <footer style={{
                     padding: '48px 7%',
                     background: theme.colors.surface,
                     borderTop: `1px solid ${theme.colors.border}`,
                     textAlign: 'center',
                     color: theme.colors.text.secondary
              }}>
                     <p style={{ marginBottom: '16px' }}>© 2024 OfflineAI. Built with ❤️ for privacy-conscious developers.</p>
                     <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '0.9rem' }}>
                            <a href="#" style={{ color: theme.colors.text.secondary }}>Terms</a>
                            <a href="#" style={{ color: theme.colors.text.secondary }}>Privacy</a>
                            <a href="#" style={{ color: theme.colors.text.secondary }}>GitHub</a>
                     </div>
              </footer>
       );
};
