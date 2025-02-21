import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import Material Icons
import CompletedBookings from '../../components/bookings/CompletedBookings';
import CancelledBookings from '../../components/bookings/CancelledBookings';
import UpcomingBookings from '../../components/bookings/UpcomingBookings';
import ThemeContext from '../../theme/ThemeContext';
import Header from '../../components/Header';

const BookingsScreen = ({ navigation }) => {
  const bookingTypes = ['Upcoming', 'Completed', 'Cancelled']
  const [activeBookingType, setActiveBookingType] = useState(bookingTypes[0])

  const { colors } = useContext(ThemeContext)
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <Header navigation={navigation} title="Bookings" />
      {/* Section for Upcoming, Completed, and Cancelled */}
      <View style={styles.sections}>
        {bookingTypes.map((item, index) =>
        (<TouchableOpacity
          key={index}
          style={[styles.sectionButton, (activeBookingType === item) && { borderBottomColor: colors.color, borderBottomWidth: 3 }]}
          onPress={() => { setActiveBookingType(item) }}
        >
          <Text style={[styles.sectionText,{color:colors.color}]}>{item}</Text>
        </TouchableOpacity>))}
      </View>
      {activeBookingType === bookingTypes[0] && <UpcomingBookings navigation={navigation} />}
      {activeBookingType === bookingTypes[1] && <CompletedBookings navigation={navigation} />}
      {activeBookingType === bookingTypes[2] && <CancelledBookings navigation={navigation} />}

      {/* <BottomTabNavigator/> */}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  sectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 18,
    color: '#052659',
    fontWeight: 'bold'
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#135767',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10
  },
  cardDescription: {
    paddingHorizontal: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    marginVertical: 5,
    color: 'white',
    fontWeight: 400,
  },
  cardContent: {
    marginVertical: 1,
    fontSize: 12,
    color: 'white',
    fontWeight: 400
  },
  cardButton: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default BookingsScreen;
