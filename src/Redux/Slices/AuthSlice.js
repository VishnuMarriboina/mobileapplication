import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, confirmSignIn, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isAuthenticated: false,
  user: null,
  otpSent: false,
  verificationCode: null,
  userPhoneNumber: null,
  otpRetry: false,
  loading: false,
  error: null,
  resendCount: 0,
  lastResendTime: null,
  resendTimer: 0,
  isNewUser: false, // to comes from the backend exixting or new user..
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isNewUser = action.payload;

    },

    // setUser: (state, action) => {
    //                 state.loading = false;
    //                 state.isNewUser = action.payload;
    //                 state.error = null;
    //             },


    setResendCount: (state, action) => {
      state.resendCount = action.payload;
    },
    setLastResendTime: (state, action) => {
      state.lastResendTime = action.payload;
    },
    setResendTimer: (state, action) => {
      state.resendTimer = action.payload;
    },
    decrementResendTimer: state => {
      if (state.resendTimer > 0) {
        state.resendTimer -= 1;
      }
    },
    setOtpRetry: (state, action) => {
      state.otpRetry = action.payload;
    },
    resetAuth: state => {
      // Return the initial state to reset everything
      return initialState;
    },
    resetVerificationState: state => {
      state.otpSent = false;
      state.verificationCode = null;
      state.otpRetry = false;
      state.error = null;
    },
    setUserPhoneNumber: (state, action) => {
      state.userPhoneNumber = action.payload;
    },
  },
});

// Export action creators
export const {
  setLoading,
  stopLoading,
  setOtpSent,
  setVerificationCode,
  setError,
  setUser,
  setResendCount,
  setLastResendTime,
  setResendTimer,
  decrementResendTimer,
  setOtpRetry,
  resetAuth,
  resetVerificationState,
  setUserPhoneNumber,
} = authSlice.actions;

