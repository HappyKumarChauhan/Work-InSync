import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../theme/ThemeContext';

const UserSelectionScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext);

    return (
        <ImageBackground
            source={{ uri: 'https://cdn.decoist.com/wp-content/uploads/2015/08/Upholstered-daybed-for-the-contemporary-home-office.jpg' }}
            style={styles.background}
        >
            <LinearGradient colors={colors.layoutBgColors} style={styles.overlay}>
                <View style={styles.main}>
                    <Text style={[styles.primaryHeading]}>Choose Your Role</Text>
                    <Text style={[styles.secondaryHeading]}>Select your account type to proceed</Text>
                    
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.buttonBg }]}
                        onPress={() => navigation.navigate('SignUp',{role:'Normal'})}
                    >
                        <Text style={[styles.buttonText, { color: colors.buttonText }]}>I'm a Normal User</Text>
                        <Icon name="person" size={30} color={colors.buttonText} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.buttonBg, marginTop: 20 }]}
                        onPress={() => navigation.navigate('SignUp',{role:'PropertyOwner'})}
                    >
                        <Text style={[styles.buttonText, { color: colors.buttonText }]}>I'm a Property Owner</Text>
                        <Icon name="business" size={30} color={colors.buttonText} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        paddingHorizontal: 40,
        paddingVertical: 80,
    },
    primaryHeading: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 30,
        paddingVertical: 5,
    },
    secondaryHeading: {
        color: 'white',
        paddingVertical: 5,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 58,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserSelectionScreen;