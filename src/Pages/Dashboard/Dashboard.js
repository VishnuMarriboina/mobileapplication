import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Calendar} from 'react-native-calendars';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Utils/Dimensions";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/Dimensions';

Geolocation.getCurrentPosition(info => console.log('Apple', info));

import {ScrollView} from 'react-native-gesture-handler';
import DashboardActive from './DashboardActive';
const Dashboard = () => {
  const [sheetIndex, setSheetIndex] = useState(-1); // Initial index to keep the BottomSheet closed

  const bottomSheetModalRef = useRef(null);
  // Snap points for BottomSheet
  const snapPoints = ['70%']; // Open at 60% of screen height

  // Function to open BottomSheetModal
  const openBottomSheet = () => {
    setSheetIndex(0);
    bottomSheetModalRef.current?.present();
  };

  // Function to close BottomSheetModal
  const closeBottomSheet = () => {
    setSheetIndex(-1);
    bottomSheetModalRef.current?.dismiss();
  };

  //-----------------------------------Function for the Google Map
  //   const [location, setLocation] = useState(null);
  //   useEffect(() => {
  //     const requestLocationPermission = async () => {
  //       try {
  //         if (Platform.OS === 'android') {
  //           const granted = await PermissionsAndroid.requestMultiple([
  //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //             PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  //           ]);

  //           const fineGranted =
  //             granted['android.permission.ACCESS_FINE_LOCATION'] ===
  //             PermissionsAndroid.RESULTS.GRANTED;
  //           const coarseGranted =
  //             granted['android.permission.ACCESS_COARSE_LOCATION'] ===
  //             PermissionsAndroid.RESULTS.GRANTED;

  //           if (!fineGranted && !coarseGranted) {
  //             console.warn('Location permission denied');
  //             return;
  //           }
  //         }

  //         Geolocation.getCurrentPosition(
  //           position => {
  //             console.log('Location position:', position);
  //             const {latitude, longitude} = position.coords;
  //             setLocation({latitude, longitude});
  //           },
  //           error => {
  //             console.error('Geolocation error:', error);
  //           },
  //           {
  //             enableHighAccuracy: true,
  //             timeout: 30000, // Increased from 15000
  //             maximumAge: 1000,
  //           },
  //         );
  //       } catch (err) {
  //         console.error('Permission error:', err);
  //       }
  //     };

  //     requestLocationPermission();
  //   }, []);

  //-----------Calender code
  const [selectedMonth, setSelectedMonth] = useState('Select Month');
  const [marked, setMarked] = useState({
    '2025-04-01': {selected: true, marked: true, selectedColor: 'blue'},
  });

  useEffect(() => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // format: 'YYYY-MM-DD'
    const monthName = today.toLocaleString('en-US', {
      month: 'long',
    });

    setMarked({
      [todayDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#4CAF50',
        marked: false,
        dotColor: 'transparent',
      },
    });
    setSelectedMonth(monthName);
  }, []);

  const onDayPress = day => {
    console.log('Selected day', day);
    setMarked({
      [day.dateString]:
        // { selected: true, marked: true, selectedColor: 'blue' },
        {
          selected: true,
          disableTouchEvent: true,
          selectedColor: '#4CAF50', // Highlight selected date
          marked: false, // No dot
          dotColor: 'transparent', // Also hide dot if marked is true
        },
    });

    const monthYear = new Date(day.dateString).toLocaleString('en-US', {
      month: 'long',
      // year: 'numeric',
    });
    setSelectedMonth(monthYear);
  };

  const [selected, setSelected] = useState('Day'); // default selection
  const options = ['Day', 'Week', 'Month'];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Completed & Active Trips Table */}
          <View style={styles.table}>
            <View>
              <SvgUri
                uri={
                  'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/timelaspe.svg'
                }
                width={60}
                height={60}
              />
              <Text style={{fontSize: 28, fontWeight: 600, color: 'gray'}}>
                Trips
              </Text>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={{fontSize: 20, fontWeight: 600}}>05 Trips</Text>
                <Text style={styles.cellText}>Completed</Text>
              </View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 600}}>06 Trips</Text>
                <Text style={styles.cellText}>Pending</Text>
              </View>
            </View>
          </View>

          {/* Total KM Travelled Table */}
          <View style={styles.kmtable}>
            <View>
              <SvgUri
                uri={
                  'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/distance.svg'
                }
                width={60}
                height={60}
              />
              <View style={{paddingVertical: 10}}>
                <Text style={styles.headingText}>Total KMs Travelled</Text>
                <Text style={styles.headingText}>147 KM</Text>
              </View>
            </View>
          </View>

          {/* Maps View */}

          {/* <View
            style={{
              flex: 1,
              height: 400,
              borderColor: 'skyblue',
              borderWidth: 2,
              marginVertical: 20,
              borderRadius: 5,
            }}> */}
          <View style={styles.MapContainer}>
            <Text
              style={{fontSize: 16, fontWeight: 800}}
              allowFontScaling={false}>
              Live Tracking / Delivery Location
            </Text>
            {/* {location && (

                <MapView
                  // style={styles}
                  region={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  showsUserLocation={true}>
                  <Marker coordinate={location} title="You are here" />
                </MapView> */}

            <MapView
              style={styles.Map}
              initialRegion={{
                latitude: 17.4633081,
                longitude: 78.335882,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              <Marker
                coordinate={{latitude: 17.4633081, longitude: 78.335882}}
                title="My Location"
              />
            </MapView>
            {/* )} */}
          </View>

          {/*  Total Attendance Report Table */}
          <View style={styles.Attendancetable}>
            <View
              style={[
                styles.row,
                {backgroundColor: 'transparent', alignItems: 'center'},
              ]}>
              <View>
                <Text style={{fontSize: 18, fontWeight: 600}}>
                  Attendance Report
                </Text>
              </View>

              {/* buttomsheet function */}
              <View>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: '#EFEFF4',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 5,
                      borderRadius: 15,
                      alignItems: 'center',
                    },
                  ]}
                  onPress={openBottomSheet}>
                  <SvgUri
                    uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/calendar.svg"
                    width={16}
                    height={16}
                  />
                  {/* <Text>March</Text> */}
                  <View style={{paddingHorizontal: 5}}>
                    <Text>{selectedMonth || 'Select Date'} </Text>
                  </View>
                  <SvgUri
                    uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowdown.svg"
                    width={16}
                    height={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Attendancerow}>
              <View>
                <Text>Total Working Days</Text>
              </View>
              <View>
                <Text>21</Text>
              </View>
            </View>
            <View style={styles.Attendancerow}>
              <View>
                <Text>Total Holidays</Text>
              </View>
              <View>
                <Text>07</Text>
              </View>
            </View>
            <View style={styles.Attendancerow}>
              <View>
                <Text>Total Leaves</Text>
              </View>
              <View>
                <Text>03</Text>
              </View>
            </View>
          </View>

          <View>
            {/* BottomSheetModal Component */}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={sheetIndex} // Dynamically change index
              snapPoints={snapPoints}
              enableDynamicSizing={false}
              enablePanDownToClose={true} // Enable swipe down to close
              backdropComponent={props => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1} // Hide backdrop when closed
                  appearsOnIndex={0} // Show backdrop when opened
                  pressBehavior="close" // Tap outside to close
                />
              )}>
              <BottomSheetView style={styles.contentContainer}>
                <ScrollView
                  contentContainerStyle={styles.scrollViewContent}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#F6F6F6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    {options.map(option => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.calenderselection,
                          selected === option && styles.selectedOption, // red background if selected
                        ]}
                        onPress={() => setSelected(option)}>
                        <Text
                          style={[
                            styles.calendertext,
                            selected === option && styles.selectedText, // white text if selected
                          ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Calendar
                    // testID={testIDs.calendars.FIRST}
                    enableSwipeMonths
                    // current={INITIAL_DATE}
                    style={styles.calendar}
                    onDayPress={onDayPress}
                    markedDates={marked}
                    renderHeader={date => {
                      const header = date.toString('MMMM yyyy'); // Format month & year
                      return (
                        <View style={styles.Calendarheader}>
                          <Text style={styles.CalendarheaderText}>
                            {header}
                          </Text>
                        </View>
                      );
                    }}
                    theme={{
                      // calendarBackground: '#D9D9D9',
                      textMonthFontSize: 18,
                      textMonthFontWeight: 'bold',
                      arrowColor: 'black',
                      textSectionTitleColor: 'black', // Weekday header color
                      // textSectionTitleDisabledColor: 'red', // Sunday color
                    }}

                    // dayComponent={({ date, state }) => {
                    //   const isSunday = new Date(date.year, date.month - 1, date.day).getDay() === 0; // Check if it's Sunday
                    //   return (
                    //     <View>
                    //       <Text
                    //         style={[
                    //           styles.dayText,
                    //           isSunday && styles.sundayText, // Apply red color to Sundays
                    //           state === 'disabled' && styles.disabledText, // Grey for other months
                    //         ]}
                    //       >
                    //         {date.day}
                    //       </Text>
                    //     </View>
                    //   );
                    // }}
                  />

                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                      style={styles.closebutton}
                      onPress={closeBottomSheet}>
                      <Text style={styles.text}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5', // Light grey background
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  table: {
    backgroundColor: '#CDE9D4',
    backgroundColor: 'rgb(205, 228, 211)',
    borderRadius: 10,
    overflow: 'hidden',
    // elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // padding:20
  },
  kmtable: {
    backgroundColor: '#9C99F5',
    borderRadius: 10,
    overflow: 'hidden',
    // elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    padding: 20,
    flex: 1,
    // backgroundColor:"red"
  },
  MapContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    padding: 10,
    height: 300,
  },
  Map: {
    height: 250,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'red',
  },
  Attendancetable: {
    // backgroundColor: "#9C99F5",
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    padding: 20,
  },
  heading: {
    backgroundColor: '#0F5348',
    padding: 12,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    // paddingHorizontal: 15,
  },
  Attendancerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#EFEFF4',
    marginBottom: 4,
    borderRadius: 10,
  },
  cellText: {
    fontSize: 12,
    color: '#333',
  },

  //------------------------------------------bottomsheet
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    paddingBottom: 100, // To ensure the content doesn't get cut off by the BottomSheet
    // alignItems: 'center',
    // justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  closebutton: {
    // backgroundColor: "#156CF7",
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: SCREEN_WIDTH / 1.2,
    alignItems: 'center',
    // marginRight: 30,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'gray',
  },
  calendar: {
    width: SCREEN_WIDTH * 0.9,
    // height: 350,
    // height:SCREEN_HEIGHT/2.0,
    // marginBottom: 15,
    // backgroundColor: "red",
    borderRadius: 20,
    // borderWidth: 2,
    padding: 15,
    // backgroundColor: "#D9D9D9"
  },
  Calendarheader: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  CalendarheaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calenderselection: {
    backgroundColor: 'white',
    borderRadius: 20,
    // paddingHorizontal: 10,
    padding: 5,
    // backgroundColor: "red",
    marginHorizontal: 5,
    width: 70,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendertext: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  selectedOption: {
    backgroundColor: '#128C7E33',
  },
});

