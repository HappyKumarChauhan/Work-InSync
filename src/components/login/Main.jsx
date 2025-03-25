import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../PrimaryButton';
import ThemeContext from '../../theme/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import axios from '../../config/axios';
import LoadingModal from '../LoadingModal'; // Import LoadingModal
import {UserContext} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithGoogle } from '../../auth/googleAuth';

const Main = ({navigation}) => {
  const {colors} = useContext(ThemeContext);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {login} = useContext(UserContext);

  const loadRememberedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      const savedPassword = await AsyncStorage.getItem('savedPassword');
      if (savedEmail && savedPassword) {
        setFormData({
          email: savedEmail,
          password: savedPassword,
          rememberMe: true,
        });
      }
    } catch (error) {
      console.error('Failed to load remembered credentials', error);
    }
  };

  useEffect(() => {
    loadRememberedCredentials();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const validateInputs = () => {
    const newErrors = {};
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation (minimum 6 characters)
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    setErrors(newErrors);

    // If there are no errors, return true
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true); // Show loading modal

    try {
      const response = await axios.post('/user/login', formData);
      const token = response.data.token;
      const userData = response.data.user;
      await login(userData, token);
      if (formData.rememberMe) {
        await AsyncStorage.setItem('savedEmail', formData.email);
        await AsyncStorage.setItem('savedPassword', formData.password);
      } else {
        await AsyncStorage.removeItem('savedEmail');
        await AsyncStorage.removeItem('savedPassword');
      }
    } catch (error) {
      console.log(error.response);
      Alert.alert('Error', 'Invalid credentials, please try again.');
    } finally {
      setLoading(false); // Hide loading modal
    }
  };
  const handleGoogleLogin=async()=>{
    try {
      const {token} = await signInWithGoogle();
      setLoading(true)
      // Send token to backend
      const response = await axios.post('/auth/firebase-login', {
        token,
      });
      const responseToken = response.data.token;
      const userData = response.data.user;
      await login(userData, responseToken);
    } catch (error) {
      Alert.alert('Google Sign-In Failed:', error.response?.data?.message);
    }finally{
      setLoading(false)
    }
  }

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.main}>
      <Text style={[styles.title, {color: colors.color}]}>Log In</Text>

      <View
        style={[styles.inputContainer, {backgroundColor: colors.secondaryBg}]}>
        <Icon name="mail" size={30} color={colors.color} />
        <TextInput
          style={[styles.input, {color: colors.color}]}
          placeholderTextColor={colors.secondaryColor}
          placeholder="Email"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View
        style={[styles.inputContainer, {backgroundColor: colors.secondaryBg}]}>
        <Icon name="lock" size={30} color={colors.color} />
        <TextInput
          style={[styles.input, {color: colors.color}]}
          placeholderTextColor={colors.secondaryColor}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color={colors.color}
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <View style={styles.rememberForgotContainer}>
        <TouchableOpacity
          style={styles.rememberButton}
          onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}>
          <Icon
            name={formData.rememberMe ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={colors.color}
          />
          <Text style={{color: colors.color}}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={[styles.forgotPasswordText, {color: colors.linkColor}]}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton title="Log In" handler={handleLogin} />

      <View style={styles.orContainer}>
        <View style={styles.orLine}></View>
        <Text style={[styles.socialSignInText, {color: colors.secondaryColor}]}>
          Sign In With
        </Text>
        <View style={styles.orLine}></View>
      </View>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialIconButton}>
          <Icon name="facebook" size={30} color={colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconButton} onPress={handleGoogleLogin}>
          <FAIcon name="google" size={30} color={colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconButton}>
          <Icon name="apple" size={30} color={colors.iconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={[styles.signUpText, {color: colors.secondaryColor}]}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp', {role: 'Normal'})}>
          <Text style={[styles.signUpButtonText, {color: colors.linkColor}]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingModal visible={loading} message="" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#f3f3f3',
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
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
  },
  eyeButton: {
    padding: 5,
    opacity: 0.5,
  },
  errorText: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 12,
    marginTop: -8,
  },
  rememberForgotContainer: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 15,
  },
  orLine: {
    height: 1,
    backgroundColor: '#B8B8B8',
    width: '30%',
  },
  socialSignInText: {
    fontSize: 14,
    fontWeight: '600',
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
  },
  signUpButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066AD',
  },
});

export default Main;
