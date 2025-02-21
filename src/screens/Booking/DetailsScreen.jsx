import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, FlatList } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import Header from '../../components/Header';

const DetailsScreen = ({ route, navigation }) => {
  const { colors} = useContext(ThemeContext)
  const { startDate, endDate, guests } = route.params; // Destructure the passed data
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI'); // Default payment method
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // To control visibility of payment options modal

  const paymentMethods = ['UPI', 'Net Banking', 'Debit/Credit Card']; // Available payment methods

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentOptions(false); // Close modal after selecting
  };

  return (
    <ScrollView style={[styles.container,{backgroundColor:colors.background}]}>
      {/* Header Section */}
      <Header navigation={navigation} title="Booking Details"/>

      {/* Image and Details Section in Row */}
      <View style={styles.imageDetailsContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TMDsE5eU3O9iUAJzhEBfpjIRTY2lbkTet6Gu2tWyQOMoVN61h2mMB36g6wklJB5e24ZBPm9ky5eT6Tg6ed2XVho-5j5rZAWr3PiAZgJv4E8iSovFmqT-m0DD-DsPXVOYLTjEMV7z5VDHadYJ-B717N5w3p3ckkmhw8aobUFnCla~wlQBwQx2YaSGhHlasAgueSnHHPw61HVYw3IiWSuz3VG7-S6otOkuda4BuzOFnVpPZfVEabFHS8fkz04Ypmeq9C51N-70quLH85wQopdC~77Uo178TyjsSh3iEcD7aQmJX9KAcUcgE~2oiCMBujZeRQEYDLJi116U4NqGIjqIog__',
          }}
        />
        <View style={styles.detailsTextContainer}>
          <Text style={[styles.detailsText,{color:colors.color}]}>Bengaluru Brigade</Text>
          <Text style={[styles.detailsTextt,{color:colors.secondaryColor}]}>For: Self</Text>
          <Text style={[styles.detailsTextt,{color:colors.secondaryColor}]}>Desk: BM-8F-WS-26-2nd Floor</Text>
        </View>
      </View>

      {/* Booking Details Section */}
      <View style={styles.detailsSection}>
        {/* <Text style={[styles.sectionTitle,{color:colors.color}]}>Booking Details</Text> */}
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Booking Date:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>{new Date().toLocaleDateString()}</Text> {/* Current date */}
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Check In:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>{startDate || 'Select Date'}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Check Out:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>{endDate || 'Select Date'}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Guests:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>{guests}</Text>
        </View>
      </View>

      {/* Amount Details Section */}
      <View style={styles.detailsSection}>
        {/* <Text style={[styles.sectionTitle,{color:colors.color}]}>Amount Details</Text> */}
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Amount:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>$200</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Tax & Fees:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>$30</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsLabel,{color:colors.color}]}>Total:</Text>
          <Text style={[styles.detailsText,{color:colors.secondaryColor}]}>$230</Text>
        </View>
      </View>

      {/* Payment Method Section */}
      <View style={styles.detailsSectionn}>
        {/* <Text style={[styles.sectionTitle,{color:colors.color}]}>Method of Payment</Text> */}
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsText,{color:colors.color}]}>{selectedPaymentMethod}</Text>
          <TouchableOpacity onPress={() => setShowPaymentOptions(true)}>
            <Text style={[styles.changeButtonText,{color:colors.linkColor,borderColor:colors.linkColor}]}>Change</Text>
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
            <View style={[styles.modalContainer,{backgroundColor:colors.secondaryBg}]}>
              <Text style={[styles.modalTitle,{color:colors.color}]}>Select Payment Method</Text>
              <FlatList
                data={paymentMethods}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectPaymentMethod(item)}
                    style={styles.paymentOption}
                  >
                    <Text style={[styles.paymentOptionText,{color:colors.secondaryColor}]}>{item}</Text>
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
      <TouchableOpacity style={[styles.continueButton,{backgroundColor:colors.buttonBg}]} onPress={() => navigation.goBack()}>
        <Text style={[styles.continueButtonText,{color:colors.buttonText}]}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
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
    width: '90%', // Uniform width for all containers
  },
  detailsTextContainer: {
    flexDirection: 'column',
    // justifyContent: 'center',
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
    marginTop:5
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
  detailsSectionn:{
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
