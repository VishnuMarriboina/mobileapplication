import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../Redux/Slices/AuthSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DriverProfile = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [imageUri, setImageUri] = useState(
    'https://randomuser.me/api/portraits/men/32.jpg',
  );

  const dispatch = useDispatch();
  const auth = useSelector(state => state.Authdata);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    dispatch(setUser(false));
    console.log('new driver was created', auth.isNewUser);
  };

  const openOptions = () => setModalVisible(true);

  const handleEdit = () => {
    setModalVisible(false);
    navigation.navigate('ProfilePhoto');
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      <View
        style={[
          styles.headertop,
          {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0},
        ]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgUri
            uri={
              'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg'
            }
            height={18}
            width={18}
            fallback={
              <Text style={{fontSize: 18}} allowFontScaling={false}>
                ←⬅️
              </Text>
            }
          />
        </TouchableOpacity>

        <Text style={styles.headerText} allowFontScaling={false}>
          Driver Profile
        </Text>

        <TouchableOpacity>
          {/* <SvgUri
            uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/share.svg"
            width={20}
            height={20}
          /> */}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.container, {marginBottom: insets.bottom}]}
        showsVerticalScrollIndicator={false}>
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
          <View>
            <View style={styles.avatarWrapper}>
              <Image source={{uri: imageUri}} style={styles.avatar} />
              <TouchableOpacity
                style={styles.cameraIconWrapper}
                onPress={openOptions}>
                <SvgUri
                  uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/camera.svg"
                  width={20}
                  height={20}
                  fallback={
                    <Text style={{fontSize: 20}} allowFontScaling={false}>
                      📸
                    </Text>
                  }
                />
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.profileName}>Ajith Singh</Text> */}
          </View>

          <View style={{marginTop: 5}}>
            <Text style={styles.profileName} allowFontScaling={false}>
              Ajith Singh
            </Text>
          </View>

          {/* Popup Modal */}
          <Modal
            transparent
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}>
              <View style={styles.optionBox}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setViewImageModal(true);
                  }}>
                  <Text style={styles.optionText} allowFontScaling={false}>
                    View Image
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEdit}>
                  <Text style={styles.optionText} allowFontScaling={false}>
                    Edit Image
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* View Image Fullscreen Modal */}
          <Modal
            visible={viewImageModal}
            transparent
            animationType="fade"
            onRequestClose={() => setViewImageModal(false)}>
            <TouchableOpacity
              style={styles.fullScreenOverlay}
              onPress={() => setViewImageModal(false)}>
              <Image source={{uri: imageUri}} style={styles.fullImage} />
            </TouchableOpacity>
          </Modal>
        </View>

        {/* View Image Modal */}
        <Modal
          visible={viewImageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setViewImageModal(false)}>
          <TouchableOpacity
            style={styles.fullScreenOverlay}
            onPress={() => setViewImageModal(false)}>
            <Image source={{uri: imageUri}} style={styles.fullImage} />
          </TouchableOpacity>
        </Modal>

        {/* Contact Information */}

        <View style={styles.infoCard}>
          {/* Contact Information Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} allowFontScaling={false}>
              Contact Information
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DriverDetails');
              }}>
              <SvgUri
                uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/edit.svg"
                width={24}
                height={24}
                fallback={
                  <Text style={{fontSize: 24}} allowFontScaling={false}>
                    ✏️
                  </Text>
                }
              />
            </TouchableOpacity>
          </View>

          {/* Personal Number */}
          <View style={styles.infoRow}>
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/phoneblue.svg"
              width={24}
              height={24}
              fallback={
                <Text style={{fontSize: 24}} allowFontScaling={false}>
                  📞
                </Text>
              }
            />
            <View style={styles.infoColumn}>
              <Text style={styles.label} allowFontScaling={false}>
                Personal Number
              </Text>
              <Text style={styles.infoText} allowFontScaling={false}>
                +91 9573 9573 95
              </Text>
            </View>
          </View>

          {/* Emergency Number */}
          <View style={styles.infoRow}>
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/emergencyred.svg"
              width={24}
              height={24}
              fallback={
                <Text style={{fontSize: 24}} allowFontScaling={false}>
                  🚑
                </Text>
              }
            />
            <View style={styles.infoColumn}>
              <Text style={styles.label} allowFontScaling={false}>
                Emergency Number
              </Text>
              <Text style={styles.infoText} allowFontScaling={false}>
                +91 9573 9573 85
              </Text>
            </View>
          </View>

          {/* Personal Information Header */}
          <View style={{paddingVertical: 15}} />
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} allowFontScaling={false}>
              Personal Information
            </Text>
          </View>

          {/* Blood Group */}
          <View style={styles.infoRow}>
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/bloodgroup.svg"
              width={24}
              height={24}
              fallback={
                <Text style={{fontSize: 24}} allowFontScaling={false}>
                  🩸
                </Text>
              }
            />
            <View style={styles.infoColumn}>
              <Text style={styles.label} allowFontScaling={false}>
                Blood Group
              </Text>
              <Text style={styles.infoText} allowFontScaling={false}>
                O Positive
              </Text>
            </View>
          </View>

          {/* Address */}
          <View style={styles.infoRow}>
            <SvgUri
              uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/locationgreen.svg"
              width={24}
              height={24}
              fallback={
                <Text style={{fontSize: 24}} allowFontScaling={false}>
                  📍
                </Text>
              }
            />
            <View style={styles.infoColumn}>
              <Text style={styles.label} allowFontScaling={false}>
                Address
              </Text>
              <Text style={styles.infoText} allowFontScaling={false}>
                Flat No. 202, Green Residency Road No. 12, Banjara Hills, 500034
              </Text>
            </View>
          </View>
        </View>

        {/* Uploaded Documents */}
        <View style={styles.infoCard}>
          <Text
            style={[styles.cardTitle, {marginBottom: 10}]}
            allowFontScaling={false}>
            Uploaded Documents
          </Text>

          {[
            {name: 'Aadhar Card', date: 'Mar 15, 2024', icon: 'aadhar'},
            {name: 'Insurance', date: 'Mar 15, 2024', icon: 'insurance'},
            {name: 'License', date: 'Mar 15, 2024', icon: 'licence'},
          ].map((doc, index) => (
            <View key={index} style={styles.documentRow}>
              <SvgUri
                uri={`https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/${doc.icon}.svg`}
                width={24}
                height={24}
                fallback={
                  <Text style={{fontSize: 24}} allowFontScaling={false}>
                    📄
                  </Text>
                }
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.docTitle} allowFontScaling={false}>
                  {doc.name}
                </Text>
                <Text style={styles.docDate} allowFontScaling={false}>
                  Uploaded on {doc.date}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                }}>
                <SvgUri
                  uri={`https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/eye.svg`}
                  width={24}
                  height={24}
                  fallback={
                    <Text style={{fontSize: 24}} allowFontScaling={false}>
                      👀
                    </Text>
                  }
                />
                <SvgUri
                  uri={`https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/upload.svg`}
                  // width={24}
                  // height={24}
                  fallback={
                    <Text style={{fontSize: 24}} allowFontScaling={false}>
                      📤
                    </Text>
                  }
                />
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        {/* <View style={styles.buttonRow}> */}
        <View style={[styles.buttonRow, {marginBottom: 40 + insets.bottom}]}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelText} allowFontScaling={false}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={handleSubmit}>
            <Text style={styles.continueText} allowFontScaling={false}>
              Submit
            </Text>
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
    // backgroundColor:"red",
    // paddingBottom:850
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // height: 60,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    // backgroundColor: "red"
  },

  // },
  backButton: {
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    // backgroundColor: "red"
  },
  avatarContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  avatarWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    // overflow: 'hidden',
    overflow: 'visible',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D9D9D9',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'visible',
    // borderColor:"black"
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },

  profileName: {
    fontSize: 16,
    fontWeight: '600',
    // marginTop: 8,
    marginHorizontal: 5,
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
    // backgroundColor:"red",
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  infoColumn: {
    marginLeft: 12,
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },

  infoText: {
    // marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    // justifyContent:"space-evenly"
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: 10,
    borderRadius: 5,
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
    // marginBottom: 40 + insets.bottom,
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optionBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 200,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
    color: '#007bff',
  },
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
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
