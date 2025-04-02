import React, {useContext, useState} from 'react';
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
import axios from '../../config/axios';
import ThemeContext from '../../theme/ThemeContext';
import LoadingModal from '../LoadingModal';
import LinearGradient from 'react-native-linear-gradient';
import {signInWithGoogle} from '../../auth/googleAuth';
import {signInWithFacebook} from '../../auth/facebookAuth';
import {UserContext} from '../../context/UserContext';


const Main = ({role,navigation}) => {
  const {colors} = useContext(ThemeContext);
  const {login} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: role,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

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

    // Phone number validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
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

  const handleSignUp = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/user/register', formData);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LogIn');
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Placeholder functions for Google and Apple sign-in
  const handleGoogleSignUp = async () => {
    try {
      const {token} = await signInWithGoogle();
      setLoading(true);
      // Send token to backend
      const response = await axios.post('/auth/firebase-login', {
        token,
      });
      const responseToken = response.data.token;
      const userData = response.data.user;
      await login(userData, responseToken);
    } catch (error) {
      Alert.alert('Google Sign-In Failed:', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignUp = () => {
    console.log('Apple Sign Up Functionality');
    // Integrate Apple sign-in logic here
  };

  const handleFacebookSignUp = async () => {
    try {
      const {user, token} = await signInWithFacebook();
      console.log(token, user);
      setLoading(true);

      // Send token to backend for verification
      const response = await axios.post('/auth/firebase-login', {
        token,
      });
      const responseToken = response.data.token;
      const userData = response.data.user;
      await login(userData, responseToken);
    } catch (error) {
      Alert.alert('Google Sign-In Failed:', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={[styles.main]}>
      <Text style={[styles.title, {color: colors.color}]}>Sign Up {role}</Text>
      <View
        style={[styles.inputContainer, {backgroundColor: colors.secondaryBg}]}>
        <Icon name="person-outline" size={30} color={colors.color} />
        <TextInput
          style={[styles.input, {color: colors.color}]}
          placeholderTextColor={colors.secondaryColor}
          placeholder="Name"
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />
      </View>
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
        <Icon name="phone" size={30} color={colors.color} />
        <TextInput
          style={[styles.input, {color: colors.color}]}
          placeholderTextColor={colors.secondaryColor}
          keyboardType="numeric"
          placeholder="Phone"
          value={formData.phoneNumber}
          onChangeText={text => handleInputChange('phoneNumber', text)}
        />
      </View>
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <View
        style={[styles.inputContainer, {backgroundColor: colors.secondaryBg}]}>
        <Icon name="lock" size={30} color={colors.color} />
        <TextInput
          style={[styles.input, {color: colors.color}]}
          placeholderTextColor={colors.secondaryColor}
          placeholder="Password"
          secureTextEntry={!showPassword} // Toggle password visibility
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)} // Toggle the password visibility
        >
          <Icon
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color={colors.color}
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* sign up button  */}
      <PrimaryButton title="Create New Account" handler={handleSignUp} />

      {/* Sign Up With Section */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginTop: 15,
        }}>
        <View
          style={{
            height: 1,
            backgroundColor: colors.secondaryColor,
            width: '30%',
          }}></View>
        <Text style={[styles.socialSignUpText, {color: colors.secondaryColor}]}>
          Sign Up With
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: colors.secondaryColor,
            width: '30%',
          }}></View>
      </View>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity
          onPress={handleFacebookSignUp}
          style={styles.socialIconButton}>
          <Icon name="facebook" size={30} color={colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoogleSignUp}
          style={styles.socialIconButton}>
          <FAIcon name="google" size={30} color={colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAppleSignUp}
          style={styles.socialIconButton}>
          <Icon name="apple" size={30} color={colors.iconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.loginContainer}>
        <Text style={[styles.loginText, {color: colors.secondaryColor}]}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <Text style={[styles.loginButtonText, {color: colors.linkColor}]}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingModal visible={loading} message="" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
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
    opacity: 0.5,
  },
  errorText: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 12,
    marginTop: -8,
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
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#0066AD',
  },
});

export default Main;
