import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';

const ResetPasswordScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password visibility

    const createHandler=()=>{
        navigation.navigate('PasswordSuccessScreen')
    }

    return (
        <LinearGradient colors={colors.bgGradient} style={[styles.container]}>
            {/* Back Icon */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton,{backgroundColor:colors.secondaryBg}]}>
                <Icon name="keyboard-arrow-left" size={30} color={colors.color} />
            </TouchableOpacity>

            {/* Title and Description */}
            <Text style={[styles.title,{color:colors.color}]}>Reset your Password</Text>
            <Text style={[styles.description,{color:colors.secondaryColor}]}>
                Your new password must be different from previously used passwords.
            </Text>

            {/* New Password Input Field */}
            <View style={[styles.inputContainer,{backgroundColor:colors.secondaryBg}]}>
                <Icon name="lock" size={24} color={colors.color} style={styles.icon} />
                <TextInput
                    style={[styles.input,{color:colors.color}]}
                    placeholder="New Password"
                    placeholderTextColor={colors.secondaryColor}
                    secureTextEntry={!isPasswordVisible}
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                >
                    <Icon name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color={colors.secondaryColor} />
                </TouchableOpacity>
            </View>

            {/* Confirm Password Input Field */}
            <View style={[styles.inputContainer,{backgroundColor:colors.secondaryBg}]}>
                <Icon name="lock" size={24} color={colors.color} style={styles.icon} />
                <TextInput
                    style={[styles.input,{color:colors.color}]}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.secondaryColor}
                    secureTextEntry={!isConfirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={(value) => setConfirmPassword(value)}
                />
                <TouchableOpacity
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    style={styles.eyeIcon}
                >
                    <Icon name={isConfirmPasswordVisible ? "visibility" : "visibility-off"} size={24} color={colors.secondaryColor} />
                </TouchableOpacity>
            </View>

            {/* Create Button */}
            <PrimaryButton title="Create" handler={createHandler}/>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        height: 50,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    eyeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ResetPasswordScreen;
