
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import Aadhar from "./Aadhar";
import { updateDriverDetails } from "../Redux/Slices/DriverSlice";
import { SvgUri } from "react-native-svg";
import { SCREEN_HEIGHT } from "../Utils/Dimensions";
import { ScrollView } from "react-native-gesture-handler";

const DriverDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showAadhar, setShowAadhar] = useState(false);

  // Form state
  const [form, setForm] = useState({
    driverName: "",
    personalNumber: "",
    emergencyNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  // Blood group dropdown
  const [bloodOpen, setBloodOpen] = useState(false);
  const [bloodValue, setBloodValue] = useState(null);
  const [bloodItems, setBloodItems] = useState([
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ]);

  // Status dropdown
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ]);

  const validateInput = (key, value) => {
    let errorMessage = "";

    if (key === "driverName" && value.trim() && !/^[A-Za-z]+(\.?[A-Za-z]+)*$/.test(value.trim())) {
      errorMessage = "Only letters and a single '.' allowed";
    }

    if (["personalNumber", "emergencyNumber"].includes(key) && value.trim()) {
      if (!/^[6789]\d{9}$/.test(value)) {
        errorMessage = "Must be 10 digits & start with 6,7,8,9";
      } else {
        const digitCounts = value.split("").reduce((acc, digit) => {
          acc[digit] = (acc[digit] || 0) + 1;
          return acc;
        }, {});

        if (Object.values(digitCounts).some((count) => count > 8)) {
          errorMessage = "A digit cannot repeat more than 8 times";
        }
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: errorMessage,
    }));
  };

  const handleChange = (key, value) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
    validateInput(key, value);
  };

  const handleCancel = () => {
    setForm({
      driverName: "",
      personalNumber: "",
      emergencyNumber: "",
      address: "",
    });
    setBloodValue(null);
    setStatusValue(null);
    setErrors({});
    // navigation.goBack();
  };


  // redux state update
  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some((error) => error);

    if (!hasErrors) {
      dispatch(
        updateDriverDetails({
          driverName: form.driverName,
          personalNumber: form.personalNumber,
          emergencyNumber: form.emergencyNumber,
          address: form.address,
          bloodGroup: bloodValue,
          status: statusValue,
        })
      );
      navigation.navigate('Aadhar');
      // setShowAadhar(true);
    }
  };

  // if (showAadhar) return <Aadhar />;

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

        <Text style={styles.headerText}>Add Details</Text>

        <TouchableOpacity />
      </View>

      {/* <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#EFEFF4" }}> */}

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40, backgroundColor: "#EFEFF4", flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >




        <View style={styles.container}>
          <Text style={styles.header}>Driver Details</Text>

          {Object.keys(form).map((key) => (
            <View key={key} style={styles.inputContainer}>
              <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                value={form[key]}
                onChangeText={(text) => handleChange(key, text)}
                keyboardType={["personalNumber", "emergencyNumber"].includes(key) ? "numeric" : "default"}
              />
              {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
            </View>
          ))}

          {/* Blood Group Dropdown */}
          <Text style={styles.label}>Blood Group</Text>
          <DropDownPicker
            open={bloodOpen}
            value={bloodValue}
            items={bloodItems}
            setOpen={setBloodOpen}
            setValue={setBloodValue}
            setItems={setBloodItems}
            placeholder="Select Blood Group"
            style={styles.dropdown}
            zIndex={3000}
          />

          {/* Status Dropdown */}
          <Text style={[styles.label, { marginTop: 20 }]}>Status</Text>
          <DropDownPicker
            open={statusOpen}
            value={statusValue}
            items={statusItems}
            setOpen={setStatusOpen}
            setValue={setStatusValue}
            setItems={setStatusItems}
            placeholder="Select Status"
            style={styles.dropdown}
            zIndex={2000}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      {/* </View> */}
    </>
  );
};

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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#6B7280",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#EFEFF4",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  dropdown: {
    marginBottom: 10,
    borderColor: "#ccc",
    backgroundColor: "#EFEFF4",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#000",
    fontWeight: "bold",
  },
  continueButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DriverDetails;


































// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { SCREEN_HEIGHT } from "../Utils/Dimensions";
// import DropDownPicker from 'react-native-dropdown-picker';
// import Aadhar from "./Aadhar";
// import { updateDriverDetails } from "../Redux/Slices/DriverSlice";
// import { SvgUri } from "react-native-svg";

