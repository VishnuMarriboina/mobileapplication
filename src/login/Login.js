import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BRANDCOLOR } from '../Utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, selectIsNewUser, setUser } from '../Redux/Slices/AuthSlice';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ username: '', password: '' });
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.Authdata); // grab the entire auth slice

    const validateInputs = () => {
        let isValid = true;
        let errors = { username: '', password: '' };

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
                console.log("about authentecator", auth.isAuthenticated);

                if (username === '123123' && password === '123123') {
                    dispatch(setUser(false));  // Existing user
                    console.log("user is  existing......", auth.isNewUser)
                } else {
                    dispatch(setUser(true)); //  New  user
                    console.log("user does not existing......")

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
                placeholderTextColor={"green"}
                value={username}
                onChangeText={setUsername}
            />
            {error.username ? <Text style={styles.errorText}>{error.username}</Text> : null}

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"green"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

            {/* Login Button */}
            <TouchableOpacity
                style={[styles.button, (!username || !password) && styles.disabledButton]}
                onPress={handleLogin}
                disabled={!username || !password}
            >
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
        backgroundColor: BRANDCOLOR
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "white"
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
        color: "black"
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
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    disabledButton: {
        // backgroundColor: '#ccc',
        backgroundColor: "white"
        // backgroundColor:"BRANDCOLOR"
    },
    buttonText: {
        color: '#fff',
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;















































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
