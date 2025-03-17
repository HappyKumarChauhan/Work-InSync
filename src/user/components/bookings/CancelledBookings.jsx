import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BookingCard from './BookingCard';
import axios from '../../../config/axios';
import LoadingModal from '../../../components/LoadingModal';
import ThemeContext from '../../../theme/ThemeContext';

const CancelledBookings = ({navigation}) => {
  const {colors} = useContext(ThemeContext);
  const [myBookings, setMyBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/booking/cancelled`);
      setMyBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Something went wrong',
        error.response?.data?.message || 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  if (!myBookings)
    return <LoadingModal message="Fetching..." visible={loading} />;

  return (
    <ScrollView style={styles.cardsContainer}>
      {myBookings.length === 0 ? (
        <Text
          style={{
            color: colors.color,
            textAlign: 'center',
            fontSize: 15,
            marginVertical: 10,
          }}>
          No booking found
        </Text>
      ) : (
        myBookings.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            buttonText="View Details"
            buttonClick={() => {
              navigation.navigate('BookingConfirm', {
                bookingId: booking._id,
              });
            }}
            navigation={navigation}
          />
        ))
      )}
    </ScrollView>
  );
};

export default CancelledBookings;

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
