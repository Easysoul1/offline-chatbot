import React from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import { theme } from '../../styles/theme';

interface CodeEditorProps {
       initialCode?: string;
       language?: string;
       onChange?: (value: string | undefined) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
       initialCode = "// Start coding here...",
       language = "javascript",
       onChange
}) => {
       const handleEditorDidMount: OnMount = (editor, monaco) => {
              // Define the custom theme based on our app's design
              monaco.editor.defineTheme('offline-dark', {
                     base: 'vs-dark',
                     inherit: true,
                     rules: [],
                     colors: {
                            'editor.background': theme.colors.editor.background,
                            'editor.lineHighlightBackground': '#1F2937',
                            'editorLineNumber.foreground': theme.colors.text.secondary,
                     }
              });

              monaco.editor.setTheme('offline-dark');
       };

       return (
              <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                     <Editor
                            height="100%"
                            defaultLanguage={language}
                            defaultValue={initialCode}
                            theme="vs-dark" // Will be overridden by onMount
                            onMount={handleEditorDidMount}
                            onChange={onChange}
                            options={{
                                   minimap: { enabled: false },
                                   fontSize: 14,
                                   fontFamily: theme.typography.fontFamily.mono,
                                   lineNumbers: 'on',
                                   roundedSelection: false,
                                   scrollBeyondLastLine: false,
                                   readOnly: false,
                                   automaticLayout: true,
                                   padding: { top: 16 }
                            }}
                     />
              </div>
       );
};
