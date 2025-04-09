import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT } from '../../Utils/Dimensions';

const UnclaimedRewards = () => {  // Removed space in component name
    const navigation = useNavigation();

    // data for the modal

    const rewardsData = [
        { id: "1", date: "21-12-2024", amount: "₹ 125", count: 100, order: "Ts-01" },
        { id: "2", date: "22-12-2024", amount: "₹ 175", count: 150, order: "Ts-02" },
        { id: "3", date: "23-12-2024", amount: "₹ 125", count: 120, order: "Ts-03" },
        { id: "4", date: "24-12-2024", amount: "₹ 155", count: 90, order: "Ts-04" },
        { id: "5", date: "21-12-2024", amount: "₹ 125", count: 110, order: "Ts-05" },
        { id: "6", date: "22-12-2024", amount: "₹ 175", count: 120, order: "Ts-06" },
        { id: "7", date: "23-12-2024", amount: "₹ 125", count: 110, order: "Ts-07" },
        { id: "8", date: "24-12-2024", amount: "₹ 155", count: 200, order: "Ts-08" },

    ];

    const [selectedItem, setSelectedItem] = useState(null);  // State for selected item


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor="white" />

            <View style={{ flex: 1 }}>
                {/* <View style={styles.header}> */}
                <View style={[styles.header, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <SvgUri
                            uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg'}
                            height={18}
                            width={18}
                        />
                    </TouchableOpacity>

                    {/* Notification Title */}
                    <Text style={styles.headerText}>Unclaimed Rewards</Text>

                    {/* Notification Button */}
                    <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.goBack()}>
                        {/* <Text style={styles.notificationText}>clear All</Text> */}
                    </TouchableOpacity>
                </View>













                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>

                    <View style={styles.container}>

                        <View style={{ flexDirection: "row" }}>
                            {/* <Text style={{ fontSize: 20, fontWeight: "800" }}>Icon      </Text> */}

                            <SvgUri
                                uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/rewardsoutline.svg'}
                                height={28}
                                width={28}
                            />
                            <Text style={{ fontSize: 20, fontWeight: "800", paddingHorizontal: 15 }}>Unclaimed Rewards</Text>
                        </View>


                        {/* List of rewards */}
                        <FlatList
                            data={rewardsData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.buttonContainer}
                                    // onPress={() => navigation.goBack()}
                                    onPress={() => handleItemPress(item)}
                                >
                                    {/* Left Icon */}
                                    <SvgUri
                                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/timeline.svg'}
                                        height={22}
                                        width={22}
                                    />

                                    {/* Middle Content */}
                                    <View style={styles.textContainer}>

                                        <Text style={styles.subtitle}>{item.date}</Text>
                                        <Text style={styles.title}>{item.amount}</Text>
                                        <Text >{item.count}</Text>


                                    </View>

                                    {/* Reedem me button */}
                                    {/* <View style={styles.indicator}
                                    // onPress={() => navigation.goBack()}
                                    // onPress={() => handleItemPress(item)}
                                    // onPress={() => { setRedeemVisible(true) }}

                                    >
                                        <SvgUri
                                            uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/timeline.svg'}
                                            height={18}
                                            width={18}
                                        />
                                        <Text style={styles.notificationText}>Claimed</Text>
                                    </View> */}

                                    <TouchableOpacity style={styles.indicator} onPress={() => navigation.goBack()}>
                                        <Text style={styles.notificationText}>Reedem</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>






                            )}
                        />

                    </View>

                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        // borderRadius: 10,
        // marginHorizontal: 10
        // height: 0,
        // marginTop: 40,
    },

    backButton: {
        paddingVertical: 20,
    },

    headerText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",

    },

    notificationButton: {
        // paddingVertical: 10,
    },

    notificationText: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
    },


    container: {
        backgroundColor: "yellow",
        borderRadius: 20,
        padding: 10,
        maxHeight: SCREEN_HEIGHT * 0.85,
        elevation: 50,
        backgroundColor: "#FFFFFF"


    },



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
        marginVertical: 10,
        // backgroundColor: "#148B7E",
        backgroundColor: "#9C99F5",
        backgroundColor: "#F5F6F8",
        // backgroundColor:"red"
    },
    textContainer: {
        flex: 1,
        marginLeft: 26,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        color: "#148B7E"
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    indicator: {
        padding: 6,
        // backgroundColor:"white",
        borderRadius: 10,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#148B7E"
    },


})

export default UnclaimedRewards;  // Fixed export statement







// <TouchableOpacity style={styles.buttonContainer}
// onPress={() => navigation.goBack()}
// >
// {/* Left Icon */}
// <SvgUri
//     uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Vehicles.svg'}
//     height={32}
//     width={32}
// />

// {/* Middle Content */}
// <View style={styles.textContainer}>

//     <Text style={styles.subtitle}>Net Claimed Rewards</Text>
//     <Text style={styles.title}>₹1,25000.00</Text>
//     <Text style={styles.subtitle}>Net Claimed Rewards</Text>
// </View>

// {/* Reedem me button */}
// <TouchableOpacity style={styles.indicator} onPress={() => navigation.goBack()}>
//     <Text style={styles.notificationText}>Reedem</Text>
// </TouchableOpacity>
// </TouchableOpacity>



// <TouchableOpacity style={styles.buttonContainer}
// onPress={() => navigation.goBack()}
// >
// {/* Left Icon */}
// <SvgUri
//     uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Vehicles.svg'}
//     height={32}
//     width={32}
// />

// {/* Middle Content */}
// <View style={styles.textContainer}>

//     <Text style={styles.subtitle}>Net Claimed Rewards</Text>
//     <Text style={styles.title}>₹1,25000.00</Text>
//     <Text style={styles.subtitle}>Net Claimed Rewards</Text>
// </View>

// {/* Reedem me button */}
// <TouchableOpacity style={styles.indicator} onPress={() => navigation.goBack()}>
//     <Text style={styles.notificationText}>Reedem</Text>
// </TouchableOpacity>
// </TouchableOpacity>



// <TouchableOpacity style={styles.buttonContainer}
// onPress={() => navigation.goBack()}
// >
// {/* Left Icon */}
// <SvgUri
//     uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Vehicles.svg'}
//     height={32}
//     width={32}
// />

// {/* Middle Content */}
// <View style={styles.textContainer}>

//     <Text style={styles.subtitle}>Net Claimed Rewards</Text>
//     <Text style={styles.title}>₹1,25000.00</Text>
//     <Text style={styles.subtitle}>Net Claimed Rewards</Text>
// </View>

// {/* Reedem me button */}
// <TouchableOpacity style={styles.indicator} onPress={() => navigation.goBack()}>
//     <Text style={styles.notificationText}>Reedem</Text>
// </TouchableOpacity>
// </TouchableOpacity>
