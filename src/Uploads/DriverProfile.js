
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SvgUri } from 'react-native-svg';
// import { SCREEN_HEIGHT } from '../Utils/Dimensions'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../Redux/Slices/AuthSlice'
// import { Ionicons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';

const DriverProfile = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Authdata);

  const handleCancel = () => {
    navigation.goBack();

  }


  const handleSubmit = () => {
    // navigation.navigate("Footer"); // Navigate to the Insurance screen

    // navigation.navigate("Footer")
    dispatch(setUser(false));
    console.log("new driver was created", auth.isNewUser);
  }





  return (
    <>

      <StatusBar barStyle={"dark-content"} backgroundColor="white" />

      <View
        style={[
          styles.headertop,
          { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
        ]}
      >
        <TouchableOpacity style={styles.backButton}>
          <SvgUri
            uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg"}
            height={18}
            width={18}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Driver Profile</Text>

        <TouchableOpacity>
          <SvgUri
            uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/share.svg"
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>



      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        {/* <View style={styles.header}> */}

        {/* <View
        style={[
          styles.header,
          { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
        ]}>
        <TouchableOpacity>
          <SvgUri
            uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg"}
            height={18}
            width={18}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Driver Profile</Text>
        <TouchableOpacity>
          <SvgUri
            uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/share.svg"
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View> */}

        {/* Profile Image & Name */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={{ flexDirection: "row", marginTop: 5 }}>


            <Text style={styles.profileName}>Ajith Singh</Text>
            <TouchableOpacity
              style={styles.editIcon}
            >
              {/* <Feather name="edit-2" size={14} color="#000" /> */}
              <SvgUri
                uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/edit.svg"
                width={24}
                height={24}
              />
            </TouchableOpacity>
          </View>
        </View>





        {/* Contact Information */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            {/* <Feather name="edit-2" size={14} color="#000" /> */}
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/edit.svg"
              width={24}
              height={24}
            />
          </View>
          <View style={styles.infoRow}>
            {/* <Ionicons name="call" size={18} color="#0A9D7A" /> */}
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/phoneblue.svg"
              width={24}
              height={24}
            />


            <Text style={styles.infoText}>+91 9573 9573 95</Text>
          </View>
          <View style={styles.infoRow}>
            {/* <Entypo name="warning" size={18} color="#F44336" /> */}

            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/emergencyred.svg"
              width={24}
              height={24}
            />

            <Text style={styles.infoText}>+91 9573 9573 85</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            {/* <Feather name="edit-2" size={14} color="#000" /> */}
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/edit.svg"
              width={24}
              height={24}
            />
          </View>
          <View style={styles.infoRow}>
            {/* <MaterialIcons name="bloodtype" size={18} color="#F44336" /> */}

            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/bloodgroup.svg"
              width={24}
              height={24}
            />


            <Text style={styles.infoText}>O Positive</Text>
          </View>
          <View style={styles.infoRow}>
            {/* <Entypo name="location-pin" size={18} color="#4CAF50" /> */}
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/locationgreen.svg"
              width={24}
              height={24}
            />
            <Text style={styles.infoText}>Permanent Address</Text>
          </View>
        </View>

        {/* Uploaded Documents */}
        <View style={styles.infoCard}>
          <Text style={[styles.cardTitle, { marginBottom: 10 }]}>Uploaded Documents</Text>

          {[
            { name: 'Aadhar Card', date: 'Mar 15, 2024', icon: 'aadhar' },
            { name: 'Insurance', date: 'Mar 15, 2024', icon: 'insurance' },
            { name: 'License', date: 'Mar 15, 2024', icon: 'licence' },
          ].map((doc, index) => (
            <View key={index} style={styles.documentRow}>
              <SvgUri
                uri={`https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/${doc.icon}.svg`}
                width={24}
                height={24}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.docTitle}>{doc.name}</Text>
                <Text style={styles.docDate}>Uploaded on {doc.date}</Text>
              </View>
            </View>
          ))}
        </View>





        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={handleSubmit}>
            <Text style={styles.continueText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  // header: {
  //   // marginTop: 10,
  //   // marginBottom: 20,
  //   // flexDirection: 'row',
  //   // justifyContent: 'space-between',
  //   // alignItems: 'center',
  //   // backgroundColor: "red",


  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingHorizontal: 16,
  //   // height: 60,
  //   backgroundColor: "#fff",
  //   justifyContent: "space-between",
  // },

  headertop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    // height: 60,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // backgroundColor: "red"
  },


  // },
  backButton: {
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    // marginTop: 8,
    marginHorizontal: 5
  },
  editIcon: {
    // position: 'absolute',
    // right: 0,
    // top: 50,
    // backgroundColor: '#eee',
    // padding: 5,
    // borderRadius: 20,
    // backgroundColor:"red",
    marginTop: -3
  },
  infoCard: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  docDate: {
    fontSize: 12,
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 40,
  },
  cancelBtn: {
    flex: 0.48,
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueBtn: {
    flex: 0.48,
    backgroundColor: '#148B7E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
  },
});





























// import React from 'react'
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import { SCREEN_HEIGHT } from '../Utils/Dimensions'
// import { useNavigation } from '@react-navigation/native'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUser } from '../Redux/Slices/AuthSlice'


// const DriverProfile = () => {
//   const navigation = useNavigation();

//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.Authdata);

//   const handleCancel = () => {
//     navigation.goBack();
//   }


//   const handleSubmit = () => {
//     // navigation.navigate("Footer"); // Navigate to the Insurance screen

//     // navigation.navigate("Footer")
//     dispatch(setUser(false));
//     console.log("new driver was created", auth.isNewUser);
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>DriverProfile</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.continueButton]}
//           onPress={handleSubmit}>
//           <Text style={styles.continueText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 10,
//     maxHeight: SCREEN_HEIGHT * 0.85,
//     elevation: 50
//   },

//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   input: {
//     // borderWidth: 1,
//     // borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#EFEFF4"
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   cancelButton: {
//     backgroundColor: "#ccc",
//     padding: 12,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   cancelText: {
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   continueButton: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//   },
//   continueText: {
//     textAlign: "center",
//     color: "white",
//     fontWeight: "bold",
//   },
//   disabledButton: {
//     backgroundColor: "#ddd",
//   },
// })
// export default DriverProfile