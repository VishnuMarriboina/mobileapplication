import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Text,TextInput,TouchableOpacity,Alert,ActivityIndicator,SafeAreaView,KeyboardAvoidingView,Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp,checkExistingSession,setError } from '../Redux/Slices/AuthSlice';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../Utils/Dimensions';
import VerificationScreen from './VerificationScreen';
const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.Authdata);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [showValidationScreen, setShowValidationScreen] = useState(false);
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // Check for existing session on component mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const isValid = await dispatch(checkExistingSession());
                if (isValid) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                }
            } catch (error) {
                console.error('Session check error:', error);
            }
        };
        checkSession();
    }, []);

    // Monitor authentication state
    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    }, [isAuthenticated]);

    // Display any errors
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
            // Clear error after showing alert
            setTimeout(() => {
                dispatch(setError(null));
            }, 100);
        }
    }, [error]);

    const validatePhoneNumber = phone => {
        if (!phone) {
            setPhoneError('Phone number is required');
            return false;
        }
        if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            setPhoneError('Please enter a valid 10-digit phone number');
            return false;
        }
        setPhoneError('');
        return true;
    };


    const handleSendVerification = async () => {
        if (!validatePhoneNumber(phoneNumber)) return;

        try {
            const formatted = `+91${phoneNumber}`;
            console.log('Sending OTP to:', formatted);

            const result = await dispatch(sendOtp(formatted));

            if (result) {
                setFormattedPhoneNumber(formatted);
                setShowValidationScreen(true);
            }
        } catch (error) {
            console.error('Send OTP error:', error);
        }
    };

    if (showValidationScreen) {
        return <VerificationScreen phoneNumber={formattedPhoneNumber} />;
    }




    // const handleSendVerification = async () => {
    //     if (!validatePhoneNumber(phoneNumber)) {
    //         return;
    //     }

    //     try {
    //         // Format phone number with country code
    //         const formattedPhoneNumber = `+91${phoneNumber}`;
    //         console.log('Sending OTP to:', formattedPhoneNumber);

    //         // Send OTP
    //         const result = await dispatch(sendOtp(formattedPhoneNumber));

    //         if (result) {
    //             // Navigate to verification screen
    //             navigation.navigate('Verification', {
    //                 phoneNumber: formattedPhoneNumber,
    //             });
    //             setShowValidationScreen(true);

    //         }
    //     } catch (error) {
    //         console.error('Send OTP error:', error);
    //         // Error is already handled in the AuthSlice reducer
    //     }
    // };


    // if (showValidationScreen) {
    //     return <VerificationScreen phoneNumber={formattedPhoneNumber} />;
    //   }





    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}>
                <View style={styles.header}>
                    <SvgUri
                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/marketing+and+sales+app/logo_vertical.svg'}
                        width={SCREEN_WIDTH / 3}
                        height={SCREEN_HEIGHT / 6}
                        fallback={<Text style={{fontSize: 18}} allowFontScaling={false}>🚚</Text>}
                    />
                    <Text style={styles.subtitle}>Driver App</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Enter Mobile Number</Text>
                    <View style={[styles.inputContainer, phoneError ? styles.inputError : null]}>
                        <View style={styles.countryCode}>
                            <Text style={styles.countryCodeText}>+91</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={(text) => {
                                // Only allow digits
                                const cleanedText = text.replace(/[^0-9]/g, '');
                                setPhoneNumber(cleanedText);
                                if (cleanedText.length === 0 || cleanedText.length === 10) {
                                    setPhoneError('');
                                }
                            }}
                            maxLength={10}
                        />
                    </View>

                    {phoneError ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{phoneError}</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={[
                            styles.button,
                            phoneNumber.length === 10 ? styles.buttonActive : styles.buttonInactive,
                            loading && styles.buttonDisabled
                        ]}
                        onPress={handleSendVerification}
                        disabled={phoneNumber.length !== 10 || loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Verify Number</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#19867F',
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 4,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 30,
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
    },
    inputError: {
        borderColor: '#FF0000',
        backgroundColor: '#FFEEEE',
    },
    countryCode: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRightWidth: 1,
        borderRightColor: '#E8E8E8',
        justifyContent: 'center',
    },
    countryCodeText: {
        fontSize: 16,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorContainer: {
        marginTop: 10,
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#19867F',
    },
    buttonInactive: {
        backgroundColor: '#CCCCCC',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Login;
































// old code

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { BRANDCOLOR } from '../Utils/Colors';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginStart, loginSuccess, selectIsNewUser, setUser } from '../Redux/Slices/AuthSlice';



// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState({ username: '', password: '' });
//     // const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const dispatch = useDispatch();
//     const auth = useSelector((state) => state.Authdata); // grab the entire auth slice

//     const validateInputs = () => {
//         let isValid = true;
//         let errors = { username: '', password: '' };

//         if (username.trim().length < 3) {
//             errors.username = 'Username must be at least 3 characters long';
//             isValid = false;
//         }
//         if (password.length < 6) {
//             errors.password = 'Password must be at least 6 characters long';
//             isValid = false;
//         }

//         setError(errors);
//         return isValid;
//     };


//     // const handleLogin = () => {
//     //     if (validateInputs()) {
//     //         dispatch(loginStart());

//     //         setTimeout(() => {
//     //             const isNewUser = username === "123456789" && password === "123456789";

//     //             dispatch(loginSuccess()); // Pass the isNewUser flag
//     //             dispatch(setUser()); // Update the isNewUser state
//     //             setIsLoggedIn(true);

//     //         }, 500);

//     //     }
//     // };


//     const handleLogin = () => {
//         if (validateInputs()) {
//             dispatch(loginStart());

//             setTimeout(() => {
//                 dispatch(loginSuccess());
//                 console.log("about authentecator", auth.isAuthenticated);

//                 if (username === '123123' && password === '123123') {
//                     dispatch(setUser(false));  // Existing user
//                     console.log("user is  existing......", auth.isNewUser)
//                 } else {
//                     dispatch(setUser(true)); //  New  user
//                     console.log("user does not existing......")

//                 }

//                 // setIsLoggedIn(true);
//             }, 500);
//         }
//     };






//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login</Text>

//             {/* Username Input */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 placeholderTextColor={"green"}
//                 value={username}
//                 onChangeText={setUsername}
//             />
//             {error.username ? <Text style={styles.errorText}>{error.username}</Text> : null}

//             {/* Password Input */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor={"green"}
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//             />
//             {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

//             {/* Login Button */}
//             <TouchableOpacity
//                 style={[styles.button, (!username || !password) && styles.disabledButton]}
//                 onPress={handleLogin}
//                 disabled={!username || !password}
//             >
//                 <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: '#f4f4f4',
//         paddingHorizontal: 20,
//         backgroundColor: BRANDCOLOR
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: "white"
//     },
//     input: {
//         width: '100%',
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         backgroundColor: '#fff',
//         marginBottom: 10,
//         color: "black"
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 14,
//         marginBottom: 10,
//     },
//     button: {
//         width: '100%',
//         height: 50,
//         backgroundColor: '#007BFF',
//         backgroundColor: "green",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         marginTop: 10,
//     },
//     disabledButton: {
//         // backgroundColor: '#ccc',
//         backgroundColor: "white"
//         // backgroundColor:"BRANDCOLOR"
//     },
//     buttonText: {
//         color: '#fff',
//         color: "black",
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default Login;















































//----------------------------------------------------------------------old code

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// // import { BRANDCOLOR } from '../Utils/Colors';
// import MainStack from '../Stacks/MainStack';
// import { BRANDCOLOR } from '../Utils/Colors';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginStart, loginSuccess, setUser } from '../Redux/Slices/AuthSlice';
// import DriverDetails from '../Uploads/DriverDetails';
// import axios from 'axios';


// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState({ username: '', password: '' });
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const dispatch = useDispatch();
//     const auth = useSelector((state) => state.Authdata); // grab the entire auth slice

//     // const { loginStart, loginFailure, logout } = useSelector((state) => { state.Authdata })

//     // const { loading } = useSelector((state) => state.auth);  //  Corrected: Accessing state correctly




//     // https://fakestoreapi.com/auth/login







//     console.log('✅ Authenticated:', auth.isAuthenticated);
//     // console.log(' User Info:', Authdata);






//     const validateInputs = () => {
//         let isValid = true;
//         let errors = { username: '', password: '' };

//         if (username.trim().length < 3) {
//             errors.username = 'Username must be at least 3 characters long';
//             isValid = false;
//         }
//         if (password.length < 6) {
//             errors.password = 'Password must be at least 6 characters long';
//             isValid = false;
//         }

//         setError(errors);
//         return isValid;
//     };

//     // const handleLogin = () => {
//     //     if (validateInputs()) {
//     //         alert('Login Successful');
//     //         // Navigate to another screen after login (if required)
//     //         // navigation.navigate('Home');
//     //         <MainStack />
//     //     }
//     // };

//     // const handleLogin = () => {
//     //     if (validateInputs()) {
//     //         setIsLoggedIn(true);  // Switch to MainStack after login
//     //     }
//     // };


//     // const handleLogin = () => {
//     //     if (validateInputs()) {
//     //         dispatch(loginStart());
//     //         setTimeout(() => {
//     //             dispatch(loginSuccess()); // Simulate successful login
//     //             setIsLoggedIn(true);  // Switch to MainStack after login
//     //         }, 500);
//     //     }
//     // };

//     const handleLogin = () => {
//         if (validateInputs()) {
//             dispatch(loginStart());

//             setTimeout(() => {
//                 const isNewUser = username === "123456789" && password === "123456789";

//                 dispatch(loginSuccess()); // Pass the isNewUser flag
//                 dispatch(setUser()); // Update the isNewUser state
//                 setIsLoggedIn(true);
//                 // console.log("status of the user", auth.isNewUser);
//             }, 500);

//         }
//     };

//     // console.log(auth.isAuthenticated)

//     if (isLoggedIn) {
//         // add all the auth screen state updates here....
//         dispatch(setUser());
//         console.log("about", setUser())
//         console.log("status of the user", auth.isNewUser);
//         // console.log(selectIsAuthenticated)
//         // console.log("about the user status", selectIsNewUser)
//         // return <MainStack />;
//         // dispatch(loginSuccess());
//         // return <AddDriverDetails />
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login</Text>

//             {/* Username Input */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 placeholderTextColor={"green"}
//                 value={username}
//                 onChangeText={setUsername}
//             />
//             {error.username ? <Text style={styles.errorText}>{error.username}</Text> : null}

//             {/* Password Input */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor={"green"}
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//             />
//             {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

//             {/* Login Button */}
//             <TouchableOpacity
//                 style={[styles.button, (!username || !password) && styles.disabledButton]}
//                 onPress={handleLogin}
//                 disabled={!username || !password}
//             >
//                 <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: '#f4f4f4',
//         paddingHorizontal: 20,
//         backgroundColor: BRANDCOLOR
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: "white"
//     },
//     input: {
//         width: '100%',
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         backgroundColor: '#fff',
//         marginBottom: 10,
//         color: "black"
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 14,
//         marginBottom: 10,
//     },
//     button: {
//         width: '100%',
//         height: 50,
//         backgroundColor: '#007BFF',
//         backgroundColor: "green",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         marginTop: 10,
//     },
//     disabledButton: {
//         // backgroundColor: '#ccc',
//         backgroundColor: "white"
//         // backgroundColor:"BRANDCOLOR"
//     },
//     buttonText: {
//         color: '#fff',
//         color: "black",
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default Login;



