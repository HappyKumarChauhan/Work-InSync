import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import PasswordSuccessScreen from '../screens/PasswordSuccessScreen';
import ProfileScreen from '../screens/ProfileScreen';
import KYCDetailsScreen from '../screens/KYCScreen';
import NotificationScreen from '../screens/NotificationScreen';
import UserSelectionScreen from '../screens/UserSelectionScreen';
import UserSignUpScreen from '../screens/UserSignUpScreen';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import UserDrawer from '../user/navigation/UserDrawer';
import OwnerDrawer from '../owner/navigation/OwnerDrawer';
import {UserContext} from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAQsScreen from '../screens/FAQsScreen';
import TermsOfUsageScreen from '../screens/TermsOfUsageScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {role,loading,checkLoginStatus,isLoggedIn} = useContext(UserContext);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // ✅ If logged in, navigate to the dashboard based on role
          <Stack.Screen
            name="Dashboard"
            component={role === 'Normal' ? UserDrawer : OwnerDrawer}
          />
        ) : (
          // ✅ If not logged in, show authentication screens
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SelectUser" component={UserSelectionScreen} />
            <Stack.Screen name="SignUp" component={UserSignUpScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="PasswordSuccessScreen"
              component={PasswordSuccessScreen}
            />
          </>
        )}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KYC"
          component={KYCDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FAQs"
          component={FAQsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Terms"
          component={TermsOfUsageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
