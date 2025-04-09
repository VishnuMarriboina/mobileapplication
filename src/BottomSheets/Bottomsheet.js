// import React, { useCallback, useRef } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import {
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetView
// } from '@gorhom/bottom-sheet';

// const BottomSheetComponent = () => {
//   // Ref for BottomSheetModal
//   const bottomSheetModalRef = useRef(null);

//   // Snap points for BottomSheetModal
//   const snapPoints = ["25%", "50%"]; // Adjust these values as needed

//   // Function to open bottom sheet
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);

//   // Function to handle sheet changes
//   const handleSheetChanges = useCallback((index) => {
//     console.log('Bottom Sheet index:', index);
//   }, []);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <BottomSheetModalProvider>
//         <Button
//           onPress={handlePresentModalPress}
//           title="Present Modal"
//           color="black"
//         />

//         {/* Bottom Sheet Modal */}
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={0} // Default index
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}
//         >
//           <BottomSheetView style={styles.contentContainer}>
//             <Text style={styles.text}>Awesome 🎉</Text>
//           </BottomSheetView>
//         </BottomSheetModal>

//       </BottomSheetModalProvider>
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
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default BottomSheetComponent;



// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BottomSheet, BottomSheetView, BottomSheetProvider } from '@gorhom/bottom-sheet';

// const BottomSheetComponent = () => {
//   // Ref for BottomSheet
//   const bottomSheetRef = useRef(null);

//   // Snap points for BottomSheet
//   const snapPoints = useMemo(() => ["25%", "50%"], []);

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
//       <BottomSheetProvider>
//         <Button onPress={handlePresentSheet} title="Open Bottom Sheet" color="black" />

//         {/* Bottom Sheet */}
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={-1} // Initially closed
//           snapPoints={snapPoints}
//           enablePanDownToClose={true}
//         >
//           <BottomSheetView style={styles.contentContainer}>
//             <Text style={styles.text}>This is a Bottom Sheet 🎉</Text>
//             <Button onPress={handleCloseSheet} title="Close" />
//           </BottomSheetView>
//         </BottomSheet>

//       </BottomSheetProvider>
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

// export default BottomSheetComponent;



// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// const App = () => {
//   // Ref for BottomSheet
//   const bottomSheetRef = useRef(null);

//   // Snap points for BottomSheet
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // Function to open bottom sheet
//   const handleOpenSheet = useCallback(() => {
//     bottomSheetRef.current?.expand();
//   }, []);

//   // Function to track changes
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {/* Button to open Bottom Sheet */}
//       <Button title="Open Bottom Sheet" onPress={handleOpenSheet} color="black" />

//       {/* Bottom Sheet */}
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={-1} // Initially hidden
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         onChange={handleSheetChanges}
//       >
//         <BottomSheetView style={styles.contentContainer}>
//           <Text style={styles.text}>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'grey',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 36,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default App;






import React, { forwardRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetModal,
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const CustomBottomSheetModal = forwardRef(
  ({ children, snapPoints = ['70%'], closeOnBackdropPress = true }, ref) => {
    // Handle sheet changes
    const handleSheetChanges = useCallback(index => {
      console.log('BottomSheetModal index:', index);
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        index={0} // Starts closed
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enableDismissOnClose={closeOnBackdropPress}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={closeOnBackdropPress ? "close" : "none"} // Handle background touch behavior
          />
        )}
        onChange={handleSheetChanges}>
        {/* Custom Header with Centered Close Button */}

        {/* BottomSheet Content */}

        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {children}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  closeButton: {
    height: 50,
    width: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    marginBottom: 5,
  },

  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CustomBottomSheetModal;



// import React, { forwardRef, useImperativeHandle, useRef } from "react";
// import { View, StyleSheet } from "react-native";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";

// const CustomBottomSheetModal = forwardRef(({ children }, ref) => {
//   const bottomSheetRef = useRef(null);

//   // Expose the present and dismiss functions
//   useImperativeHandle(ref, () => ({
//     present: () => bottomSheetRef.current?.present(),
//     dismiss: () => bottomSheetRef.current?.dismiss(),
//   }));

//   return (
//     <BottomSheetModal ref={bottomSheetRef} snapPoints={["40%", "60%"]}>
//       <View>{children}</View>
//     </BottomSheetModal>
//   );
// });

// export default CustomBottomSheetModal;










