import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../theme/ThemeContext';
import Header from '../components/Header';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from '../../config/axios';
import LoadingModal from '../../components/LoadingModal';

const PropertyDetailsScreen = ({navigation}) => {
  const {colors} = useContext(ThemeContext);
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [facilities, setFacilities] = useState({
    Wifi: false,
    Parking: false,
    AC: false,
    PowerBackup: false,
    Security: false,
    ConferenceRoom: false,
  });
  const [loading, setLoading] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState({
    UPI: false,
    CreditCard: false,
    Cash: false,
    PaperChecks: false,
    DebitCard: false,
  });
  const rentalOptions = [
    {id: '1', label: 'Daily', value: 'Daily', color: colors.color},
    {id: '2', label: 'Monthly', value: 'Monthly', color: colors.color},
  ];
  const [rentalType, setRentalType] = useState(null);
  const togglePaymentOption = option => {
    setPaymentOptions(prev => ({...prev, [option]: !prev[option]}));
  };
  const toggleFacility = facility => {
    setFacilities(prev => ({...prev, [facility]: !prev[facility]}));
  };
  const handleSubmit = async () => {
    if (!propertyName || !description || !location || !price) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true)
    const selectedFacilities = Object.keys(facilities).filter(
      key => facilities[key],
    );

    const data = {
      title: propertyName,
      description,
      location,
      price,
      rentalType, // Make sure this is not null
      amenities: selectedFacilities,
    };

    try {
      const response = await axios.post('/properties', data, {
        headers: {'Content-Type': 'application/json'},
      });
      const propertyId=response.data.property._id;
      Alert.alert('Success', 'Property has been added.');
      navigation.navigate('UploadScreen',{propertyId}); // Navigate to the next screen
    } catch (error) {
      console.error('Error submitting form:', error.message);
      Alert.alert('Error', 'Failed to submit property details');
    } finally{
      setLoading(false)
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <Header title="Property Details" navigation={navigation} />

      <ScrollView style={styles.content}>
        {/* Form Fields */}
        <Text
          style={[[styles.label, {color: colors.color}], {color: colors.color}]}
        >
          Fill the Details
        </Text>
        <TextInput
          style={[
            styles.input,
            {color: colors.color, backgroundColor: colors.secondaryBg},
          ]}
          placeholder="Property Name"
          placeholderTextColor={colors.secondaryColor}
          value={propertyName}
          onChangeText={setPropertyName}
        />
        <TextInput
          style={[
            styles.input,
            {color: colors.color, backgroundColor: colors.secondaryBg},
          ]}
          placeholder="Description"
          placeholderTextColor={colors.secondaryColor}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={[
            styles.input,
            {color: colors.color, backgroundColor: colors.secondaryBg},
          ]}
          placeholder="Location"
          placeholderTextColor={colors.secondaryColor}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={[
            styles.input,
            {color: colors.color, backgroundColor: colors.secondaryBg},
          ]}
          placeholder="Price"
          placeholderTextColor={colors.secondaryColor}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        {/* <TouchableOpacity
          style={[styles.locationInput, {backgroundColor: colors.secondaryBg}]}
        >
          <Text
            style={[styles.placeholderText, {color: colors.secondaryColor}]}
          >
            Location
          </Text>
          <Text style={[styles.linkText, {color: colors.linkColor}]}>
            Visit Map
          </Text>
        </TouchableOpacity> */}

        <Text
          style={[[styles.label, {color: colors.color}], {color: colors.color}]}
        >
          Rental Type
        </Text>
        <RadioGroup
          labelStyle={{color: colors.color}}
          radioButtons={rentalOptions}
          onPress={id => {
            const selectedOption = rentalOptions.find(
              button => button.id === id,
            );
            setRentalType(selectedOption ? selectedOption.value : null);
          }}
          selectedId={
            rentalType
              ? rentalOptions.find(btn => btn.value === rentalType)?.id
              : null
          }
          containerStyle={styles.radioGroup}
        />

        {/* Features Section
        <Text
          style={[[styles.label, {color: colors.color}], {color: colors.color}]}
        >
          Features
        </Text>
        {['City', 'Built In', 'Price per sqft'].map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Icon
              name="arrow-right"
              size={24}
              color={colors.color}
              style={styles.featureIcon}
            />
            <Text style={[styles.featureLabel, {color: colors.color}]}>
              {feature}
            </Text>
            <TextInput
              style={[styles.featureInput, {color: colors.color}]}
              placeholderTextColor={colors.secondaryColor}
            />
          </View>
        ))} */}

        {/* Facilities & Services */}
        <Text style={[styles.label, {color: colors.color}]}>
          Facilities & Services
        </Text>
        <View style={styles.facilitiesContainer}>
          {Object.keys(facilities).map(facility => (
            <TouchableOpacity
              key={facility}
              style={styles.facilityOption}
              onPress={() => toggleFacility(facility)}
            >
              <Icon
                name={
                  facilities[facility] ? 'check-box' : 'check-box-outline-blank'
                }
                size={24}
                color={colors.color}
              />
              <Text style={[styles.facilityText, {color: colors.color}]}>
                {facility}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Options
        <Text style={[styles.label, {color: colors.color}]}>
          Payment Options
        </Text>
        <View style={styles.paymentOptions}>
          {Object.keys(paymentOptions).map(option => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxContainer}
              onPress={() => togglePaymentOption(option)}
            >
              <Icon
                name={
                  paymentOptions[option]
                    ? 'check-box'
                    : 'check-box-outline-blank'
                }
                size={30}
                color={colors.color}
              />
              <Text style={[styles.checkboxText, {color: colors.color}]}>
                {option.replace(/([A-Z])/g, ' $1')}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.nextButton, {backgroundColor: colors.buttonBg}]}
      >
        <Text></Text>
        <Text style={[styles.nextButtonText, {color: colors.buttonText}]}>
          Next
        </Text>
        <Icon name="chevron-right" size={24} color={colors.buttonText} />
      </TouchableOpacity>
      <LoadingModal visible={loading} message='Adding...'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  erTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 40 : 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  locationInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  placeholderText: {
    color: '#777',
  },
  linkText: {
    color: '#007BFF',
  },
  radioGroup: {
    flexDirection: 'row',
    gap:10,
    marginBottom: 15,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    paddingVertical: 1,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 100,
  },
  featureInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%',
  },
  checkboxText: {
    fontSize: 14,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  facilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  facilityText: {
    fontSize: 14,
    marginLeft: 5,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
});

export default PropertyDetailsScreen;
