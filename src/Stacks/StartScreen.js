import React, { useEffect, useState } from 'react';
import Splash from '../Components/Splash'
import Login from '../login/Login'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/Slices/AuthSlice'
import { DriverProfile, MainStack } from './Export';
// import DriverProfile from '../Uploads/DriverProfile'
// import MainStack from './MainStack';
import DriverDetails from '../Uploads/DriverDetails';
import DrawerScreen from './Drawer';
const StartScreen = () => {
    const [isLoading, setIsLoading] = useState(true); // Correct variable name
    const dispatch = useDispatch();
    const { isNewUser, isAuthenticated } = useSelector(state => state.Authdata)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         // dispatch(setUser());
    //         console.log("start scrren about authentication", isAuthenticated);
    //         console.log("start scrren about user", isNewUser);
    //     }, 5500);
    // }, [isAuthenticated, isNewUser]);




    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            console.log("isAuthenticated: on top", isAuthenticated);
            console.log("isNewUser: on top", isNewUser);
        }, 2000); // set to 2s for better dev experience
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        console.log(" Auth state changed!");
        console.log("isAuthenticated:", isAuthenticated);
        console.log("isNewUser:", isNewUser);
    }, [isAuthenticated, isNewUser]);


    return (
        <>
            {/* {isLoading ? (<Splash />): ({<Login /> ?  } )}  Correct variable name */}
            {/* {isLoading ? <Splash /> : <Login /> : !isNewUser ? <MainStack /> :<DriverDetails />} */}

            {
                isLoading ? (<Splash />) : !isAuthenticated ? (<Login />) : isNewUser ? <DriverDetails /> : <DrawerScreen />
            }



            {/* isLoading ? <Splash />: !isLoggedIn ? <Login onLoginSuccess={() => setIsLoggedIn(true)} />
            : isNewUser ? <AddDetails onComplete={() => setIsNewUser(false)} />
            : <MainStack /> */}
        </>
    );
};

export default StartScreen;

// return (
//     isLoading ? <Splash />
//     : !isLoggedIn ? <Login onLoginSuccess={() => setIsLoggedIn(true)} />
//     : isNewUser ? <AddDetails onComplete={() => setIsNewUser(false)} />
//     : <MainStack />
// );



// import React, { useEffect, useState } from 'react';
// import Splash from '../Components/Splash'
// import Login from '../login/Login'
// import { useDispatch, useSelector } from 'react-redux';
// import { DriverProfile, MainStack } from './Export';
// import DriverDetails from '../Uploads/DriverDetails';

// const StartScreen = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const dispatch = useDispatch();
//     const { isNewUser, isAuthenticated } = useSelector(state => state.Authdata);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setIsLoading(false);
//         }, 2000); // set to 2s for better dev experience
//         return () => clearTimeout(timeout);
//     }, []);

//     useEffect(() => {
//         console.log(" Auth state changed!");
//         console.log("isAuthenticated:", isAuthenticated);
//         console.log("isNewUser:", isNewUser);
//     }, [isAuthenticated, isNewUser]);

//     return (
//         <>
//             {
//                 isLoading
//                     ? <Splash />
//                     : !isAuthenticated
//                         ? <Login />
//                         : isNewUser
//                             ? <DriverProfile />
//                             : <MainStack />
//             }
//         </>
//     );
// };

// export default StartScreen;
