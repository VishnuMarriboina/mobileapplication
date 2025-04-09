import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import CustomModal from "./Components/CustomModal";
import CustomModal from "./CustomModal";
import { BRANDCOLOR } from "../Utils/Colors";
import { SCREEN_WIDTH } from "../Utils/Dimensions";


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

const RewardsTable = ({ onClose }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRedeemModal, setRedeemVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);  // State for selected item

    const handleItemPress = (item) => {
        setSelectedItem(item); // Store selected item
        setModalVisible(true);
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.headerText}>UnClaimed rewards</Text>
                </View>

                <TouchableOpacity style={styles.xButton} onPress={onClose}>
                    <Text style={styles.xcloseText}>X</Text>
                </TouchableOpacity>
            </View>
            {/* List of rewards */}
            <FlatList
                data={rewardsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>

                        <TouchableOpacity style={styles.cell1}
                            onPress={() => handleItemPress(item)}>
                            <Text >{item.date}</Text>
                        </TouchableOpacity>
                        <Text style={styles.cell}>{item.amount}</Text>
                        <TouchableOpacity style={styles.redeemButton}
                            onPress={() => { setRedeemVisible(true) }}
                            >
                            <Text style={styles.redeemText}>Redeem</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />




            {/* for no.of orders details*/}
            {/* <CustomModal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                    {selectedItem && (
                        <>
                            <View style={styles.Table}>
                                <View style={styles.heading}>
                                    <Text style={styles.headingText}>{selectedItem.date}</Text>
                                    <Text style={styles.headingText}>{selectedItem.amount}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalText}>Order: {selectedItem.order}</Text>
                                    <Text style={styles.modalText}>Count: {selectedItem.count}</Text>
                                </View>
                            </View>
                        </>
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal> */}


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





            {/* for redeem buttom */}
            <CustomModal isVisible={isRedeemModal} onClose={() => setRedeemVisible(false)} >
                <View style={styles.modalContent}>
                    <Text style={styles.fancyText}>successfully Redeemed</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setRedeemVisible(false)} >
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        margin: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // backgroundColor: "blue",
        marginVertical: 120
    },
    header: {
        backgroundColor: "white",
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        // alignItems: "center",
        flexDirection: "row",
        // justifyContent:"center"
        // justifyContent: "space-between"
        paddingHorizontal: 15,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        // backgroundColor: "red"
    },
    cell: {
        fontSize: 16,
        color: "#333",
        flex: 1,
    },
    cell1: {
        fontSize: 16,
        color: "#333",
        // flex: 0.75,
        flex: 1,
        paddingHorizontal: 5,
        padding: 5,
        // backgroundColor: "green"
    },
    redeemButton: {
        backgroundColor: "#156CF7",
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    redeemText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    fancyText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "purple",
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    xButton: {
        // backgroundColor: "red",
        padding: 10,
        // paddingHorizontal:40,
        borderRadius: 60,
    },
    xcloseText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "purple",
        padding: 10,
        borderRadius: 10,
    },
    closeText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    // css for order details

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
    headerText: {
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


});

export default RewardsTable;




{/* <FancyModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} /> */ }
{/* <CustomModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} >
                <View style={styles.modalContent}>
                    <Text style={styles.fancyText}>Fancy!</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal> */}

{/* <View style={styles.table}>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>Driver Documents</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.Text}>Aadhar Card*</Text>
                            <View style={styles.rowview}>
                                <Text style={styles.Text}>%</Text>
                                <Text style={styles.Text}>%</Text>
                            </View>
                        </View>
                        <View style={styles.line} />

                        <View style={styles.row}>
                            <Text style={styles.Text}>License</Text>
                            <View style={styles.rowview}>
                                <Text style={styles.Text}>%</Text>
                                <Text style={styles.Text}>%</Text>
                            </View>

                        </View>
                        <View style={styles.line} />
                        <View style={styles.row}>
                            <Text style={styles.Text}>Insurance</Text>
                            <View style={styles.rowview}>
                                <Text style={styles.image}>%</Text>
                                <Text style={styles.image}>%</Text>
                            </View>
                        </View>

                    </View> */}
