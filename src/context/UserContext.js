import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/axios';

// Create Context
export const UserContext = createContext();

// Provider Component
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [role, setRole] = useState('Normal');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!token); 
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch user data from backend
  const fetchUser = async () => {
    try {
      const response = await axios.get('/user/profile');
      setUser(response.data.user);
      setRole(response.data.user.role);
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
    await AsyncStorage.setItem('authToken', token);
    setIsLoggedIn(true)
    await fetchUser();
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        fetchUser,
        profilePicture,
        role,
        checkLoginStatus,
        isLoggedIn,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
