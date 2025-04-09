import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { BRANDCOLOR } from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import BarCard from '../Components/BarCard';
import { SCREEN_WIDTH } from '../Utils/Dimensions';
import { logout } from '../Redux/Slices/AuthSlice';
const Profile = () => {

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
                        dispatch(logout());
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };


    return (
        <>

            {/* top of the profile page */}
            <View style={styles.header}>
                <View>
                    <View style={styles.profileImageContainerN}>
                        <View style={styles.innerImageContainerN}>

                            <SvgUri
                                uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Consumer_App/profilenavbar.svg'}
                                height={42}
                                width={42}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.cameraIconN}
                            onPress={() => Alert.alert("edit profile!")}
                            activeOpacity={0.9}>
                            <SvgUri
                                uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Consumer_App/edit.svg"}
                                height={42}
                                width={42}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* name and status from the redux tool kit */}
                    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                        <Text style={styles.name}>{driverName || "N/A"}</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <View style={[styles.colorball, { backgroundColor: status?.toLowerCase() === "active" ? "#22C55E" : "red" }]} />
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

                    <BarCard onPress={() => navigation.navigate("Footer", { screen: "Trips" })} >
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

        </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: "transparent", // Light grey background
        flex: 1,
        paddingVertical: 15
        // backgroundColor: "blue",
        // paddingBottom:50
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        paddingVertical: 16,
        backgroundColor: "red",
        position: "relative",
        // height: 170,
        marginTop: 35,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        backgroundColor: BRANDCOLOR,
        paddingHorizontal: 10,
        // paddingTop: 10, 
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
        // backgroundColor: BRANDCOLOR
        backgroundColor: "white"
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
        width: SCREEN_WIDTH * 0.9
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
})

export default Profile



















{/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.profileImageContainerN}>
                            <View style={styles.innerImageContainerN}>

                                <SvgUri
                                    uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Consumer_App/profilenavbar.svg'}
                                    height={42}
                                    width={42}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.cameraIconN}
                                onPress={() => Alert.alert("edit profile!")}
                                activeOpacity={0.9}>
                                <SvgUri

                                    uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Consumer_App/edit.svg"}
                                    height={42}
                                    width={42}
                                />



                            </TouchableOpacity>


                        </View>

                    </View> */}














{/* <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} >
                    <SvgUri
                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/arrowbackwhite.svg'}
                        height={28}
                        width={28}
                    />
                </TouchableOpacity>

                <Text style={styles.headerText}>Profile</Text> */}











//       {/* Completed & Active Trips Table */}
//       <View style={styles.table}>
//       <View style={styles.heading}>
//           <Text style={styles.headingText}>Driver Details</Text>
//       </View>

//       <View style={styles.row}>
//           <Text style={styles.Text}>Driver Name*</Text>
//           <Text style={styles.Text}>05 Trips</Text>
//       </View>
//       <View style={styles.line} />

//       <View style={styles.row}>
//           <Text style={styles.Text}>Personal Number</Text>
//           <Text style={styles.Text}>1234567890</Text>
//       </View>
//       <View style={styles.line} />
//       <View style={styles.row}>
//           <Text style={styles.Text}>Emergency Number</Text>
//           <Text style={styles.Text}>9876543210</Text>
//       </View>
//       <View style={styles.line} />
//       <View style={styles.row}>
//           <Text style={styles.Text}>Blood Group*</Text>
//           <Text style={styles.Text}>O+</Text>
//       </View>
//       <View style={styles.line} />
//       <View style={styles.row}>
//           <Text style={styles.Text}>Permanent Address*</Text>
//           <Text style={styles.Text}>05 Trips</Text>
//       </View>
//       <View style={styles.line} />
//       <View style={styles.row}>
//           <Text style={styles.Text}>Status</Text>
//           <Text style={styles.Text}>Active</Text>
//       </View>
//   </View>


//   {/* Toggle button */}
//   <BarCard bgColor="blue"
//       onPress={() => {
//           Alert.alert("Navigate to the respective page");
//       }}>

//       {/* <View > */}
//       <TouchableOpacity style={styles.outer} activeOpacity={1} onPress={handleToggle}>
//           <View style={[styles.inner, isToggled && styles.innerToggled]} >

//               <Text style={[styles.toggleText, isToggled && styles.activeText]}>
//                   {isToggled ? "Active" : "Inactive"}
//               </Text>

//           </View>
//       </TouchableOpacity>
//       {/* </View> */}

//   </BarCard >


//   {/* last table */}
//   <View style={styles.table}>
//       <View style={styles.heading}>
//           <Text style={styles.headingText}>Driver Documents</Text>
//       </View>
//       <View style={styles.row}>
//           <Text style={styles.Text}>Aadhar Card*</Text>
//           <View style={styles.rowview}>
//               <Text style={styles.Text}>%</Text>
//               <Text style={styles.Text}>%</Text>
//           </View>
//       </View>
//       <View style={styles.line} />

//       <View style={styles.row}>
//           <Text style={styles.Text}>License</Text>
//           <View style={styles.rowview}>
//               <Text style={styles.Text}>%</Text>
//               <Text style={styles.Text}>%</Text>
//           </View>

//       </View>
//       <View style={styles.line} />
//       <View style={styles.row}>
//           <Text style={styles.Text}>Insurance</Text>
//           <View style={styles.rowview}>
//               <Text style={styles.image}>%</Text>
//               <Text style={styles.image}>%</Text>
//           </View>
//       </View>

//   </View>

//   <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "transparent", marginBottom: 100 }}>
//       <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogout}
//       >
//           <Text style={styles.Text}>LogOut</Text>
//       </TouchableOpacity>
//   </View>