// import React, { useEffect, useState } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Trips from "../Screens/Trips";
// import Dashboard from "../Screens/Dashboard";
// import Rewards from "../Screens/Rewards";
// import Header from "../Components/Header";
// import { SvgUri } from "react-native-svg";
// import { Keyboard, StyleSheet, View } from "react-native";
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Utils/Dimensions";

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
//             initialRouteName="Dashboard" // Set Dashboard as the default screen
//             screenOptions={({ route }) => ({
//                 header: () => (
//                     <Header
//                         title={route.name}
//                     // showProfile={route.name === "Dashboard"} // Show Profile icon only for Dashboard
//                     // showNotification={route.name === "Dashboard"} // Show Notification icon only for Dashboard
//                     // showStatus={route.name === "Dashboard"}
//                     />
//                 ),

//                 tabBarActiveTintColor: '#fff',
//                 tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
//                 tabBarShowLabel: true,
//                 tabBarStyle: isKeyboardVisible
//                     ? { display: "none" } // Hide tab bar when keyboard is open
//                     : {
//                         height: SCREEN_HEIGHT * 0.09,
//                         backgroundColor: '#282A37',
//                         borderTopWidth: 0,
//                         // borderTopEndRadius: 30,
//                         // borderTopStartRadius: 30,
//                         borderTopLeftRadius: 30,
//                         borderTopRightRadius: 30,
//                         position: 'absolute',
//                         // bottom: 0,
//                         // left: 0,
//                         // right: 0,
//                         // elevation: 0,
//                         paddingBottom: 10,
//                         paddingVertical: 13,
//                         width: SCREEN_WIDTH,
//                         // backgroundColor:"red"
//                     },
//                 // tabBarLabelStyle: {
//                 //     fontSize: 12,
//                 //     marginTop: 0,
//                 // },

