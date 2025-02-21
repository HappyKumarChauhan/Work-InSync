import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookingCard from './BookingCard';
import ThemeContext from '../../theme/ThemeContext';

const CancelledBookings = ({ navigation }) => {
  const { colors } = useContext(ThemeContext); // Access theme colors
  const bookings = []; // Empty array to show "No Cancelled Bookings" message

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {bookings.length > 0 ? (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {bookings.map((_, index) => (
            <BookingCard key={index} navigation={navigation} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.sorryText, { color: colors.color }]}>Sorry!!</Text>
          <Text style={[styles.message, { color: colors.color }]}>
            You don't have any Cancelled bookings.
          </Text>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.buttonBg }]}
        onPress={() => console.log('Add Booking')}
      >
        <Icon name="add" size={30} color={colors.buttonText} />
      </TouchableOpacity>
    </View>
  );
};

export default CancelledBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sorryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
});
