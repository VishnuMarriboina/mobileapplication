import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Utils/Dimensions';
import CustomModal from '../../Components/CustomModal';
import { BRANDCOLOR } from '../../Utils/Colors';

const ClaimedRewards = () => {  // Removed space in component name
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



    const [isModalVisible, setModalVisible] = useState(false);
    const [isRedeemModal, setRedeemVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);  // State for selected item

    const handleItemPress = (item) => {
        setSelectedItem(item); // Store selected item
        setModalVisible(true);
    };


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor="white" />
            <View style={{ flex: 1 }}>
                {/* <View style={styles.header}> */}
                <View style={[styles.header, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}>
                    {/* <View style={styles.header}> */}
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <SvgUri
                            uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/arrowback.svg'}
                            height={18}
                            width={18}
                        />
                    </TouchableOpacity>

                    {/* Notification Title */}
                    <Text style={styles.headerText}>Claimed Rewards</Text>

                    {/* Notification Button */}
                    <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.goBack()}>
                        {/* <Text style={styles.notificationText}>clear All</Text> */}
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    <View style={styles.container}>

                        {/* <View style={{flexDirection:"row" }}>

                            <View>
                              
                            </View>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: "800" }}>Icon</Text>
                            </View>
                        </View> */}
                        <View style={{ flexDirection: "row" }}>
                            <SvgUri
                                uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/Success.svg'}
                                height={28}
                                width={28}
                            />



                            <Text style={{ fontSize: 20, fontWeight: "800", paddingHorizontal: 20 }}>Claimed Rewards</Text>

                        </View>







                        {/* data from the slice or object */}

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
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={styles.title}>{item.amount}</Text>
                                            <SvgUri
                                                uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/info.svg'}
                                                height={14}
                                                width={14}
                                            />
                                        </View>

                                    </View>

                                    {/* Reedem me button */}
                                    <View style={styles.indicator}
                                    // onPress={() => navigation.goBack()}
                                    // onPress={() => handleItemPress(item)}
                                    // onPress={() => { setRedeemVisible(true) }}

                                    >
                                        <SvgUri
                                            uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/Successwhite.svg'}
                                            height={18}
                                            width={18}
                                        />
                                        <Text style={styles.notificationText}>Claimed</Text>
                                    </View>
                                </TouchableOpacity>






                            )}
                        />

















                    </View>


                    {/* MODAL FOR THE DETAILS FOR THE  */}

                    <CustomModal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            {selectedItem && (
                                <>
                                    <View style={styles.tableContainer}>
                                        <View style={styles.tableHeader}>
                                            <Text style={styles.headerText}>{selectedItem.date}</Text>
                                            <Text style={styles.headerText}>{selectedItem.amount}</Text>
                                        </View>

                                        <View style={styles.tableHeader}>
                                            <Text style={styles.headerText}>Order ID's</Text>
                                            <Text style={styles.headerText}>Amount Per Order</Text>
                                        </View>
                                        {/* <View style={styles.line} /> */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.rowText}>{selectedItem.order}</Text>
                                            <Text style={styles.rowText}>{selectedItem.count}</Text>
                                        </View>
                                        <View style={styles.line} />
                                        <View style={styles.tableRow}>
                                            <Text style={styles.rowText}>{selectedItem.order}</Text>
                                            <Text style={styles.rowText}>{selectedItem.count}</Text>
                                        </View>
                                        <View style={styles.line} />
                                        <View style={styles.tableRow}>
                                            <Text style={styles.rowText}>{selectedItem.order}</Text>
                                            <Text style={styles.rowText}>{selectedItem.count}</Text>
                                        </View>
                                    </View>
                                </>
                            )}

                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </CustomModal>






















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
        paddingVertical: 15,
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
        color: "black",
        fontWeight: "500",
        paddingLeft:5
    },


    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 10,
        maxHeight: SCREEN_HEIGHT * 0.85,
        elevation: 50,
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
        backgroundColor: "#F5F6F8",
        // backgroundColor: "red"
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
        paddingVertical: 4,
        // backgroundColor:"white",
        borderRadius: 10,
        backgroundColor: "red",
        width: 110,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#34D399",
        flexDirection: "row"
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
    tableContainer: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 5,
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1.52,
        borderBottomColor: "black",
    },
    tableheaderText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    rowText: {
        fontSize: 14,
    },
    line: {
        height: 1.0,
        // backgroundColor: "#D9D9D9",
        backgroundColor: BRANDCOLOR,
        // marginHorizontal: 15,
        // width:SCREEN_WIDTH
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ff3333",
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
    },
    closeText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },



})

export default ClaimedRewards;  // Fixed export statement
