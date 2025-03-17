import React,{useContext} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../theme/ThemeContext';
import axios from '../../../config/axios';

const BookingCard = ({buttonText,booking,buttonClick}) => {
  const { colors } = useContext(ThemeContext)
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

    return (
        <LinearGradient
            colors={colors.cardBgColors}
            style={styles.card}
            start={{ x: 1, y: 0 }}  // Start gradient from right
            end={{ x: 0, y: 0 }}    // End gradient at left
        >
            <Image style={{ width: 120, height: 120, borderRadius: 10 }} source={{ uri: `${axios.defaults.baseURL}/${booking.property.images[0]}` }} />
            <View style={styles.cardDescription}>
                <Text style={styles.cardTitle}>{booking.property.title}</Text>
                <Text style={styles.cardContent}>Location: {booking.property.location}</Text>
                <Text style={styles.cardContent}>Start Date: {formatDate(booking.startDate)}</Text>
                <TouchableOpacity
                    style={[styles.cardButton,{backgroundColor:colors.Details}]}
                    onPress={buttonClick}
                >
                    <Text>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default BookingCard

const styles = StyleSheet.create({
    card: {
        marginBottom:15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10
      },
      cardDescription: {
        paddingHorizontal: 10,
        flex: 1,
      },
      cardTitle: {
        fontSize: 15,
        marginVertical: 5,
        color: 'white',
        fontWeight: 400,
      },
      cardContent: {
        marginVertical: 1,
        fontSize: 12,
        color: 'white',
        fontWeight: 400
      },
      cardButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
      },
})