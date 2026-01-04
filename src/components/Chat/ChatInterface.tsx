import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../../hooks/useModel';

interface ChatInterfaceProps {
       messages: Message[];
       onSendMessage: (text: string) => Promise<void>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage }) => {
       const [input, setInput] = useState('');
       const [isGenerating, setIsGenerating] = useState(false);
       const messagesEndRef = useRef<HTMLDivElement>(null);

       const scrollToBottom = () => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
       };

       useEffect(scrollToBottom, [messages]);

       const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              if (!input.trim() || isGenerating) return;

              const text = input;
              setInput('');
              setIsGenerating(true);

              try {
                     await onSendMessage(text);
              } catch (err) {
                     console.error(err);
              } finally {
                     setIsGenerating(false);
              }
       };

       return (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                     <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.filter(m => m.role !== 'system').map((msg, idx) => (
                                   <div key={idx} style={{
                                          alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                          maxWidth: '80%',
                                          background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-surface)',
                                          color: msg.role === 'user' ? '#000' : 'var(--color-text-primary)',
                                          padding: '12px 16px',
                                          borderRadius: '12px',
                                          whiteSpace: 'pre-wrap'
                                   }}>
                                          {msg.content}
                                   </div>
                            ))}
                            {isGenerating && (
                                   <div style={{
                                          alignSelf: 'flex-start',
                                          maxWidth: '80%',
                                          background: 'var(--color-surface)',
                                          color: 'var(--color-text-primary)',
                                          padding: '12px 16px',
                                          borderRadius: '12px',
                                          opacity: 0.7
                                   }}>
                                          Typing...
                                   </div>
                            )}
                            <div ref={messagesEndRef} />
                     </div>

                     <form onSubmit={handleSubmit} style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
                            <input
                                   type="text"
                                   value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   placeholder="Ask a coding question..."
                                   disabled={isGenerating}
                                   style={{
                                          width: '100%',
                                          padding: '12px',
                                          background: 'var(--color-editor-bg)',
                                          border: '1px solid var(--color-border)',
                                          borderRadius: '6px',
                                          color: 'var(--color-text-primary)',
                                          outline: 'none'
                                   }}
                            />
                     </form>
              </div>
       );
};