//             })}>
//             <Tab.Screen name="Trips" component={Trips}
//                 style={{ padding: 50 }}
//                 options={{
//                     title: '',
//                     tabBarIcon: () => (
//                         <View style={styles.icons}>
//                             <SvgUri
//                                 uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/tripsnavbar.svg"
//                                 width={30}
//                                 height={30}
//                             />
//                         </View>),
//                 }} />

//             {/* <Tab.Screen name="Dashboard" component={Dashboard}
//                 options={{
//                     tabBarIcon: () => (
//                         <SvgUri
//                             uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Dashboard.svg"
//                             width={30}
//                             height={30}

//                         />),
//                 }} /> */}

//             <Tab.Screen
//                 name="Dashboard"
//                 component={Dashboard}
//                 options={{
//                     tabBarHideOnKeyboard: true,
//                     title: '',
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

//             <Tab.Screen name="Rewards" component={Rewards}
//                 options={{
//                     title: '',
//                     tabBarIcon: () => (
//                         <View style={styles.icons}>
//                             <SvgUri
//                                 uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/rewardsnavbar.svg"
//                                 width={30}
//                                 height={30}

//                             /></View>),
//                 }} />
//         </Tab.Navigator>
//         // </NavigationContainer>
//     );
// };

// export default Footer;
// const styles = StyleSheet.create({
//     bottomtab: {
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30
//     },
//     centerIconContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         // marginTop: 30,
//         marginBottom: 30
//     },
//     centerIcon: {
//         width: 60,
//         height: 60,
//     },
//     icons: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//         // backgroundColor:"red"
//     }
// })

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

