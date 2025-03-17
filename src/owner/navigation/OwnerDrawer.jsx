import React, {useContext,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../theme/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import OwnerTabs from './OwnerTabs';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';
import UploadScreen from '../screens/UploadScreen';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();


const CustomDrawerContent = props => {
  const {colors, theme, toggleTheme} = useContext(ThemeContext);
  const {logout} =useContext(UserContext)
  const menuItems = [
    {name: 'Bookings', icon: 'groups', screen: 'Bookings'},
    {name: 'Listed Properties', icon: 'apartment', screen: 'Properties'},
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
      style={styles.drawerContainer}>
      {/* Header Section */}
      <View style={styles.drawerHeader}>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: colors.iconSecondary}]}
          onPress={() => props.navigation.navigate('Profile')}>
          <Icon name="account-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: colors.iconSecondary}]}
          onPress={() => props.navigation.closeDrawer()}>
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Menu Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{gap: 15}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>PwC WorkInSync</Text>

        {menuItems.map(item => (
          <Pressable
            key={item.screen}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.screen)}>
            <Icon name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.name}</Text>
          </Pressable>
        ))}

        <View style={styles.divider} />
        {footerItems.map(item => (
          <Pressable
            key={item.screen}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.screen)}>
            <Icon name={item.icon} size={22} color="#ccc" />
            <Text style={styles.menuText}>{item.name}</Text>
          </Pressable>
        ))}

        <View style={styles.divider} />
        {/* Logout Button */}
        <Pressable
          style={styles.menuItem}
          onPress={()=>{logout()}}>
          <Icon name="logout" size={24} color="#fff" />
          <Text style={styles.menuText}>Logout</Text>
        </Pressable>
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
            onPress={toggleTheme}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: `${theme === 'dark' ? 'white' : 'black'}`,
              }}></View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const OwnerDrawer = () => {
  
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
      }}>
      <Drawer.Screen name="Home" component={OwnerTabs} />
      <Drawer.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Drawer.Screen name="UploadScreen" component={UploadScreen} />
    </Drawer.Navigator>
  );
};

// Styles
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
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  logoutText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default OwnerDrawer;
