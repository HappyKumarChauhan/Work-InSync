import React, {useContext, useState,useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../theme/ThemeContext';
import MapView, {Marker} from 'react-native-maps';
import axios from '../../config/axios'

const Dashboard = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mainHeight] = useState(new Animated.Value(300)); // Initial height of the main section
  const [isExpanded, setIsExpanded] = useState(false);
  const [properties, setProperties] = useState([])

  const {colors,theme} = useContext(ThemeContext);

  const screenHeight = Dimensions.get('window').height; // Get screen height
  const locations = [
    {id: 1, title: 'Delhi', latitude: 28.7041, longitude: 77.1025},
    {id: 2, title: 'Mumbai', latitude: 19.076, longitude: 72.8777},
    {id: 3, title: 'Bangalore', latitude: 12.9716, longitude: 77.5946},
    {id: 4, title: 'Hyderabad', latitude: 17.385, longitude: 78.4867},
    {id: 5, title: 'Chennai', latitude: 13.0827, longitude: 80.2707},
    {id: 6, title: 'Taj Mahal, Agra', latitude: 27.1751, longitude: 78.0421},
    {id: 7, title: 'Jaipur', latitude: 26.9124, longitude: 75.7873},
    {id: 8, title: 'Goa (Baga Beach)', latitude: 15.5524, longitude: 73.7515},
    {id: 9, title: 'Varanasi', latitude: 25.3176, longitude: 82.9739},
    {id: 10, title: 'Kolkata', latitude: 22.5726, longitude: 88.3639},
  ];

  const expandMain = () => {
    Animated.timing(mainHeight, {
      toValue: screenHeight * 0.92,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsExpanded(true);
  };

  const collapseMain = () => {
    Animated.timing(mainHeight, {
      toValue: 300,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsExpanded(false);
  };

  // PanResponder for swipe to expand/collapse the main section
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < -50 && !isExpanded) {
        expandMain();
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 50 && isExpanded) {
        collapseMain();
      }
    },
  });
  const darkModeStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    }
  ];
  const lightModeStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "rgb(0,0,0)"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e0e0e0"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    }
  ];
    
  const fetchProperties=async()=>{
    try {
      const response = await axios.get('/properties');
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          {/* MapView should not contain UI elements */}
          <MapView
          customMapStyle={theme==='dark' ? darkModeStyle : lightModeStyle}
            style={styles.background}
            initialRegion={{
              latitude: 28.7041, // Default center latitude (change to your needs)
              longitude: 77.1025, // Default center longitude
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {locations.map(location => (
              <Marker
                key={location.id}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={location.title}
              />
            ))}
          </MapView>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={styles.topBarButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.topBarButton,
                  {backgroundColor: colors.secondaryBg},
                ]}
                onPress={() => navigation.openDrawer()}
              >
                <Icon name="menu" size={30} color={colors.color} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.topBarButton,
                  {backgroundColor: colors.secondaryBg},
                ]}
                onPress={() => navigation.navigate('Notification')}
              >
                <Icon name="notifications" size={30} color={colors.color} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.searchBarTop,
                {backgroundColor: colors.secondaryBg},
              ]}
            >
              <Icon name="search" size={24} color={colors.color} />
              <TextInput
                style={styles.searchInputTop}
                placeholder="Search"
                placeholderTextColor={colors.color}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          {/* Expandable Bottom Section */}
          <Animated.View style={[styles.main, {height: mainHeight}]}>
            <LinearGradient
              colors={colors.bgGradient}
              style={styles.gradientView}
            >
              {/* Swipe to Expand */}
              <View style={styles.swipeSection} {...panResponder.panHandlers}>
                <View style={styles.swipeBar}>
                  <View
                    style={[
                      styles.swipeIndicator,
                      {backgroundColor: colors.color},
                    ]}
                  />
                  <Text style={[styles.swipeText, {color: colors.color}]}>
                    Swipe Up
                  </Text>
                </View>
              </View>

              {/* Scrollable Content */}
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
              >
                <View style={styles.otherContent}>
                  {properties.map((property, index) => (
                    <LinearGradient
                      key={index}
                      colors={colors.cardBgColors}
                      style={styles.card}
                    >
                      <Image
                        style={styles.cardImage}
                        source={{
                          uri:`${axios.defaults.baseURL}/${property.images[0]}`,
                        }}
                      />
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{property.title}</Text>
                        <Text style={styles.cardDetails}>INR: {property.price} {property.rentalType}</Text>
                        <Text style={styles.cardDetails}>
                          Location: {property.location}
                        </Text>
                        <TouchableOpacity
                          style={[
                            styles.detailsButton,
                            {backgroundColor: colors.Details},
                          ]}
                          onPress={() => navigation.navigate('RoomSpace',{propertyId:property._id})}
                        >
                          <Text style={styles.detailsButtonText}>Details</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  ))}
                </View>
              </ScrollView>
            </LinearGradient>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(12, 25, 34, 0.1)',
    borderWidth: 5,
    borderColor: 'red',
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
  },
  topBarButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  searchBarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  searchInputTop: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  main: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  gradientView: {
    paddingTop: 20,
    paddingHorizontal: 25,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // swipeSection: {
  //   marginTop: 30,
  // },
  swipeSection: {
    // You can customize your swipe section container as needed.
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  swipeBar: {
    width: '100%',
    height: 30, // Adjust based on your design
    // backgroundColor: '#fff', // Background color for the bar
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Optional, for rounded corners
    // paddingVertical: 10,
  },
  swipeIndicator: {
    width: 40, // Adjust width of the line
    height: 2, // Height of the indicator line
    borderRadius: 1, // Optional, for rounded corners of the line
    marginBottom: 5, // Space between the line and the text
  },
  swipeText: {
    fontSize: 12, // Small font size
    fontWeight: '300', // Light weight
    color: '#000', // Text color
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 15,
    paddingVertical: 24,
    paddingHorizontal:20,
    marginVertical: 12,
    height: 210,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDetails: {
    fontSize: 14,
    color: 'white',
    marginVertical: 2,
  },
  detailsButton: {
    marginTop: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    // backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
  },
  detailsButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#0C1922',
    zIndex: 10,
  },
  otherContent: {
    // padding: 20,
  },
});

export default Dashboard;
