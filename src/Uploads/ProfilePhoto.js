// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import { SvgUri } from 'react-native-svg';
// import DriverProfile from './DriverProfile';
// // import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const ProfilePhoto = ({ navigation }) => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [showDriverProfile, setShowDriverProfile] = useState(false);

//   const pickImage = () => {
//     Alert.alert('Upload Photo', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: () => {
//           launchCamera({ mediaType: 'photo' }, (result) => {
//             if (!result.didCancel && result.assets?.[0]) {
//               setProfileImage(result.assets[0].uri);
//             }
//           });
//         },
//       },
//       {
//         text: 'Choose from Gallery',
//         onPress: () => {
//           launchImageLibrary({ mediaType: 'photo' }, (result) => {
//             if (!result.didCancel && result.assets?.[0]) {
//               setProfileImage(result.assets[0].uri);
//             }
//           });
//         },
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const removePhoto = () => {
//     setProfileImage(null);
//   };

//   const handleCancel = () => {
//     navigation.goBack();
//   };

//   const handleContinue = () => {
//     alert('ProfilePhoto submitted successfully!');
//     setShowDriverProfile(true);
//   };

//   if (showDriverProfile) return <DriverProfile />;

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       <View style={[styles.headerContainer, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
//         <TouchableOpacity style={styles.backButton}>
//           <SvgUri
//             uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg"
//             width={18}
//             height={18}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Profile Photo</Text>
//         <View style={{ width: 18 }} /> {/* Placeholder for spacing symmetry */}
//       </View>

//       <View style={styles.screenContainer}>
//         <View style={styles.imageSection}>
//           <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
//             {profileImage ? (
//               <>
//                 <Image source={{ uri: profileImage }} style={styles.imagePreview} />
//                 <TouchableOpacity style={styles.removePhoto} onPress={removePhoto}>
//                   <Text style={styles.removeX}>✕</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <SvgUri
//                 uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/camera.svg"
//                 width={40}
//                 height={40}
//               />
//             )}
//           </TouchableOpacity>
//           <Text style={styles.addText}>Add Profile Picture</Text>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// };

// export default ProfilePhoto;

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 0.3,
//     borderColor: '#ddd',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   screenContainer: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
//   imageSection: {
//     alignItems: 'center',
//     marginBottom: 60,
//   },
//   imageWrapper: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: '#C4C4C4',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     marginBottom: 10,
//   },
//   imagePreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 60,
//     resizeMode: 'cover',
//   },
//   removePhoto: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 2,
//     elevation: 3,
//   },
//   removeX: {
//     fontSize: 12,
//     color: '#FF3B30',
//     fontWeight: 'bold',
//   },
//   addText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//     paddingHorizontal: 4,
//   },
//   cancelBtn: {
//     flex: 1,
//     backgroundColor: '#E0E0E0',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   continueBtn: {
//     flex: 1,
//     backgroundColor: '#0A9D7A',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   cancelText: {
//     fontSize: 15,
//     color: '#333',
//     fontWeight: '500',
//   },
//   continueText: {
//     fontSize: 15,
//     color: '#fff',
//     fontWeight: '500',
//   },
// });






















import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Alert, StatusBar } from 'react-native';
import { SvgUri } from 'react-native-svg';
import DriverProfile from './DriverProfile';
import { BRANDCOLOR } from '../Utils/Colors';
import { SCREEN_HEIGHT } from '../Utils/Dimensions';
// import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfilePhoto = () => {

  const [profileImage, setProfileImage] = useState(null);

  const pickImage = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, (result) => {
            if (!result.didCancel && result.assets?.[0]) {
              setProfileImage(result.assets[0].uri);
            }
          });
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo' }, (result) => {
            if (!result.didCancel && result.assets?.[0]) {
              setProfileImage(result.assets[0].uri);
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const removePhoto = () => {
    setProfileImage(null);
  };

  // const [showDriverProfile, setShowDriverProfile] = useState(false);

  // const handleCancel = () => {
  //   navigation.goBack();
  // }



  // const handleContinue = () => {
  //   alert("ProfilePhoto submitted successfully!");
  //   setShowDriverProfile(true)
  // }
  // if (showDriverProfile) { return <DriverProfile /> }


  const navigation = useNavigation();
  const handleCancel = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    alert("Insurance submitted successfully!");
    navigation.navigate('DriverProfile');
  };







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

        <Text style={styles.headerText}>Please Upload ProfilePhoto</Text>

        <TouchableOpacity />
      </View>

      <View style={styles.container}>

        {/* <View style={styles.container1}> */}
        <View style={styles.profileholder}>
          {/* <Text style={styles.header}>Upload Profile Photo</Text> */}

          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {profileImage ? (
              <>
                <Image source={{ uri: profileImage }} style={styles.previewImage} />
                <TouchableOpacity style={styles.removeBtn} onPress={removePhoto}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </>
            ) : (

              <SvgUri
                uri={
                  'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/camera.svg'
                }
                width={60}
                height={60}

              />

            )}
          </TouchableOpacity>

          <Text style={styles.tapText}>Add Profile Picture</Text>


          {/* <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn}
              onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View> */}





        </View>
        <View style={styles.buttonholder}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({

  headertop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    // height: 60,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // paddingVertical:15
  },
  backButton: {
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // paddingVertical: 20,
    backgroundColor: '#fff',
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: BRANDCOLOR,


  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    // backgroundColor: "red"
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    backgroundColor: "red"
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
    backgroundColor: '#0A9D7A',
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

  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },

  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  tapText: {
    color: '#555',
    textAlign: 'center',
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
    elevation: 3,
  },
  removeText: {
    fontSize: 14,
    color: '#f00',
    fontWeight: 'bold',
  },

  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16, // Add spacing between buttons
    marginTop: 40, // Add spacing between image and buttons
    paddingHorizontal: 20,
    width: '100%',
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  continueBtn: {
    flex: 1,
    backgroundColor: '#0A9D7A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 16, // space between cancel and continue
  },
  profileholder: {
    // backgroundColor:"skyblue",
    marginTop:SCREEN_HEIGHT*0.1,
    

  },
  buttonholder: {
// backgroundColor:"blue",
marginTop:SCREEN_HEIGHT*0.1,
  }



});



