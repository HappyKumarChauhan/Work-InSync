import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';

const PasswordSuccessScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)
    const handleLoginClick=()=>{
        navigation.navigate('LogIn')
    }
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.content,{ backgroundColor: colors.secondaryBg, borderColor: colors.secondaryColor}]}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Icon name="check-circle" size={100} color={colors.color} />
                </View>

                {/* Success Message */}
                <Text style={[styles.Message, { color: colors.color }]}>
                    Successfully Created a
                </Text>
                <Text style={[styles.successMessage, { color: colors.color }]}>
                    New Password!!
                </Text>
            </View>
            {/* Login Button */}
            <PrimaryButton title="Back to Login" handler={handleLoginClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content:{
        alignItems: 'center',
        padding: 20, 
        borderRadius: 20, 
        borderWidth:0.5
    },
    iconContainer: {
        marginBottom: 20,
    },
    Message: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: 'black',
        textAlign: 'center',
        // marginBottom: 20,
    },
    successMessage: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default PasswordSuccessScreen;