{
  /* <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                  <View style={{ backgroundColor: "white", margin: 20, borderRadius: 10, padding: 15 }}>
                    <Calendar
                      onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                        setModalVisible(false); // Close modal on date selection
                      }}
                      markedDates={{
                        [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
                      }}
                    />
                  </View>
                </View>
              </Modal> */
}

{
  /* <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Initially closed
                snapPoints={snapPoints}
                enablePanDownToClose={true}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <Text style={styles.text}>This is a Bottom Sheet 🎉</Text>
                  <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ backgroundColor: "white", margin: 20, borderRadius: 10, padding: 15 }}>
                      <Calendar
                        onDayPress={(day) => {
                          setSelectedDate(day.dateString);
                          // setModalVisible(false); // Close modal on date selection
                        }}
                        markedDates={{
                          [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
                        }}
                      />
                    </View>
                  </View>
                  <Button onPress={handleCloseSheet} title="Close" />
                </BottomSheetView>
              </BottomSheet> */
}

// separator: {
//   height: 2,
//   backgroundColor: "#D9D9D9",
// },
// line: {
//   height: 1,
//   backgroundColor: "#D9D9D9",
//   marginHorizontal: 15,
//   backgroundColor: "red"
// },

// sheetContent: {
//   padding: 16,
//   alignItems: "center",
// },
// kmText: {
//   fontSize: 20,
//   fontWeight: "bold",
//   color: "#0F5348",
//   // textAlign: "center",
//   // flex: 1,
//   // paddingVertical: 15,
// },
// bottomSheetBackground: {
//   backgroundColor: "#f5f5f5",
//   borderTopLeftRadius: 20,
//   borderTopRightRadius: 20,
// },
// bottomcontainer: {
//   padding: 20,
//   alignItems: "center",
// },
// headerContainer: {
//   marginBottom: 10,
//   paddingVertical: 10,
//   width: "100%",
//   alignItems: "center",
//   borderBottomWidth: 1,
//   borderBottomColor: "#ddd",
// },
// headerText: {
//   fontSize: 18,
//   fontWeight: "bold",
//   color: "#333",
// },
