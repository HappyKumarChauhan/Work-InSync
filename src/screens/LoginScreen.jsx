import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../context/UserContext';
import axios from '../config/axios';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LogInScreen = ({ navigation }) => {
    const {login}=useContext(UserContext);
    const { colors } = useContext(ThemeContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        try {
            const response = await axios.post('/user/login', { email, password });
            if (response.status === 200) {
                console.log(response.data)
                const { user, token } = response.data;
                await AsyncStorage.setItem('authToken', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                login(user, token);
                Alert.alert('Success', 'Logged in successfully!');
                navigation.navigate('Dashboard');
            }
        } catch (error) {
            Alert.alert('Error', 'Invalid credentials, please try again.');
            console.error(error);
        }
    };


    return (
        <ImageBackground
            source={{ uri: 'https://cdn.decoist.com/wp-content/uploads/2015/08/Upholstered-daybed-for-the-contemporary-home-office.jpg' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ backgroundColor: 'gray', borderRadius: 5, marginRight: 5 }}>
                        <Icon name='keyboard-double-arrow-right' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <LinearGradient colors={colors.bgGradient} style={[styles.main]}>
                    <Text style={[styles.title, { color: colors.color }]}>Log In</Text>
                    <View style={[styles.inputContainer, { backgroundColor: colors.secondaryBg }]}>
                        <Icon name="mail" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholderTextColor={colors.secondaryColor}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={[styles.inputContainer, { backgroundColor: colors.secondaryBg }]}>
                        <Icon name="lock" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholderTextColor={colors.secondaryColor}
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.eyeButton} onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color={colors.color} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', padding: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={styles.rememberButton}
                            onPress={() => { setRememberMe(!rememberMe) }}
                        >
                            <Icon name={rememberMe ? 'check-box' : 'check-box-outline-blank'} size={24} color={colors.color} />
                            <Text style={{ color: colors.color }}>Remember Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('ForgotPassword') }}
                        >
                            <Text style={[styles.forgotPasswordText, { color: colors.linkColor }]}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>

                    {/* login button  */}
                    <PrimaryButton title="Log In" handler={handleLogin} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop:15 }}>
                        <View style={{ height: 1, backgroundColor: colors.secondaryColor, width: '30%' }}></View>
                        <Text style={[styles.socialSignInText, { color: colors.secondaryColor }]}>Sign In With</Text>
                        <View style={{ height: 1, backgroundColor: colors.secondaryColor, width: '30%' }}></View>
                    </View>
                    <View style={styles.socialIconsContainer}>
                        <TouchableOpacity style={styles.socialIconButton}>
                            <Icon name="facebook" size={30} color={colors.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.socialIconButton}>
                            <FAIcon name="google" size={30} color={colors.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIconButton}>
                            <Icon name="apple" size={30} color={colors.iconColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signUpContainer}>
                        <Text style={[styles.signUpText, { color: colors.secondaryColor }]}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={[styles.signUpButtonText, { color: colors.linkColor }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
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
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 27,
        paddingVertical: 5,
    },
    inputContainer: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
    eyeButton: {
        padding: 1,
        opacity:0.5
    },
    rememberButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    forgotPasswordText: {
        textDecorationLine: 'underline'
    },
    socialSignInText: {
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
    signUpContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 4,
    },
    signUpText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0066AD',
    },
    signUpButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LogInScreen;