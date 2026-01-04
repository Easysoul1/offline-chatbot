import React from 'react';
import type { ModelStats } from '../../hooks/useModel';
import type { ModelConfig } from '../../services/modelService';

interface DownloadManagerProps {
       modelStats: ModelStats;
       availableModels: ModelConfig[];
       onLoadModel: (modelId: string) => void;
}

export const DownloadManager: React.FC<DownloadManagerProps> = ({
       modelStats,
       availableModels,
       onLoadModel
}) => {
       if (modelStats.loading) {
              const progress = modelStats.progress ? Math.round(modelStats.progress.progress * 100) : 0;
              const text = modelStats.progress?.text || "Initializing...";

              return (
                     <div style={{
                            padding: '2rem',
                            textAlign: 'center',
                            background: 'var(--color-surface)',
                            borderRadius: '8px',
                            border: '1px solid var(--color-border)',
                            maxWidth: '500px',
                            width: '100%'
                     }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Downloading AI Model</h3>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                   This happens once. Please keep this tab open.
                            </p>

                            <div style={{
                                   background: 'rgba(255,255,255,0.1)',
                                   height: '8px',
                                   borderRadius: '4px',
                                   overflow: 'hidden',
                                   marginBottom: '1rem'
                            }}>
                                   <div style={{
                                          width: `${progress}%`,
                                          height: '100%',
                                          background: 'var(--color-primary)',
                                          transition: 'width 0.3s ease'
                                   }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                   <span style={{ color: 'var(--color-text-secondary)' }}>{text}</span>
                                   <span style={{ color: 'var(--color-primary)' }}>{progress}%</span>
                            </div>
                     </div>
              );
       }

       if (modelStats.error) {
              return (
                     <div style={{
                            padding: '1.5rem',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-secondary)',
                            borderRadius: '8px',
                            color: 'var(--color-secondary)'
                     }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Error Loading Model</h3>
                            <p>{modelStats.error}</p>
                            <button
                                   onClick={() => window.location.reload()}
                                   style={{
                                          marginTop: '1rem',
                                          padding: '8px 16px',
                                          background: 'var(--color-secondary)',
                                          color: '#fff',
                                          border: 'none',
                                          borderRadius: '4px',
                                          cursor: 'pointer'
                                   }}
                            >
                                   Reload Page
                            </button>
                     </div>
              );
       }

       return (
              <div style={{
                     display: 'grid',
                     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                     gap: '1.5rem',
                     width: '100%',
                     maxWidth: '1000px'
              }}>
                     {availableModels.map(model => (
                            <div key={model.id} style={{
                                   background: 'var(--color-surface)',
                                   padding: '1.5rem',
                                   borderRadius: '8px',
                                   border: '1px solid var(--color-border)',
                                   display: 'flex',
                                   flexDirection: 'column',
                                   justifyContent: 'space-between'
                            }}>
                                   <div>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                 <h3 style={{ color: 'var(--color-text-primary)' }}>{model.name}</h3>
                                                 <span style={{
                                                        fontSize: '0.75rem',
                                                        padding: '4px 8px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        borderRadius: '12px'
                                                 }}>
                                                        {model.size}
                                                 </span>
                                          </div>
                                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                                 {model.description}
                                          </p>
                                   </div>
                                   <button
                                          onClick={() => onLoadModel(model.id)}
                                          style={{
                                                 padding: '12px',
                                                 background: 'var(--color-primary)',
                                                 color: '#000',
                                                 border: 'none',
                                                 borderRadius: '6px',
                                                 fontWeight: 600,
                                                 cursor: 'pointer',
                                                 transition: 'transform 0.1s'
                                          }}
                                   >
                                          Download & Load
                                   </button>
                            </div>
                     ))}
              </div>
       );
};
