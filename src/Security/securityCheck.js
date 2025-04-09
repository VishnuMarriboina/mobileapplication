import { Alert, BackHandler } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RootChecker from 'react-native-root-checker';


const checkSecurity = async () => {
    console.log(" Security check is running...");
    console.log("Available Methods in RootCheck:", RootChecker);
    console.log("Available Methods in DeviceInfo:", DeviceInfo);

    try {
        const isEmulator = await DeviceInfo.isEmulator();
        console.log(` Emulator Detected: ${isEmulator}`);

        // const isRooted = await RootCheck.isRooted();  // Corrected import
        // console.log(` Root Access Detected: ${isRooted}`);


        // const isRooted = await RootChecker.isJailBroken();
        // console.log(` Root Access Detected: ${isRooted}`);
        // Alternative ADB Check (More Reliable)
        const adbEnabled = await DeviceInfo.getSystemProperties('adb_enabled');
        console.log(` Developer Options (ADB Debugging) Enabled: ${adbEnabled}`);

        const isDebugMode = __DEV__;
        console.log(` Debug Mode: ${isDebugMode}`);

        // Convert adbEnabled to boolean
        const isADBEnabled = adbEnabled === '1';

        // 🚨 Block App if Any Security Risk is Found
        if (isEmulator || isADBEnabled || isDebugMode) {
            console.log("Security Violation Detected! Exiting app...");
            Alert.alert(
                'Security Alert',
                'Unauthorized modifications detected. The app will now exit.',
                [{ text: 'OK', onPress: () => BackHandler.exitApp() }]
            );
        } else {
            console.log(" Device is secure.");
        }
    } catch (error) {
        console.log(' Security check error:', error);
    }
};

export default checkSecurity;






























// import { Alert, BackHandler } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import * as RootCheck from 'react-native-root-checker';

// const checkSecurity = async () => {
//     console.log(" Security check is running...");

//     try {
//         const isEmulator = await DeviceInfo.isEmulator();
//         console.log(` Emulator Detected: ${isEmulator}`);

//         const isRooted = await RootCheck.default.isRooted();
//         console.log(` Root Access Detected: ${isRooted}`);

//         const adbEnabled = await DeviceInfo.isAdbEnabled(); // Developer Options check
//         console.log(` Developer Options (ADB Debugging) Enabled: ${adbEnabled}`);

//         const isDebugMode = __DEV__; // Only true in debug mode
//         console.log(` Debug Mode: ${isDebugMode}`);

//         // 🚨 Block if Developer Options are enabled, or if device is an emulator, rooted, or in debug mode
//         if (isEmulator || isRooted || adbEnabled || isDebugMode) {
//             console.log("Security Violation Detected! Exiting app...");
//             Alert.alert(
//                 'Security Alert',
//                 'Unauthorized modifications detected. The app will now exit.',
//                 [{ text: 'OK', onPress: () => BackHandler.exitApp() }]
//             );
//         } else {
//             console.log(" Device is secure.");
//         }
//     } catch (error) {
//         console.log(' Security check error:', error);
//     }
// };

// export default checkSecurity;
