import React, { useState } from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '../Utils/Dimensions'
import { useNavigation } from '@react-navigation/native'
import DriverProfile from './DriverProfile'



const ProfilePhoto = () => {
  const navigation = useNavigation();
  const [showDriverProfile, setShowDriverProfile] = useState(false);

  const handleCancel = () => {
    navigation.goBack();
  }



  const handleSubmit = () => {
    alert("ProfilePhoto submitted successfully!");
    setShowDriverProfile(true)
  }
  if (showDriverProfile) { return <DriverProfile /> }








  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ProfilePhoto</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton]}
          onPress={handleSubmit}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    maxHeight: SCREEN_HEIGHT * 0.85,
    elevation: 50
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#EFEFF4"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  continueText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ddd",
  },
})
export default ProfilePhoto