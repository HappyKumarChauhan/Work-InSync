import React, { useContext, useState } from 'react';
import { View,  StyleSheet, ScrollView } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import BookingCard from '../components/bookings/BookingCard';
import Header from '../../components/Header';

const WishlistScreen = ({ navigation }) => {

  const { colors } = useContext(ThemeContext)
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <Header navigation={navigation} title="My Wishlist" />
      {/* Section for Upcoming, Completed, and Cancelled */}
      <ScrollView style={styles.cardsContainer}>
            {Array.from({length:8}).map((_, index) => (<BookingCard key={index} navigation={navigation}/>))}
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

});

export default WishlistScreen;
