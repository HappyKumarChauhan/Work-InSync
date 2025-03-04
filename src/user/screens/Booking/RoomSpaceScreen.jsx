import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../../../theme/ThemeContext';
import Header from '../../../components/Header';


const RoomSpaceScreen = ({ navigation }) => {
  const { colors} = useContext(ThemeContext)
  const [selectedImage, setSelectedImage] = useState(
    'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__'
  );

  const imageList = [
    'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__',
    'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__',
    'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__',
    'https://s3-alpha-sig.figma.com/img/0abf/9d1c/32df1966e2ce33e9f7138b85ab0dcecc?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VKo~nT4nLgT1pgW9Z~nGTryXNuhC2V0EBEvT5-DXnDn-VH0rIM88DDRAOkXJHMioOJVjP~No-gytyQQ~bxiui2xZJ5YYTZ~CiUoPz7l1S0h2opGQPQR9YoNtOIyePvbda8X4HWyvULbTP4NyA28nAyQ01bgBqVGTot1kvloZ3XdfRUL9c5O6pDx1h7~WR2tXJgdPgU1TnJRb7L4RByOkzj~tuKmwwpmVIFXlf3a5dSDy~yn0thnFHSRJQ03EsvC3eTDmoawOmual~znWGCaLDkO-nyB~6ttuLXmQaDpro7f0iDbuOqVQWm4SHLg1r4uZPgigvZPklOgLVJ6PyYl6PQ__',
    'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__',
    'https://s3-alpha-sig.figma.com/img/0abf/9d1c/32df1966e2ce33e9f7138b85ab0dcecc?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VKo~nT4nLgT1pgW9Z~nGTryXNuhC2V0EBEvT5-DXnDn-VH0rIM88DDRAOkXJHMioOJVjP~No-gytyQQ~bxiui2xZJ5YYTZ~CiUoPz7l1S0h2opGQPQR9YoNtOIyePvbda8X4HWyvULbTP4NyA28nAyQ01bgBqVGTot1kvloZ3XdfRUL9c5O6pDx1h7~WR2tXJgdPgU1TnJRb7L4RByOkzj~tuKmwwpmVIFXlf3a5dSDy~yn0thnFHSRJQ03EsvC3eTDmoawOmual~znWGCaLDkO-nyB~6ttuLXmQaDpro7f0iDbuOqVQWm4SHLg1r4uZPgigvZPklOgLVJ6PyYl6PQ__',
    'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__',

  ];

  const openMap = () => {
    const mapUrl = 'https://www.google.com/maps?q=Bengaluru+Brigade';
    Linking.openURL(mapUrl);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}> {/* White background for the whole page */}
      {/* Header Section */}
      <Header navigation={navigation} title="Room Space" />

      <ScrollView style={styles.container}>
        {/* Room Space Details */}
        <View >
          {/* Selected Image Container */}
          <View style={styles.imageContainer}>
            <Image style={styles.selectedImage} source={{ uri: selectedImage }} />
            {/* Wishlist Icon over the image */}
            <TouchableOpacity style={[styles.wishlistIcon,{backgroundColor:colors.secondaryBg}]}>
              <Icon name="favorite-border" size={30} color={colors.color} />
            </TouchableOpacity>
            {/* Image Slider */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.imageSlider,{backgroundColor:colors.background}]}>
              {imageList.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedImage(image)}>
                  <Image style={styles.sliderImage} source={{ uri: image }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* Room Details */}
          <View style={styles.roomDetails}>
            <Text style={[styles.roomTitle,{color:colors.color}]}>Bengaluru Brigade</Text>
            <View style={styles.locationRow}>
              <Icon name="location-on" size={20} color={colors.secondaryColor} />
              <Text style={[styles.locationText,{color:colors.secondaryColor}]}>Brigade Road, Bengaluru</Text>
              <TouchableOpacity style={[styles.mapButton,{borderColor:colors.linkColor}]} onPress={openMap}>
              <Text style={[styles.mapButtonText,{color:colors.linkColor}]}>Visit Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description Section with Bottom Border */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle,{color:colors.color}]}>Description</Text>
            <Text style={[styles.description,{color:colors.secondaryColor}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec suscipit turpis. Donec efficitur erat id ipsum sollicitudin, id posuere purus fringilla.</Text>
          </View>

          {/* Opening Hours Section with Icon */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="access-time" size={24} color={colors.color} style={styles.icon} />
              <Text style={[styles.sectionOpening,{color:colors.color}]}>Opening Hours</Text>
            </View>
            <Text style={[styles.openingHours,{color:colors.secondaryColor}]}>8:00 AM - 10:00 PM</Text>
          </View>

          {/* Amenities Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle,{color:colors.color}]}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              <Text style={[styles.amenity,{color:colors.secondaryColor}]}>✓ High-Speed WiFi</Text>
              <Text style={[styles.amenity,{color:colors.secondaryColor}]}>✓ Projector</Text>
              <Text style={[styles.amenity,{color:colors.secondaryColor}]}>✓ White Board</Text>
              <Text style={[styles.amenity,{color:colors.secondaryColor}]}>✓ Air Conditioner</Text>
              <Text style={[styles.amenity,{color:colors.secondaryColor}]}>✓ Meeting Rooms</Text>
              <Text style={[styles.amenity,{color:colors.secondaryColor}]}>✓ Coffee Machine</Text>
            </View>
          </View>
          </View>
      </ScrollView>

      {/* Forward Icon (bottom-right corner) */}
      <TouchableOpacity
        style={[styles.forwardIcon,{backgroundColor:colors.secondaryBg}]}
        onPress={() => navigation.navigate('CheckInOut')} // Modify with your actual next page
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
    marginVertical:10,
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
    marginRight:5,
  },
  sliderImage: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  roomDetails: {
    paddingVertical: 12,
    paddingHorizontal:10,
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
    paddingHorizontal:10,
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
    paddingHorizontal:4
    
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
