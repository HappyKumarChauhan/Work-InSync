import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Alert, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import ThemeContext from '../../theme/ThemeContext';
import Header from '../../components/Header';
import axios from '../../config/axios';
import LoadingModal from '../../components/LoadingModal';

const GenerateQr = ({ navigation }) => {
  const [myBookings, setMyBookings] = useState(null)
  const { colors } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)

  const fetchAllBookings = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/booking/my-bookings`);
      setMyBookings(response.data)
    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAllBookings()
  }, [])

  if (!myBookings) return (<LoadingModal message="Fetching..." visible={loading} />)

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}> {/* White background for the whole page */}
      {/* Header Section */}
      <Header navigation={navigation} title="GenerateQr" />
      <ScrollView style={styles.cardsContainer}>
        {myBookings.map((booking, index) => (
          <LinearGradient
            key={index}
            colors={colors.cardBgColors}
            style={styles.card}
            start={{ x: 1, y: 0 }}  // Start gradient from right
            end={{ x: 0, y: 0 }}    // End gradient at left
          >
            <Image style={{ width: 120, height: 120, borderRadius: 10 }} source={{ uri: `${axios.defaults.baseURL}/${booking.property.images[0]}` }} />
            <View style={styles.cardDescription}>
              <Text style={styles.cardTitle}>{booking.property.title}</Text>
              <Text style={styles.cardContent}>Location: {booking.property.location}</Text>
              <Text style={styles.cardContent}>Start Date: {booking.startDate}</Text>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: colors.Details }]}
                onPress={() => navigation.navigate('BookingConfirm',{bookingId:booking._id})}
              >
                <Text>View Details</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>))}
      </ScrollView>
    </View>

  )
}

export default GenerateQr

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    marginBottom: 15,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
})