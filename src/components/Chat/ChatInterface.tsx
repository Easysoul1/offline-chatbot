import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../../hooks/useModel';

interface ChatInterfaceProps {
       onSendMessage: (history: Message[], update: (text: string) => void) => Promise<void>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
       const [messages, setMessages] = useState<Message[]>([
              { role: 'system', content: 'You are a helpful coding assistant. You answer programming questions accurately.' }
       ]);
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

              const userMessage: Message = { role: 'user', content: input };
              const newHistory = [...messages, userMessage];

              setMessages(newHistory);
              setInput('');
              setIsGenerating(true);

              // Add placeholder for assistant
              setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

              try {
                     await onSendMessage(newHistory, (currentText) => {
                            setMessages(prev => {
                                   const updated = [...prev];
                                   updated[updated.length - 1] = { role: 'assistant', content: currentText };
                                   return updated;
                            });
                     });
              } catch (err) {
                     console.error(err);
                     setMessages(prev => [...prev, { role: 'system', content: 'Error generating response.' }]);
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
