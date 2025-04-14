import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    verifyOtp,
    resendOtp,
    setResendTimer,
    decrementResendTimer,
    setError,
    setUser
} from '../Redux/Slices/AuthSlice';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../Utils/Dimensions';

// URL for the back button SVG
const BACK_BUTTON_SVG = 'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg';
// URL for the truck SVG
const TRUCK_SVG_URL = 'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/truck.svg';

const VerificationScreen = ({phoneNumber}) => {
    const navigation = useNavigation();
    // const route = useRoute();
    const dispatch = useDispatch();

    // const { phoneNumber } = route.params || { phoneNumber: '' };
    const { loading, error, resendTimer, isAuthenticated, isNewUser } = useSelector(state => state.Authdata);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Create refs for OTP inputs
    const inputRefs = useRef(Array(6).fill().map(() => React.createRef()));

    // Set up timer on component mount
    useEffect(() => {
        if (resendTimer === 0) {
            dispatch(setResendTimer(30));
        }

        // Timer countdown
        const interval = setInterval(() => {
            dispatch(decrementResendTimer());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Focus first input on mount
    useEffect(() => {
        setTimeout(() => {
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }, 100);
    }, []);




    // Monitor authentication state
    useEffect(() => {
        if (isAuthenticated) {
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Home' }],
            // });

            dispatch(setUser(true)); //  New  user
        }
    }, [isAuthenticated]);


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











    // Display any errors
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
            setOtpError(true);
            setErrorMessage('Incorrect code. Please try again.');
            // Clear error after showing alert
            setTimeout(() => {
                dispatch(setError(null));
            }, 100);
        }
    }, [error]);

    const handleCodeChange = (text, index) => {
        // Only accept digits
        if (!/^\d*$/.test(text)) return;

        // Update the OTP array
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Reset error state when user types
        if (otpError) {
            setOtpError(false);
            setErrorMessage('');
        }

        // Auto-focus next input if value is entered
        if (text.length === 1 && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Auto-verify if all fields are filled
        if (text.length === 1 && index === 5) {
            // Last digit entered, all fields should be filled now
            const allFilled = newOtp.every(digit => digit !== '');
            if (allFilled) {
                // Allow a small delay for the UI to update before verification
                setTimeout(() => {
                    handleConfirm();
                }, 300);
            }
        }
    };

    const handleKeyPress = (e, index) => {
        // Handle backspace
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleConfirm = async () => {
        // Check if all digits are filled
        if (otp.some(digit => digit === '')) {
            setOtpError(true);
            // setErrorMessage('Please enter the complete 6-digit verification code');
            return;
        }

        try {
            // Combine OTP digits
            const otpCode = otp.join('');

            // Verify OTP
            await dispatch(verifyOtp(phoneNumber, otpCode));
        } catch (error) {
            console.error('Verification error:', error);

            // Clear OTP fields for retry
            setOtp(['', '', '', '', '', '']);

            // Focus first input
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }

            // Error handling is done in the useEffect for error
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0 || loading) {
            return;
        }

        try {
            // Clear OTP inputs
            setOtp(['', '', '', '', '', '']);
            setOtpError(false);
            setErrorMessage('');

            // Focus first input
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }

            // Resend OTP
            await dispatch(resendOtp(phoneNumber));

            Alert.alert('Success', 'Verification code sent again');
        } catch (error) {
            console.error('Resend OTP error:', error);
            // Error is already handled in the slice
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

            {/* Back Button outside SafeAreaView */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <SvgUri
                    uri={BACK_BUTTON_SVG}
                    width={24}
                    height={24}
                />
            </TouchableOpacity>

            <SafeAreaView style={styles.safeArea} edges={['right', 'bottom', 'left']}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            {/* Truck Image */}
                            <View style={styles.truckContainer}>
                                <SvgUri
                                    uri={TRUCK_SVG_URL}
                                    width={SCREEN_WIDTH * 0.7}
                                    height={SCREEN_WIDTH * 0.5}
                                    style={styles.truckImage}
                                />
                            </View>

                            {/* Content */}
                            <View style={styles.contentContainer}>
                                <Text style={styles.title}>Verification Code</Text>
                                <Text style={styles.description}>
                                    We sent a 6-digit code to {phoneNumber}
                                </Text>

                                <View style={styles.codeContainer}>
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={el => (inputRefs.current[index] = el)}
                                            style={[
                                                styles.codeInput,
                                                otpError && styles.codeInputError,
                                                digit ? styles.filledInput : {}
                                            ]}
                                            value={digit}
                                            onChangeText={text => handleCodeChange(text, index)}
                                            onKeyPress={e => handleKeyPress(e, index)}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            editable={!loading}
                                        />
                                    ))}
                                </View>

                                {otpError && errorMessage && (
                                    <Text style={styles.errorText}>
                                        {errorMessage}
                                    </Text>
                                )}

                                <TouchableOpacity
                                    style={[
                                        styles.confirmButton,
                                        otp.every(digit => digit !== '') ? styles.confirmButtonActive : styles.confirmButtonInactive,
                                        loading && styles.confirmButtonDisabled
                                    ]}
                                    onPress={handleConfirm}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.confirmButtonText}>Confirm</Text>
                                    )}
                                </TouchableOpacity>

                                <View style={styles.resendContainer}>
                                    <Text style={styles.resendText}>Didn't receive the code?</Text>
                                    <TouchableOpacity
                                        onPress={handleResend}
                                        disabled={resendTimer > 0 || loading}
                                    >
                                        <Text style={[
                                            styles.sendAgainText,
                                            (resendTimer > 0 || loading) && styles.sendAgainDisabled
                                        ]}>
                                            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Send Again'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.instructionText}>
                                    {isNewUser
                                        ? "This will verify your phone number"
                                        : "Enter the code to sign in to your account"}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    inner: {
        flex: 1,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 20,
        width: 40,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    truckContainer: {
        marginTop: Platform.OS === 'ios' ? 80 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    truckImage: {
        alignSelf: 'center',
    },
    contentContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 30,
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    codeInput: {
        width: (SCREEN_WIDTH - 70) / 6,
        height: (SCREEN_WIDTH - 70) / 6,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#F9F9F9',
    },
    filledInput: {
        borderColor: '#19867F',
        backgroundColor: '#F0F9F9',
    },
    codeInputError: {
        borderColor: '#FF0000',
        backgroundColor: '#FFEEEE',
    },
    errorText: {
        color: '#FF0000',
        marginBottom: 20,
    },
    confirmButton: {
        borderRadius: 10,
        paddingVertical: 14,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    confirmButtonActive: {
        backgroundColor: '#19867F',
    },
    confirmButtonInactive: {
        backgroundColor: '#CCCCCC',
    },
    confirmButtonDisabled: {
        opacity: 0.7,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    resendContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
    },
    resendText: {
        color: '#666666',
    },
    sendAgainText: {
        color: '#19867F',
        fontWeight: '600',
        marginLeft: 5,
    },
    sendAgainDisabled: {
        opacity: 0.5,
    },
    instructionText: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default VerificationScreen;