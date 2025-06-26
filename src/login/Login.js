

// old code

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BRANDCOLOR} from '../Utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginStart,
  loginSuccess,
  selectIsNewUser,
  setUser,
} from '../Redux/Slices/AuthSlice';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({username: '', password: ''});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.Authdata); // grab the entire auth slice

  const validateInputs = () => {
    let isValid = true;
    let errors = {username: '', password: ''};

    if (username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters long';
      isValid = false;
    }
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  // const handleLogin = () => {
  //     if (validateInputs()) {
  //         dispatch(loginStart());

  //         setTimeout(() => {
  //             const isNewUser = username === "123456789" && password === "123456789";

  //             dispatch(loginSuccess()); // Pass the isNewUser flag
  //             dispatch(setUser()); // Update the isNewUser state
  //             setIsLoggedIn(true);

  //         }, 500);

  //     }
  // };

  const handleLogin = () => {
    if (validateInputs()) {
      dispatch(loginStart());

      setTimeout(() => {
        dispatch(loginSuccess());
        console.log('about authentecator', auth.isAuthenticated);

        if (username === '123123' && password === '123123') {
          dispatch(setUser(false)); // Existing user
          console.log('user is  existing......', auth.isNewUser);
        } else {
          dispatch(setUser(true)); //  New  user
          console.log('user does not existing......');
        }

        // setIsLoggedIn(true);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'green'}
        value={username}
        onChangeText={setUsername}
      />
      {error.username ? (
        <Text style={styles.errorText}>{error.username}</Text>
      ) : null}

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'green'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error.password ? (
        <Text style={styles.errorText}>{error.password}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          (!username || !password) && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={!username || !password}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    backgroundColor: BRANDCOLOR,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  disabledButton: {
    // backgroundColor: '#ccc',
    backgroundColor: 'white',
    // backgroundColor:"BRANDCOLOR"
  },
  buttonText: {
    color: '#fff',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;

//--------------------------fire base login code-----------------------------------------

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {BRANDCOLOR} from '../Utils/Colors';
// import auth from '@react-native-firebase/auth';

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [code, setCode] = useState('');
//   const [confirm, setConfirm] = useState(null);
//   const [errors, setErrors] = useState({phoneNumber: '', code: ''});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(user => {
//       if (user) {
//         Alert.alert('Success', 'User is signed in');
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const validatePhone = () => {
//     let isValid = true;
//     const phoneRegex = /^[6-9]\d{9}$/; // Indian number format

//     if (!phoneRegex.test(phoneNumber)) {
//       setErrors(prev => ({
//         ...prev,
//         phoneNumber: 'Enter a valid 10-digit phone number',
//       }));
//       isValid = false;
//     } else {
//       setErrors(prev => ({...prev, phoneNumber: ''}));
//     }

//     return isValid;
//   };

//   const validateOTP = () => {
//     let isValid = true;
//     if (code.length !== 6) {
//       setErrors(prev => ({
//         ...prev,
//         code: 'OTP must be 6 digits',
//       }));
//       isValid = false;
//     } else {
//       setErrors(prev => ({...prev, code: ''}));
//     }

//     return isValid;
//   };

//   const handleSendOTP = async () => {
//     if (!validatePhone()) return;

//     try {
//       setLoading(true);
//       const fullNumber = '+91' + phoneNumber; // Use correct country code
//       const confirmation = await auth().signInWithPhoneNumber(fullNumber);
//       setConfirm(confirmation);
//       Alert.alert('OTP sent', 'Check your SMS for the verification code');
//     } catch (error) {
//       console.error('Phone number sign-in error:', error);
//       Alert.alert('Error', 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!validateOTP()) return;

//     try {
//       setLoading(true);
//       await confirm.confirm(code);
//     } catch (error) {
//       console.error('Invalid code:', error);
//       Alert.alert('Error', 'Invalid verification code');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login with Phone</Text>

//       {/* Phone Number Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Phone Number"
//         placeholderTextColor="green"
//         keyboardType="number-pad"
//         maxLength={10}
//         value={phoneNumber}
//         onChangeText={text => {
//           setPhoneNumber(text);
//           if (text.length === 10) validatePhone();
//         }}
//       />
//       {errors.phoneNumber ? (
//         <Text style={styles.errorText}>{errors.phoneNumber}</Text>
//       ) : null}

//       {/* Send OTP Button */}
//       {!confirm && (
//         <TouchableOpacity
//           style={[styles.button, !phoneNumber && styles.disabledButton]}
//           onPress={handleSendOTP}
//           disabled={!phoneNumber || loading}>
//           <Text style={styles.buttonText}>
//             {loading ? 'Sending OTP...' : 'Send OTP'}
//           </Text>
//         </TouchableOpacity>
//       )}

//       {/* OTP Input */}
//       {confirm && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter OTP"
//             placeholderTextColor="green"
//             keyboardType="number-pad"
//             maxLength={6}
//             value={code}
//             onChangeText={text => {
//               setCode(text);
//               if (text.length === 6) validateOTP();
//             }}
//           />
//           {errors.code ? (
//             <Text style={styles.errorText}>{errors.code}</Text>
//           ) : null}

//           <TouchableOpacity
//             style={[styles.button, !code && styles.disabledButton]}
//             onPress={handleVerifyOTP}
//             disabled={!code || loading}>
//             <Text style={styles.buttonText}>
//               {loading ? 'Verifying...' : 'Verify OTP'}
//             </Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: BRANDCOLOR,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'white',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     color: 'black',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: 'green',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   disabledButton: {
//     backgroundColor: 'white',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Login;
