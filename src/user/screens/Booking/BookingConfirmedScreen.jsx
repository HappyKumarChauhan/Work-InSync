import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import ThemeContext from '../../../theme/ThemeContext';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import axios from '../../../config/axios';
import LoadingModal from '../../../components/LoadingModal';
import QRCode from "react-native-qrcode-svg";


const BookingConfirmedScreen = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { bookingId } = route.params;
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(false)
  const fetchBookingDetails = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/booking/${bookingId}`);
      setBooking(response.data)
    } catch (error) {
      Alert.alert('Something went wrong', error.response?.data?.message || 'Something went wrong.');
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBookingDetails()
  }, [bookingId])
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  const cancelBooking=async()=>{
    setLoading(true)
    try {
      const response = await axios.put(`/booking/${bookingId}/cancel`);
      Alert.alert("Success", "Your booking has been cancelled.");
      fetchBookingDetails()
      // Show a success message or refresh UI
    } catch (error) {
      console.error("Error cancelling order:", error);
      Alert.alert("Error", "Failed to cancel the order. Please try again.");
    }finally{
      setLoading(false)
    }
  }
  const confirmCancellation=()=>{
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => cancelBooking() }
      ]
    );
  }

  if (!booking) return (<LoadingModal message="" visible={loading} />)

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header navigation={navigation} title="Booking Details" />
      <View style={styles.imageDetailsContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${axios.defaults.baseURL}/${booking.property.images[0]}` }}
        />
        <View style={styles.detailsTextContainer}>
          <Text style={[styles.detailsText, { color: colors.color }]}>{booking.property.title}</Text>
          <Text style={[styles.detailsTextt, { color: colors.secondaryColor }]}>Location: {booking.property.location}</Text>
        </View>
      </View>

      <View>

      </View>
      <View style={styles.detailsSection}>
        <Text style={[styles.sectionTitle, { color: colors.color }]}>Booking Details</Text>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Check In:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{formatDate(booking.startDate)}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Check Out:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{formatDate(booking.endDate)}</Text>
        </View>
      </View>

      <View style={styles.confirmationMessage}>
        <Text style={[styles.confirmationText, { color: colors.color }]}>Your booking has been {booking.status==='Cancelled'?'cancelled':'confirmed'}.</Text>
      </View>
      {booking.status!=='Cancelled'&&(
        <View>
        <QRCode
        value={JSON.stringify({
          bookingId: booking._id,
          startDate: booking.startDate,
          endDate: booking.endDate
        })} // QR code data (can be a URL, text, etc.)
        size={200} // Size of the QR code
        color="black" // QR code color
        backgroundColor="white" // Background color
      />
      <TouchableOpacity style={styles.button} onPress={confirmCancellation}>
        <Text style={[styles.buttonText,{color:colors.buttonText}]}>Cancel Booking</Text>
      </TouchableOpacity>
      </View>
      )}
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonBg }]}
        onPress={() => navigation.navigate('Home')}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Go to Home</Text>
      </TouchableOpacity>
      <LoadingModal message='' visible={loading}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageDetailsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsTextContainer: {
    marginLeft: 10,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailsTextt: {
    fontSize: 14,
  },
  detailsSection: {
    width: '90%',
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailsLabel: {
    fontSize: 16,
  },
  confirmationMessage: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  button:{
    backgroundColor:'red',
    paddingVertical: 10,
    marginHorizontal: 'auto',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
    width: 150,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BookingConfirmedScreen;