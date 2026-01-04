import { useState, useCallback, useEffect } from 'react';
import { storageService, type ChatSession } from '../services/storageService';
import type { Message } from './useModel';

export function useChat() {
       const [messages, setMessages] = useState<Message[]>([
              { role: 'system', content: 'You are a helpful coding assistant. You answer programming questions accurately.' }
       ]);
       // Fix impure initializer warning by using lazy initialization
       const [sessionId, setSessionId] = useState<string>(() => Date.now().toString());

       // Load persistence
       useEffect(() => {
              storageService.init().then(async () => {
                     // For MVP, just try to load the latest or keep current
                     // Ideally we have a session manager. For now, we auto-save to 'current-session'
                     const saved = await storageService.getConversation('current-session');
                     if (saved && saved.messages.length > 0) {
                            setSessionId(saved.id);
                            // Cast persisted messages locally if needed, assuming structure matches
                            setMessages(saved.messages as Message[]);
                     }
              });
       }, []);

       // Save on change
       useEffect(() => {
              if (messages.length > 1) { // Don't save if just system prompt
                     const session: ChatSession = {
                            id: 'current-session',
                            title: 'Current Session',
                            timestamp: Date.now(),
                            messages
                     };
                     storageService.saveConversation(session).catch(console.error);
              }
       }, [messages]);

       const addMessage = useCallback((message: Message) => {
              setMessages(prev => [...prev, message]);
       }, []);

       const updateLastMessage = useCallback((content: string) => {
              setMessages(prev => {
                     const updated = [...prev];
                     if (updated.length > 0) {
                            updated[updated.length - 1] = {
                                   ...updated[updated.length - 1],
                                   content
                            };
                     }
                     return updated;
              });
       }, []);

       const clearChat = useCallback(() => {
              setMessages([{ role: 'system', content: 'You are a helpful coding assistant.' }]);
              // Optionally clear storage or start new id
       }, []);

       return {
              messages,
              addMessage,
              updateLastMessage,
              clearChat,
              setMessages // Expose for batched updates
       };
}
