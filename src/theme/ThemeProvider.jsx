import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import ThemeContext from './ThemeContext';
import { lightTheme, darkTheme } from './colors';

const ThemeProvider = ({ children }) => {
  // const systemTheme = useColorScheme();
  // const [theme, setTheme] = useState(systemTheme || 'light');

  // useEffect(() => {
  //   setTheme(systemTheme);
  // }, [systemTheme]);
  const [theme,setTheme]=useState('dark')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: theme === 'light' ? lightTheme : darkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
