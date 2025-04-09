// import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
// import React from 'react'
// import { SCREEN_WIDTH } from '../Utils/Dimensions'
// import { TextInput } from 'react-native-gesture-handler'

// const FuelRecords = () => {
//     return (
//         <>
//             <View style={styles.container}>

//                 <Text>FuelRecords</Text>
//                 <View style={{justifyContent:"center",alignItems:"center"}}>
//                     {/* <Text>FuelRecords</Text> */}


//                 <TouchableOpacity
//                     style={styles.fuelbutton}

//                     onPress={() => { Alert.alert("navigate") }}
//                 >
//                     <Text>+ add Fuel</Text>
//                 </TouchableOpacity>
//                 </View>

// <View>
//    <TextInput
//              style={styles.input}
//              placeholder="Enter Liters"
//              placeholderTextColor="#9CA3AF"
//              selectionColor="black" // Cursor color
//             //  value={searchQuery} // Bind the search query to the TextInput
//             //  onChangeText={setSearchQuery} // Update the search query as the user types
//            />
//             <TextInput
//              style={styles.input}
//              placeholder="Enter Amount"
//              placeholderTextColor="#9CA3AF"
//              selectionColor="black" // Cursor color
//             //  value={searchQuery} // Bind the search query to the TextInput
//             //  onChangeText={setSearchQuery} // Update the search query as the user types
//            />

//            <View>
//             <Text>{liters*amount}</Text>
//            </View>
//            <TouchableOpacity>
//             <Text>Submit</Text>
//            </TouchableOpacity>
// </View>










//             </View>
//         </>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: "red",


//     },
//     fuelbutton: {
//         padding: 10,
//         // backgroundColor: "gray",
//         justifyContent: "center",
//         alignItems: "center",
//         width: SCREEN_WIDTH * 0.85,
//         borderColor: "blue",
//         borderWidth: 2,
//         borderRadius: 15

//     }


// })




// export default FuelRecords





import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { SCREEN_WIDTH } from '../Utils/Dimensions';
import { SvgUri } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

