// import React from "react";
// import Modal from "react-native-modal";

// const CustomModal = ({ isVisible, onClose, children }) => {
//     return (
//         <Modal
//             isVisible={isVisible}
//             animationIn="zoomIn"
//             animationOut="zoomOut"
//             animationInTiming={500}
//             animationOutTiming={500}
//             backdropColor="black"
//             backdropOpacity={0.58}
//             onBackdropPress={onClose} // Close on tapping outside
//         >
//             {children}
//         </Modal>
//     );
// };
// export default CustomModal;


import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";


const CustomModal = ({ isVisible, children }) => {
    return (
        <Modal
            isVisible={isVisible}
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={500}
            animationOutTiming={500}
            backdropColor="black"
            backdropOpacity={0.58}
            // onBackdropPress={onClose} // Close on tapping outside
            style={styles.modal} // Fullscreen Modal
        >
            <View style={styles.modalContent}>



                {children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0, // Removes default margin & makes it fullscreen
        // backgroundColor:"transparent"
    },
    modalContent: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        // alignItems: "center",
        // padding: 20,
        // backgroundColor:"red"
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "red",
        borderRadius: 8,
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CustomModal;

