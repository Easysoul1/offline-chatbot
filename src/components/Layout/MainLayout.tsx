import React, { ReactNode } from 'react';

interface MainLayoutProps {
       editor: ReactNode;
       chat: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ editor, chat }) => {
       return (
              <div style={{
                     display: 'flex',
                     height: '100vh',
                     width: '100vw',
                     background: 'var(--color-background)',
                     overflow: 'hidden'
              }}>
                     {/* Editor Pane (Left 60%) */}
                     <div style={{
                            flex: '60%',
                            borderRight: '1px solid var(--color-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: '400px'
                     }}>
                            <div style={{
                                   padding: '8px 16px',
                                   borderBottom: '1px solid var(--color-border)',
                                   background: 'var(--color-surface)',
                                   color: 'var(--color-text-secondary)',
                                   fontSize: '0.875rem',
                                   display: 'flex',
                                   alignItems: 'center',
                                   gap: '8px'
                            }}>
                                   {/* Mock Tabs */}
                                   <div style={{
                                          color: 'var(--color-text-primary)',
                                          borderBottom: '2px solid var(--color-primary)',
                                          paddingBottom: '4px',
                                          cursor: 'pointer'
                                   }}>
                                          main.js
                                   </div>
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                   {editor}
                            </div>
                     </div>

                     {/* Chat Pane (Right 40%) */}
                     <div style={{
                            flex: '40%',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: '300px',
                            backgroundColor: 'var(--color-surface)'
                     }}>
                            {chat}
                     </div>
              </div>
       );
};
