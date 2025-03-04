import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../theme/ThemeContext';
import {useContext} from 'react';
import DashboardScreen from '../screens/DasboardScreen';
import QRCodeScreen from '../screens/QrCodeScreen';
import UploadScreen from '../screens/UploadScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
function OwnerTabs() {
  const {colors} = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // Tab Bar Style
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          height: 70,
        },

        // Active Tab Customization
        tabBarActiveTintColor: colors.color,

        // Inactive Tab Customization
        tabBarInactiveTintColor: 'gray',

        // Label Style
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Book"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="book" size={30} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="QrCodeScanner"
        component={QrCodeScreen} // Custom component for the screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="qr-code-scanner" size={30} color="white" />
          ),
          tabBarIconStyle: {
            backgroundColor: 'black',
            width: 50,
            height: 50,
            justifyContent: 'center',
            borderRadius: 30,
            position: 'relative',
            bottom: 5,
            zIndex: -10,
          },
        }}
      /> */}
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="meeting-room" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default OwnerTabs;
