import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeContext from '../theme/ThemeContext';
import Header from '../components/Header';
import CameraModal from '../components/CameraModal';
import LoadingModal from '../components/LoadingModal';

const KYCDetailsScreen = ({ navigation }) => {
    const { colors } = useContext(ThemeContext);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [cameraMode, setCameraMode] = useState('selfie'); // 'selfie' or 'id_card'
    const [capturedSelfie, setCapturedSelfie] = useState(null);
    const [capturedIdCard, setCapturedIdCard] = useState(null);
    const idTypes=['Aadhar Card','Pan Card','Driving License']
    const [selectedIdType, setSelectedIdType] = useState(idTypes[0])
    const [loading, setLoading] = useState(false)
    const handleCapture = (photo, mode) => {
        if (mode === 'selfie') {
            setCapturedSelfie(photo);
        } else {
            setCapturedIdCard(photo);
        }
    };
    const handleKYCSubmission = async () => {
        if (!capturedSelfie || !capturedIdCard) {
            Alert.alert("Error", "Please upload both a selfie and an ID proof.");
            return;
        }
        console.log(capturedIdCard,capturedSelfie)
        setLoading(true)
        const formData = new FormData();
        formData.append('idType', selectedIdType);
        formData.append('selfie', {
            uri: capturedSelfie.path,
            type: 'image/jpeg',
            name: 'selfie.jpg',
        });
        formData.append('idCard', {
            uri: capturedIdCard.path,
            type: 'image/jpeg',
            name: 'id_card.jpg',
        });

        try {
            const response = await axios.post('/kyc/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
              });
            Alert.alert("Success", "KYC Submitted Successfully!");
        } catch (error) {
            console.log(error.response);
            Alert.alert("Submission Failed", error.message);
        }finally{
            setLoading(false)
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Back Icon and Title */}
            <Header title="KYC Details" navigation={navigation} />
            <View style={styles.main}>
                {/* Identity Type Options */}
                <Text style={[styles.sectionTitle, { color: colors.color }]}>Choose Your Identity Type</Text>
                <View style={styles.identityOptions}>
                    {idTypes.map((id,index)=>(<TouchableOpacity onPress={()=>{setSelectedIdType(id)}} style={[styles.identityButton, { backgroundColor: selectedIdType===id?'#000':colors.secondaryBg, borderColor: colors.secondaryColor }]}>
                        <Text style={[styles.identityButtonText, { color: colors.secondaryColor }]}>{id}</Text>
                    </TouchableOpacity>))}
                    
                </View>

                {/* Upload Proof Identity */}
                <View style={[styles.uploadSection, { backgroundColor: colors.secondaryBg }]}>
                    <View style={styles.uploadTextContainer}>
                        <Text style={[styles.cardTitle, { color: colors.color }]}>Upload Proof Identity</Text>
                        <Text style={[styles.cardDescription, { color: colors.secondaryColor }]}>
                            We accept only ID card, Driving License, or Passport
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.uploadButton, { borderColor: colors.color }]}
                        onPress={() => {
                            setCameraMode('id_card');
                            setIsCameraVisible(true);
                        }}>
                        {capturedIdCard ? (<Image
                            source={{ uri: `file://${capturedIdCard.path}` }}
                            style={styles.image}
                        />) : (<Icon name="image" size={30} color={colors.color} />)}
                    </TouchableOpacity>
                </View>

                {/* Selfie Photo */}
                <View
                    style={[styles.uploadSection, { backgroundColor: colors.secondaryBg }]}>
                    <View style={styles.uploadTextContainer}>
                        <Text style={[styles.cardTitle, { color: colors.color }]}>Selfie Photo</Text>
                        <Text style={[styles.cardDescription, { color: colors.secondaryColor }]}>
                            Selfie with your front camera to verify your identity
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.uploadButton, { borderColor: colors.color }]}
                        onPress={() => {
                            setCameraMode('selfie');
                            setIsCameraVisible(true);
                        }}>
                        {capturedSelfie ? (<Image
                            source={{ uri: `file://${capturedSelfie.path}` }}
                            style={styles.image}
                        />) : (<Icon name="camera-alt" size={30} color={colors.color} />)}
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleKYCSubmission}
                    style={[styles.submitButton, { backgroundColor: colors.buttonBg }]}>
                    <Text style={[styles.submitButtonText, { color: colors.buttonText }]}>Submit</Text>
                </TouchableOpacity>
            </View>
            <CameraModal
                visible={isCameraVisible}
                onClose={() => setIsCameraVisible(false)}
                onCapture={handleCapture}
                mode={cameraMode}
            />
            <LoadingModal visible={loading} message='Uploading...' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        padding: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#000',
    },
    identityOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        flexWrap: 'wrap',
    },
    identityButton: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 25,
        borderBottomWidth: 2,  // Bottom border added
        borderBottomColor: 'black',
        shadowColor: 'black',  // Added shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    identityButtonText: {
        fontSize: 15,
        color: '#000',
    },
    uploadSection: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        borderBottomWidth: 2, // Black bottom border
        borderBottomColor: 'black',
        shadowColor: 'white',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        flexDirection: 'row', // This makes the layout horizontal (row direction)
        justifyContent: 'space-between', // Space out title, description, and button
        alignItems: 'center', // Align vertically in the center
    },
    uploadTextContainer: {
        flex: 1, // Makes sure this container takes up available space
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    uploadButton: {
        alignSelf: 'center',  // Center the button
        height:100,
        width:100,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderStyle: 'dashed',
    },
    image:{
        width:'100%',
        height:'100%'
    },
    submitButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: 'auto',  // Only takes width according to button length
        alignSelf: 'center',  // Center the button
        width: '100%'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: Platform.OS === 'ios' ? 40 : 2,  // Adjust margin for iOS
        backgroundColor: 'white',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
    },
});

export default KYCDetailsScreen;
