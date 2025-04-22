import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {updateDriverDetails} from '../Redux/Slices/DriverSlice';
import {SvgUri} from 'react-native-svg';
import {SCREEN_HEIGHT} from '../Utils/Dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DriverDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const backendData = {
    driverName: 'John Doe',
    personalNumber: '9876543210',
  };

  const [form, setForm] = useState({
    driverName: '',
    personalNumber: '',
    emergencyNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set backend values for display (non-editable)
    setForm(prevForm => ({
      ...prevForm,
      driverName: backendData.driverName,
      personalNumber: backendData.personalNumber,
    }));
  }, []);

  const [bloodOpen, setBloodOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bloodValue, setBloodValue] = useState(null);
  const [bloodItems, setBloodItems] = useState([
    {label: 'A+', value: 'A+'},
    {label: 'A-', value: 'A-'},
    {label: 'B+', value: 'B+'},
    {label: 'B-', value: 'B-'},
    {label: 'O+', value: 'O+'},
    {label: 'O-', value: 'O-'},
    {label: 'AB+', value: 'AB+'},
    {label: 'AB-', value: 'AB-'},
  ]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]);

  useEffect(() => {
    if (bloodOpen) setStatusOpen(false);
  }, [bloodOpen]);

  useEffect(() => {
    if (statusOpen) setBloodOpen(false);
  }, [statusOpen]);

  const validateInput = (key, value) => {
    let errorMessage = '';

    if (
      key === 'driverName' &&
      value.trim() &&
      !/^[A-Za-z]+(\.?[A-Za-z]+)*$/.test(value.trim())
    ) {
      errorMessage = "Only letters and a single '.' allowed";
    }

    if (['personalNumber', 'emergencyNumber'].includes(key) && value.trim()) {
      if (!/^[6789]\d{9}$/.test(value)) {
        errorMessage = 'Must be 10 digits & start with 6,7,8,9';
      } else {
        const digitCounts = value.split('').reduce((acc, digit) => {
          acc[digit] = (acc[digit] || 0) + 1;
          return acc;
        }, {});
        if (Object.values(digitCounts).some(count => count > 8)) {
          errorMessage = 'A digit cannot repeat more than 8 times';
        }
      }
    }

    if (key === 'emergencyNumber') {
      if (!value.trim()) {
        errorMessage = 'Emergency Number is required';
      } else if (!/^[6789]\d{9}$/.test(value)) {
        errorMessage = 'Must be 10 digits & start with 6,7,8,9';
      } else {
        const digitCounts = value.split('').reduce((acc, digit) => {
          acc[digit] = (acc[digit] || 0) + 1;
          return acc;
        }, {});
        if (Object.values(digitCounts).some(count => count > 8)) {
          errorMessage = 'A digit cannot repeat more than 8 times';
        }
      }
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [key]: errorMessage,
    }));
  };

  const handleChange = (key, value) => {
    setForm(prevForm => ({...prevForm, [key]: value}));
    validateInput(key, value);
  };

  const handleCancel = () => {
    setForm({
      driverName: backendData.driverName,
      personalNumber: backendData.personalNumber,
      emergencyNumber: '',
      address: '',
    });
    setBloodValue(null);
    setStatusValue(null);
    setErrors({});
  };

  // const handleSubmit = () => {
  //   Object.keys(form).forEach((key) => validateInput(key, form[key]));
  //   const hasErrors = Object.values(errors).some((error) => error);
  //   if (!hasErrors && form.emergencyNumber.trim()) {
  //     dispatch(
  //       updateDriverDetails({
  //         driverName: form.driverName,
  //         personalNumber: form.personalNumber,
  //         emergencyNumber: form.emergencyNumber,
  //         address: form.address,
  //         bloodGroup: bloodValue,
  //         status: statusValue,
  //       })
  //     );
  //     navigation.navigate("Aadhar");
  //   }
  // };

  const handleSubmit = () => {
    // Validate only emergencyNumber (it's the only mandatory one)
    validateInput('emergencyNumber', form.emergencyNumber);

    const hasErrors = !!errors.emergencyNumber;

    if (!hasErrors && form.emergencyNumber.trim()) {
      dispatch(
        updateDriverDetails({
          driverName: form.driverName,
          personalNumber: form.personalNumber,
          emergencyNumber: form.emergencyNumber,
          address: form.address,
          bloodGroup: bloodValue,
          status: statusValue,
        }),
      );
      navigation.navigate('Aadhar');
    }
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
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Details</Text>
        <TouchableOpacity />
      </View>

      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding"> */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom:insets.bottom,
          backgroundColor: '#EFEFF4',
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* <ScrollView
  keyboardShouldPersistTaps="handled"
  contentContainerStyle={{ paddingBottom: 50 }}
  showsVerticalScrollIndicator={false}
> */}

        {/* Dull background overlay */}
        {isDropdownOpen && (
          <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        <View style={styles.container}>
          <Text style={styles.header}>Driver Details</Text>

          {/* Driver Name (Non-editable) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Driver Name</Text>
            <TextInput
              style={[styles.input, {backgroundColor: '#ddd'}]}
              value={form.driverName}
              // editable={false}
            />
          </View>

          {/* Personal Number (Non-editable) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Personal Number</Text>
            <TextInput
              style={[styles.input, {backgroundColor: '#ddd'}]}
              value={form.personalNumber}
              editable={false}
              keyboardType="numeric"
            />
          </View>

          {/* Emergency Number */}
          <View style={styles.inputContainer}>
            {/* <Text style={styles.label}>Emergency Number</Text> */}
            <Text style={styles.label}>
              Emergency Number <Text style={{color: 'red'}}>*</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Emergency Number"
              placeholderTextColor={'#999'}
              value={form.emergencyNumber}
              onChangeText={text => handleChange('emergencyNumber', text)}
              keyboardType="numeric"
            />
            {errors.emergencyNumber ? (
              <Text style={styles.errorText}>{errors.emergencyNumber}</Text>
            ) : null}
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, {height: 80, textAlignVertical: 'top'}]}
              placeholder="Enter Address"
              placeholderTextColor={'#999'}
              value={form.address}
              multiline
              numberOfLines={4}
              onChangeText={text => handleChange('address', text)}
            />
          </View>

          {/* Blood Group Dropdown */}
          <View style={{marginBottom: 20}}>
            <Text style={styles.label}>Blood Group</Text>
            <Dropdown
              style={styles.dropdown}
              data={bloodItems}
              labelField="label"
              valueField="value"
              placeholder="Select Blood Group"
              dropdownPosition="top" // 👈 opens the dropdown upwards
              value={bloodValue}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              // onChange={(item) => setBloodValue(item.value)}

              onChange={item => {
                setBloodValue(item.value);
                setIsDropdownOpen(false); // close overlay after selection
              }}
              containerStyle={{zIndex: 1000}}
              onFocus={() => setIsDropdownOpen(true)} // 👈 show overlay
              onBlur={() => setIsDropdownOpen(false)} // 👈 hide overlay when blurred
            />
          </View>

          {/* Status Dropdown */}
          <View style={{marginBottom: 20}}>
            <Text style={styles.label}>Status</Text>
            <Dropdown
              style={styles.dropdown}
              data={statusItems}
              labelField="label"
              valueField="value"
              placeholder="Select Status"
              dropdownPosition="top" // 👈 opens the dropdown upwards
              value={statusValue}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              onChange={item => {
                setStatusValue(item.value);
                setIsDropdownOpen(false); // close overlay after selection
              }}
              containerStyle={{zIndex: 999}}
              onFocus={() => setIsDropdownOpen(true)} // 👈 show overlay
              onBlur={() => setIsDropdownOpen(false)} // 👈 hide overlay when blurred
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleSubmit}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};

