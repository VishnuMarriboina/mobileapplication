import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Alert, StatusBar } from 'react-native';
import { SvgUri } from 'react-native-svg';
import ProfilePhoto from './ProfilePhoto';
// import { launchImageLibrary } from 'react-native-image-picker';

const Insurance = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);


  const [showProfilePhoto, setShowProfilePhoto] = useState(false);

  const handleCancel = () => {
    navigation.goBack();
  }


  const handleContinue = () => {

    alert("Insurence submitted successfully!");
    setShowProfilePhoto(true)
  }
  if (showProfilePhoto) { return <ProfilePhoto /> }





  // const pickImage = async (side) => {
  //   const result = await launchImageLibrary({ mediaType: 'photo' });

  //   if (!result.didCancel && result.assets?.[0]) {
  //     const selectedImage = result.assets[0].uri;
  //     side === 'front' ? setFrontImage(selectedImage) : setBackImage(selectedImage);
  //   }
  // };

  // const handleContinue = () => {
  //   if (!frontImage || !backImage) {
  //     Alert.alert('Please upload both front and back sides of the Aadhar card.');
  //   } else {
  //     Alert.alert('Success', 'You can proceed!');
  //   }
  // };

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

        <Text style={styles.headerText}>Please Upload Insurance</Text>

        <TouchableOpacity />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Please Upload Insurance Card</Text>
        <Text style={styles.subText}>Please upload both sides of your card</Text>

        <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage('front')}>
          {frontImage ? (
            <Image source={{ uri: frontImage }} style={styles.previewImage} />
          ) : (
            <>
              <Text style={styles.title}>Front Side</Text>
              <SvgUri
                uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/upload.svg"}
                height={28}
                width={28}
                style={{ paddingVertical: 20 }}
              />
              <Text style={styles.tapText}>Tap to upload Front Side</Text>
              <Text style={styles.formatText}>Supported formats: JPG, PNG</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage('back')}>
          {backImage ? (
            <Image source={{ uri: backImage }} style={styles.previewImage} />
          ) : (
            <>
              <Text style={styles.title}>Back Side</Text>
              <SvgUri
                uri={"https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/upload.svg"}
                height={28}
                width={28}
                style={{ paddingVertical: 20 }}
              />
              <Text style={styles.tapText}>Tap to upload Back Side</Text>
              <Text style={styles.formatText}>Supported formats: JPG, PNG</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => Alert.alert('Cancelled')}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Insurance;

const styles = StyleSheet.create({

  headertop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    // height: 60,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  backButton: {
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    backgroundColor: "#E5E7EB"
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  tapText: {
    fontSize: 14,
    color: '#444',
  },
  formatText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  previewImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
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
});




















// import React, { useState } from 'react'

// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
// import { SCREEN_HEIGHT } from '../Utils/Dimensions';
// import ProfilePhoto from './ProfilePhoto';


// const Insurance = () => {

//   const navigation = useNavigation();
//   const [showProfilePhoto, setShowProfilePhoto] = useState(false);

//   const handleCancel = () => {
//     navigation.goBack();
//   }


//   const handleSubmit = () => {

//     alert("Insurence submitted successfully!");
//     setShowProfilePhoto(true)
//   }
//   if (showProfilePhoto) { return <ProfilePhoto /> }



//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Insurance</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.cancelButton}
//           onPress={handleCancel}
//         // onPress={() => navigation.navigate("Footer")}
//         >
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.continueButton]}
//           onPress={handleSubmit}
//         // onPress={() => navigation.navigate("Footer")}
//         >
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
// export default Insurance