// const DriverDetails = () => {

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [showAadhar, setShowAadhar] = useState(false);

//   // Blood group dropdown
//   const [bloodOpen, setBloodOpen] = useState(false);
//   const [bloodValue, setBloodValue] = useState(null);
//   const [bloodItems, setBloodItems] = useState([
//     { label: "A+", value: "A+" },
//     { label: "A-", value: "A-" },
//     { label: "B+", value: "B+" },
//     { label: "B-", value: "B-" },
//     { label: "O+", value: "O+" },
//     { label: "O-", value: "O-" },
//     { label: "AB+", value: "AB+" },
//     { label: "AB-", value: "AB-" },
//   ]);

//   // Status dropdown
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [statusValue, setStatusValue] = useState(null);
//   const [statusItems, setStatusItems] = useState([
//     { label: "Active", value: "Active" },
//     { label: "Inactive", value: "Inactive" },
//   ]);



//   const [form, setForm] = useState({
//     driverName: "",
//     personalNumber: "",
//     emergencyNumber: "",
//     address: "",
//   });

//   const [errors, setErrors] = useState({});

//   // const validateInput = (key, value) => {
//   //   let errorMessage = "";

//   //   // Driver Name Validation (Only letters and one dot)
//   //   if (key === "driverName" && !/^[A-Za-z]+(\.?[A-Za-z]+)*$/.test(value.trim())) {
//   //     errorMessage = "Only letters and a single '.' allowed";
//   //   }

//   //   // Mobile Number Validation (10-digit, No repeating digit > 8 times, Starts with 6,7,8,9)
//   //   if (["personalNumber", "emergencyNumber"].includes(key)) {
//   //     if (!/^[6789]\d{9}$/.test(value)) {
//   //       errorMessage = "Must be 10 digits & start with 6,7,8,9";
//   //     } else {
//   //       const digitCounts = value.split("").reduce((acc, digit) => {
//   //         acc[digit] = (acc[digit] || 0) + 1;
//   //         return acc;
//   //       }, {});

//   //       if (Object.values(digitCounts).some((count) => count > 8)) {
//   //         errorMessage = "A digit cannot repeat more than 8 times";
//   //       }
//   //     }
//   //   }

//   //   setErrors((prevErrors) => ({
//   //     ...prevErrors,
//   //     [key]: errorMessage,
//   //   }));
//   // };



//   const validateInput = (key, value) => {
//     let errorMessage = "";

//     // Driver Name Validation (Only letters and one dot)
//     if (key === "driverName" && value.trim() && !/^[A-Za-z]+(\.?[A-Za-z]+)*$/.test(value.trim())) {
//       errorMessage = "Only letters and a single '.' allowed";
//     }

//     // Mobile Number Validation (Only if value entered)
//     if (["personalNumber", "emergencyNumber"].includes(key) && value.trim()) {
//       if (!/^[6789]\d{9}$/.test(value)) {
//         errorMessage = "Must be 10 digits & start with 6,7,8,9";
//       } else {
//         const digitCounts = value.split("").reduce((acc, digit) => {
//           acc[digit] = (acc[digit] || 0) + 1;
//           return acc;
//         }, {});

//         if (Object.values(digitCounts).some((count) => count > 8)) {
//           errorMessage = "A digit cannot repeat more than 8 times";
//         }
//       }
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [key]: errorMessage,
//     }));
//   };





//   const handleChange = (key, value) => {
//     setForm((prevForm) => ({ ...prevForm, [key]: value }));
//     validateInput(key, value);
//   };



//   // Cancel logic for the sheet
//   const handleCancel = () => {
//     setForm({
//       driverName: "",
//       personalNumber: "",
//       emergencyNumber: "",
//       address: "",
//     });
//     setBloodValue(null);
//     setStatusValue(null);
//     setErrors({});
//     navigation.goBack();
//   };


//   // Submit logic for the sheet
//   // const handleSubmit = () => {
//   //   const hasErrors = Object.values(errors).some((error) => error);
//   //   const isEmptyField = Object.values(form).some((val) => val.trim() === "");

//   //   if (!hasErrors && !isEmptyField) {
//   //     alert("Form submitted successfully!");

//   //     // navigation.navigate("Aadhar"); // Navigate to the Insurance screen
//   //     // return <Aadhar />
//   //     setShowAadhar(true)
//   //   }
//   // };




