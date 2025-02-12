import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { NotesProvider } from './context/NotesContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </AppProvider>
  </StrictMode>
);
