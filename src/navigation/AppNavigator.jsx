import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './BottomTabNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import PasswordSuccessScreen from '../screens/PasswordSuccessScreen';
import MenuScreen from '../screens/MenuScreen';
import ProfileScreen from '../screens/ProfileScreen';
import KYCDetailsScreen from '../screens/KYCScreen';
import BookingsScreen from '../screens/Booking/BookingScreen';
import RoomSpaceScreen from '../screens/Booking/RoomSpaceScreen';
import CheckInOutScreen from '../screens/Booking/CheckInOutScreen';
import DetailsScreen from '../screens/Booking/DetailsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import UserSelectionScreen from '../screens/UserSelectionScreen';
import OwnerSignUpScreen from '../screens/OwnerSignUpScreen';
import UserSignUpScreen from '../screens/UserSignUpScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SelectUser" component={UserSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OwnerRegistration" component={OwnerSignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserRegistration" component={UserSignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordSuccessScreen" component={PasswordSuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="KYC" component={KYCDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Bookings" component={BookingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RoomSpace" component={RoomSpaceScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CheckInOut" component={CheckInOutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