const styles = StyleSheet.create({
  headertop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  backButton: {
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6B7280',
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EFEFF4',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  dropdown: {
    marginBottom: 5,
    borderColor: '#ccc',
    backgroundColor: '#EFEFF4',
    // borderColor:"red"
    paddingVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderColor: '#ccc',
    backgroundColor: '#EFEFF4',
    // borderColor:"red"
    paddingVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dropdownSelectedText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DriverDetails;

{
  /* <View > */
}
{
  /* Blood Group Dropdown */
}
{
  /* <View style={{ zIndex: bloodOpen ? 2000 : 0 }}>
                <Text style={styles.label}>Blood Group</Text>
                <Dropdown
                  open={bloodOpen}
                  value={bloodValue}
                  items={bloodItems}
                  setOpen={setBloodOpen}
                  setValue={setBloodValue}
                  setItems={setBloodItems}
                  placeholder="Select Blood Group"
                  style={styles.dropdown}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{ zIndex: 2000 }}
                />
              </View> */
}

{
  /* Status Dropdown */
}
{
  /* <View style={{ zIndex: statusOpen ? 1000 : 0, marginTop: 20 }}>
                <Text style={styles.label}>Status</Text>
                <Dropdown
                  open={statusOpen}
                  value={statusValue}
                  items={statusItems}
                  setOpen={setStatusOpen}
                  setValue={setStatusValue}
                  setItems={setStatusItems}
                  placeholder="Select Status"
                  style={styles.dropdown}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{ zIndex: 2000 }}
                />
              </View>
            </View> */
}

{
  /* </View> */
}
