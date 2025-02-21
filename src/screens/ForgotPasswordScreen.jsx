import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import PrimaryButton from '../components/PrimaryButton';

const ForgotPasswordScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)
    const sendHandler = () => {
        navigation.navigate('Verification')
    }
    return (
        <ImageBackground
            source={{ uri: 'https://cdn.decoist.com/wp-content/uploads/2015/08/Upholstered-daybed-for-the-contemporary-home-office.jpg' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <Text style={[styles.title, { color: colors.color }]}>Forgot Password?</Text>
                    <Text style={[styles.description, { color: colors.secondaryColor }]}>Enter your registered email below to recieve password reset instruction</Text>
                    <View style={[styles.inputContainer, { backgroundColor: colors.secondaryBg }]}>
                        <Icon name="mail" size={30} color={colors.color} />
                        <TextInput
                            style={[styles.input, { color: colors.color }]}
                            placeholder="Your Email"
                            placeholderTextColor={colors.secondaryColor}
                        />
                    </View>

                    {/* Send Code button  */}
                    <PrimaryButton title="Send Code" handler={sendHandler} />

                    <TouchableOpacity onPress={() => { navigation.navigate('LogIn') }} style={styles.backButton}>
                        <Text style={[styles.backButtonText, { color: colors.linkColor }]}>Back to LogIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 35,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#606060',
    },
    inputContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        paddingLeft: 10,
    },
    backButton: {
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 14,
        color: 'blue',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        //   alignItems: 'center',
        // opacity:0.6,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(12, 25, 34, 0.6)',
        // paddingHorizontal: 0,
    },
});

export default ForgotPasswordScreen;
