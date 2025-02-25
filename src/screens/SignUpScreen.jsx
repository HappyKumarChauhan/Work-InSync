import React, { useContext, useEffect, useState, } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../config/axios'; // Assuming you're using axios for API calls
import { AppleButton } from '@invertase/react-native-apple-authentication'; // For Apple Sign In
import FAIcon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import { UserContext } from '../context/UserContext';

const SignUpScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext);
    const {user}=useContext(UserContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    useEffect(() => {
        if (user) {
            navigation.navigate('Dashboard');
        }
    }, [user]);

    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post('/user/register', formData); // Replace with your API URL
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('LogIn');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to create account. Please try again.');
        }
    };

    // Placeholder functions for Google and Apple sign-in
    const handleGoogleSignUp = () => {
        console.log("Google Sign Up Functionality");
        // Integrate Google sign-in logic here
    };

    const handleAppleSignUp = () => {
        console.log("Apple Sign Up Functionality");
        // Integrate Apple sign-in logic here
    };

    const handleFacebookSignUp = () => {
        console.log("Facebook Sign Up Functionality");
        // Integrate Facebook sign-in logic here
    };

    return (
        <ImageBackground
            source={{ uri: 'https://cdn.decoist.com/wp-content/uploads/2015/08/Upholstered-daybed-for-the-contemporary-home-office.jpg' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Dashboard') }}
                        style={{ backgroundColor: 'gray', borderRadius: 5, marginRight: 5 }}>
                        <Icon name='keyboard-double-arrow-right' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.main, { backgroundColor: colors.background }]}>
                    <Text style={[styles.title, { color: colors.color }]}>Sign Up</Text>
                    <View style={[styles.inputContainer,{ backgroundColor: colors.secondaryBg }]}>
                        <Icon name="person-outline" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholderTextColor={colors.secondaryColor}
                            placeholder="Name"
                            value={formData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                    </View>
                    <View style={[styles.inputContainer,{ backgroundColor: colors.secondaryBg }]}>
                        <Icon name="mail" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholderTextColor={colors.secondaryColor}
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>
                    <View style={[styles.inputContainer,{ backgroundColor: colors.secondaryBg }]}>
                        <Icon name="phone" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholderTextColor={colors.secondaryColor}
                            placeholder="Phone"
                            value={formData.phoneNumber}
                            onChangeText={(text) => handleInputChange('phoneNumber', text)}
                        />
                    </View>
                    <View style={[styles.inputContainer,{ backgroundColor: colors.secondaryBg }]}>
                        <Icon name="lock" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholderTextColor={colors.secondaryColor}
                            placeholder="Password"
                            secureTextEntry={!showPassword} // Toggle password visibility
                            value={formData.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)} // Toggle the password visibility
                        >
                            <Icon
                                name={showPassword ? "visibility" : "visibility-off"}
                                size={24}
                                color={colors.color}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* sign up button  */}
                    <PrimaryButton title="Create New Account" handler={handleSignUp} />

                    {/* Sign Up With Section */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop:15  }}>
                        <View style={{ height: 1, backgroundColor: colors.secondaryColor, width: '30%' }}></View>
                        <Text style={[styles.socialSignUpText, { color: colors.secondaryColor }]}>Sign Up With</Text>
                        <View style={{ height: 1, backgroundColor: colors.secondaryColor, width: '30%' }}></View>
                    </View>
                    <View style={styles.socialIconsContainer}>
                        <TouchableOpacity onPress={handleFacebookSignUp} style={styles.socialIconButton}>
                            <Icon name="facebook" size={30} color={'blue'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleGoogleSignUp} style={styles.socialIconButton}>
                            <FAIcon name="google" size={30} color={colors.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAppleSignUp} style={styles.socialIconButton}>
                            <Icon name="apple" size={30} color={colors.iconColor} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={[styles.loginText, { color: colors.secondaryColor }]}>Already have an account?</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('LogIn') }}>
                            <Text style={[styles.loginButtonText, { color: colors.linkColor }]}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(12, 25, 34, 0.6)',
    },
    main: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 35,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 27,
        paddingVertical: 5,
    },
    inputContainer: {
        backgroundColor: 'white',
        width:'100%',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: 'black',
    },
    eyeButton: {
        padding: 5,
        opacity:0.5
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        width: 310,
        height: 48,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    socialSignUpText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#606060',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 5,
    },
    socialIconButton: {
        padding: 10,
        borderColor: '#B8B8B8',
    },
    loginContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 4,
    },
    loginText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0066AD',
        
    },
    loginButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine:'underline'
    }
});

export default SignUpScreen;
