
// import { View, Text, StatusBar, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { SvgUri } from 'react-native-svg';
// import LinearGradient from 'react-native-linear-gradient';
// import { BRANDCOLOR } from '../Utils/Colors';

// const NotificationScreen = () => {
//   const navigation = useNavigation();

//   return (<>
//     {/* <StatusBar barStyle={"dark-content"} backgroundColor="white" /> */}
//     <View style={{ flex: 1, backgroundColor: "skyblue" }}>
//       {/* <LinearGradient colors={['#0F5348', '#FFFFFF']} style={{ flex: 1 }} > */}
//       {/* header */}
//       {/* <View style={styles.header}>
//         <View>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <SvgUri
//               uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/arrowbackwhite.svg'}
//               height={28}
//               width={28}
//             />
//           </TouchableOpacity>
//         </View>
//         <View>
//           <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold' }}>
//             Notification
//           </Text>
//         </View>
//         <View>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}>
//             <Text style={{ fontSize: 20, color: "white", fontWeight: '500' }}>
//               Notification
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View> */}

//       <View style={styles.header}>
//         {/* Back Button */}
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <SvgUri
//             uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg'}
//             height={18}
//             width={18}
//           />
//         </TouchableOpacity>

//         {/* Notification Title */}
//         <Text style={styles.headerText}>Notification</Text>

//         {/* Notification Button */}
//         <TouchableOpacity style={styles.notificationButton}

//           onPress={() => { Alert.alert("clear all the notification data") }}>
//           <Text style={styles.notificationText}>clear All</Text>
//         </TouchableOpacity>
//       </View>





//       {/* content */}
//       <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//         <Text style={{ fontWeight: 700, color: "black", fontSize: 28 }}>
//           No Notifications
//         </Text>
//         {/* <View style={{ marginVertical: 50 }}>
//           <TouchableOpacity onPress={() => navigation.navigate("DriverDetails")}>

//             <Text style={{ fontWeight: 700, color: "black", fontSize: 28 }}>
//               DriverDetails Page
//             </Text>
//           </TouchableOpacity>
//         </View> */}
//       </View>

//       {/* </LinearGradient> */}
//     </View>
//   </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red", // Ensures the StatusBar area is red

//   },
//   gradient: {
//     flex: 1, // Makes the gradient cover the full screen
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 20, // Ensures spacing at the bottom
//   },
//   // header: {
//   //   flexDirection: "row",
//   //   alignItems: "center",
//   //   // justifyContent: "center",
//   //   paddingVertical: 16,
//   //   backgroundColor: "red",
//   //   position: "relative",
//   //   height: 70,
//   //   marginTop: 40,
//   //   justifyContent: "space-between"

//   //   // backgroundColor: BRANDCOLOR
//   // },
//   // // header: {
//   // //   flexDirection: "row",
//   // //   justifyContent: "space-between",
//   // //   alignItems: "center",
//   // //   backgroundColor: "#8B5CF6", // Example background color
//   // //   padding: 12,
//   // //   borderRadius: 10,
//   // //   marginHorizontal: 10
//   // // },

//   // // backButton: {
//   // //   padding: 10,
//   // // },

//   // // headerText: {
//   // //   fontSize: 20,
//   // //   color: "white",
//   // //   fontWeight: "bold",
//   // // },

//   // // notificationButton: {
//   // //   padding: 10,
//   // // },

//   // // notificationText: {
//   // //   fontSize: 20,
//   // //   color: "white",
//   // //   fontWeight: "500",
//   // // },
//   // backButton: {
//   //   position: "absolute",
//   //   // left: 0,
//   //   padding: 20,
//   //   paddingHorizontal: 30,
//   //   // backgroundColor:"black",
//   //   borderBottomLeftRadius: 20,
//   // },
//   // headerText: {
//   //   fontSize: 28,
//   //   fontWeight: "bold",
//   //   color: "white",
//   //   textAlign: "center",
//   //   fontWeight: '400'
//   // },
//   // headingText: {
//   //   fontSize: 18,
//   //   fontWeight: 'bold',
//   //   color: 'white',
//   //   marginLeft: 20,
//   // },
//   // content: {
//   //   padding: 20,
//   // },
//   // contentText: {
//   //   fontSize: 16,
//   //   color: 'white',
//   //   marginBottom: 10,
//   // },


//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     // backgroundColor: "#8B5CF6", // Example background color
//     paddingHorizontal: 12,
//     // borderRadius: 10,
//     // marginHorizontal: 10
//     // height: 0,
//     // marginTop: 50,
//     // flex:1,
//     // backgroundColor:"red"
//   },

//   backButton: {
//     paddingVertical: 10,
//   },

//   headerText: {
//     fontSize: 20,
//     color: "black",
//     fontWeight: "bold",
//   },

//   notificationButton: {
//     // paddingVertical: 10,
//   },

//   notificationText: {
//     fontSize: 20,
//     color: "black",
//     fontWeight: "500",
//   },










// });

// export default NotificationScreen;





import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Platform, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

const NotificationScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <SafeAreaView style={styles.safeArea}>
        {/* Add this if you want to be extra safe on Android */}
        {Platform.OS === 'android' && <View style={{ height: StatusBar.currentHeight }} />}

        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <SvgUri
              uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg'}
              height={18}
              width={18}
              fallback={<Text style={{ fontSize: 18 }} allowFontScaling={false}>🚚</Text>}
            />
          </TouchableOpacity>

          {/* Notification Title */}
          <Text style={styles.headerText}>Notification</Text>

          {/* Clear All Button */}
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => { Alert.alert("Clear all the notification data") }}>
            <Text style={styles.notificationText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* No Notifications */}
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: '700', color: "black", fontSize: 28 }}>
            No Notifications
          </Text>
        </View>
      </SafeAreaView>


    </>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "skyblue",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    // paddingVertical: 16,
  },
  backButton: {
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  notificationButton: {},
  notificationText: {
    fontSize: 20,
    color: "black",
    fontWeight: "500",
  },
});

export default NotificationScreen;
