import React from 'react'
import {StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BookingCard from './BookingCard';

const UpcomingBookings = ({navigation}) => {
  
  return (
    <ScrollView style={styles.cardsContainer}>
            {Array.from({length:8}).map((_, index) => (<BookingCard key={index} navigation={navigation}/>))}
    </ScrollView>
  )
}

export default UpcomingBookings

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
      },
})