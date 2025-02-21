import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import ThemeProvider from './src/theme/ThemeProvider';
import { UserProvider } from './src/context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </UserProvider>
  )
};
export default App;