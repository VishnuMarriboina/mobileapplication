import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
// import RewardsTable from "./RewardsTable";
import RewardsTable from "./RewardsTable";


const FancyModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={500}
      animationOutTiming={500}
      backdropColor="black"
      backdropOpacity={0.58}
      onBackdropPress={onClose} // Close on tapping outside
    >
      <View style={styles.modalContent}>
        <Text style={styles.fancyText}>Fancy!</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* <RewardsTable /> */}
      </View>


    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  fancyText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FancyModal;
