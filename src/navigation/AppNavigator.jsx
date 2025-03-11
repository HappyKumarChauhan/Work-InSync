import React,{useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
import { UserContext } from '../context/UserContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {role,user}=useContext(UserContext)

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SelectUser" component={UserSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={UserSignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordSuccessScreen" component={PasswordSuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={role==='Normal'?UserDrawer:OwnerDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="KYC" component={KYCDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
