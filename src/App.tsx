import { useModel } from './hooks/useModel';
import { DownloadManager } from './components/Download/DownloadManager';
import { ChatInterface } from './components/Chat/ChatInterface';
import { CodeEditor } from './components/Editor/CodeEditor';
import { MainLayout } from './components/Layout/MainLayout';
import { AppProvider, useAppContext } from './services/contextService';
import type { Message } from './hooks/useModel';

function AppContent() {
  const { modelStats, availableModels, loadModel, generateResponse, currentModel } = useModel();
  const { activeCode, updateCode } = useAppContext();

  // Inject current code into context for the AI
  const handleSendMessage = async (history: Message[], update: (text: string) => void) => {
    // Determine if we should add code context
    // For now, we prepend it to the system prompt or last message invisibly, 
    // or just include it if the user asks about "this code".
    // A simple strategy: Appending a system note about the current code.

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contextEnhancedHistory: any[] = [
      {
        role: 'system',
        content: `Current code in editor:\n\`\`\`\n${activeCode}\n\`\`\`\n`
      },
      ...history
    ];

    await generateResponse(contextEnhancedHistory, update);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {!modelStats.loaded ? (
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--color-background)'
        }}>
          <DownloadManager
            modelStats={modelStats}
            availableModels={availableModels}
            onLoadModel={loadModel}
          />
        </div>
      ) : (
        <MainLayout
          editor={
            <CodeEditor
              initialCode={activeCode}
              onChange={(value) => updateCode(value || '')}
            />
          }
          chat={
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <header style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>AI Assistant</span>
                {currentModel && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {currentModel.name}
                  </span>
                )}
              </header>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <ChatInterface
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
