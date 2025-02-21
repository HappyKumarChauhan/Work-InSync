import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookingsScreen from '../screens/Booking/BookingScreen';
import Dashboard from '../screens/DashboardScreen';
import RoomSpaceScreen from '../screens/Booking/RoomSpaceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ThemeContext from '../theme/ThemeContext';
import { useContext } from 'react';
import MyDrawer from '../../MyDrawer';
const Tab = createBottomTabNavigator();
function MyTabs() {
  const { colors} = useContext(ThemeContext)
  return (

    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      // Tab Bar Style
      tabBarStyle: { backgroundColor: colors.background, borderTopWidth: 1, height:70 },
  
      // Active Tab Customization
      tabBarActiveTintColor: colors.color, 
  
      // Inactive Tab Customization
      tabBarInactiveTintColor: 'gray',
  
      // Label Style
      tabBarShowLabel:false
    }}
  >
    <Tab.Screen
      name="Home"
      component={MyDrawer}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Book"
      component={BookingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="book" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="QrCodeScanner"
      component={Dashboard} // Custom component for the screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="qr-code-scanner" size={30} color="white" />
        ),
        tabBarIconStyle: { backgroundColor: 'black',width:50, height:50, justifyContent:'center',borderRadius:30,position:'relative',bottom:5, zIndex:-10 },
      }}
    />
    <Tab.Screen
      name="Meeting"
      component={RoomSpaceScreen}
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
export default MyTabs;