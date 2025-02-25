import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import Material Icons for the 'X' icon
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../theme/ThemeContext';


const NotificationScreen = ({ navigation }) => {
  const { colors} = useContext(ThemeContext)
  const notifications = [
    { day: 'Today', message: 'Room Booked Successfully', time: '3m', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { day: '', message: 'Room Booked Successfully', time: '3m', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { day: 'Yesterday', message: 'Room Booked Successfully', time: '3m', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { day: '', message: 'Room Booked Successfully', time: '3m', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ];

  return (
    <LinearGradient colors={colors.sidePanelBgColors} style={{flex:1}}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={[styles.closeButton,{backgroundColor:colors.secondaryBg}]} onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color={colors.color} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((item, index) => (
          
          <View key={index} style={styles.notificationContainer}>

            {/* Show Day if exists */}
            {item.day ? <Text style={styles.notificationDay}>{item.day}</Text> : null}

            <View style={styles.notificationBody}>
              {/* Message, Watch Icon, and Time in a Row */}
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Icon name="watch-later" size={20} color="#FFF" style={styles.notificationIcon} />
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>

              {/* Detailed Text */}
              <Text style={styles.notificationDetail}>{item.detail}</Text>
              
            </View>
          </View>
         
        ))}
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#0C1922',  // Set the background color to #0C1922
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom:20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'white', // Add bottom border for the title
    paddingBottom: 5,
    width:150
  },
  // closeButton: {
  //   padding: 10,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 4,
  //   elevation: 5, // Shadow for both iOS and Android
  // },
   closeButton: {
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          marginTop: Platform.OS === 'ios' ? 40 : 1,  // Adjust margin for iOS
          // backgroundColor: '#1D2B34',
          // Shadow for iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          // Elevation for Android
          elevation: 5,
          marginBottom: 20,
      },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationContainer: {
    marginBottom: 2,  // Adds space between notifications
  },
  notificationDay: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 10,
  },
  notificationBody: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    // backgroundColor: '#1D2B34',  // Optional background color for each notification
  },
  notificationHeader: {
    flexDirection: 'row',  // Align message, icon, and time in a row
    alignItems: 'center',  // Vertically align them
    marginBottom: 10,  // Space between the header and the details
  },
  notificationMessage: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
    flex: 1, // Allow the message to take up available space
  },
  notificationIcon: {
    marginHorizontal: 10,  // Adds space between the icon and the message
  },
  notificationTime: {
    fontSize: 14,
    color: '#A1A1A1',
  },
  notificationDetail: {
    fontSize: 14,
    color: '#FFF',
  },
});
