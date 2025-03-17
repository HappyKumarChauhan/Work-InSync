import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React, { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';
import Header from '../components/Header';

const TermsOfUsageScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext);
    
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <Header navigation={navigation} title="Terms of Usage" />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.title, { color: colors.color }]}>Terms of Usage</Text>
                <Text style={[styles.text, { color: colors.color }]}>These Terms of Usage govern your use of our application. By accessing or using our app, you agree to comply with these terms.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>1. Acceptance of Terms</Text>
                <Text style={[styles.text, { color: colors.color }]}>By using this app, you agree to these Terms of Usage. If you do not agree, please discontinue use immediately.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>2. User Responsibilities</Text>
                <Text style={[styles.text, { color: colors.color }]}>You agree to use the app only for lawful purposes and not to engage in any activity that disrupts its functionality.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>3. Intellectual Property</Text>
                <Text style={[styles.text, { color: colors.color }]}>All content within this app, including text, graphics, and trademarks, is owned or licensed by us and protected by copyright laws.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>4. Limitation of Liability</Text>
                <Text style={[styles.text, { color: colors.color }]}>We are not responsible for any damages arising from the use of our app. Your use is at your own risk.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>5. Modifications to Terms</Text>
                <Text style={[styles.text, { color: colors.color }]}>We reserve the right to update these terms at any time. Continued use of the app implies acceptance of the revised terms.</Text>
                
                <Text style={[styles.text, { color: colors.color }]}>If you have any questions regarding these terms, feel free to contact us.</Text>
            </ScrollView>
        </View>
    );
};

export default TermsOfUsageScreen;

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
        fontSize: 12,
        marginTop: 5,
    },
});