const FuelRecords = () => {
    const [showInputs, setShowInputs] = useState(false); // To toggle input container
    const [liters, setLiters] = useState('');
    const [amount, setAmount] = useState('');
    const [isLitersValid, setIsLitersValid] = useState(true);
    const [isAmountValid, setIsAmountValid] = useState(true);

    // Function to validate liters input (max 7 digits before decimal & 3 decimals)
    const handleLitersChange = (text) => {
        let regex = /^\d{0,7}(\.\d{0,3})?$/;
        if (regex.test(text) || text === '') {
            setLiters(text);
            setIsLitersValid(true);
        } else {
            setIsLitersValid(false);
        }
    };

    // Function to validate amount input (max 8 digits before decimal & 2 decimals)
    const handleAmountChange = (text) => {
        let regex = /^\d{0,8}(\.\d{0,2})?$/;
        if (regex.test(text) || text === '') {
            setAmount(text);
            setIsAmountValid(true);
        } else {
            setIsAmountValid(false);
        }
    };
    // Calculate the total cost dynamically
    const totalCost = liters && amount ? parseFloat(liters) * parseFloat(amount) : 0;


    // Toggle input container visibility
    const toggleInputContainer = () => {
        setShowInputs(!showInputs); // Toggle visibility
        // if (showInputs) {
        //     // setLiters('');
        //     // setAmount('');
        // }
    };
    // Function to validate liters input
    // const handleLitersChange = (text) => {
    //     let regex = /^\d{0,7}(\.\d{0,3})?$/; // Allows up to 7 digits + optional 3 decimal places (10 max)
    //     if (regex.test(text) || text === '') {
    //         setLiters(text);
    //     }
    // };

    // // Function to validate amount input
    // const handleAmountChange = (text) => {
    //     let regex = /^\d{0,8}(\.\d{0,2})?$/; // Allows up to 8 digits + optional 2 decimal places (10 max)
    //     if (regex.test(text) || text === '') {
    //         setAmount(text);
    //     }
    // };


    // Function to handle submit & clear fields
    const handleSubmit = () => {
        Alert.alert("Fuel Data Submitted");
        // Clear input fields & hide input container
        setLiters('');
        setAmount('');
        setShowInputs(false);
    };




    const fuelData = [
        { id: '1', date: '20-04-24', liters: 220, cost: '₹21,969' },
        { id: '2', date: '19-04-24', liters: 180, cost: '₹17,975' },
        { id: '3', date: '18-04-24', liters: 200, cost: '₹19,972' },
        { id: '4', date: '20-04-24', liters: 220, cost: '₹21,969' },
        { id: '5', date: '19-04-24', liters: 180, cost: '₹17,975' },
        { id: '6', date: '18-04-24', liters: 200, cost: '₹19,972' },
        // More data can be added dynamically here...
    ];

    return (
        // <ScrollView style={{ flex: 1, backgroundColor: "#D8DDE2" }} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, backgroundColor: "#D8DDE2" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={{ flex: 1, backgroundColor: "#D8DDE2" }}>
                        <View style={styles.container}>
                            {/* Add Fuel Button */}
                            <TouchableOpacity style={styles.fuelButton} onPress={toggleInputContainer}>
                                <Text style={styles.buttonText}>+   Add Fuel</Text>
                            </TouchableOpacity>

                            {/* Input Fields - Shown on Clicking Add Fuel */}
                            {showInputs && (
                                <View style={styles.inputContainer}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#EFF0F2", padding: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <SvgUri
                                                uri={
                                                    'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/calenderfilled.svg'
                                                }
                                                style={{ width: 24, height: 24 }}

                                            />
                                            <Text>Date</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <SvgUri
                                                uri={
                                                    'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/timeline.svg'
                                                }
                                                style={{ width: 24, height: 24 }}

                                            />


                                            <Text>Time</Text>
                                        </View>
                                    </View>
                                    <Text>Litters</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Liters"
                                        placeholderTextColor="#9CA3AF"
                                        selectionColor="black"
                                        keyboardType="numeric"
                                        value={liters}
                                        onChangeText={handleLitersChange}
                                    />
                                    <Text>Amount</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Amount"
                                        placeholderTextColor="#9CA3AF"
                                        selectionColor="black"
                                        keyboardType="numeric"
                                        value={amount}
                                        onChangeText={handleAmountChange}
                                    />
                                    <Text>Total cost</Text>
                                    <View style={styles.costbutton}>
                                        <Text>₹{totalCost}</Text>
                                    </View>

                                    {/* Display the Product
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total Cost</Text>
                            {/* <Text style={styles.totalText}> ₹{totalCost}</Text> */}
                                    {/* <TouchableOpacity style={styles.costbutton}>
                                <Text>₹{totalCost}</Text>
                            </TouchableOpacity>
                        </View>  */}



                                    {/* bill upload button */}
                                    <TouchableOpacity style={styles.billButton}>
                                        <Text>
                                            Diesel Bill
                                        </Text>
                                        <SvgUri
                                            uri={
                                                'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/upload2.svg'
                                            }
                                            style={{ width: 24, height: 24 }}

                                        />
                                    </TouchableOpacity>







                                    {/* Submit Button */}
                                    <TouchableOpacity style={styles.submitButton}
                                        //   onPress={() => Alert.alert("Fuel Data Submitted")}
                                        onPress={handleSubmit}>
                                        <Text style={styles.submitText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* To show the data in table modal */}
                            <View style={styles.inputContainer}>
                                {/* Summary Header */}
                                <View style={styles.header}>
                                    <Text style={styles.summaryText}>Summary</Text>
                                    <SvgUri
                                        uri={
                                            'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/calenderfilled.svg'
                                        }
                                        style={{ width: 24, height: 24 }}

                                    />
                                </View>

                                {/* Table Header */}
                                <View style={{ borderColor: "#D8DDE2", borderWidth: 2, borderRadius: 5 }}>
                                    <View style={styles.tableHeader}>
                                        <Text style={styles.headerText}>Date</Text>
                                        <Text style={styles.headerText}>Liters</Text>
                                        <Text style={styles.headerText}>Cost</Text>
                                    </View>

                                    {/* Dynamic Table Rows */}
                                    <FlatList
                                        data={fuelData}
                                        nestedScrollEnabled={true} // Fixes scrolling inside ScrollView
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <View style={styles.tableRow}>
                                                <Text style={styles.cell}>{item.date}</Text>
                                                <Text style={styles.cell}>{item.liters}</Text>
                                                <Text style={styles.cell}>{item.cost}</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
        backgroundColor: "#D8DDE2"
    },
    fuelButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: SCREEN_WIDTH * 0.8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.2,
        borderColor: "#148B7E",
        backgroundColor: "white"

    },
    buttonText: {
        color: '#148B7E',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,

    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
        color: "black"
    },
    totalContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D6B5C',
    },
    costbutton: {
        height: 45,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
        backgroundColor: "#EFEFF4",
        padding: 5,
        justifyContent: "center"

    },
    billButton: {
        flexDirection: "row",
        backgroundColor: "#EFEFF4",
        padding: 5,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginVertical: 25
    },
    submitButton: {
        backgroundColor: '#148B7E',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#D8DDE2",
        padding: 5,
        borderRadius: 3
    },

    // Table row

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        paddingVertical: 18,
        paddingHorizontal: 10,
        borderRadius: 0,
        backgroundColor: "#D8DDE2"
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    cell: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },

});

export default FuelRecords;
