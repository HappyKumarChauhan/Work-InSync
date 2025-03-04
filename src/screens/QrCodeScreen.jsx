import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const QRCodeScreen = ({navigation}) => {
  const {colors} = useContext(ThemeContext);

  return (
    <LinearGradient colors={colors.bgGradient} style={[styles.container]}>
      {/* Header */}
      <Header title="QR Code" navigation={navigation} />

      {/* QR Scanner Section */}
      <View style={styles.qrContainer}>
        <View style={[styles.qrBorder, {backgroundColor: colors.qrBorder}]}>
          <View style={styles.qrInnerBox}>
            <Image
              source={{
                uri:
                  'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SampleQR',
              }}
              style={styles.qrImage}
            />
          </View>
          {/* Phone Icon (Bottom Left) */}
          <Icon
            name="phone-android"
            size={24}
            color={'white'}
            style={styles.phoneIcon}
          />
          {/* Camera Icon (Top Right) */}
          <Icon
            name="photo-camera"
            size={24}
            color={'white'}
            style={styles.cameraIcon}
          />
        </View>
        <Text style={[styles.scanText, {color: colors.color}]}>
          Scan QR Code For Booking
        </Text>
        <Text style={[styles.description, {color: colors.secondaryColor}]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      {/* OR Text with Lines */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={[styles.orText, {color: colors.secondaryColor}]}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* OTP Section */}
      <View style={styles.otpContainer}>
        <View
          style={[styles.inputContainer, {backgroundColor: colors.secondaryBg}]}
        >
          <Icon
            name="verified"
            size={20}
            color={colors.iconColor}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor={colors.secondaryColor}
            style={[styles.input, {color: colors.color}]}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={[styles.otpButton, {backgroundColor: colors.buttonBg}]}
        >
          <Text style={[styles.otpButtonText, {color: colors.buttonText}]}>
            Get OTP
          </Text>
        </TouchableOpacity>
        <Text style={styles.resendText}>
          Didn't receive any code?{' '}
          <Text style={[styles.resendLink, {color: colors.linkColor}]}>
            Resend Code
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    elevation: 5,
  },

  /* QR Code Section */
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrBorder: {
    width: 190,
    height: 190,
    borderRadius: 90,
    // backgroundColor: "#D3D3D3",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  qrInnerBox: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  qrImage: {
    width: 80,
    height: 80,
  },

  /* QR Code Icons */
  phoneIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 19,
  },
  cameraIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 15,
  },

  scanText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  /* OR Text with Lines */
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    textAlign: 'center',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },

  /* OTP Section */
  otpContainer: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },

  otpButton: {
    marginTop: 20,
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
  }, // Full width button
  otpButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  resendText: {
    marginTop: 10,
    color: 'gray',
  },
  resendLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default QRCodeScreen;
