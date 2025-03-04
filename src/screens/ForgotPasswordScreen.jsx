import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPasswordScreen = ({navigation}) => {
  const {colors} = useContext(ThemeContext);
  const sendHandler = () => {
    navigation.navigate('Verification');
  };
  return (
    <LinearGradient colors={colors.bgGradient} style={[styles.container]}>
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.iconButton, {backgroundColor: colors.secondaryBg}]}
      >
        <Icon name="keyboard-arrow-left" size={30} color={colors.color} />
      </TouchableOpacity>
      <Text style={[styles.title, {color: colors.color}]}>
        Forgot Password?
      </Text>
      <Text style={[styles.description, {color: colors.secondaryColor}]}>
        Enter your registered email below to recieve password reset instruction
      </Text>
      <View
        style={[styles.inputContainer, {backgroundColor: colors.secondaryBg}]}
      >
        <Icon name="mail" size={30} color={colors.color} />
        <TextInput
          style={[styles.input, {color: colors.color}]}
          placeholder="Your Email"
          placeholderTextColor={colors.secondaryColor}
        />
      </View>
      {/* Send Code button  */}
      <PrimaryButton title="Send Code" handler={sendHandler} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LogIn');
        }}
        style={styles.backButton}
      >
        <Text style={[styles.backButtonText, {color: colors.linkColor}]}>
          Back to LogIn
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 40 : 20, // Adjust margin for iOS
    backgroundColor: 'white',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  title: {
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#606060',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    paddingLeft: 10,
  },
  backButton: {
    width:'100%',
    alignItems:'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 14,
    color: 'blue',
  },
});

export default ForgotPasswordScreen;
