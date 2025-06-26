import React, {useState, useEffect} from 'react';
import {View, Button, TextInput, Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export function PhoneSignIn() {
  const [confirm, setConfirm] = useState(null); // stores confirmation object
  const [code, setCode] = useState(''); // stores OTP code

  // Monitor user login state
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        Alert.alert('Success', 'User is signed in');
        // You can navigate to another screen or update UI state here
      }
    });

    return unsubscribe; // cleanup on unmount
  }, []);

  // Send OTP
  async function handleSignInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Phone number sign-in error:', error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  }

  // Verify OTP
  async function confirmCode() {
    try {
      if (!code.trim()) {
        Alert.alert('Error', 'Please enter the verification code');
        return;
      }
      await confirm.confirm(code);
    } catch (error) {
      console.error('Invalid code:', error);
      Alert.alert('Error', 'Invalid verification code');
    }
  }

  // UI
  if (!confirm) {
    return (
      <View style={styles.container}>
        <Button
          title="Phone Number Sign In"
          onPress={() => handleSignInWithPhoneNumber('+1 650-555-3434')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </View>
  );
}

// Basic styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
