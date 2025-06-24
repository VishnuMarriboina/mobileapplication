import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {SCREEN_HEIGHT} from '../Utils/Dimensions';

const ProfilePhoto = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: () => {
          ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.8,
          })
            .then(image => {
              setProfileImage(image.path);
            })
            .catch(e => {
              if (e.code !== 'E_PICKER_CANCELLED') console.log(e);
            });
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: () => {
          ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.8,
          })
            .then(image => {
              setProfileImage(image.path);
            })
            .catch(e => {
              if (e.code !== 'E_PICKER_CANCELLED') console.log(e);
            });
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const removePhoto = () => {
    setProfileImage(null);
  };

  const handleSkip = () => {
    navigation.navigate('DriverProfile');
  };

  const handleContinue = () => {
    if (!profileImage) {
      Alert.alert(
        'Error',
        'Please upload either both front and back sides of the Aadhar card OR upload a single PDF.',
      );
      return;
    }

    Alert.alert('Success', 'Aadhar submitted successfully!');
    navigation.navigate('Insurance');
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
          onPress={() => navigation.goBack()}>
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

        <Text style={styles.headerText}>Please Upload ProfilePhoto</Text>
        <TouchableOpacity />
      </View>

      <View style={styles.container}>
        <View style={styles.profileholder}>
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {profileImage ? (
              <>
                <Image
                  source={{uri: profileImage}}
                  style={styles.previewImage}
                />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={removePhoto}>
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
                fallback={
                  <Text style={{fontSize: 60}} allowFontScaling={false}>
                    📸
                  </Text>
                }
              />
            )}
          </TouchableOpacity>
          <Text style={styles.tapText}>Add Profile Picture</Text>
        </View>

        <View style={styles.buttonholder}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleSkip}>
              <Text style={styles.cancelText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleContinue}>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 20,
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
    gap: 16,
    marginTop: 40,
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
    marginLeft: 16,
  },
  profileholder: {
    marginTop: SCREEN_HEIGHT * 0.1,
  },
  buttonholder: {
    marginTop: SCREEN_HEIGHT * 0.1,
  },
});
