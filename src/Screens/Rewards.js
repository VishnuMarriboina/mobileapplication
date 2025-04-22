import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../Utils/Dimensions';
import RewardsTable from '../Components/RewardsTable';
import CustomModal from '../Components/CustomModal';
import BarCard from '../Components/BarCard';
import {SvgUri} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
const Rewards = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        {/* //--------------------Image */}
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.image}>
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/underconstruction.svg"
            />
          </View>
        </View> */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            marginTop: -35,
          }}>
          <View style={styles.image}>
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/rewards.svg"
              width="100%" // Makes sure it fits the container
              height="100%" // Ensures it doesn't exceed the container
              // preserveAspectRatio="xMidYMid meet" // Ensures it scales properly
            />
            {/* <Text>Total:{ }</Text> */}
          </View>
        </View>

        {/* <View style={styles.screen}>
          <View style={styles.tabbar}>
            <Text style={styles.text}>Claimed rewards</Text>
            <Text style={styles.text}>₹ 800</Text>
          </View>
        </View>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttontext}>Claim Rewards</Text>
          </TouchableOpacity>
        </View> */}

        {/*........................new code..... */}
        {/*-------------01---------------- */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('ClaimedRewards')}
          // onPress={() => setModalVisible(true)}
        >
          {/* Left Icon */}
          <SvgUri
            uri={
              'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/readyfilled.svg'
            }
            height={28}
            width={28}
          />

          {/* Middle Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title} allowFontScaling={false}>
              ₹1,250.00
            </Text>
            <Text style={styles.subtitle} allowFontScaling={false}>
              Net Claimed Rewards
            </Text>
          </View>

          {/* Right Icon */}
          <SvgUri
            uri={
              'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowforward.svg'
            }
            height={22}
            width={22}
          />
        </TouchableOpacity>
        {/* -----------------------02--------------------- */}
        <TouchableOpacity
          onPress={() => navigation.navigate('UnclaimedRewards')}
          // onPress={() => setModalVisible(true)}
          style={styles.buttonContainer}>
          {/* Left Icon */}
          <SvgUri
            uri={
              'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/rewards.svg'
            }
            height={28}
            width={28}
          />
          {/* Middle Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title} allowFontScaling={false}>
              ₹750.00
            </Text>
            <Text style={styles.subtitle} allowFontScaling={false}>
              UnClaimed Rewards
            </Text>
          </View>

          {/* Right Icon */}
          <SvgUri
            uri={
              'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowforward.svg'
            }
            height={22}
            width={22}
          />
        </TouchableOpacity>

        {/* modal to view table */}
        <CustomModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}>
          {/* <RewardsTable /> */}
          <RewardsTable onClose={() => setModalVisible(false)} />
        </CustomModal>
      </View>
    </>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // backgroundColor: "red",
    flex: 1,
    paddingHorizontal: 5,
    // backgroundColor: "red"
    backgroundColor: 'white',
  },
  screen: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttontext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: '#156CF7',
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: SCREEN_WIDTH / 2.6,
    alignItems: 'center',
    // marginRight: 30
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.95,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  //   imageContainer: {
  //   position: "absolute",
  //   top: -SCREEN_HEIGHT * 0.01, // Move image 10% above the container
  //   left: SCREEN_WIDTH * 0.025,
  //   zIndex: 1, // Ensure it's above other content
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C99F5',
    height: SCREEN_HEIGHT / 5,
    width: SCREEN_WIDTH * 0.85,
    marginBottom: 20,
    borderColor: 'red',
    borderRadius: 20,
    zIndex: 10,
    overflow: 'hidden', // Ensures SVG doesn't overflow
  },

  //--------------------------------button----------------------------------------------------
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // elevation: 3,
    margin: 10,
    backgroundColor: '#148B7E',
    backgroundColor: '#F3F4F6',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
// import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../Utils/Dimensions";
// import RewardsTable from "../Components/RewardsTable";
// import CustomModal from "../Components/CustomModal";

// const Rewards = () => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   return (
//     <>
//       <View style={styles.container}>

//         {/* Image Overlapping Header */}
//         <View style={styles.imageContainer}>
//           <View style={styles.image}>
//             <Text style={styles.imageText}>Image</Text>
//           </View>
//         </View>

//         {/* Tab Bar Section */}
//         <View style={styles.screen}>
//           <View style={styles.tabbar}>
//             <Text style={styles.text}>Claimed rewards</Text>
//             <Text style={styles.text}>₹ 800</Text>
//           </View>
//         </View>

//         {/* Button to Claim Rewards */}
//         <View style={{ alignItems: "center", marginVertical: 10 }}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setModalVisible(true)}
//           >
//             <Text style={styles.buttontext}>Claim Rewards</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Modal to View Table */}
//         <CustomModal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
//           <RewardsTable onClose={() => setModalVisible(false)} />
//         </CustomModal>
//       </View>
//     </>
//   );
// };

// export default Rewards;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//     paddingHorizontal: 5,
//   },
//   screen: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1, // Push content below the image
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttontext: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "white",
//   },
//   button: {
//     backgroundColor: "#156CF7",
//     paddingVertical: 6,
//     paddingHorizontal: 5,
//     borderRadius: 10,
//     width: SCREEN_WIDTH / 2.6,
//     alignItems: "center",
//   },
//   tabbar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: SCREEN_WIDTH * 0.95,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "black",
//   },
//   imageContainer: {
//     position: "absolute",
//     top: -SCREEN_HEIGHT * 0.1, // Move image 10% above the container
//     left: SCREEN_WIDTH * 0.025,
//     zIndex: 10, // Ensure it's above other content
//   },
//   image: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "gray",
//     height: SCREEN_HEIGHT * 0.25, // Adjust image height
//     width: SCREEN_WIDTH * 0.95,
//     borderRadius: 40,
//   },
//   imageText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
