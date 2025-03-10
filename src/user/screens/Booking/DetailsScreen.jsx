import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, FlatList,Alert } from 'react-native';
import ThemeContext from '../../../theme/ThemeContext';
import Header from '../../../components/Header';
import axios from '../../../config/axios'
import LoadingModal from '../../../components/LoadingModal';

const DetailsScreen = ({ route, navigation }) => {
  const { colors } = useContext(ThemeContext)
  const { startDate, endDate, guests, property } = route.params; // Destructure the passed data
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI'); // Default payment method
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // To control visibility of payment options modal

  const [loading, setLoading] = useState(false)
  const paymentMethods = ['UPI', 'Net Banking', 'Debit/Credit Card']; // Available payment methods

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentOptions(false); // Close modal after selecting
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        '/booking',
        { property: property._id, startDate, endDate },
      );
      Alert.alert('Success', 'Your space has been booked');
      navigation.navigate('BookingConfirm',{bookingId:response.data.booking._id})
    } catch (error) {
      Alert.alert('Booking Failed', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <Header navigation={navigation} title="Booking Details" />

      {/* Image and Details Section in Row */}
      <View style={styles.imageDetailsContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `${axios.defaults.baseURL}/${property.images[0]}`
          }}
        />
        <View style={styles.detailsTextContainer}>
          <Text style={[styles.detailsText, { color: colors.color }]}>{property.title}</Text>
          <Text style={[styles.detailsTextt, { color: colors.secondaryColor }]}>Location: {property.location}</Text>
          <Text style={[styles.detailsTextt, { color: colors.secondaryColor }]}>Desk: BM-8F-WS-26-2nd Floor</Text>
        </View>
      </View>

      {/* Booking Details Section */}
      <View style={styles.detailsSection}>
        {/* <Text style={[styles.sectionTitle,{color:colors.color}]}>Booking Details</Text> */}
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Booking Date:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{new Date().toLocaleDateString()}</Text> {/* Current date */}
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Check In:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{startDate || 'Select Date'}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Check Out:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{endDate || 'Select Date'}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Guests:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{guests}</Text>
        </View>
      </View>

      {/* Amount Details Section */}
      <View style={styles.detailsSection}>
        {/* <Text style={[styles.sectionTitle,{color:colors.color}]}>Amount Details</Text> */}
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Amount:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>{property.price}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Tax & Fees:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>$30</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel, { color: colors.color }]}>Total:</Text>
          <Text style={[styles.detailsText, { color: colors.secondaryColor }]}>$230</Text>
        </View>
      </View>

      {/* Payment Method Section */}
      <View style={styles.detailsSectionn}>
        {/* <Text style={[styles.sectionTitle,{color:colors.color}]}>Method of Payment</Text> */}
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsText, { color: colors.color }]}>{selectedPaymentMethod}</Text>
          <TouchableOpacity onPress={() => setShowPaymentOptions(true)}>
            <Text style={[styles.changeButtonText, { color: colors.linkColor, borderColor: colors.linkColor }]}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Methods Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showPaymentOptions}
        onRequestClose={() => setShowPaymentOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.secondaryBg }]}>
            <Text style={[styles.modalTitle, { color: colors.color }]}>Select Payment Method</Text>
            <FlatList
              data={paymentMethods}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectPaymentMethod(item)}
                  style={styles.paymentOption}
                >
                  <Text style={[styles.paymentOptionText, { color: colors.secondaryColor }]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              onPress={() => setShowPaymentOptions(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Continue Button */}
      <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.buttonBg }]} onPress={() => handleBooking()}>
        <Text style={[styles.continueButtonText, { color: colors.buttonText }]}>Continue</Text>
      </TouchableOpacity>
      <LoadingModal visible={loading} message="Booking is in progress..." />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageDetailsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 'auto',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    width: '90%',
  },
  detailsTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#052659',
    // marginVertical:10
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailsTextt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginTop: 5
  },
  detailsSection: {
    marginHorizontal: 16,
    marginBottom: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderBottomWidth: 1, // Add bottom border for each section
    borderBottomColor: '#ccc', // Set border color
  },
  detailsSectionn: {
    marginHorizontal: 16,
    marginBottom: 2,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#052659',
    marginBottom: 10,
  },
  changeButtonText: { fontSize: 16, color: 'blue', borderBottomWidth: 1, borderBottomColor: 'blue' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  paymentOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#052659',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#052659',
  },
  continueButton: {
    backgroundColor: '#0C1922',
    paddingVertical: 10,
    marginHorizontal: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    width: 150,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DetailsScreen;
