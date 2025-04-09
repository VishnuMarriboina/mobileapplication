import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert, SafeAreaView, TextInput, Keyboard, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripsdata } from "../Redux/Slices/TripsSlice";
import { SCREEN_WIDTH } from "../Utils/Dimensions";
import { BRANDCOLOR } from "../Utils/Colors";
import { SvgUri } from "react-native-svg";
import DatePicker from "react-native-date-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Trips = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.Tripsdata);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [filteredTrips, setFilteredTrips] = useState(products); // Filtered trips based on search query
  const [refreshing, setRefreshing] = useState(false);
const [loading,setLoading] = useState(false)

  const navigation = useNavigation();

  //  Fetch function
  const fetchData = async () => {
    setRefreshing(true);
    dispatch(fetchTripsdata());
    setRefreshing(false);
  };


  

  //  First load
  useEffect(() => {
    setLoading(true)
    dispatch(fetchTripsdata());
    setLoading(false)
  }, [dispatch]);

  //  Refetch when coming back to screen
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );








  //---------code for the search bar
  useEffect(() => {
    // Filter trips based on the search query
    if (searchQuery) {
      const filteredData = products.filter((item) =>
        item.price.toString().startsWith(searchQuery)  // Filter by price starting with search query
      );
      setFilteredTrips(filteredData);
    } else {
      setFilteredTrips(products); // Show all trips if no search query
    }
  }, [searchQuery, products]);


  //----------------code for filter option

  // For the color of the icon
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#148B7E";
      case "OnTrip":
        return "#34D399";
      case "Failed":
        return "red";
      case "Dispatch":
        return "orange";
      default:
        return "#148B7E"; // Default color if status is unknown
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <View style={styles.iconContainer}>
          {/* <Text style={styles.iconText}>🔍</Text> */}

          <SvgUri
            uri={
              'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/search.svg'
            }
            style={{ width: 24, height: 24 }}

          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
          selectionColor="black" // Cursor color
          value={searchQuery} // Bind the search query to the TextInput
          onChangeText={setSearchQuery} // Update the search query as the user types
        />
        <TouchableOpacity style={styles.iconContainer}
          onPress={() => setOpen(true)}>
          {/* <Text style={styles.iconText}>⚙️ {date.toLocaleDateString()}</Text> */}


          <SvgUri
            uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/filter.svg'}
            style={{ width: 24, height: 24 }}
          />

        </TouchableOpacity>
      </View>

      {/* <View style={styles.screen}> */}
      <View>
        {/* <View style={{backgroundColor:"white",padding:9}}>
        <Text style={styles.header} >Trips Details(Order ID's)</Text>
        </View> */}
        {/* {loading ? ( */}
        {loading && !refreshing ? (

          <ActivityIndicator size="large" color="blue" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          // <View style={{ backgroundColor: "transparent" }}>
          <View style={styles.screen}>
            {/* <View> */}
            {/* Display a message if no data matches the search */}
            {filteredTrips.length === 0 && searchQuery.length > 0 ? (
              <Text style={styles.noMatchesText}>No matches found</Text>
            ) : (
              <FlatList
                // data={products}
                data={filteredTrips} // Use filteredTrips here instead of products
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchData}
                    colors={['#298573']}
                    tintColor="#298573"
                  />}

                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.Card}
                    onPress={() => {
                      Alert.alert("Navigate to the respective page");
                    }}
                  // onPress={() => {
                  //   navigation.navigate("TripDetails")
                  // }}
                  >
                    <View
                      style={[
                        styles.forwardarrow,
                        { backgroundColor: getStatusColor(item.status) } // Dynamic color
                      ]}
                    >
                      <SvgUri
                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/SC-P+V2/Vehicles.svg'
                        }
                        height={32}
                        width={32}
                      />
                    </View>
                    <View style={styles.Info}>
                      <Text style={styles.InfoName}>${item.price}</Text>
                      {/* <Text style={styles.InfoName}>name of the persion</Text> */}
                    </View>
                    <View
                      style={[
                        styles.statusindicator,
                        { backgroundColor: getStatusColor(item.status) } // Dynamic color
                      ]}
                    >

                      {/* <Text>{item.gender}</Text> */}
                      <Text>completed</Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                  // Only show the footer if no search query is active
                  <View style={styles.footer}>
                    {!searchQuery ? (<Text style={styles.footerText}>Data Completed</Text>) : <Text style={styles.footerText}>Match is completed</Text>}
                  </View>
                )}
              />
            )}
          </View>

        )}
      </View>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>

  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    // backgroundColor: "#f5f5f5",
    // backgroundColor: "yellow"
    backgroundColor: "white",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    // backgroundColor: "red",
    // paddingBottom: 170,
    // marginBottom:60
    // marginTop:30
    backgroundColor: "white",
    // paddingVertical:20
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    // marginBottom: 10,
    // backgroundColor: "blue",
    // paddingHorizontal:40,
    // marginVertical:20
    // flex:1
  },
  error: {
    fontSize: 16,
    color: "red",
  },
  item: {
    // padding: 15,
    backgroundColor: BRANDCOLOR,
    borderRadius: 8,
    marginVertical: 5,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    // elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  // text: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "#333",
  // },
  completedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginTop: 70,
    textAlign: "center",
  },

  // card for flatlist
  Card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // backgroundColor: "transparent",
    borderRadius: 10,
    padding: 10,
    // backgroundColor: BRANDCOLOR,
    // elevation: 2,
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    // paddingVertical:5,
    marginVertical: 4,
    backgroundColor: "gray",
    backgroundColor: "#f5f5f5",
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  Info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center"
  },
  InfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    // paddingHorizontal: 10
  },
  forwardarrow: {
    padding: 8,
    borderRadius: 40,
    backgroundColor: "red"
  },
  statusindicator: {
    padding: 8,
    // backgroundColor:"white",
    borderRadius: 20,
    backgroundColor: "red",
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  Name: {
    fontSize: 30,
    fontWeight: "bold"
  },
  footer: {
    marginTop: 100,
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 250
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },

  // searchContainer
  searchbar: {
    backgroundColor: "#FFFFFF",
    padding: 9,
    borderRadius: 15,
    marginTop: -30,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal:10,
    // marginHorizontal: 15,
    // backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight transparency
    backgroundColor: "red",
    backgroundColor: "#f5f5f5",
    // elevation:0.01,
    // marginBottom:5,
    // paddingVertical:5
    width: SCREEN_WIDTH * 0.9,


  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  iconText: {
    fontSize: 18,
    color: "#fff",
    color: "black"
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight transparency
    borderRadius: 20,
    color: "black"
    // elevation: 1, // Adds shadow effect
  },

});





