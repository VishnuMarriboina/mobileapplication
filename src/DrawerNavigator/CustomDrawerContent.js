import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert,Image } from 'react-native'
import React, { useState } from 'react'
import { BRANDCOLOR } from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {  SvgUri } from 'react-native-svg';
import BarCard from '../Components/BarCard';
import { SCREEN_WIDTH } from '../Utils/Dimensions';
import { logout, resetAuth } from '../Redux/Slices/AuthSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
const CustomDrawerContent = () => {

    const navigation = useNavigation();


    const dispatch = useDispatch();
    const { driverName, status } = useSelector((state) => state.Driverdata);


    const handleLogout = async () => {
        Alert.alert(
            "Logout Confirmation",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    onPress: async () => {
                        dispatch(resetAuth());
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };



    return (
        <>

            {/* top of the profile page */}

            <SafeAreaView
                // style={{ backgroundColor: "red", borderRadius: 15 }}
                style={[{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }, { backgroundColor: "#1D6B5C", flex: 1 }]}

            >

                <View style={styles.header}>
                    <View>
                        <TouchableOpacity style={styles.profileImageContainerN}
                        
                        onPress={()=>{
                            navigation.navigate("DriverProfile")
                        }}
                        >

{/* onPress={() => navigation.navigate("Footer", { screen: "DriverProfile" })} > */}
                            <View style={styles.innerImageContainerN}>

                                {/* <SvgUri
                                    uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Consumer_App/profilenavbar.svg'}
                                    height={42}
                                    width={42}
                                /> */}


                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                                    style={styles.avatar}
                                />


                            </View>
                            {/* <TouchableOpacity
                                style={styles.cameraIconN}
                                onPress={() => Alert.alert("edit profile!")}
                                activeOpacity={0.9}>
                                <SvgUri
                                    uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Consumer_App/edit.svg"}
                                    height={42}
                                    width={42}
                                />
                            </TouchableOpacity> */}
                        </TouchableOpacity>

 {/* <View >
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: imageUri }} style={styles.avatar} />
              <TouchableOpacity style={styles.cameraIconWrapper}
               onPress={()=>{navigation.navigate("DriverProfile")}}
               >
                <SvgUri
                  uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/camera.svg"
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>Ajith Singh</Text>
          </View> */}



                        {/* name and status from the redux tool kit */}
                        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                            <Text style={styles.name}>{driverName || "N/A"}</Text>

                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                <View style={[styles.colorball,
                                // { backgroundColor: status?.toLowerCase() === "active" ? "#22C55E" : "red" }
                                {
                                    backgroundColor:
                                        typeof status === "string" && status.toLowerCase() === "active"
                                            ? "#22C55E"
                                            : "red",
                                },

                                ]} />
                                <Text style={styles.status}>{status || "N/A"}</Text>
                            </View>
                        </View>
                    </View>
                </View>




                {/* content of the page or body of the page */}
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* ....................new code....... */}
                        <BarCard onPress={() => navigation.navigate("Footer")} >
                            <View style={styles.Card}>
                                <View>

                                    <SvgUri
                                        uri={
                                            'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/dashboard.svg'
                                        }
                                        style={{ width: 24, height: 24 }}

                                    />
                                </View>
                                <View style={styles.Info}>
                                    <Text style={styles.InfoName}>Dashboard</Text>
                                </View>

                                <View
                                    style={styles.forwardarrow}>
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowforward.svg'}
                                        height={34}
                                        width={20}
                                        tintColor={"gray"}
                                    />

                                </View>
                            </View>
                        </BarCard>

                        <BarCard
                            // width={SCREEN_WIDTH * 0.6}
                            onPress={() => navigation.navigate("Footer", { screen: "Trips" })} >
                            <View style={styles.Card}>
                                <View>
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/truckwithbg.svg'}
                                        style={{ width: 24, height: 24 }}
                                    />


                                </View>
                                <View style={styles.Info}>
                                    <Text style={styles.InfoName}>My Trips</Text>

                                </View>
                                <View
                                    style={styles.forwardarrow}>
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowforward.svg'}
                                        height={34}
                                        width={20}
                                        tintColor={"gray"}
                                    />
                                </View>
                            </View>
                        </BarCard>

                        <BarCard onPress={() => { navigation.navigate("FuelRecords") }}>
                            <View style={styles.Card}>
                                <View>
                                    <SvgUri
                                        uri={
                                            'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/fuelrecords.svg'
                                        }
                                        style={{ width: 24, height: 24 }}

                                    />

                                </View>
                                <View style={styles.Info}>
                                    <Text style={styles.InfoName}>Fuel Records</Text>

                                </View>
                                <View
                                    style={styles.forwardarrow}>
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowforward.svg'}
                                        height={34}
                                        width={20}
                                        tintColor={"gray"}
                                    />
                                </View>
                            </View>
                        </BarCard>

                        <BarCard onPress={handleLogout}>
                            <View style={styles.Card}>
                                <View>
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/logout.svg'
                                        }
                                        height={32}
                                        width={32}
                                    />
                                </View>
                                <View style={styles.Info}>
                                    <Text style={styles.InfoName}>LogOut</Text>

                                </View>
                                <View
                                    style={styles.forwardarrow}>
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowforward.svg'}
                                        height={34}
                                        width={20}
                                        tintColor={"gray"}
                                    />
                                </View>
                            </View>
                        </BarCard>

                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )






};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    drawerItem: {
        marginVertical: 10,
        backgroundColor: "red",
    },
    drawerLabel: {
        fontSize: 16,
        fontWeight: '500',
    },

    container: {
        paddingHorizontal: 15,
        backgroundColor: "transparent", // Light grey background
        flex: 1,
        paddingVertical: 15,
        // backgroundColor: "blue",
        // paddingBottom:50,
        backgroundColor: "white"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        paddingVertical: 16,
        backgroundColor: "#1D6B5C",
        position: "relative",
        // height: 170,
        // marginTop: 35,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // backgroundColor: BRANDCOLOR,
        paddingHorizontal: 10,
        // paddingTop: 10, 
        // flex:1
    },
    cameraIconN: {
        position: 'absolute',
        bottom: 0,
        right: -15,
        borderRadius: 17,
        padding: 7,
        backgroundColor: "#59AC9F"
        // backgroundColor:"white"
    },
    profileImageContainerN: {
        borderColor: "white",
        // borderWidth: 2,
        borderRadius: 135,
        height: 135,
        width: 135,
        // marginTop: -85,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        // paddingHorizontal: 50
    },
    innerImageContainerN: {
        borderColor: "white",
        // borderWidth: 5,
        borderRadius: 125,
        height: 125,
        width: 125,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: BRANDCOLOR
        // backgroundColor: "white",
    },
    avatar: {
        width: 125,
        height:125,
        borderRadius: 75,
    },

    // code for new 

    Card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        backgroundColor: "transparent",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#9C99F5",
        backgroundColor: "#E5E7EB",
        width: SCREEN_WIDTH * 0.75,
        // backgroundColor: "red"
        // elevation: 2,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
    },
    Info: {
        flex: 1,
        marginLeft: 12,
    },
    InfoName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
        paddingHorizontal: 10
    },
    forwardarrow: {
        // padding: 1,
    },
    name: {
        fontWeight: 600,
        fontSize: 28,
        color: "white"
    },
    status: {
        fontSize: 20,
        fontWeight: 300,
        color: "white"
    },
    colorball: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    }
});










    // return (
    //     <ScrollView style={styles.container}>
    //     {/* <SafeAreaView style={[styles.container, 
    // {
    //         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    //     }]}> */}

    //         {/* Navigate to Home tab */}
    //         {/* <TouchableOpacity
    //             onPress={() => navigation.navigate('Footer', { screen: 'DashBoard' })}
    //             style={styles.drawerItem}
    //         >
    //             <Text style={styles.drawerLabel}>Home</Text>
    //         </TouchableOpacity> */}

    //         {/* Navigate to Trips tab */}
    //         {/* <TouchableOpacity
    //             onPress={() => navigation.navigate('Footer', { screen: 'Trips' })}
    //             style={styles.drawerItem}
    //         >
    //             <Text style={styles.drawerLabel}>My Trips</Text>
    //         </TouchableOpacity> */}

    //         {/* Navigate to Profile tab */}
    //         {/* <TouchableOpacity
    //             // onPress={() => navigation.navigate('Footer', { screen: 'Profile' })}
    //             // onPress={navigation.navigate("Profile")}
    //             onPress={() => navigation.navigate("Profile")}

    //             style={styles.drawerItem}
    //         >
    //             <Text style={styles.drawerLabel}>Profile</Text>
    //         </TouchableOpacity> */}

    //         <Profile />
    //         {/* <Profile /> */}
    //     {/* </SafeAreaView> */}
    //      </ScrollView>
    // );

