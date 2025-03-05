import React,{useContext} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../theme/ThemeContext';

const BookingCard = ({navigation}) => {
  const { colors } = useContext(ThemeContext)

    return (
        <LinearGradient
            colors={colors.cardBgColors}
            style={styles.card}
            start={{ x: 1, y: 0 }}  // Start gradient from right
            end={{ x: 0, y: 0 }}    // End gradient at left
        >
            <Image style={{ width: 120, height: 120, borderRadius: 10 }} source={{ uri: 'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DQYmQNyPWjc6DUJtMI1YVVfTcjJvZjRy1dkPmWPzhTy66eCCOcsoEbk7eXn4Iiclbu9ANIg2SriPls8ts6CzJiU-3zt756xAeRxHbYwMsGRht4a2naoD3uafVC-jMcjPP5H8OG-GAf1DHMl-Re46YnmfCwbVPcD9tePODntVMerHdFi8Um1EYOMaPjbrhOBRZdXzmSHi-6--h0cEnGORvrcx944OlqK2xKI3aBaKsl6gO341IBq8q3ZV-LFb2SsXyDNT2t7KQmeS25SxGL~QXkugiMzDCcRazDe0d-5R6oTw~v~cHIxELqBW4lKgPeniIuwM3tIB7W0DkeSejDqv9w__' }} />
            <View style={styles.cardDescription}>
                <Text style={styles.cardTitle}>Title</Text>
                <Text style={styles.cardContent}>For: Self</Text>
                <Text style={styles.cardContent}>Desk: BM-8F-WS-25</Text>
                <TouchableOpacity
                    style={[styles.cardButton,{backgroundColor:colors.Details}]}
                    onPress={() => navigation.navigate('RoomSpace')}
                >
                    <Text>Book Now</Text>
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