//  <TouchableOpacity style={styles.item}
//                 onPress={() => Alert.alert("Navigate to the details Page")}
//               >
//                 <Text style={styles.text}>${item.price}</Text>
//               </TouchableOpacity>











// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTripsdata, tripStart, tripsSuccess, tripsFailed } from "../Redux/Slices/TripsSlice";
// import axios from "axios";
// import { SCREEN_WIDTH } from "../Utils/Dimensions";
// import { BRANDCOLOR } from "../Utils/Colors";

// const Trips = () => {

//   // const dispatch = useDispatch();

//   // const {}=useSelector();

//   // const { product } = useSelector(state => Trips.state)
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   // console.log(product);

//   useEffect(() => {
//     axios.get("https://fakestoreapi.com/products")
//       .then(response => {
//         setProducts(response.data);
//         setLoading(false);

//         console.log("data", response.data);
//       })
//       .catch(error => {
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <View style={styles.screen}>
//       <Text style={styles.header}>Product Prices</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : error ? (
//         <Text style={styles.error}>{error}</Text>
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//               <Text style={styles.text}>${item.price}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default Trips;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 20,
//     backgroundColor: "#f5f5f5",
//     // backgroundColor:"red",
//     paddingBottom: 50
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   item: {
//     padding: 15,
//     backgroundColor: "white",
//     borderRadius: 8,
//     marginVertical: 5,
//     width: SCREEN_WIDTH * 0.9,
//     alignItems: "center",
//     // elevation: 3, // For Android shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     backgroundColor: BRANDCOLOR
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   error: {
//     fontSize: 16,
//     color: "red",
//   },
// });




