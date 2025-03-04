import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ThemeContext from '../../theme/ThemeContext';
import Header from '../components/Header';

const UploadScreen = ({ navigation,route }) => {
  const { colors } = useContext(ThemeContext);
  const [photos, setPhotos] = useState([]);
  const {propertyId} =route.params;
  
  // Request Camera Permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Request Storage Permission (Android 13+)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Open Camera
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required to take photos.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const newPhoto = {
          id: Date.now().toString(),
          name: response.assets[0].fileName || 'New Photo',
          size: (response.assets[0].fileSize / 1024 / 1024).toFixed(2) + ' MB',
          uri: response.assets[0].uri,
        };
        setPhotos(prev => [...prev, newPhoto]);
      }
    });
  };

  // Open Gallery
  const openGallery = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage access is required to upload photos.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const newPhoto = {
          id: Date.now().toString(),
          name: response.assets[0].fileName || 'New Photo',
          size: (response.assets[0].fileSize / 1024 / 1024).toFixed(2) + ' MB',
          uri: response.assets[0].uri,
        };
        setPhotos(prev => [...prev, newPhoto]);
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Header title="Upload" navigation={navigation} />

      <View style={styles.main}>
        <Text style={[styles.sectionTitle, { color: colors.color }]}>Upload File or Take Photos</Text>
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.secondaryBg }]} onPress={openCamera}>
            <View style={[styles.iconCircle, { backgroundColor: colors.buttonBg }]}>
              <Icon name="photo-camera" size={24} color={colors.buttonText} />
            </View>
            <Text style={{ color: colors.color }}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.secondaryBg }]} onPress={openGallery}>
            <View style={[styles.iconCircle, { backgroundColor: colors.buttonBg }]}>
              <Icon name="cloud-upload" size={24} color={colors.buttonText} />
            </View>
            <Text style={{ color: colors.color }}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[styles.photoCard, { backgroundColor: colors.secondaryBg }]}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <View style={styles.photoInfo}>
              <Text style={[styles.photoName, { color: colors.color, flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={[styles.photoSize, { color: colors.secondaryColor }]}>{item.size}</Text>
            </View>
            <TouchableOpacity onPress={() => setPhotos(photos.filter(photo => photo.id !== item.id))}>
              <Icon name="close" size={20} color={colors.color} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={[styles.nextButton, { backgroundColor: colors.buttonBg }]} onPress={() => navigation.navigate('PropertyDetails')}>
        <Text></Text>
        <Text style={[styles.nextButtonText, { color: colors.buttonText }]}>Next</Text>
        <Icon name="chevron-right" size={24} color={colors.buttonText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { marginHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 16, paddingBottom: 10 },
  uploadContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
  uploadButton: { alignItems: 'center', flex: 1, marginHorizontal: 5, paddingVertical: 20, borderRadius: 10, elevation: 3 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  listContainer: { paddingHorizontal: 20 },
  photoCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomColor: '#000000', borderRadius: 8, marginVertical: 5, elevation: 5 },
  photo: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  nextButton: { flexDirection: 'row', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', margin: 20 },
  nextButtonText: { fontSize: 16, marginRight: 5 },
});

export default UploadScreen;