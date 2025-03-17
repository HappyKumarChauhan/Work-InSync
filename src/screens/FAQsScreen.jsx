import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React, { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';
import Header from '../components/Header';

const FAQsScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext);
    
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <Header navigation={navigation} title="FAQs" />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.title, { color: colors.color }]}>Frequently Asked Questions</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>1. How do I book a space?</Text>
                <Text style={[styles.text, { color: colors.color }]}>To book a space, browse available listings, select your preferred location, choose a date, and confirm your booking through the app.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>2. How can I list my property?</Text>
                <Text style={[styles.text, { color: colors.color }]}>If you are a property owner, go to the 'List Property' section, provide details, upload photos, set a price, and submit your listing for approval.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>3. Can I modify my booking after confirmation?</Text>
                <Text style={[styles.text, { color: colors.color }]}>Yes, you can modify or cancel your booking within the allowed time frame mentioned in the booking policy.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>4. How do owners get paid?</Text>
                <Text style={[styles.text, { color: colors.color }]}>Owners receive payments directly into their linked bank accounts once the booking is completed successfully.</Text>
                
                <Text style={[styles.subTitle, { color: colors.color }]}>5. What if I face an issue with my booking?</Text>
                <Text style={[styles.text, { color: colors.color }]}>If you encounter any issues, contact customer support through the app, and our team will assist you.</Text>
            </ScrollView>
        </View>
    );
};

export default FAQsScreen;

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
        marginTop: 5,
    },
});
