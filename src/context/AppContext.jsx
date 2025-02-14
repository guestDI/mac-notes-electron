import { createContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('list');

  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const toggleView = () => {
    setView((prevState) => (prevState === 'list' ? 'grid' : 'list'));
  };

  return (
    <AppContext
      value={{
        darkMode,
        view,
        toggleDarkMode,
        toggleView,
      }}
    >
      {children}
    </AppContext>
  );
};

export { AppContext, AppProvider };