//   // const handleSubmit = () => {
//   //   const hasErrors = Object.values(errors).some((error) => error);
//   //   // const isEmptyField = Object.values(form).some((val) => val.trim() === "");

//   //   if (!hasErrors) {
//   //     dispatch(updateDriverDetails({
//   //       driverName: form.driverName,
//   //       personalNumber: form.personalNumber,
//   //       emergencyNumber: form.emergencyNumber,
//   //       address: form.address,
//   //       bloodGroup: bloodValue,
//   //       status: statusValue,



//   //     }



//   //   ));

//   //     setShowAadhar(true);
//   //   }
//   // };


//   const handleSubmit = () => {
//     const hasErrors = Object.values(errors).some((error) => error);
//     // const isEmptyField = Object.values(form).some((val) => val.trim() === "");

//     if (!hasErrors) {
//       console.log("Submitting Driver Details:");
//       console.log("Driver Name:", form.driverName);
//       console.log("Personal Number:", form.personalNumber);
//       console.log("Emergency Number:", form.emergencyNumber);
//       console.log("Address:", form.address);
//       console.log("Blood Group:", bloodValue);
//       console.log("Status:", statusValue);

//       dispatch(updateDriverDetails({
//         driverName: form.driverName,
//         personalNumber: form.personalNumber,
//         emergencyNumber: form.emergencyNumber,
//         address: form.address,
//         bloodGroup: bloodValue,
//         status: statusValue,
//       }));

//       setShowAadhar(true);
//     } else {
//       console.log("Form has validation errors:", errors);
//     }
//   };

//   if (showAadhar) {
//     return <Aadhar />;
//   }
//   // console.log("drivername",driverName);
//   return (
//     <>


//       <StatusBar barStyle={"dark-content"} backgroundColor="white" />

//       <View style={[styles.headertop, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}>
//         {/* Back Button */}
//         <TouchableOpacity style={styles.backButton}
//         // onPress={() => navigation.goBack()}
//         >
//           <SvgUri
//             uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg'}
//             height={18}
//             width={18}
//           />
//         </TouchableOpacity>

//         {/* Notification Title */}
//         <Text style={styles.headerText}>Unclaimed Rewards</Text>

//         {/* Notification Button */}
//         <TouchableOpacity
//         // style={styles.notificationButton} onPress={() => navigation.goBack()}
//         >
//           {/* <Text style={styles.notificationText}>clear All</Text> */}
//         </TouchableOpacity>
//       </View>

//       <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#EFEFF4" }}>
//         <View style={styles.container}>
//           <Text style={styles.header}>Driver Details</Text>
//           {Object.keys(form).map((key) => (
//             <View key={key} style={styles.inputContainer}>
//               <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
//                 value={form[key]}
//                 onChangeText={(text) => handleChange(key, text)}
//                 keyboardType={["personalNumber", "emergencyNumber"].includes(key) ? "numeric" : "default"}
//               />
//               {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
//             </View>
//           ))}

//           {/* Blood Group Dropdown */}
//           <Text style={styles.label}>Blood Group</Text>
//           <DropDownPicker
//             open={bloodOpen}
//             value={bloodValue}
//             items={bloodItems}
//             setOpen={setBloodOpen}
//             setValue={setBloodValue}
//             setItems={setBloodItems}
//             placeholder="Select Blood Group"
//             style={styles.dropdown}
//             zIndex={3000}
//           // zIndexInverse={1000}
//           />

//           {/* Status Dropdown */}
//           <Text style={[styles.label, { marginTop: 20 }]}>Status</Text>
//           <DropDownPicker
//             open={statusOpen}
//             value={statusValue}
//             items={statusItems}
//             setOpen={setStatusOpen}
//             setValue={setStatusValue}
//             setItems={setStatusItems}
//             placeholder="Select Status"
//             style={styles.dropdown}
//             zIndex={2000}
//           // zIndexInverse={2000}
//           />
//         </View>




//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             // style={[
//             //   styles.continueButton,
//             //   Object.values(form).every((val) => val.trim() !== "") &&
//             //     !Object.values(errors).some((error) => error)
//             //     ? {}
//             //     : styles.disabledButton,
//             // ]}

//             style={styles.continueButton}
//             onPress={handleSubmit}
//           // disabled={
//           //   Object.values(form).some((val) => val.trim() === "") ||
//           //   Object.values(errors).some((error) => error)
//           // }

//           >
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//         </View>

//       </View>


