import './styles/global.css';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h1 style={{ color: 'var(--color-primary)' }}>Offline Code Assistant</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Project Initialized Successfully</p>
    </div>
  );
}

export default App;
