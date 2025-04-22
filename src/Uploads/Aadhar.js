import React, { use, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar, Platform, Modal, Linking } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import * as DocumentPicker from '@react-native-documents/picker';
import CustomModal from '../Components/CustomModal';
import { SCREEN_WIDTH } from '../Utils/Dimensions';

const Aadhar = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideSelected, setSideSelected] = useState(null);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [uploadPdf, setUploadPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);

  const navigation = useNavigation();


  console.log("DocumentPickerPackages data", DocumentPicker)

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate('Licence');
  };


  const handleContinue = () => {
    if ((!frontImage || !backImage) && !pdfUri) {
      Alert.alert('Error', 'Please upload either both front and back sides of the Aadhar card OR upload a single PDF.');
      return;
    }

    Alert.alert("Success", "Aadhar submitted successfully!");
    navigation.navigate('Licence');
  };

  const openUploadOptions = (side) => {
    setSideSelected(side);
    setOptionModalVisible(true);
  };

  const handleImageFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 200,
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      setImageToSide(image.path);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image');
      }
    } finally {
      setOptionModalVisible(false);
    }
  };

  const handleImageFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 200,
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      setImageToSide(image.path);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to open camera');
      }
    } finally {
      setOptionModalVisible(false);
    }
  };
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      const fileUri = result[0]?.uri;
      if (fileUri) {
        setPdfUri(fileUri);
        setUploadPdf(true);
        setImageToSide(null); // Clear image if PDF selected
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Failed to pick document');
      }
    } finally {
      setOptionModalVisible(false);
    }
  };








  const setImageToSide = (uri) => {
    if (sideSelected === 'front') setFrontImage(uri);
    else if (sideSelected === 'back') setBackImage(uri);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={[styles.headertop, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <SvgUri
            uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg"
            height={18}
            width={18}
          />
        </TouchableOpacity>
        <Text style={styles.headerText} allowFontScaling={false}>Please Upload Aadhar Card</Text>
        <View style={{ width: 18 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Please Upload Aadhar Card</Text>
        <Text style={styles.subText}>Please upload both sides of your card</Text>

        {uploadPdf && pdfUri ? (
          <View style={styles.pdfPreviewContainer}>
            <Text style={styles.title}>PDF File Selected</Text>
            <TouchableOpacity
              style={styles.viewPdfBtn}
              onPress={() => Linking.openURL(pdfUri)}
            >
              <Text style={styles.viewPdfText}>View PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadAgainBtn}
              onPress={handlePickDocument}
            >
              <Text style={styles.tapText}>Tap to Upload Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.uploadBox} onPress={() => openUploadOptions('front')}>
              {frontImage ? (
                <Image source={{ uri: frontImage }} style={styles.previewImage} />
              ) : (
                <>
                  <Text style={styles.title}>Front Side</Text>
                  <SvgUri uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/upload.svg" height={28} width={28} />
                  <Text style={styles.tapText}>Tap to upload Front Side</Text>
                  <Text style={styles.formatText}>Supported formats: JPG, PNG, PDF</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBox} onPress={() => openUploadOptions('back')}>
              {backImage ? (
                <Image source={{ uri: backImage }} style={styles.previewImage} />
              ) : (
                <>
                  <Text style={styles.title}>Back Side</Text>
                  <SvgUri uri="https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/upload.svg" height={28} width={28} />
                  <Text style={styles.tapText}>Tap to upload Back Side</Text>
                  <Text style={styles.formatText}>Supported formats: JPG, PNG, PDF</Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}






        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleSkip}>
            <Text style={styles.cancelText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Options Modal */}
      {/* <Modal
        visible={optionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOptionModalVisible(false)}
      > */}

      {/* <Modal
        visible={optionModalVisible}
        transparent
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={500}
        animationOutTiming={500}
        backdropColor="black"
        backdropOpacity={0.58}
        onRequestClose={() => setOptionModalVisible(false)}
        // onBackdropPress={onClose} // Close on tapping outside
        style={styles.modal} // Fullscreen Modal
      > */}


      <CustomModal isVisible={optionModalVisible} onClose={() => setOptionModalVisible(false)}>
        <View style={styles.modalContainer}>

          {/* <View style={styles.modalOverlay}> */}
          {/* <View style={styles.modalBox}> */}
          <TouchableOpacity onPress={handleImageFromCamera}>
            <Text style={styles.modalText}>Take from Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageFromGallery}>
            <Text style={styles.modalText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickDocument}>
            <Text style={styles.modalText}>Upload PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOptionModalVisible(false)}>
            <Text style={[styles.modalText, { color: 'red' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* <View><Text>Hellow</Text></View> */}


        {/* </View> */}
        {/* </View> */}
      </CustomModal>
      {/* </Modal> */}
    </>
  );
};

export default Aadhar;

const styles = StyleSheet.create({
  headertop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5E7EB',
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
    backgroundColor: '#fff',
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
    // backgroundColor:"#148B7E"
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
  modalContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    // width: "90%",
    width: SCREEN_WIDTH,
    alignSelf: "center",
    // backgroundColor: BRANDCOLOR
  },
  modal: {
    flex: 1,
    margin: 0, // Removes default margin & makes it fullscreen
    // backgroundColor:"transparent"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  modalText: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#333',
  },
  pdfPreviewContainer: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20
  },
  viewPdfBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 8
  },
  viewPdfText: {
    color: 'white',
    fontWeight: 'bold'
  },
  uploadAgainBtn: {
    marginTop: 10
  }
});
