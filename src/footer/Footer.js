import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Trips from "../Screens/Trips";
import Dashboard from "../Screens/Dashboard";
import Rewards from "../Screens/Rewards";
import Header from "../Components/Header";
import { SvgUri } from "react-native-svg";
import { Keyboard, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from "../Utils/Dimensions";

const Tab = createBottomTabNavigator();

const Footer = () => {

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);



    return (

        <Tab.Navigator
            initialRouteName="Dashboard" // Set Dashboard as the default screen
            screenOptions={({ route }) => ({
                header: () => (
                    <Header
                        title={route.name}
                    // showProfile={route.name === "Dashboard"} // Show Profile icon only for Dashboard
                    // showNotification={route.name === "Dashboard"} // Show Notification icon only for Dashboard
                    // showStatus={route.name === "Dashboard"}
                    />
                ),


                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
                tabBarShowLabel: true,
                tabBarStyle: isKeyboardVisible
                    ? { display: "none" } // Hide tab bar when keyboard is open
                    : {
                        height: 60,
                        backgroundColor: '#282A37',
                        borderTopWidth: 0,
                        // borderTopEndRadius: 30,
                        // borderTopStartRadius: 30,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        paddingBottom: 10,
                        paddingVertical: 13,
                        width: SCREEN_WIDTH,
                        // backgroundColor:"red"
                    },
                // tabBarLabelStyle: {
                //     fontSize: 12,
                //     marginTop: 0,
                // },






            })}>
            <Tab.Screen name="Trips" component={Trips}
                style={{ padding: 50 }}
                options={{
                    title: '',
                    tabBarIcon: () => (
                        <View style={styles.icons}>
                            <SvgUri
                                uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/tripsnavbar.svg"
                                width={30}
                                height={30}
                            />
                        </View>),
                }} />




            {/* <Tab.Screen name="Dashboard" component={Dashboard}
                options={{
                    tabBarIcon: () => (
                        <SvgUri
                            uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Dashboard.svg"
                            width={30}
                            height={30}

                        />),
                }} /> */}



            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarHideOnKeyboard: true,
                    title: '',
                    tabBarIcon: () => (
                        <View style={styles.centerIconContainer}>

                            <SvgUri
                                uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Dashboard.svg"
                                style={styles.centerIcon}
                            />

                        </View>
                    ),
                }}
            />



            <Tab.Screen name="Rewards" component={Rewards}
                options={{
                    title: '',
                    tabBarIcon: () => (
                        <View style={styles.icons}>
                            <SvgUri
                                uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/rewardsnavbar.svg"
                                width={30}
                                height={30}

                            /></View>),
                }} />
        </Tab.Navigator>
        // </NavigationContainer>
    );
};

export default Footer;
const styles = StyleSheet.create({
    bottomtab: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    centerIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 30,
        marginBottom: 30
    },
    centerIcon: {
        width: 60,
        height: 60,
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        // backgroundColor:"red"
    }
})








// import React, { useEffect, useState } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Keyboard, StyleSheet, View } from "react-native";
// import Trips from "../Screens/Trips";
// import Dashboard from "../Screens/Dashboard";
// import Rewards from "../Screens/Rewards";
// import Header from "../Components/Header";
// import { SvgUri } from "react-native-svg";

// const Tab = createBottomTabNavigator();

// const Footer = () => {
//     const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
//             setIsKeyboardVisible(true);
//         });

//         const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
//             setIsKeyboardVisible(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     return (
//         <Tab.Navigator
//             initialRouteName="Dashboard"
//             screenOptions={({ route }) => ({
//                 header: () => <Header title={route.name} />,
//                 tabBarActiveTintColor: "#fff",
//                 tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
//                 tabBarShowLabel: true,
//                 tabBarStyle: isKeyboardVisible
//                     ? { display: "none" } // Hide tab bar when keyboard is open
//                     : {
//                           backgroundColor: "#282A37",
//                           borderTopWidth: 0,
//                           borderTopLeftRadius: 30,
//                           borderTopRightRadius: 30,
//                           position: "absolute",
//                           bottom: 0,
//                           left: 0,
//                           right: 0,
//                           elevation: 0,
//                           paddingBottom: 10,
//                           paddingVertical: 13,
//                       },
//                 tabBarLabelStyle: {
//                     fontSize: 12,
//                     marginTop: 6,
//                 },
//             })}
//         >
//             <Tab.Screen
//                 name="Trips"
//                 component={Trips}
//                 options={{
//                     tabBarIcon: () => (
//                         <SvgUri
//                             uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Vehicles.svg"
//                             width={30}
//                             height={30}
//                         />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="Dashboard"
//                 component={Dashboard}
//                 options={{
//                     title: "",
//                     tabBarIcon: () => (
//                         <View style={styles.centerIconContainer}>
//                             <SvgUri
//                                 uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Dashboard.svg"
//                                 style={styles.centerIcon}
//                             />
//                         </View>
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="Rewards"
//                 component={Rewards}
//                 options={{
//                     tabBarIcon: () => (
//                         <SvgUri
//                             uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/rewardcup.svg"
//                             width={30}
//                             height={30}
//                         />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// };

// export default Footer;

// const styles = StyleSheet.create({
//     centerIconContainer: {
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 30,
//     },
//     centerIcon: {
//         width: 60,
//         height: 60,
//     },
// });
