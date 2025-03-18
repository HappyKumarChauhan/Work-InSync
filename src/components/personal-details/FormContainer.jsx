import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import { UserContext } from '../../context/UserContext';
import axios from '../../config/axios';
import LoadingModal from '../LoadingModal';

const FormContainer = ({ navigation }) => {
    const {user}=useContext(UserContext)
    const { colors } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false)

    // Using a single state object for form data
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        contact: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        city: user.city,
        pincode: user.pincode
    });

    // Function to handle input changes
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Function to handle form submission
    const handleSave = async () => {
        const { name, email, contact, dateOfBirth, address, city, pincode } = formData;

        if (!name || !email || !contact || !dateOfBirth || !address || !city || !pincode) {
            Alert.alert('Error', 'Please fill all fields before proceeding.');
            return;
        }
        setLoading(true)
        try {
            await axios.put('/user/profile', formData);
            Alert.alert('Success', 'Form submitted successfully!');
            navigation.navigate('KYCDetails');
        } catch (error) {
            Alert.alert('Submission Failed', error.message);
        }finally{
            setLoading(false)
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={[styles.label, { color: colors.color }]}>Fill the Details</Text>

            {['name', 'email', 'contact', 'dateOfBirth', 'address', 'city', 'pincode'].map((field, index) => (
                <TextInput
                    key={index}
                    style={[styles.input, { color: colors.color, backgroundColor: colors.secondaryBg }]}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    placeholderTextColor={colors.secondaryColor}
                    editable={!(field==='email'||field==='name')}
                    keyboardType={field === 'email' ? 'email-address' : field === 'contact' || field === 'pincode' ? 'numeric' : 'default'}
                    value={formData[field]}
                    onChangeText={(value) => handleChange(field, value)}
                />
            ))}

            <TouchableOpacity style={[styles.nextButton, { backgroundColor: colors.buttonBg }]} onPress={handleSave}>
                <Text style={[styles.nextButtonText, { color: colors.buttonText }]}>Save</Text>
            </TouchableOpacity>
            <LoadingModal message='' visible={loading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginHorizontal: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 15
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        padding: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#f8f8f8',
        elevation: 5
    },
    nextButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    nextButtonText: {
        fontSize: 16,
        marginRight: 5
    },
});

export default FormContainer;