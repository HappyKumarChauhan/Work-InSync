import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../screens/DashboardScreen';
import BookingsScreen from '../screens/Booking/BookingScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';
import QRCodeScreen from '../../screens/QrCodeScreen';
import ThemeContext from '../../theme/ThemeContext';
import { useContext } from 'react';
import MapScreen from '../screens/MapScreen';
import GenerateQr from '../screens/GenerateQrScreen';
const Tab = createBottomTabNavigator();
function UserTabs() {
  const { colors} = useContext(ThemeContext)
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      // Tab Bar Style
      tabBarStyle: { backgroundColor: colors.background, height:60 },
  
      // Active Tab Customization
      tabBarActiveTintColor: colors.color, 
  
      // Inactive Tab Customization
      tabBarInactiveTintColor: 'gray',
  
      // Label Style
      tabBarShowLabel:false,
    
      tabBarItemStyle: { paddingVertical:5 },
    }}
  >
    <Tab.Screen
      name="Home"
      // component={Dashboard}
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Book"
      component={WishlistScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="book" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="QrCodeScanner"
      component={GenerateQr} // Custom component for the screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="qr-code" size={30} color="white" />
        ),
        tabBarIconStyle: { backgroundColor: 'black',width:50, height:50, justifyContent:'center',borderRadius:30,position:'relative',bottom:5, zIndex:-10 },
      }}
    />
    <Tab.Screen
      name="Meeting"
      component={BookingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="meeting-room" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" size={30} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}
export default UserTabs;