//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // backgroundColor:"red"
//   },
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 10,
//     maxHeight: SCREEN_HEIGHT * 0.85,
//     // elevation: 50,
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
//     color: "#6B7280"
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
//   dropdownContainer: {
//     padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     backgroundColor: '#EFEFF4',
//     borderRadius: 8,
//     padding: 12,
//     // borderWidth: .5,
//     borderColor: "#EFEFF4"
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 1,
//     // },
//     // shadowOpacity: 0.2,
//     // shadowRadius: 1.41,
//     // elevation: 2,
//   },
//   labe: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 5,
//     color: "white"
//   },
//   backButton: {
//     paddingVertical: 20,
//   },

//   headerText: {
//     fontSize: 20,
//     color: "black",
//     fontWeight: "bold",

//   },
//   headertop: {
//     flexDirection: "row"
//   }

// });

// export default DriverDetails;





// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import DropDownPicker from 'react-native-dropdown-picker';
// import Aadhar from "./Aadhar";

// const DriverDetails = () => {
//   const navigation = useNavigation();
//   const [showAadhar, setShowAadhar] = useState(false);

//   const [openStatus, setOpenStatus] = useState(false);
//   const [statusValue, setStatusValue] = useState(null);
//   const [statusItems, setStatusItems] = useState([
//     { label: "Active", value: "active" },
//     { label: "Inactive", value: "inactive" },
//   ]);

//   const [openBlood, setOpenBlood] = useState(false);
//   const [bloodValue, setBloodValue] = useState(null);
//   const [bloodItems, setBloodItems] = useState([
//     { label: "A+", value: "A+" },
//     { label: "B+", value: "B+" },
//     { label: "O+", value: "O+" },
//     { label: "AB+", value: "AB+" },
//   ]);

//   const [openUser, setOpenUser] = useState(false);
//   const [userValue, setUserValue] = useState(null);
//   const [userItems, setUserItems] = useState([]);

//   const [form, setForm] = useState({
//     driverName: "",
//     personalNumber: "",
//     emergencyNumber: "",
//     bloodGroup: "",
//     address: "",
//     status: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Mock API call (Replace with actual fetch)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       // Simulate API call
//       const apiData = [
//         { id: 1, name: "John Doe", phone: "9876543210", address: "123 Main Street, Mumbai" },
//         { id: 2, name: "Jane Smith", phone: "9123456789", address: "456 Hill Road, Delhi" }
//       ];

//       const formattedUsers = apiData.map(user => ({
//         label: user.name,
//         value: user.id,
//         phone: user.phone,
//         address: user.address
//       }));

//       setUserItems(formattedUsers);
//     };

//     fetchUsers();
//   }, []);

//   const handleUserSelect = (selectedId) => {
//     const selectedUser = userItems.find(item => item.value === selectedId);
//     if (selectedUser) {
//       setForm(prev => ({
//         ...prev,
//         driverName: selectedUser.label,
//         personalNumber: selectedUser.phone,
//         address: selectedUser.address
//       }));
//     }
//   };

//   const validateInput = (key, value) => {
//     let errorMessage = "";

//     if (key === "driverName" && !/^[A-Za-z]+(\.?[A-Za-z]+)*$/.test(value.trim())) {
//       errorMessage = "Only letters and a single '.' allowed";
//     }

//     if (["personalNumber", "emergencyNumber"].includes(key)) {
//       if (!/^[6789]\d{9}$/.test(value)) {
//         errorMessage = "Must be 10 digits & start with 6,7,8,9";
//       } else {
//         const digitCounts = value.split("").reduce((acc, digit) => {
//           acc[digit] = (acc[digit] || 0) + 1;
//           return acc;
//         }, {});
//         if (Object.values(digitCounts).some((count) => count > 8)) {
//           errorMessage = "A digit cannot repeat more than 8 times";
//         }
//       }
//     }

//     setErrors(prev => ({
//       ...prev,
//       [key]: errorMessage,
//     }));
//   };

//   const handleChange = (key, value) => {
//     setForm(prevForm => ({ ...prevForm, [key]: value }));
//     validateInput(key, value);
//   };

//   const handleCancel = () => {
//     setForm({
//       driverName: "",
//       personalNumber: "",
//       emergencyNumber: "",
//       bloodGroup: "",
//       address: "",
//       status: "",
//     });
//     setErrors({});
//     navigation.goBack();
//   };

//   const handleSubmit = () => {
//     const hasErrors = Object.values(errors).some((error) => error);
//     const isEmptyField = Object.values(form).some((val) => val.trim() === "");

