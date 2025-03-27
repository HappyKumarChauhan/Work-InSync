import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/axios';
import messaging from "@react-native-firebase/messaging";

// Create Context
export const UserContext = createContext();

// Provider Component
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [role, setRole] = useState('Normal');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);

  // Function to save FCM token
  const saveFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      if (!token) return;
      setFcmToken(token); // Save token in context

      await AsyncStorage.setItem("fcmToken", token);
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken) {
        await axios.post(
          "/fcm/update-fcm-token",
          { fcmToken: token },
        );
      }
    } catch (error) {
      console.error("Error saving FCM token:", error);
    }
  };

  useEffect(() => {
    saveFCMToken();
  }, [])
  

  // Call FCM token refresh listener
  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
      setFcmToken(newToken);
      await AsyncStorage.setItem("fcmToken", newToken);

      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        await axios.post(
          "/fcm/update-fcm-token",
          { fcmToken: newToken },
        );
      }
    });

    return unsubscribe;
  }, []);

  const removeFCMToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const storedFCMToken = await AsyncStorage.getItem("fcmToken");
  
      if (authToken && storedFCMToken) {
        await axios.post(
          "/fcm/remove-fcm-token",
          { fcmToken: storedFCMToken },
        );
      }
  
      await AsyncStorage.removeItem("fcmToken"); // Remove from storage
      setFcmToken(null); // Remove from context
    } catch (error) {
      console.error("Error removing FCM token:", error);
    }
  };

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
    await saveFCMToken()
    setIsLoggedIn(true)
    await fetchUser();
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await removeFCMToken();
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
        loading,
        saveFCMToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