export const sendOtp = phoneNumber => async dispatch => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    // Set the phone number in the state
    dispatch(setUserPhoneNumber(phoneNumber));

    // First try to sign out to clear any existing sessions
    try {
      await signOut({ global: true });
      // Add a delay to allow AWS to process the sign out
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (signOutError) {
      // It's okay if this fails
      console.log('Sign out before OTP send:', signOutError);
    }

    console.log('Initiating OTP send to:', phoneNumber);
    
    // Attempt custom auth flow for everyone (new or existing users)
    try {
      const signInOutput = await signIn({
        username: phoneNumber,
        options: {
          authFlowType: 'CUSTOM_WITHOUT_SRP',
        },
      });

      console.log('Sign in output:', signInOutput);

      if (signInOutput.nextStep && signInOutput.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
        dispatch(setOtpSent(true));
        dispatch(setVerificationCode(signInOutput.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"));
        dispatch(setLoading(false));
        return true;
      }
      
      // If we get here without throwing an error or returning, something unexpected happened
      throw new Error('Failed to initiate OTP verification');
    } catch (signInError) {
      console.error('Sign in error:', signInError);
      
      // If user doesn't exist, we need to create them first
      if (signInError.code === 'UserNotFoundException') {
        console.log('New user detected. Attempting to sign up...');
        
        try {
          // Sign up the new user
          const signUpResult = await signUp({
            username: phoneNumber,
            password: 'TemporaryPassword123!',
            options: {
              userAttributes: {
                phone_number: phoneNumber,
              }
            }
          });
          
          console.log('Sign up result:', signUpResult);
          
          // After successful sign-up, try the custom auth flow again
          const signInAfterSignUp = await signIn({
            username: phoneNumber,
            options: {
              authFlowType: 'CUSTOM_WITHOUT_SRP',
            },
          });
          
          console.log('Sign in after sign up:', signInAfterSignUp);
          
          if (signInAfterSignUp.nextStep && signInAfterSignUp.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
            dispatch(setOtpSent(true));
            dispatch(setVerificationCode(signInAfterSignUp.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"));
            dispatch(setLoading(false));
            return true;
          }
          
          throw new Error('Failed to initiate OTP verification after sign up');
        } catch (signUpError) {
          console.error('Sign up error:', signUpError);
          
          // Handle unexpected errors during sign up
          if (signUpError.code !== 'UsernameExistsException') {
            throw signUpError;
          } 
          
          // If user exists (which shouldn't happen here but just in case),
          // try the custom auth flow one more time
          console.log('Unexpected state: User exists but was not found. Retrying auth...');
          
          const finalSignInAttempt = await signIn({
            username: phoneNumber,
            options: {
              authFlowType: 'CUSTOM_WITHOUT_SRP',
            },
          });
          
          if (finalSignInAttempt.nextStep && finalSignInAttempt.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
            dispatch(setOtpSent(true));
            dispatch(setVerificationCode(finalSignInAttempt.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"));
            dispatch(setLoading(false));
            return true;
          }
          
          throw new Error('Failed to initiate OTP verification');
        }
      } else {
        // For any other sign-in error, propagate it
        throw signInError;
      }
    }
  } catch (error) {
    console.error('Send OTP error:', error);

    if (error.name === 'InvalidLambdaResponseException') {
      // This is likely a backend configuration issue
      console.error('Lambda response issue. Check AWS Console for details.');
      dispatch(
        setError(
          'Unable to send OTP at this time. Please try again later or contact support.',
        ),
      );
    } else if (error.code === 'LimitExceededException') {
      // AWS Cognito rate limiting
      dispatch(
        setError('Too many authentication attempts. Please try again later.'),
      );
    } else {
      // General error
      dispatch(setError(error.message || 'Failed to send OTP'));
    }

    dispatch(setLoading(false));
    throw error;
  }
};

export const resendOtp = phoneNumber => async (dispatch, getState) => {
  try {
    const { resendCount, lastResendTime } = getState().Auth;
    const currentTime = new Date().getTime();

    // Check rate limiting - 3 attempts within a 5-minute window
    if (lastResendTime && currentTime - lastResendTime < 300000) {
      if (resendCount >= 3) {
        // Allow 3 attempts
        throw new Error('Too many resend attempts. Please try again later.');
      }
      dispatch(setResendCount(resendCount + 1));
    } else {
      // Reset count if 5 minutes have passed
      dispatch(setResendCount(1));
    }

    dispatch(setLastResendTime(currentTime));
    dispatch(setResendTimer(30)); // 30-second cooldown

    dispatch(setLoading(true));
    dispatch(setError(null));

    console.log('Resending OTP to:', phoneNumber);

    // Try to completely reset the authentication state by signing out
    try {
      await signOut({ global: true });
      // Add a delay to allow AWS to process the sign out
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (signOutError) {
      // It's okay if this fails
      console.log('Sign out during resend:', signOutError);
    }

    // We'll use the same logic as sendOtp for simplicity and consistency
    const result = await dispatch(sendOtp(phoneNumber));
    return result;
  } catch (error) {
    console.error('Resend OTP error:', error);
    dispatch(setLoading(false));
    throw error;
  }
};

export const verifyOtp = (phoneNumber, otpCode) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    console.log('Verifying OTP:', otpCode, 'for phone:', phoneNumber);

    // Send the OTP for verification
    const confirmSignInOutput = await confirmSignIn({
      challengeResponse: otpCode
    });

    console.log('Confirm sign in output:', confirmSignInOutput);

    if (confirmSignInOutput.isSignedIn) {
      // Get current user info
      const currentUser = await getCurrentUser();
      console.log('User authenticated:', currentUser.username);

      // Get user attributes
      const userAttributes = await fetchUserAttributes();

      // Return user data for session storage
      const userData = {
        phoneNumber: phoneNumber,
        username: currentUser.username,
        attributes: userAttributes,
        timestamp: new Date().getTime(),
      };

      // Store the session data
      await AsyncStorage.setItem('sessionData', JSON.stringify(userData));
      
      dispatch(setUser(userData));
      dispatch(setLoading(false));

      return userData;
    } else {
      throw new Error('Failed to sign in with OTP');
    }
  } catch (error) {
    console.error('Verification error details:', error);
    dispatch(setLoading(false));

    // Important: Check for specific error messages related to incorrect OTP
    if (
      error.name === 'NotAuthorizedException' ||
      error.message?.includes('Incorrect username or password') ||
      error.message?.includes('Invalid session for the user')
    ) {
      // Check how many retries we've had
      const { otpRetry } = getState().Auth;

      if (!otpRetry) {
        // First incorrect attempt - don't invalidate the session
        dispatch(setOtpRetry(true));
        dispatch(setError('Incorrect OTP. Please try again.'));
      } else {
        // Second incorrect attempt - give one more chance
        dispatch(
          setError(
            'Incorrect OTP. You have one more attempt before the session expires.',
          ),
        );
      }
    } else if (
      error.name === 'UserNotFoundException' ||
      error.message?.includes('User not found')
    ) {
      // This is a definite session expiry case
      dispatch(setVerificationCode(null)); // Clear the verification code
      dispatch(setError('Session expired. Please request a new OTP.'));
    } else {
      // For other errors, keep the verification code but set the error
      dispatch(setError(error.message || 'Failed to verify OTP'));
    }

    throw error;
  }
};

export const checkExistingSession = () => async dispatch => {
  try {
    dispatch(setLoading(true));

    // Get stored session data
    const sessionData = await AsyncStorage.getItem('sessionData');
    if (!sessionData) {
      console.log('No session data found');
      dispatch(setLoading(false));
      return false;
    }

    const userData = JSON.parse(sessionData);
    console.log('Found session data for:', userData.phoneNumber);

    // Validate with AWS Cognito
    try {
      const currentUser = await getCurrentUser();
      console.log('Current authenticated user:', currentUser.username);

      const isValid = currentUser.username === userData.username;

      if (isValid) {
        console.log('Valid session found');
        dispatch(setUser(userData));
        dispatch(setLoading(false));
        return true;
      } else {
        console.log('Session invalid: username mismatch');
        await AsyncStorage.removeItem('sessionData');
        dispatch(setLoading(false));
        return false;
      }
    } catch (error) {
      console.error('Not authenticated with Cognito:', error);
      await AsyncStorage.removeItem('sessionData');
      dispatch(setLoading(false));
      return false;
    }
  } catch (error) {
    console.error('Error checking existing session:', error);
    dispatch(setLoading(false));
    return false;
  }
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch(setLoading(true));

    await signOut({ global: true });
    await AsyncStorage.removeItem('sessionData');

    dispatch(resetAuth());
    dispatch(setLoading(false));

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    dispatch(setLoading(false));
    dispatch(setError(error.message || 'Failed to log out'));
    throw error;
  }
};

export default authSlice.reducer;






















// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: null, // Holds user data after login
//     isAuthenticated: false, // Authentication status 
//     loading: false, // Loading state for async actions
//     error: null, // Stores any login error messages
//     isNewUser: false, // to comes from the backend exixting or new user..
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginStart: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         loginSuccess: (state) => {
//             state.loading = false;
//             state.isAuthenticated = true;
//             // state.user = action.payload; // Store user details
//         },
//         loginFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         logout: (state) => {
//             state.user = null;
//             state.isAuthenticated = false;
//             state.isNewUser = false;
//             state.loading = false;
//             state.error = null;
//         },
//         setUser: (state, action) => {
//             state.loading = false;
//             state.isNewUser = action.payload;
//             state.error = null;
//         }
//     },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

// // export const selectIsAuthenticated = state => state.Auth.isAuthenticated;
// export const selectIsNewUser = state => state.Auth.isNewUser;
// export const selectAuthError = state => state.Auth.error;

// export default authSlice.reducer;































// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     isLoading: true,
//     isLoggedIn: false,
//     isNewUser: true,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setLoading: (state, action) => { state.isLoading = action.payload; },
//         setLoggedIn: (state, action) => { state.isLoggedIn = action.payload; },
//         setNewUser: (state, action) => { state.isNewUser = action.payload; },
//     },
// });

// export const { setLoading, setLoggedIn, setNewUser } = authSlice.actions;
// export default authSlice.reducer;
