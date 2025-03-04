import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/axios';

// Create Context
export const UserContext = createContext();

// Provider Component
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null)

  // Function to fetch user data from backend
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/user/profile');
      setUser(response.data.user);
      setProfilePicture(
        `${axios.defaults.baseURL}profile-pictures/${response.data.user.profilePicture}`,
      );
      console.log(profilePicture);
    } catch (error) {
      console.log(error);
    }
  };

  // Load user from AsyncStorage on app start
  useEffect(() => {
    fetchUser();
  }, []);

  // Login function
  const login = async (userData, token) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('authToken', token);
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('authToken');
  };
  return (
    <UserContext.Provider
      value={{user, setUser, login, logout, fetchUser, loading, profilePicture}}
    >
      {children}
    </UserContext.Provider>
  );
};
