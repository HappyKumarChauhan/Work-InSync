import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../../theme/ThemeContext';
import Header from '../../../components/Header';
import axios from '../../../config/axios'


const RoomSpaceScreen = ({ navigation, route }) => {
  const [property, setProperty] = useState(null)
  const { propertyId } = route.params;
  const { colors } = useContext(ThemeContext)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(null)
    fetchProperty()
  }, [propertyId])

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/properties/${propertyId}`);
      setProperty(response.data)
      setSelectedImage(`${axios.defaults.baseURL}${response.data.images[0]}`)
    } catch (error) {
      console.error('Error fetching properties:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  const openMap = () => {
    const mapUrl = 'https://www.google.com/maps?q=Bengaluru+Brigade';
    Linking.openURL(mapUrl);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}> {/* White background for the whole page */}
      {/* Header Section */}
      <Header navigation={navigation} title="Room Space" />

      {property && <ScrollView style={styles.container}>
        {/* Room Space Details */}
        <View >
          {/* Selected Image Container */}
          <View style={styles.imageContainer}>
            <Image style={styles.selectedImage} source={{ uri: selectedImage }} />
            {/* Wishlist Icon over the image */}
            <TouchableOpacity style={[styles.wishlistIcon, { backgroundColor: colors.secondaryBg }]}>
              <Icon name="favorite-border" size={30} color={colors.color} />
            </TouchableOpacity>
            {/* Image Slider */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.imageSlider, { backgroundColor: colors.background }]}>
              {property.images.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedImage(`${axios.defaults.baseURL}/${image}`)}>
                  <Image style={styles.sliderImage} source={{ uri: `${axios.defaults.baseURL}/${image}` }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* Room Details */}
          <View style={styles.roomDetails}>
            <Text style={[styles.roomTitle, { color: colors.color }]}>{property.title}</Text>
            <View style={styles.locationRow}>
              <Icon name="location-on" size={20} color={colors.secondaryColor} />
              <Text style={[styles.locationText, { color: colors.secondaryColor }]}>{property.location}</Text>
              <TouchableOpacity style={[styles.mapButton, { borderColor: colors.linkColor }]} onPress={openMap}>
                <Text style={[styles.mapButtonText, { color: colors.linkColor }]}>Visit Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description Section with Bottom Border */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.color }]}>Description</Text>
            <Text style={[styles.description, { color: colors.secondaryColor }]}>{property.description}</Text>
          </View>

          {/* Opening Hours Section with Icon */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="access-time" size={24} color={colors.color} style={styles.icon} />
              <Text style={[styles.sectionOpening, { color: colors.color }]}>Opening Hours</Text>
            </View>
            <Text style={[styles.openingHours, { color: colors.secondaryColor }]}>8:00 AM - 10:00 PM</Text>
          </View>

          {/* Amenities Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.color }]}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => (<Text style={[styles.amenity, { color: colors.secondaryColor }]}>✓ {amenity}</Text>))}
            </View>
          </View>
        </View>
      </ScrollView>}

      {/* Forward Icon (bottom-right corner) */}
      <TouchableOpacity
        style={[styles.forwardIcon, { backgroundColor: colors.secondaryBg }]}
        onPress={() => navigation.navigate('CheckInOut',{property})} // Modify with your actual next page
      >
        <Icon name="arrow-forward" size={30} color={colors.color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 2,
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedImage: {
    width: '100%',
    height: 300,
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  imageSlider: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    backgroundColor: "white",
    padding: 4,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  sliderImage: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  roomDetails: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#052659',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'gray',
  },
  mapButton: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginLeft: 'auto',
    paddingBottom: 4,
  },
  mapButtonText: {
    fontSize: 14,
    color: 'blue',
  },
  sectionContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#052659',

  },
  sectionOpening: {
    fontSize: 18,
    fontWeight: '600',
    color: '#052659',
    paddingHorizontal: 4

  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  // icon: {
  //   marginBottom: 6,  // Bottom margin
  //   marginRight: 6,   // Right margin
  // },

  openingHours: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenity: {
    width: '48%',
    fontSize: 14,
    marginBottom: 8,
    color: 'gray',
  },
  forwardIcon: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#052659',
    padding: 8,
    borderRadius: 50,
    elevation: 5,

  },
});

export default RoomSpaceScreen;
