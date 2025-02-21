import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Load user and token from storage when the app starts
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
      }
    };
    loadUserData();
  }, []);

  const login = async (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('authToken', token);
  };

  const logout = async () => {
    setUser(null);
    setAuthToken(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
