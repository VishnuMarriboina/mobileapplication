import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const PermissionScreen = () => {
    const bottomSheetModalRef = useRef(null);
    const [currentSheet, setCurrentSheet] = useState(0);

    // Define bottom sheet snap points
    const snapPoints = useMemo(() => ['50%'], []);

    const permissionData = [
        { title: "Location Permission", message: "Allow access to this device’s location?", options: ["Allow", "Only this time", "Don’t allow"], icon: "📍" },
        { title: "Record Permission", message: "Allow to take pictures and record video?", options: ["Allow", "Don’t allow"], icon: "📷" },
        { title: "Files Permission", message: "Allow access to photos, media, and files?", options: ["Allow", "Don’t allow"], icon: "📂" },
        { title: "Notification Permission", message: "Allow to send notifications?", options: ["Allow", "Don’t allow"], icon: "🔔" },
    ];

    // Function to open the BottomSheet
    const openBottomSheet = () => {
        if (bottomSheetModalRef.current) {
            console.log("Opening BottomSheet...");
            bottomSheetModalRef.current.present();
        } else {
            console.log("BottomSheet ref is NULL!");
        }
    };

    // Function to handle button press inside BottomSheet
    const handleNext = () => {
        if (currentSheet < permissionData.length - 1) {
            setCurrentSheet(prev => prev + 1);
        } else {
            bottomSheetModalRef.current?.dismiss(); // Closes the modal when the last permission is reached
        }
    };

    return (
        // <BottomSheetModalProvider>
        <View style={styles.container}>
            <TouchableOpacity onPress={openBottomSheet} style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Permission Flow</Text>
            </TouchableOpacity>

            {/* Bottom Sheet Modal */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}  // Opens at first snap point
                snapPoints={snapPoints}
                enablePanDownToClose={true} // Allow manual close
                backgroundStyle={styles.sheetBackground}
            >
                <View style={styles.sheetContent}>
                    <Text style={styles.permissionTitle}>
                        {permissionData[currentSheet].icon} {permissionData[currentSheet].title}
                    </Text>
                    <Text style={styles.permissionMessage}>{permissionData[currentSheet].message}</Text>
                    {permissionData[currentSheet].options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheetModal>
        </View>
        // </BottomSheetModalProvider>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    startButton: {
        backgroundColor: '#00695C',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    startButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sheetBackground: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetContent: {
        padding: 20,
        alignItems: 'center',
    },
    permissionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    permissionMessage: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00695C',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PermissionScreen;
