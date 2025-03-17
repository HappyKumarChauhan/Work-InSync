import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React, { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';
import Header from '../components/Header';

const PrivacyScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext);
    
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <Header navigation={navigation} title="Privacy Policy" />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.title, { color: colors.color }]}>Privacy Policy</Text>
                <Text style={[styles.text, { color: colors.color }]}>Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose your information.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>1. Information We Collect</Text>
                <Text style={[styles.text, { color: colors.color }]}>We may collect personal information such as your name, email, and usage data to improve our services.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>2. How We Use Your Information</Text>
                <Text style={[styles.text, { color: colors.color }]}>We use the collected information to provide and improve our services, enhance user experience, and ensure security.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>3. Data Security</Text>
                <Text style={[styles.text, { color: colors.color }]}>We take appropriate security measures to protect your personal data from unauthorized access.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>4. Third-Party Services</Text>
                <Text style={[styles.text, { color: colors.color }]}>Our app may contain links to third-party websites or services that have their own privacy policies.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>5. Changes to This Policy</Text>
                <Text style={[styles.text, { color: colors.color }]}>We may update this Privacy Policy from time to time. We encourage you to review it periodically.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>6. Changes to This Policy</Text>
                <Text style={[styles.text, { color: colors.color }]}>We may update this Privacy Policy from time to time. We encourage you to review it periodically.</Text>

                <Text style={[styles.subTitle, { color: colors.color }]}>7. Changes to This Policy</Text>
                <Text style={[styles.text, { color: colors.color }]}>We may update this Privacy Policy from time to time. We encourage you to review it periodically.</Text>

                <Text style={[styles.subTitle, { color: colors.color }]}>8. Changes to This Policy</Text>
                <Text style={[styles.text, { color: colors.color }]}>We may update this Privacy Policy from time to time. We encourage you to review it periodically.</Text>
                
                <Text style={[styles.text, { color: colors.color }]}>If you have any questions, feel free to contact us.</Text>
            </ScrollView>
        </View>
    );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
    },
    text: {
        fontSize: 14,
        // lineHeight: 16,
        marginTop: 5,
    },
});
