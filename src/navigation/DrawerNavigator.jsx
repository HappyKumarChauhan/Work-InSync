import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen' // Adjust the path as necessary
import MenuScreen from '../screens/MenuScreen'; // Adjust the path as necessary

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <MenuScreen {...props} />}
        screenOptions={{
          headerShown: false, // Hide the default header
          drawerPosition: 'left', // Drawer opens from the left
          drawerType: 'front', // Standard drawer behavior
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        {/* Add other screens here if needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;