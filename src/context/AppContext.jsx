import { createContext, useEffect, useState } from 'react';

const AppContext = createContext([]);

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState)
  }

  return (
    <AppContext value={{
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </AppContext>
  )
}

export { AppContext, AppProvider };