import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { SvgUri } from "react-native-svg";
import { BRANDCOLOR } from "../Utils/Colors";
import DrawerNavigator from "../DrawerNavigator/CustomDrawerContent";
import { updateDriverDetails } from '../Redux/Slices/DriverSlice';
import { useDispatch, useSelector } from "react-redux";

const Header = ({ title }) => {

    const [isToggled, setIsToggled] = useState(false);


    const dispatch = useDispatch();
    // const status = useSelector((state) => { state.Driverdata })
    const status = useSelector((state) => state.Driverdata.status);


    // const { status } = useSelector((state) => state.Driverdata);
    console.log("status", status)
    // const handleToggle = () => {
    //     setIsToggled((prev) => !prev);


    // };

    const handleToggle = () => {
        const newStatus = isToggled ? "Inactive" : "Active";
        setIsToggled((prev) => !prev);

        dispatch(updateDriverDetails({
            ...status,
            status: newStatus,
        }));
    };





    // if (isToggled) {

    //     dispatch(updateDriverDetails({
    //         status: isToggled,
    //     }
    //     ));

    // } else {
    //     dispatch(updateDriverDetails({
    //         status: isToggled,
    //     }
    //     ));
    // }


    // const [isDrawer, setIsDrawer] = useState(false);
    // const handleDrawer = () => {
    //     setIsDrawer((prev) => !prev);
    // };

    // if (isDrawer) {
    //     console.log("drawer is called!!");
    //     return <DrawerNavigator />
    // }


    const navigation = useNavigation();
    return (
        <>
            {/* <StatusBar /> */}
            <StatusBar backgroundColor={'#1D6B5C'} barStyle="light-content" translucent={true} />
            <SafeAreaView style={{ backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                {/* <LinearGradient colors={['#0F5348', '#208575']} style={styles.headerleaner}> */}
                {title === "Dashboard" ? (

                    <LinearGradient colors={['#1D6B5C', '#148B7E']} style={styles.headerleaner}>
                        <View style={styles.header}>
                            <View>
                                <TouchableOpacity
                                    // onPress={() => navigation.navigate("NotificationScreen")}

                                    // onPress={() => navigation.navigate("Profile")}
                                    // onPress={handleDrawer}

                                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}

                                // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                                >
                                    {/* onPress={() => navigation.navigate("Insurence")}> */}

                                    <SvgUri
                                        uri={
                                            'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/hamburger.svg'
                                        }
                                        style={{ width: 24, height: 24 }}

                                    />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.headerText}>{title}</Text>
                            </View>

                            <View>
                                <TouchableOpacity
                                    style={[styles.outer, isToggled && styles.outerToggled]}
                                    activeOpacity={1}
                                    onPress={handleToggle}
                                >
                                    {/* Text moves to the left when active, right when inactive */}
                                    <Text style={[styles.toggleText, isToggled ? styles.textRight : styles.textLeft]}>
                                        {isToggled ? "Active" : "Inactive"}
                                    </Text>

                                    {/* Inner circle moves to opposite side */}
                                    <View style={[styles.inner, isToggled ? styles.innerToggled : styles.innerNotToggled]} />
                                </TouchableOpacity>

                            </View>


                            <View>
                                <TouchableOpacity
                                    // onPress={() => navigation.navigate("Profile")}

                                    onPress={() => navigation.navigate("NotificationScreen")}
                                >

                                    <SvgUri
                                        uri={
                                            'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/notification.svg'
                                        }
                                        style={{ width: 24, height: 24 }}

                                    />


                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>

                ) : title === "Trips" || title === "Rewards" ? (
                    <View>
                        <LinearGradient colors={['#1D6B5C', '#148B7E']} style={styles.defaultHeader}>
                            <Text style={styles.headerText}>{title}</Text>
                        </LinearGradient>
                    </View>
                ) : (
                    <View>
                        {/* <Text>Defalut Header</Text> */}
                    </View>
                )}
                {/* </LinearGradient> */}
            </SafeAreaView>


        </>
    );
};