//     if (!hasErrors && !isEmptyField) {
//       alert("Form submitted successfully!");
//       setShowAadhar(true);
//     }
//   };

//   if (showAadhar) return <Aadhar />;

//   return (
//     // <ScrollView contentContainerStyle={{ padding: 20,marginTop:50 }}>
//       <ScrollView contentContainerStyle={{ padding: 20,marginTop:50 }} nestedScrollEnabled={true}>

//       <Text style={styles.header}>Driver Details</Text>

//       {/* <DropDownPicker
//         placeholder="Select Driver"
//         open={openUser}
//         value={userValue}
//         items={userItems}
//         setOpen={setOpenUser}
//         setValue={(val) => {
//           setUserValue(val);
//           handleUserSelect(val);
//         }}
//         setItems={setUserItems}
//         style={styles.dropdown}
//       /> */}

//       {["driverName", "personalNumber", "emergencyNumber", "address"].map((key) => (
//         <View key={key} style={styles.inputContainer}>
//           <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
//             value={form[key]}
//             onChangeText={(text) => handleChange(key, text)}
//             keyboardType={["personalNumber", "emergencyNumber"].includes(key) ? "numeric" : "default"}
//           />
//           {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
//         </View>
//       ))}

//       {/* <DropDownPicker
//         open={openBlood}
//         value={form.bloodGroup}
//         items={bloodItems}
//         setOpen={setOpenBlood}
//         setValue={(val) => handleChange("bloodGroup", val())}
//         setItems={setBloodItems}
//         placeholder="Select Blood Group"
//         style={styles.dropdown}
//       />

//       <DropDownPicker
//         open={openStatus}
//         value={form.status}
//         items={statusItems}
//         setOpen={setOpenStatus}
//         setValue={(val) => handleChange("status", val())}
//         setItems={setStatusItems}
//         placeholder="Select Status"
//         style={styles.dropdown}
//       /> */}


// <View style={{ zIndex: 3000, marginBottom: 10 }}>
//   <DropDownPicker
//     open={openBlood}
//     value={form.bloodGroup}
//     items={bloodItems}
//     setOpen={setOpenBlood}
//     setValue={(val) => handleChange("bloodGroup", val())}
//     setItems={setBloodItems}
//     placeholder="Select Blood Group"
//     style={styles.dropdown}
//   />
// </View>

// <View style={{ zIndex: 2000, marginBottom: 10 }}>
//   <DropDownPicker
//     open={openStatus}
//     value={form.status}
//     items={statusItems}
//     setOpen={setOpenStatus}
//     setValue={(val) => handleChange("status", val())}
//     setItems={setStatusItems}
//     placeholder="Select Status"
//     style={styles.dropdown}
//   />
// </View>

// <View style={{ zIndex: 4000, marginBottom: 10 }}>
//   <DropDownPicker
//     placeholder="Select Driver"
//     open={openUser}
//     value={userValue}
//     items={userItems}
//     setOpen={setOpenUser}
//     setValue={(val) => {
//       setUserValue(val);
//       handleUserSelect(val);
//     }}
//     setItems={setUserItems}
//     style={styles.dropdown}
//   />
// </View>


//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.continueButton,
//             Object.values(form).every((val) => val.trim() !== "") && !Object.values(errors).some((err) => err)
//               ? {}
//               : styles.disabledButton,
//           ]}
//           onPress={handleSubmit}
//           disabled={
//             Object.values(form).some((val) => val.trim() === "") ||
//             Object.values(errors).some((err) => err)
//           }
//         >
//           <Text style={styles.continueText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     alignSelf: "center",
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: "600",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#aaa",
//     borderRadius: 8,
//     padding: 10,
//   },
//   errorText: {
//     color: "red",
//     marginTop: 3,
//   },
//   dropdown: {
//     borderColor: "#aaa",
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   cancelButton: {
//     backgroundColor: "#ddd",
//     padding: 12,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//   },
//   cancelText: {
//     textAlign: "center",
//     color: "#000",
//   },
//   continueButton: {
//     backgroundColor: "#007BFF",
//     padding: 12,
//     borderRadius: 8,
//     flex: 1,
//   },
//   disabledButton: {
//     backgroundColor: "#999",
//   },
//   continueText: {
//     textAlign: "center",
//     color: "#fff",
//   },
// });

// export default DriverDetails;
