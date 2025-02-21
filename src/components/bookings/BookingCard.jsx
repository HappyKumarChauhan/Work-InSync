import React,{useContext} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../theme/ThemeContext';

const BookingCard = ({navigation}) => {
  const { colors } = useContext(ThemeContext)

    return (
        <LinearGradient
            colors={colors.cardBgColors}
            style={styles.card}
            start={{ x: 1, y: 0 }}  // Start gradient from right
            end={{ x: 0, y: 0 }}    // End gradient at left
        >
            <Image style={{ width: 120, height: 120, borderRadius: 10 }} source={{ uri: 'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TMDsE5eU3O9iUAJzhEBfpjIRTY2lbkTet6Gu2tWyQOMoVN61h2mMB36g6wklJB5e24ZBPm9ky5eT6Tg6ed2XVho-5j5rZAWr3PiAZgJv4E8iSovFmqT-m0DD-DsPXVOYLTjEMV7z5VDHadYJ-B717N5w3p3ckkmhw8aobUFnCla~wlQBwQx2YaSGhHlasAgueSnHHPw61HVYw3IiWSuz3VG7-S6otOkuda4BuzOFnVpPZfVEabFHS8fkz04Ypmeq9C51N-70quLH85wQopdC~77Uo178TyjsSh3iEcD7aQmJX9KAcUcgE~2oiCMBujZeRQEYDLJi116U4NqGIjqIog__' }} />
            <View style={styles.cardDescription}>
                <Text style={styles.cardTitle}>Title</Text>
                <Text style={styles.cardContent}>For: Self</Text>
                <Text style={styles.cardContent}>Desk: BM-8F-WS-25</Text>
                <TouchableOpacity
                    style={styles.cardButton}
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
      },
})