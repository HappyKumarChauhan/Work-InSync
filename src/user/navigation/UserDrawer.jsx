import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../theme/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import UserTabs from './UserTabs';
import BookingsScreen from '../screens/Booking/BookingScreen';
import CheckInOutScreen from '../screens/Booking/CheckInOutScreen';
import DetailsScreen from '../screens/Booking/DetailsScreen';
import RoomSpaceScreen from '../screens/Booking/RoomSpaceScreen';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = props => {
    const {colors, theme, toggleTheme} = useContext(ThemeContext);
    const menuItems = [
      {name: 'Bookings', icon: 'groups', screen: 'Bookings'},
      {name: 'Map', icon: 'map', screen: 'Map'},
      {name: 'Booking History', icon: 'history', screen: 'Completed'},
      {name: 'QR Code', icon: 'qr-code', screen: 'QRScanner'},
    ];
  
    const footerItems = [
      {name: 'FAQs', icon: 'help-outline', screen: 'FAQs'},
      {name: 'App Feedback', icon: 'feedback', screen: 'Feedback'},
      {name: 'Rate the app', icon: 'star-rate', screen: 'RateApp'},
      {name: 'Terms of Usage', icon: 'article', screen: 'Terms'},
    ];
  
    return (
      <LinearGradient
        colors={colors.sidePanelBgColors}
        style={styles.drawerContainer}
      >
        {/* Header Section */}
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={[styles.iconButton, {backgroundColor:colors.iconTwo}]} onPress={() => props.navigation.navigate('Profile')}>
            <Icon name="account-circle" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, {backgroundColor:colors.iconTwo}]} onPress={() => props.navigation.closeDrawer()}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* Menu Items */}
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{gap: 15}}
          showsVerticalScrollIndicator={false}
        >
        <Text style={styles.title}>PwC WorkInSync</Text>
  
        
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.screen}
              style={styles.menuItem}
              onPress={() => props.navigation.navigate(item.screen)}
            >
              <Icon name={item.icon} size={24} color="#fff" />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
  
          <View style={styles.divider} />
          {footerItems.map(item => (
            <TouchableOpacity
              key={item.screen}
              style={styles.menuItem}
              onPress={() => props.navigation.navigate(item.screen)}
            >
              <Icon name={item.icon} size={22} color="#ccc" />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        
        <View style={styles.divider} />
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log('Logging out')}
        >
          <Icon name="logout" size={24} color="#fff" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <View style={[styles.iconContainer]}>
            <Icon name="color-lens" size={30} color="white" />
          </View>
          <Text style={styles.menuText}>Theme</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              width: 50,
              height: 15,
              alignItems: 'center',
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: `${theme === 'dark' ? 'flex-end' : 'flex-start'}`,
            }}
            onPress={toggleTheme}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: `${theme === 'dark' ? 'white' : 'black'}`,
              }}
            ></View>
          </TouchableOpacity>
        </View>
        </DrawerContentScrollView>
      </LinearGradient>
    );
  };
const UserDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: '100%',
          backgroundColor: '#1E1E1E',
        },
      }}
    >
      <Drawer.Screen name="Home" component={UserTabs} />
      <Drawer.Screen name="Bookings" component={BookingsScreen} />
      <Drawer.Screen name="RoomSpace" component={RoomSpaceScreen} />
      <Drawer.Screen name="CheckInOut" component={CheckInOutScreen} />
      <Drawer.Screen name="Details" component={DetailsScreen} />

      {/* <Drawer.Screen name="Map" component={ScreenComponent} />
        <Drawer.Screen name="BookingHistory" component={ScreenComponent} />
        <Drawer.Screen name="QRCode" component={ScreenComponent} />
        <Drawer.Screen name="FAQs" component={ScreenComponent} />
        <Drawer.Screen name="Feedback" component={ScreenComponent} />
        <Drawer.Screen name="RateApp" component={ScreenComponent} />
        <Drawer.Screen name="Terms" component={ScreenComponent} /> */}
    </Drawer.Navigator>
  )
}

export default UserDrawer

const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#121212',
    },
    drawerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 10,
    },
    iconButton: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginTop: Platform.OS === 'ios' ? 40 : 1, // Adjust margin for iOS
      backgroundColor: '#1D2B34',
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 4,
      // Elevation for Android
      elevation: 5,
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 30,
      color: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      paddingBottom: 10,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginVertical: 1,
      borderRadius: 5,
      width: 'auto',
      paddingBottom: 1,
    },
    menuText: {
      fontSize: 15,
      color: 'white',
      fontWeight: 500,
    },
    divider: {
      height: 1,
      backgroundColor: 'white',
      marginVertical: 10,
    },
    logout: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop:20,
      borderTopWidth: 1,
      borderTopColor: 'white',
    },
    logoutText: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 16,
    },
  });