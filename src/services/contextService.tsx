import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface AppContextType {
       activeCode: string;
       updateCode: (code: string) => void;
       selectedText: string;
       updateSelection: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
       const [activeCode, setActiveCode] = useState<string>('// Start coding here...');
       const [selectedText, setSelectedText] = useState<string>('');

       const updateCode = useCallback((code: string) => {
              setActiveCode(code);
       }, []);

       const updateSelection = useCallback((text: string) => {
              setSelectedText(text);
       }, []);

       return (
              <AppContext.Provider value={{ activeCode, updateCode, selectedText, updateSelection }}>
                     {children}
              </AppContext.Provider>
       );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
       const context = useContext(AppContext);
       if (context === undefined) {
              throw new Error('useAppContext must be used within an AppProvider');
       }
       return context;
}
