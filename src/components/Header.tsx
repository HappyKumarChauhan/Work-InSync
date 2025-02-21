import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useContext} from 'react'
import ThemeContext from '../theme/ThemeContext'
import Icon from 'react-native-vector-icons/MaterialIcons';


const Header = ({navigation, title}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton, { backgroundColor: colors.secondaryBg }]}>
                <Icon name="keyboard-arrow-left" size={30} color={colors.color} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.color }]}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={[styles.iconButton, { backgroundColor: colors.secondaryBg }]}>
                <Icon name="notifications" size={30} color={colors.color} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginTop: 25,
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: Platform.OS === 'ios' ? 40 : 20,  // Adjust margin for iOS
        backgroundColor: 'white',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
    },
})