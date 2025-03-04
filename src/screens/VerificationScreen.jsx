import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
const VerificationScreen = ({ navigation }) => {
  const { colors } = useContext(ThemeContext)
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const handleVerification=()=>{
        navigation.navigate('ResetPasswordScreen')
    }

    const handleCodeChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus the next input if the current input is filled
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (event, index) => {
        // If backspace is pressed and the current input is empty, focus the previous input
        if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <LinearGradient colors={colors.bgGradient} style={[styles.container]}>
            {/* Back Icon */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton,{backgroundColor:colors.secondaryBg}]}>
                <Icon name="keyboard-arrow-left" size={30} color={colors.color} />
            </TouchableOpacity>

            {/* Title and Description */}
            <Text style={[styles.title,{color:colors.color}]}>Enter Verification Code</Text>
            <Text style={[styles.description,{color:colors.secondaryColor}]}>We have sent a code to example@gmail.com</Text>

            {/* Verification Code Inputs */}
            <View style={styles.inputContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        secureTextEntry
                        style={[styles.input,{backgroundColor:colors.secondaryBg,color:colors.color}]}
                        value={digit}
                        onChangeText={(value) => handleCodeChange(index, value)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            {/* Verify Now Button */}
            <PrimaryButton title="Verify Now"handler={handleVerification}/>

            {/* Resend Code Text */}
            <View style={styles.resendContainer}>
                <Text style={[styles.resendText,{color:colors.secondaryColor}]}>Didn't you receive any code?</Text>
                <TouchableOpacity onPress={() => { /* Add resend functionality */ }}>
                    <Text style={[styles.resendLink,{color:colors.linkColor}]}>Resend Code</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3', // Background color
        paddingHorizontal: 20,
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: Platform.OS === 'ios' ? 40 : 20,  // Adjust margin for iOS
        backgroundColor: 'white',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 40,
    },
    description: {
        fontSize: 16,
        color: 'black',
        marginVertical: 10,
    },
    inputContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        gap: 18,
        marginTop: 20,
        borderColor: 'black',
    },
    input: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
    },
    resendContainer: {
        marginTop: 20,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    resendText: {
        fontSize: 14,
        color: 'black',
    },
    resendLink: {
        fontSize: 14,
        color: 'blue',
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
});

export default VerificationScreen;