const styles = StyleSheet.create({
    headerleaner: {
        felx: 1,
        // height: 70,
    },
    header: {
        height: 70,
        // marginTop: 40,
        // backgroundColor: "#208575",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20
    },

    defaultHeader: {
        // backgroundColor: "#0F5348",
        padding: 15,
        alignItems: "flex-start",
        justifyContent: "center",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        height: 120,
        backgroundColor: BRANDCOLOR,
        paddingHorizontal: 40
    },
    headerText: {
        color: "#FFFFFF",
        fontWeight: 600,
        fontSize: 24,

    },

    // Toggle Text
    outer: {
        width: 74,
        height: 24,
        borderRadius: 15,
        // flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 4,
        // justifyContent: "space-between",
        justifyContent: "center",
        backgroundColor: "white",
        // borderWidth: 1,
        // borderColor: "#ccc",
        // marginHorizontal: 30,
        // marginVertical: 20,
        // position: "relative",
        // elevation: 3,
        // borderRadius:210
    },
    outerToggled: {
        // backgroundColor: "green",
        backgroundColor: "#1D8B75"
    },
    inner: {
        width: 22,
        height: 22,
        borderRadius: 11,
        position: "absolute",
    },
    innerNotToggled: {
        backgroundColor: "green",
        left: 0, // Moves to left when inactive
    },
    innerToggled: {
        backgroundColor: "white",
        right: 0, // Moves to right when active
    },
    toggleText: {
        fontSize: 12,
        fontWeight: "bold",
        position: "absolute",
        textAlign: "center",
    },
    textLeft: {
        left: 24, // Moves text to right when inactive
        color: "black",
    },
    textRight: {
        right: 30, // Moves text to left when active
        color: "white",
    },




});

export default Header;






// {/* Left Notification Icon (Only for Dashboard) */}
// {showNotification ? (
//     <TouchableOpacity style={styles.leftIcon}
//         onPress={() => navigation.navigate("NotificationScreen")}>

//         <SvgUri
//             uri={
//                 'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/notification.svg'
//             }
//             style={{ width: 24, height: 24 }}

//         />
//     </TouchableOpacity>
// ) : (<View />)}

// {/* Title */}
// <Text style={styles.headerText}>{title}</Text>

// {/*-----------Toggle Button-----------------*/}
// {showStatus ? (
//     <TouchableOpacity
//         style={[styles.outer, isToggled && styles.outerToggled]}
//         activeOpacity={1}
//         onPress={handleToggle}
//     >
//         {/* Text moves to the left when active, right when inactive */}
//         <Text style={[styles.toggleText, isToggled ? styles.textRight : styles.textLeft]}>
//             {isToggled ? "Active" : "Inactive"}
//         </Text>

//         {/* Inner circle moves to opposite side */}
//         <View style={[styles.inner, isToggled ? styles.innerToggled : styles.innerNotToggled]} />
//     </TouchableOpacity>) : (<View />)}


// {/* Right Profile Icon (Only for Dashboard) */}
// {showProfile ? (
//     <TouchableOpacity
//         style={styles.rightIcon}
//         onPress={() => navigation.navigate("Profile")}
//     >

//         <SvgUri
//             uri={
//                 'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/profilecircle.svg'
//             }
//             height={26}
//             width={26}


//         />

//     </TouchableOpacity>
// ) : (<View />)}

// {/* code for dashboard */}

// <View>
//     <View>
//         <Text>Icon</Text>
//     </View>
//     <View>
//         <Text>Dashboard</Text>
//     </View>
//     <View>
//         <Text>Toggle</Text>
//     </View>
//     <View>
//         <Text>Icon2</Text>
//     </View>
// </View>


// {/* code for Trips or rewards */}

// <View>
// <Text style={styles.headerText}>{title}</Text>

// </View>

