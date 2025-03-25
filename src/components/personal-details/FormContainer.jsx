import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import {UserContext} from '../../context/UserContext';
import axios from '../../config/axios';
import LoadingModal from '../LoadingModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const FormContainer = ({navigation}) => {
  const {user, fetchUser} = useContext(UserContext);
  const {colors} = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // Helper function to format date

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateOfBirth: formatDate(user.dateOfBirth), // YYYY-MM-DD format
    address: user.address,
    city: user.city,
    pincode: user.pincode,
  });

  

  // Function to handle input changes
  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  // Show/Hide Date Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Handle Date Selection
  const handleConfirm = selectedDate => {
    const formattedDate = formatDate(selectedDate);
    setFormData({...formData, dateOfBirth: formattedDate});
    hideDatePicker();
  };

  // Function to handle form submission
  const handleSave = async () => {
    const {name, email, phoneNumber, dateOfBirth, address, city, pincode} =
      formData;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !dateOfBirth ||
      !address ||
      !city ||
      !pincode
    ) {
      Alert.alert('Error', 'Please fill all fields before proceeding.');
      return;
    }
    setLoading(true);
    try {
      await axios.put('/user/profile', formData);
      Alert.alert('Success', 'Profile updated successfully!');
      fetchUser();
    } catch (error) {
      Alert.alert('Submission Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={[styles.label, {color: colors.color}]}>
        Fill the Details
      </Text>

      {/* Name Input */}
      <TextInput
        style={[
          styles.input,
          {color: colors.color, backgroundColor: colors.secondaryBg},
        ]}
        placeholder="Name"
        placeholderTextColor={colors.secondaryColor}
        value={formData.name}
        editable={false} // Name is not editable
      />

      {/* Email Input */}
      <TextInput
        style={[
          styles.input,
          {color: colors.color, backgroundColor: colors.secondaryBg},
        ]}
        placeholder="Email"
        placeholderTextColor={colors.secondaryColor}
        keyboardType="email-address"
        value={formData.email}
        editable={false} // Email is not editable
      />

      {/* phoneNumber Input */}
      <TextInput
        style={[
          styles.input,
          {color: colors.color, backgroundColor: colors.secondaryBg},
        ]}
        placeholder="Phone Number"
        placeholderTextColor={colors.secondaryColor}
        keyboardType="number-pad"
        maxLength={10} // Restricts input to 6 digits
        value={formData.phoneNumber}
        onChangeText={value => handleChange('phoneNumber', value)}
      />

      {/* Date of Birth Picker */}
      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.input, {backgroundColor: colors.secondaryBg}]}>
        <Text style={{color: colors.color}}>
          {formData.dateOfBirth ? formData.dateOfBirth : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()} // Restrict to past dates
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Address Input */}
      <TextInput
        style={[
          styles.input,
          {color: colors.color, backgroundColor: colors.secondaryBg},
        ]}
        placeholder="Address"
        placeholderTextColor={colors.secondaryColor}
        value={formData.address}
        onChangeText={value => handleChange('address', value)}
      />

      {/* City Input */}
      <TextInput
        style={[
          styles.input,
          {color: colors.color, backgroundColor: colors.secondaryBg},
        ]}
        placeholder="City"
        placeholderTextColor={colors.secondaryColor}
        value={formData.city}
        onChangeText={value => handleChange('city', value)}
      />

      {/* Pincode Input with maxLength 6 */}
      <TextInput
        style={[
          styles.input,
          {color: colors.color, backgroundColor: colors.secondaryBg},
        ]}
        placeholder="Pincode"
        placeholderTextColor={colors.secondaryColor}
        keyboardType="number-pad"
        maxLength={6} // Restricts input to 6 digits
        value={formData.pincode}
        onChangeText={value => handleChange('pincode', value)}
      />

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.nextButton, {backgroundColor: colors.buttonBg}]}
        onPress={handleSave}>
        <Text style={[styles.nextButtonText, {color: colors.buttonText}]}>
          Save
        </Text>
      </TouchableOpacity>

      {/* Loading Modal */}
      <LoadingModal message="" visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#f8f8f8',
    elevation: 5,
  },
  nextButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  nextButtonText: {
    fontSize: 16,
    marginRight: 5,
  },
});

export default FormContainer;
