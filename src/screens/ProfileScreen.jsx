import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons from MaterialIcons
import ThemeContext from '../theme/ThemeContext';
import {UserContext} from '../context/UserContext';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import axios from '../config/axios'; // Assuming you're using axios for API calls
import LoadingModal from '../components/LoadingModal';

const ProfileScreen = ({navigation}) => {
  const {logout,user,profilePicture,fetchUser} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const uploadImage = async () => {
    if (!imageUri) return Alert.alert('Please select an image first');
    setLoading(true);
    setModalVisible(false);
    const formData = new FormData();
    formData.append('profilePicture', {
      uri: imageUri,
      type: 'image/jpeg', // Change this dynamically if needed
      name: `profile.jpg`,
    });

    try {
      const response = await axios.post('/user/upload-profile', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      Alert.alert('Photo Uploaded Successfully');
      fetchUser()
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
    } finally{
        setLoading(false)
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
  
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'You need to grant storage permission to select images.'
        );
        return false;
      }
    } else if (Platform.OS === 'ios') {
      const photoPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
  
      if (photoPermission !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'You need to grant photo library access to select images.'
        );
        return false;
      }
  
      if (cameraPermission !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'You need to grant camera access to take pictures.'
        );
        return false;
      }
    }
  
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    const callback = response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        console.error(response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        // setModalVisible(false);
      }
    };

    ImagePicker.launchImageLibrary(options, callback);
  };
  const {colors} = useContext(ThemeContext);
  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
    >
      {/* Back Icon and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconButton, {backgroundColor: colors.secondaryBg}]}
        >
          <Icon name="keyboard-arrow-left" size={30} color={colors.color} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, {color: colors.color}]}>
          My Profile
        </Text>
        <View></View>
      </View>

      {/* Profile Section */}
      <View style={styles.headerContainer}>
        <View style={styles.profileIcon}>
            {user?(<Image
            source={{uri: profilePicture}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />):(<Icon name="account-circle" color={colors.color} size={90} />)}
          
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="photo-camera" size={20} color={colors.color} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.profileName, {color: colors.color}]}>
          {user ? user.name:"Your Name"}
        </Text>
        <Text style={[styles.empId, {color: colors.secondaryColor}]}>
          Emp Id: {user ? user._id:"12879765"}
        </Text>
      </View>

      {/* Settings Title */}
      <Text style={[styles.settingsTitle, {color: colors.color}]}>
        Settings
      </Text>

      {/* Settings Section */}
      <View style={styles.settingsContainer}>
        {/* Personal Details Section */}
        <TouchableOpacity
          style={[styles.settingsOption, {backgroundColor: colors.secondaryBg}]}
          onPress={() => navigation.navigate('PersonalDetails')}
        >
          <View style={styles.settingsOptionContent}>
            <Icon name="person" size={24} color={colors.color} />
            <Text style={[styles.settingsText, {color: colors.color}]}>
              Personal Details
            </Text>
          </View>
          <Icon name="arrow-forward" size={24} color={colors.color} />
        </TouchableOpacity>
        {/* Privacy Section */}
        <TouchableOpacity
          style={[styles.settingsOption, {backgroundColor: colors.secondaryBg}]}
          onPress={() => navigation.navigate('Privacy')}
        >
          <View style={styles.settingsOptionContent}>
            <Icon name="lock" size={24} color={colors.color} />
            <Text style={[styles.settingsText, {color: colors.color}]}>
              Privacy
            </Text>
          </View>
          <Icon name="arrow-forward" size={24} color={colors.color} />
        </TouchableOpacity>

        {/* KYC Details Section */}
        <TouchableOpacity
          style={[styles.settingsOption, {backgroundColor: colors.secondaryBg}]}
          onPress={() => navigation.navigate('KYC')}
        >
          <View style={styles.settingsOptionContent}>
            <Icon name="verified" size={24} color={colors.color} />
            <Text style={[styles.settingsText, {color: colors.color}]}>
              KYC Details
            </Text>
          </View>
          <Icon name="arrow-forward" size={24} color={colors.color} />
        </TouchableOpacity>

        {/* Log Out Section */}
        <TouchableOpacity
          style={[styles.settingsOption, {backgroundColor: colors.secondaryBg}]}
          onPress={async () => {
            logout();
          }}
        >
          <View style={styles.settingsOptionContent}>
            <Icon name="exit-to-app" size={24} color={colors.color} />
            <Text style={[styles.settingsText, {color: colors.color}]}>
              Log Out
            </Text>
          </View>
          <Icon name="arrow-forward" size={24} color={colors.color} />
        </TouchableOpacity>
      </View>
      {/* Image Selection Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent,{backgroundColor:colors.background}]}>
            <Text style={[styles.modalTitle,{color:colors.color}]}>Update Profile Picture</Text>
            <TouchableOpacity
              onPress={pickImage}
              style={[styles.selectPictureButton,{borderColor:colors.secondaryColor}]}
            >
              {imageUri ? (
                <Image
                  source={{uri: imageUri}}
                  style={{width: 150, height: 150}}
                />
              ) : (
                <Icon name="add-a-photo" size={50} color={colors.secondaryColor} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.uploadPictureButton,{backgroundColor:colors.buttonBg}]}
              onPress={uploadImage}
            >
              <Text style={[styles.uploadPictureButtonText,{color:colors.buttonText}]}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => {
                setImageUri(null);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalCancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LoadingModal visible={loading} message='Uploading...'/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 1,
    color: '#000',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 1,
  },
  cameraIcon: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 3,
    position: 'absolute',
    bottom: 5,
    right: 1,
  },
  profileName: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
  },
  empId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  settingsOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10, // Space between the icon and the text
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 40 : 2, // Adjust margin for iOS
    backgroundColor: 'white',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(67, 67, 67, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectPictureButton: {
    width: 150,
    height: 150,
    margin: 5,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPictureButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#000',
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadPictureButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;