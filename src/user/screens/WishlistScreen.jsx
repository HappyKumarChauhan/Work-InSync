import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import Header from '../../components/Header';
import axios from '../../config/axios';
import LoadingModal from '../../components/LoadingModal';
import LinearGradient from 'react-native-linear-gradient';

const WishlistScreen = ({navigation}) => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/wishlist');
      setWishlist(response.data);
    } catch (error) {
      Alert.alert(
        'Error fetching properties:',
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlist();
  });

  const {colors} = useContext(ThemeContext);

  if (!wishlist) return <LoadingModal message="" visible={loading} />;
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header Section */}
      <Header navigation={navigation} title="My Wishlist" />
      {/* Section for Upcoming, Completed, and Cancelled */}
      <ScrollView style={styles.cardsContainer}>
        {wishlist.length === 0 ? (
          <Text
            style={{
              color: colors.color,
              textAlign: 'center',
              fontSize: 15,
              marginVertical: 10,
            }}>
            You have not added any property in the wishlist.
          </Text>
        ) : (
          wishlist.map((property, index) => (
            <LinearGradient
              key={index}
              colors={colors.cardBgColors}
              style={styles.card}>
              <Image
                style={styles.cardImage}
                source={{
                  uri: `${axios.defaults.baseURL}/${property.images[0]}`,
                }}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{property.title}</Text>
                <Text style={styles.cardDetails}>
                  INR: {property.price} {property.rentalType}
                </Text>
                <Text style={styles.cardDetails}>
                  Location: {property.location}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.detailsButton,
                    {backgroundColor: colors.Details},
                  ]}
                  onPress={() =>
                    navigation.navigate('RoomSpace', {
                      propertyId: property._id,
                    })
                  }>
                  <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 12,
  },
  cardImage: {
    height: '100%',
    flex: 1,
    borderRadius: 10,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDetails: {
    fontSize: 12,
    color: 'white',
    marginVertical: 2,
  },
  detailsButton: {
    marginTop: 10,
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
});

export default WishlistScreen;
