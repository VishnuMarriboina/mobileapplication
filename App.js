import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import StartScreen from './src/Stacks/StartScreen';
import DriverDetails from './src/Uploads/DriverDetails';
import DrawerNavigator from './src/DrawerNavigator/CustomDrawerContent';

const App = () => {

  return (
    <>
      {/* <StatusBar backgroundColor={'red'} barStyle="default" /> */}
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <StatusBar barStyle='default' translucent={true} />
                {/* <MainStack /> */}
                {/* <Bottomsheet /> */}
                {/* <Login /> */}
                {/* <Splash /> */}
                <StartScreen />
                {/* <DriverDetails /> */}
                {/* <DrawerNavigator /> */}
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;








// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BottomSheet } from '@gorhom/bottom-sheet';

// const App = () => {
//   // Ref for BottomSheet
//   const bottomSheetRef = useRef(null);

//   // Snap points for BottomSheet
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // Function to open bottom sheet
//   const handlePresentSheet = useCallback(() => {
//     bottomSheetRef.current?.expand();
//   }, []);

//   // Function to close bottom sheet
//   const handleCloseSheet = useCallback(() => {
//     bottomSheetRef.current?.close();
//   }, []);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <Button onPress={handlePresentSheet} title="Open Bottom Sheet" color="black" />

//       {/* Bottom Sheet */}
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={-1} // Keeps it hidden initially
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//       >
//         <View style={styles.contentContainer}>
//           <Text style={styles.text}>This is a Bottom Sheet 🎉</Text>
//           <Button onPress={handleCloseSheet} title="Close" />
//         </View>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default App;





// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// const App = () => {
//   // ref
//   const bottomSheetRef = useRef < BottomSheet > (null);

//   // callbacks
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         onChange={handleSheetChanges}
//       >
//         <BottomSheetView style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'grey',
//     backgroundColor: "red",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 36,
//     alignItems: 'center',
//     backgroundColor: "blue"
//   },
// });

// export default App;







// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { MainStack } from './src/Stacks/Export';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';


// import CustomButton from './src/Components/Button';
// import FancyModal from './src/Components/Modal';
// import Footer from './src/Stacks/Export';
// import Login from './src/login/Login';
// import { StatusBar } from 'react-native';
// import { store } from './src/Redux/Store';



// const App = () => {
//   // const [isModalVisible, setModalVisible] = useState(false);

//   // const openModal = () => setModalVisible(true);
//   // const closeModal = () => setModalVisible(false);
//   // console.log("after........!!");
//   // useEffect(() => {
//   //   console.log("before........!!");
//   //   checkSecurity();
//   //   console.log("after........!!");
//   // }, []);

//   return (
//     <>
//       {/* <StatusBar backgroundColor={'red'} barStyle="dark-content" /> */}
//       <Provider store={store}>
//         <NavigationContainer>
//           <SafeAreaProvider>
//             <StatusBar backgroundColor={'red'} barStyle="dark-content" />
//             <MainStack />
//             {/* <Login /> */}
//           </SafeAreaProvider>
//         </NavigationContainer>
//       </Provider>
//     </>
//   );
// };


// export default App;