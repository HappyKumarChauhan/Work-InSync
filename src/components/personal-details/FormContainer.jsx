import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../theme/ThemeContext';

const FormContainer = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)

    return (
        <View style={styles.formContainer}>
            {/* Form Section */}
            <Text style={[styles.label, { color: colors.color }]}>Fill the Details</Text>
            {["Your Name", "Your Email", "Contact Number", "Date of birth", "Address", "City", "Pincode"].map((placeholder, index) => (
                <TextInput key={index} style={[styles.input, { color: colors.color, backgroundColor: colors.secondaryBg }]} placeholder={placeholder} placeholderTextColor={colors.secondaryColor} />
            ))}

            {/* Next Button */}
            <TouchableOpacity style={[styles.nextButton, { backgroundColor: colors.buttonBg }]}
                onPress={() => { navigation.navigate('KYCDetails') }}
            >
                <Text></Text>
                <Text style={[styles.nextButtonText, { color: colors.buttonText }]}>Next</Text>
                <Icon name="chevron-right" size={24} color={colors.buttonText} />
            </TouchableOpacity>
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
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: Platform.OS === 'ios' ? 40 : 2,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        padding: 12,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        elevation: 5
    },
    nextButton: {
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        marginRight: 5
    },
});

export default FormContainer;
