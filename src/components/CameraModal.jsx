import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Alert,
    Platform,
    Modal
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import LinearGradient from "react-native-linear-gradient";

const CameraModal = ({ visible, onClose, onCapture, mode }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    // Select the correct camera based on the mode
    const devices = useCameraDevices();
    const device =
        mode === "selfie"
            ? devices.find((d) => d.position === "front")
            : devices.find((d) => d.position === "back");

    useEffect(() => {
        (async () => {
            let cameraPermission;
            if (Platform.OS === "android") {
                cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
            } else {
                cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
            }

            if (cameraPermission === RESULTS.GRANTED) {
                setHasPermission(true);
            } else {
                Alert.alert("Permission Denied", "Camera access is required.");
                setHasPermission(false);
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto();
                setPhoto(photo);
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <LinearGradient colors={[ '#306165','#27363E']} style={styles.cameraWrapper}>
                    {hasPermission ? (
                        photo ? (
                            <Image source={{ uri: `file://${photo.path}` }} style={styles.image} />
                        ) : device ? (
                            <Camera
                                ref={(ref) => (cameraRef.current = ref)}
                                style={[styles.camera]}
                                device={device}
                                isActive={true}
                                photo={true}
                            />
                        ) : (
                            <Text>Loading camera...</Text>
                        )
                    ) : (
                        <Text>No access to camera</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        {!photo ? (
                            <TouchableOpacity style={styles.button} onPress={takePicture}>
                                <Text style={styles.buttonText}>
                                    {mode === "selfie" ? "Capture Selfie" : "Capture ID Card"}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
                                    <Text style={styles.buttonText}>Retake</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        onCapture(photo, mode);
                                        onClose();
                                        setPhoto(null)
                                    }}
                                >
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    cameraWrapper: {
        overflow:'hidden',
        width: "90%",
        height: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    camera: {
        width: "100%",
        height: '70%',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        padding: 10,
        backgroundColor: "blue",
        marginHorizontal: 10,
        borderRadius: 5,
    },
    cancelButton: {
        padding: 10,
        backgroundColor: "red",
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: "70%",
        resizeMode: "contain",
    },
});

export default CameraModal;