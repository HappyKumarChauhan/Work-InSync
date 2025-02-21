import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';

const KYCDetailsScreen = ({ navigation }) => {
    const {colors} =useContext(ThemeContext);
    return (
        <View style={[styles.container,{backgroundColor:colors.background}]}>
            {/* Back Icon and Title */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton,{backgroundColor:colors.secondaryBg}]}>
                    <Icon name="keyboard-arrow-left" size={30} color={colors.color} />
                </TouchableOpacity>
                <Text style={[styles.topBarTitle,{color:colors.color,borderBottomColor:colors.color}]}>KYC Details</Text>
            </View>

            {/* Identity Type Options */}
            <Text style={[styles.sectionTitle,{color:colors.color}]}>Choose Your Identity Type</Text>
            <View style={styles.identityOptions}>
                <TouchableOpacity style={[styles.identityButton,{backgroundColor:colors.secondaryBg,borderColor:colors.secondaryColor}]}>
                    <Text style={[styles.identityButtonText,{color:colors.secondaryColor}]}>Aadhar Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.identityButton,{backgroundColor:colors.secondaryBg,borderColor:colors.secondaryColor}]}>
                    <Text style={[styles.identityButtonText,{color:colors.secondaryColor}]}>Pan Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.identityButton,{backgroundColor:colors.secondaryBg,borderColor:colors.secondaryColor}]}>
                    <Text style={[styles.identityButtonText,{color:colors.secondaryColor}]}>Driving License</Text>
                </TouchableOpacity>
            </View>

            {/* Upload Proof Identity */}
            <View style={[styles.uploadSection,{backgroundColor:colors.secondaryBg}]}>
                <View style={styles.uploadTextContainer}>
                    <Text style={[styles.cardTitle,{color:colors.color}]}>Upload Proof Identity</Text>
                    <Text style={[styles.cardDescription,{color:colors.secondaryColor}]}>
                        We accept only ID card, Driving License, or Passport
                    </Text>
                </View>
                <TouchableOpacity style={[styles.uploadButton,{borderColor:colors.color}]}>
                    <Icon name="image" size={30} color={colors.color} />
                </TouchableOpacity>
            </View>

            {/* Selfie Photo */}
            <View style={[styles.uploadSection,{backgroundColor:colors.secondaryBg}]}>
                <View style={styles.uploadTextContainer}>
                    <Text style={[styles.cardTitle,{color:colors.color}]}>Selfie Photo</Text>
                    <Text style={[styles.cardDescription,{color:colors.secondaryColor}]}>
                        Selfie with your front camera to verify your identity
                    </Text>
                </View>
                <TouchableOpacity style={[styles.uploadButton,{borderColor:colors.color}]}>
                    <Icon name="camera-alt" size={30} color={colors.color} />
                </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={[styles.submitButton,{backgroundColor:colors.buttonBg}]}>
                <Text style={[styles.submitButtonText,{color:colors.buttonText}]}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    topBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 80,
        marginTop: 2,
        color: '#000',
        // borderBottomWidth: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#000',
    },
    identityOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        // gap : 5
    },
    identityButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 25,
        borderBottomWidth: 2,  // Bottom border added
        borderBottomColor: 'black',
        shadowColor: 'black',  // Added shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    identityButtonText: {
        fontSize: 16,
        color: '#000',
    },
    uploadSection: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        borderBottomWidth: 2, // Black bottom border
        borderBottomColor: 'black',
        shadowColor: 'white',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        flexDirection: 'row', // This makes the layout horizontal (row direction)
        justifyContent: 'space-between', // Space out title, description, and button
        alignItems: 'center', // Align vertically in the center
    },
    uploadTextContainer: {
        flex: 1, // Makes sure this container takes up available space
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    uploadButton: {
        alignSelf: 'center',  // Center the button
        padding: 20,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        width: '30%',  // Size increased to 30% of the row
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderStyle:'dashed',

    },
    submitButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: 'auto',  // Only takes width according to button length
        alignSelf: 'center',  // Center the button
        paddingHorizontal: 50,  // Adjust padding horizontally based on text length
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: Platform.OS === 'ios' ? 40 : 2,  // Adjust margin for iOS
        backgroundColor: 'white',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
    },
});

export default KYCDetailsScreen;
