import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import Material Icons
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../theme/ThemeContext';

const MenuScreen = ({ navigation, collapseSideBar }) => {
    const { colors, theme, toggleTheme } = useContext(ThemeContext)
    const menuItems = [
        {
            title: 'Bookings',
            iconName: 'groups',
            path: 'Bookings'
        },
        {
            title: 'Map',
            iconName: 'map',
            path: 'Map'
        },
        {
            title: 'Booking History',
            iconName: 'history',
            path: 'Completed'
        },
        {
            title: 'QR Code',
            iconName: 'qr-code-scanner',
            path: 'QRScanner'
        },
        {
            title: 'FAQs',
            iconName: 'forum',
            path: 'FAQs'
        },
        {
            title: 'App Feedback',
            iconName: 'feedback',
            path: 'AppFeedback'
        },
        {
            title: 'Rate the app',
            iconName: 'reviews',
            path: 'RateApp'
        },
        {
            title: 'Terms of Usage',
            iconName: 'notes',
            path: 'TermsOfUsage'
        },
        {
            title: 'Logout',
            iconName: 'logout',
            path: 'Logout'
        },
    ];
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient colors={colors.sidePanelBgColors} style={styles.container}>
                {/* Top Row with Profile and Close Icons */}
                <View style={styles.topIcons}>
                    {/* Profile Icon */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Icon name="account-circle" size={30} color="white" />
                    </TouchableOpacity>


                    {/* Close Icon (Back) */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={collapseSideBar}
                    >
                        <Icon name="close" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <Text style={styles.title}>PwC WorkInSync</Text>

                    {/* Menu Items Section 1 */}
                    <View style={styles.menuSection}>
                        {menuItems.slice(0, 4).map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => navigation.navigate(item.path)}
                            >
                                <View style={styles.iconContainer}>
                                    <Icon name={item.iconName} size={30} color="white" />
                                </View>
                                <Text style={styles.menuText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Divider Line */}
                    <View style={styles.line} />

                    {/* Menu Items Section 2 */}
                    <View style={styles.menuSection}>
                        {menuItems.slice(4, 8).map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => navigation.navigate(item.path)}
                            >
                                <View style={styles.iconContainer}>
                                    <Icon name={item.iconName} size={30} color="white" />
                                </View>
                                <Text style={styles.menuText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Divider Line */}
                    <View style={styles.line} />

                    {/* Logout Section */}
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('Logout')}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="logout" size={30} color="white" />
                        </View>
                        <Text style={styles.menuText}>Logout</Text>
                    </TouchableOpacity>
                    <View
                        style={styles.menuItem}

                    >
                        <View style={[styles.iconContainer]}>
                            <Icon name="color-lens" size={30} color="white" />
                        </View>
                        <Text style={styles.menuText}>Theme</Text>
                        <TouchableOpacity style={{ backgroundColor: 'gray', width: 50, height: 15, alignItems:'center', borderRadius: 20, flexDirection: 'row', justifyContent: `${theme === 'dark' ? 'flex-end' : 'flex-start'}` }}
                            onPress={toggleTheme}>
                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: `${theme === 'dark' ? 'white' : 'black'}` }}></View>
                        </TouchableOpacity>
                    </View>

                </View>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#0C1922',
        justifyContent: 'flex-start',  
        alignItems: 'flex-start',  
    },
    topIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '100%',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 10,
    },
    menuContainer: {
        flex: 1,
    },
    menuSection: {
        marginBottom: 30,
        marginTop: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 1,
        borderRadius: 5,
        width: 'auto', 
        paddingBottom: 1, 
    },
    iconContainer: {
        padding: 1,
    },
    menuText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 500,
    },
    line: {
        height: 1,
        backgroundColor: 'white',
        marginVertical: 20,
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: Platform.OS === 'ios' ? 40 : 1,  // Adjust margin for iOS
        backgroundColor: '#1D2B34',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
        marginBottom: 20,
    },
});

export default MenuScreen;